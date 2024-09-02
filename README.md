# API REST PDV: Ansiedade Code 🧠

![](./assets/images/logo.png)

## Sobre o Projeto

Este projeto consiste em uma API REST para um PDV (Ponto de Venda) ou frente de caixa, destinada a controlar categorias, usuários, clientes, produtos e pedidos utilizados por um estabelecimento comercial tendo sido proposto como Desafio Final do curso de Backend da [Cubos Academy](https://cubos.academy/). O projeto foi desenvolvido em grupo e dividido em 03 (três) sprints. O objetivo desse projeto é fornecer uma base para a construção de um sistema completo de um PDV.

A API permite realizar, no momento, operações como: cadastro e edição de dados de usuários, autenticação, cadastro, listagem, exclusão e edição de dados de produtos, cadastro, listagem e edição de dados de clientes e cadastro de pedidos de venda.



## Índice

- [Tecnologia Utilizadas](#tecnologias-utilizadas)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Autores](#autores)



## Tecnologias Utilizadas

![My Skills](https://go-skill-icons.vercel.app/api/icons?i=js,nodejs,html,css,insomnia,express,git,github,postgres,swagger,aws,supabase,render)

#### Dependências Utilizadas

| Dependências        | Versão      |
| :------------------ | ----------- |
| express             | 4.19.2      |
| nodemon (dev)       | 3.1.4       |
| bcrypt              | 5.1.1       |
| cors                | 2.8.5       |
| date-fns-tz         | 3.1.3       |
| dotenv              | 16.4.5      |
| handlebars          | 4.7.8       |
| joi                 | 17.13.3     |
| jsonwebtoken        | 9.0.2       |
| knex                | 3.1.0       |
| multer              | 1.4.5-lts.1 |
| nodemailer          | 6.9.14      |
| pg                  | 8.12.0      |
| swagger-ui-express  | 5.0.1       |
| swagger-jsdoc (dev) | 6.2.8       |
| @aws-sdk/client-s3  | 3.632.0     |
| @fnando/cpf         | 1.0.2       |



## Estrutura do Projeto

O projeto da API foi organizado de forma a manter a clareza e a modularidade, onde as imagens do projeto foram inseridas no diretório `assets` e tudo relacionado a API foi inserido dentro da pasta `src`, como segue:

- Arquivo `index.js`: onde a execução do servidor é iniciada, sendo o ponto central da aplicação, pois é onde se inicia a escuta por requisições e configuração da documentação Swagger;
- Pasta `connections`: Contém as configurações de conexão ao banco de dados PostgreSQL e também ao ambiente em nuvem para armazenamento do upload de imagens;
- Pasta `controllers`: Esta pasta abriga todas os métodos responsáveis por executar as operações relacionadas às rotas da API;
- Pasta `docs`: Contém tudo relacionado a documentação Swagger que foi gerada;
- Pasta `middlewares`: Contém as definições de `middlewares`, que são funções intermediárias que podem ser executadas antes das rotas ou após as requisições;
- Pasta `routes`: Esta pasta contém todos os arquivos onde as rotas da API estão definidas;
- Pasta `schemas`: Nesta pasta, estão armazenados os `schemas` que definem a estrutura e as restrições dos objetos de dados utilizados pela API;
- Pasta `services`: Esta pasta abriga todas os métodos responsáveis por executar as operações necessárias junto ao banco de dados e retornar para o controlador;
- Pasta `sql`: Contém o script `dump.sql` com os comandos sql necessários para construir as tabelas do banco de dados no PostgreSQL;
- Pasta `templates`: Esta pasta armazenas os templates html utilizados no envio de emails de Redefinição de Senha e de Finalização do Pedido.
- Fora da pasta `src`, na raiz do projeto, contém os seguintes arquivos:
  -  `.env.exemple`: Esse arquivo é um modelo com todas as variáveis de ambiente utilizadas no projeto.
  - `.gitignore`: Contém os arquivos e diretórios que não "subirão" para o repositório remoto.
  - `README_CUBOS`: É o README com as instruções que deveriam ser seguidas neste Desafio proposto pela Cubos Academy.

## Como executar o projeto

⚠️ Para a execução do projeto, é necessário ter o [Node.js](https://nodejs.org/en) instalado em sua máquina.

1) Faça um clone do projeto
- Via SSH

```bash
git clone git@github.com:peucabral85/Pdv-Ansiedade-Code.git
```
- Via HTTP

```bash
git clone https://github.com/peucabral85/Pdv-Ansiedade-Code.git
```

2) Abra o diretório do projeto

```bash
cd Pdv-Ansiedade-Code
```

3) Instale as dependências utilizando o comando:

```bash
npm i
```

4. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias. Um exemplo de configuração pode ser encontrado no arquivo `.env.example` ou como abaixo:

```
PORT_SERVER=

CLIENT_DB=
HOST_DB=
PORT_DB=
USER_DB=
PASS_DB=
NAME_DB=

PASS_JWT=

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
EMAIL_NAME=
EMAIL_FROM=

STORAGE_REGION=
STORAGE_ENDPOINT=
STORAGE_ACCESSKEY=
STORAGE_SECRET_ACCESSKEY=
STORAGE_BUCKET=
STORAGE_BASEURL=
```

5. Inicialize o servidor local:

```bash
npm run dev
```

6. Após iniciar o servidor, você pode acessar a API de 02 (duas) formas: 

- Utilizando o Postman ou o Insomnia, por exemplo, com o seguinte endereço:

``` bash
http://localhost:3000
```

- Utilizando a documentação Swagger do projeto:

```bash
http://localhost:3000/api-docs
```





## Autores

- [@peucabral85](https://github.com/peucabral85)
- [@LaelsonJunior](https://github.com/LaelsonJunior)
- [@rtrancozo](https://github.com/rtrancozo)
- [@RafaelSantos22](https://github.com/RafaelSantos22)
- [@DevCaioLopes](https://github.com/DevCaioLopes)



