const db = require('../db');

const createCodeEventTable = () => {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS codeevent (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, invitecode TEXT NOT NULL, evento_id INTEGER NOT NULL, criado_por INTEGER NOT NULL, FOREIGN KEY (evento_id) REFERENCES evento (id), FOREIGN KEY (criado_por) REFERENCES usuario (id))', (error) => {
            if (error) {
                console.log(`Não foi possível criar a tabela "codeevent": ${error}`);
            } else {
                console.log('Tabela "codeevent" criada com sucesso!');
            }
        });
    });
};

const inviteUserToEvent = (eventId, inviterId, inviteCode, invitedUserId, callback) => {
    db.run('INSERT INTO codeevent (invitecode, evento_id, criado_por) VALUES (?, ?, ?)', [inviteCode, eventId, inviterId], (error) => {
        if (error) {
            callback(error);
        } else {
            const codeEventId = this.lastID;
            db.run('INSERT INTO user_invitations (codeevent_id, user_id) VALUES (?, ?)', [codeEventId, invitedUserId], (error) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null);
                }
            });
        }
    });
};

const getUserInvitations = (userId, callback) => {
    db.all('SELECT codeevent.invitecode, evento.nome FROM codeevent INNER JOIN user_invitations ON codeevent.id = user_invitations.codeevent_id INNER JOIN evento ON codeevent.evento_id = evento.id WHERE user_invitations.user_id = ?', userId, (error, rows) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, rows);
        }
    });
};

module.exports = { createCodeEventTable, inviteUserToEvent, getUserInvitations };
