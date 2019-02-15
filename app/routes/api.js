const express = require('express');
const { realname, user_me } = require('../controller/apiController');
const router = express.Router();
const isAuthenticated = require('../common/isAuthenticated');

// 계좌실명 조회
router.get('/realname', isAuthenticated, realname);

// 사용자 정보조회
router.get('/user_me', isAuthenticated, user_me);

module.exports = router;
