const joi = require('joi');

const schemaCadastroUsuario = joi.object({
    nome: joi.string().required().messages({
        'any.required':'O campo nome é obrigatório.', 
        'string.empty':'O campo nome é obrigatório.'
    }),
  
    email: joi.string().email().required().messages({
      'any.required':'O campo email é obrigatório.', 
      'string.empty':'O campo email é obrigatório.', 
      'string.email':'Informe um email com formato válido.'
    }),
  
    senha: joi.string().required().messages({
      'any.required':'O campo senha é obrigatório.', 
      'string.empty':'O campo senha é obrigatório.',
      'string.base': 'Deve ser informado um conteúdo de texto para o campo senha.'
    }),
});

const schemaRedefinicaoSenha = joi.object({
    email: joi.string().required().email().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
        'string.email': 'Informe um email com formato válido.'
    }),

    senha_antiga: joi.string().required().messages({
        'any.required': 'O campo senha_antiga é obrigatório.',
        'string.empty': 'O campo senha_antiga é obrigatório.',
        'string.base': 'Deve ser informado um conteúdo de texto para o campo senha_antiga.'
    }),

    senha_nova: joi.string().required().messages({
        'any.required': 'O campo senha_nova é obrigatório.',
        'string.empty': 'O campo senha_nova é obrigatório.',
        'string.base': 'Deve ser informado um conteúdo de texto para o campo senha_nova.'
    })
}).custom((value, helpers) => {
    if (value.senha_antiga === value.senha_nova) {
        return helpers.message('A nova senha não pode ser igual à antiga.');
    }
    return value;
});

module.exports = {
    schemaCadastroUsuario,
    schemaRedefinicaoSenha
}