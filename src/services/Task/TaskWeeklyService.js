const { Op } = require("sequelize");
const TaskWeekly = require("../../models/TaskWeekly");
const { createTask } = require("./TaskService");
const Task = require("../../models/Task");

async function createWeeklyTask({ temperatura, arCondicionadoIds, weekday, time, start_date, end_date }) {
    const task = await createTask(temperatura, arCondicionadoIds, time);

    try {
        const taskWeekly = await TaskWeekly.create({
            task_id: task.id,
            weekday,
            time,
            start_date,
            end_date
        });

        return taskWeekly;
    } catch (error) {
        console.error(">> Erro ao criar uma taskWeekly: ", error);
        throw error;
    }
}

async function getWeeklyTasksToday() {
    const now = new Date();
    const weekday = now.getDay();
    const today = new Date();

    const tasks = await TaskWeekly.findAll({
        where: {
            weekday,
            end_date: {[Op.gte]: today}
        }, include: [{
            model: Task,
            as: "task",
            where: {status: "ACTIVE"}, 
            include:[{
                association: "aresCondicionados"
            }]
        }]
    });
    // console.log(tasks);
    
    return tasks;
}

module.exports = {
    createWeeklyTask,
    getWeeklyTasksToday
}