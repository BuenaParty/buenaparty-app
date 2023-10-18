const mysql = require('mysql2');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'buena_party'
};

const dbConnection = mysql.createConnection(dbConfig);

dbConnection.connect(error => { if (error) { console.log(`Erro ao se conectar com o Banco: ${error}`); return; } console.log('Conexão bem sucedida com o Banco!'); });

module.exports = dbConnection;