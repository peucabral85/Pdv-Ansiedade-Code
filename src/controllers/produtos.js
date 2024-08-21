const knex = require("knex");
const path = require("path");
const { randomUUID } = require('crypto');
const { verificaCategoria } = require("../services/categorias");
const { insertProduto,
    obterListaProdutos,
    atualizarProdutoService,
    obterProdutoPorId, 
    excluirProdutoService,
    enviarImagem,
    deletarImagem,
    atualizarImagemService,
    obterProdutoPorId, 
    excluirProdutoService, 
    verificarSeExistePedidoParaProduto
} = require("../services/produtos");

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const categoriaEncontrada = await verificaCategoria(categoria_id);

        if (!categoriaEncontrada) {
            return res.status(400).json({ mensagem: "Categoria informada não encontrada." });
        }

        const produtoCadastrado = await insertProduto(descricao, quantidade_estoque, valor, categoria_id);

        return res.status(201).json(produtoCadastrado);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
}

const listarProdutos = async (req, res) => {
    const categoria_id = req.query.categoria_id;

    try {
        if (categoria_id && !(await verificaCategoria(categoria_id))) {
            return res.status(400).json({ mensagem: "A categoria informada não foi encontrada" });
        }

        const produtosListados = await obterListaProdutos(categoria_id);

        return res.status(200).json(produtosListados);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

const detalharProduto = async (req, res) => {
    const id = req.params.id;

    try {
        const produtoExistente = await obterProdutoPorId(id);

        if (!produtoExistente) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        return res.status(200).json(produtoExistente);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const produtoExistente = await obterProdutoPorId(id);

        if (!produtoExistente) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        const categoriaEncontrada = await verificaCategoria(categoria_id);

        if (!categoriaEncontrada) {
            return res.status(400).json({ mensagem: "Categoria informada não encontrada." });
        }

        await atualizarProdutoService(descricao, quantidade_estoque, valor, categoria_id, id);

        return res.status(200).json({ mensagem: "Produto atualizado com sucesso." });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
}

const excluirProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoExistente = await obterProdutoPorId(id);

        if (!produtoExistente) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        const existeProdutoPedido = await verificarSeExistePedidoParaProduto(id);

        if (existeProdutoPedido) {
            return res.status(404).json({ mensagem: "Esse produto não pode ser excluído devido a existência de um pedido em aberto." });
        }

        await excluirProdutoService(id);

        const pathImagemProdutoDeletado = produtoExistente.imagem_url.slice(70);
        await deletarImagem(pathImagemProdutoDeletado);

        return res.status(200).json({ mensagem: "Produto excluído com sucesso." });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
}

const atualizarAdicionarImagem = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoExistente = await obterProdutoPorId(id);

        if (!produtoExistente) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        if (!req.file) {
            if (!produtoExistente.imagem_url) {
                return res.status(401).json({ mensagem: "Produto não contém imagem." });
            }

            const pathImagemProdutoDeletada = produtoExistente.imagem_url.slice(70);
            await deletarImagem(pathImagemProdutoDeletada);

            await atualizarImagemService(id, null);

            return res.status(200).json({ mensagem: "Imagem excluida com sucesso" });
        }

        const { originalname, buffer, mimetype } = req.file

        if (produtoExistente.imagem_url !== "" && produtoExistente.imagem_url !== null) {
            const pathImagemProdutoDeletada = produtoExistente.imagem_url.slice(70);
            await deletarImagem(pathImagemProdutoDeletada);
        }

        const nomeArquivo = `${randomUUID()}${path.extname(originalname)}`
        const imagem = await enviarImagem(
            `imagens/${nomeArquivo}`,
            buffer,
            mimetype
        )
        const url = `${process.env.S3_ENDPOINT_BASE}/${process.env.S3_BUCKET_NAME}/imagens/${nomeArquivo}`;

        await atualizarImagemService(id, url);

        return res.status(201).json({
            path: `imagens/${nomeArquivo}`,
            url
        })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = {
    cadastrarProduto,
    listarProdutos,
    detalharProduto,
    atualizarProduto,
    excluirProduto,
    atualizarAdicionarImagem
}