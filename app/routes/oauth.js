const express = require('express');
const config = require('../common/config');
const authService = require('../service/api/authService');
const router = express.Router();
// Set the configuration settings
console.log("serverConfig", config);
const credentials = {
  client: {
    id: config.clientId,
    secret: config.clientSecret
  },
  auth: {
    tokenHost: config.serverUrl + "/oauth/2.0/authorize2"
  },
  // http: {
  //   headers: {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36"}
  // }
};


console.log(credentials.auth.tokenHost);
// https://twww.open-platform.or.kr/apt/mobileweb/authorize?client_id=l7xx4f4caafa626e453eac615a2ee74bdd3c&response_type=code&lang=&edit_option=&scope=login+transfer+inquiry&redirect_uri=http%3A%2F%2Flocalhost%3A8880%2Fhtml%2Fcallback.html&client_info=test+whatever+you+want&auth_type=0&bg_color=%23FAFAFA&txt_color=%23050505&btn1_color=%23006DB8&btn2_color=%23818487&invoke_type=ajax&sessionID=9d0e84a6-13a3-429e-84d3-9db4b33e0abd&action=Grant&api_tran_id=0d226a39-70a4-4fcf-a71d-5072655748be&gw_svc_id=793ca84b51e6c631d339e5180897dc2b&gw_app_key=l7xx4f4caafa626e453eac615a2ee74bdd3c&scope=login%20transfer%20inquiry&redirect_uri=http://localhost:8880/html/callback.html&auth_type=0

const oauth2 = require('simple-oauth2').create(credentials);

/* GET users listing. */
router.get('/', function (req, res, next) {
  // Authorization oauth2 URI
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: 'http://localhost:3000/auth/callback',
    scope: 'login transfer inquiry', // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
    auth_type: 0,
    response_type: "code",
    client_info: 'test whatever you want'
  });

// Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
  res.redirect(authorizationUri);

});


/* GET users listing. */
router.get('/callback', async function (req, res, next) {
  console.log("test");
  const code = req.query.code;
  // Get the access token object (the authorization code is given from the previous step).
  const tokenConfig = {
    code: code,
    redirect_uri: 'http://localhost:3000/auth/callback',
    scope: 'login transfer inquiry', // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
  };

// Save the access token
  try {
    const result = await oauth2.authorizationCode.getToken(tokenConfig);
    const accessToken = oauth2.accessToken.create(result);
    console.log("ACCESS_TOKEN", accessToken);
  } catch (error) {
    console.log('Access Token Error', error.message);
  }
});

//2-legged 인증 토큰을 가져오는 코드.. testㅇㅔㅅㅓㅁㅏㄴㅅㅏㅇㅛㅇ
router.get("/two/token", (req, res, next) => {

console.log("1");
  authService.accessToken().then(
    (response) => {
      console.log(response.data);
      res.send(response.data);
    }).catch(error => {
      console.log(error.toString())
      res.send(error);
    }
  );
});

module.exports = router;