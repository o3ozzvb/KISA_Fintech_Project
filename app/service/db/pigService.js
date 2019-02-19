const Promise = require("bluebird");
const getSqlConnection = require('../../common/connection');

const getPigByUser = (user_id) => {
    
  return Promise.using(getSqlConnection(),
  (connection) => {
    return connection.query('SELECT * FROM pig WHERE user_id = ?', user_id)
      .catch(function (error) {
        console.log(error);
      });
  });
}

const insertPig = (data) => {
console.log("testtt");
    res.send("test");

    // Promise.using(getSqlConnection(),
    // (connection) => {
    //     var sql = "INSERT INTO pig SET ?";
    //   return connection.query(sql, data)
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // });
}
module.exports = {getPigByUser, insertPig};