const apiService = require('../service/api/apiService');
const authService = require('../service/api/authService');

const realname = function (req, res, next) {

  // console.log(req.user);
  // 조회할 데이터
  const data = {
    "bank_code_std": "002",
    "account_num": "1234567890123456",
    "account_holder_info_type": "",
    "account_holder_info": "880101",
    "tran_dtime": "20190212175158"
  };

  authService.accessToken().then( (response) => {
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


module.exports = { realname, user_me };