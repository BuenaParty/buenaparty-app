const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');
const { createUserTable } = require('./models/userModel');
const { registerUser, listUsers, updateUser, deleteUser } = require('./controllers/user/userController');
const { userLogin } = require('./controllers/user/authController');
const { createEventTable } = require('./models/eventModel');
const { listEvents, registerEvent, changeEvent, removeEvent } = require('./controllers/event/eventController');

const server = express();
const port = 3000;

// server.use(CORS);
server.use(bodyParser.json());

// Criação da tabela de usuários
createUserTable();

// Criação da tabela de eventos
createEventTable();

// Operações com os usuários
server.post('/user/register', registerUser);
server.post('/user/login', userLogin);
server.get('/users', listUsers);
server.param('id', (req, res, next, id) => {
    req.userId = parseInt(id, 10);
    next();
});
server.put('/user/update/:id', updateUser);
server.delete('/user/delete/:id', deleteUser);


// Operações com os eventos
server.get('/events', listEvents);
server.post('/event/register', registerEvent);
server.put('/event/update/:id', changeEvent);
server.delete('/event/delete/:id', removeEvent);

server.listen(port, () => { console.log(`O servidor Express está rodando em http://localhost:${port}`); });

module.exports = server;