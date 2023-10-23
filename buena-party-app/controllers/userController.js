const { insertUser, getUsers } = require('../models/userModel');

const registerUser = (req, res) => {
    const user = req.body;

    insertUser(user, (error) => {
        if (error) {
            res.status(500).json({ error: `Erro ao registrar o usuário: ${error}` });
        } else {
            res.status(201).json({ message: `Usuário registrado com sucesso! ${user}` });
        }
    });
};

const listUsers = (req, res) => {
    getUsers((error, users) => {
        if (error) {
            res.status(500).json({ error: `Erro ao listar os usuários: ${error}`});
        } else {
            res.status(200).json(users);
        }
    });
};

module.exports = { registerUser, listUsers };