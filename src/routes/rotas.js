const express = require('express');
const usuarios = require('../controllers/usuarios');

const rotas = express();

rotas.post('/usuario',  usuarios.cadastrarUsuario)

module.exports = rotas