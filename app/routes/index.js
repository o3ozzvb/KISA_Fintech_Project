const express = require('express');
const router = express.Router();
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const getSqlConnection = require('./../common/connection');
const isAuthenticated = require('../common/isAuthenticated');


/*로그인 성공시 사용자 정보를 Session에 저장한다*/
passport.serializeUser(function (user, done) {
  done(null, user)
});

/*인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.*/
passport.deserializeUser(function (user, done) {
  done(null, user);
});

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.user);
  res.render('index', {
    title: 'Express'
  });
});

router.get('/login', function (req, res) {
  if (req.user !== undefined) {
    res.redirect('/')
  } else {
    res.render('login', {
      title: 'login'
    })
  }
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), // 인증 실패 시 401 리턴, {} -> 인증 스트레티지
  function (req, res) {
    res.redirect('/home');
  }
);

/*Log out*/
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


router.get('/home', function (req, res) {
  res.send("home");
});

router.get('/myinfo', isAuthenticated, function (req, res) {
  res.send(req.user)
  // res.render('myinfo', {
  //   title: 'My Info',
  //   user_info: req.user
  // })
});




passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
}, function (req, username, password, done) {

  Promise.using(getSqlConnection(),
    (connection) => {
      return connection.query('SELECT * FROM `user` WHERE `user_id` = ?', username)
        .then((err, result) => {
          if (err) {
            console.log('err :' + err);
            return done(false, null);
          } else {
            if (result.length === 0) {
              console.log('해당 유저가 없습니다');
              return done(false, null);
            } else {
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
                  // accessToken: result[0].accessToken
                });
              }
            }
          }
        })
        .catch(function (error) {
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
