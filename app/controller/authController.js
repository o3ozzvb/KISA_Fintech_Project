const authService = require('../service/api/authService');
const config = require("../common/config");
const { getUrl, formUrlEncoded } = require("../common/util");
const apiUri = require("../service/api/apiUri");
const axios = require('axios');
// const oauth = (req, res, next) => {
//     // Authorization oauth2 URI
//     const authorizationUri = oauth2.authorizationCode.authorizeURL({
//       redirect_uri: 'http://localhost:3000/auth/callback',
//       scope: 'login transfer inquiry', // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
//       auth_type: 0,
//       response_type: "code",
//       client_info: 'test whatever you want'
//     });
//     res.redirect(authorizationUri);
// }

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

  // axios.post(getUrl(apiUri.token), data, option)
  //   .then((response) => {
  //     console.log(response);
  //     res.send(response);
  //   })


//     console.log("test");
//     const code = req.query.code;
//     // Get the access token object (the authorization code is given from the previous step).
//     const tokenConfig = {
//       code: code,
//       redirect_uri: 'http://localhost:3000/auth/callback',
//       scope: 'login transfer inquiry', // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
//     };
//
// // Save the access token
//     try {
//       const result = await oauth2.authorizationCode.getToken(tokenConfig);
//       const accessToken = oauth2.accessToken.create(result);
//       console.log("ACCESS_TOKEN", accessToken);
//       res.send(accessToken);
//     } catch (error) {
//       console.log('Access Token Error', error.message);
//     }
}

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