const { where } = require("sequelize");
const Task = require("../models/Task");
const ArCondicionado = require("../models/ArCondicionado");

async function createTask(dateTime, temperatura, aresCondicionadosId) {

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
            dateTime
        })

        const associations = aresCondicionadosId.map(async (arId) => {
            await task.addArCondicionado(arId, { through: { temperatura } });
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
    const tasks = Task.findAll(
        {
            where: {
                status: "pending"
            }
        }
    );
    return tasks;
}

module.exports = {
    createTask,
    getAllTasks,
    getAllTasksPending
}