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

const insertUser = (user) => {
    const { nome, e_mail, senha, telefone } = user;

    const insertStatament = db.prepare('INSERT INTO usuario (nome, e_mail, senha, telefone) VALUES (?, ?, ?, ?)');
    insertStatament.run([nome, e_mail, senha, telefone,], (error) => {
        if (error) {
            console.error(`Erro ao inserir os registros na tabela 'usuario': ${error}`);
        } else {
            console.log('Registros inseridos com sucesso!');
        }
    });
    insertStatament.finalize();
}

module.exports = { createUserTable, insertUser };