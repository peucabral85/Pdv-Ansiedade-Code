const path = require("path");
const { randomUUID } = require('crypto');
const { verificarCategoriaService } = require("../services/categorias");
const { cadastrarProdutoService,
    obterListaProdutos,
    atualizarProdutoService,
    obterProdutoPorId,
    excluirProdutoService,
    enviarImagem,
    deletarImagem,
    atualizarImagemService,
    verificarSeExistePedidoParaProduto
} = require("../services/produtos");

const cadastrarProdutos = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const categoriaEncontrada = await verificarCategoriaService(categoria_id);

        if (!categoriaEncontrada) {
            return res.status(404).json({ mensagem: "Categoria informada não encontrada." });
        }

        const produtoCadastrado = await cadastrarProdutoService(descricao, quantidade_estoque, valor, categoria_id);

        return res.status(201).json(produtoCadastrado);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
}

const listarProdutos = async (req, res) => {
    const categoria_id = req.query.categoria_id;

    try {
        if (categoria_id && !(await verificarCategoriaService(categoria_id))) {
            return res.status(404).json({ mensagem: "A categoria informada não foi encontrada" });
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

        const categoriaEncontrada = await verificarCategoriaService(categoria_id);

        if (!categoriaEncontrada) {
            return res.status(404).json({ mensagem: "Categoria informada não encontrada." });
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
            return res.status(400).json({ mensagem: "Não é possível excluir o produto, pois ele está vinculado a um ou mais pedidos." });
        }

        await excluirProdutoService(id);

        if (produtoExistente.imagem_url) {
            await deletarImagem(produtoExistente.imagem_url);
        }

        return res.status(200).json({ mensagem: "Produto excluído com sucesso." });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
}

const adicionarImagemProduto = async (req, res) => {
    const { id } = req.params;
    const { imagem } = req.body;

    if (typeof imagem === 'undefined' && !req.file) {
        return res.status(400).json({ mensagem: "A propriedade imagem deve ser fornecida na requisição." });
    }

    try {
        const produtoExistente = await obterProdutoPorId(id);

        if (!produtoExistente) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        const imagemAtual = produtoExistente.imagem_url;

        if (!req.file && !imagemAtual) {
            return res.status(200).json({
                mensagem: "Imagem do produto já atualizada.",
                imagem_url: imagemAtual
            });
        }

        if (!req.file && imagemAtual) {
            await deletarImagem(imagemAtual);
            await atualizarImagemService(id, null);

            return res.status(200).json({
                mensagem: "Imagem removida com sucesso.",
                imagem_url: null
            });
        }

        if (req.file) {
            const { originalname, buffer, mimetype } = req.file;

            if (imagemAtual) {
                await deletarImagem(imagemAtual);
            }

            const nomeArquivo = `${randomUUID()}${path.extname(originalname)}`;
            const arquivo = await enviarImagem(`imagens/${nomeArquivo}`, buffer, mimetype);

            await atualizarImagemService(id, arquivo.path);

            return res.status(201).json({
                mensagem: "Imagem atualizada com sucesso.",
                imagem_url: arquivo.url
            });
        }

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

module.exports = {
    cadastrarProdutos,
    listarProdutos,
    detalharProduto,
    atualizarProduto,
    excluirProduto,
    adicionarImagemProduto
}