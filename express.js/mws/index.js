module.exports = {
  initSession: require('./initSession'),
  checkRedisConnect: function(req, res, next) {
    if (!req.session) {
      return next(new Error('无法获取Session对象')) // handle error
    }
    next() // otherwise continue
  },
  authenticate: require('./authenticate'),
  testLogin: require('./testLogin'),
  responseDovepay: require('./responseDovepay'),
  login: require('./login'),
  logout: require('./logout')
}