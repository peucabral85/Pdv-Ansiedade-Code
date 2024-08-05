const express = require('express');
const categorias = require('../controllers/categorias');
const usuarios = require('../controllers/usuarios');
const validarCorpoSchema = require('../middlewares/validarCorpoSchema');
const { schemaRedefinicaoSenha, schemaCadastroUsuario, schemaAtualizarUsuario } = require('../schemas/schemaUsuarios');
const { schemaLogin } = require('../schemas/schemaLogin');
const { verificaLogin } = require('../middlewares/autenticacaoLogin');

const rotas = express();

rotas.post('/usuario', validarCorpoSchema(schemaCadastroUsuario), usuarios.cadastrarUsuario);
rotas.get('/categoria', categorias.listarCategorias);
rotas.post('/login', validarCorpoSchema(schemaLogin), usuarios.logarUsuario);
rotas.patch('/usuario/redefinir', validarCorpoSchema(schemaRedefinicaoSenha), usuarios.redefinirSenhaUsuario);

rotas.use(verificaLogin);

rotas.get('/usuario', usuarios.detalharUsuario);
rotas.put('/usuario', validarCorpoSchema(schemaAtualizarUsuario), usuarios.atualizarUsuario);

module.exports = rotas;