require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

app.listen(process.env.PORT_SERVER, () =>
    console.log(`Server rodando na porta ${process.env.PORT_SERVER}`));