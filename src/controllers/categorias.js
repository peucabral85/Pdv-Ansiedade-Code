const knex = require('../connections/conexao');
const categorias = require('../services/categorias')

const listarCategoria = async (req, res) => {

    const exibirCategorias = categorias.exibirCategorias;

    return res.json(exibirCategorias)


}

module.exports = {
    listarCategoria
}