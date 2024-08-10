const knex = require('../connections/conexao');

const insertProduto = async (descricao, quantidade_estoque, valor, categoria_id) => {
    const produto = await knex('produtos')
        .insert({ descricao, quantidade_estoque, valor, categoria_id })
        .returning('*');

    return produto[0];
}

const obterListaProdutos = async (filtro) => {
    const produtos = await knex('produtos as p')
        .join('categorias as c', 'p.categoria_id', 'c.id')
        .select('p.id', 'p.descricao', 'p.quantidade_estoque', 'p.valor', 'p.categoria_id', 'c.descricao as categoria')
        .where((query) => {
            if (filtro) {
                return query.where('c.id', filtro);
            }
        });

    return produtos;
}

module.exports = {
    insertProduto,
    obterListaProdutos
}