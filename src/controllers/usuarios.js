const bcrypt = require('bcrypt');
const { verificarEmailExistente, updateSenhaUsuario } = require('../services/usuarios');

const redefinirSenhaUsuario = async (req, res) => {
    const { email, senha_antiga, senha_nova } = req.body;

    try {

        const usuarioValidado = await verificarEmailExistente(email);

        if (!usuarioValidado) {
            return res.status(401).json({ mensagem: "Usuário e/ou senha inválido(s)." });
        }

        const senhaValidada = await bcrypt.compare(senha_antiga, usuarioValidado.senha);

        if (!senhaValidada) {
            return res.status(401).json({ mensagem: "Usuário e/ou senha inválido(s)." })
        }

        const senhaCriptografada = await bcrypt.hash(senha_nova, 10);

        await updateSenhaUsuario(usuarioValidado.id, senhaCriptografada);

        return res.status(200).json({ mensagem: "Senha atualizada com sucesso." });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = {
    redefinirSenhaUsuario
}