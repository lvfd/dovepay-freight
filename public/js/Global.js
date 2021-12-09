var Glob_fn = {
  inheritPrototype: function(superType, subType) {  // 继承函数：
    var prototype = Object(superType.prototype);  //创建对象
    prototype.constructor = subType;              //增强对象
    subType.prototype = prototype;                //指定对象
  },
  initDiscoutTypeSel: function(dataList, parentSelect) {
    var op0 = document.createElement('option');
    op0.setAttribute('value', 'TYPE');
    op0.innerText = '全部';
    parentSelect.appendChild(op0);
    for (var i = 0; i < dataList.length; i++) {
      var op = document.createElement('option');
      op.setAttribute('value', dataList[i].key);
      op.innerText = dataList[i].value;
      parentSelect.appendChild(op);
    }
  },
  initSupplierSel: function(dataList, parentSelect) {
    var op0 = document.createElement('option');
    op0.setAttribute('value', '');
    op0.innerText = '全部';
    parentSelect.appendChild(op0);
    for (var i = 0; i < dataList.length; i++){
      var op = document.createElement('option');
      op.setAttribute('value', dataList[i].supplierId);
      op.innerText = dataList[i].supplierNameChn;
      parentSelect.appendChild(op);
    }
  },
  initDiscountDetails: function(data) {
    document.getElementById('discountPolicyName').value = data.discountPolicyName;
    document.getElementById('status').value = data.statusDesc;
    document.getElementById('startTime').value = data.startTime;
    document.getElementById('endTime').value = data.endTime;
    document.getElementById('discountType').value = data.discountTypeDesc;
    document.getElementById('minCharge').value = data.minCharge;
    document.getElementById('feerateValue').value = getFeerate();
    function getFeerate() {
      var list = data.discountFeeRequestList;
      if (list.length < 1) return null;
      var result = '';
      for (var i = 0; i < list.length; i++) {
        if (list[i].discountFeeType == 'rate') {
          result = list[i].discountFeeValue;
        }
      }
      return result;
    }
    // 输出品名：
    var cargoNameWrap = document.getElementById('cargoName');
    if (data.cargoName) {
      var label = document.createElement('label');
      label.innerText = '优惠品名项';
      cargoNameWrap.appendChild(label);
      var div = document.createElement('div');
      div.setAttribute('class', 'uk-margin-small uk-margin-small-left');
      div.innerText = data.cargoName;
      cargoNameWrap.appendChild(div);
    } else if (cargoNameWrap.innerHTML) {
      cargoNameWrap.innerHTML = '';
    }
    // 输出discountValue：
    var discountValueWrap = document.getElementById('discountValue');
    if (data.discountValue) {
      var label = document.createElement('label');
      if (data.discountType == 'F')
        label.innerText = '优惠航班';
      else if (data.discountType == 'WP')
        label.innerText = '优惠航点';
      else if (data.discountType == 'G')
        label.innerText = '优惠支持方式';
      else
        label.innerText = '优惠值';
      discountValueWrap.appendChild(label);
      var div = document.createElement('div');
      div.setAttribute('class', 'uk-margin-small uk-margin-small-left');
      div.innerText = data.discountValue;
      discountValueWrap.appendChild(div);
    } else if (discountValueWrap.innerHTML) {
      discountValueWrap.innerHTML = '';
    }
    
    var table = document.getElementById('discountFeeRequestList');
    var tbody = getTbody();
    table.appendChild(tbody);
    function getTbody() {
      var tbody = document.createElement('tbody');
      var list = data.discountFeeRequestList;
      for (var i = 0; i < list.length; i++) {
        var tr = document.createElement('tr');
        if (list[i].discountFeeType == 'rate') {
          continue;
        } else {
          var td1 = document.createElement('td');
          td1.innerText = list[i].discountFeeKeyName;
          var td2 = document.createElement('td');
          td2.innerText = list[i].discountFeeTypeDesc;
          var td3 = document.createElement('td');
          td3.innerText = list[i].discountFeeValue;
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tbody.appendChild(tr);
        }
      }
      return tbody;
    }
  },
  Table: {
    buildNormalThead: function(table, titleListArr) {
      var thead = table.querySelector('thead');
      thead.innerHTML = '';
      var trInThead = document.createElement('tr');
      thead.appendChild(trInThead);
      
      for(var i = 0; i < titleListArr; i++) {
        setTh(trInThead, titleListArr[i])
      }

      function setTh(tr, title) {
        var th = document.createElement('th');
        th.innerText = title;
        tr.appendChild(th);
      }
    },
    showNoData: function(colspan) {
      var tr0 = document.createElement('tr');
      var td0 = document.createElement('td');
      td0.innerText = '无数据';
      td0.setAttribute('colspan', colspan);
      td0.setAttribute('class', 'uk-text-center');
      tr0.appendChild(td0);
      return tr0;
    },
    buildAjaxTitle: function(titleData, parentNode) {
      for (var i = 0; i < titleData.length; i++) {
        var list = titleData[i];
        if (list.feeId == '-1-2-') {
          var th0 = document.createElement('th');
          th0.innerText = '地面费率';
          parentNode.appendChild(th0);
        }
        var th = document.createElement('th');
        th.innerText = list.feeShortNm;
        parentNode.appendChild(th); 
      }
    },
    getAjaxTitleValue: function(data, key) {
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        var value = data[i][key].toString().replace(/-/g, '#')
                  .match(/-?([1-9]\d*(\.\d*)*|0\.[1-9]\d*)/g);
        arr.push(value);
      }
      return arr;
    },
    getAjaxTitleData: function(title, feeIdArr, dataList) {
      var arr = [title];
      for (var i = 0; i < feeIdArr.length; i++) {
        var feeIdGroup = feeIdArr[i];
        for (var j = 0; j < feeIdGroup.length; j++) {
          var data = '-';
          var titleFeeId = feeIdGroup[j];
          for (var k = 0; k < dataList.length; k++) {
            var listFeeId = dataList[k].feeId;
            var listValue = dataList[k].fee === null? '-': dataList[k].fee;
            var listRate = dataList[k].feerate;
            if (titleFeeId == listFeeId) {
              if (listRate) {
                arr.push(listRate);
              }
              data = listValue;
            }
          }
        }
        arr.push(data);
      }
      return arr;
    },
    buildValueWithAjaxTitle: function(data, parentNode) {
      for (var i = 0; i < data.length; i++) {
        var td = document.createElement('td');
        td.innerText = data[i];
        parentNode.appendChild(td);
      }
    }
  },
  getPagi_liPre: function(parentUl) {
    var li_pre = document.createElement('li');
    li_pre.setAttribute('class','function');
    parentUl.appendChild(li_pre);
    var link_pre = document.createElement('a');
    li_pre.appendChild(link_pre);
    var span_pre = document.createElement('span');
    span_pre.setAttribute('uk-pagination-previous', '');
    link_pre.appendChild(span_pre);
    return link_pre;
  },
  getPagi_liNext: function(parentUl) {
    var li_nex = document.createElement('li');
    li_nex.setAttribute('class','function');
    parentUl.appendChild(li_nex);
    var link_nex = document.createElement('a');
    li_nex.appendChild(link_nex);
    var span_nex = document.createElement('span');
    span_nex.setAttribute('uk-pagination-next', '');
    link_nex.appendChild(span_nex);
    return link_nex;
  },
  getPagi_liActive: function(innerText) {
    var li = document.createElement('li');
    var span = document.createElement('span');
    span.innerText = innerText;
    li.setAttribute('class', 'uk-active');
    li.appendChild(span);
    return li;
  },
  getPagi_liNormal: function(innerText) {
    var li = document.createElement('li');
    var link = document.createElement('a');
    link.innerText = innerText;
    li.appendChild(link);
    return {
      li: li,
      link: link
    }
  },
  getPagi_hidePage: function(showNumber, parentNode, pageNumber, totalPage) {
    var showPages = showNumber;
    var liArr = parentNode.querySelectorAll('li:not(.function)');
    if (Number(pageNumber) > showPages+2 ) {
      for (var i = 1; i < Number(pageNumber)-showPages-1; i++) {
        liArr[i].style.display = 'none';
      }
      var li = this.getPagi_liActive('...');
      parentNode.insertBefore(li, liArr[1]);
    }
    if (totalPage-pageNumber > showPages+1) {
      for (var i = Number(pageNumber)+showPages; i < totalPage-1; i++) {
        liArr[i].style.display = 'none';
      }
      var li = this.getPagi_liActive('...');
      parentNode.insertBefore(li, liArr[totalPage-1]);
    }
  }
};
// function SuperType(){
//   this.name = 'name'; 
//   this.colors = ["red","blue","green"];
//   this.fn = function(){
//     var num = 1;
//     var arr = [];
//     arr.push(num);
//     return arr
//   };
//   this.fnPri = SuperType.fn_private();
// }
// SuperType.prototype.fn_p = function(){
//   var i = 1;
//   i++
//   return i;
// };
// SuperType.fn_private = function() {console.log("pri")};

// function SubType(name,age){
//   SuperType.call(this);   //只调用一次SuperTyper()
//   this.age = age;
//   this.colors = ["red"];
//   this.fn = function(){
//     this.colors.push('black');
//     return this.colors;
//   };
// }
// //继承方法
// Glob_fn.inheritPrototype(SubType,SuperType);
// SubType.prototype.fn2 = function() {
//   this.colors.push('purple');
//   return this.colors;
// };
// SubType.prototype.fn3 = function() {
//   this.colors.push('purple2');
//   return this.colors;
// };
// var subType = new SubType('name', 3);
// console.log(subType.fnPri())