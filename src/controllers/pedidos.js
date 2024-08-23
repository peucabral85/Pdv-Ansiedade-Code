const { obterCliente } = require("../services/clientes");
const { validarPedido, finalizarPedido, listarPedidosService } = require("../services/pedidos");
const compiladorHtml = require("../utils/compiladorHtml");
const email = require("../utils/email");

const cadastrarPedidos = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const clienteVerificado = await obterCliente(cliente_id);

    if (!clienteVerificado) {
      return res.status(400).json({ mensagem: "Cliente não encontrado." });
    }

    const pedidoValidado = await validarPedido(pedido_produtos);

    const { pedido, transacao } = await finalizarPedido(
      clienteVerificado,
      observacao,
      pedidoValidado
    );

    const produtosFormatadosEmail = pedido.produtos.map((produto) => ({
      ...produto,
      valor: (produto.valor / 100).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      }),
      total: (produto.total / 100).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      }),
    }));

    const avisoPedidoRealizado = await compiladorHtml(
      "./src/templates/emailPedidoRealizado.html",
      {
        pedido_id: pedido.pedido,
        nome_cliente: pedido.cliente,
        pedido_produtos: produtosFormatadosEmail,
        valor_total: (pedido.valor_total / 100).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }),
      }
    );

    email.sendMail({
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
      to: `${clienteVerificado.nome} <${clienteVerificado.email}>`,
      subject: `Status do Pedido ${pedido.pedido}`,
      html: avisoPedidoRealizado,
    });

    await transacao.commit();

    return res.status(201).json(pedido);

  } catch (error) {
    if (
      error.tipoErro === "PRODUTO_NAO_ENCONTRADO" ||
      error.tipoErro === "ESTOQUE_INSUFICIENTE"
    ) {
      return res.status(400).json({ mensagem: `${error.message}` });
    }

    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query;

  try {

    if (cliente_id && !(await obterCliente(cliente_id))) {
      return res.status(400).json({ mensagem: "Cliente não encontrado." });
    }

    const pedidos = await listarPedidosService(cliente_id);

    const pedidosFormatados = pedidos.reduce((acc, item) => {
      let pedido = acc.find((p) => p.pedido.id === item.pedido_id);

      if (!pedido) {
        pedido = {
          pedido: {
            id: item.pedido_id,
            valor_total: item.valor_total,
            observacao: item.observacao,
            cliente_id: item.cliente_id,
          },
          pedido_produtos: [],
        };
        acc.push(pedido);
      }

      if (item.pedido_produto_id) {
        pedido.pedido_produtos.push({
          id: item.pedido_produto_id,
          quantidade_produto: item.quantidade_produto,
          valor_produto: item.valor_produto,
          pedido_id: item.pedido_id,
          produto_id: item.produto_id,
        });
      }

      return acc;
    }, []);

    return res.status(200).json(pedidosFormatados);

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastrarPedidos,
  listarPedidos
};