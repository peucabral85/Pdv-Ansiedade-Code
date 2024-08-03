const categorias = require('../services/categorias');

const listarCategoria = async (req, res) => {
    try {
        const categoriasListadas = await categorias.exibirCategorias('categorias');

        return res.status(200).json(categoriasListadas);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = {
    listarCategoria
}