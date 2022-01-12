module.exports = (req, res, next) => {
  const { urls, cookieConfig } = require('../config')
  if (!req.body) {
    return next(new Error('提交退出数据失败'))
  }
  const userType = req.body.userType
  if (userType !== 'station' && userType !== 'agent' && userType !== 'system') {
    return next(new Error('退出时userType无效'))
  }
  let sys = req.session.system? req.session.system: null
  let age = req.session.agent? req.session.agent: null
  let sta = req.session.station? req.session.station: null
  if (userType === 'station' && (sys || age)) {
    delete req.session.station
    res.send({
      code: '200',
      msg: 'success',
      data: {
        redirect: urls.login.user
      }
    })
  }
  else if (userType === 'agent' && (sta || sys)) {
    delete req.session.agent
    res.send({
      code: '200',
      msg: 'success',
      data: {
        redirect: urls.login.user
      }
    })
  }
  else if (userType === 'system' && (sta || age)) {
    delete req.session.system
    res.send({
      code: '200',
      msg: 'success',
      data: {
        redirect: urls.login.system
      }
    })
  } else {
    req.session.destroy(function(err) {
      if (err) {
        let msg = {
          type: userType,
          msg: `Session.destroy失败: 错误信息 = ${err}`
        }
        return next(new Error(JSON.stringify(msg)))
      }
      res.clearCookie(cookieConfig.name)
      if (userType === 'system') {
        res.send({
          code: '200',
          msg: 'success',
          data: {
            redirect: urls.login.system
          }
        })
      } else {
        res.send({
          code: '200',
          msg: 'success',
          data: {
            redirect: urls.login.user
          }
        })
      }
    })
  }
}