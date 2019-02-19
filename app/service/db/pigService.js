const Promise = require("bluebird");
const getSqlConnection = require('./../common/connection');

const getPigByUser = (user_id) => {
    
  return Promise.using(getSqlConnection(),
  (connection) => {
    return connection.query('SELECT * FROM pig WHERE user_id = ?', user_id)
      .catch(function (error) {
        console.log(error);
      });
  });
}