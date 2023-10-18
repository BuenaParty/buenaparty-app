const db = require('../db');

class User {
    static getUsers(callback) { db.query('SELECT * FROM usuario'), callback; }

    static registerUser(user, callback) { db.query('INSERT INTO usuario (nome, e_mail, senha, telefone) VALUES (?, ?, ?, ?)', [user.nome, user.e_mail, user.senha, user.telefone], callback); }
};

module.exports = User;