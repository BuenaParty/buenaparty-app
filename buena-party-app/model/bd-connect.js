const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3090;

app.use(bodyParser.json())
app.use(cors());

// Conexão com o Banco de Dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'BUENA_PARTY',
});

db.connect((err) => {
  if (err) {
    console.error('Erro na conexão com o MySQL: ' + err.stack);
    return;
  }
  console.log('Conexão bem-sucedida ao MySQL como ID ' + db.threadId);
});


///////// Não sei se o servidor express fica no mesmo arquivo, caso sim, será necessário criar outro arquivo a parte

// Servidor Express
app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
  });