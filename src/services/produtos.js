const knex = require('../connections/conexao');
const clients3 = require('../connections/conexaoAws');
const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')

const cadastrarProdutoService = async (descricao, quantidade_estoque, valor, categoria_id) => {
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
    const pedido = await knex('pedido_produtos')
        .where({ produto_id })
        .first();

    return pedido;
}

const atualizarImagemService = async (id, imagem_url) => {
    await knex('produtos')
        .update({ imagem_url })
        .where({ id });
}

const enviarImagem = async (path, buffer, mimeType) => {
    await clients3.send(
        new PutObjectCommand({
            Bucket: process.env.STORAGE_BUCKET,
            Key: path,
            Body: buffer,
            ContentType: mimeType,
        })
    );

    return {
        path: path,
        url: `${process.env.STORAGE_BASEURL}/${process.env.STORAGE_BUCKET}/${path}`
    }
}

const deletarImagem = async (path) => {
    await clients3.send(
        new DeleteObjectCommand({
            Bucket: process.env.STORAGE_BUCKET,
            Key: path
        })
    );
}

module.exports = {
    cadastrarProdutoService,
    atualizarProdutoService,
    excluirProdutoService,
    obterListaProdutos,
    obterProdutoPorId,
    enviarImagem,
    deletarImagem,
    atualizarImagemService,
    atualizarEstoqueProduto,
    verificarSeExistePedidoParaProduto
}