const knex = require('../connections/conexao');

const exibirCategorias = async (tabela) => {
    const categoriasListadas = await knex(tabela);

    return categoriasListadas;
}

module.exports = {
    exibirCategorias
}