const express = require('express')
const router = express.Router()
const { urls } = require('./config')
const station = urls.station
const { authenticate } = require('./mws')

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
  res.render('frame', params);
})
router.get(station.discountPoliciesManagementDetails, (req, res) => {
  const discountPolicyId = req.params.discountPolicyId;
  let params = getParams(req, res)
  params.title = '优惠政策详情'
  params.name = 'discountPoliciesManagementDetails'
  params.discountPolicyId = discountPolicyId
  res.render('frame', params);
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

module.exports = router