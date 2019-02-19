const axios = require('axios');
const apiUri = require("./apiUri");
const { getUrl } = require("../../common/util");

//TODO 사용자정보조회
const userMe = (data) => {
  return axios.get(getUrl(apiUri.user_me), data)
};

//TODO 사용자로그인연결 동의해제
const unlink = (data) => {
  return axios.post(getUrl(apiUri.unlink), data)
};

//TODO 등록계좌조회
const accountList = (data) => {
  return axios.get(getUrl(apiUri.account_list), data)
};

//TODO 계좌정보변경
const accountUpdateInfo = (data) => {
  return axios.post(getUrl(apiUri.account_update_info), data)
};

//TODO 계좌해지
const accountCancel = (data) => {
  return axios.post(getUrl(apiUri.account_cancel), data)
};

//TODO 잔액조회
const accountBalance = (data) => {
  return axios.get(getUrl(apiUri.account_balance), data)
};

//TODO 거래내역조회
const accountTransactionList = (data) => {
  return axios.get(getUrl(apiUri.account_transaction_list), data)
};

//실명조회
const realName = (data) => {
  return axios.post(getUrl(apiUri.real_name), data)
};

//TODO 송금인정보조회
const inqueryRemitList = (data) => {
  return axios.post(getUrl(apiUri.inquery_remit_list), data)
};

//TODO 출금이체
const transferWithdraw = (data) => {
  return axios.post(getUrl(apiUri.transfer_withdraw), data)
};

//TODO 입금이체 1
const transferDeposit = (data) => {
  return axios.post(getUrl(apiUri.transfer_deposit), data)
};

//TODO 입금이체 2
const transferDeposit2 = (data) => {
  return axios.post(getUrl(apiUri.transfer_deposit2), data)
};

//TODO 이체결과조회
const transferResult = (data) => {
  return axios.post(getUrl(apiUri.transfer_result), data)
};

//TODO 이체 API 처리조회
const transferRecheck = (data) => {
  return axios.post(getUrl(apiUri.transfer_recheck), data)
};

//TODO 참가은행 상태조회
const bankStatus = (data) => {
  return axios.get(getUrl(apiUri.bank_status), data)
};

module.exports = {
  userMe,
  unlink,
  accountList,
  accountUpdateInfo,
  accountCancel,
  accountBalance,
  accountTransactionList,
  realName,
  inqueryRemitList,
  transferWithdraw,
  transferDeposit,
  transferDeposit2,
  transferResult,
  transferRecheck,
  bankStatus
};