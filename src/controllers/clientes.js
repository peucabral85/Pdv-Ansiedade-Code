const { insertCliente, verificarEmailExistenteCliente, verificarCpfExistenteCliente } = require("../services/clientes")



const cadastrarCliente = async (req, res) => {
    const {nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body

    const emailExistente = verificarEmailExistenteCliente(email)
    const cpfExistente = verificarCpfExistenteCliente(cpf)

    if (emailExistente) {
        return res.status(409).json({ mensagem: "Já existe cliente cadastrado com o e-mail informado." });
    }

    if (cpfExistente) {
        return res.status(409).json({ mensagem: "Já existe cliente cadastrado com o cpf informado."})
    }

    try {
        const novoUsuario = insertCliente(nome, email, cpf, cep, rua, numero, bairro, cidade, estado)

        

        return res.send(novoUsuario)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = {
    cadastrarCliente
}