const { selectClienteUnico } = require("../services/clientes");
const { validarPedido, finalizarPedido } = require("../services/pedidos");
const compiladorHtml = require('../utils/compiladorHtml');
const email = require("../utils/email");

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    try {
        const clienteVerificado = await selectClienteUnico(cliente_id);

        if (!clienteVerificado) {
            return res.status(400).json({ mensagem: "Cliente não encontrado." });
        }

        const pedidoValidado = await validarPedido(pedido_produtos);

        const { pedido, transacao } = await finalizarPedido(clienteVerificado, observacao, pedidoValidado);

        const produtosFormatadosEmail = pedido.produtos.map(produto => ({
            ...produto,
            valor: (produto.valor / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
            total: (produto.total / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        }));

        const avisoPedidoRealizado = await compiladorHtml("./src/templates/emailPedidoRealizado.html",
            {
                pedido_id: pedido.pedido,
                nome_cliente: pedido.cliente,
                pedido_produtos: produtosFormatadosEmail,
                valor_total: (pedido.valor_total / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            }
        );

        email.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${clienteVerificado.nome} <${clienteVerificado.email}>`,
            subject: `Status do Pedido ${pedido.pedido}`,
            html: avisoPedidoRealizado
        });

        await transacao.commit();

        return res.status(201).json(pedido);

    } catch (error) {
        console.log(error);
        if (error.tipoErro === "PRODUTO_NAO_ENCONTRADO" || error.tipoErro === "ESTOQUE_INSUFICIENTE") {
            return res.status(400).json({ mensagem: `${error.message}` });
        }

        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }

}



module.exports = {
    cadastrarPedido
}