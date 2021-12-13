function initStation_stationQueryBill() {
  // bind submit button:
  fn_initSubmitBtn(1, 10, fetch_sta_stationQueryBill);
  // bind export button:
  fn_initExportBtn(fetch_exportExcel);
  // bind multi button:
  var multiBtn = document.getElementById('multiBtn');
  multiBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var url = document.querySelector('input[name=api_stationBillPush]').value
    var chb = document.querySelectorAll('.cb_child');
    var list = [];
    Glob_fn.Table.addCheckedToList(chb, list);
    if (list.length == 0) {
      UIkit.modal.alert('请选择至少一项');
      return;
    }
    var postData = {orderNoList: list};
    // console.log(url, postData);
    fetch_sta_stationBillPush(url, postData);
  });
}
function initStation_stationQueryBillDetails() {
  // bind submit button:
  fn_initSubmitBtn(1, 10, fetch_sta_stationQueryBillDetails);
  // bind export button:
  fn_initExportBtn(fetch_exportExcel);
}
function initStation_getStationAllConsumer() {
  // bind submit button:
  fn_initSubmitBtn(1, 10, fetch_sta_getStationAllConsumer);
  // bind export button:
  fn_initExportBtn(fetch_exportExcel);

  // 初始化Listbox：
  var showListBox = document.querySelector('#discountSetting'); // userInfo
  if (showListBox) {
    initListBox();
  }
  // 优惠设置提交按钮绑定：
  var listBoxSubmitButton = document.querySelector('#fn_discSettle');
  listBoxSubmitButton.addEventListener('click', function(event) {
    event.preventDefault();
    var url = document.querySelector('input[name=api_forDiscSettle]').value;
    var listbox = new Listbox();
    var data = listbox.postData_discountName();
    fetch_sta_addDiscountCustomer(url, data);
  });
}
function initStation_getAllDiscountPolicy() {
  // get select options:
  fn_queryDict('DISCOUNT_TYPE', function(res) {
    // set options:
    if (!res.data || res.data.length < 1) {
      throw new Error('字典接口错误');
      return;
    }
    var DISCOUNT_TYPE = res.data;
    var form = document.getElementById('dataForm');
    var selectType = form.querySelector('select[name=discountType]');
    var op0 = document.createElement('option');
    op0.value = 'TYPE';
    op0.innerText = '全部';
    selectType.appendChild(op0);
    for (var i = 0; i < DISCOUNT_TYPE.length; i++) {
      var op = document.createElement('option');
      for (var key in DISCOUNT_TYPE[i]) {
        if ( key == 'value') {
          op.innerText = DISCOUNT_TYPE[i][key];
        }
        op.setAttribute('data-' + key, DISCOUNT_TYPE[i][key]);
        selectType.appendChild(op);
      }
    }
    // bind submit:
    fn_initSubmitBtn(1, 10, fetch_sta_getAllDiscountPolicy);

    // bind add new:
    var newBtn = document.querySelector('#toDiscountPolicies');
    newBtn.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = 'discountPolicies';
    })
  });
}

function Sta_table(){}
// 账单查看主表：
Sta_table.prototype.getTable_queryBill = function(res, pageNumber, pageSize) {
  var table = document.querySelector('#dataTable');

  var trInThead = Glob_fn.Table.getThTr(table);
  var checkAll = Glob_fn.Table.getCheckbox('all');
  Glob_fn.Table.setTh(trInThead, checkAll);
  Glob_fn.Table.setTh(trInThead, '序号');
  Glob_fn.Table.setTh(trInThead, '开账时间');
  Glob_fn.Table.setTh(trInThead, '账期');
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
    var link = document.createElement('a');
    td12.appendChild(link);
    link.innerText = '查看详情';
    var pushlink = document.createElement('a');
    pushlink.innerText = '推送';
    pushlink.setAttribute('class', 'uk-margin-small-left');
    var tdCheckbox = document.createElement('td');
    tr.insertBefore(tdCheckbox, tdSerial);
    var checkbox = Glob_fn.Table.getCheckbox();

    for (var key in data[i]) {
      if (key == 'createTimeStr')
        td1.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'time')
        td2.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'type')
        td3.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'orderNo') {
        td4.innerText = data[i][key] === null? '-': data[i][key];
        link.setAttribute('data-orderNo', data[i][key]);
        pushlink.setAttribute('data-orderNo', data[i][key]);
        checkbox.setAttribute('data-checked', data[i][key]);
      }
      if (key == 'totalFeeStr')
        td5.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'realTotalFeeStr')
        td6.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'statusStr')
        td7.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'payModeStr')
        td8.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'payNo')
        td9.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'customerId')
        td10.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'customerName')
        td11.innerText = data[i][key] === null? '-': data[i][key];
    }

    if (data[i].confirm == 0 && data[i].bindingStatus == '1' && data[i].payMode != 'CS') {
      link.setAttribute('href', 'billDetails/' +  link.getAttribute('data-orderNo') + '/modify');
      if (checkAll.querySelector('input').getAttribute('disabled') === '') {
        checkAll.querySelector('input').removeAttribute('disabled');
      }
      tdCheckbox.appendChild(checkbox); 
      td12.appendChild(pushlink);
      pushlink.addEventListener('click', function(event) {
        event.preventDefault();
        var url = document.querySelector('input[name=api_stationBillPush]').value;
        var orderNo = this.getAttribute('data-orderNo');
        var orderNoList = [];
        orderNoList.push(orderNo);
        var data = { orderNoList: orderNoList };
        fetch_sta_stationBillPush(url, data);
      });
    } else {
      link.setAttribute('href', 'billDetails/' +  link.getAttribute('data-orderNo') + '/readonly');
    }
  }

  // 设置全选：
  var selAll = document.getElementById('selectAll');
  var selChildren = document.querySelectorAll('.cb_child');
  Glob_fn.Table.linkCheckboxes(selAll, selChildren);

  // 设置pagination
  fn_initPaginate(res, pageNumber, pageSize, fetch_sta_stationQueryBill);
};
// 账单明细主表：
Sta_table.prototype.getTable_queryDetails = function(res, pageNumber, pageSize) {
  var url_queryFeeItem = document.querySelector('input[name=api_queryFeeItem]').value;
  var rawData = res;
  var pageNumber = pageNumber;
  var pageSize = pageSize;
  $.ajax({
    url: url_queryFeeItem,
    success: function(res) {
      if (checkRes(res) === false) return;
      var ajaxTitle = res;
      var table = document.querySelector('#dataTable');

      var trInThead = Glob_fn.Table.getThTr(table);

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
      Glob_fn.Table.setTh(trInThead, '账单类型');
      var titleData = ajaxTitle.data;
      Glob_fn.Table.buildAjaxTitle(titleData, trInThead);
      Glob_fn.Table.setTh(trInThead, '总价');
      Glob_fn.Table.setTh(trInThead, '操作');
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
        var td14 = document.createElement('td');
        td14.setAttribute('rowspan', '2');

        var td15 = document.createElement('td');
        var td16 = document.createElement('td');
        var tdAction1 = document.createElement('td');
        tdAction1.innerText = '-';
        var tdAction2 = document.createElement('td');
        var modifyFlag = document.querySelector('input[name=modify]').value;
        var linkmodify = document.createElement('a');
        linkmodify.innerText = '修改';

        for ( var key in data[i]) {
          if (key == 'feeRecId') {
            td1.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'stockPre') {
            td2.innerText = data[i][key] === null? '-': data[i][key];
          }
          if (key == 'stockNo') {
            td3.innerText = data[i][key] === null? '-': data[i][key];
            linkmodify.setAttribute('data-' + key, data[i][key]);
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
            linkmodify.setAttribute('data-' + key, data[i][key]);
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
            linkmodify.setAttribute('data-' + key, data[i][key]);
          }
          if (key == 'totalFee') {
            td15.innerText = data[i][key] === null? '-': data[i][key];
            linkmodify.setAttribute('data-' + key, data[i][key]);
          }
          if (key == 'realTotalFeeStr') {
            td16.innerText = data[i][key] === null? '-': data[i][key];
          }
        }

        var feeIdArr = Glob_fn.Table.getAjaxTitleValue(ajaxTitle.data, 'feeId');
        var line1Data = Glob_fn.Table.getAjaxTitleData('原始账单', feeIdArr, JSON.parse(data[i].feeItemList));
        var line2Data = Glob_fn.Table.getAjaxTitleData('开账账单', feeIdArr, JSON.parse(data[i].realFeeItemList));
        var line2Object = Glob_fn.Table.getAjaxTitleObject(feeIdArr, JSON.parse(data[i].realFeeItemList));
        Glob_fn.Table.buildValueWithAjaxTitle(line1Data, tr);
        Glob_fn.Table.buildValueWithAjaxTitle(line2Data, trAdd);

        if (modifyFlag == 'modify') {
          tdAction2.appendChild(linkmodify);
          linkmodify.addEventListener('click', function(event) {
            event.preventDefault();
            var postData = {
              "stockNo": this.getAttribute('data-stockNo'),
              "totalFee": this.getAttribute('data-totalFee'),
              "totalFeeStr": this.getAttribute('data-totalFeeStr'),
              "feeWt": this.getAttribute('data-feeWt'),
              "feeItemList": line2Object
            };
            var element = fn_getModal(postData, '账单收费项');
            UIkit.modal(element).show();
          });
        } else {
          tdAction2.innerText = '-';
        }

        tr.appendChild(td15); // 添加总价
        trAdd.appendChild(td16);
        tr.appendChild(tdAction1);// 添加操作
        trAdd.appendChild(tdAction2);
        tr.appendChild(td14); // 添加备注
      }

      // 设置pagination
      fn_initPaginate(res, pageNumber, pageSize, fetch_sta_stationQueryBillDetails);
    }
  });
};
// 用户管理主表：
Sta_table.prototype.getTable_getStationAllConsumer = function(res, pageNumber, pageSize) {
  var table = document.querySelector('#dataTable');

  var trInThead = Glob_fn.Table.getThTr(table);
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
    var td4 = document.createElement('td');
    tr.appendChild(td4);
    var td5 = document.createElement('td');
    tr.appendChild(td5);
    var td6 = document.createElement('td');
    tr.appendChild(td6);
    var linkSet = document.createElement('a');
    var linkShow = document.createElement('a');
    

    for (var key in data[i]) {
      if (key == 'customerId') {
        td1.innerText = data[i][key] === null? '-': data[i][key];
        linkSet.setAttribute('data-' + key, data[i][key]);
        linkShow.setAttribute('data-' + key, data[i][key]);
      }
      if (key == 'customerNameChn')
        td2.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'statusDesc')
        td3.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'canYesDesc') 
        td4.innerText = data[i][key] === null? '-': data[i][key];
      if (key == 'feeWayDesc')
        td5.innerText = data[i][key] === null? '-': data[i][key];
    }

    var list = data[i];
    // 如果现结或未注册：
    if (list.feeWayId == 'CS' || list.status == '0') {
      td6.innerText = '-'
    } else if (list.feeWayId != 'CS') { // 如果是非现结
      if (list.canYes == '0') { // 且在使用中
        linkSet.innerText = '优惠设置';
        td6.appendChild(linkSet);
        linkSet.addEventListener('click', function(event) {
          event.preventDefault();
          var url = document.querySelector('input[name=api_forDiscSet]').value;
          var customerId = this.getAttribute('data-customerId');
          fetch_sta_queryDiscountPolicy(url, customerId);
        });
      }
      linkShow.innerText = '优惠政策查看';
      linkShow.setAttribute('class', 'uk-margin-small-left');
      linkShow.addEventListener('click', function(event) {
        event.preventDefault();
        var url = document.querySelector('input[name=api_forDiscShow]').value;
        var customerId = this.getAttribute('data-customerId');
        var data = {customerId: customerId};
        fetch_sta_queryDiscountCustomer(url, data);
      });
      td6.appendChild(linkShow);
    }
  }

  // 设置pagination
  fn_initPaginate(res, pageNumber, pageSize, fetch_sta_getStationAllConsumer);
};
// 主表用户优惠查看：
Sta_table.prototype.getTable_queryDiscountCustomer = function(res) {
  var tbody = document.createElement('tbody');
  var data = res.data;
  if (data.length < 1 || data === null) {
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.setAttribute('colspan', '3');
    td.innerText = '无数据';
    td.style.textAlign = 'center'
    tr.appendChild(td);
    tbody.appendChild(tr);
    return tbody;
  }
  for (var i = 0; i < data.length; i++) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td'),
        td2 = document.createElement('td'),
        span1 = document.createElement('span'),
        span2 = document.createElement('span'),
        td3 = document.createElement('td');
    var link = document.createElement('a');
    td3.appendChild(link);
    for ( var key in data[i]) {
      if (key == 'discountPolicyName') {
        td1.setAttribute('data-arg', key);
        td1.innerText = data[i][key];
      } else if (key == 'startTimeStr') {
        span1.setAttribute('data-arg', key);
        span1.innerText = data[i][key];
      } else if (key == 'endTimeStr') {
        span2.setAttribute('data-arg', key);
        span2.innerText = data[i][key];
      } else if (key == 'status') {
        td3.setAttribute('data-arg', key);
        getActionText(data[i][key], link);
      } else if (key == 'discountPolicyId') {
        link.setAttribute('data-' + key, data[i][key]);
      } else if (key == 'customerId') {
        link.setAttribute('data-' + key, data[i][key]);
      } else {
        var td = document.createElement('td');
        td.setAttribute('data-arg', key);
        td.innerText = data[i][key];
        td.style.display = 'none';
        tr.appendChild(td);
      }
    }
    td2.appendChild(span1);
    td2.appendChild(span2);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    link.addEventListener('click', function(event) {
      event.preventDefault();
      var discountPolicyId = this.getAttribute('data-discountPolicyId');
      var customerId = this.getAttribute('data-customerId');
      var status = this.getAttribute('data-status');
      var postData = {
        discountPolicyId: discountPolicyId,
        customerId: customerId,
        status: status
      };
      var url = document.querySelector('input[name=api_forDiscSorS]').value;
      fetch_sta_changeCustomerDiscountStatus(url, postData);
      var parTd = this.parentNode;
      if (status == '1') {
        parTd.removeChild(this);
        parTd.innerText = '已暂停';
      }
      if (status == '0') {
        parTd.removeChild(this);
        parTd.innerText = '已启用';
      }
    });
    tbody.appendChild(tr);
  }
  return tbody;
  function getActionText(status, link) {
    if (status == '0') {
      // 启用状态，设置暂停
      link.setAttribute('data-status', '1');
      link.innerText = '暂停';
    }
    if (status == '1') {
      // 暂停状态，设置启用
      link.setAttribute('data-status', '0');
      link.innerText = '启用';
    }
  }
};
// 优惠设置页面表格：
Sta_table.prototype.getTable_getAllDiscountPolicy = function(res, pageNumber, pageSize) {
  var table = document.getElementById('dataTable');
  
  var trInThead = Glob_fn.Table.getThTr(table);
  Glob_fn.Table.setTh(trInThead, '序号');
  Glob_fn.Table.setTh(trInThead, '优惠政策名称');
  Glob_fn.Table.setTh(trInThead, '优惠类型');
  Glob_fn.Table.setTh(trInThead, '有效期');
  Glob_fn.Table.setTh(trInThead, '状态');
  Glob_fn.Table.setTh(trInThead, '设置时间');
  Glob_fn.Table.setTh(trInThead, '操作');

  var tbody = table.querySelector('tbody');
  tbody.innerHTML = '';
  var data = res.data.discountPolicyList;
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
    var spanInTd3_1 = document.createElement('span');
    td3.appendChild(spanInTd3_1);
    var spanInTd3_2 = document.createElement('span');
    spanInTd3_2.innerText = '至';
    td3.appendChild(spanInTd3_2);
    var spanInTd3_3 = document.createElement('span');
    td3.appendChild(spanInTd3_3);
    var td4 = document.createElement('td');
    tr.appendChild(td4);
    var td5 = document.createElement('td');
    tr.appendChild(td5);
    var td6 = document.createElement('td');
    tr.appendChild(td6);
    var toDetailsA = document.createElement('a');
    toDetailsA.innerText = '查看详情';
    toDetailsA.href = location.pathname + '/details/' + data[i].discountPolicyId;
    td6.appendChild(toDetailsA); 
    var toggleA = document.createElement('a');
    toggleA.setAttribute('class', 'uk-margin-small-left');
    var status_changeToThis = '';
    for (var key in data[i]) {
      if (key == 'discountPolicyId') {
        toggleA.setAttribute('data-' + key, data[i][key]);
      }
      if (key == 'discountPolicyName') {
        td1.innerText = data[i][key];
      }
      if (key == 'discountTypeDesc') {
        td2.innerText = data[i][key];
        td2.setAttribute('data-' + key, data[i][key]);
      }
      if (key == 'startTime') {
        spanInTd3_1.innerText = data[i][key];
      }
      if (key == 'endTime') {
        spanInTd3_3.innerText = data[i][key];
      }
      if (key == 'statusDesc') {
        td4.innerText = data[i][key];
      }
      if (key == 'status') {
        if (data[i][key] == '1') {
          toggleA.innerText = '作废';
          toggleA.setAttribute('data-status', '2');
          td6.appendChild(toggleA);
        }
        if (data[i][key] == '0' || data[i][key] == '2') {
          toggleA.innerText = '启用';
          toggleA.setAttribute('data-status', '1');
          td6.appendChild(toggleA);
        }
      }
      if (key == 'setTime') {
        td5.innerText = data[i][key];
      }
    }
    toggleA.addEventListener('click', function(event) {
      event.preventDefault();
      var link = this;
      var url = document.querySelector('input[name=api_changeDiscountStatus]').value;
      var postData = {
        discountPolicyId: link.getAttribute('data-discountPolicyId'),
        status: link.getAttribute('data-status')
      };
      // console.log(url, postData)
      fetch_sta_changeDiscountStatus(url, postData);
    });
    tbody.appendChild(tr);
  }
  fn_initPaginate(res, pageNumber, pageSize, fetch_sta_getAllDiscountPolicy);
};

// 调账模态：
function Modal(data, title, id) {
  this.data = data;
  this.title = title;
  this.id = id? id: null;
}
Modal.prototype.create = function() {
  var data = this.data,
      titleText = this.title,
      modalId = this.id,
      modal = document.createElement('div'),
      dialog = document.createElement('div'),
      mheader = document.createElement('div'),
      mtitle = document.createElement('h2'),
      mbody = document.createElement('div'),
      mform = document.createElement('form');
  modal.setAttribute('id', modalId);
  modal.setAttribute('uk-modal', '');
  dialog.setAttribute('class', 'uk-modal-dialog');
  mheader.setAttribute('class', 'uk-modal-header');
  mtitle.setAttribute('class', 'uk-modal-title');
  mtitle.innerText = titleText;
  mbody.setAttribute('class', 'uk-modal-body');
  mbody.setAttribute('uk-overflow-auto', '');
  mform.setAttribute('class', 'uk-grid-small');
  mform.setAttribute('uk-grid', '');

  mform.setAttribute('data-stockNo', data.stockNo);
  mheader.appendChild(mtitle);
  var feeItemList = data.feeItemList;
  for ( var i = 0; i < feeItemList.length; i++) {
    var els = Modal.createInpList(feeItemList[i]);
    for ( var j = 0; j < els.length; j++) {
      mform.appendChild(els[j]);
    }
  }
  var totalFeeInput = Modal.getTotalFeeInput(data, 'totalFee', '总金额');
  var descTextarea = Modal.getDescTextarea('description', '备注');
  var buttonSection = Modal.getButtonSection(mform);
  mform.appendChild(totalFeeInput);
  mform.appendChild(descTextarea);
  mform.appendChild(buttonSection);
  Modal.setInpLinks(mform, data.feeWt);

  mbody.appendChild(mform);
  dialog.appendChild(mheader);
  dialog.appendChild(mbody);
  modal.appendChild(dialog);
  return modal;
}
Modal.setInpLinks = function(form, feeWt) {
  var inp_feeItemList = form.querySelectorAll('input[data-feeItemList]'),
      inp_totalfee = form.querySelector('input[name=totalFee]');
  var inp_spec = form.querySelector('input[data-fee=spec]'),
      inp_rate = null;
  if ( inp_spec ) {
    inp_rate = form.querySelector('input[name=feerate]');
    inp_rate.addEventListener('blur', function(event) {
      event.preventDefault();
      var oldValue = this.value;
      inp_spec.setAttribute('value', getSpecFee(feeWt, oldValue));
      inp_totalfee.setAttribute('value', getTotalFee());
    });
  }
  for (var i = 0; i < inp_feeItemList.length; i++) {
    var list = inp_feeItemList[i];
    if ((list.name != 'feerate') && (list.getAttribute('data-fee') != 'spec')) {
      list.addEventListener('blur', function(event) {
        event.preventDefault();
        inp_totalfee.setAttribute('value', getTotalFee());
      });
    } 
  }
  function getTotalFee() {
    var result = 0;
    for ( var i = 0; i < inp_feeItemList.length; i++) {
      var list = inp_feeItemList[i];
      if (list.name != 'feerate' || list.getAttribute('data-fee') != 'spec') {
        result += Number(list.value);
      }
    }
    return result;
  }
  function getSpecFee(feeWt, oldValue) {
    var result = 0,
    result = Number(feeWt) * Number(oldValue);
    // console.log(result)
    return result;
  }
};
Modal.getPostData = function(form) {
  var postData = {
    stockNo: '',
    totalFee: '',
    feeItemList: [],
    remark: ''
  };
  var feeItemListNode = form.querySelectorAll('input[data-feeItemList]'),
      feerateNode = form.querySelector('input[name=feerate]');
  postData.stockNo = form.getAttribute('data-stockNo');
  postData.totalFee = form.querySelector('input[name=totalFee]').value;
  postData.remark = form.querySelector('textarea[name=description]').value;
  for (var i = 0; i < feeItemListNode.length; i++) {
    var obj = {};
    obj.feeId = feeItemListNode[i].name;
    if (feeItemListNode[i].getAttribute('data-fee') === 'spec') {
      obj.feerate = feerateNode.value;
    }
    obj.fee = feeItemListNode[i].value;
    obj.feeShortNM = feeItemListNode[i].getAttribute('data-feeShortNM');
    postData.feeItemList.push(obj);
  }
  return postData;
};
Modal.getButtonSection = function(form) {
  var mSection = document.createElement('section'),
      mSubmitBtn = document.createElement('button'),
      mCancelBtn = document.createElement('button');
  mSection.setAttribute('class', 'action-buttons');
  mSubmitBtn.setAttribute('class', 'button button-primary button-rounded uk-modal-close');
  mSubmitBtn.innerText = '确定';
  mSubmitBtn.style.marginRight = '5px';
  mSubmitBtn.addEventListener('click', function(event){
    event.preventDefault();
    var url = document.querySelector('input[name=api_stationFeeUpdate]').value;
    var data = Modal.getPostData(form);
    // console.log(url, JSON.stringify(data));
    fetch_sta_updateFee(url, data);
  })
  mCancelBtn.setAttribute('class', 'button button-rounded uk-modal-close');
  mCancelBtn.innerText = '取消';
  mSection.appendChild(mSubmitBtn);
  mSection.appendChild(mCancelBtn);
  return mSection;
}
Modal.getDescTextarea = function(name, text) {
  var mDiv = document.createElement('div'),
      mLabel = document.createElement('label'),
      mTextarea = document.createElement('textarea');
  mDiv.setAttribute('class', 'uk-width-1-1');
  mLabel.setAttribute('class', 'uk-form-label');
  mLabel.innerText = text;
  mLabel.setAttribute('for', name);
  mTextarea.setAttribute('class', 'uk-textarea');
  mTextarea.setAttribute('name', name);
  mTextarea.setAttribute('rows', 3);
  mDiv.appendChild(mLabel);
  mDiv.appendChild(mTextarea);
  return mDiv;
};
Modal.getTotalFeeInput = function(data, name, text) {
  var mDiv = document.createElement('div'),
      mLabel = document.createElement('label'),
      mInput = document.createElement('input'),
      feeItemList = data.feeItemList,
      totalFee = 0;
  mDiv.setAttribute('class', 'uk-width-1-1');
  mLabel.setAttribute('class', 'uk-form-label');
  mLabel.innerText = text;
  mLabel.setAttribute('for', name);
  mInput.setAttribute('class', 'uk-input');
  mInput.setAttribute('type', 'text');
  mInput.setAttribute('readonly', '');
  mInput.setAttribute('name', name);
  for (var i = 0; i < feeItemList.length; i++) {
    totalFee += Number(feeItemList[i].fee);
  }
  mInput.setAttribute('value', totalFee);
  mDiv.appendChild(mLabel);
  mDiv.appendChild(mInput);
  return mDiv;
};
Modal.createInpList = function(data) {
  var feerate = data.feerate? data.feerate: null,
      fee = data.fee,
      feeId = data.feeId,
      feeShortNM = data.feeShortNM;
  if (feerate) {
    var el1 = createInp('feerate'),
        el2 = createInp('spec');
    return [el1, el2];
  } else {
    var el = createInp();
    return [el];
  }
  function createInp(type) {
    var flag = (type === 'feerate'),
        formItem = document.createElement('div'),
        label = document.createElement('label'),
        input = document.createElement('input');
    formItem.setAttribute('class', 'uk-width-1-2');
    label.setAttribute('class', 'uk-form-label');
    input.setAttribute('class', 'uk-input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', flag? 'feerate': feeId);
    if (type === 'spec') {
      input.setAttribute('data-fee', 'spec');
      input.setAttribute('readonly', '');
    }
    label.setAttribute('for', input.name);
    label.innerText = flag? '地面费率': feeShortNM;
    if (!flag) {
      input.setAttribute('data-feeItemList', '');
    }
    input.setAttribute('value', flag? feerate: fee);
    input.setAttribute('data-feeShortNM', feeShortNM);
    formItem.appendChild(label);
    formItem.appendChild(input);
    return formItem; 
  }
};
function fn_getModal(data, title, id) {
  var mod = new Modal(data, title, id);
  return mod.create();
}