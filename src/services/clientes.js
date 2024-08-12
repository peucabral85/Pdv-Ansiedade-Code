const knex = require('../connections/conexao');

const insertCliente = async (nome, email, cpf, cep, rua, numero, bairro, cidade, estado) => {
    const cliente = await knex('clientes').insert({
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
    }).returning('*');

    return cliente[0];
}

const selectClienteUnico = async ( id ) => {
    const cliente = await knex("clientes").where('id', id).first();

    return cliente;
}

const verificarEmailExistenteCliente = async (email) => {
    const emailValidado = await knex('clientes').where('email', 'ilike', email).first();

    return emailValidado;
}

const verificarCpfExistenteCliente = async (cpf) => {
    const cpfValidado = await knex('clientes').where('cpf', 'ilike', cpf).first();

    return cpfValidado;
}

module.exports = {
    insertCliente,
    verificarCpfExistenteCliente,
    verificarEmailExistenteCliente,
    selectClienteUnico
}