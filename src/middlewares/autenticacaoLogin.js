 const jwt = require('jsonwebtoken')
 const knex = require('../connections/conexao')
 const verificaLogin = async (req, res, next) => {
        const { authorization } = req.headers;
    
        if (!authorization) {
            return res.status(401).json('Não autorizado');
        }
    
        try {
            const token = authorization.replace('Bearer ', '').trim();
    
            const { id } = jwt.verify(token, process.env.SENHA_JWT);
    
            const usuarioEncontrado = await knex('usuarios').where({id}).first()
            

            if (!usuarioEncontrado) {
                return res.status(401).json({mensagem: "Acesso não autorizado."});
            }
    
            const { senha, ...usuario } = usuarioEncontrado;
    
            req.usuario = usuario;
    
            next();
        } catch (error) {
             if (error.message === 'jwt expired' || error.message === 'invalid token' || error.message === 'invalid signature') {
                return res.status(401).json({ mensagem: 'Autenticação falhou. Por favor, verifique as credenciais e tente novamente!' });
             }

             return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
    
    module.exports = {
        verificaLogin,
    }
    

    
