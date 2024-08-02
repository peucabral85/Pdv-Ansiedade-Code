require('dotenv').config();

const rotas = require('./routes/rotas')
const express = require('express');

const app = express();

app.use(express.json());

app.use(rotas);


app.listen(process.env.PORT_SERVER, () =>
    console.log(`Server rodando na porta ${process.env.PORT_SERVER}`));