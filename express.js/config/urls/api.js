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
    stationBillDetailsExcel: baseAPIUrl + 'station/stationBillDetailsExcel',
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
    changeDiscountStatus: baseAPIUrl + '/station/changeDiscountStatus'
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
    getDiscountPolicy: baseAPIUrl + '/system/getDiscountPolicy'
  },
  pay: {
    pay: baseAPIUrl + '/pay/pay'
  },
  dict: baseAPIUrl + '/dict',
  queryFeeItem: baseAPIUrl + '/queryFeeItem',
  role: baseAPIUrl + '/role',
  queryCargo: baseAPIUrl + '/queryCargo',
  queryFeeItemRemove: baseAPIUrl + '/queryFeeItemRemove',
  getAllSupplier: baseAPIUrl + '/getAllSupplier'
}
module.exports = {
  api
}