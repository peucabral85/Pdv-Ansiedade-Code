const knex = require('../connections/conexao');

const exibirCategorias = async (tabela) => {
    const categoriasListadas = await knex(tabela);

    return categoriasListadas;
}

const verificaCategoria = async (id) => {
    const categoriaEncontrada = await knex('categorias').where({ id }).first();

    return categoriaEncontrada;
}

module.exports = {
    exibirCategorias,
    verificaCategoria
}