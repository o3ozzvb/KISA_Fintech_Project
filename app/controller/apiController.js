const apiService = require('../service/api/apiService');
const authService = require('../service/api/authService');
const userService = require('../service/api/userService');

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
      const config = {headers: {'Authorization': `Bearer ${user.accessToken}`}};
      const data = { user_seq_no: user.user_seq_no, include_cancel_yn: "Y", sort_order:"D"};
      apiService.accountList(data, config)
        .then((data) => {
          return res.send(data)
        }).catch( error => console.log(error))
    })
}


module.exports = {realname, user_me, account_list};