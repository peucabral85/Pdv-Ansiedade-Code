const { selectClienteUnico } = require("../services/clientes");
const { validarPedido, finalizarPedido } = require("../services/pedidos");

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    try {
        const clienteVerificado = await selectClienteUnico(cliente_id);

        if (!clienteVerificado) {
            return res.status(400).json({ mensagem: "Cliente não encontrado." });
        }

        const pedidoValidado = await validarPedido(pedido_produtos);

        const { pedido, transacao } = await finalizarPedido(clienteVerificado, observacao, pedidoValidado);

        await transacao.commit();

        return res.status(201).json(pedido);

    } catch (error) {
        if (error.tipoErro === "PRODUTO_NAO_ENCONTRADO" || error.tipoErro === "ESTOQUE_INSUFICIENTE") {
            return res.status(400).json({ mensagem: `${error.message}` });
        }

        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }

}

module.exports = {
    cadastrarPedido
}