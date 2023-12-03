const express = require('express');
const bodyParser = require('body-parser');
const { createUserTable } = require('./models/userModel');
const { registerUser, listUsers, updateUser, deleteUser, showUser, resetPassword } = require('./controllers/user/userController');
const { listEvents, registerEvent, changeEvent, removeEvent, showEvent, listById, enterEvent, listGuests, removeGuest, showInviteCode, showByCode, listByGuest } = require('./controllers/event/eventController')
const cors = require('cors');
const { login } = require('./controllers/user/authController');
const { sendPasswordResetEmail } = require('./controllers/mails/mailController');
const authRoutes = require('./auth.js');

const server = express();
const port = 3000;

server.use(bodyParser.json());
server.use(cors());

// Criação da tabela de usuários
createUserTable();

server.get('/reset/:token', (req, res) => {
    const resetToken = req.params.token;
    // Verifique se o token é válido (por exemplo, consultando seu banco de dados)
    // Se o token for válido, envie uma resposta de sucesso
    res.json({ success: true, token: resetToken });
    res.redirect(`myapp://reset-password/${resetToken}`)
});

// Operações com os usuários
server.post('/user/register', registerUser);
server.get('/users', listUsers);
server.get('/user/:id', showUser)
server.post('/user/login', login);
server.post('/user/forgot-password', sendPasswordResetEmail);
server.post('/user/reset', resetPassword);

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
server.put('/event/update/:id', changeEvent);0
server.delete('/event/delete/:id', removeEvent);
server.get('/events/byuser/:userId', listById);
server.get('/event/:id/code', showInviteCode)

// Novas operações com eventos e convidados
server.get('/event/guests/:id', listGuests);
server.delete('/event/guest/:eventId/:userId', removeGuest);
server.post('/event/enter', enterEvent);
server.get('/event/byCode/:codigo_convite', showByCode);
server.get('/event/guest/:id', listByGuest);

server.use('/', authRoutes);

server.listen(port, () => { console.log(`O servidor Express está rodando em http://localhost:${port}`); });

module.exports = server;
