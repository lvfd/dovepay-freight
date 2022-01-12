module.exports = (type) => {
  return (req, res, next) => {
    const { urls } = require('../config')
    if (!type) {
      return next(new Error('authenticate函数缺少type参数')) // handle error
    }
    let backUrl = ''
    if (type === 'system') {
      backUrl = urls.login.system
    } else {
      backUrl = urls.login.user
    }
    const userSess = req.session[type]
    if (!userSess) {
      res.status(500)
      res.render('error', {
        type: type,
        msg: '已退出, 请重新登录',
        urls: urls
      })
    } else {
      let haveUserId = !!userSess.userId
      let haveAccountId = !!userSess.accountId
      let haveNiceType = (userSess.userType === type)
      if (haveUserId && haveAccountId && haveNiceType) {
        next()
      } else { 
        let msg = {
          type: type,
          msg: `参数错误, 错误原因: ${JSON.stringify(req.session)}`
        }
        return next(new Error(JSON.stringify(msg)))
      }
    }
  }
}