const express = require('express')
const router = express.Router()
const { urls } = require('./config')
const system = urls.system
const { authenticate } = require('./mws')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Authentication: 
router.use(authenticate('system'))

// Routers: 
router.get(system.userInfoManagement, (req, res) => {
  let params = getParams(req, res)
  params.title = '用户信息管理'
  params.name = 'userInfoManagement'
  res.render('frame', params)
})
router.get(system.policiesManagement, (req, res) => {
  let params = getParams(req, res)
  params.title = '优惠政策管理'
  params.name = 'policiesManagement'
  res.render('frame', params)
})
router.get(system.policiesDetails, (req, res) => {
  const discountPolicyId = req.params.discountPolicyId
  let params = getParams(req, res)
  params.title = '优惠政策详情'
  params.name = 'policyDetails'
  params.discountPolicyId = discountPolicyId
  res.render('frame', params)
})
// 替换路由:
    router.get(system.billManagement, (req, res) => {
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
      params.title = title
      params.tType = type
      params.name = 'billManagement'
      res.render('frame', params)
    })
    router.get(system.billDetails, (req, res) => {
      const orderNo = req.params.orderNo
      let params = getParams(req, res)
      params.title = '账单详情'
      params.name = 'billDetails'
      params.orderNo = orderNo
      res.render('frame', params)
    })
// 新增路由:
router.get(system.baseData, (req, res) => {  // 基础数据
  let params = getParams(req, res)
  params.title = '基础数据'
  params.name = 'baseData'
  res.render('frame', params)
})
router.all(system.queryBills, urlencodedParser, (req, res) => {  // 账单信息
  let params = getParams(req, res)
  setOrderTime(req, params)
  params.title = '账单信息'
  params.name = 'queryBills'
  res.render('frame', params)
})
router.get(system.queryBills + '/*', (req, res) => {   // GET访问信息二三级界面会跳转
  res.redirect(system.index + system.queryBills)
})
router.post(system.queryBills_bill, urlencodedParser, (req, res) => {  // 账单信息-查看账单POST账期
  let params = getParams(req, res)
  setOrderTime(req, params)
  params.title = '账单信息'
  params.subTitle = '查看账单'
  params.name = 'queryBills_bill'
  params.tType = req.params.rule
  res.render('frame', params)
})
router.post(system.queryBills_details, urlencodedParser, (req, res) => { // 账单信息-查看账单-详情POST账期&能否修改
  let params = getParams(req, res)
  setOrderTime(req, params)
  params.title = '账单信息'
  params.subTitle = '查看账单'
  params.thirdTitle = '账单详情'
  params.rule = req.params.rule
  params.orderNo = req.params.orderNo
  params.name = 'queryBills_details'
  res.render('frame', params)
})
router.get(system.dataStatistic, (req, res) => {
  let params = getParams(req, res)
  params.title = '数据统计'
  params.name = 'dataStatistic'
  // res.render('frame', params)
  res.send('此功能待开发')
})
router.get(system.dataStatisticDetails, (req, res) => {
  let params = getParams(req, res)
  params.title = '数据统计'
  params.subTitle = '详情'
  params.name = 'dataStatisticDetails'
  // res.render('frame', params)
  res.send('此功能待开发')
})


// Functions: 
function getParams(req, res) {
  const sess = req.session
  let user = {
    id: sess.system.userId,
    type: sess.system.userType,
    accountId: sess.system.accountId
  }
  let params = {
    urls: urls,
    userId: user.id,
    accountId: user.accountId,
    type: user.type
  }
  return params
}
function setOrderTime(req, params) {
  params.orderTimeStart = ''
  params.orderTimeEnd = ''
  if (!req.body) return params
  params.orderTimeStart = req.body.orderTimeStart
  params.orderTimeEnd = req.body.orderTimeEnd
  return params
}

module.exports = router