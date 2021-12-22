const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const { urls } = require('./config')

router.post('/login', urlencodedParser, (req, res) => {
  // Get post datas:
  let user = {
    id: req.body.userId,
    type: req.body.userType,
    accountId: req.body.accountId
  }
  // Set login conditions:
  let haveUserId = !!user.id
  let haveAccountId = !!user.accountId
  let haveNiceType = (user.type == 'station' || 'agent' || 'system')
  // Login action: 
  if (haveUserId && haveAccountId && haveNiceType) {
    // Create session: 
    req.session.regenerate(function(err) {
      if (err) {
        return res.json({login_code: 500, login_msg: '登录失败', error: err})
      }
      // Set session: 
      req.session.userId = user.id
      req.session.userType = user.type
      req.session.accountId = user.accountId
      // Set cookie
      // login() ==> redirect each page:
      console.log('登录成功', 
        'Session.id: ' + req.session.id,
        'Session: ' + JSON.stringify(req.session))
      login()
    });
  } else {
    // show error page
    res.json({login_code: 401, login_msg: '用户不允许进入'})
    // redirect login page
  }
  function login() {
    if (user.type == "station") {
      res.redirect('../station' + urls.station.userInfo)
    } else if (user.type == "agent") {
      res.redirect('../agent' + urls.agent.accountBinding)
    } else if (user.type == "system") {
      res.redirect('../system' + urls.system.userInfoManagement)
    }
  }
})
router.get('/logout', (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      res.json({login_code: 500, login_msg: '退出失败', error: err})
      return
    }
    res.clearCookie('dovepay.connect.sid')
    res.redirect('../')
  })
})

module.exports = router