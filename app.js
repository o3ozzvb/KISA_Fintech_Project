const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require('passport') //passport module add
  , LocalStrategy = require('passport-local').Strategy;
const cookieSession = require('cookie-session');
const flash = require('connect-flash');


const indexRouter = require('./app/routes/index');
const apiRouter = require('./app/routes/api');
const oAuthRouter = require('./app/routes/auth');
const sampleRouter = require('./app/routes/sample');

const app = express();

// ejs에서 layout 기반으로 작업하기 위해 추가
app.engine('ejs', require('ejs-locals'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport start

app.use(cookieSession({
  keys: ['node_fintech'],
  cookie: {
    maxAge: 1000 * 60 * 60 // 유효기간 1시간
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// passport end

app.use('/', indexRouter);
app.use('/auth', oAuthRouter);
app.use('/api', apiRouter);
app.use('/sample', sampleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(err);
});

module.exports = app;


//