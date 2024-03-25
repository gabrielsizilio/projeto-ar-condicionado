const Role = require('../models/Role');

async function store(req, res) {
    const { nome } = req.body

    if (!nome) {
        return res.status(400).json({ msgErr: 'Campos obrigatórios não preenchidos.' })
    }

    try {
        await Role.create({
            nome
        })

        return res.redirect('back');
    } catch (error) {
        res.status(500).json({ msgErr: 'Ocorreu um erro: ', error })
    }
}

async function remove(req, res) {
    const role_id = req.params.id

    if (!role_id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual role será removida.' })
    }

    try {
        const role = await Role.findByPk(role_id)

        if (!role) {
            return res.status(404).json({ msgErr: 'Role não encontrada.' })
        }

        await role.destroy()

        return res.json({ msg: "Role excluída do sistema" })

    } catch (error) {
        return res.status(500).json({ msgErr: "Ocorreu um erro! ", error });
    }
}

module.exports = {
    store,
    remove
}