const express = require('express')
const { validacaoCorpoLogin } = require('../middlewares/validarCorpoSchema')
const schemaLogin = require('../schemas/schemaLogin')
const logarUsuario = require('../controllers/usuarios')


const rotas = express()


rotas.post('/login', validacaoCorpoLogin(schemaLogin), logarUsuario)