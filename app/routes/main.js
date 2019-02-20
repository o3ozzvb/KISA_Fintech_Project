const express = require('express');
const router = express.Router();
const Promise = require("bluebird");
const getSqlConnection = require('./../common/connection');
const { updateAccessToken } = require( '../service/api/userService');


// router.get('/newlogin', (req, res) =>{
//   res.render('newlogin');
// });

router.get('/main', (req,res) =>{
  res.render('main');
});

router.get('/main2', (req,res) =>{
  res.render('main2');
});

router.get('/main2', (req,res) =>{
  res.render('main2');
});

router.get('/test', (req,res) =>{
  res.render('test');
});

router.get('/threeButton', (req,res) =>{
  res.render('threeButton');
});

router.get('/threeButton1', (req,res) =>{
  res.render('threeButton1');
});

router.get('/reportUser', (req,res) =>{
  res.render('reportUser');
});

router.get('/report', (req,res) =>{
  res.render('report');
});


router.get('/setTarget', (req,res) =>{
  res.render('set_target_page2');
});

router.get('/newcheckbox', (req, res) =>{
  res.render('newcheckbox');
});

router.get('/newfinal', (req,res) =>{
  res.render('newfinal');
});

router.get('/testmain', (req,res) =>{
  res.render('main');
});

router.get('/newlist', (req, res) =>{
  res.render('newlist');
});

module.exports = router;