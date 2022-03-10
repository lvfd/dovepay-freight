function initSystem_getAllConsumer() {
   // bind submit button:
  fn_initSubmitBtn(1, 10, fetch_sys_getAllConsumer);
  // bind export button:
  fn_initExportBtn(fetch_exportExcel);
}
  function initSystem_systemQueryBill() {
    fn_queryDict(Glob_fn.getDictArg_forQueryBills(), function(res) {
      if (checkRes(res) === false) return;
      Glob_fn.setInAndOut(res);
      initThisPage();
    });
    function initThisPage() {
      // init Wdate:
      Glob_fn.WdateInit('staTime', 'endTime');
      // bind submit button:
      fn_initSubmitBtn(1, 10, fetch_sys_systemQueryBill);
      // bind export button:
      fn_initExportBtn(fetch_exportExcel);
    }
  }
function initSystem_systemQueryBill_new() {
  initNewPage();
  function initNewPage() {
    // Glob_fn.WdateInit('staTime', 'endTime');
    fn_initSubmitBtn(1, 15, fetchData, new Sys_table().getTable_queryBill_new);
    fn_initExportBtn(fetch_exportExcel);
  }
}
  function initSystem_systemQueryBillDetails() {
    fn_queryDict('OPEDEPART', function(res) {
      if (checkRes(res) === false) return;
      Glob_fn.setOpedepartId(res);
      initThisPage();
    });
    function initThisPage() {
      // bind submit button:
      fn_initSubmitBtn(1, 5, fetch_sys_systemQueryBillDetails);
      // bind export button:
      fn_initExportBtn(fetch_exportExcel);
    }   
  }
function initSystem_systemQueryBillDetails_new() {
  fn_queryDict('OPEDEPART', function(res) {
    if (checkRes(res) === false) return;
    Glob_fn.setOpedepartId(res);
    initThisPage();
  });
  function initThisPage() {
    // bind submit button:
    fn_initSubmitBtn(1, 5, fetchData, new Sys_table().getTable_queryDetails_new);
    // bind export button:
    fn_initExportBtn(fetch_exportExcel);
  }
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
        // init Wdate:
        Glob_fn.WdateInit('startTime', 'endTime');
        Glob_fn.WdateInit('setStartTime', 'setEndTime');
        // bind submit button:
        fn_initSubmitBtn(1, 10, fetch_sys_getAllDiscountPolicy);
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
function initSystem_billMangement_queryBills() {
  var form = document.getElementById('dataForm');
  Glob_fn.WdateInit('startTime', 'endTime', {
    dateFmt: 'yyyy年MM月',
    minDate: '{%y-3}-%M-%d',
    maxDate: 'today',
    realDateFmt: 'yyyyMM',
  });
  fn_initSubmitBtn(1, 15, fetchData, new Sys_table().getTable_querySumBillByRule);
}

function Sys_table(){}
Sys_table.prototype.getTable_userInfo = function(res, pageNumber, pageSize) {
  var table = document.querySelector('#dataTable');

  var thead = table.querySelector('thead');
  thead.innerHTML = '';
  var trInThead = document.createElement('tr');
  thead.appendChild(trInThead);
  Glob_fn.Table.setTh(trInThead, '序号');
  Glob_fn.Table.setTh(trInThead, '客户代码');
  Glob_fn.Table.setTh(trInThead, '货运公司全称');
  Glob_fn.Table.setTh(trInThead, '状态');
  Glob_fn.Table.setTh(trInThead, '用户状态');
  Glob_fn.Table.setTh(trInThead, '结算方式');
  Glob_fn.Table.setTh(trInThead, '操作');

  var tbody = table.querySelector('tbody');
  tbody.innerHTML = '';
  var data = res.data.consumerList;

  if (!data || data.length < 1) {
    var tr0 = Glob_fn.Table.showNoData(trInThead.querySelectorAll('th').length);
    tbody.appendChild(tr0);
    return;
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
        fetch_sys_queryDiscountCustomer(url, data);
      });
    } else {
      td6.innerText = '-';
    }
    
    tbody.appendChild(tr);
  }

  // 设置pagination
  fn_initPaginate(res, pageNumber, pageSize, fetch_sys_getAllConsumer);
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
      Glob_fn.Table.setTh(trInThead, '序号');
      Glob_fn.Table.setTh(trInThead, '开始时间');
      Glob_fn.Table.setTh(trInThead, '账期');
      // Glob_fn.Table.setTh(trInThead, '账单类型');
      Glob_fn.Table.setTh(trInThead, '货运类型');
      Glob_fn.Table.setTh(trInThead, '平台订单号');
      Glob_fn.Table.setTh(trInThead, '总金额');
      Glob_fn.Table.setTh(trInThead, '优惠后金额');
      Glob_fn.Table.setTh(trInThead, '付款状态');
      Glob_fn.Table.setTh(trInThead, '计费方式');
      Glob_fn.Table.setTh(trInThead, '支付订单');
      Glob_fn.Table.setTh(trInThead, '结算客户编码');
      Glob_fn.Table.setTh(trInThead, '结算客户名称');
      Glob_fn.Table.setTh(trInThead, '操作');

      var tbody = table.querySelector('tbody');
      tbody.innerHTML = '';
      var data = res.data.summaryList;

      if (!data || data.length < 1) {
        var tr0 = Glob_fn.Table.showNoData(trInThead.querySelectorAll('th').length);
        tbody.appendChild(tr0);
        return;
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
        // var td4 = document.createElement('td');
        // tr.appendChild(td4);
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
          // if (key == 'transferType')  //
          //   td4.innerText = data[i][key] === null? '-': data[i][key];
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

        link.setAttribute('href', 'billDetails/' + link.getAttribute('data-orderNo'));

        tbody.appendChild(tr);
      }

      // 设置pagination
      fn_initPaginate(res, pageNumber, pageSize, fetch_sys_systemQueryBill);
    };
Sys_table.prototype.getTable_queryBill_new = function(res, pageNumber, pageSize) {
  try {
    createTable(res);
  } catch(error) {
    throw new Error(error);
    return;
  }
  function createTable(res) {
    console.log(res)
    var table = document.getElementById('dataTable');
    if (!res.data) throw new Error('远程数据非法: data未定义');
    var trInThead = Glob_fn.Table.getThTr(table);
    var checkAll = Glob_fn.Table.getCheckbox('all');
    setThead();
    setTbody(res);
    fn_initPaginate(res, pageNumber, pageSize, fetchData, new Sys_table().getTable_queryBill_new);
    function setThead() {
      Glob_fn.Table.setTh(trInThead, '序号');
      Glob_fn.Table.setTh(trInThead, '开账时间');
      Glob_fn.Table.setTh(trInThead, '账期');
      Glob_fn.Table.setTh(trInThead, '货运类型', false);
      // Glob_fn.Table.setTh(trInThead, '操作人');
      Glob_fn.Table.setTh(trInThead, '总金额');
      Glob_fn.Table.setTh(trInThead, '状态');
      Glob_fn.Table.setTh(trInThead, '优惠金额');
      Glob_fn.Table.setTh(trInThead, '平台订单号');
      Glob_fn.Table.setTh(trInThead, '交易流水号');
      Glob_fn.Table.setTh(trInThead, '结算客户编码');
      Glob_fn.Table.setTh(trInThead, '结算客户名称');
      Glob_fn.Table.setTh(trInThead, 'bindingStatus', false);
      Glob_fn.Table.setTh(trInThead, '操作');
    }
    function setTbody(res) {
      var tbody = table.querySelector('tbody');
      tbody.innerHTML = '';
      var data = res.data.summaryList;
      if (data === undefined) throw new Error('远程数据非法: data.summaryList未定义');
      if (!data || data.length < 1) {
        var tr0 = Glob_fn.Table.showNoData(trInThead.querySelectorAll('th').length);
        tbody.appendChild(tr0);
        return;
      }
      for (var i = 0; i < data.length; i++) {
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        var setTdSerial = Glob_fn.Table.setTdSerial(tr, i, pageNumber, pageSize);
        Glob_fn.Table.setTd(tr, data[i].createTimeStr);
        Glob_fn.Table.setTd(tr, data[i].orderTime);
        Glob_fn.Table.setTd(tr, data[i].type, false);
        Glob_fn.Table.setTd(tr, data[i].totalFeeStr);
        Glob_fn.Table.setTd(tr, data[i].statusStr);
        Glob_fn.Table.setTd(tr, data[i].realTotalFeeStr);
        Glob_fn.Table.setTd(tr, data[i].orderNo);
        Glob_fn.Table.setTd(tr, data[i].payNo);
        Glob_fn.Table.setTd(tr, data[i].customerId);
        Glob_fn.Table.setTd(tr, data[i].customerName);
        Glob_fn.Table.setTd(tr, data[i].bindingStatus, false);
        Glob_fn.Table.setTd(tr, getLinks(data[i]));
      }
      function getLinks(data) {
        var orderNo = data.orderNo;
        if (orderNo === undefined) throw new Error('远程数据非法: orderNo未定义');
        return getDetailLink();
        function getDetailLink() {
          // var modifyCondition = Number(data.status) === 1 && Number(data.confirm) === 0;          
          var link = document.createElement('a');
          link.innerText = '查看详情';
          link.setAttribute('data-orderNo', orderNo);
          var baseUrl = document.querySelector('input[name=url_forQueryDetails]').value + '/' + orderNo;
          // if (modifyCondition) {
          //   link.setAttribute('href', baseUrl + '/modify');
          // } else {
          //   link.setAttribute('href', baseUrl + '/readonly');
          // }
          link.setAttribute('href', baseUrl);
          return link;
        }
      }
    }
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

          Glob_fn.Table.setTh(trInThead, '序号');
          Glob_fn.Table.setTh(trInThead, '费用记录号');
          Glob_fn.Table.setTh(trInThead, '运单详情');
          Glob_fn.Table.setTh(trInThead, '运单号');
          Glob_fn.Table.setTh(trInThead, '品名');
          Glob_fn.Table.setTh(trInThead, '货运类型');
          Glob_fn.Table.setTh(trInThead, '始发站');
          Glob_fn.Table.setTh(trInThead, '目的站');
          Glob_fn.Table.setTh(trInThead, '航班号');
          Glob_fn.Table.setTh(trInThead, '件数');
          Glob_fn.Table.setTh(trInThead, '重量');
          Glob_fn.Table.setTh(trInThead, '计费重量');
          Glob_fn.Table.setTh(trInThead, '计费时间');
          Glob_fn.Table.setTh(trInThead, '计费营业点');
          Glob_fn.Table.setTh(trInThead, '计费营业点名称');
          Glob_fn.Table.setTh(trInThead, '账单类型');
          var titleData = ajaxTitle.data;
          Glob_fn.Table.buildAjaxTitle(titleData, trInThead);
          Glob_fn.Table.setTh(trInThead, '总价');
          Glob_fn.Table.setTh(trInThead, '备注');

          var tbody = table.querySelector('tbody');
          tbody.innerHTML = '';
          var data = rawData.data.feeList;

          if (!data || data.length < 1) {
            var tr0 = Glob_fn.Table.showNoData(trInThead.querySelectorAll('th').length);
            tbody.appendChild(tr0);
            return;
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
            var td_opedepartStr = document.createElement('td');
            td_opedepartStr.setAttribute('rowspan', '2');
            tr.appendChild(td_opedepartStr);
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
              if (key == 'opedepartStr') {
                td_opedepartStr.innerText = data[i][key] === null? '-': data[i][key];
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
          fn_initPaginate(rawData, pageNumber, pageSize, fetch_sys_systemQueryBillDetails);
        }
      });
    };
Sys_table.prototype.getTable_queryDetails_new = function(res, pageNumber, pageSize) {
  // console.log(res)
  getFeeItem();
  function getFeeItem() {
    var url = document.querySelector('input[name=api_queryFeeItem]').value;
    fetchData(url, '', createTable);
  }
  function createTable(feeItems) {
    try {
      var table = document.getElementById('dataTable');
      if (!feeItems.data) throw new Error('远程数据非法: 费用列表项未定义');
      var trInThead = Glob_fn.Table.getThTr(table);
      getCaptionData();
      setThead(feeItems.data);
      setTbody(res, feeItems.data);
      Glob_fn.Table.hideUnvalued();
      fn_initPaginate(res, pageNumber, pageSize, fetchData, new Sys_table().getTable_queryDetails_new);
    } catch (error) {
      throw new Error(error)
      return;
    }
    function getCaptionData() {
      var url = document.querySelector('input[name=api_queryBillDetailsSum]').value;
      var postData = JSON.stringify($(document.getElementById('dataForm')).serializeObject());
      fetchData(url, postData, setCaption);
    }
    function setCaption(res) {
      var data = res.data;
      var caption = table.querySelector('caption');
      if (!caption) return;
      caption.querySelector('span.totalCount').innerText = data.totalCount? data.totalCount: '无数据';
      caption.querySelector('span.totalFee').innerText = data.totalFee? data.totalFee: '无数据';
      caption.querySelector('span.totalWeight').innerText = data.totalWeight? data.totalWeight: '无数据';
      caption.querySelector('span.realTotalFee').innerText = data.realTotalFee? data.realTotalFee: '无数据';
      caption.removeAttribute('hidden');
    }
    function setThead(data) {
      Glob_fn.Table.setTh(trInThead, '序号');
      Glob_fn.Table.setTh(trInThead, '费用记录号');
      Glob_fn.Table.setTh(trInThead, '运单前缀');
      Glob_fn.Table.setTh(trInThead, '运单号');
      Glob_fn.Table.setTh(trInThead, '品名');
      Glob_fn.Table.setTh(trInThead, '货运类型');
      Glob_fn.Table.setTh(trInThead, '始发站');
      Glob_fn.Table.setTh(trInThead, '目的站');
      Glob_fn.Table.setTh(trInThead, '航班号');
      Glob_fn.Table.setTh(trInThead, '件数');
      Glob_fn.Table.setTh(trInThead, '重量');
      Glob_fn.Table.setTh(trInThead, '计费重量');
      Glob_fn.Table.setTh(trInThead, '计费时间');
      Glob_fn.Table.setTh(trInThead, '计费营业点');
      Glob_fn.Table.setTh(trInThead, '计费营业点名称');
      Glob_fn.Table.setTh(trInThead, '账单类型');
      Glob_fn.Table.buildAjaxTitle(data, trInThead);
      Glob_fn.Table.setTh(trInThead, '金额');
      Glob_fn.Table.setTh(trInThead, '操作');
    }
    function setTbody(rawData, ajaxTitle) {
      var tbody = table.querySelector('tbody');
      tbody.innerHTML = '';
      var data = rawData.data.feeList;
      if (!data || data.length < 1) {
        var tr0 = Glob_fn.Table.showNoData(trInThead.querySelectorAll('th').length);
        tbody.appendChild(tr0);
        return;
      }
      for (var i = 0; i < data.length; i++) {
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        var trAdd = document.createElement('tr');
        tbody.appendChild(trAdd);
        Glob_fn.Table.setTdSerial(tr, i, pageNumber, pageSize).setAttribute('rowspan', 2)
        Glob_fn.Table.setTd(tr, data[i].feeRecId).setAttribute('rowspan', 2);
        Glob_fn.Table.setTd(tr, data[i].stockPre).setAttribute('rowspan', 2);
        Glob_fn.Table.setTd(tr, data[i].stockNo).setAttribute('rowspan', 2);
        Glob_fn.Table.setTd(tr, data[i].cargoNm).setAttribute('rowspan', 2);
        Glob_fn.Table.setTd(tr, data[i].type).setAttribute('rowspan', 2);
        Glob_fn.Table.setTd(tr, data[i].sAirportDsc).setAttribute('rowspan', 2);
        Glob_fn.Table.setTd(tr, data[i].eAirportDsc).setAttribute('rowspan', 2);
        Glob_fn.Table.setTd(tr, data[i].flight).setAttribute('rowspan', 2);
        Glob_fn.Table.setTd(tr, data[i].pcs).setAttribute('rowspan', 2);
        Glob_fn.Table.setTd(tr, data[i].weight).setAttribute('rowspan', 2);
        Glob_fn.Table.setTd(tr, data[i].feeWt).setAttribute('rowspan', 2);
        Glob_fn.Table.setTd(tr, data[i].crtopeTimeStr).setAttribute('rowspan', 2);
        Glob_fn.Table.setTd(tr, data[i].opedepartId).setAttribute('rowspan', 2);
        Glob_fn.Table.setTd(tr, data[i].opedepartStr).setAttribute('rowspan', 2);
        var feeIdArr = Glob_fn.Table.getAjaxTitleValue(ajaxTitle, 'feeId');
        var l1Data = Glob_fn.Table.getAjaxTitleData('原始账单', feeIdArr, JSON.parse(data[i].feeItemList));
        var l2Data = Glob_fn.Table.getAjaxTitleData('开账账单', feeIdArr, JSON.parse(data[i].realFeeItemList));
        Glob_fn.Table.buildValueWithAjaxTitle(l1Data, tr);
        Glob_fn.Table.buildValueWithAjaxTitle(l2Data, trAdd);
        Glob_fn.Table.setTd(tr, data[i].totalFeeStr);
        Glob_fn.Table.setTd(trAdd, data[i].realTotalFeeStr);
        Glob_fn.Table.setTd(tr, '-').setAttribute('class', 'uk-text-center');
        Glob_fn.Table.setTd(trAdd, getAction(data[i]));
        Glob_fn.Table.trHideSome(tr);
      }
      function getAction(data) {
        var linkModHis = document.createElement('a');
        linkModHis.innerText = '修改记录';
        linkModHis.setAttribute('data-stockNo', data.stockNo);
        linkModHis.setAttribute('class', 'uk-margin-small-left');
        linkModHis.addEventListener('click', function(event) {
          event.preventDefault();
          var postData = JSON.stringify({stockNo: this.getAttribute('data-stockNo')});
          var url = document.querySelector('input[name=api_queryModifyLog]').value;
          fetchData(url, postData, createModHis);
        });
        return linkModHis;
      }
    }
  }
  function createModHis(res) {
    // console.log(res);
    var data = res.data;
    if (res.data === undefined) throw new Error('远程数据非法: data未定义');
    if (res.data === null || data.length < 1) {
      UIkit.modal.alert('没有或不可查询该笔订单的修改记录');
      return;
    }
    if (!Array.isArray(res.data)) throw new Error('远程数据非法: data属性不是数组');
    var modal = document.getElementById('modifiedHistory');
    var table = document.getElementById('modifiedHistoryTable');
    var thead = table.querySelector('thead');
    thead.innerHTML = '';
    var trInThead = Glob_fn.Table.getThTr(table);
    Glob_fn.Table.setTh(trInThead, '序号');
    Glob_fn.Table.setTh(trInThead, '费用记录号');
    Glob_fn.Table.setTh(trInThead, '运单前缀');
    var tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
    var tr = document.createElement('tr');
    tbody.appendChild(tr);
    for (var i = 0; i < res.data.length; i++) {
      Glob_fn.Table.setTd(tr, res.data[i].createTime);
      Glob_fn.Table.setTd(tr, res.data[i].createName);
      Glob_fn.Table.setTd(tr, res.data[i].remark);
    }
    UIkit.modal(modal).show();
  }
};
Sys_table.prototype.getTable_queryPolicies = function(res, pageNumber, pageSize) {
  var table = document.querySelector('#dataTable');
  var thead = table.querySelector('thead');
  thead.innerHTML = '';
  var trInThead = document.createElement('tr');
  thead.appendChild(trInThead);
  Glob_fn.Table.setTh(trInThead, '序号');
  Glob_fn.Table.setTh(trInThead, '优惠政策名称');
  Glob_fn.Table.setTh(trInThead, '优惠类型');
  Glob_fn.Table.setTh(trInThead, '有效期');
  Glob_fn.Table.setTh(trInThead, '设置时间');
  Glob_fn.Table.setTh(trInThead, '状态');
  Glob_fn.Table.setTh(trInThead, '所属货站');
  Glob_fn.Table.setTh(trInThead, '操作');

  var tbody = table.querySelector('tbody');
  tbody.innerHTML = '';
  var data = res.data.systemDiscountPolicyList;
  // console.log(data);

  if (!data || data.length < 1) {
    var tr0 = Glob_fn.Table.showNoData(trInThead.querySelectorAll('th').length);
    tbody.appendChild(tr0);
    return;
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
  fn_initPaginate(res, pageNumber, pageSize, fetch_sys_getAllDiscountPolicy);
};
Sys_table.prototype.getTable_querySumBillByRule = function(res, pageNumber, pageSize) {
  try {
    createTable(res);
  } catch(error) {
    throw new Error(error);
    return;
  }
  function createTable(res) {
    console.log(res)
    var table = document.getElementById('dataTable');
    if (!res.data) throw new Error('远程数据非法: data未定义');
    var trInThead = Glob_fn.Table.getThTr(table);
    setThead();
    setTbody(res);
    fn_initPaginate(res, pageNumber, pageSize, fetchData, new Sys_table().getTable_querySumBillByRule);
    function setThead() {
      Glob_fn.Table.setTh(trInThead, '序号');
      Glob_fn.Table.setTh(trInThead, '账单名称');
      Glob_fn.Table.setTh(trInThead, '开账时间');
      Glob_fn.Table.setTh(trInThead, '账期');
      Glob_fn.Table.setTh(trInThead, '操作');
    }
    function setTbody(res) {
      var tbody = table.querySelector('tbody');
      tbody.innerHTML = '';
      var data = res.data.billList;
      if (!data || data.length < 1) {
        var tr0 = Glob_fn.Table.showNoData(trInThead.querySelectorAll('th').length);
        tbody.appendChild(tr0);
        return;
      }
      for (var i = 0; i < data.length; i++) {
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        Glob_fn.Table.setTdSerial(tr, i, pageNumber, pageSize);
        Glob_fn.Table.setTd(tr, data[i].billRuleName);
        Glob_fn.Table.setTd(tr, data[i].accountOpeningTime);
        Glob_fn.Table.setTd(tr, data[i].orderTime);
        Glob_fn.Table.setTd(tr, getLink(data[i].billRuleId));
        function getLink(id) {
          if (id === undefined) throw new Error('远程数据非法: summaryList.billRule未定义');
          var link = document.createElement('a');
          link.innerText = '查看账单'
          link.setAttribute('data-billRuleId', id);
          link.setAttribute('uk-tooltip', '点击查看');
          link.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = document.querySelector('input[name=url_forNext]').value + '/' + id;
          });
          return link;
        }
      }
    }
  }
};