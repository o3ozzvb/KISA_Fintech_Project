const Promise = require("bluebird");
const getSqlConnection = require('../../common/connection');


const updateAccessToken = (user_id, token_info) => {
  return Promise.using(getSqlConnection(),
    (connection) => {
      return connection.query('UPDATE user SET user_accessToken = ?, user_sec_no = ?  WHERE user_id = ?', [token_info.user_accessToken, token_info.user_sec_no,  user_id])
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