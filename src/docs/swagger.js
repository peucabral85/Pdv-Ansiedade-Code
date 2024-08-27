const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.1.0',
    info: {
        title: 'API PDV - Equipe Ansiedade Code',
        version: '1.0.0',
        description: 'API desenvolvida como projeto final do curso DDS Backend T16 da Cubos Academy',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'API de Teste',
        },
        {
            url: 'https://desafio-backend-final-dds-t16-gjyx.onrender.com',
            description: 'Deploy Produção',
        },
    ],
    tags: [
        { name: 'Login' },
        { name: 'Usuários', description: 'Todos os endpoints de usuários.' },
        { name: 'Clientes', description: 'Todos os endpoints de clientes.' },
        { name: 'Produtos', description: 'Todos os endpoints de produtos.' },
        { name: 'Pedidos', description: 'Todos os endpoints de pedidos.' },
        { name: 'Categorias' },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    }
}

const options = {
    swaggerDefinition,
    apis: [
        '../routes/*.js',
        './**/*.yaml'
    ]
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;