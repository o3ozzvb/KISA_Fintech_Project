const {getOAuthToken, getAccessToken} = require('../service/api/authService');
const {updateAccessToken} = require('../service/api/userService');


const oauthCallback = (req, res, next) => {
  const user_id = req.user.user_id;
  const code = req.query.code;

  getOAuthToken(code).then(response => response.data)
    .then((data) => {
      console.log(user_id, data);
      const token_info = {user_accessToken: data.access_token, user_seq_no: data.user_seq_no}
      updateAccessToken(user_id, token_info)
        .then((data) => {
          res.send(data);
        }).catch(error => res.send(error));
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

module.exports = {oauthCallback, accessToken};