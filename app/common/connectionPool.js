const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 10,
    host     : '34.85.6.250',
    user     : 'fintech',
    password : 'fintech',
    database : 'fintechdb'
  });


module.exports = pool;