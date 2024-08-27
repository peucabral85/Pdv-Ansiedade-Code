require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rotasCategorias = require('./routes/rotasCategorias');
const rotasClientes = require('./routes/rotasClientes');
const rotasPedidos = require('./routes/rotasPedidos');
const rotasProdutos = require('./routes/rotasProdutos');
const rotasUsuarios = require('./routes/rotasUsuarios');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');

const app = express();

app.use(express.json(), cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(rotasUsuarios, rotasCategorias, rotasClientes, rotasPedidos, rotasProdutos);

app.listen(process.env.PORT_SERVER, () =>
    console.log(`Server rodando na porta ${process.env.PORT_SERVER}`));