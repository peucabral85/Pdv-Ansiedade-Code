const express = require('express');
const usuarios = require('../controllers/usuarios');
const validarCadastro = require('../middlewares/validarCadastro');
const {schemaCadastroUsuario} = require('../schemas/schemaUsuarios');
const rotas = express();

rotas.post('/usuario', validarCadastro(schemaCadastroUsuario), usuarios.cadastrarUsuario)

module.exports = rotas