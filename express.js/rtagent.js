const express = require('express')
const router = express.Router()
const { urls } = require('./config')
const agent = urls.agent

// Authentication: 
router.all('/*', (req, res, next) => {
  let sess = req.session
  let haveUserId = !!sess.userId
  let haveAccountId = !!sess.accountId
  let haveNiceType = (sess.userType == 'agent')
  if (haveUserId && haveAccountId && haveNiceType) {
    next()
  } else { 
    console.log(`agent logout: ${req.session}`)
    res.redirect('../')
  }
})

// Routers: 
router.get(agent.accountBinding, (req, res) => {
  let params = getParams(req, res)
  params.title = '账户绑定'
  params.name = 'accountBinding'
  res.render('frame', params)
})
router.get(agent.billManagement, (req, res) => {
  const type = req.params.type
  let params = getParams(req, res)
  let title = ''
  if (type == '1')
    title = '国际直达'
  if (type == '2')
    title = '国内直达'
  if (type == '3')
    title = '中转'
  if (type == '4')
    title = '快件'
  params.pageUrl = getPageUrl(req, res)
  params.title = title
  params.tType = type
  params.name = 'billManagement'
  res.render('frame', params)
})
router.get(agent.billDetails, (req, res) => {
  const orderNo = req.params.orderNo
  let params = getParams(req, res)
  params.orderNo = orderNo
  params.title = '账单详情'
  params.name = 'billDetails'
  res.render('frame', params)
})

// Functions:
function getParams(req, res) {
  let sess = req.session
  let user = {
    id: sess.userId,
    type: sess.userType,
    accountId: sess.accountId
  }
  let params = {
    urls: urls,
    userId: user.id,
    accountId: user.accountId,
    type: user.type
  }
  return params
}
function getPageUrl(req, res) {
  const dove = req.app.path() // /dovepay-frieght
  const rout = req.baseUrl    // /dovepay-frieght/agent
  const requ = req.path       // /bill...
  let url = rout.slice(dove.length) + requ
  if (url.charAt(0) === '/')
    url = url.slice(1)
  return url
}

module.exports = router