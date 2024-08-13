const validarCorpoSchema = joiSchema => async (req, res, next) => {
    try {
        const valoresJoi = await joiSchema.validateAsync(req.body);
        req.body = valoresJoi;
        next();

    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = validarCorpoSchema;