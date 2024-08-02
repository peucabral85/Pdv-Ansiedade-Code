const knex = require('../connections/conexao');

const listarCategoria = async (tabela) => {
    const exibirCategorias = await knex(tabela).debug()

    return exibirCategorias;
}


module.exports = {
    listarCategoria
}