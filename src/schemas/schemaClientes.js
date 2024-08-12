const joi = require('joi')

const schemaCliente = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.',
        'string.base': 'O campo nome deve ser uma string.'
    }),

    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
        'string.email': 'Informe um email com formato válido.',
        'string.base': 'O campo email deve ser uma string.'
    }),

    cpf: joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required().messages({
        'any.required': 'O campo cpf é obrigatório.',
        'string.empty': 'O campo cpf é obrigatório.',
        'string.pattern.base': 'O CPF deve estar no formato 123.456.789-09.',
        'string.base': 'O campo CPF deve ser uma string.'
    }),

    cep: joi.string().pattern(/^\d{5}-\d{3}$/).optional().messages({
        'string.pattern.base': 'O CEP deve estar no formato 12345-678',
        'string.base': 'O campo CEP deve ser uma string.'
    }),

    rua: joi.string().optional().messages({
        'string.base': 'O campo rua deve ser uma string.'
    }),
    numero: joi.string().optional().messages({
        'string.base': 'O campo numero deve ser uma string.'
    }),
    bairro: joi.string().optional().messages({
        'string.base': 'O campo bairro deve ser uma string.'
    }),
    cidade: joi.string().optional().messages({
        'string.base': 'O campo cidade deve ser uma string.'
    }),
    estado: joi.string().optional().messages({
        'string.base': 'O campo estado deve ser uma string.'
    })
})

module.exports = schemaCliente
