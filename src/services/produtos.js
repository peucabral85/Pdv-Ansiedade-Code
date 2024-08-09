const knex = require('../connections/conexao');

const insertProduto = async (descricao, quantidade_estoque, valor, categoria_id) => {
    const produto = await knex('produtos')
        .insert({ descricao, quantidade_estoque, valor, categoria_id })
        .returning('*');

    return produto[0];
}

module.exports = {
    insertProduto
}