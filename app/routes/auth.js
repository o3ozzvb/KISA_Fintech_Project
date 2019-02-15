const express = require('express');
const {oauthCallback, accessToken} = require('../controller/authController');
const router = express.Router();

/* oauth 인증후 callback 처리 */
router.get('/callback', oauthCallback);

//2-legged 인증 토큰조회
router.get("/token", accessToken);

module.exports = router;
