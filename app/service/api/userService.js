const Promise = require("bluebird");
const getSqlConnection = require('../../common/connection');

const updateAccessToken = (user_id, token_info) => {

  if ( user_id == null || token_info == null || token_info.user_accessToken == null || token_info.user_seq_no == null) {
    return "error";
  }

  return Promise.using(getSqlConnection(),
     function (connection) {
      return connection.query(
        "UPDATE user SET user_accessToken= ?, user_seq_no= ? WHERE user_id= ?",
        [token_info.user_accessToken, token_info.user_seq_no, user_id ]
      ).catch( error => console.log(error))
    });
};


const getUserByUserId = (user_id) => {
  return Promise.using(getSqlConnection(),
    (connection) => {
      return connection.query('SELECT * FROM user WHERE user_id = ?', user_id)
    }).then( rows => {
      return rows[0];
  });
}
module.exports = { updateAccessToken, getUserByUserId };