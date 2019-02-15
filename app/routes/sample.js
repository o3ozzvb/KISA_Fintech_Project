var express = require('express');
var request = require('request');
// var mysql      = require('mysql');
var cheerio = require('cheerio');
var router = express.Router();
var pool = require('../common/connectionPool');
var Promise = require("bluebird");
var getSqlConnection = require('./../common/connection');

router.get('/naver', function (req, res, next) {

  request('http://www.naver.com/', function (err, resp, html) {
    if (!err) {
      const $ = cheerio.load(html);
      console.log(html);
      res.send(html);
    } else {
      res.send({error: "error"})
    }
  });
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


router.get('/insert', function (req, res, next) {

  const data = {
    name: '이름2',
    user_id: 'id2',
    user_password: 'pw2',
    user_address: '부산',
    user_accessToken: '1111'
  };

  connection.query('INSERT INTO kisadb.user SET ?', data, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    // res.send(`result ${results[0].name}`);
  });

  connection.end();

});

module.exports = router;

//l7xx4f4caafa626e453eac615a2ee74bdd3c
//163a431ca6d44f2cb4eb5a8bb2128239