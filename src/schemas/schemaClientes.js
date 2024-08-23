const validadorCpf = require('@fnando/cpf');
const joi = require('joi');

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

    cpf: joi.string().required().messages({
        'any.required': 'O campo cpf é obrigatório.',
        'string.empty': 'O campo cpf é obrigatório.',
        'string.base': 'O campo CPF deve ser uma string.',
        'any.invalid': 'O CPF informado é inválido.'
    }).custom((value, helpers) => {
        const cpfSemFormatacao = validadorCpf.strip(value);
        if (!validadorCpf.isValid(cpfSemFormatacao)) {
            return helpers.error('any.invalid');
        }
        return cpfSemFormatacao;
    }),

    cep: joi.string().allow(null).optional().messages({
        'string.pattern.base': 'O CEP foi informado num formato inválido.',
        'string.base': 'O campo CEP deve ser uma string.'
    }).custom((cep, helpers) => {
        const cepSemFormatacao = cep.replace(/\D/g, '');
        if (cepSemFormatacao.length !== 8) {
            return helpers.error('string.pattern.base');
        }
        return cepSemFormatacao;
    }),

    rua: joi.string().allow(null).optional().messages({
        'string.base': 'O campo rua deve ser uma string.'
    }),
    numero: joi.string().allow(null).optional().messages({
        'string.base': 'O campo numero deve ser uma string.'
    }),
    bairro: joi.string().allow(null).optional().messages({
        'string.base': 'O campo bairro deve ser uma string.'
    }),
    cidade: joi.string().allow(null).optional().messages({
        'string.base': 'O campo cidade deve ser uma string.'
    }),
    estado: joi.string().allow(null).optional().messages({
        'string.base': 'O campo estado deve ser uma string.'
    })
});

module.exports = schemaCliente
