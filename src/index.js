require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rotas = require('./routes/rotas');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger_output.json');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(rotas);

app.listen(process.env.PORT_SERVER, () =>
    console.log(`Server rodando na porta ${process.env.PORT_SERVER}`));