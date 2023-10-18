const User = require('../models/userModel');

exports.listUsers = (req, res) => {

    User.getUsers((error, user) => {

        if (error) { res.status(500).json({ errorMessage: `Erro no lado do servidor: ${error}`}); return; }

        res.json(user);

    });

}