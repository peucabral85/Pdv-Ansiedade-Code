const express = require('express');
const validarCorpoSchema = require('../middlewares/validarCorpoSchema');
const { logarUsuario, redefinirSenhaUsuario } = require('../controllers/usuarios');
const { schemaRedefinicaoSenha } = require('../schemas/schemaUsuarios');
const { schemaLogin } = require('../schemas/schemaLogin');
const { verificaLogin } = require('../middlewares/autenticacaoLogin');

const rotas = express();

rotas.post('/login', validacaoCorpoSchema(schemaLogin), logarUsuario);
rotas.patch('/usuario/redefinir', validarCorpoSchema(schemaRedefinicaoSenha), redefinirSenhaUsuario);


module.exports = rotas;