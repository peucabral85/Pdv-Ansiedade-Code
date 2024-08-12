const { insertCliente, verificarEmailExistenteCliente, verificarCpfExistenteCliente } = require("../services/clientes");

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {

        const emailExistente = await verificarEmailExistenteCliente(email);

        if (emailExistente) {
            return res.status(409).json({ mensagem: "Já existe cliente cadastrado com o e-mail informado." });
        }

        const cpfExistente = await verificarCpfExistenteCliente(cpf);

        if (cpfExistente) {
            return res.status(409).json({ mensagem: "Já existe cliente cadastrado com o cpf informado." });
        }

        const novoUsuario = await insertCliente(nome, email, cpf, cep, rua, numero, bairro, cidade, estado);

        return res.status(201).json(novoUsuario);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = {
    cadastrarCliente
}