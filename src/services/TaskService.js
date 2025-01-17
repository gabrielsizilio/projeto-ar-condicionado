const { where } = require("sequelize");
const Task = require("../models/Task");
const ArCondicionado = require("../models/ArCondicionado");

async function createTask(dateTime, temperatura, aresCondicionadosId, type) {

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
            dateTime,
            type
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

async function getAllTasksPending() {
    const tasks = await Task.findAll(
        {
            where: {
                status: "pending"
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
    createTask,
    getAllTasks,
    getAllTasksPending,
    runTask
}