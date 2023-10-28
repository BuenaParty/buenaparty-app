const { checkUser } = require('../../models/userModel');

const userLogin = (req, res) => {
    const { e_mail, senha } = req.body;
    
    checkUser(e_mail, senha, (error, user) => {
        if (error) {
            res.status(500).json({ error: error });
        } else {
            res.status(200).json({ message: `Usuário: ${user}`});
        }
    })
}

module.exports = { userLogin };