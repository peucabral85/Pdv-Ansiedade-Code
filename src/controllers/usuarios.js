const knex = require('../connections/conexao')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const logarUsuario = async (req, res) => {
    const {email, senha} = req.body

    try {

    const usuarioEncontrado = await knex('usuarios').where({email}).first()

    const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha)
        if (!senhaValida) {
            return res.status(400).json({messagem: 'Senha inválida'})
        }

    const token = jwt.sign({id: usuarioEncontrado.id}, process.env.SENHA_JWT, {expiresIn: '12h'})

    const {senha: _, ...dadosUsuario} = usuarioEncontrado

    const usuario = {
        usuario: dadosUsuario,
        token
    }

    return res.status(200).json(usuario)

    } catch (error) {
        return res.status(500).json(
            error.message
        )
    }
}

module.exports = {
    logarUsuario
}