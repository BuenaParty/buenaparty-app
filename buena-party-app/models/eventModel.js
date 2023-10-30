const db = require('../db');

const createEventTable = () => {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS evento (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome TEXT NOT NULL, endereco TEXT NOT NULL, data TEXT NOT NULL, horario TEXT NULL, criado_por INTEGER NOT NULL, FOREIGN KEY (criado_por) REFERENCES usuario (id))', (error) => {
            if (error) {
                console.log(`Não foi possível criar a tabela "evento": ${error}`);
            } else {
                console.log('Tabela "evento" criada com sucesso!');
            }
        });
    });
};

const getEvents = (callback) => {
    db.all('SELECT * FROM evento;', (error, rows) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, rows);
        }
    });
};

const insertEvent = (event, callback) => {
    const { nome, endereco, data, horario, criado_por } = event;

    db.run('INSERT INTO evento (nome, endereco, data, horario, criado_por) VALUES (?, ?, ?, ?, ?)', [nome, endereco, data, horario, criado_por], (error) => {
        if (error) {
            callback(error);
        } else {
            callback(null);
        };
    });
};

const updateEvent = (idEvent, updatedEvent, callback) => {
    const { nome, endereco, data, horario } = updatedEvent;

    db.run('UPDATE evento SET nome = ?, endereco = ?, data = ?, horario =? WHERE id = ?', [nome, endereco, data, horario, idEvent], (error) => {
        if (error) {
            callback(error);
        } else {
            callback(null);
        };
    });
};

const deleteEvent = (eventId, callback) => {

    let deletedEvent;

    db.serialize(_ => {
        db.get('SELECT nome FROM evento WHERE id = ?', eventId, (error, result) => {
            if (error) {
                callback(error);
            } else if (result) {
                deletedEvent = result;

                db.run('DELETE FROM evento WHERE id = ?', eventId, (error) => {
                    if (error) {
                        callback(error);
                    } else {
                        db.run('VACUUM', (error) => {
                            if (error) {
                                callback(error);
                            } else {
                                callback(null, deletedEvent);
                            }
                        });
                    }
                });
            } else {
                callback('Usuário não encontrado...');
            }
        });
    });
}

const resetAutoIncrement = _ => {
    db.run('DELETE FROM sqlite_sequence WHERE name = "evento"');
};

module.exports = { createEventTable, getEvents, insertEvent, updateEvent, deleteEvent, resetAutoIncrement }; 