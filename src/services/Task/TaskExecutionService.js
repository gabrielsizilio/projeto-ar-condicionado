const TaskExecution = require("../../models/TaskExecution");
const TaskWeeklyService = require("./TaskWeeklyService");
const TaskSingleService = require("./TaskSingleService");
const { Op } = require("sequelize");
const TaskExceptionService = require("./TaskExceptionService");
const SocketService = require("../SocketService");
const macAddressMapping = require("../../websocket");

async function createExecutionTask(taskMap) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const [key, items] of taskMap.entries()) {
        for (const item of items) {

            try {
                await TaskExecution.create({
                    task_id: item.task.id,
                    ar_id: item.arCondicionado.id,
                    scheduled_for: new Date(key),
                    status: "PENDING"
                });

            } catch (err) {
                console.error(`Erro ao criar execução para task_id=${task.task_id}:`, err);
            }
        }
    }
}

function verifyConcurrence(readyTasks, gap = 1) {
    let taskMap = new Map();

    readyTasks.forEach((taskWrap, taskIndex) => {
        const task = taskWrap.task.dataValues;

        task.aresCondicionados.forEach((arCondicionadoWrap, index) => {
            const arCondicionado = arCondicionadoWrap.dataValues
            let dateTime = new Date();
            let time = task.time;
            let [hours, minutes, seconds] = time.split(":").map(Number);

            dateTime.setHours(hours, minutes, seconds, 0);
            let key = dateTime.toISOString();

            if (gap == 0) {
                if (!taskMap.has(key)) {
                    taskMap.set(key, []);
                }
            } else {
                while (taskMap.has(key)) {
                    dateTime.setSeconds(dateTime.getSeconds() + gap);
                    key = dateTime.toISOString();
                }
                time = dateTime.toTimeString().split(" ")[0];
                taskMap.set(key, []);
            }

            const item = {
                arCondicionado,
                time,
                task
            }

            taskMap.get(key).push(item);
        });
    });
    return taskMap;
}

async function getAllTasksValidTasks() {

    const taskSingle = await TaskSingleService.getSingleTasksToday();
    const taskWeekly = await TaskWeeklyService.getWeeklyTasksToday();

    const allTasks = [...taskSingle, ...taskWeekly]

    const validTasks = await TaskExceptionService.filterTasksWithoutException(allTasks);
    const readyTasks = await filterTasksWithoutExecution(validTasks);

    const taskMap = verifyConcurrence(readyTasks, 1);
    return taskMap;
}

async function getAllExecutionTaskToday() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const tasksPendingToday = await TaskExecution.findAll({
        where: {
            status: "PENDING",
            createdAt: {
                [Op.between]: [todayStart, todayEnd]
            },
        },
        include: [
            {
                association: "task"
            },
            {
                association: "arCondicionado",
                include: [
                    {
                        association: "controlador"
                    }
                ]
            }
        ]
    });

    return tasksPendingToday;
}

async function filterTasksWithoutExecution(tasks) {
    const taskIds = tasks.map(t => t.task.id);

    const exceptions = await TaskExecution.findAll({
        where: {
            task_id: { [Op.in]: taskIds }
        },
    });

    const exceptionTaskIds = new Set(exceptions.map(e => e.task_id));
    const validTasks = tasks.filter(t => !exceptionTaskIds.has(t.task.id))
        .sort((a, b) => {
            const salaA = a.dataValues.task.aresCondicionados[0]?.sala_id ?? 0;
            const salaB = b.dataValues.task.aresCondicionados[0]?.sala_id ?? 0;
            return salaA - salaB;
        });


    return validTasks;
}

async function findTaskExecutionById(task_execution_id) {

    const task_execution = TaskExecution.findOne({
        where: { id: task_execution_id },
        include: [{
            association: "task",
            include: [{
                association: "aresCondicionados"
            }]
        }]
    });

    return task_execution;
}

async function runTask(taskPayload) {
    const now = new Date();
    console.log(`[${now}] >> RUNING TASK_ID: ${taskPayload.task_id}`);

    const comando = {
        id_controlador: taskPayload.id_controlador,
        id_arcondicionado: taskPayload.id_arcondicionado,
        temperatura: taskPayload.temperatura == 0 ? "off" : `${taskPayload.temperatura}`
    }

    
    await SocketService.enviaComando(comando, macAddressMapping);

    await TaskExecution.update(
        { status: "COMPLETED" },
        {
            where: {
                id: taskPayload.task_execution_id
            }
        }
    );
}

module.exports = {
    runTask,
    findTaskExecutionById,
    createExecutionTask,
    getAllTasksValidTasks,
    getAllExecutionTaskToday
}