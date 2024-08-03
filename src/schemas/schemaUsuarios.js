const joi = require('joi');

const schemaCadastroUsuario = joi.object({
    nome: joi.string().required().messages({'any.required':'O nome é obrigatório!', 'string.empty':'O nome não pode ser um campo vazio'}),
    email: joi.string().email().required().messages({'any.required':'O email é obrigatório!', 'string.empty':'O email não pode ser um campo vazio', 'string.email':'O campo deve seguir um formato de email'}),
    senha: joi.string().required().messages({'any.required':'A senha é obrigatória!', 'string.empty':'A senha não pode ser um campo vazio'}),
});

module.exports = {schemaCadastroUsuario}