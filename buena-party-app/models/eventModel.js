const db = require('../db');

const createEventTable = () => {
    
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS evento (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome TEXT NOT NULL, endereco TEXT NOT NULL, data DATE NOT NULL, horario TIME NOT NULL, criado_por INTEGER NOT NULL, codigo_convite TEXT UNIQUE, convidado_id INTEGER, FOREIGN KEY (criado_por) REFERENCES usuario (id), FOREIGN KEY (convidado_id) REFERENCES usuario (id))', (error) => {
            if (error) {
                console.log(`Não foi possível criar a tabela "evento": ${error}`);
            } else {
                console.log('Tabela "evento" criada com sucesso!');
            }
        });

        db.run('CREATE TABLE IF NOT EXISTS convidados (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, evento_id INTEGER NOT NULL, convidado_id INTEGER NOT NULL, FOREIGN KEY (evento_id) REFERENCES evento (id), FOREIGN KEY (convidado_id) REFERENCES usuario (id))', (error) => {
            if (error) {
                console.log(`Não foi possível criar a tabela "convidados": ${error}`);
            } else {
                console.log('Tabela "convidados" criada com sucesso!');
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

const getEventById = (eventId, callback) => {
    db.get('SELECT * FROM evento WHERE id = ?', eventId, (error, row) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, row);
        }
    });
};

const getInviteCodeByEventId = (eventId, callback) => {
    db.get('SELECT codigo_convite FROM evento WHERE id = ?', eventId, (error, row) => {
        if (error) {
            callback(error, null);
        } else {
            const inviteCode = row ? row.codigo_convite : null;
            callback(null, inviteCode);
        }
    });
};

const getEventByUserId = (userId, callback) => {
    db.all('SELECT * FROM evento WHERE criado_por = ?', userId, (error, row) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, row);
        }
    });
};

const generateShortCode = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        shortCode += characters.charAt(randomIndex);
    }

    return shortCode;
};

const insertEvent = (event, callback) => {
    const { nome, endereco, data, horario, criado_por } = event;
    const codigoConvite = generateShortCode(); // Gera um ID único

    db.run('INSERT INTO evento (nome, endereco, data, horario, criado_por, codigo_convite ) VALUES (?, ?, ?, ?, ?, ?)', [nome, endereco, data, horario, criado_por, codigoConvite], (error) => {
        if (error) {
            callback(error);
        } else {
            callback(null, codigoConvite); // Retorna o código de convite gerado
        };
    });
};

const addGuestToEvent = (eventId, userId, callback) => {
    db.run('UPDATE evento SET convidado_id = ? WHERE id = ?', [userId, eventId], (error) => {
        if (error) {
            callback(error);
        } else {
            callback(null);
        }
    });
};

const getGuestsByEventId = (eventId, callback) => {
    db.all('SELECT u.* FROM usuario u INNER JOIN evento e ON u.id = e.convidado_id WHERE e.id = ?', eventId, (error, rows) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, rows);
        }
    });
};

const removeGuestFromEvent = (eventId, userId, callback) => {
    db.run('UPDATE evento SET convidado_id = NULL WHERE id = ? AND convidado_id = ?', [eventId, userId], (error) => {
        if (error) {
            callback(error);
        } else {
            callback(null);
        }
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
};

const resetAutoIncrement = _ => {
    db.run('DELETE FROM sqlite_sequence WHERE name = "evento"');
};

module.exports = { createEventTable, getEvents, insertEvent, updateEvent, deleteEvent, resetAutoIncrement, getEventById, getEventByUserId, addGuestToEvent, getGuestsByEventId, removeGuestFromEvent, getInviteCodeByEventId }; 