const express = require('express');
const server = express();
const port = 3000;

const userController = require('./controllers/userController');
server.get('/users', userController.listUsers);

server.listen(port, () => { console.log(`O servidor Express está rodando em http://localhost:${port}`); });