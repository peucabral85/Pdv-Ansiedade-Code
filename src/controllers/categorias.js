const { exibirCategorias } = require('../services/categorias');

const listarCategorias = async (req, res) => {
    try {
        const categoriasListadas = await exibirCategorias('categorias');

        return res.status(200).json(categoriasListadas);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = {
    listarCategorias
}