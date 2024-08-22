const knex = require('../connections/conexao');

const listarCategoriasService = async (tabela) => {
    const categoriasListadas = await knex(tabela);

    return categoriasListadas;
}

const verificarCategoriaService = async (id) => {
    const categoriaEncontrada = await knex('categorias').where({ id }).first();

    return categoriaEncontrada;
}

module.exports = {
    listarCategoriasService,
    verificarCategoriaService
}