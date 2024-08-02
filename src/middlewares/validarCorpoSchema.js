const validarCorpoSchema = joiSchema => async (req, res, next) => {
    try {
        await joiSchema.validateAsync(req.body);
        next();
      
    } catch (error) {
        res.status(500).json({mensagem: 'Erro interno no servidor'});
    }
}

module.exports = validarCorpoSchema;