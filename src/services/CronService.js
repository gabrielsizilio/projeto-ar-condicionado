var cron = require("node-cron");
const { getAllTasks, getAllTasksPending, createTask } = require("./TaskService");
verifyTasks();

function dateToCron(dateTime, gap = 0) {
    const date = new Date(dateTime);
    date.setSeconds(date.getUTCSeconds() + gap);
    
    const seconds = date.getUTCSeconds();
    const minutes = date.getUTCMinutes();
    const hours = date.getUTCHours();
    const dayOfMonth = date.getUTCDate();
    const month = date.getUTCMonth() + 1;

    const cronExpression = `${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} *`
    console.log(cronExpression);

    return cronExpression;
}

let tasks = [];
async function verifyTasks() {
    try {
        const dateTime = new Date('2025-01-31T23:59:59.000Z');
        const temperatura = 1;
        const aresCondicionadosId = [1, 4];
        const type = "single"

        // await createTask(dateTime, temperatura, aresCondicionadosId, type);

        tasks = await getAllTasksPending();

        let gap = 0;
        tasks.forEach((task, index) => {
            console.log(task.aresCondicionados);
            
            const cronExpression = dateToCron(task.dateTime, gap);

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
