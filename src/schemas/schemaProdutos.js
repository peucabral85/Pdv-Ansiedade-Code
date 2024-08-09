const joi = require('joi');

const schemaProdutos = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descricao é obrigatório.',
        'string.empty': 'O campo descricao é obrigatório.'
    }),

    quantidade_estoque: joi.number().positive().integer().required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório.',
        'number.positive': 'A quantidade de estoque informada deve ser positiva.',
        'number.base': 'A quantidade de estoque informada deve ser um número.',
        'number.integer': 'A quantidade de estoque informada deve ser um número inteiro'
    }),

    valor: joi.number().positive().integer().required().messages({
        'any.required': 'O campo valor é obrigatório.',
        'number.positive': 'O valor informado deve ser positivo.',
        'number.base': 'O valor informado precisa ser um número.',
        'number.integer': 'O campo valor deve ser um número inteiro, representado em centavos.'
    }),

    categoria_id: joi.number().required().integer().positive().messages({
        'any.required': 'O campo categoria_id é obrigatório.',
        'number.positive': 'O valor informado no campo categoria_id deve ser positivo.',
        'number.base': 'O valor informado no campo categoria_id precisa ser um número.',
        'number.integer': 'O valor informado no campo categoria_id precisa ser um número inteiro.'
    })
});

module.exports = schemaProdutos;