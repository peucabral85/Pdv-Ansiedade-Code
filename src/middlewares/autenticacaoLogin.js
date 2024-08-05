const jwt = require('jsonwebtoken');
const { verificarUsuario } = require('../services/usuarios');

const verificaLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, process.env.PASS_JWT);

        const usuarioEncontrado = await verificarUsuario(id);

        if (!usuarioEncontrado) {
            return res.status(401).json({ mensagem: "Acesso não autorizado." });
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
    verificaLogin
}



