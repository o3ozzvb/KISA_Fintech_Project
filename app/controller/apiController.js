const apiService = require('../service/api/apiService');
const authService = require('../service/api/authService');
const userService = require('../service/api/userService');
const pigService = require('../service/db/pigService');
const axios = require('axios');
const apiUri = require("../service/api//apiUri");
const {getUrl} = require("../common/util");

const realname = function (req, res, next) {

  const data = {
    "bank_code_std": "002",
    "account_num": "1234567890123456",
    "account_holder_info_type": "",
    "account_holder_info": "880101",
    "tran_dtime": "20190212175158"
  };

  authService.accessToken().then((response) => {
    //액세스 토큰발급
    const accessToken = response.data.access_token;
    const config = {headers: {'Authorization': `Bearer ${accessToken}`}};

    //토근발급후 실명조회
    apiService.realName(data, config).then((response) => {
      if (response.status === 200) {
        return res.send(response.data);
      } else {
        console.error(res.status)
      }
    }, (error) => console.log(error)).catch((error) => {
      console.log("catch ", error)
    });
  });
};

//사용자 정보조회
const user_me = function (req, res, next) {
  //apiService.userMe(data, config).then....
};

//등록계좌조회
const account_list = function (req, res, next) {

  const user_id = req.user.user_id;

  userService.getUserByUserId(user_id)
    .then(user => {
      const reqConfig = {
        params: {user_seq_no: user.user_seq_no, include_cancel_yn: "Y", sort_order: "D"},
        headers: { // 요청 헤더
          'Authorization': `Bearer ${user.user_accessToken}`
        }
      }
      apiService.accountList(reqConfig)
        .then((data) => {
          console.log(data.data);
          return res.send(data.data)
        })
        .catch(error => res.send(error))
    })
};

//잔액조회
const account_balance = function (req, res, next) {

  const user_id = req.user.user_id;

  userService.getUserByUserId(user_id)
    .then(user => {
      const reqConfig = {
        params: {fintech_use_num: "199003877057724702985550", tran_dtime: "20190219132900"},
        headers: { // 요청 헤더
          'Authorization': `Bearer ${user.user_accessToken}`
        }
      }

      apiService.accountBalance(reqConfig)
        .then((data) => {
          console.log(data.data);
          return res.send(data.data)
        })
        .catch(error => res.send(error))
    })
}
//입금이체2 계좌번호사용
const transfer_deposit2 = function (req, res, next) {
  const user_id = req.user.user_id;
  userService.getUserByUserId(user_id)
    .then(user => {
      const reqConfig = {
        params: {
          // wd_pass_phrase: "NONE",
          wd_pass_phrase: "NONE",
          wd_print_content: "환불해드림..",
          name_check_option: "off",
          req_cnt: "1",
          req_list: [
            {
              tran_no: "1",
              bank_code_std: "097",
              account_num: "9876543210987654",
              account_holder_name: "홍길동",
              print_content: "테스트베드",
              tran_amt: "10000"
            }
          ],
          tran_dtime: "20160310101921"
        },
        headers: { // 요청 헤더
          'Authorization': `Bearer 08e28d74-664a-4cd8-91da-4a1b38a9aaea`
        }
      }

      apiService.transferDeposit2(reqConfig)
        .then((data) => {
          console.log(data.data);
          return res.send(data.data)
        })
        .catch(error => res.send(error))
    })
};

const transfer_withdraw = (req, res, next) => {
  const user_id = req.user.user_id;

  userService.getUserByUserId(user_id)
    .then(user => {
      const reqConfig = {
        params: {
          dps_print_content: "입금계좌에 찍히는 문자",
          fintech_use_num: "199003877057724702970497",
          print_content: "출금계좌에 찍히는 문자",
          tran_amt: "10000",    // 거래금액
          tran_dtime: "20190310101921",  // 거래시
          // cms_no: ""       // CMS 번호
        },
        headers: { // 요청 헤더
          'Authorization': `Bearer ${user.user_accessToken}`
        }
      };

      apiService.accountBalance(reqConfig)
        .then((data) => {
          console.log(data.data);
          return res.send(data.data)
        })
        .catch(error => res.send(error))
    })
};

//거래내역조회
const account_transaction_list = (req, res, next) => {
  const user_id = req.user.user_id;

  userService.getUserByUserId(user_id)
    .then(user => {
      const reqConfig = {
        params: {
          // fintech_use_num:"199003877057724702970497",
          fintech_use_num: "199003877057724702985550",
          inquiry_type: "A",
          from_date: "20190218",
          to_date: "20190219",
          sort_order: "D",
          page_index: "1",
          tran_dtime: "20190219174500",
          befor_inquiry_trace_info: "123",
          list_tran_seqno: "0"
        },
        headers: {
          'Authorization': `Bearer ${user.user_accessToken}`
        }
      };
      apiService.accountTransactionList(reqConfig)
        .then((data) => {
          console.log(data.data);
          return res.send(data.data)
        })
        .catch(error => res.send(error))
    })
};

//돼지 보유 여부 확인
const mainPage = function (req, res, next) {
  const user_id = req.user.user_id;

  let result = {
    pig: {},
    saved_money: 0,
    today_save_money: 0,
    pig_weight: 0
  };

  pigService.getPigByUser(user_id).then(rows => {
    if (rows.length == 0) {
      return res.render("main");
    } else {
      result.pig = rows[0];
      return userService.getUserByUserId(user_id)
    }
  }).then(user => {
      const reqConfig = {
        params: {
          fintech_use_num: "199003877057724702985550",
          inquiry_type: "A",
          from_date: "20190218",
          to_date: "20190219",
          sort_order: "D",
          page_index: "1",
          tran_dtime: "20190219174500",
          befor_inquiry_trace_info: "123",
          list_tran_seqno: "0"
        },
        headers: {
          'Authorization': `Bearer ${user.user_accessToken}`
        }
      };
      return apiService.accountTransactionList(reqConfig)

    }).then((responseData) => {

    let filteredData = responseData.data.res_list.filter(function (item) {
      return item.print_content == '돼지적금'
    });

    let amount = 0;
    for (let i = 0; i < filteredData.length; i++) {
      amount = amount + Number(filteredData[i].tran_amt)
    }

    result.saved_money = amount;

    userService.getUserByUserId(user_id);

    console.log(result);
    return res.render("main2", { pigData : result});
  })
};



const insertPig = function (req, res, next) {

  const user_id = req.user.user_id;

  const data = {
    goal: req.body.goal,
    //isTogether:'0', //제승추가
    minPeriod: '0',
    myPeriod: req.body.myPeriod,
    budgetAmt: req.body.budgetAmt,
    user_id: user_id,
    goalAmt: req.body.goalAmt,
    //together_id:'null', //제승추가
    withdraw_acct: req.body.withdrawAcct, //'withdrawAcct',
    fintech_use_num: '199003877057724702970497'
  };
  console.log(data);

  pigService.insertPig(data)
    .then(result => {
      console.log(result);
      res.render('main2')
    })
    .catch(error => console.log(error));
}


const selectPig = function (req, res, next) {
  const user_id = req.user.user_id;

  pigService.getPigByUser(user_id)
    .then((rows) => {
      console.log(rows);
      return res.send(rows)
    }).catch(error => res.send(error));
}

module.exports = {
  realname, user_me, account_list, account_balance, transfer_deposit2, transfer_withdraw
  , account_transaction_list, mainPage, insertPig, selectPig
};
