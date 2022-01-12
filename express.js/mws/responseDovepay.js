module.exports = (type) => {
  return (req, res, next) => {
    const Jssm4 = require('jssm4')
    const { sm4keys, urls } = require('../config')
    const keys = sm4keys.test
    // const keys = sm4keys.prod
    if (!type) {
      let msg = {
        type: type,
        msg: 'responseDovepay函数缺少type参数'
      }
      return next(new Error(JSON.stringify(msg))) // handle error
    }
    const key = keys[`freight_${type}`]
    if (!key) {
      let msg = {
        type: type,
        msg: 'responseDovepay函数不能定义key'
      }
      return next(new Error(JSON.stringify(msg)))
    }
    const sm4 = new Jssm4(key)
    let userId_raw = ''
    let userId = ''
    try {
      userId_raw = req.body.userid
      userId = sm4.decryptData_ECB(userId_raw)
    } catch (error) {
      let msg = {
        type: type,
        msg: `无法解析userid, error: ${error}`
      }
      return next(new Error(JSON.stringify(msg)))
    }
    if (!userId) {
      let msg = {
        type: type,
        msg: `userid不合法, userid = ${userId}`
      }
      return next(new Error(JSON.stringify(msg)))
    }
    let pagefor = '', title = ''
    if (type === 'system') {
      pagefor = 'system'
      title = '系统商参数'
    } else {
      pagefor = 'user'
      title = '用户参数'
    }
    let params = {
      userId: userId,
      urls: urls,
      pagefor: pagefor,
      title: title
    }
    res.render('demoindex', params)
  }
}