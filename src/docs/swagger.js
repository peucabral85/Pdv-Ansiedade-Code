const swaggerAutogen = require('swagger-autogen')({ openapi: '3.1.0' });

const doc = {
    info: {
        title: 'API PDV - Equipe Ansiedade Code',
        version: '1.0.0',
        description: 'API desenvolvida como projeto final do curso DDS Backend T16 da Cubos Academy'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'API de Teste'
        },
        {
            url: 'https://desafio-backend-final-dds-t16-gjyx.onrender.com',
            description: 'Deploy Produção'
        }
    ],
    tags: [
        {
            "name": "Login"
        },
        {
            "name": "Usuários",
            "description": "Todos os endpoints de usuários."
        },
        {
            "name": "Clientes",
            "description": "Todos os endpoints de clientes."
        },
        {
            "name": "Produtos",
            "description": "Todos os endpoints de produtos."
        },
        {
            "name": "Categorias"
        },
    ],
    consumes: ["application/json", "multipart/form-data"],
    produces: ["application/json", "multipart/form-data"],
    components: {
        schemas: {
            Produto: {
                $descricao: 'EA Sports FC 24 - PlayStation 5',
                $quantidade_estoque: 12,
                $valor: 15460,
                $categoria_id: 9
            },
            Cliente: {
                $nome: 'Malaquias de Jesus Santos',
                $email: 'obinakiller@gmail.com',
                $cpf: '136.015.055-25',

            }
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }
};

const endpointFiles = ['../routes/rotas.js'];
const outputFile = '../docs/swagger_output.json';


swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
    require('../index.js')
});