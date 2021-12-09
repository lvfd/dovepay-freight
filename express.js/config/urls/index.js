const { api } = require('./api')
const urls = {
  index: '/',
  log: {
    login: '/dovepay-freight/log/login',
    logout: '/dovepay-freight/log/logout'
  },
  station: {
    index: '/dovepay-freight/station',
    userInfo: '/userManagement/userInfo',
    discountPoliciesManagement: '/userManagement/discountPoliciesManagement',
    discountPoliciesManagementDetails: '/userManagement/discountPoliciesManagement/details/:discountPolicyId',
    discountPolicies: '/userManagement/discountPolicies',
    discountPolicies1: '/userManagement/discountPolicies/1',
    discountPolicies2: '/userManagement/discountPolicies/2',
    discountPolicies3: '/userManagement/discountPolicies/3',
    billManagement: '/billManagement/:type',
    internationalBills: '/billManagement/1',
    domesticBills: '/billManagement/2',
    transferBills: '/billManagement/3',
    billDetails: '/billManagement/billDetails/:orderNo/:modify'
  },
  agent: {
    index: '/dovepay-freight/agent',
    accountBinding: '/accountBinding',
    billManagement: '/billManagement/:type',
    internationalBills: '/billManagement/1',
    domesticBills: '/billManagement/2',
    transferBills: '/billManagement/3',
    billDetails: '/billManagement/billDetails/:orderNo'
  },
  system: {
    index: '/dovepay-freight/system',
    userInfoManagement: '/userInfoManagement',
    billsManagement: '/billsManagement',
    billDetails: '/billsManagement/:orderNo',
    policiesManagement: '/policiesManagement',
    policiesDetails: '/policiesManagement/:discountPolicyId'
  },
  api: api
}
module.exports = urls