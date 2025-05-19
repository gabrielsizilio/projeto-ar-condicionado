const { Op } = require("sequelize");
const TaskException = require("../../models/TaskException");


async function addException(taskId, date) {
    try {
        TaskException.create({
            task_id: taskId,
            date
        });
    } catch (error) {
        console.error("Erro ao adicionar uma exceção à uma task!");
        throw error;
    }
}

async function filterTasksWithoutException(tasks) {
    const today = new Date();
    const taskIds = tasks.map(t => t.task.id);
    
    const exceptions = await TaskException.findAll({
        where: {
            task_id: { [Op.in]: taskIds },
            date: today
        }
    });

    const exceptionTaskIds = new Set(exceptions.map(e => e.task_id));
    const validTasks = tasks.filter(t => !exceptionTaskIds.has(t.task.id));

    return validTasks;
}


module.exports = {
    filterTasksWithoutException,
    addException
}