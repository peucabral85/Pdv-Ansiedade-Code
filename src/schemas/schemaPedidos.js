const joi = require('joi');

const schemaPedidos = joi.object({
    cliente_id: joi.number().integer().positive().required().messages({
        'any.required': 'O campo cliente_id é obrigatório.',
        'number.positive': 'O valor informado no campo cliente_id deve ser positivo.',
        'number.base': 'O valor informado no campo cliente_id precisa ser um número.',
        'number.integer': 'O valor informado no campo cliente_id precisa ser um número inteiro.'
    }),

    observacao: joi.string().optional().messages({
        'string.base': 'O campo observacao é obrigatório.',
        'string.empty': 'O campo observacao é obrigatório.'
    }),

    pedido_produtos: joi.array().min(1).required().items(joi.object({
        produto_id: joi.number().integer().positive().required().messages({
            'any.required': 'O campo produto_id é obrigatório.',
            'number.positive': 'O valor informado no campo produto_id deve ser positivo.',
            'number.base': 'O valor informado no campo produto_id precisa ser um número.',
            'number.integer': 'O valor informado no campo produto_id precisa ser um número inteiro.'
        }),
        quantidade_produto: joi.number().integer().positive().required().messages({
            'any.required': 'O campo quantidade_produto é obrigatório.',
            'number.positive': 'A quantidade de produto informada deve ser positiva.',
            'number.base': 'A quantidade de produto informada deve ser um número.',
            'number.integer': 'A quantidade de produto informada deve ser um número inteiro.'
        }),
    })
    ).messages({
        'any.required': 'Atenção, não foram informados produtos no pedido. ',
        'array.base': 'O pedido_produtos precisa ser um array de produtos.',
        'array.min': 'Atenção, é necessário ter pelo menos 1 produto no pedido.'
    }),
});

module.exports = schemaPedidos;