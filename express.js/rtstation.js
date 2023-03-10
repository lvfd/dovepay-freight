const express = require('express')
const router = express.Router()
const { urls } = require('./config')
const station = urls.station
const { authenticate } = require('./mws')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Authentication: 
router.use(authenticate('station'))

// Routers:
router.get(station.userInfo, (req, res) => {
  let params = getParams(req, res)
  params.title = '用户信息管理'
  params.name = 'userInfo'
  res.render('frame', params)
})
router.get(station. discountPoliciesManagement, (req, res) => {
  let params = getParams(req, res)
  params.title = '优惠政策管理'
  params.name = 'discountPoliciesManagement'
  res.render('frame', params)
})
router.get(station.discountPoliciesManagementDetails, (req, res) => {
  const discountPolicyId = req.params.discountPolicyId;
  let params = getParams(req, res)
  params.title = '优惠政策详情'
  params.name = 'discountPoliciesManagementDetails'
  params.discountPolicyId = discountPolicyId
  res.render('frame', params)
})
router.get(station.discountPolicies, (req, res) => {
  let params = getParams(req, res)
  params.title = '优惠政策添加'
  params.name = 'discountPolicies'
  res.render('frame', params)
})
router.get(station.discountPolicies1, (req, res) => {
  res.render('components/station/userManagement/withAirlines')
})
router.get(station.discountPolicies2, (req, res) => {
  res.render('components/station/userManagement/withAirdots')
})
router.get(station.discountPolicies3, (req, res) => {
  res.render('components/station/userManagement/normal')
})
// 替换路由:
    router.get(station.billManagement, (req, res) => {
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
    router.get(station.billDetails, (req, res) => {
      const orderNo = req.params.orderNo
      const modify = req.params.modify
      let params = getParams(req, res)
      params.orderNo = orderNo
      params.modify = modify
      params.title = '账单详情'
      params.name = 'billDetails'
      res.render('frame', params)
    })

// 新增路由:
router.get(station.billsSetting, (req, res) => {  // 账单设置
  let params = getParams(req, res)
  params.title = '账单规则查询'
  params.name = 'billsSetting'
  res.render('frame', params)
})
router.get(station.billsSetting_addRule, (req, res) => {  // 新增账单规则
  let params = getParams(req, res)
  params.title = '账单规则查询'
  params.subTitle = '新增账单规则'
  params.name = 'billsSetting_addRule'
  res.render('frame', params)
})
router.get(station.baseData, (req, res) => {  // 基础数据
  let params = getParams(req, res)
  params.title = '基础数据'
  params.name = 'baseData'
  res.render('frame', params)
})
router.all(station.queryBills, urlencodedParser, (req, res) => {  // 账单信息
  let params = getParams(req, res)
  setOrderTime(req, params)
  params.title = '账单信息'
  params.name = 'queryBills'
  res.render('frame', params)
})
router.get(station.queryBills + '/*', (req, res) => {   // GET访问信息二三级界面会跳转
  res.redirect(station.index + station.queryBills)
})
router.post(station.queryBills_bill, urlencodedParser, (req, res) => {  // 账单信息-查看账单POST账期
  let params = getParams(req, res)
  setOrderTime(req, params)
  params.title = '账单信息'
  params.subTitle = '查看账单'
  params.name = 'queryBills_bill'
  params.tType = req.params.rule
  res.render('frame', params)
})
router.post(station.queryBills_details, urlencodedParser, (req, res) => { // 账单信息-查看账单-详情POST账期&能否修改
  let params = getParams(req, res)
  setOrderTime(req, params)
  params.modify = req.body.modify
  params.title = '账单信息'
  params.subTitle = '查看账单'
  params.thirdTitle = '账单详情'
  params.rule = req.params.rule
  params.orderNo = req.params.orderNo
  params.name = 'queryBills_details'
  res.render('frame', params)
})
router.get(station.dataStatistic, (req, res) => {
  let params = getParams(req, res)
  params.title = '数据统计'
  params.name = 'dataStatistic'
  res.render('frame', params)
})
router.post(station.dataStatisticDetails, urlencodedParser, (req, res) => {
  let params = getParams(req, res)
  params.title = '数据统计'
  params.subTitle = '详情'
  params.name = 'dataStatisticDetails'
  if (req.body) {
    for (let prop in req.body) {
      if (prop === 'accountId') {
        params.agentAccountId = req.body[prop]
        continue
      }
      params[prop] = req.body[prop]
    }
  }
  res.render('frame', params)
})

// Functions:
function getParams(req, res, description) {
  const sess = req.session
  let user = {
    id: sess.station.userId,
    type: sess.station.userType,
    accountId: sess.station.accountId
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