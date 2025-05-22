var cron = require("node-cron");
const TaskService = require("./Task/TaskService");
const TaskWeeklyService = require("./Task/TaskWeeklyService");
const TaskSingleService = require("./Task/TaskSingleService");
const TaskExecutionService = require("./Task/TaskExecutionService");
const { runTask } = require("./Task/TaskExecutionService")
verifyTasks();

function dateToCron(date) {
    const taskDate = new Date(date);

    date.setSeconds(date.getSeconds());

    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    let dayOfMonth = date.getDate();
    let month = date.getMonth() + 1;

    const cronExpression = `${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} *`

    return cronExpression;
}

let tasks = [];
async function verifyTasks() {
    console.log("verificando...");

    const dateTime = new Date('2025-05-18 12:02:00.000Z');
    const start_date = new Date('2025-01-17T12:02:00.000Z');
    const end_date = new Date('2025-01-30T12:02:00.000Z');

    const tasks = await TaskExecutionService.getAllTasksValidTasks();
    await TaskExecutionService.createExecutionTask(tasks);
    tasksToday = await TaskExecutionService.getAllExecutionTaskToday();

    await cronSchedule(tasksToday);
}

async function cronSchedule(tasks) {
    
    tasks.forEach(async (taskExecution, index) => {

        const taskPayload = {
            task_execution_id: taskExecution.id,
            task_id: taskExecution.task.id,
            id_controlador: taskExecution.arCondicionado.controlador.macAddress,
            id_arcondicionado: taskExecution.arCondicionado.id,
            temperatura: taskExecution.task.temperatura
        }
        
        const cronExpression = dateToCron(taskExecution.scheduled_for);
        // const cronExpression = "* * * * *";

        cron.schedule(cronExpression, async () => {
            await runTask(taskPayload);
        });
    });
}

module.exports = {
    verifyTasks
}