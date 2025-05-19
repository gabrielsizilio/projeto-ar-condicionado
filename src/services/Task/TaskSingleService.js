const { Op } = require("sequelize");
const TaskSingle = require("../../models/TaskSingle");
const { createTask } = require("./TaskService");
const Task = require("../../models/Task");

async function createSingleTask({ temperatura, arCondicionadoIds, dateTime }) {
    const date = new Date(dateTime);
    const time = date.toTimeString().slice(0, 8);

    console.log(arCondicionadoIds);
    
    const task = await createTask(temperatura, arCondicionadoIds, time);

    try {
        const taskSingle = await TaskSingle.create({
            date: dateTime,
            task_id: task.id
        });

        return task;

    } catch (error) {
        console.error(">> Erro ao criar uma taskSingle: ", error);
        throw error;
    }
}

async function getSingleTasksToday() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const tasks = await TaskSingle.findAll({
        where: {
            date: {
                [Op.between]: [startOfDay, endOfDay]
            },
        }, include: [{
            model: Task,
            as: "task",
            where: { status: "ACTIVE" },
            include: [{ association: "aresCondicionados" }]
        }]
    });
    // console.log(tasks);

    return tasks;
}

module.exports = {
    getSingleTasksToday,
    createSingleTask
}