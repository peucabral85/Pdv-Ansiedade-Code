const { verificaCategoria } = require("../services/categorias");
const { insertProduto } = require("../services/produtos");

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

module.exports = {
    cadastrarProduto
}