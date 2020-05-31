const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    // change to the real dataBase 
    database: 'shop',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;
