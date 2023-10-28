const { checkUser } = require('../../models/userModel');

// Parei aqui
const userLogin = (req, res) => {
    const { e_mail, senha } = req.body;

    checkUser(e_mail, senha, (error, user) => {
        if (error) {
            res.status(500).json({ error: `Erro no servidor: ${error}` });
        } else {
            if (user) {
                res.status(200).json({ message: 'Login bem-sucedido', user });
            } else {
                res.status(401).json({ error: 'Suas credenciais inválidas!'});
            }
        }
    });
};

module.exports = { userLogin };