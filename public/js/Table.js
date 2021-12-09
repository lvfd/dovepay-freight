//
function Table(data, from, indexPage, args) {
  this.data = data;
  this.from = from;  // form name
  this.indexPage = indexPage;
  this.id = args ? args.id : null; // *
}
Table.prototype.showDiscount = function() {
  var tbody = document.createElement('tbody');
  var data = this.data.data;
  console.log(data);
  if (data.length < 1) {
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
        td3.appendChild(getActionText(data[i][key]));
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
    var link = td3.querySelector('a');
    link.addEventListener('click', function(event) {
      event.preventDefault();
      var discountPolicyId = tr.querySelector('td[data-arg=discountPolicyId]').innerText;
      var customerId = tr.querySelector('td[data-arg=customerId]').innerText;
      var status = this.getAttribute('data-status');
      var postData = {
        discountPolicyId: discountPolicyId,
        customerId: customerId,
        status: status
      }
      $(this).fn_discSorS(postData);
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
  function getActionText(status) {
    var link = document.createElement('a');
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
    return link;
  }
};
Table.prototype.create = function(args) { // { titleApi:,}
  try {
    var tbodyData = this.data,
        from = this.from,
        tableId = this.id,
        indexPage = this.indexPage,
        api = args ? args.titleApi : null;
    if (api) {
      $.ajax({
        url: api,
        success: function(data) {
          Table.create({
            theadData: data,
            tbodyData: tbodyData,
            from: from,
            indexPage: indexPage,
            tableId: tableId  // *
          });
        }
      });
    } else {
      Table.create({
        tbodyData: tbodyData,
        from: from,
        indexPage: indexPage,
        tableId: tableId  // *
      });
    }
  } catch (err) {
    console.error(err);
  }
};
Table.create = function(args) {
  var tableId = args.tableId,
      theadData = args.theadData ? 
                  args.theadData : null,
      tbodyData = args.tbodyData,
      from = args.from,
      indexPage = args.indexPage,
      map = DataMap.Table[from]
  Table.createHead({
    map: map,
    data: theadData,  // *
    tableId: tableId  // *
  });
  Table.createBody({
    tableId: tableId,
    data: tbodyData,
    indexPage: indexPage,
    map: map,
    form: from
  });
};
Table.createHead = function(args) {
  var tableId = args.tableId,  // *
      data = args.data,  // *
      map = args.map,   // DataMap.Table[from]
      thead = tableId ? 
        document.querySelector('table#' + tableId + ' > thead') :
        document.querySelector('thead'),
      tr = document.createElement('tr'),
      mappedData = map.theadData(data);
  thead.innerHTML = '';
  if (Array.isArray(mappedData)) {
    dataArr = mappedData;
    for ( var i = 0; i < dataArr.length; i++) {
      var th = document.createElement('th');
      th.innerHTML = dataArr[i]
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);
};
Table.createBody = function(args) {
  var tableId = args.tableId,
      data = args.data,
      indexPage = args.indexPage,
      map = args.map,
      tbody = tableId ? 
        document.querySelector('table#' + tableId + ' > tbody') :
        document.querySelector('tbody'),
      mappedData = map.tbodyData(data),
      form = args.form;
  tbody.innerHTML = '';
  if ( typeof mappedData == 'string') {
    var tr = document.createElement('tr'),
        td = document.createElement('td'),
        count = tbody.parentNode.querySelectorAll('th').length,
        pag = document.querySelector('ul.uk-pagination');
    td.innerHTML = mappedData;
    td.setAttribute('colspan', count);
    td.style.textAlign = 'center';
    tr.appendChild(td);
    tbody.appendChild(tr);
    if ( pag ) {
      pag.parentNode.removeChild(pag);
    }
  } else {
    if (Array.isArray(mappedData)) {
      dataArr = mappedData;
      for ( var i = 0; i < dataArr.length; i++) {
        var tr = document.createElement('tr'),
            datasInTr = dataArr[i];
        for (var j = 0; j < datasInTr.length; j++) {
          var td = document.createElement('td'),
              dataInTr = datasInTr[j];
          if (typeof dataInTr == 'object') {
            if (dataInTr.name === 'serial') {
              var countPage = document.querySelector('form[name="' + form + '"]').getAttribute('data-countPage') || 10;
              td.innerHTML = Number(dataInTr.value) + (Number(indexPage)-1) * Number(countPage);
            } else {
              Table.transToLink(tbody, td, dataInTr);
            }
          } else {
            td.innerHTML = dataInTr;
          }
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
    } else {
      var fixedData = mappedData.fixed,
          ajaxData = mappedData.ajax;
      if (fixedData.length !== ajaxData.length) {
        throw new Error('数据错误');
      } else {
        var lineCounts = fixedData.length;
        for ( var i = 0; i < lineCounts; i++) {
          var tr1 = document.createElement('tr'),
              tr2 = document.createElement('tr'),
              data1 = fixedData[i],
              data2 = ajaxData[i][0],
              data3 = ajaxData[i][1];
          for ( var j = 0; j < data1.length; j++) {
            var td = document.createElement('td');
            td.setAttribute('rowspan', 2);
            if (typeof data1[j] == 'object') {
              if (data1[j].name === 'serial') {
                var countPage = document.querySelector('form[name="' + form + '"]').getAttribute('data-countPage') || 10;
                td.innerHTML = Number(data1[j].value) + (Number(indexPage)-1) * Number(countPage);
              }
            } else {
              td.innerHTML = data1[j];
            }
            tr1.appendChild(td);
          }
          for ( var j = 0; j < data2.length; j++) {
            var td = document.createElement('td');
            td.innerHTML = data2[j];
            tr1.appendChild(td);
          }
          for ( var j = 0; j < data3.length; j++) {
            var td = document.createElement('td'),
                el = data3[j];
            if ( typeof el == 'object' ) {
              Table.transToLink(tbody, td, el);  
            } else {
              td.innerHTML = el;
            }
            tr2.appendChild(td);
          }
          tbody.appendChild(tr1);
          tbody.appendChild(tr2);
        }
      }
    }
    Table.createPagination(data.data, indexPage);
  }  
};
Table.transToLink = function(tbody, td, el) {
  if ( Array.isArray(el) ) {
    for ( var i = 0; i < el.length; i++) {
      trans(tbody, td, el[i]);
    }
  } else {
    trans(tbody, td, el);
  }
  function trans(tbody, td, el) {
    var a = document.createElement('a'),
        type = el.type,
        actionName = el.action,
        orderNo = el.data? el.data: null,
        url = orderNo? el.url + orderNo: el.url,
        colspan = el.colspan,
        table = tbody.parentNode;
    if (type == 'station') {
      url += el.modify;
    }
    if (el.url == 'table>data-pay') {   // 付款跳转
      url = table.getAttribute('data-pay');
      a.addEventListener('click', function(event){
        event.preventDefault();
        if (type == 'agent')
          $(this).fn_toPay(orderNo);  // 货代： 付款
        if (type == 'station')
          $(this).fn_toPush(orderNo); // 货站： 推送账单
      }); 
    }
    if (el.url == '#modify') {  // 调账模态
      a.addEventListener('click', function(event){
        event.preventDefault();
        $(this).fn_toUpdate(el.updData);
      });
    }
    if (el.url == '#discSet') {
      a.addEventListener('click', function(event) {
        event.preventDefault();
        $(this).fn_discSet(el.customerId);
      });
    }
    if (el.url == '#discShow') {
      a.addEventListener('click', function(evnet) {
        event.preventDefault();
        $(this).fn_discShow(el.customerId);
      });
    }
    a.href = url;
    a.innerHTML = actionName;
    td.appendChild(a);
    if (colspan) {
      td.setAttribute('colspan', colspan);
    }
  }
};
Table.createPagination = function(data, index) {
  var pag = new Pagination(data, index);
  pag.create();
}