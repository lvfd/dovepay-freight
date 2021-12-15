// Global:
// Ajax设置：
$.ajaxSetup({
  headers: {
    accountId: $('header #accountId').text(),
    userId: $('header #userId').text()
  },
  type: 'POST',  // for java api
  dataType: 'json',
  contentType: 'application/json'
});
$(document).ajaxError(function(event, xhr, settings){
  var reqUrl = settings.url;
  var reqData = settings.data;
  var res = xhr.status + xhr.statusText;
  if (console)
    console.error(reqUrl, reqData, res);
  alert('Ajax Error: ' + xhr.status);
});
$(document).ajaxStart(function() {
  console.log('Requesting...');
  // $( "#loading" ).show();
});
// 获取表格数据：
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
// 检查response：
function checkRes (res) {
  if (res.code != '200') {
    throw new Error('msg=' + res.msg);
    return false;
  }
}
// Init submit button:
function fn_initSubmitBtn(pageNumber, pageSize, fetchFn) {
  var submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    var $this = $(this);
    var url = document.querySelector('input[name=api_forTable]').value;
    var postData = $this.closest('form').serializeObject();
    postData.pageNumber = pageNumber;
    postData.indexPage = pageNumber;
    postData.pageSize = pageSize;
    postData.countPage = pageSize;
    fetchFn.call(this, url, postData);
  });
  submitBtn.click();
}
// Init export button:
function fn_initExportBtn(fetchFn) {
  var expoBtn = document.getElementById('exportBtn');
  expoBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var $this = $(this);
    var url = document.querySelector('input[name=api_forExport]').value;
    var postData = $this.closest('form').serializeObject();
    fetchFn.call(this, url, postData);
  });
}
// Export function:
function fetch_exportExcel(url, data) {
  var postData = JSON.stringify(data);
  var fileName = '导出数据.xls';
  // console.log(url, postData);
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
}

// sys:
function fetch_sys_getAllConsumer(url, data) {
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
        throw new Error(err);
      }
    }
  });
}
function fetch_sys_queryDiscountCustomer(url, data) {
  var postData = JSON.stringify(data);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      // console.log(res);
      var table = new Sys_table();
      try {
        table.getTable_inModal(res);
      } catch (err) {
        throw new Error(err);
      }
    }
  });
}
function fetch_sys_systemQueryBill(url, data) {
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
        throw new Error(err);
      }
    }
  });
}
function fetch_sys_systemQueryBillDetails(url, data) {
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
        throw new Error(err);
      }
    }
  });
}
function fetch_sys_getAllDiscountPolicy(url, data) {
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
        throw new Error(err);
      }
    }
  });
}

// agent:
// 账单查询：
function fetch_age_consumerQueryBill(url, data) {
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
      var table = new Age_table();
      try {
        table.getTable_queryBill(res, indexPage, countPage);
      } catch (err) {
        throw new Error(err);
      }
    }
  });
}
// 账单明细查询：
function fetch_age_consumerQueryBillDetails(url, data) {
  var postData = JSON.stringify(data);
  var indexPage = data.indexPage;
  var countPage = data.countPage;
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      // console.log(res);
      var table = new Age_table();
      try {
        table.getTable_queryDetails(res, indexPage, countPage);
      } catch (err) {
        throw new Error(err);
      }
    }
  });
}
// 提交支付：
function fetch_age_toPay(url, data) {  // 去收银台
  var postData = JSON.stringify(data);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return; 
      var data = res.data,
          payUrl = data.payUrl,
          payData = data.payData;
      Glob_fn.submVirtForm(payUrl, payData);
    }
  });
}
// 获取账户绑定数据：
function fetch_age_getBindConsumer(url) {  // 获取绑定信息
  $.ajax({
    url: url,
    success: function(res) {
      if (checkRes(res) === false) return;
      // console.log(res);
      var table = new Age_table();
      try {
        table.getPage_binding(res);
      } catch (err) {
        throw new Error(err);
      }
    }
  });
}
// 提交绑定：
function fetch_age_bindConsumer(url, data) {  // 绑定商户
  var postData = JSON.stringify(data);
  var status = data.status;
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
}

// Station:
// 账单查询：
function fetch_sta_stationQueryBill(url, data) {
  var postData = JSON.stringify(data);
  var indexPage = data.indexPage;
  var countPage = data.countPage;
  // console.log(url, postData)
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      console.log(res);
      var table = new Sta_table();
      try {
        table.getTable_queryBill(res, indexPage, countPage);
      } catch (err) {
        throw new Error(err);
      }
    }
  });
}
// 账单明细查询：
function fetch_sta_stationQueryBillDetails(url, data) {
  var postData = JSON.stringify(data);
  var indexPage = data.indexPage;
  var countPage = data.countPage;
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      console.log(res);
      var table = new Sta_table();
      try {
        table.getTable_queryDetails(res, indexPage, countPage);
      } catch (err) {
        throw new Error(err);
      }
    }
  });
}
// 调账：
function fetch_sta_updateFee(url, data) {
  var postData = JSON.stringify(data);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      if (res.msg == 'success') {
        UIkit.modal.alert('修改成功').then(function() {
          document.getElementById('submitBtn').click();
        });
      }    
    }
  });
};
// 用户信息管理：推送账单
function fetch_sta_stationBillPush(url, data) {
  var postData = JSON.stringify(data);
  // console.log(url, postData);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      try {
        if (res.msg == 'success') {
          UIkit.modal.alert('推送成功').then(function(){
            document.getElementById('submitBtn').click();
          });
        }   
      } catch (e) {
        throw new Error(e);
      }
    }
  });
}
// 用户信息管理：获取用户信息:
function fetch_sta_getStationAllConsumer(url, data) {
  var postData = JSON.stringify(data);
  // console.log(url, postData);
  var pageNumber = data.pageNumber;
  var pageSize = data.pageSize;
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      // console.log(res);
      var table = new Sta_table();
      try {
        table.getTable_getStationAllConsumer(res, pageNumber, pageSize);
      } catch (err) {
        throw new Error(err);
      }
    }
  });
}
// 用户信息管理：设置优惠（获取）
function fetch_sta_queryDiscountPolicy(url, customerId) {
  $.ajax({
    url: url,
    data: '',
    success: function(res) {
      if (checkRes(res) === false) return;
      var element = document.querySelector('#discountSetting');
      var listbox = new Listbox();
      try {
        listbox.getOptions_discountName(res, element, customerId);
        UIkit.modal(element).show();
      } catch(err) {
        throw new Error(err);
      }
    }
  });
}
// 用户信息管理：设置优惠（添加）
function fetch_sta_addDiscountCustomer(url, data) {
  if ( data === null ) {
    UIkit.modal.alert('请选择至少一项优惠政策');
    return;
  }
  var postData = JSON.stringify(data);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      // console.log(postData, url, res);
      try {
        if (res.msg == 'success') {
          UIkit.modal.alert('添加成功!');
        } else {
          UIkit.modal.alert(res.msg);
        }
      } catch (e) {
        throw new Error(e);
      }
    }
  });
}
// 用户信息管理：查看优惠（获取）
function fetch_sta_queryDiscountCustomer(url, data) {
  var postData = JSON.stringify(data);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      // console.log(res);
      try {
        var element = document.querySelector('#discountShowing');
        var table = element.querySelector('table');
        var tab = new Sta_table();
        var tbody = tab.getTable_queryDiscountCustomer(res);
        var bodys = table.querySelectorAll('tbody');
        for( var i = 0; i < bodys.length; i++) {
          table.removeChild(bodys[i]);
        }
        table.appendChild(tbody);
        UIkit.modal(element).show();
      } catch(e) {
        throw new Error(e);
      }
    }
  });
}
// 用户信息管理：查看优惠（更改）
function fetch_sta_changeCustomerDiscountStatus(url, data) {
  var postData = JSON.stringify(data);
  // console.log(postData);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (res.msg == 'success') {
        UIkit.modal.alert('更改成功!');
      } else {
        throw new Error(res.msg);;
      }
    }
  });
}
// 优惠政策管理：查看所有优惠政策
function fetch_sta_getAllDiscountPolicy(url, data) {
  var postData = JSON.stringify(data);
  var pageNumber = data.pageNumber;
  var pageSize = data.pageSize;
  // console.log(url, postData);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      // console.log(res);
      var tab = new Sta_table();
      tab.getTable_getAllDiscountPolicy(res, pageNumber, pageSize);
    }
  });
}
// 优惠政策管理： 启动、停止优惠
function fetch_sta_changeDiscountStatus(url, data) {
  var postData = JSON.stringify(data);
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      // console.log(res)
      if (res.msg == 'success') {
        UIkit.modal.alert('操作成功').then(function(){
          location.reload();
        });
      }
    }
  });
}
// 优惠政策管理：优惠政策详情
function fetch_sta_getDiscountPolicy(url, data) {
  $.ajax({
    url: url,
    data: JSON.stringify(data),
    success: function(res) {
      if (checkRes(res) === false) return;
      // console.log(res);
      var data = res.data;
      if (data.length < 1) {
        UIkit.modal.alert('无数据');
      }
      Glob_fn.initDiscountDetails(data);
      var btn = document.getElementById('btnAction');
      var status_changeToThis = null;
      if (data.status == '1') {
        btn.innerText = '作废';
        status_changeToThis = 2;
      } else {
        btn.innerText = '启用';
        status_changeToThis = 1;
      }
      btn.addEventListener('click', function(event) {
        event.preventDefault();
        var url = document.querySelector('input[name=api_changeDiscountStatus]').value;
        var postData = {
          discountPolicyId: data.discountPolicyId,
          status: status_changeToThis
        };
        fetch_sta_changeDiscountStatus(url, postData);
      });
    }
  });
}
// 新增优惠：获取品名
function fetch_sta_queryCargo(url, data, resultContainer) {
  var postData = JSON.stringify({cargoNm: data});
  $.ajax({
    url: url,
    data: postData,
    success: function(res) {
      if (checkRes(res) === false) return;
      var listbox = new Listbox();
      try {
        listbox.getOptions_cargoName(res, resultContainer);
      } catch(e) {
        throw new Error(e);
      }      
    }
  });
}
// 新增优惠：提交优惠
function fetch_sta_submitDiscountPage(url, data) {
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
        throw new Error(res.msg);
      }
    }
  });
}
