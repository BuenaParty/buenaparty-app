const db = require('../db');

const createUserTable = () => {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS usuario (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, e_mail TEXT NOT NULL UNIQUE, senha TEXT, telefone TEXT)', (error) => {
            if (error) {
                console.error(`Erro na criação da tabela 'usuario': ${error.message}`);
            } else {
                console.log(`Tabela 'usuario' criada com sucesso!`);
            }
        });
    });
}; 

const insertUser = (user, callback) => {
    const { nome, e_mail, senha, telefone } = user;

    db.run('INSERT INTO usuario (nome, e_mail, senha , telefone) VALUES (?, ?, ?, ?)', [nome, e_mail, senha, telefone], (error) => {
        if (error) {
            callback(error);
        } else {
            callback(null);
        }
    })
}

const getUsers = (callback) => {
    db.all('SELECT * FROM usuario;', (error, rows) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, rows);
        }

        db.close();
    });
};

module.exports = { createUserTable, insertUser, getUsers };