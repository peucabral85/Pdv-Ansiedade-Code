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

const updateCliente = async (nome, email, cpf, cep, rua, numero, bairro, cidade, estado, id) => {
    await knex('clientes').update({
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
    }).where({ id });
}

const listaClientes = async () => {
    const clientes = await knex('clientes').orderBy('id');

    return clientes;
}

const selectClienteUnico = async (id) => {
    const cliente = await knex('clientes').where({ id }).first();

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
    updateCliente,
    listaClientes,
    selectClienteUnico,
    verificarCpfExistenteCliente,
    verificarEmailExistenteCliente
}