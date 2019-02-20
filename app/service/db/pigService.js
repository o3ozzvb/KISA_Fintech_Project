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
<<<<<<< HEAD
console.log("testtt");
    res.send("test");
=======

    // res.send("test");
>>>>>>> 8b26d7b405f1b0f54a70a9243e2d11aa8e1b561b

    return Promise.using(getSqlConnection(),
    (connection) => {
        var sql = "INSERT INTO pig SET ?";
      return connection.query(sql, data)
        .catch(function (error) {
          console.log(error);
        });
    });
}
module.exports = {getPigByUser, insertPig};