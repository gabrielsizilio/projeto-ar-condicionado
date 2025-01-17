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
        const dateTime = new Date('2025-01-17T11:02:00.000Z');
        const dateTime2 = new Date('2025-01-17T11:02:01.000Z');
        const temperatura = 1;
        const aresCondicionadosId = [1, 2, 3, 4];
        const aresCondicionados2Id = [2, 3];
        const type = "single"

        // await createTask(dateTime, temperatura, aresCondicionadosId, type);
        // await createTask(dateTime, temperatura, aresCondicionados2Id, type);

        tasks = await getAllTasksPending();

        let gap = 0;
        tasks.forEach((task, index) => {
            // console.log(task.aresCondicionados);

            task.aresCondicionados.forEach((arCondicionado, index) => {
                const cronExpression = dateToCron(task.dateTime, gap);
                gap += 1;

                cron.schedule(cronExpression, () => {
                    const now = new Date();
                    // TODO: Mandar sinal de acordo com a task para o arCondicionado
                    console.log(`[${now}] >> RUNING TASK_ID: ${task.id} -> ${arCondicionado.nome}`);
                    
                });
            })
        });
        gap = 0;

        console.log(">> TASK FINDEED:", tasks.length);
    } catch (error) {
        console.error(">> Erro ao buscar todas as tasks:: " + error);

    }
}
