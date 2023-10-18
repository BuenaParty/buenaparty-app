const db = require('../db');

class User {
    static getUsers(callback) { db.query('SELECT * FROM usuario'), callback; }
}

module.exports = User;