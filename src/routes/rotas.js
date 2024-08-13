const express = require('express');
const categorias = require('../controllers/categorias');
const usuarios = require('../controllers/usuarios');
const produtos = require('../controllers/produtos');
const clientes = require('../controllers/clientes');
const validarCorpoSchema = require('../middlewares/validarCorpoSchema');
const { schemaRedefinicaoSenha, schemaCadastroUsuario, schemaAtualizarUsuario } = require('../schemas/schemaUsuarios');
const { schemaLogin } = require('../schemas/schemaLogin');
const schemaProdutos = require('../schemas/schemaProdutos');
const schemaCliente = require('../schemas/schemaClientes');
const { verificaLogin } = require('../middlewares/autenticacaoLogin');


const rotas = express();

rotas.post('/usuario', validarCorpoSchema(schemaCadastroUsuario), usuarios.cadastrarUsuario);
rotas.get('/categoria', categorias.listarCategorias);
rotas.post('/login', validarCorpoSchema(schemaLogin), usuarios.logarUsuario);
rotas.patch('/usuario/redefinir', validarCorpoSchema(schemaRedefinicaoSenha), usuarios.redefinirSenhaUsuario);


rotas.use(verificaLogin);

rotas.post('/cliente', validarCorpoSchema(schemaCliente), clientes.cadastrarCliente);
rotas.get('/cliente', clientes.listarClientes);
rotas.get('/cliente/:id', clientes.detalharCliente);
rotas.put('/cliente/:id', validarCorpoSchema(schemaCliente), clientes.alterarCliente);
rotas.get('/usuario', usuarios.detalharUsuario);
rotas.put('/usuario', validarCorpoSchema(schemaAtualizarUsuario), usuarios.atualizarUsuario);
rotas.post('/produto', validarCorpoSchema(schemaProdutos), produtos.cadastrarProduto);
rotas.get('/produto', produtos.listarProdutos);
rotas.get('/produto/:id', produtos.detalharProduto);
rotas.put('/produto/:id', validarCorpoSchema(schemaProdutos), produtos.atualizarProduto);
rotas.delete('/produto/:id', produtos.excluirProduto);

module.exports = rotas;