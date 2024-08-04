const knex = require('../connections/conexao');

const verificarEmailExistente = async (email) => {
    const emailValidado = await knex('usuarios')
        .where('email', 'ilike', email).first();

    return emailValidado;
}

const updateSenhaUsuario = async (id, senha) => {
    await knex('usuarios').update({ senha }).where({ id });
}

// const atualizarUsuarioService = async ({ usuario, nome, email }) => {
//     try {
//         const usuarioExiste = await knex('usuarios').where({ id: usuario.id });

//         if (!usuarioExiste) {
//             throw new Error('Usuário não encontrado');
//         }

//         if (email !== usuario.email) {
//             const emailUsuarioExiste = await verificarEmailExistente(email);

//             if (emailUsuarioExiste) {
//                 throw new Error('O email já existe');
//             }
//         }

//         await knex('usuarios').update({ nome, email }).where({ id: usuario.id });
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

module.exports = {
    verificarEmailExistente,
    updateSenhaUsuario,
}