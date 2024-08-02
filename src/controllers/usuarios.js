const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../connections/conexao');
const transportador = require('../utils/email');
const compiladorHtml = require('../utils/compiladorHtml');
const { verificarEmailExistente, updateSenhaUsuario } = require('../services/usuarios');

const logarUsuario = async (req, res) => {
    const {email, senha} = req.body;

    try {

    const usuarioValidado = await knex('usuarios').where({email}).first();
      
    if (!usuarioValidado) { 
        return res.status(401).json({ mensagem: "Usuário e/ou senha inválido(s)." }); 
    }
      
    const senhaValidada = await bcrypt.compare(senha, usuarioValidado.senha);
      
    if (!senhaValidada) {
        return res.status(401).json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const token = jwt.sign({id: usuarioValidado.id}, process.env.PASS_JWT, {expiresIn: '12h'});

    const {senha: _, ...dadosUsuario} = usuarioValidado;

    const usuario = {
        usuario: dadosUsuario,
        token
    }

    return res.status(200).json(usuario);

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

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

        const avisoSenhaEmail = await compiladorHtml("./src/templates/emailSenhaRedefinida.html",
            {
                nomeusuario: usuarioValidado.nome,
                dataalteracao: `${new Date().toLocaleDateString()}, as ${new Date().toLocaleTimeString()}`
            }
        );

        transportador.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${usuarioValidado.nome} <${usuarioValidado.email}>`,
            subject: 'Alteração de senha',
            html: avisoSenhaEmail
        });

        return res.status(200).json({ mensagem: "Senha atualizada com sucesso." });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = {
  logarUsuario,
  redefinirSenhaUsuario
}