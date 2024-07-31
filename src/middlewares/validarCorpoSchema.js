const validacaoCorpoLogin = joiScheme => async(req, res, next) => {  
    try {
        await joiScheme.validateAsync(req.body)
        next()
    } catch (error) {
        res.status(500).json({mensagem: 'Erro interno no servidor'})
    }
       
    }

    module.exports = validacaoCorpoLogin