const { api } = require('./api')
const urls = {
  login: {
    // user: 'http://localhost:3001/dovepay-freight',
    // system: 'http://localhost:3001/dovepay-freight/mgr'
    // user: 'https://test.dovepay.com/dovepay-freight/',
    // system: 'https://test.dovepay.com/dovepay-freight/mgr'
    user: 'https://test.dovepay.com',
    system: 'https://test.dovepay.com:8443/doveMgr/'
    // user: 'https://www.dovepay.com',
    // system: 'https://www.dovepay.com:8443/doveMgr/'
  },
  dovepay: 'https://www.dovepay.com',
  dovemgr: 'https://www.dovepay.com:8443/doveMgr/',
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
    // 新需求替换路由:
      billManagement: '/billManagement/:type',
      internationalBills: '/billManagement/1',
      domesticBills: '/billManagement/2',
      transferBills: '/billManagement/3',
      expressBills: '/billManagement/4',
      billDetails: '/billManagement/billDetails/:orderNo/:modify',
    // 新需求新增路由:
    billsSetting: '/billsSetting',  // 账单设置
    billsSetting_addRule: '/billsSetting/addRule',  // 新增账单规则
    baseData: '/baseData',  // 基础数据
    queryBills: '/queryBills',  // 账单信息
    queryBills_bill: '/queryBills/:rule',  // 账单信息-查看账单
    queryBills_details: '/queryBills/:rule/:orderNo', // 账单信息-查看账单-查看详情
    /* 220908 数据统计路由 */
    dataStatistic: '/dataStatistic',  /* Init Page */
    dataStatisticDetails: '/dataStatistic/details',
  },
  agent: {
    index: '/dovepay-freight/agent',
    accountBinding: '/accountBinding',
    // 新需求替换路由:
      billManagement: '/billManagement/:type',
      internationalBills: '/billManagement/1',
      domesticBills: '/billManagement/2',
      transferBills: '/billManagement/3',
      expressBills: '/billManagement/4',
      billDetails: '/billManagement/billDetails/:orderNo',
    // 新需求新增路由:
    queryBills: '/queryBills',  // 账单信息
    queryDetails: '/queryBills/:orderNo',  // 账单详情
  },
  system: {
    index: '/dovepay-freight/system',
    userInfoManagement: '/userInfoManagement',
    // 新需求替换路由:
      billManagement: '/billManagement/:type',
      internationalBills: '/billManagement/1',
      domesticBills: '/billManagement/2',
      transferBills: '/billManagement/3',
      expressBills: '/billManagement/4',
      billDetails: '/billManagement/billDetails/:orderNo',
    policiesManagement: '/policiesManagement',
    policiesDetails: '/policiesManagement/:discountPolicyId',
    // 新需求新增路由:
    baseData: '/baseData',  // 基础数据
    queryBills: '/queryBills',  // 账单信息
    queryBills_bill: '/queryBills/:rule',  // 账单信息-查看账单
    queryBills_details: '/queryBills/:rule/:orderNo', // 账单信息-查看账单-查看详情
    /* 220908 数据统计路由 */
    dataStatistic: '/dataStatistic',  /* Init Page */
    dataStatisticDetails: '/dataStatistic/details',
  },
  api: api
}
module.exports = urls