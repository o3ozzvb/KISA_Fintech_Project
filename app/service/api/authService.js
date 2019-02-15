const axios = require('axios');
const config = require("../../common/config");
const apiUri = require("./apiUri");
const { getUrl, formUrlEncoded } = require("../../common/util");

/**
 * 사용자 인증
 * @returns {never}
 */

// 2 ledge
const accessToken = () => {

  const data = {
    client_id : config.clientId,
    client_secret: config.clientSecret,
    scope: "oob",
    grant_type: "client_credentials"
  };

  return axios({
    method: 'post',
    url: getUrl(apiUri.token),
    data: formUrlEncoded(data),
    config: {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
  });
};

module.exports = {accessToken};