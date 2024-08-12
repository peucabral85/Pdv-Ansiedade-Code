const { insertCliente, verificarEmailExistenteCliente, verificarCpfExistenteCliente, selectClienteUnico } = require("../services/clientes");

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

const detalharCliente = async (req, res) => {
    const { id } = req.params

    try {
        const cliente = await selectClienteUnico(id)

            if (!cliente) {
                return res.status(404).json("Cliente não encontrado.")
            }

        return res.json(cliente)
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor'});
    }
}

module.exports = {
    cadastrarCliente,
    detalharCliente
}