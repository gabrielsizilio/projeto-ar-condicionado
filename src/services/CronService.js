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

function verifyConcurrence(tasksPending) {
    let taskMap = new Map();

    tasksPending.forEach((task, taskIndex) => {
        task.aresCondicionados.forEach((arCondicionado, index) => {
            const newDateTime = new Date(task.dateTime);
            newDateTime.setSeconds(newDateTime.getUTCSeconds() + index);

            while (taskMap.has(newDateTime.toISOString())) {
                newDateTime.setSeconds(newDateTime.getUTCSeconds() + 1);
            }

            if (!taskMap.has(newDateTime.toISOString())) {
                taskMap.set(newDateTime.toISOString(), []);
            }

            taskMap.get(newDateTime.toISOString()).push({ arCondicionado, dateTime: newDateTime, taskIndex });
        });
    });

    taskMap.forEach((tasks, key) => {
        console.log(`Horário: ${key}`);
        tasks.forEach((taskData, index) => {
            console.log(`  Task ${taskData.taskIndex + 1}: ${taskData.arCondicionado.nome} às ${taskData.dateTime.toISOString()} \n`);
        });
    });
}


let tasks = [];
async function verifyTasks() {

    const dateTime = new Date('2025-05-18 12:02:00.000Z');
    const start_date = new Date('2025-01-17T12:02:00.000Z');
    const end_date = new Date('2025-01-30T12:02:00.000Z');
    //  await TaskSingleService.createSingleTask({ temperatura: 24, arCondicionadoIds: [1], dateTime });
    //  await TaskSingleService.createSingleTask({ temperatura: 25, arCondicionadoIds: [2], dateTime });
    // await TaskWeeklyService.createWeeklyTask({ temperatura: 22, arCondicionadoIds: [3, 4], weekday: 0, time: "08:30:00", start_date, end_date });

    const tasks = await TaskExecutionService.getAllTasksValidTasks();
    TaskExecutionService.createExecutionTask(tasks);
    tasksToday = await TaskExecutionService.getAllExecutionTask();

    await cronSchedule(tasksToday);
}

async function cronSchedule(tasks) {

    tasks.forEach(async (taskWrap, index) => {
        const task = taskWrap.task;
        
        const cronExpression = dateToCron(taskWrap.scheduled_for);
        // const cronExpression = "* * * * * *";

        cron.schedule(cronExpression, async () => {
            await runTask(task);
        });
    });
}