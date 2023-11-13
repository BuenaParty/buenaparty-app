const db = require('../db');

const createUserEventParticipationTable = () => {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS user_event_participation (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER NOT NULL, event_id INTEGER NOT NULL, invitation_code TEXT NOT NULL, FOREIGN KEY (user_id) REFERENCES usuario (id), FOREIGN KEY (event_id) REFERENCES evento (id))', (error) => {
            if (error) {
                console.log(`Não foi possível criar a tabela "user_event_participation": ${error}`);
            } else {
                console.log('Tabela "user_event_participation" criada com sucesso!');
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
                    // Add entry to user_event_participation when the invited user joins the event
                    db.run('INSERT INTO user_event_participation (user_id, event_id, invitation_code) VALUES (?, ?, ?)', [invitedUserId, eventId, inviteCode], (error) => {
                        if (error) {
                            callback(error);
                        } else {
                            callback(null);
                        }
                    });
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

module.exports = { inviteUserToEvent, getUserInvitations, createUserEventParticipationTable };
