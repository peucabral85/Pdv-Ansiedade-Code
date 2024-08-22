const express = require('express');
const pedidos = require('../controllers/pedidos');
const validarCorpoSchema = require('../middlewares/validarCorpoSchema');
const schemaPedidos = require('../schemas/schemaPedidos');
const { verificaLogin } = require('../middlewares/autenticacaoLogin');

const rotas = express();

rotas.use(verificaLogin);

rotas.post('/pedido', validarCorpoSchema(schemaPedidos), pedidos.cadastrarPedidos);
rotas.get('/pedido', pedidos.listarPedidos);

module.exports = rotas;