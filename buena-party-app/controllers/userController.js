const User = require('../models/userModel');

exports.listUsers = (req, res) => {

    User.getUsers((error, user) => {

        if (error) { res.status(500).json({ errorMessage: `Erro no lado do servidor: ${error}`}); return; }

        res.json(user);

    });

};

exports.registerUser = (req, res) => {

    const newUser = { nome: req.body.name, e_mail: req.body.e_mail, senha: req.body.pass, telefone: req.body.phone };

    User.registerUser(newUser, (error) => { if (error) { res.status(500).json({ error: `Error ao registrar o usuário: ${error}`}); return; } res.status(201).json({ user: newUser }); });

};