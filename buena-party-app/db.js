const sqlite = require('sqlite3');

const db = new sqlite.Database('./database/buena_party.db', (error) => {
    if (error) {
        console.error(`Erro ao se conectar com o Banco de Dados: ${error}`);
    } else {
        console.log('Conexão com o Banco de Dados bem sucedida!');
    }
});

module.exports = db;