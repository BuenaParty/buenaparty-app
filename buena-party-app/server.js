const express = require('express');
const bodyParser = require('body-parser');
const { createUserTable } = require('./models/userModel');
const { registerUser, listUsers, updateUser, deleteUser } = require('./controllers/userController');
const cors = require('cors');
const { login } = require('./controllers/authController');

const server = express();
const port = 3000;

server.use(bodyParser.json());
server.use(cors());

// Criação da tabela de usuários
createUserTable();

// Operações com os usuários
server.post('/user/register', registerUser);
server.get('/users', listUsers);

server.post('/user/login', login);

server.param('id', (req, res, next, id) => {
    req.userId = parseInt(id, 10);
    next();
});

server.put('/user/update/:id', updateUser);
server.delete('/user/delete/:id', deleteUser);

server.listen(port, () => { console.log(`O servidor Express está rodando em http://localhost:${port}`); });

module.exports = server;