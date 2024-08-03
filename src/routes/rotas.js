const express = require('express');
const categorias = require('../controllers/categorias');
const usuarios = require('../controllers/usuarios');
const validarCorpoSchema = require('../middlewares/validarCorpoSchema');
const { schemaRedefinicaoSenha, schemaCadastroUsuario } = require('../schemas/schemaUsuarios');
const { schemaLogin } = require('../schemas/schemaLogin');
const { verificaLogin } = require('../middlewares/autenticacaoLogin');

const rotas = express();

rotas.post('/usuario', validarCorpoSchema(schemaCadastroUsuario), usuarios.cadastrarUsuario);
rotas.get('/categoria', categorias.listarCategoria);
rotas.post('/login', validarCorpoSchema(schemaLogin), usuarios.logarUsuario);
rotas.patch('/usuario/redefinir', validarCorpoSchema(schemaRedefinicaoSenha), usuarios.redefinirSenhaUsuario);

module.exports = rotas;