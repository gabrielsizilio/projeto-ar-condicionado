var cron = require("node-cron");
const { getAllTasks, getAllTasksPending } = require("./TaskService");
getTasks();

let tasks = [];
async function getTasks() {
    try {
        tasks = await getAllTasksPending();
        console.log(">> TASK FINDEED:", JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error(">> Erro ao buscar todas as tasks:: " + error);
        
    }
}

cron.schedule("* * * * * *", () => {
    console.log("RUNING" + JSON.stringify(tasks, null, 2));
});

