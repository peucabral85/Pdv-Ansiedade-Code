const joi = require('joi');

const schemaLogin = joi.object({
    email: joi.string().email().required().messages({
        'string.email': 'Informe um email com formato válido.',
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
        'string.base': 'O campo email deve ser uma string.'
    }),

    senha: joi.string().required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha é obrigatório.',
        'string.base': 'Deve ser informado um conteúdo de texto para o campo senha.'
    })
});

module.exports = {
    schemaLogin
}