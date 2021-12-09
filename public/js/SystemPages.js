function initSystem_getAllConsumer() {
  // bind submit button:
  var submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    var $this = $(this);
    var url = document.querySelector('input[name=api_getAllConsumer]').value;
    var postData = $this.closest('form').serializeObject();
    postData.pageNumber = '1';
    postData.pageSize = '10';
    $(this).fn_sys_getAllConsumer(url, postData);
  });
  submitBtn.click();

  // bind export button:
  var expoBtn = document.getElementById('exportBtn');
  expoBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var $this = $(this);
    var url = document.querySelector('input[name=api_exportStationAllConsumer]').value;
    var postData = $this.closest('form').serializeObject();
    $(this).fn_sys_exportExcel(url, postData);
  });
}
function initSystem_systemQueryBill() {
  // bind submit button:
  var submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    var $this = $(this);
    var url = document.querySelector('input[name=api_systemQueryBill]').value;
    var postData = $this.closest('form').serializeObject();
    postData.indexPage = '1';
    postData.countPage = '10';
    $(this).fn_sys_systemQueryBill(url, postData);
  });
  submitBtn.click();

  // bind export button:
  var expoBtn = document.getElementById('exportBtn');
  expoBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var $this = $(this);
    var url = document.querySelector('input[name=api_systemBillExcel]').value;
    var postData = $this.closest('form').serializeObject();
    $(this).fn_sys_exportExcel(url, postData);
  });
}
function initSystem_systemQueryBillDetails() {
  // bind submit button:
  var submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    var $this = $(this);
    var url = document.querySelector('input[name=api_systemQueryBillDetails]').value;
    var postData = $this.closest('form').serializeObject();
    postData.indexPage = '1';
    postData.countPage = '10';
    $(this).fn_sys_systemQueryBillDetails(url, postData);
  });
  submitBtn.click();

  // bind export button:
  var expoBtn = document.getElementById('exportBtn');
  expoBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var $this = $(this);
    var url = document.querySelector('input[name=api_systemBillDetailsExcel]').value;
    var postData = $this.closest('form').serializeObject();
    $(this).fn_sys_exportExcel(url, postData);
  });
}
function initSystem_getAllDiscountPolicy() {
  var api_getAllSupplier_url = document.querySelector('input[name=api_getAllSupplier]').value;
  fn_queryDict('DISCOUNT_TYPE', function(res){
    // console.log(res)
    // distill select:
    var sel = document.getElementById('discountType');
    Glob_fn.initDiscoutTypeSel(res.data, sel);
    $.ajax({
      url: api_getAllSupplier_url,
      success: function(res) {
        // distill supplier:
        var data = res.data;
        var sel = document.getElementById('supplierId');
        Glob_fn.initSupplierSel(data, sel);
        // bind submit button:
        var submitBtn = document.getElementById('submitBtn');
        submitBtn.addEventListener('click', function(event){
          event.preventDefault();
          var $this = $(this);
          var url = document.querySelector('input[name=api_getAllDiscountPolicy]').value;
          var postData = $this.closest('form').serializeObject();
          postData.pageNumber = '1';
          postData.pageSize = '10';
          $(this).fn_sys_getAllDiscountPolicy(url, postData);
        });
        submitBtn.click();
      }
    });
  }); 
}
function initSystem_getDiscountPolicy() {
  var discountPolicyId = document.querySelector('input[name=discountPolicyId]').value;
  var url = document.querySelector('input[name=api_getDiscountPolicy]').value;
  var data = {
    discountPolicyId: discountPolicyId
  };
  $.ajax({
    url: url,
    data: JSON.stringify(data),
    success: function(res) {
      if (checkRes(res) === false) return;
      console.log(res);
      try {
        var data = res.data;
        if (data.length < 1) {
          UIkit.modal.alert('无数据');
        }
        Glob_fn.initDiscountDetails(data);
      } catch (error) {
        alert(error);
      }
    }
  });
  // 绑定返回button
  document.getElementById('btnBack').addEventListener('click', function(event){
    event.preventDefault();
    var url = document.querySelector('input[name=url_back]').value
    window.location.href = url;
  });
}

function Sys_table(){}
Sys_table.prototype.getTable_userInfo = function(res, pageNumber, pageSize) {
  var table = document.querySelector('#dataTable');

  var thead = table.querySelector('thead');
  thead.innerHTML = '';
  var trInThead = document.createElement('tr');
  thead.appendChild(trInThead);
  Sys_table.setTh(trInThead, '序号');
  Sys_table.setTh(trInThead, '客户代码');
  Sys_table.setTh(trInThead, '货运公司全称');
  Sys_table.setTh(trInThead, '状态');
  Sys_table.setTh(trInThead, '用户状态');
  Sys_table.setTh(trInThead, '结算方式');
  Sys_table.setTh(trInThead, '操作');

  var tbody = table.querySelector('tbody');
  tbody.innerHTML = '';
  var data = res.data.consumerList;

  if (data.length < 1) {
    var tr0 = Glob_fn.Table.showNoData(7);
    tbody.appendChild(tr0);
  }

  for (var i = 0; i < data.length; i++) {
    var tr = document.createElement('tr');
    
    var tdSerial = document.createElement('td');
    tr.appendChild(tdSerial);
    tdSerial.innerText = i + 1 + (Number(pageNumber) - 1) * Number(pageSize);

    var td1 = document.createElement('td');
    tr.appendChild(td1);
    var td2 = document.createElement('td');
    tr.appendChild(td2);
    var td3 = document.createElement('td');
    tr.appendChild(td3);
    var td4 = document.createElement('td');
    tr.appendChild(td4);
    var td5 = document.createElement('td');
    tr.appendChild(td5);
    var td6 = document.createElement('td');
    tr.appendChild(td6);
    var toDiscountPoliciesA = document.createElement('a');

    for (var key in data[i]) {
      if (key == 'customerId') {
        td1.innerText = data[i][key];
        toDiscountPoliciesA.setAttribute('data-customerId', data[i][key]);
      }
      if (key == 'customerNameChn') {
        td2.innerText = data[i][key];
      }
      if (key == 'statusDesc') {
        td3.innerText = data[i][key];
      }
      if (key == 'status') {
        td3.setAttribute('data-' + key, data[i][key]);
      }
      if (key == 'canYesDesc') {
        td4.innerText = data[i][key];
      }
      if (key == 'canYes') {
        td4.setAttribute('data-' + key, data[i][key]);
      }
      if (key == 'feeWayDesc') {
        td5.innerText = data[i][key];
      }
      if (key == 'feeWayId') {
        td5.setAttribute('data-' + key, data[i][key]);
      }
    }
    
    // 如果已注册且月结：
    if ((td3.getAttribute('data-status') == '1') && (td5.getAttribute('data-feeWayId') == 'MP')) {
      toDiscountPoliciesA.innerText = '优惠政策查看';
      toDiscountPoliciesA.href = '#ShowDiscountPolicies';
      td6.appendChild(toDiscountPoliciesA);

      toDiscountPoliciesA.addEventListener('click', function(event) {
        event.preventDefault();
        var link = this;
        var url = document.querySelector('input[name=api_queryDiscountCustomer]').value;
        var data = {customerId: link.getAttribute('data-customerId')};
        $(link).fn_queryDiscountCustomer(url, data);
      });
    } else {
      td6.innerText = '-';
    }
    
    tbody.appendChild(tr);
  }

  // 设置pagination
  if (res.data.totalPage > 1) {
    Sys_table.showPagnition_userInfo(res.data.totalPage, pageNumber, pageSize);
  } else {
    var wrap = document.querySelector('ul[data-for=dataTable]');
    if (wrap)
      wrap.innerHTML = '';
  }
};
Sys_table.prototype.getTable_inModal = function(res) {
  var modal = document.getElementById('showDiscountPolicy');
  var table = modal.querySelector('table');
  var tbody = table.querySelector('tbody');
  tbody.innerHTML = '';
  var dataList = res.data;

  for (var i = 0; i < dataList.length; i++) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    tr.appendChild(td1);
    var td2 = document.createElement('td');
    var spanStart = document.createElement('span');
    td2.appendChild(spanStart);
    var spanText = document.createElement('span');
    spanText.setAttribute('class', 'uk-margin-small-left uk-margin-small-right');
    spanText.innerText = '至';
    td2.appendChild(spanText);
    var spanEnd = document.createElement('span');
    td2.appendChild(spanEnd);
    tr.appendChild(td2);

    for (var key in dataList[i]) {
      if (key == 'discountPolicyName')
        td1.innerText = dataList[i][key];
      else if (key == 'startTimeStr')
        spanStart.innerText = dataList[i][key];
      else if (key == 'endTimeStr')
        spanEnd.innerText = dataList[i][key];
      else
        td1.setAttribute('data-' + key, dataList[i][key]);
    }

    tbody.appendChild(tr);
  }

  UIkit.modal(modal).show();
};
Sys_table.prototype.getTable_queryBill = function(res, pageNumber, pageSize) {
  var table = document.querySelector('#dataTable');

  var thead = table.querySelector('thead');
  thead.innerHTML = '';
  var trInThead = document.createElement('tr');
  thead.appendChild(trInThead);
  Sys_table.setTh(trInThead, '序号');
  Sys_table.setTh(trInThead, '开始时间');
  Sys_table.setTh(trInThead, '账期');
  Sys_table.setTh(trInThead, '账单类型');
  Sys_table.setTh(trInThead, '货运类型');
  Sys_table.setTh(trInThead, '平台订单号');
  Sys_table.setTh(trInThead, '总金额');
  Sys_table.setTh(trInThead, '优惠后金额');
  Sys_table.setTh(trInThead, '付款状态');
  Sys_table.setTh(trInThead, '计费方式');
  Sys_table.setTh(trInThead, '支付订单');
  Sys_table.setTh(trInThead, '结算客户编码');
  Sys_table.setTh(trInThead, '结算客户名称');
  Sys_table.setTh(trInThead, '操作');

  var tbody = table.querySelector('tbody');
  tbody.innerHTML = '';
  var data = res.data.summaryList;

  if (data.length < 1) {
    var tr0 = Glob_fn.Table.showNoData(13);
    tbody.appendChild(tr0);
  }

  for (var i = 0; i < data.length; i++) {
    var tr = document.createElement('tr');
    
    var tdSerial = document.createElement('td');
    tr.appendChild(tdSerial);
    tdSerial.innerText = i + 1 + (Number(pageNumber) - 1) * Number(pageSize);

    var td1 = document.createElement('td');
    tr.appendChild(td1);
    var td2 = document.createElement('td');
    tr.appendChild(td2);
    var td3 = document.createElement('td');
    tr.appendChild(td3);
    var td4 = document.createElement('td');
    tr.appendChild(td4);
    var td5 = document.createElement('td');
    tr.appendChild(td5);
    var td6 = document.createElement('td');
    tr.appendChild(td6);
    var td7 = document.createElement('td');
    tr.appendChild(td7);
    var td8 = document.createElement('td');
    tr.appendChild(td8);
    var td9 = document.createElement('td');
    tr.appendChild(td9);
    var td10 = document.createElement('td');
    tr.appendChild(td10);
    var td11 = document.createElement('td');
    tr.appendChild(td11);
    var td12 = document.createElement('td');
    tr.appendChild(td12);
    var td13 = document.createElement('td');
    var link = document.createElement('a');
    td13.appendChild(link);
    link.innerText = '查看详情';
    tr.appendChild(td13);

    for (var key in data[i]) {
      if (key == 'createTimeStr')
        td1.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'time')
        td2.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'type')
        td3.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'transferType')  //
        td4.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'orderNo') {
        td5.innerText = data[i][key] === null? '-': data[i][key];
        link.setAttribute('data-orderNo', data[i][key]);
      }
      if (key == 'totalFeeStr')
        td6.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'realTotalFeeStr')
        td7.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'statusStr')
        td8.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'payModeStr')
        td9.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'payNo')
        td10.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'customerId')
        td11.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'customerName')
        td12.innerText = data[i][key] === null? '-': data[i][key];
    }

    link.setAttribute('href', 'billsManagement/' + link.getAttribute('data-orderNo'));

    tbody.appendChild(tr);
  }

  // 设置pagination
  if (res.data.totalPage > 1) {
    Sys_table.showPagnition_queryBill(res.data.totalPage, pageNumber, pageSize);
  } else {
    var wrap = document.querySelector('ul[data-for=dataTable]');
    if (wrap)
      wrap.innerHTML = '';
  }
};
Sys_table.prototype.getTable_queryDetails = function(res, pageNumber, pageSize) {
  var url_queryFeeItem = document.querySelector('input[name=api_queryFeeItem]').value;
  var rawData = res;
  var pageNumber = pageNumber;
  var pageSize = pageSize;
  $.ajax({
    url: url_queryFeeItem,
    success: function(res) {
      var ajaxTitle = res;
      var table = document.querySelector('#dataTable');

      var thead = table.querySelector('thead');
      thead.innerHTML = '';
      var trInThead = document.createElement('tr');
      thead.appendChild(trInThead);

      Sys_table.setTh(trInThead, '序号');
      Sys_table.setTh(trInThead, '费用记录号');
      Sys_table.setTh(trInThead, '运单详情');
      Sys_table.setTh(trInThead, '运单号');
      Sys_table.setTh(trInThead, '品名');
      Sys_table.setTh(trInThead, '货运类型');
      Sys_table.setTh(trInThead, '始发站');
      Sys_table.setTh(trInThead, '目的站');
      Sys_table.setTh(trInThead, '航班号');
      Sys_table.setTh(trInThead, '件数');
      Sys_table.setTh(trInThead, '重量');
      Sys_table.setTh(trInThead, '计费重量');
      Sys_table.setTh(trInThead, '计费时间');
      Sys_table.setTh(trInThead, '计费营业点');
      Sys_table.setTh(trInThead, '账单类型');
      var titleData = ajaxTitle.data;
      Glob_fn.Table.buildAjaxTitle(titleData, trInThead);
      Sys_table.setTh(trInThead, '总价');
      Sys_table.setTh(trInThead, '备注');

      var tbody = table.querySelector('tbody');
      tbody.innerHTML = '';
      var data = rawData.data.feeList;

      if (data.length < 1) {
        var tr0 = Glob_fn.Table.showNoData(trInThead.querySelectorAll('th').length);
        tbody.appendChild(tr0);
      }
      for (var i = 0; i < data.length; i++) {
        var tr = document.createElement('tr');
        var trAdd = document.createElement('tr');
        tbody.appendChild(tr);
        tbody.appendChild(trAdd);
        
        var tdSerial = document.createElement('td');
        tdSerial.setAttribute('rowspan', '2');
        tr.appendChild(tdSerial);
        tdSerial.innerText = i + 1 + (Number(pageNumber) - 1) * Number(pageSize);

        var td1 = document.createElement('td');
        td1.setAttribute('rowspan', '2');
        tr.appendChild(td1);
        var td2 = document.createElement('td');
        td2.setAttribute('rowspan', '2');
        tr.appendChild(td2);
        var td3 = document.createElement('td');
        td3.setAttribute('rowspan', '2');
        tr.appendChild(td3);
        var td4 = document.createElement('td');
        td4.setAttribute('rowspan', '2');
        tr.appendChild(td4);
        var td5 = document.createElement('td');
        td5.setAttribute('rowspan', '2');
        tr.appendChild(td5);
        var td6 = document.createElement('td');
        td6.setAttribute('rowspan', '2');
        tr.appendChild(td6);
        var td7 = document.createElement('td');
        td7.setAttribute('rowspan', '2');
        tr.appendChild(td7);
        var td8 = document.createElement('td');
        td8.setAttribute('rowspan', '2');
        tr.appendChild(td8);
        var td9 = document.createElement('td');
        td9.setAttribute('rowspan', '2');
        tr.appendChild(td9);
        var td10 = document.createElement('td');
        td10.setAttribute('rowspan', '2');
        tr.appendChild(td10);
        var td11 = document.createElement('td');
        td11.setAttribute('rowspan', '2');
        tr.appendChild(td11);
        var td12 = document.createElement('td');
        td12.setAttribute('rowspan', '2');
        tr.appendChild(td12);
        var td13 = document.createElement('td');
        td13.setAttribute('rowspan', '2');
        tr.appendChild(td13);
        var td14 = document.createElement('td');
        td14.setAttribute('rowspan', '2');
        var td15 = document.createElement('td');
        var td16 = document.createElement('td');


        for ( var key in data[i]) {
          if (key == 'feeRecId') {
            td1.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'stockPre') {
            td2.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'stockNo') {
            td3.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'cargoNm') {
            td4.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'type') {
            td5.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'sAirportDsc') {
            td6.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'eAirportDsc') {
            td7.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'flight') {
            td8.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'pcs') {
            td9.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'weight') {
            td10.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'feeWt') {
            td11.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'crtopeTimeStr') {
            td12.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'opedepartId') {
            td13.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'remark') {
            td14.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'totalFeeStr') {
            td15.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'realTotalFeeStr') {
            td16.innerText = data[i][key] === null? '-': data[i][key];
          }
        }

        var feeIdArr = Glob_fn.Table.getAjaxTitleValue(ajaxTitle.data, 'feeId');
        var line1Data = Glob_fn.Table.getAjaxTitleData('原始账单', feeIdArr, JSON.parse(data[i].feeItemList));
        var line2Data = Glob_fn.Table.getAjaxTitleData('开账账单', feeIdArr, JSON.parse(data[i].realFeeItemList));
        Glob_fn.Table.buildValueWithAjaxTitle(line1Data, tr);
        Glob_fn.Table.buildValueWithAjaxTitle(line2Data, trAdd);
        tr.appendChild(td15); // 添加总价
        trAdd.appendChild(td16);
        tr.appendChild(td14); // 添加备注
      }

      // 设置pagination
      if (rawData.data.totalPage > 1) {
        Sys_table.showPagnition_queryDetails(rawData.data.totalPage, pageNumber, pageSize);
      } else {
        var wrap = document.querySelector('ul[data-for=dataTable]');
        if (wrap)
          wrap.innerHTML = '';
      }
    }
  });
};
Sys_table.prototype.getTable_queryPolicies = function(res, pageNumber, pageSize) {
  var table = document.querySelector('#dataTable');
  var thead = table.querySelector('thead');
  thead.innerHTML = '';
  var trInThead = document.createElement('tr');
  thead.appendChild(trInThead);
  Sys_table.setTh(trInThead, '序号');
  Sys_table.setTh(trInThead, '优惠政策名称');
  Sys_table.setTh(trInThead, '优惠类型');
  Sys_table.setTh(trInThead, '有效期');
  Sys_table.setTh(trInThead, '设置时间');
  Sys_table.setTh(trInThead, '状态');
  Sys_table.setTh(trInThead, '所属货站');
  Sys_table.setTh(trInThead, '操作');

  var tbody = table.querySelector('tbody');
  tbody.innerHTML = '';
  var data = res.data.systemDiscountPolicyList;
  // console.log(data);

  if (data.length < 1) {
    var tr0 = Glob_fn.Table.showNoData(7);
    tbody.appendChild(tr0);
  }

  for (var i = 0; i < data.length; i++) {
    var tr = document.createElement('tr');
    tbody.appendChild(tr);

    var tdSerial = document.createElement('td');
    tr.appendChild(tdSerial);
    tdSerial.innerText = i + 1 + (Number(pageNumber) - 1) * Number(pageSize);

    var td1 = document.createElement('td');
    tr.appendChild(td1);
    var td2 = document.createElement('td');
    tr.appendChild(td2);
    var td3 = document.createElement('td');
    tr.appendChild(td3);
    var spanSta = document.createElement('span');
    td3.appendChild(spanSta);
    var spanTex = document.createElement('span');
    spanTex.setAttribute('class', 'uk-margin-small-left uk-margin-small-right');
    spanTex.innerText = '至';
    td3.appendChild(spanTex);
    var spanEnd = document.createElement('span');
    td3.appendChild(spanEnd);
    var td4 = document.createElement('td');
    tr.appendChild(td4);
    var td5 = document.createElement('td');
    tr.appendChild(td5);
    var td6 = document.createElement('td');
    tr.appendChild(td6);
    var td7 = document.createElement('td');
    tr.appendChild(td7);
    var link = document.createElement('a');
    link.innerText = '查看详情'
    td7.appendChild(link);

    for (var key in data[i]) {
      if (key == 'discountPolicyName') {
        td1.innerText = data[i][key] === null? '-': data[i][key];
      }
      if (key == 'discountTypeDesc') {
        td2.innerText = data[i][key] === null? '-': data[i][key];
      }
      if (key == 'startTime') {
        spanSta.innerText = data[i][key] === null? '-': data[i][key];
      }
      if (key == 'endTime') {
        spanEnd.innerText = data[i][key] === null? '-': data[i][key];
      }
      if (key == 'setTime') {
        td4.innerText = data[i][key] === null? '-': data[i][key];
      }
      if (key == 'statusDesc') {
        td5.innerText = data[i][key] === null? '-': data[i][key];
      }
      if (key == 'supplierName') {
        td6.innerText = data[i][key] === null? '-': data[i][key];
      }
    }

    link.setAttribute('href', 'policiesManagement/' + data[i].discountPolicyId);

  }

  // 设置pagination
  if (res.data.totalPage > 1) {
    Sys_table.showPagnition_queryPolicies(res.data.totalPage, pageNumber, pageSize);
  } else {
    var wrap = document.querySelector('ul[data-for=dataTable]');
    if (wrap)
      wrap.innerHTML = '';
  }
};
Sys_table.setTh = function(tr, title) {
  var th = document.createElement('th');
  th.innerText = title;
  tr.appendChild(th);
};
Sys_table.showPagnition_userInfo = function(totalPage, pageNumber, pageSize) {
  var totalPage = Number(totalPage);
  var pageNumber = Number(pageNumber);
  var pageSize = Number(pageSize);
  var wrap = document.querySelector('ul[data-for=dataTable]');
  wrap.innerHTML = '';
  var url = document.querySelector('input[name=api_getAllConsumer]').value;
  if ( pageNumber > 1 ) {
    var link_pre = Glob_fn.getPagi_liPre(wrap);
    link_pre.addEventListener('click', function(event) {
      event.preventDefault();
      var data = getPostData(pageNumber - 1);
      $(this).fn_sys_getAllConsumer(url, data);
    });
  }
  for (var i = 0; i < totalPage; i++) {
    if ( i == pageNumber - 1) {
      var li = Glob_fn.getPagi_liActive(pageNumber);
    } else {
      var obj = Glob_fn.getPagi_liNormal(i+1);
      var link = obj.link;
      var li = obj.li;
      link.addEventListener('click', function(event) {
        event.preventDefault();
        var data = getPostData(this.innerText);
        $(this).fn_sys_getAllConsumer(url, data);
      });
    }
    wrap.appendChild(li);
  }
  if ( pageNumber < totalPage ) {
    var link_nex = Glob_fn.getPagi_liNext(wrap);
    link_nex.addEventListener('click', function(event) {
      event.preventDefault();
      var data = getPostData(pageNumber + 1);
      $(this).fn_sys_getAllConsumer(url, data);
    });
  }

  Glob_fn.getPagi_hidePage(10, wrap, pageNumber, totalPage);
  
  function getPostData(pageNumber) {
    var form = document.getElementById('form_system_getAllConsumer');
    var data = $(form).serializeObject();
    data.pageNumber = pageNumber;
    data.pageSize = pageSize; 
    return data;
  }
};
Sys_table.showPagnition_queryBill = function(totalPage, pageNumber, pageSize) {
  var totalPage = Number(totalPage);
  var pageNumber = Number(pageNumber);
  var pageSize = Number(pageSize);
  var wrap = document.querySelector('ul[data-for=dataTable]');
  wrap.innerHTML = '';
  var url = document.querySelector('input[name=api_systemQueryBill]').value;
  if ( pageNumber > 1 ) {
    var link_pre = Glob_fn.getPagi_liPre(wrap);
    link_pre.addEventListener('click', function(event) {
      event.preventDefault();
      var data = getPostData(pageNumber - 1);
      $(this).fn_sys_systemQueryBill(url, data);
    });
  }
  for (var i = 0; i < totalPage; i++) {
    if ( i == pageNumber - 1) {
      var li = Glob_fn.getPagi_liActive(pageNumber);
    } else {
      var obj = Glob_fn.getPagi_liNormal(i+1);
      var link = obj.link;
      var li = obj.li;
      link.addEventListener('click', function(event) {
        event.preventDefault();
        var data = getPostData(this.innerText);
        $(this).fn_sys_systemQueryBill(url, data);
      });
    }
    wrap.appendChild(li);
  }
  if ( pageNumber < totalPage ) {
    var link_nex = Glob_fn.getPagi_liNext(wrap);
    link_nex.addEventListener('click', function(event) {
      event.preventDefault();
      var data = getPostData(pageNumber + 1);
      $(this).fn_sys_systemQueryBill(url, data);
    });
  }

  Glob_fn.getPagi_hidePage(10, wrap, pageNumber, totalPage);
  
  function getPostData(pageNumber) {
    var form = document.getElementById('form_system_systemQueryBill');
    var data = $(form).serializeObject();
    data.indexPage = pageNumber;
    data.countPage = pageSize;
    return data;
  }
};
Sys_table.showPagnition_queryDetails = function(totalPage, pageNumber, pageSize) {
  var totalPage = Number(totalPage);
  var pageNumber = Number(pageNumber);
  var pageSize = Number(pageSize);
  var wrap = document.querySelector('ul[data-for=dataTable]');
  wrap.innerHTML = '';
  var url = document.querySelector('input[name=api_systemQueryBillDetails]').value;
  if ( pageNumber > 1 ) {
    var link_pre = Glob_fn.getPagi_liPre(wrap);
    link_pre.addEventListener('click', function(event) {
      event.preventDefault();
      var data = getPostData(pageNumber - 1);
      $(this).fn_sys_systemQueryBillDetails(url, data);
    });
  }
  for (var i = 0; i < totalPage; i++) {
    if ( i == pageNumber - 1) {
      var li = Glob_fn.getPagi_liActive(pageNumber);
    } else {
      var obj = Glob_fn.getPagi_liNormal(i+1);
      var link = obj.link;
      var li = obj.li;
      link.addEventListener('click', function(event) {
        event.preventDefault();
        var data = getPostData(this.innerText);
        $(this).fn_sys_systemQueryBillDetails(url, data);
      });
    }
    wrap.appendChild(li);
  }
  if ( pageNumber < totalPage ) {
    var link_nex = Glob_fn.getPagi_liNext(wrap);
    link_nex.addEventListener('click', function(event) {
      event.preventDefault();
      var data = getPostData(pageNumber + 1);
      $(this).fn_sys_systemQueryBillDetails(url, data);
    });
  }

  Glob_fn.getPagi_hidePage(10, wrap, pageNumber, totalPage);
  
  function getPostData(pageNumber) {
    var form = document.getElementById('form_systemQueryBillDetails');
    var data = $(form).serializeObject();
    data.indexPage = pageNumber;
    data.countPage = pageSize;
    return data;
  }
};
Sys_table.showPagnition_queryPolicies = function(totalPage, pageNumber, pageSize) {
  var totalPage = Number(totalPage);
  var pageNumber = Number(pageNumber);
  var pageSize = Number(pageSize);
  var wrap = document.querySelector('ul[data-for=dataTable]');
  wrap.innerHTML = '';
  var url = document.querySelector('input[name=api_getAllDiscountPolicy]').value;
  if ( pageNumber > 1 ) {
    var link_pre = Glob_fn.getPagi_liPre(wrap);
    link_pre.addEventListener('click', function(event) {
      event.preventDefault();
      var data = getPostData(pageNumber - 1);
      $(this).fn_sys_getAllDiscountPolicy(url, data);
    });
  }
  for (var i = 0; i < totalPage; i++) {
    if ( i == pageNumber - 1) {
      var li = Glob_fn.getPagi_liActive(pageNumber);
    } else {
      var obj = Glob_fn.getPagi_liNormal(i+1);
      var link = obj.link;
      var li = obj.li;
      link.addEventListener('click', function(event) {
        event.preventDefault();
        var data = getPostData(this.innerText);
        $(this).fn_sys_getAllDiscountPolicy(url, data);
      });
    }
    wrap.appendChild(li);
  }
  if ( pageNumber < totalPage ) {
    var link_nex = Glob_fn.getPagi_liNext(wrap);
    link_nex.addEventListener('click', function(event) {
      event.preventDefault();
      var data = getPostData(pageNumber + 1);
      $(this).fn_sys_getAllDiscountPolicy(url, data);
    });
  }

  Glob_fn.getPagi_hidePage(10, wrap, pageNumber, totalPage);
  
  function getPostData(pageNumber) {
    var form = document.getElementById('form_system_getAllDiscountPolicy');
    var data = $(form).serializeObject();
    data.pageNumber = pageNumber;
    data.pageSize = pageSize;
    return data;
  }
};