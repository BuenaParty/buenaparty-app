const express = require('express');
const bodyParser = require('body-parser');
const { createUserTable } = require('./models/userModel');
const { registerUser, listUsers } = require('./controllers/userController');

const server = express();
const port = 3000;

server.use(bodyParser.json());

// Criação da tabela de usuários
createUserTable();

// Operações com os usuários
server.post('/user/register', registerUser);
server.get('/users', listUsers)

server.listen(port, () => { console.log(`O servidor Express está rodando em http://localhost:${port}`); });

module.exports = server;