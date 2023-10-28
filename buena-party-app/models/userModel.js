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
};

const checkUser = (userE_mail, userSenha, callback) => {
    db.run('SELECT e_mail, senha FROM usuario WHERE e_mail = ?', userE_mail, (error, result) => {
        if (error) {
            console.log(`Erro ao consultar as informações no Banco de Dados: ${error}`);
            callback(error, null);
        } else {
            console.log(`Informações verificadas: ${result}`);
            callback(null, result);
        };
        // } else {
        //     console.log(`As credenciais não são válidas: ${result}`);
        //     callback(null);
        // }
    })
};

const getUsers = (callback) => {
    db.all('SELECT * FROM usuario;', (error, rows) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, rows);
        }
    });
};

const changeUser = (userId, updatedUser, callback) => {
    const { nome, e_mail, senha, telefone } = updatedUser;

    db.run('UPDATE usuario SET nome = ?, e_mail = ?, senha = ?, telefone = ? WHERE id = ?', [nome, e_mail, senha, telefone, userId], (error) => {
        if (error) {
            callback(error);
        } else {
            callback(null);
        }
    });
};

const removeUser = (userId, callback) => {

    let deletedUser;

    db.serialize(_ => {
        db.get('SELECT nome FROM usuario WHERE id = ?', userId, (error, result) => {
            if (error) {
                callback(error);
            } else if (result) {
                deletedUser = result;

                db.run('DELETE FROM usuario WHERE id = ?', userId, (error) => {
                    if (error) {
                        callback(error);
                    } else {
                        db.run('VACUUM', (error) => {
                            if (error) {
                                callback(error);
                            } else {
                                callback(null, deletedUser);
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
    db.run('DELETE FROM sqlite_sequence WHERE name = "usuario"');
}

module.exports = { createUserTable, insertUser, checkUser, getUsers, changeUser, removeUser, resetAutoIncrement };