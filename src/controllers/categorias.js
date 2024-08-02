const knex = require('../connections/conexao');

const listarCategoria = async (req, res) => {

    const exibirCategorias = await knex('categorias').debug()

    return res.json(exibirCategorias)


}

module.exports = {
    listarCategoria
}