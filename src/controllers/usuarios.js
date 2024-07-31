const knex = require("knex")
const bcrypt = require("bcrypt")

const logarUsuario = async (req, res) => {
    const {email, senha} = req.body

    try {

    const usuarioEncontrado = await knex('usuarios').where({email})

    const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha)
        if (!senhaValida) {
            return res.status(400).json({messagem: 'Senha inválida'})
        }

    const token = jwt.sign({id: usuarioEncontrado.id}, process.env.SENHA_JWT, {expiresIn: '12h'})

    const {senha: _, ...dadosUsuario} = usuarioEncontrado

    return res.status(200).json({
        usuario: dadosUsuario,
        token
    })

    } catch (error) {
        return res.status(500).json({
            messagem: "Erro interno no servidor"
        })
    }
}
    module.exports = logarUsuario