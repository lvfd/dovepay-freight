module.exports = (type) => {
  return (req, res, next) => {
    const env = req.app.get('env')
    const { urls } = require('../config')
    // console.log(env)
    if ( env === 'production' ) {
      if (type === 'system') {
        return res.redirect(urls.dovemgr)
      } else {
        return res.redirect(urls.dovepay)
      }
    }
    let pagefor, title
    if (type === 'system') {
      userId = 'sys'
      pagefor = 'system'
      title = '系统商参数'
    } else {
      userId = 'cfz2lxc5@126.com'
      pagefor = 'user'
      title = '用户参数'
    }
    const params = {
      userId: userId,
      urls: urls,
      pagefor: pagefor,
      title: title
    }
    res.render('demoindex', params)
  }
}