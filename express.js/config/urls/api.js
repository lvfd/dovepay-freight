// const baseAPIUrl = 'http://10.1.51.51:8080/dovepay-freight-server/api/v1'  // 贺宁
// const baseAPIUrl = 'http://10.1.51.40:8080/dovepay-freight-server/api/v1' // 薛志远
const baseAPIUrl = 'https://test.dovepay.com/dovepay-freight-server/api/v1'  // 测试
const api = {
  consumer: {
    consumerQueryBill: baseAPIUrl + '/consumer/consumerQueryBill',
    consumerBillExcel: baseAPIUrl + '/consumer/consumerBillExcel',
    consumerQueryBillDetails: baseAPIUrl + '/consumer/consumerQueryBillDetails',
    consumerBillDetailsExcel: baseAPIUrl + '/consumer/consumerBillDetailsExcel',
    getBindConsumer: baseAPIUrl + '/consumer/getBindConsumer',
    bindConsumer: baseAPIUrl + '/consumer/bindConsumer'
  },
  station: {
    stationQueryBill: baseAPIUrl + '/station/stationQueryBill',
    stationBillExcel: baseAPIUrl + '/station/stationBillExcel',
    stationQueryBillDetails: baseAPIUrl + '/station/stationQueryBillDetails',
    stationBillDetailsExcel: baseAPIUrl + '/station/stationBillDetailsExcel',
    stationFeeUpdate: baseAPIUrl + '/station/stationFeeUpdate',
    stationBillPush: baseAPIUrl + '/station/stationBillPush',
    getStationAllConsumer: baseAPIUrl + '/station/getStationAllConsumer',
    exportStationAllConsumer: baseAPIUrl + '/station/exportStationAllConsumer',
    queryDiscountCustomer: baseAPIUrl + '/station/queryDiscountCustomer',
    queryDiscountPolicy: baseAPIUrl + '/station/queryDiscountPolicy',
    changeCustomerDiscountStatus: baseAPIUrl + '/station/changeCustomerDiscountStatus',
    addDiscountCustomer: baseAPIUrl + '/station/addDiscountCustomer',
    createDiscountPolicy: baseAPIUrl + '/station/createDiscountPolicy',
    getAllDiscountPolicy: baseAPIUrl + '/station/getAllDiscountPolicy',
    getDiscountPolicy: baseAPIUrl + '/station/getDiscountPolicy',
    changeDiscountStatus: baseAPIUrl + '/station/changeDiscountStatus',
    createBillRule: baseAPIUrl + '/station/createBillRule', // 新建账单规则接口
    queryBillRuleByPage: baseAPIUrl + '/station/queryBillRuleByPage', // 分页查询账单规则接口
    removeBillRule: baseAPIUrl + '/station/removeBillRule', // 删除账单规则接口
    queryEffectiveBillRule: baseAPIUrl + '/station/queryEffectiveBillRule', // 已生效账单规则接口
    stationQueryOriginalWaybill: baseAPIUrl + '/station/stationQueryOriginalWaybill', // 货站基础数据查询接口（天信达推送的运单）
    stationOriginalWaybillExcel: baseAPIUrl + '/station/stationOriginalWaybillExcel', // 货站基础数据导出接口
    stationQuerySumBillByRule: baseAPIUrl + '/station/stationQuerySumBillByRule', // 货站账单汇总查询接口
    queryModifyLog: baseAPIUrl + '/station/queryModifyLog', // 查询运单的修改记录接口
    stationQueryBillDetailsSum: baseAPIUrl + '/station/stationQueryBillDetailsSum',// 货站查看明细汇总接口
    /* 数据统计接口 */
    stationQueryBillSummary: baseAPIUrl + '/station/stationQueryBillSummary', // 货站数据统计接口
    stationQueryBillSummaryExcel: baseAPIUrl + '/station/stationQueryBillSummaryExcel', // 货站数据统计导出接口
    stationQueryBillSummaryDetails: baseAPIUrl + '/station/stationQueryBillSummaryDetails', // 货站数据统计详情接口
    stationQueryBillSummaryDetailsExcel: baseAPIUrl + '/station/stationQueryBillSummaryDetailsExcel', // 货站数据统计详情导出接口
  },
  system: {
    systemQueryBill: baseAPIUrl + '/system/systemQueryBill',
    systemBillExcel: baseAPIUrl + '/system/systemBillExcel',
    systemQueryBillDetails: baseAPIUrl + '/system/systemQueryBillDetails',
    systemBillDetailsExcel: baseAPIUrl + '/system/systemBillDetailsExcel',
    getAllConsumer: baseAPIUrl + '/system/getAllConsumer',
    exportStationAllConsumer: baseAPIUrl + '/system/exportStationAllConsumer',
    getAllDiscountPolicy: baseAPIUrl + '/system/getAllDiscountPolicy',
    queryDiscountCustomer: baseAPIUrl + '/system/queryDiscountCustomer',
    getDiscountPolicy: baseAPIUrl + '/system/getDiscountPolicy',
    systemQuerySumBillByRule: baseAPIUrl + '/system/systemQuerySumBillByRule',
    systemQueryBillDetailsSum: baseAPIUrl + '/system/systemQueryBillDetailsSum',
    systemQueryOriginalWaybill: baseAPIUrl + '/system/systemQueryOriginalWaybill',
  },
  pay: {
    pay: baseAPIUrl + '/pay/pay'
  },
  dict: baseAPIUrl + '/dict',
  queryFeeItem: baseAPIUrl + '/queryFeeItem',
  role: baseAPIUrl + '/role',
  queryCargo: baseAPIUrl + '/queryCargo',
  queryFeeItemRemove: baseAPIUrl + '/queryFeeItemRemove',
  queryModifyLog: baseAPIUrl + '/queryModifyLog',
  getAllSupplier: baseAPIUrl + '/getAllSupplier',
}
module.exports = {
  api
}