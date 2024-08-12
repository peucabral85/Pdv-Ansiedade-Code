const joi = require('joi')

const schemaCliente = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'informe um nome válido'
        }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo e-mail é obrigatório',
        'string.empty': 'informe um e-mail válido',
        'string.email': 'informe um e-mail válido que esteja no formato de e-mail '
    }),
    cpf: joi.string().required().messages({
        'any.required': 'O campo cpf é obrigatório',
        'string.empty': 'informe um cpf válido',
    }),
    cep:    joi.string(), 
    rua:    joi.string(), 
    numero: joi.string(), 
    bairro: joi.string(), 
    cidade: joi.string(), 
    estado: joi.string()
}) 

module.exports = schemaCliente
