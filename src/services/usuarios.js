const knex = require('../connections/conexao');

const verificarEmailExistente = async (email) => {
    const emailValidado = await knex('usuarios')
        .where('email', 'ilike', email).first();

    return emailValidado;
}

const updateSenhaUsuario = async (id, senha) => {
    await knex('usuarios').update({ senha }).where({ id });
}

module.exports = {
    verificarEmailExistente,
    updateSenhaUsuario
}