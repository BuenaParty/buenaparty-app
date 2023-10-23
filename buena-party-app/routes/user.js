const serverExpress = require('../server');

const testUser = console.log('O roteamento está funcionando!');

serverExpress.get('/user/test', _ => {
    console.log('Está funcionando!')
});

module.exports = serverExpress;