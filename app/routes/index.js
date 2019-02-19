const express = require('express');
const router = express.Router();
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const Promise = require("bluebird");
const getSqlConnection = require('./../common/connection');
const isAuthenticated = require('../common/isAuthenticated');

//로그인 성공시 사용자 정보를 Session에 저장
passport.serializeUser(function (user, done) {
  done(null, user)
});

//인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽음
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// 첫페이지
router.get('/', function (req, res, next) {
  console.log(req.user);
  res.render('login');
});

//로그인 페이지
router.get('/login', function (req, res) {
  if (req.user !== undefined) {
    res.redirect('/')
  } else {
    res.render('login', {
      title: 'login'
    })
  }
});

//로그인요청 처리
router.post('/login',
  passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), // 인증 실패 시 401 리턴, {} -> 인증 스트레티지
  (req, res) => res.redirect('/api/main')
);

//로그아웃
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

//사용자 정보조회 예제
router.get('/myinfo', isAuthenticated, function (req, res) {
  res.send(req.user)
  // res.render('myinfo', {
  //   title: 'My Info',
  //   user_info: req.user
  // })
});


//회원가입 페이지 호출
router.get("/signup", (req, res, next) => {
  res.render('signup')
});

//회원가입
router.post("/signup",
  (req, res, next) => {
    console.log(req.body);
    res.send('welcome')
  });


// 로그인 요청처리시 DB에서 사용자를 조회 패스워드 일치여부확인 후 인증 완료 처리
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, username, password, done) {

  Promise.using(getSqlConnection(),
    (connection) => {
      return connection.query('SELECT * FROM `user` WHERE `user_id` = ?', username)
        .then((result) => {
          if (result.length === 0) {
            console.log('해당 유저가 없습니다');
            return done(false, null);
          } else {
            //TODO 단방향 패스워드 암호화 적용 필요.
            // if (!bcrypt.compareSync(password, result[0].password)) {
            if (password !== result[0].user_password) {
              console.log(result);
              console.log(password, result[0].user_password);
              console.log('패스워드가 일치하지 않습니다');
              return done(false, null);
            } else {
              console.log('로그인 성공');
              return done(null, {
                user_id: result[0].user_id,
              });
            }
          }
        })
        .catch(function (error) {
          return done(false, null);
          console.log(error);
        });
    });

  // pool.getConnection(function (err, connection) {
  //   connection.query('select * from `user` where `user_id` = ?', username, function (err, result) {
  //     if (err) {
  //       console.log('err :' + err);
  //       return done(false, null);
  //     } else {
  //       if (result.length === 0) {
  //         console.log('해당 유저가 없습니다');
  //         return done(false, null);
  //       } else {
  //         // if (!bcrypt.compareSync(password, result[0].password)) {
  //         if (password !== result[0].user_password) {
  //           console.log(result);
  //           console.log(password, result[0].user_password);
  //           console.log('패스워드가 일치하지 않습니다');
  //           return done(false, null);
  //         } else {
  //           console.log('로그인 성공');
  //           return done(null, {
  //             user_id: result[0].user_id,
  //             nickname: result[0].accessToken
  //           });
  //         }
  //       }
  //     }
  //   })
  // });
}));

module.exports = router;
