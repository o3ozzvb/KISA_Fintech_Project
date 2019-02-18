const {getOAuthToken, getAccessToken} = require('../service/api/authService');
const {updateAccessToken} = require('../service/api/userService');


const oauthCallback = (req, res, next) => {
  const user_id  = req.user.user_id;
  const code = req.query.code;

  getOAuthToken(code).then(response => {
    console.log(response.data);
    const accessToken = response.data.access_token;
    return accessToken;
  }).then( (accessToken) => {
    console.log(accessToken);
    console.log(user_id, accessToken);
    updateAccessToken(user_id, accessToken).then((data) => {
      res.send(data);
    }).catch( error => res.send(error));
  })
};


const accessToken = (req, res, next) => {
    getAccessToken().then(
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