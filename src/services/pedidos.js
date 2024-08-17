const knex = require('../connections/conexao');
const { obterProdutoPorId, atualizarEstoqueProduto } = require('./produtos');

const validarPedido = async (pedido_produtos) => {
    const produtos = Promise.all(pedido_produtos.map(async produto => {
        const produtoEncontrado = await obterProdutoPorId(produto.produto_id);

        if (!produtoEncontrado) {
            const error = new Error(`Pedido não realizado. Produto id ${produto.produto_id} não encontrado.`);
            error.tipoErro = "PRODUTO_NAO_ENCONTRADO";
            throw error;
        }

        if (produtoEncontrado.quantidade_estoque < produto.quantidade_produto) {
            const error = new Error(`Pedido não realizado. Produto id ${produto.produto_id} não possui estoque suficiente para o pedido.`);
            error.tipoErro = "ESTOQUE_INSUFICIENTE";
            throw error;
        }

        produtoValidado = {
            produto_id: produtoEncontrado.id,
            produto: produtoEncontrado.descricao,
            quantidade_produto: produto.quantidade_produto,
            valor: produtoEncontrado.valor
        }

        return produtoValidado;
    }));

    return produtos;

}

const finalizarPedido = async (cliente, observacao, produtos) => {
    const transacao = await knex.transaction();

    const pedidoCriado = await transacao('pedidos')
        .insert({ cliente_id: cliente.id, observacao })
        .returning('*');

    for (const produto of produtos) {
        await transacao('pedidos_produtos')
            .insert({
                pedido_id: pedidoCriado[0].id,
                produto_id: produto.produto_id,
                quantidade_produto: produto.quantidade_produto,
                valor_produto: produto.quantidade_produto * produto.valor
            });

        await atualizarEstoqueProduto(produto.produto_id, produto.quantidade_produto, transacao);
    }

    const somaProdutos = await transacao('pedidos_produtos')
        .sum('valor_produto as valor_total')
        .where({ pedido_id: pedidoCriado[0].id })
        .first();

    const pedidoFinalizado = await transacao('pedidos')
        .update('valor_total', somaProdutos.valor_total)
        .where({ id: pedidoCriado[0].id })
        .returning('*');

    const pedido = {
        pedido: pedidoFinalizado[0].id,
        cliente_id: pedidoFinalizado[0].cliente_id,
        cliente: cliente.nome,
        observacao: pedidoFinalizado[0].observacao,
        valor_total: pedidoFinalizado[0].valor_total,
        produtos
    }

    return { pedido, transacao };
}

module.exports = {
    validarPedido,
    finalizarPedido
}