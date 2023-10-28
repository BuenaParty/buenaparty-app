const db = require('../../db');

const userLogin = (req, res) => {
    const { e_mail, senha } = req.body;
    
    db.get('SELECT e_mail, senha FROM usuario WHERE e_mail = ?', (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Erro interno servidor' });
        } else if (!result) {
            res.status(401).json({ error: 'Credenciais inválidas' });
        } else {
            res.status(200).json({ message: 'Login bem-sucedido', result });
        }
    });
}

module.exports = { userLogin };