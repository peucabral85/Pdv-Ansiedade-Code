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
    try {
        const emailValidado = await knex('cliente').where('email', 'ilike', email).first();
        
            return emailValidado;
    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}

const verificarCpfExistenteCliente = async (cpf) => {
    try {
        const cpfValidado = await knex('cliente').where('cpf', 'ilike', cpf).first();
    
            return cpfValidado;
    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}

module.exports = {
    insertCliente,
    verificarCpfExistenteCliente,
    verificarEmailExistenteCliente
}