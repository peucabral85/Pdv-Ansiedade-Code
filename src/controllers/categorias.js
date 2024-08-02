
const knex = require('../connections/conexao');
const categorias = require('../services/categorias')

const listarCategoria = async (req, res) => {
    try {

        const exibirCategorias = await categorias.exibirCategoria('categorias');
        return res.json(exibirCategorias)
    } catch (error) {
        console.log(error.message);

    }





}

module.exports = {
    listarCategoria
}