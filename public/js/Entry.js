$(document).ready(function() {
  
  // 绑定表格查询：
  $('button.fn_showTab').click(function(event) {
    event.preventDefault();
    $(this).fn_showTab(1);
  });

  // 绑定excel导出：
  $('button.fn_showExc').click(function(event) {
    event.preventDefault();
    $(this).fn_showExc();
  });

  // 账户绑定界面：
  var form_bind = document.querySelector('form.fn_getBind');
  if (form_bind) {
    $('form.fn_getBind').fn_getBind();  // 获取账户绑定数据
  }
  
  // 账单查询和详情界面自动查询(先绑定后使用)：
  var form_det = document.querySelector('form.fn_details');
  var form_ind = document.querySelector('form.fn_quindex');
  if (form_det) {
    form_det.querySelector('button.fn_showTab').click();  // 自动查询账单详情
  }
  if (form_ind) {
    form_ind.querySelector('button.fn_showTab').click();  // 自动查询账单和用户信息（货站）
  }
  
  // 初始化Listbox：
  var showListBox = document.querySelector('#discountSetting'); // userInfo
  if (showListBox) {
    initListBox();
  }

  // 货站UserInfo界面Listbox提交按钮绑定：
  var listBoxSubmitButton = document.querySelector('#fn_discSettle');
  if (listBoxSubmitButton) {
    listBoxSubmitButton.addEventListener('click', function(event) {
      event.preventDefault();
      var listbox = new Listbox();
      var postData = listbox.postData_discountName();
      $(this).fn_discSettle(postData);
    });
  }

  // 初始化优惠: 设置页面选项卡
  if (document.querySelector('ul#discountType')) {
    initTabs();  
  }

  // 初始化优惠: 优惠查询页面：
  if (document.querySelector('form[name=station_getAllDiscountPolicy]')) {
    initDiscountPoliciesManagement();    
  }

  // 初始化优惠：政策名细页面：
  if (document.querySelector('input[data-pageId=discountPoliciesManagementDetails]')) {
    initDiscountPoliciesManagementDetails();
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
});

