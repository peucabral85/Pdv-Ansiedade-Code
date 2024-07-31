const express = require('express')

const validacaoCorpoLogin = require('../middlewares/validarCorpoSchema')
const { logarUsuario, } = require('../controllers/usuarios')
const { schemaLogin } = require('../schemas/schemaLogin')
const { verificaLogin } = require('../middlewares/autenticacaoLogin')



const rotas = express()


rotas.post('/login', validacaoCorpoLogin(schemaLogin), logarUsuario)


module.exports = rotas