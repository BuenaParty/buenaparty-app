const express = require('express');
const bodyParser = require('body-parser');
const { createUserTable } = require('./models/userModel');
const { registerUser, listUsers, updateUser, deleteUser } = require('./controllers/user/userController');
const { listEvents, registerEvent, changeEvent, removeEvent, showEvent } = require('./controllers/event/eventController')
const cors = require('cors');
const { login } = require('./controllers/user/authController');

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

// Operações com Eventos
server.get('/event/:id', showEvent)
server.get('/events/list', listEvents);
server.post('/event/register', registerEvent);
server.put('/event/update/:id', changeEvent);
server.delete('/event/delete/:id', removeEvent);

server.listen(port, () => { console.log(`O servidor Express está rodando em http://localhost:${port}`); });

module.exports = server;
