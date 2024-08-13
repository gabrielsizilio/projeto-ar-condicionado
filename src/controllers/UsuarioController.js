const Usuario = require('../models/Usuario')
const CredencialController = require('../controllers/CredencialController')
const Credencial = require('../models/Credencial')
const bcrypt = require('bcryptjs')
const Areas = require('../models/Area')
const Role = require('../models/Role')
const { checkToken } = require('../config/auth')
const Area = require('../models/Area')
const { getLinkFirstAccess, getUserByLinkHash } = require('../services/usuarioService')

async function index(req, res) {

    const usuarios = await Usuario.findAll({ include: [{ model: Credencial, as: 'credencial' }, { model: Area, as: 'areas' }] })
    const areas = await Areas.findAll()
    const roles = await Role.findAll()

    let credencialId = req.cookies.jwt;
    credencialId = checkToken(credencialId).id;
    const credencial = await Credencial.findByPk(credencialId,
        {
            include: [{
                model: Usuario,
                as: 'usuario',
            }]
        }
    )

    user = credencial.usuario;

    try {
        res.status(200).render('usuarios/index', { user, usuarios, areas, roles })
    } catch (error) {
        res.send(`Erro: ${error}`)

    }
}

async function store(req, res) {
    const { nome, role_id, nickname, areas } = req.body

    if (!nome || !nickname) {
        return res.status(400).json({ msgErr: "Campos obrigatório não preenchidos" })
    }

    const { credencial } = await CredencialController.create(req, res)

    try {
        const role = await Role.findByPk(role_id)

        if (role) {
            const usuario = await Usuario.create({
                nome: nome,
                nickname: nickname,
                role_id: role.id,
                credencial_id: credencial.id
            })


            if (areas) {
                areas.forEach(async (areaId) => {
                    var area = await Areas.findByPk(areaId)
                    if (area) {
                        await usuario.addArea(area)
                    } else {
                        return res.send('!> Área não encontrada no banco')
                    }
                });
            }

            const linkFirstAccess = await getLinkFirstAccess(usuario);

            return res.send(linkFirstAccess);
        }

    } catch (error) {
        return res.send(`!> Ocorreu um erro ao cadastrar novo usuário: ${error}`)
    }
}

async function update(req, res) {
    const usuario_id = req.params.id
    const { nome, nickname, tipo, email } = req.body;



    if (!usuario_id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual o usuário a ser editado.' })
    }

    const usuario = await Usuario.findOne({
        where: { id: usuario_id },
        include: [{ association: 'credencial' }, { association: 'areas' }, { association: 'role' }]
    })

    if (!usuario) {
        return res.status(400).json({ msgErr: 'Usuário não encontrado no sistema.' })
    }

    usuario.nome = nome;
    usuario.nickname = nickname;
    usuario.credencial.email = email;
    usuario.role_id = tipo;

    if (req.body.novaSenha) {
        const novaSenha = req.body.novaSenha;
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(novaSenha, salt);

        const credencial = await usuario.credencial.update({
            senha: senhaHash
        });

        // return res.status(200).json({msgSuccess: "Senha alterada com sucesso."});
        req.flash('success', 'Senha atualizada com sucesso');
        return res.redirect('back');
    }

    try {
        await usuario.save();
    } catch (error) {
        console.log("Erro ao atualizar o usuario: ", error);
    }

    return res.redirect('back');
}

async function remove(req, res) {
    const usuario_id = req.params.id


    if (!usuario_id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual o usuário a ser removido.' })
    }
    const usuario = await Usuario.findByPk(usuario_id)
    const credencial = await Credencial.findByPk(usuario.credencial_id)

    try {
        await credencial.destroy()
        res.set('msg', 'Usuário excluido com sucesso')
        res.redirect('back')
    } catch (error) {
        return res.send(`Erro: ${error}`)
    }

}

async function registerUser(req, res) {
    const { email } = req.params;

    try {
        const credencial = await Credencial.findOne({
            where: {
                email: email
            }
        })

        if (credencial) {
            if (req.body.novaSenha) {
                const novaSenha = req.body.novaSenha;
                const salt = await bcrypt.genSalt(12);
                const senhaHash = await bcrypt.hash(novaSenha, salt);

                await credencial.update({
                    senha: senhaHash
                });

                req.flash('success', 'Senha atualizada com sucesso');
                return res.status(200).redirect('/');
            } else {
                return res.status(400).send({ message: 'O campo de nova senha não pode estar vazio' });
            }
        } else {
            console.log(">> Credencial NÃO encontrada!");
            return res.status(404).send({ message: "Credencial não encontrada" });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Erro ao buscar credencial' });
    }
}

async function registerUserIndex(req, res) {
    const { token } = req.query;

    const user = await getUserByLinkHash(token);

    res.status(200).render('primeiroAcesso/index', { user })
}


module.exports = {
    index,
    store,
    update,
    remove,
    registerUser,
    registerUserIndex
}