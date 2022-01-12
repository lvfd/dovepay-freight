function logErrors(err, req, res, next) {
  console.error(err.stack)
  next(err)
}
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}
function errorHandler(err, req, res, next) {
  res.status(500)
  const {urls} = require('./config')
  let type = '', msg = ''
  try {
    // JSON 错误
    let errObj = JSON.parse(err.message)
    type = errObj.type? errObj.type: 'no type'
    msg = errObj.msg? errObj.msg: 'no msg'
  } catch(e) {
    // 普通错误
    type = req.get('type')? req.get('type'): 'no req:type'
    msg = err.message? err.message: 'no err:msg'
  }
  res.render('error', { type: type, msg: msg, urls: urls })
}
module.exports = {
  logErrors, clientErrorHandler, errorHandler
}