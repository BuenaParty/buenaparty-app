const db = require('../../db');

const login = (req, res) => {
    const { e_mail, senha } = req.body;

    db.get('SELECT id, nome, e_mail, telefone FROM usuario WHERE e_mail = ? AND senha = ?', [e_mail, senha], (error, user) => {
        if (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else if (!user) {
            res.status(401).json({ error: 'Credenciais inválidas' });
        } else {
            res.status(200).json({ message: 'Login bem-sucedido', user });
        }
    });
};

module.exports = { login };