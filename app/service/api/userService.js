const Promise = require("bluebird");
const getSqlConnection = require('../../common/connection');


const updateAccessToken = (user_id, user_accessToken) => {
  return Promise.using(getSqlConnection(),
    (connection) => {
      return connection.query('UPDATE user SET user_accessToken = ? WHERE user_id = ?', [user_accessToken, user_id])
    });
};



module.exports = { updateAccessToken };