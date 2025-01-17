var cron = require("node-cron");
const { getAllTasks, getAllTasksPending, createTask, runTask } = require("./TaskService");
verifyTasks();

function dateToCron(task, gap = 0) {
    const date = new Date(task.dateTime);
    date.setSeconds(date.getUTCSeconds() + gap);

    const seconds = date.getUTCSeconds();
    const minutes = date.getUTCMinutes();
    const hours = date.getUTCHours();
    let dayOfMonth = date.getUTCDate();
    let month = date.getUTCMonth() + 1;

    if(task.type == "recurring") {
        dayOfMonth = "*"
        month = "*"
    }

    const cronExpression = `${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} *`
    console.log(cronExpression);

    return cronExpression;
}

let tasks = [];
async function verifyTasks() {
    try {
        const dateTime = new Date('2025-01-17T11:23:30.000Z');
        const dateTime2 = new Date('2025-01-17T11:23:31.000Z');
        const temperatura = 1;
        const aresCondicionadosId = [1, 2, 3, 4];
        const aresCondicionados2Id = [2, 3];
        const type = "single"
        const type2 = "recurring"

        // await createTask(dateTime, temperatura, aresCondicionadosId, type2);
        // await createTask(dateTime, temperatura, aresCondicionados2Id, type);

        tasks = await getAllTasksPending();

        let gap = 0;
        tasks.forEach((task, index) => {
            // console.log(task.aresCondicionados);

            task.aresCondicionados.forEach((arCondicionado, index) => {
                const cronExpression = dateToCron(task, gap);
                gap += 1;

                cron.schedule(cronExpression, async () => {
                    await runTask(task, arCondicionado);
                });
            })
        });
        gap = 0;

        console.log(">> TASK FINDEED:", tasks.length);
    } catch (error) {
        console.error(">> Erro ao verificar todas as tasks:: " + error);

    }
}
