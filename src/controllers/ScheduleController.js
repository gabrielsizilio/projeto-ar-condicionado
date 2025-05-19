const ArCondicionado = require("../models/ArCondicionado");
const Sala = require("../models/Sala");
const { verifyTasks } = require("../services/CronService");
const { createSingleTask } = require("../services/Task/TaskSingleService");
const { getUserByJWT } = require("../services/usuarioService");

class ScheduleController {

    async index(req, res) {
        const { sala_id } = req.params;
        const user = await getUserByJWT(req.cookies.jwt);
        const task_types = {
            Single: 'SINGLE',
            Weekly: "WEEKLY",
        };

        if (!sala_id) res.status(400).json({ msgErr: "O id é obrigatório" });

        const sala = await Sala.findByPk(sala_id);

        return res.status(200).render('schedule/index', { user, sala, task_types });;
    }

    async store(req, res) {
        const { sala_id } = req.params;
        const { temp, startDateTime, endDateTime, taskType, weekday } = req.body;

        const aresCondicionados = await ArCondicionado.findAll({
            where: {
                sala_id
            },
        });

        const ids = aresCondicionados.map(ac => ac.id);

        await createSingleTask({ temperatura: temp, arCondicionadoIds: ids, dateTime: startDateTime });
        await verifyTasks();

        res.status(201).json({ sala_id, temp, startDateTime, endDateTime, taskType, weekday });

    }

    async remove(req, res) {
        const { sala_id } = req.params;

        res.status(200).json({ sala_id });
    }
}

module.exports = new ScheduleController();