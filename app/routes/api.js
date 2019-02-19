const express = require('express');
const { realname, user_me, account_list,account_balance,transfer_deposit2,mainPage } = require('../controller/apiController');
const router = express.Router();
const isAuthenticated = require('../common/isAuthenticated');

// 계좌실명 조회
router.get('/realname', isAuthenticated, realname);

// 사용자 정보조회
router.get('/user_me', isAuthenticated, user_me);

// 등록계좌조회
router.get('/account_list', isAuthenticated, account_list);

//잔액조회
router.get('/account_balance',isAuthenticated,account_balance);

//입금이체
router.get('/transfer_deposit2',isAuthenticated,transfer_deposit2);

//로그인 완료 후 첫 페이지
router.get('/main', mainPage);

module.exports = router;
