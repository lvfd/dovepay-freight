module.exports = (req, res, next) => {
  const { urls } = require('../config')
  // Get post datas:
  if (!req.body) {
    return next(new Error('提交登录数据失败'))
  }
  let user = {
    id: req.body.userId,
    type: req.body.userType,
    accountId: req.body.accountId
  }
  // Set login conditions:
  let haveUserId = !!user.id
  let haveAccountId = !!user.accountId
  let haveNiceType = (user.type === 'station' || user.type ==='agent' || user.type ==='system')
  // Login action: 
  if (haveUserId && haveAccountId && haveNiceType) {
    // Create session: 
    if (req.session.station || req.session.agent || req.session.system) {
      req.session.reload(sessionHandler)
    } else {
      req.session.regenerate(sessionHandler)
    }
  } else {
    let msg = {
      type: user.type? user.type: 'none',
      msg: `登录数据不被接受, 原因: req.body = ${JSON.stringify(req.body)}`
    }
    return next(new Error(JSON.stringify(msg)))
  }
  
  function sessionHandler(err) {
    if (err) {
      return res.json({login_code: 500, login_msg: '登录失败', error: err})
    }
    // Set session: 
    const type = user.type
    let sess = req.session
    if ( type === 'station') {
      req.session.station = {
        userId: user.id,
        accountId: user.accountId,
        userType: user.type
      }
    }
    if ( type === 'agent') {
      req.session.agent = {
        userId: user.id,
        accountId: user.accountId,
        userType: user.type
      }
    }
    if ( type === 'system') {
      req.session.system = {
        userId: user.id,
        accountId: user.accountId,
        userType: user.type
      }
    }
    console.log('登录成功', 
      'Session.id: ' + req.session.id,
      'Session: ' + JSON.stringify(req.session))
    redirectPage()
  }
  function redirectPage() {
    if (user.type === "station") {
      res.redirect('../station' + urls.station.userInfo)
    } else if (user.type === "agent") {
      res.redirect('../agent' + urls.agent.accountBinding)
    } else if (user.type === "system") {
      res.redirect('../system' + urls.system.userInfoManagement)
    }
  }
}