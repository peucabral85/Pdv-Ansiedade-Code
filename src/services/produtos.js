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
        }).orderBy('id');

    return produtos;
}

const obterProdutoPorId = async (id) => {
    return await knex('produtos')
        .where({ id })
        .first();
}

const atualizarProdutoService = async (descricao, quantidade_estoque, valor, categoria_id, id) => {
    await knex('produtos')
        .update({ descricao, quantidade_estoque, valor, categoria_id })
        .where({ id });
}

const excluirProdutoService = async (id) => {
    await knex('produtos')
        .delete().where({ id });
}

const atualizarEstoqueProduto = async (id, quantidade_produto, transacao) => {
    await transacao('produtos')
        .update({ quantidade_estoque: knex.raw('quantidade_estoque - ?', [quantidade_produto]) })
        .where({ id });
}

const verificarSeExistePedidoParaProduto = async (produto_id) => {
    const pedidoPendente = await knex('pedidos_produtos')
        .where({ produto_id })
        .first()

    return pedidoPendente
}

module.exports = {
    insertProduto,
    obterListaProdutos,
    obterProdutoPorId,
    atualizarProdutoService,
    excluirProdutoService,
    atualizarEstoqueProduto,
    verificarSeExistePedidoParaProduto
}