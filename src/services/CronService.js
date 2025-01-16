var cron = require("node-cron");
const { getAllTasks, getAllTasksPending, createTask } = require("./TaskService");
getTasks();

function dateToCron(dateTime) {
    const date = new Date(dateTime);
    const seconds = date.getUTCSeconds();
    const minutes = date.getUTCMinutes();
    const hours = date.getUTCHours();
    const dayOfMonth = date.getUTCDate();
    const month = date.getUTCMonth() + 1;

    return `${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} *`;
}

let tasks = [];
async function getTasks() {
    try {
        const dateTime = new Date('2025-01-16T13:40:08.000Z');
        const temperatura = 1;
        const aresCondicionadosId = [1, 4];

        createTask(dateTime, temperatura, aresCondicionadosId);

        tasks = await getAllTasksPending();

        tasks.forEach((task, index) => {
            const cronExpression = dateToCron(task.dateTime);

            cron.schedule(cronExpression, () => {
                const now = new Date();
                console.log(`[${now}] >> RUNING TASK_ID: ${task.id}`);
            });
        });

        console.log(">> TASK FINDEED:", tasks.length);
    } catch (error) {
        console.error(">> Erro ao buscar todas as tasks:: " + error);

    }
}



