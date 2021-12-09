$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};
$.fn.fn_showTab = function(indexPage, args) {
  var $this = $(this),
      $form = '';
  if ($this.is('form')) $form = $this;
  if ($this.is('button'))  $form = $this.closest('form');
  var formName = $form.attr('name'),
      url = $form.attr('data-showTab'),
      postData_raw = $form.serializeObject(),
      countPage = $form.attr('data-countPage') || 10,
      postData = '';
  if (args) {
    countPage = args.countPage;
  }
  postData_raw.indexPage = indexPage;
  postData_raw.pageNumber = indexPage;
  postData_raw.countPage = countPage;
  postData_raw.pageSize = countPage;
  postData = JSON.stringify(postData_raw);
  // console.log(url, postData)
  $.ajax({
    url: url,
    data: postData,
    success: function(data) {
      if (checkRes(data) === false) return;
      console.info(postData, url, data);
      if (formName == 'consumer_consumerQueryBill'
        || formName == 'station_stationQueryBill') {
        var table = new Table(data, formName, indexPage);
        table.create();
      }
      if (formName == 'consumer_consumerQueryBillDetails'
        || formName == 'station_stationQueryBillDetails') {
        var table = new Table(data, formName, indexPage),
            api = $form.attr('data-queryFeeItemUrl');
        table.create({ titleApi: api });
      }
      if (formName == 'station_getStationAllConsumer') {
        showTotalCount(data);
        var table = new Table(data, formName, indexPage);
        table.create();
        function showTotalCount(res) {
          var data = res.data,
              spans = document.querySelector('.tabTotalData'),
              span = spans.querySelectorAll('span.data-res');
          spans.style.display = 'block';
          for ( var i = 0; i < span.length; i++ ) {
            var name = span[i].getAttribute('data-res');
            span[i].innerText = data[name];
          }
        }
      }
    }
  });
};
$.fn.fn_showExc = function() {
  var $this = $(this),
      $form = '';
  if ($this.is('form')) $form = $this;
  if ($this.is('button'))  $form = $this.closest('form');
  var formName = $form.attr('name'),
      url =  $form.attr('action'),
      postData = JSON.stringify($form.serializeObject()),
      fileName = '导出数据.xls';
  $.ajax({
    dataType: '',
    xhrFields: {
      responseType: 'blob'
    },
    url: url,
    data: postData,
    success: function(res, status, xhr) {
      if (checkRes(res) === false) return;
      // console.info(postData, url, res);
      // var type = 'application/vnd.ms-excel',
      //     blob = new Blob([res], {type: type});
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(res, fileName);
      } else {
        var downloadLink = window.document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(res);
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  });
};
$.fn.fn_getBind = function() {  // 获取绑定信息
  var $form = $(this),
      url = $form.attr('data-getbind');
  $.ajax({
    url: url,
    success: function(res) {
      if (checkRes(res) === false) return;
      // console.log(res);
      var data = res.data,
          name = data.customerNameChn,  // 商户名称
          status = data.status,         // 绑定状态
          statusDesc = data.statusDesc, 
          customerId = data.customerIdList,
          form = document.querySelector('form.fn_getBind'),
          inp_cus = form.querySelector('input[name=customerId]'),
          inp_sta = form.querySelector('input[name=status]'),
          inp_nam = form.querySelector('input[name=customerNameChn]'),
          btn_bin = form.querySelector('button.fn_setBind');
      inp_cus.value = customerId;
      inp_sta.value = status;
      inp_nam.value = name;
      if (status == 0) {  // 未绑定
        btn_bin.innerText = '绑定账户';
        var oldmesNode = document.querySelector('div.uk-alert');
        if (oldmesNode) fn_remMes(oldmesNode);
        var mes = fn_getMes('您尚未绑定账户', {style: 'warning', close: true});
        $(mes).insertBefore($form);
        btn_bin.addEventListener('click', function(event) {
          event.preventDefault();
          $(this).fn_setBind('1', customerId);
        });
      } 
      if (status == 1) {  // 已绑定
        btn_bin.innerText = '解绑账户';
        var oldmesNode = document.querySelector('div.uk-alert');
        if (oldmesNode) fn_remMes(oldmesNode);  
        var mes = fn_getMes('您已绑定账户', {style: 'primary', close: true});
        $(mes).insertBefore($form);
        btn_bin.addEventListener('click', function(event) {
          event.preventDefault();
          var $this = $(this);
          UIkit.modal.confirm('解除绑定之后将不能继续接收账单, 确认继续?').then(function(){
            $this.fn_setBind('0', customerId);
          }, function(){
            return;
          });
        });
      }
    }
  });
};
$.fn.fn_setBind = function(status, customerId) {  // 绑定商户
  var $this = $(this),
      $form = '';
  if ($this.is('form')) $form = $this;
  if ($this.is('button'))  $form = $this.closest('form');
  var url = $form.attr('action'),
      data = {};
  data.customerIdList = customerId;
  data.status = status;
  postData = JSON.stringify(data);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (res.code == '200') {
        if (status == '0') {
          var oldMes = document.querySelector('div.uk-alert');
          fn_remMes(oldMes);
          UIkit.modal.alert('账户解绑成功').then(function() {
            location.reload();
          });
        }
        if (status == '1') {
          var oldMes = document.querySelector('div.uk-alert');
          fn_remMes(oldMes);
          UIkit.modal.alert('账户绑定成功').then(function() {
            location.reload();
          });
        }
      } else {
        var mes = fn_getMes('绑定/解绑失败', {style: 'danger', close: true});
        $(mes).insertBefore($form);
      }
    }
  });
};
$.fn.fn_toPay = function(data) {  // 去收银台
  var $this = $(this),
      url = $this.attr('href'),
      pageUrl = document.querySelector('input[name=pageUrl]').value,
      postData = JSON.stringify({orderNo: data, pageUrl: pageUrl});
  console.log(url, postData);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return; 
      var data = res.data,
          payUrl = data.payUrl,
          payData = data.payData;
      submVirtForm(payUrl, payData);
    }
  });
};
$.fn.fn_toPush = function(data) {   // 推送账单 
  var $this = $(this),
      url = $this.attr('href'),
      postData = JSON.stringify({orderNoList: [data]});
  console.log(url, postData);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      alert(res.msg);
      document.querySelector('button.fn_showTab').click();
    }
  });
};
$.fn.fn_toUpdate = function(data) {
  console.log('修改账单', data);
  var element = fn_getModal(data, '账单收费项');
  UIkit.modal(element).show();
};
$.fn.fn_updateFee = function(data) {
  console.log('去往修改', data);
  var postData = JSON.stringify(data),
      url = document.querySelector('input[name=stationFeeUpdate]').value;
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      alert(res.msg);
      document.querySelector('button.fn_showTab').click();
    }
  });
};
$.fn.fn_discShow = function(data) {
  var url = document.querySelector('input[name=fn_discShow_url]').value,
      postData = JSON.stringify({customerId: data});
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      var element = document.querySelector('#discountShowing'),
          table = element.querySelector('table');
      var tab = new Table(res), tbody = tab.showDiscount();
      var bodys = table.querySelectorAll('tbody');
      for( var i = 0; i < bodys.length; i++) {
        table.removeChild(bodys[i]);
      }
      table.appendChild(tbody);
      UIkit.modal(element).show();
    }
  });
};
$.fn.fn_discSorS = function(data) {
  var url = document.querySelector('input[name=fn_discSorS_url]').value;
  var postData = JSON.stringify(data);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      if (res.msg == 'success') {
        UIkit.modal.alert('添加成功!');
      } else {
        UIkit.modal.alert(res.msg);
      }
    }
  });
};
$.fn.fn_discSet = function(customerId) {
  var url = document.querySelector('input[name=fn_discSet_url]').value;
  $.ajax({
    url: url,
    data: '',
    success: function(res) {
      if (checkRes(res) === false) return;
      // console.log(url, res);
      var element = document.querySelector('#discountSetting');
      var listbox = new Listbox();
      listbox.getOptions_discountName(res, element, customerId);
      UIkit.modal(element).show();
    }
  });
}
$.fn.fn_discSettle = function(data) {
  var url = document.querySelector('input[name=fn_discSettle_url]').value;
  if ( data === null ) {
    alert('请选择至少一项优惠政策');
    return;
  }
  var postData = JSON.stringify(data);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      // console.log(postData, url, res);
      if (res.msg == 'success') {
        UIkit.modal.alert('添加成功!');
      } else {
        UIkit.modal.alert(res.msg);
      }
    }
  });
};
$.fn.fn_queryCargo = function(url, data, resultContainer) {
  var postData = JSON.stringify({cargoNm: data});
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      var listbox = new Listbox();
      listbox.getOptions_cargoName(res, resultContainer);
    }
  });
};
$.fn.fn_getAllDiscountPolicy = function(url, data) {
  var postData = JSON.stringify(data);
  var pageNumber = data.pageNumber;
  var pageSize = data.pageSize;
  // console.log(url, postData);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      console.log(res);
      var tab = new DiscountPoliciesTable();
      tab.getTable(res, pageNumber, pageSize);
    }
  });
};
$.fn.fn_changeDiscountStatus = function(url, data) {
  var postData = JSON.stringify(data);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      console.log(res)
      if (res.msg == 'success') {
        UIkit.modal.alert('操作成功').then(function(){
          location.reload();
        });
      }
    }
  });
}
$.fn.fn_submitDiscountPage = function(url, data) {
  var postData = JSON.stringify(data);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      if (res.msg == 'success') {
        UIkit.modal.alert('创建成功').then(function() {
          window.location.href = 'discountPoliciesManagement';
        });
      } else {
        UIkit.modal.alert(res.msg);
      }
    }
  });
};
$.fn.fn_sys_getAllConsumer = function(url, data) {
  var postData = JSON.stringify(data);
  var pageNumber = data.pageNumber;
  var pageSize = data.pageSize;
  console.log(url, postData)
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      console.log(res);
      var table = new Sys_table();
      try {
        table.getTable_userInfo(res, pageNumber, pageSize);
      } catch (err) {
        console.error(err);
        alert(err);
      }
    }
  });
};
$.fn.fn_queryDiscountCustomer = function(url, data) {
  var postData = JSON.stringify(data);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      console.log(res);
      var table = new Sys_table();
      try {
        table.getTable_inModal(res);
      } catch (err) {
        console.error(err);
        alert(err);
      }
    }
  });
};
$.fn.fn_sys_systemQueryBill = function(url, data) {
  var postData = JSON.stringify(data);
  var indexPage = data.indexPage;
  var countPage = data.countPage;
  // console.log(url, postData)
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      // console.log(res);
      var table = new Sys_table();
      try {
        table.getTable_queryBill(res, indexPage, countPage);
      } catch (err) {
        console.error(err);
        alert(err);
      }
    }
  });
};
$.fn.fn_sys_systemQueryBillDetails = function(url, data) {
  var postData = JSON.stringify(data);
  var indexPage = data.indexPage;
  var countPage = data.countPage;
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      var table = new Sys_table();
      try {
        table.getTable_queryDetails(res, indexPage, countPage);
      } catch (err) {
        console.error(err);
        alert(err);
      }
    }
  });
};
$.fn.fn_sys_getAllDiscountPolicy = function(url, data) {
  var postData = JSON.stringify(data);
  var pageNumber = data.pageNumber;
  var pageSize = data.pageSize;
  console.log(url, postData)
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      console.log(res);
      var table = new Sys_table();
      try {
        table.getTable_queryPolicies(res, pageNumber, pageSize);
      } catch (err) {
        console.error(err);
        alert(err);
      }
    }
  });
}
$.fn.fn_sys_exportExcel = function(url, data) {
  var postData = JSON.stringify(data);
  var fileName = '导出数据.xls';
  console.log(url, postData);
  $.ajax({
    dataType: '',
    xhrFields: {
      responseType: 'blob'
    },
    url: url,
    data: postData,
    success: function(res, status, xhr) {
      if (checkRes(res) === false) return;
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(res, fileName);
      } else {
        var downloadLink = window.document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(res);
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  });
};

function submVirtForm (url, obj) {
  var form = document.createElement('form');
  form.style.display = 'none';
  form.method = 'post';
  form.action = url;
  for ( var key in obj) {
    var inp = document.createElement('input');
    inp.type = 'hidden';
    inp.name = key;
    inp.value = obj[key];
    form.appendChild(inp);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
