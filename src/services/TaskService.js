const { where } = require("sequelize");
const Task = require("../models/Task");

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
    getAllTasks,
    getAllTasksPending
}