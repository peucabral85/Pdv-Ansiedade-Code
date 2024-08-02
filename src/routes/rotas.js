const express = require('express');
const categorias = require('../controllers/categorias')




const rotas = express();



rotas.get("/categorias", categorias.listarCategoria)




module.exports = rotas;