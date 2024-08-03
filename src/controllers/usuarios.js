const bcrypt = require('bcrypt');
const knex = require('../connections/conexao');

const cadastrarUsuario = async (req, res) => {

    const { nome, email, senha } = req.body;
 
    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }
    try {
        const emailJaCadastrado = await knex('usuarios').where({email}).first()
        if (emailJaCadastrado) {
            return res.status(400).json({erro: 'Email já cadastrado'})
        }
        const senhaHasheada = await bcrypt.hash(senha, 10)
        const usuario = await knex('usuarios').insert({nome, email, senha:senhaHasheada}).returning('*')
        if (!usuario) {
            return res.staus(400).json({erro: 'Usuário não cadastrado'})
        }
        return res.json(usuario)
        } catch(error) {
            res.status(500).json(error.message)
    }
}
module.exports = {cadastrarUsuario}