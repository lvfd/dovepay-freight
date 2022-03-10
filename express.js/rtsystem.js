const express = require('express')
const router = express.Router()
const { urls } = require('./config')
const system = urls.system
const { authenticate } = require('./mws')

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
router.get(system.queryBills, (req, res) => {  // 账单信息
  let params = getParams(req, res)
  params.title = '账单信息'
  params.name = 'queryBills'
  res.render('frame', params)
})
router.get(system.queryBills_bill, (req, res) => { // 账单信息-查看账单
  let params = getParams(req, res)
  params.title = '账单信息'
  params.subTitle = '查看账单'
  params.name = 'queryBills_bill'
  params.tType = req.params.rule
  res.render('frame', params)
})
router.get(system.queryBills_details, (req, res) => {
  let params = getParams(req, res)
  params.title = '账单信息'
  params.subTitle = '查看账单'
  params.thirdTitle = '账单详情'
  params.rule = req.params.rule
  params.orderNo = req.params.orderNo
  params.name = 'queryBills_details'
  res.render('frame', params)
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

module.exports = router