const express = require('express');
// var mysql      = require('mysql');
const router = express.Router();
const Promise = require("bluebird");
const getSqlConnection = require('./../common/connection');
const { updateAccessToken } = require( '../service/api/userService');

router.get('/query', function(req, res, next) {

  updateAccessToken("dongs", {user_accessToken: "tokne", user_seq_no: "1111"}
    // .then(
    // data => res.send(data)
  )
});

router.get("/abc", (req, res, next) => {
  res.render("abc")
});


router.get('/mysql_test', function (req, res, next) {
  Promise.using(getSqlConnection(),
    (connection) => {
      return connection.query('SELECT * FROM user')
        .then(rows => res.send(rows))
        .catch(function (error) {
          console.log(error);
        });
    });

  // Promise.using(getSqlConnection(),
  //    (connection) => {
  //     return connection.query('SELECT * FROM user')
  //       .then(rows => rows)
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }).then((rows) => {
  //     res.send(rows);
  // });
});

router.get('/user', (req, res) => {
  res.render('index');
});

router.get('/newlogin', (req, res) =>{
  res.render('newlogin');
})

router.get('/main', (req,res) =>{
  res.render('main');
})

router.get('/main2', (req,res) =>{
  res.render('main2');
})

router.get('/main2', (req,res) =>{
  res.render('main2');
})

router.get('/test', (req,res) =>{
  res.render('test');
})

router.get('/threeButton', (req,res) =>{
  res.render('threeButton');
})

router.get('/threeButton1', (req,res) =>{
  res.render('threeButton1');
})

router.get('/reportUser', (req,res) =>{
  res.render('reportUser');
})

router.get('/report', (req,res) =>{
  res.render('report');
})


router.get('/setTarget', (req,res) =>{
  res.render('set_target_page2');
})

router.get('/newcheckbox', (req, res) =>{
  res.render('newcheckbox');
})

router.get('/newfinal', (req,res) =>{
  res.render('newfinal');
})

router.get('/testmain', (req,res) =>{
  res.render('main');
})

router.get('/')

router.get('/insert', function (req, res, next) {

  const data = {
    name: '이름2',
    user_id: 'id2',
    user_password: 'pw2',
    user_address: '부산',
    user_accessToken: '1111'
  };

  Promise.using(getSqlConnection(),
    (connection) => {
      return connection.query('INSERT INTO user SET ?', data)
        .then(rows => res.send('The solution is: ', rows))
        .catch(function (error) {
          console.log(error);
        });
    });

  // connection.query('INSERT INTO kisadb.user SET ?', data,
  //    function (error, results, fields) {
  //      if (error) throw error;
  //      console.log('The solution is: ', results);
  // });
  // connection.end();

});

module.exports = router;

//l7xx4f4caafa626e453eac615a2ee74bdd3c
//163a431ca6d44f2cb4eb5a8bb2128239