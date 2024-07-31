const joi = require('joi')

const schemaLogin = joi.object({
    email: joi.string().email().required().messages({
        'string.email': 'O campo e-mail precisa seguir o formato de e-mail',
        'any.required': 'O campo e-mail é obrigatório',
        'string.empty': 'O campo e-mail de ser informado'
    }),
    senha: joi.string().required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha de ser informado'
    })
})

module.exports = {
    schemaLogin
}