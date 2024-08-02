const knex = require('../connections/conexao');

const exibirCategoria = async (tabela) => {
    const exibirCategorias = await knex(tabela);

    return exibirCategorias;
}


module.exports = {
    exibirCategoria
}