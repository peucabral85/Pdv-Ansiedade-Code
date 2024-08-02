const knex = require('../connections/conexao')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const logarUsuario = async (req, res) => {
    const {email, senha} = req.body

    try {

    const usuarioEncontrado = await knex('usuarios').where({email}).first()
if (!usuarioEncontrado) { 
    return res.status(401).json({ mensagem: "Usuário e/ou senha inválido(s)." }); 
}
    const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha)
        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Usuário e/ou senha inválido(s)." })
        }

    const token = jwt.sign({id: usuarioEncontrado.id}, process.env.PASS_JWT, {expiresIn: '12h'})

    const {senha: _, ...dadosUsuario} = usuarioEncontrado

    const usuario = {
        usuario: dadosUsuario,
        token
    }

    return res.status(200).json(usuario)

    } catch (error) {
        return res.status(500).json(
            {mensagem: "Erro interno do servidor."}
        )
    }
}

module.exports = {
    logarUsuario
}