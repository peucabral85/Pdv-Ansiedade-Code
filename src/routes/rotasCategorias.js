const express = require('express');
const categorias = require('../controllers/categorias');

const rotas = express();

rotas.get('/categoria', categorias.listarCategorias);

module.exports = rotas;