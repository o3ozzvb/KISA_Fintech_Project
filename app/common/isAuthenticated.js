/*로그인 유저 판단 로직*/
const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
};

module.exports = isAuthenticated