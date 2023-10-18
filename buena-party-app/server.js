const express = require('express');
const server = express();
const port = 3000;

server.get('/', (req, res) => { res.send('O servidor Express está funcionando!')});

server.listen(port, () => { console.log(`O servidor Express está rodando em http://localhost:${port}`); });