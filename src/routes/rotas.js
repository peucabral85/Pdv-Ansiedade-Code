const express = require('express')
const { validacaoCorpoLogin } = require('../middlewares/validarCorpoSchema')
const autenticarLogin = require('../middlewares/autenticacaoLogin')
const schemaLogin = require('../schemas/schemaLogin')


const rotas = express()


rotas.post('/login', validacaoCorpoLogin(schemaLogin), autenticarLogin)