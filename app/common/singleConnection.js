var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '34.85.6.250',
  user     : 'fintech',
  password : 'fintech',
  database : 'fintechdb'
});


module.exports = connection;

