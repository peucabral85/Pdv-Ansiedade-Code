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
            console.log(usuarioEncontrado);

            if (!usuarioEncontrado) {
                return res.status(404).json('Usuario não encontrado');
            }
    
            const { senha, ...usuario } = usuarioEncontrado;
    
            req.usuario = usuario;
    
            next();
        } catch (error) {
            return res.status(400).json({message: "Erro interno do servidor"});
        }
    }
    
    module.exports = {
        verificaLogin,
    }
    

    
