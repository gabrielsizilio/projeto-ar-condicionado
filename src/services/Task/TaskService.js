const { where, Op } = require("sequelize");
const Task = require("../../models/Task");
const ArCondicionado = require("../../models/ArCondicionado");
const TaskSingle = require("../../models/TaskSingle");
const TaskWeekly = require("../../models/TaskWeekly");
//const TaskAr = require("../../models/TaskAr");

async function createTask(temperatura, aresCondicionadosId, time) {

    console.log(aresCondicionadosId);

    const aresCondicionados = await ArCondicionado.findAll({
        where: {
            id: aresCondicionadosId
        }
    });

    if (aresCondicionados.length == 0) {
        throw new Error("Nenhum ar condicionado encontrado com os ID's fornecidos.");
    }

    try {
        const task = await Task.create({
            temperatura,
            time,
            status: "ACTIVE"
        })

        const associations = aresCondicionadosId.map(async (arId) => {
            await task.addAresCondicionados(arId, { through: { temperatura } });
        });

        await Promise.all(associations);

        return task;
    } catch (error) {
        console.error(">> Erro ao criar uma task: ", error);

        throw error;
    }
}

async function getAllTasks() {
    const tasks = Task.findAll();

    return tasks;
}

async function getTasksBySala(salaId) {

    const tasks = await Task.findAll({
        include: [{
            association: "aresCondicionados",
            where: {
                sala_id: salaId
            }
        },
        {
            association: "executions",
            where: {
                status: "PENDING"
            }
        }]
    });

    console.log(tasks);

    // const aresCondicionados = await ArCondicionado.findAll({
    //     where: {
    //         sala_id: salaId
    //     },
    // });

    // if (!aresCondicionados || aresCondicionados.length === 0) {
    //     console.log('Nenhum ArCondicionado encontrado para a sala_id:', salaId);
    //     return []; 
    // }

    // const ids = aresCondicionados.map(ac => ac.id);

    // const taskAr = await TaskAr.findAll({
    //     where: {
    //         ar_id: {
    //             [Op.in]: ids
    //         }
    //     },
    //     attributes: ["ar_ir"]
    // });

    // if (!taskAr || taskAr.length === 0) {
    //     console.log('Nenhuma tarefa encontrada para os Air_ids:', ids);
    //     return []; 
    // }

    // const taskIds = taskAr.map(task => task.task_id);

    // const tasks = await Task.findAll({
    //     where: {
    //         id: {
    //             [Op.in]: taskIds
    //         }
    //     }
    // });

    return tasks;
}

async function getTaskById(taskId) {
    const task = await Task.findByPk(taskId);
    if (task == null) {
        throw error("Task não encontrada!");
    }
    return task;
}

async function getAllTasksPending() {
    const tasks = await Task.findAll(
        {
            where: {
                status: "   "
            },
            include: {
                association: "aresCondicionados"
            }
        }
    );
    return tasks;
}

async function runTask(task, arCondicionado) {
    const now = new Date();
    // TODO: Mandar sinal de acordo com a task para o arCondicionado
    console.log(`[${now}] >> RUNING TASK_ID: ${task.id} -> ${arCondicionado.nome}`);
    try {
        if (task.type == "single") {
            await task.update({ status: "completed" });
        }
    } catch (error) {
        console.error(`Erro ao atualizar o status da task: ${task.id}`);
    }
}

module.exports = {
    getTaskById,
    createTask,
    getAllTasks,
    getTasksBySala,
    getAllTasksPending,
    runTask
}