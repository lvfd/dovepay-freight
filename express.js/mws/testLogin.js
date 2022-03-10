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
    } else if (type === 'station') {
      userId = 'cfz2lxc5@126.com' // 货站用户
      pagefor = 'user'
      title = '货站用户'
    } else if (type === 'agent') {
      userId = 'cfz2lxc18@163.com' // 货代用户
      pagefor = 'user'
      title = '货代用户'
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