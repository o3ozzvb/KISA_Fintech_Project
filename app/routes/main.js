const express = require('express');
const router = express.Router();
const userService = require('../service/api/userService');
const apiService = require('../service/api/apiService');
const isAuthenticated = require('../common/isAuthenticated');
// router.get('/newlogin', (req, res) =>{
//   res.render('newlogin');
// });

router.get('/main', (req, res) => {
  res.render('main');
});

router.get('/main2', (req, res) => {
  res.render('main2');
});

router.get('/main2', (req, res) => {
  res.render('main2');
});

router.get('/test', (req, res) => {
  res.render('test');
});

router.get('/threeButton', (req, res) => {
  res.render('threeButton');
});

router.get('/threeButton1', (req, res) => {
  res.render('threeButton1');
});

router.get('/reportUser', (req, res) => {
  res.render('reportUser');
});

router.get('/report', (req, res) => {
  res.render('report');
});

router.get('/listPayment', isAuthenticated, (req, res) => {
  const user_id = req.user.user_id;

  userService.getUserByUserId(user_id)
    .then(user => {
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
      console.log("dsafsdafsdajflhdskjalfhkjsdalfhlkjdsa");
      return apiService.accountTransactionList(reqConfig)

    }).then((result) => {
    console.log(result.data);
    return res.render('listPayment',
      {tx_list: result.data.res_list}
    );
  }).catch(error => res.send(error))

});

router.get('/setTarget', (req, res) => {
  res.render('set_target_page2');
});

router.get('/newcheckbox', (req, res) => {
  res.render('newcheckbox');
});

router.get('/newfinal', (req, res) => {
  res.render('newfinal');
});

router.get('/home', (req, res) => {
  res.render('home');
});

router.get('/testmain', (req, res) => {
  res.render('main');
});

router.get('/newlist', isAuthenticated, (req, res) => {
  // res.render('newlist');
  const user_id = req.user.user_id;

  userService.getUserByUserId(user_id)
    .then(user => {
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

        return apiService.accountTransactionList(reqConfig);
      }
    )
    .then((result) => {
      let filteredData = result.data.res_list.filter(function (item) {
        return item.print_content == '돼지적금'
      });

      return res.render('newlist', {tx_list: filteredData});
    })
    .catch(error => res.send(error))
});


module.exports = router;