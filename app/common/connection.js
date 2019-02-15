// const mysql = require('mysql');

const mysql = require('promise-mysql');

const pool = mysql.createPool({
    connectionLimit : 10,
    host     : '34.85.6.250',
    user     : 'fintech',
    password : 'fintech',
    database : 'fintechdb'
  });

function getSqlConnection() {
    return pool.getConnection().disposer(function(connection) {
        pool.releaseConnection(connection);
    });
}

module.exports = getSqlConnection;