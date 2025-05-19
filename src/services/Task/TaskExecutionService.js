const Task = require("../../models/Task");
const TaskExecution = require("../../models/TaskExecution");
const TaskService = require("../Task/TaskService");
const TaskWeeklyService = require("./TaskWeeklyService");
const TaskSingleService = require("./TaskSingleService");
const TaskException = require("../../models/TaskException");
const { Op, DataTypes } = require("sequelize");
const TaskExceptionService = require("./TaskExceptionService");
const SocketService = require("../SocketService");
const macAddressMapping = require("../../websocket");
const Temperatura = require("../../models/Temperatura");

function getTodayWithTaskTime(taskTime) {
    const [hours, minutes, seconds] = taskTime.split(":").map(Number);
    const now = new Date();

    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(seconds || 0);
    now.setMilliseconds(0);

    return now;
}

function verifyConcurrence(tasks, gap = 1) {
    let taskMap = new Map();

    tasks.forEach((taskWrap, taskIndex) => {
        const task = taskWrap.task;

        task.aresCondicionados.forEach((arCondicionado, index) => {

            let dateTime = new Date();
            let time = task.time;
            let [hours, minutes, seconds] = time.split(":").map(Number);

            dateTime.setHours(hours, minutes, seconds, 0);
            let key = dateTime.toISOString();

            if (taskMap.has(key)) {
                if (gap == 0) {
                    taskMap.get(key).push({ arCondicionado, time, taskIndex, task })
                } else {
                    while (taskMap.has(key)) {
                        dateTime.setSeconds(dateTime.getSeconds() + gap);

                        key = dateTime.toISOString();
                    }
                    const newTime = dateTime.toTimeString().split(" ")[0];
                    taskMap.set(key, [{ arCondicionado, time: newTime, taskIndex, task }]);
                }
            } else {
                taskMap.set(key, [{ arCondicionado, time, taskIndex, task }]);
            }
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

async function filterTasksWithoutExecution(tasks) {
    const taskIds = tasks.map(t => t.task.id);
    
    const exceptions = await TaskExecution.findAll({
        where: {
            task_id: { [Op.in]: taskIds }
        }
    });

    const exceptionTaskIds = new Set(exceptions.map(e => e.task_id));
    const validTasks = tasks.filter(t => !exceptionTaskIds.has(t.task.id));

    return validTasks;
}

async function getAllExecutionTask() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const tasksPending = await TaskExecution.findAll({
        where: {
            status: "PENDING",
            createdAt: {
                [Op.between]: [todayStart, todayEnd]
            },
        },
        include: [{
            association: "task",
            include: [{
                association: "aresCondicionados",
                include: [{
                    association: "controlador"
                }]
            }]
        }]
    });

    return tasksPending;
}

async function getExecutionTaskPendingByPk(task_id) {
    const tasksPending = await TaskExecution.findAll({
        where: [{
            status: "PENDING"
        }, { task_id }]
    })

    return tasksPending;
}

async function createExecutionTask(taskMap) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // tasksAlreadyExist = await getAllExecutionTask();

    for (const [key, tasks] of taskMap.entries()) {
        for (const task of tasks) {
            try {
                await TaskExecution.create({
                    task_id: task.task.id,
                    scheduled_for: new Date(key),
                    status: "PENDING"
                });

            } catch (err) {
                console.error(`Erro ao criar execução para task_id=${task.task_id}:`, err);
            }
        }
    }
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

async function runTask(task) {
    const now = new Date();
    console.log(`[${now}] >> RUNING TASK_ID: ${task.id} -> ${task.aresCondicionados.nome}`);

    const comando = {
        id_controlador: task.aresCondicionados[0].controlador.macAddress,
        id_arcondicionado: task.aresCondicionados[0].id,
        temperatura: `${task.temperatura}`
    }
    task.aresCondicionados[0].controlador

    await SocketService.enviaComando(comando, macAddressMapping);

    await TaskExecution.update(
        { status: "COMPLETED" },
        {
            where: {
                task_id: task.id
            }
        }
    );


}


module.exports = {
    runTask,
    findTaskExecutionById,
    createExecutionTask,
    getAllTasksValidTasks,
    getAllExecutionTask
}