const axios = require('axios');
const apiUri = require("./apiUri");
const { getUrl } = require("../../common/util");

//TODO 사용자정보조회
const userMe = (data, config) => {
  return axios.get(getUrl(apiUri.user_me), data, config)
};

//TODO 사용자로그인연결 동의해제
const unlink = (data, config) => {
  return axios.post(getUrl(apiUri.unlink), data, config)
};

//TODO 등록계좌조회
const accountList = (data, config) => {
  return axios.get(getUrl(apiUri.account_list), data)
};

//TODO 계좌정보변경
const accountUpdateInfo = (data, config) => {
  return axios.post(getUrl(apiUri.account_update_info), data, config)
};

//TODO 계좌해지
const accountCancel = (data, config) => {
  return axios.post(getUrl(apiUri.account_cancel), data, config)
};

//TODO 잔액조회
const accountBalance = (data, config) => {
  return axios.get(getUrl(apiUri.account_balance), data, config)
};

//TODO 거래내역조회
const accountTransactionList = (data, config) => {
  return axios.get(getUrl(apiUri.account_transaction_list), data, config)
};

//실명조회
const realName = (data, config) => {
  return axios.post(getUrl(apiUri.real_name), data, config)
};

//TODO 송금인정보조회
const inqueryRemitList = (data, config) => {
  return axios.post(getUrl(apiUri.inquery_remit_list), data, config)
};

//TODO 출금이체
const transferWithdraw = (data, config) => {
  return axios.post(getUrl(apiUri.transfer_withdraw), data, config)
};

//TODO 입금이체 1
const transferDeposit = (data, config) => {
  return axios.post(getUrl(apiUri.transfer_deposit), data, config)
};

//TODO 입금이체 2
const transferDeposit2 = (data, config) => {
  return axios.post(getUrl(apiUri.transfer_deposit2), data, config)
};

//TODO 이체결과조회
const transferResult = (data, config) => {
  return axios.post(getUrl(apiUri.transfer_result), data, config)
};

//TODO 이체 API 처리조회
const transferRecheck = (data, config) => {
  return axios.post(getUrl(apiUri.transfer_recheck), data, config)
};

//TODO 참가은행 상태조회
const bankStatus = (data, config) => {
  return axios.get(getUrl(apiUri.bank_status), data, config)
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