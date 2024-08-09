const knex = require('../connections/conexao');

const insertCliente = async (nome, email, cpf, cep, rua, numero, bairro, cidade, estado) => {
    const cliente = await knex('cliente').insert({ 
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado }).returning([
            'id',
            'nome',
            'email',
            'cpf',
            'cep',
            'rua',
            'numero',
            'bairro',
            'cidade',
            'estado']);
            
    return cliente;
}

const verificarEmailExistenteCliente = async (email) => {
    const emailValidado = await knex('cliente').where('email', 'ilike', email).first();

    return emailValidado;
}

const verificarCpfExistenteCliente = async (cpf) => {
    const cpfValidado = await knex('cliente').where('cpf', 'ilike', cpf).first();
    
    return cpfValidado;
}

module.exports = {
    insertCliente,
    verificarCpfExistenteCliente,
    verificarEmailExistenteCliente
}