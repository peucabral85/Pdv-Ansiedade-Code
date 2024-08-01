const express = require('express');
const validarCorpoSchema = require('../middlewares/validarCorpoSchema');
const { redefinirSenhaUsuario } = require('../controllers/usuarios');
const { schemaRedefinicaoSenha } = require('../schemas/schemaUsuarios');

const rotas = express();


rotas.patch('/usuario/redefinir', validarCorpoSchema(schemaRedefinicaoSenha), redefinirSenhaUsuario);


module.exports = rotas;