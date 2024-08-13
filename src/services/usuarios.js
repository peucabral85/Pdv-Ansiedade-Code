const knex = require('../connections/conexao');

const verificarUsuario = async (id) => {
    const usuarioValidado = await knex('usuarios').where({ id }).first();

    return usuarioValidado;
}

const verificarEmailExistente = async (email) => {
    const emailValidado = await knex('usuarios').where('email', 'ilike', email).first();

    return emailValidado;
}

const insertUsuario = async (nome, email, senha) => {
    const usuario = await knex('usuarios').insert({ nome, email, senha }).returning(['id', 'nome', 'email']);

    return usuario[0];
}

const updateSenhaUsuario = async (id, senha) => {
    await knex('usuarios').update({ senha }).where({ id });
}

const updateUsuario = async (nome, email, id) => {
    await knex("usuarios").update({ nome, email }).where({ id });
}

module.exports = {
    verificarEmailExistente,
    updateSenhaUsuario,
    verificarUsuario,
    insertUsuario,
    updateUsuario
}