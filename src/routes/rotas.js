const express = require('express');
const categorias = require('../controllers/categorias')
const usuarios = require('../controllers/usuarios');
const validarCorpoSchema = require('../middlewares/validarCorpoSchema');
const { schemaRedefinicaoSenha, schemaAtualizarUsuario } = require('../schemas/schemaUsuarios');
const { schemaLogin } = require('../schemas/schemaLogin');
const { verificaLogin } = require('../middlewares/autenticacaoLogin');

const rotas = express();

rotas.get('/categoria', categorias.listarCategoria);
rotas.post('/login', validarCorpoSchema(schemaLogin), usuarios.logarUsuario);
rotas.patch('/usuario/redefinir', validarCorpoSchema(schemaRedefinicaoSenha), usuarios.redefinirSenhaUsuario);

rotas.get('/usuario', verificaLogin, usuarios.detalharUsuario);
rotas.put('/usuario', verificaLogin, validarCorpoSchema(schemaAtualizarUsuario), usuarios.atualizarUsuario);

module.exports = rotas;