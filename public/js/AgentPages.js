function initAgent_consumerQueryBill() {
  fn_queryDict(Glob_fn.getDictArg_forQueryBills(), function(res) {
    if (checkRes(res) === false) return;
    Glob_fn.setInAndOut(res);
    initThisPage();
  });
  function initThisPage() {
    // init Wdate:
    Glob_fn.WdateInit('staTime', 'endTime');
    // bind submit button:
    fn_initSubmitBtn(1, 10, fetch_age_consumerQueryBill);
    // bind export button:
    fn_initExportBtn(fetch_exportExcel);
    // bind multi button:
    // var multiBtn = document.getElementById('multiBtn');
    // multiBtn.addEventListener('click', function(event) {
    //   event.preventDefault();
    //   var url = document.querySelector('input[name=api_pay]').value
    //   var chb = document.querySelectorAll('.cb_child');
    //   var list = [];
    //   Glob_fn.Table.addCheckedToList(chb, list);
    //   if (list.length == 0) {
    //     UIkit.modal.alert('请选择至少一项');
    //     return;
    //   }
    //   // var postData = {orderNoList: list};
    //   // console.log(url, postData);
    //   // fetch_age_toPay(url, postData);
    // });
  }
}
function initAgent_consumerQueryBillDetails() {
  // bind submit button:
  fn_initSubmitBtn(1, 10, fetch_age_consumerQueryBillDetails);
  // bind export button:
  fn_initExportBtn(fetch_exportExcel);
}
function initAgent_getBindConsumer() {
  var form = document.getElementById('form_consumer_getBindConsumer');
  var url = document.querySelector('input[name=api_getBindConsumer]').value;
  fetch_age_getBindConsumer(url);
}

function Age_table(){}
Age_table.prototype.getTable_queryBill = function(res, pageNumber, pageSize) {
  var table = document.querySelector('#dataTable');

  var trInThead = Glob_fn.Table.getThTr(table);
  // var checkAll = Glob_fn.Table.getCheckbox('all');
  // Glob_fn.Table.setTh(trInThead, checkAll);
  Glob_fn.Table.setTh(trInThead, '序号');
  Glob_fn.Table.setTh(trInThead, '开始时间');
  Glob_fn.Table.setTh(trInThead, '账期');
  Glob_fn.Table.setTh(trInThead, '货运类型');
  Glob_fn.Table.setTh(trInThead, '平台订单号');
  Glob_fn.Table.setTh(trInThead, '总金额');
  Glob_fn.Table.setTh(trInThead, '优惠后金额');
  Glob_fn.Table.setTh(trInThead, '付款状态');
  Glob_fn.Table.setTh(trInThead, '计费方式');
  Glob_fn.Table.setTh(trInThead, '支付订单');
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
    var link = document.createElement('a');
    td10.appendChild(link);
    link.innerText = '查看详情';
    var paylink = document.createElement('a');
    paylink.innerText = '付款';
    paylink.setAttribute('class', 'uk-margin-small-left');
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
        paylink.setAttribute('data-orderNo', data[i][key]);
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
    }
    if (data[i].status != 2 && data[i].payMode != 'CS') {
      // if (checkAll.querySelector('input').getAttribute('disabled') === '') {
      //   checkAll.querySelector('input').removeAttribute('disabled');
      // }
      // tdCheckbox.appendChild(checkbox);
      td10.appendChild(paylink);
      paylink.addEventListener('click', function(event) {
        event.preventDefault();
        var url = document.querySelector('input[name=api_pay]').value;
        var pageUrl = document.querySelector('input[name=pageUrl]').value;
        var orderNo = this.getAttribute('data-orderNo');
        var data = { orderNo: orderNo, pageUrl: pageUrl };
        fetch_age_toPay(url, data);
      });
    }
    link.setAttribute('href', 'billDetails/' +  link.getAttribute('data-orderNo'));
  }

  // 设置全选：
  var selAll = document.getElementById('selectAll');
  var selChildren = document.querySelectorAll('.cb_child');
  Glob_fn.Table.linkCheckboxes(selAll, selChildren);

  // 设置pagination
  fn_initPaginate(res, pageNumber, pageSize, fetch_age_consumerQueryBill);
};
Age_table.prototype.getTable_queryDetails = function(res, pageNumber, pageSize) {
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
      // Glob_fn.Table.setTh(trInThead, '货运类型');
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
        // var td5 = document.createElement('td');
        // td5.setAttribute('rowspan', '2');
        // tr.appendChild(td5);
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
          // if (key == 'type') {
          //   td5.innerText = data[i][key] === null? '-': data[i][key];
          // }
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
      fn_initPaginate(res, pageNumber, pageSize, fetch_age_consumerQueryBillDetails);
    }
  });
};
Age_table.prototype.getPage_binding = function(res) {
  var data = res.data,
      name = data.customerNameChn,  // 商户名称
      status = data.status,         // 绑定状态
      statusDesc = data.statusDesc, 
      customerId = data.customerIdList,
      form = document.getElementById('form_consumer_getBindConsumer'),
      inp_cus = form.querySelector('input[name=customerId]'),
      inp_sta = form.querySelector('input[name=status]'),
      inp_nam = form.querySelector('input[name=customerNameChn]'),
      btn_bin = document.getElementById('setBindBtn');
  inp_cus.value = customerId;
  inp_sta.value = status;
  inp_nam.value = name;
  if (status == 0) {  // 未绑定
    btn_bin.innerText = '绑定账户';
    var oldmesNode = document.querySelector('div.uk-alert');
    if (oldmesNode) fn_remMes(oldmesNode);
    var mes = fn_getMes('您尚未绑定账户', {style: 'warning', close: true});
    $(mes).insertBefore(form);
    btn_bin.addEventListener('click', function(event) {
      event.preventDefault();
      var url = document.querySelector('input[name=api_bindConsumer]').value;
      var data = {
        customerIdList: customerId,
        status: '1'
      };
      fetch_age_bindConsumer(url, data);
    });
  } 
  if (status == 1) {  // 已绑定
    btn_bin.innerText = '解绑账户';
    var oldmesNode = document.querySelector('div.uk-alert');
    if (oldmesNode) fn_remMes(oldmesNode);  
    var mes = fn_getMes('您已绑定账户', {style: 'primary', close: true});
    $(mes).insertBefore(form);
    btn_bin.addEventListener('click', function(event) {
      event.preventDefault();
      var url = document.querySelector('input[name=api_bindConsumer]').value;
      var data = {
        customerIdList: customerId,
        status: '0'
      };
      var $this = $(this);
      UIkit.modal.confirm('解除绑定之后将不能继续接收账单, 确认继续?').then(function(){
        fetch_age_bindConsumer(url, data);
      }, function(){
        return;
      });
    });
  }
};