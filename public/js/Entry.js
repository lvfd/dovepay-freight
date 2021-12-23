$(document).ready(function() {
  try {
    EntryJS();
  } catch (error) {
    Glob_fn.errorHandler(error);
  }
});

function EntryJS() {

  // readonly禁用backspace:
  document.onkeydown = Glob_fn.banBackSpace;

  // Login page:
  if (document.querySelector('input[data-pageId=dovepay-freight_login]')) {
    initLogin_page();
  }

  // Init Main:
  if (document.getElementById('dpfMain')) {
    Glob_fn.initMain();
  }

  // Init navbar:
  if (document.getElementById('dpfNav')) {
    Glob_fn.initNav();
  }
  
  // Init header:
  if (document.getElementById('dpfHeader')) {
    Glob_fn.initQuirBtn();
  }

  // 初始化系统商：用户查询：
  if (document.querySelector('input[data-pageId=system_getAllConsumer]')) {
    initSystem_getAllConsumer();
  }
  // 初始化系统商：账单查询：
  if (document.querySelector('input[data-pageId=system_systemQueryBill]')) {
    initSystem_systemQueryBill();
  }
  // 初始化系统商：账单详情查询：
  if (document.querySelector('input[data-pageId=system_systemQueryBillDetails]')) {
    initSystem_systemQueryBillDetails();
  }
  // 初始化系统商：优惠政策管理：
  if (document.querySelector('input[data-pageId=system_getAllDiscountPolicy]')) {
    initSystem_getAllDiscountPolicy();
  }
  // 初始化系统商：优惠政策详情：
  if (document.querySelector('input[data-pageId=system_getDiscountPolicy]')) {
    initSystem_getDiscountPolicy();
  }

  // 初始化agent：查询账单：
  if (document.querySelector('input[data-pageId=consumer_consumerQueryBill]')) {
    initAgent_consumerQueryBill();
  }
  // 初始化agent：查询账单详情：
  if (document.querySelector('input[data-pageId=consumer_consumerQueryBillDetails]')) {
    initAgent_consumerQueryBillDetails();
  }
  // 初始化agent：绑定账户：
  if (document.querySelector('input[data-pageId=consumer_getBindConsumer]')) {
    initAgent_getBindConsumer();
  }

  // 初始化station：查询账单：
  if (document.querySelector('input[data-pageId=station_stationQueryBill]')) {
    initStation_stationQueryBill();
  }
  // 初始化station：查询账单详情：
  if (document.querySelector('input[data-pageId=station_stationQueryBillDetails]')) {
    initStation_stationQueryBillDetails();
  }
  // 初始化station：用户信息管理：
  if (document.querySelector('input[data-pageId=station_getStationAllConsumer]')) {
    initStation_getStationAllConsumer();
  }
  // 初始化station: 优惠政策管理：
  if (document.querySelector('input[data-pageId=station_getAllDiscountPolicy]')) {
    initStation_getAllDiscountPolicy();
  }
  // 初始化station:优惠: 设置页面选项卡
  if (document.querySelector('input[data-pageId=station_createDiscountPolicy]')) {
    initStation_initTabs();  
  }
  // 初始化station:优惠：政策名细页面：
  if (document.querySelector('input[data-pageId=discountPoliciesManagementDetails]')) {
    initStation_discountPoliciesManagementDetails();
  }

}

