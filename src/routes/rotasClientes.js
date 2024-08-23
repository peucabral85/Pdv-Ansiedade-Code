const express = require('express');
const clientes = require('../controllers/clientes');
const validarCorpoSchema = require('../middlewares/validarCorpoSchema');
const schemaCliente = require('../schemas/schemaClientes');
const { verificaLogin } = require('../middlewares/autenticacaoLogin');

const rotas = express();

rotas.use(verificaLogin);

rotas.post('/cliente', validarCorpoSchema(schemaCliente), clientes.cadastrarCliente);
rotas.get('/cliente', clientes.listarClientes);
rotas.get('/cliente/:id', clientes.detalharCliente);
rotas.put('/cliente/:id', validarCorpoSchema(schemaCliente), clientes.alterarCliente);

module.exports = rotas;