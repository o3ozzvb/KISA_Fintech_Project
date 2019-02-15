const authService = require('../service/api/authService');
const config = require("../common/config");
const { getUrl, formUrlEncoded } = require("../common/util");
const apiUri = require("../service/api/apiUri");
const axios = require('axios');

const oauthCallback = async ( req, res, next ) => {

  const data = {
    code : req.query.code,
    client_id : config.clientId,
    client_secret : config.clientSecret,
    redirect_uri: 'http://localhost:3000/auth/callback',
    scope: 'login transfer inquiry',
    grant_type: "authorization_code"
  }

  return axios({
    method: 'post',
    url: getUrl(apiUri.token),
    data: formUrlEncoded(data),
    config: {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
  }).then(response=> {
    console.log(response.data);
    res.send("success " + response.data)
  }).catch( (error) => {
    console.log(error);
    res.send("error " + error)
  });
};

const accessToken = (req, res, next) => {
    authService.accessToken().then(
      (response) => {
        console.log(response.data);
        res.send("See node console");
      }).catch(error => {
        console.log(error.toString());
        res.send("error");
      }
    );
};

module.exports = { oauthCallback, accessToken };