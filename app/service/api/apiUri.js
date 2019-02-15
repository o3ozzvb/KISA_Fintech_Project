const uris = {
  authorize2 : "/oauth/2.0/authorize2",  //사용자인증
  token :"/oauth/2.0/token", //토큰발급
  authorize_account2: "/oauth/2.0/authorize_account2", //계좌등록확인 (개선버전)
  user_me: "/v1.0/user/me", // 사용자정보조회
  unlink: "/v1.0/user/unlink",  // 사용자로그인연결 동의해제
  account_list:"/v1.0/account/list", // 등록계좌조회
  account_update_info: "/v1.0/account/update_info", // 계좌정보변경
  account_cancel: "/v1.0/account/cancel", // 계좌해지
  account_balance: "/v1.0/account/balance", // 잔액조회
  account_transaction_list: "/v1.0/account/transaction_list", // 거래내역조회
  real_name: "/v1.0/inquiry/real_name", //실명조회
  inquery_remit_list: "/v1.0/inquiry/remit_list", //송금인정보조회
  transfer_withdraw: "/v1.0/transfer/withdraw", //출금이체
  transfer_deposit: "/v1.0/transfer/deposit", //입금이체 1
  transfer_deposit2: "/v1.0/transfer/deposit2", //입금이체 2
  transfer_result: "/v1.0/transfer/result", //이체결과조회
  transfer_recheck: "/v1.0/transfer/recheck", //이체 API 처리조회
  bank_status: "/v1.0/bank/status"  //참가은행 상태조회
};

module.exports = uris;