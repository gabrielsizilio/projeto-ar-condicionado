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

    if (task.type == "recurring") {
        dayOfMonth = "*"
        month = "*"
    }

    const cronExpression = `${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} *`
    // console.log(cronExpression);

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
    try {
        const dateTime = new Date('2025-01-17T12:02:00.000Z');
        const dateTime2 = new Date('2025-01-17T12:02:01.000Z');
        const temperatura = 1;
        const aresCondicionadosId = [1, 2, 3, 4];
        const aresCondicionados2Id = [2, 3];
        const type = "single"
        const type2 = "recurring"

        // await createTask(dateTime, temperatura, aresCondicionadosId, type2);
        // await createTask(dateTime2, temperatura, aresCondicionados2Id, type);

        tasks = await getAllTasksPending();
        console.log(">> TASK FINDEED:", tasks.length);
        const taskMap = verifyConcurrence(tasks);

        let gap = 0;
        let lastScheduledTime = {};
        tasks.forEach((task, index) => {
            gap = 0;
            task.aresCondicionados.forEach((arCondicionado, index) => {
                const taskKey = task.dateTime.toISOString();

                if (lastScheduledTime[taskKey]) {
                    gap += 1;
                } else {
                    lastScheduledTime[taskKey] = true;
                }

                const cronExpression = dateToCron(task, gap);

                cron.schedule(cronExpression, async () => {
                    await runTask(task, arCondicionado);
                });
            })
        });


    } catch (error) {
        console.error(">> Erro ao verificar todas as tasks:: " + error);

    }
}
