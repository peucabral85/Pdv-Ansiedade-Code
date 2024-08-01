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
});

module.exports = {
    schemaRedefinicaoSenha
}