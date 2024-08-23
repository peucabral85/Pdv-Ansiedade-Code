const express = require('express');
const produtos = require('../controllers/produtos');
const multer = require('../middlewares/multer');
const validarCorpoSchema = require('../middlewares/validarCorpoSchema');
const schemaProdutos = require('../schemas/schemaProdutos');
const { verificaLogin } = require('../middlewares/autenticacaoLogin');

const rotas = express();

rotas.use(verificaLogin);

rotas.post('/produto', validarCorpoSchema(schemaProdutos), produtos.cadastrarProdutos);
rotas.get('/produto', produtos.listarProdutos);
rotas.get('/produto/:id', produtos.detalharProduto);
rotas.put('/produto/:id', validarCorpoSchema(schemaProdutos), produtos.atualizarProduto);
rotas.delete('/produto/:id', produtos.excluirProduto);
rotas.patch('/produto/:id/imagem', multer.single('imagem'), produtos.adicionarImagemProduto);

module.exports = rotas;