const db = require('../db');

const createEventTable = () => {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS evento (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome TEXT NOT NULL, endereco TEXT NOT NULL, data TEXT NOT NULL, horario TEXT NULL, criador_por INTEGER NOT NULL, FOREIGN KEY (criado_por) REFERENCES usuario (id))', (error) => {
            if (error) {
                console.log(`Não foi possível criar a tabela "evento": ${error}`);
            } else {
                console.log('Tabela "evento" criada com sucesso!');
            }
        });
    });
};

module.exports = { createEventTable } 