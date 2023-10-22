const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const port = 3000;

server.use(bodyParser.json());

server.listen(port, () => { console.log(`O servidor Express está rodando em http://localhost:${port}`); });

module.exports = express;