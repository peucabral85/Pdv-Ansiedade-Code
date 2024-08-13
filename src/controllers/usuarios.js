const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transportador = require("../utils/email");
const compiladorHtml = require("../utils/compiladorHtml");
const { format } = require('date-fns-tz');
const {
    verificarEmailExistente,
    updateSenhaUsuario,
    insertUsuario,
    updateUsuario,
} = require("../services/usuarios");

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const emailJaCadastrado = await verificarEmailExistente(email);

        if (emailJaCadastrado) {
            return res.status(409).json({ mensagem: "Já existe usuário cadastrado com o e-mail informado." });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuarioCadastrado = await insertUsuario(nome, email, senhaCriptografada);

        return res.status(201).json(usuarioCadastrado);

    } catch (error) {
        res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

const logarUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuarioValidado = await verificarEmailExistente(email);

        if (!usuarioValidado) {
            return res.status(401).json({ mensagem: "Usuário e/ou senha inválido(s)." });
        }

        const senhaValidada = await bcrypt.compare(senha, usuarioValidado.senha);

        if (!senhaValidada) {
            return res.status(401).json({ mensagem: "Usuário e/ou senha inválido(s)." });
        }

        const token = jwt.sign({ id: usuarioValidado.id }, process.env.PASS_JWT, { expiresIn: "12h" });

        const { senha: _, ...dadosUsuario } = usuarioValidado;

        const usuario = {
            usuario: dadosUsuario,
            token,
        };

        return res.status(200).json(usuario);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
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
            return res.status(401).json({ mensagem: "Usuário e/ou senha inválido(s)." });
        }

        const senhaCriptografada = await bcrypt.hash(senha_nova, 10);

        await updateSenhaUsuario(usuarioValidado.id, senhaCriptografada);

        const avisoSenhaEmail = await compiladorHtml("./src/templates/emailSenhaRedefinida.html",
            {
                nomeusuario: usuarioValidado.nome,
                dataalteracao: `${format(new Date(), 'dd/MM/yyyy HH:mm O')}`
            }
        );

        transportador.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${usuarioValidado.nome} <${usuarioValidado.email}>`,
            subject: "Alteração de senha",
            html: avisoSenhaEmail,
        });

        return res.status(200).json({ mensagem: "Senha atualizada com sucesso." });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

const detalharUsuario = (req, res) => {
    const { usuario } = req;

    return res.status(200).json(usuario);
}

const atualizarUsuario = async (req, res) => {
    const { nome, email } = req.body;
    const { usuario } = req;

    try {

        const usuarioValidado = await verificarEmailExistente(email);

        if (usuarioValidado && usuarioValidado.id !== usuario.id) {
            return res.status(409).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." });
        }

        await updateUsuario(nome, email, usuario.id);

        return res.status(200).json({ mensagem: "Usuário atualizado com sucesso." });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

module.exports = {
    cadastrarUsuario,
    logarUsuario,
    redefinirSenhaUsuario,
    detalharUsuario,
    atualizarUsuario
}
