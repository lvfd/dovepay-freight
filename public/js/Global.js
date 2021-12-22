var Glob_fn = {
  errorHandler: function(error) {
    if (console) {
      console.error(error);
    }
    UIkit.modal.alert(error);
  },
  inheritPrototype: function(superType, subType) {  // 继承函数：
    var prototype = Object(superType.prototype);  //创建对象
    prototype.constructor = subType;              //增强对象
    subType.prototype = prototype;                //指定对象
  },
  initMain: function() {
    const headerH = 73
    const navH = 40
    const footerH = 90
    const browserH = window.outerHeight
    const browserVisibleH = window.innerHeight
    // console.log(browserH, browserVisibleH)
    var dH = browserVisibleH - headerH - navH - footerH;
    document.querySelector('main').setAttribute("style", "min-height:" + dH + "px")
  },
  initNav: function() {
    var btns = document.querySelectorAll('#dpfNav button')
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function(){
        event.stopPropagation()
        var thisBtnCls = this.querySelector('i').classList
        var dropdown = this.nextElementSibling
        if (thisBtnCls.contains('fa-caret-down')) {
          for (var j = 0; j < btns.length; j++) {
            btns[j].querySelector('i')
              .setAttribute('class', 'fa fa-caret-down')
            btns[j].nextElementSibling.setAttribute('style', 'display:none')
          }
          thisBtnCls.remove('fa-caret-down')
          thisBtnCls.add('fa-caret-up')
          dropdown.setAttribute('style', 'display:block')
        } else {
          this.blur()
          thisBtnCls.remove('fa-caret-up')
          thisBtnCls.add('fa-caret-down')
          dropdown.setAttribute('style', 'display:none')
        }
      }, false)
    }
    document.addEventListener('click', function(){
      for (var i = 0; i < btns.length; i++) {
        btns[i].nextElementSibling.setAttribute('style', 'display:none')
        btns[i].querySelector('i').setAttribute('class', 'fa fa-caret-down')
      }
    })
  },
  initQuirBtn: function() {
    var quitBtn = document.querySelector('header #quitBtn');
    quitBtn.addEventListener('click', function() {
      window.location.href = this.getAttribute('data-url');
    });
  },
  loading: {
    show: function() {
      var main = document.querySelector('main');
      var div = document.createElement('div');
      div.setAttribute('id', 'loadingOverlay');
      div.setAttribute('class', 'uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle');
      div.innerHTML = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Loading...</span>';
      main.appendChild(div);
      return div;
    },
    hide: function() {
      var div = document.querySelectorAll('#loadingOverlay');
      if (!div || div.length === 0) {
        throw new Error('没有loading遮罩');
      }
      if (div.length > 1) {
        throw new Error('存在多个loading遮罩');
      }
      for (var i = 0; i < div.length; i++) {
        div[i].parentNode.removeChild(div[i]);
      }
    }
  },
  WdateInit: function(startTimeId, endTimeId) {
    var sta = document.getElementById(startTimeId);
    var end = document.getElementById(endTimeId);
    sta.addEventListener('click', function() {
      WdatePicker({
        dateFmt: 'yyyy-MM-dd',
        maxDate: '#F{$dp.$D(\'' + endTimeId + '\')}'
      });
    });
    end.addEventListener('click', function() {
      WdatePicker({
        dateFmt: 'yyyy-MM-dd',
        minDate: '#F{$dp.$D(\'' + startTimeId + '\')}'
      });
    });
  },
  banBackSpace: function(event) {
    var ev = event || window.event;
    var obj = ev.target || ev.srcElement;
    var t = obj.type || obj.getAttribute('type');
    var vReadOnly = obj.getAttribute('readonly');
    vReadOnly = (vReadOnly == '') ? false : vReadOnly;
    var flag1 = (ev.keyCode == 8 && (t == 'password' || t == 'text' || t == 'number' || t =='textarea') && vReadOnly != undefined) ? true : false;
    var flag2 = (ev.keyCode == 8 && t != 'password' && t != 'text' && t != 'number' && t != 'textarea') ? true : false;
    if (flag2) {
      return false;
    }
    if (flag1) {
      return false;
    }
  },
  submVirtForm: function(url, obj) {
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
    showNoData: function(colspan) {
      var tr0 = document.createElement('tr');
      var td0 = document.createElement('td');
      td0.innerText = '无数据';
      td0.setAttribute('colspan', colspan);
      td0.setAttribute('class', 'uk-text-center');
      tr0.appendChild(td0);
      // 清空分页组件：
      var pag = document.querySelector('ul[data-for=dataTable]');
      pag.innerHTML = '';

      return tr0;
    },
    getThTr: function(table) {
      var thead = table.querySelector('thead');
      thead.innerHTML = '';
      var trInThead = document.createElement('tr');
      thead.appendChild(trInThead);
      return trInThead;
    },
    setTh: function(parentTr, content) {
      var th = document.createElement('th');
      if (typeof content == 'object') {
        th.appendChild(content);
      } else {
        th.innerText = content;
      }
      parentTr.appendChild(th);
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
        var data = '-';
        var feeIdGroup = feeIdArr[i];
        for (var j = 0; j < feeIdGroup.length; j++) {
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
    getAjaxTitleObject: function(feeIdArr, dataList) {
      var arr = [];
      for (var i = 0; i < feeIdArr.length; i++) {
        var feeIdGroup = feeIdArr[i];
        for (var j = 0; j < feeIdGroup.length; j++) {
          var titleFeeId = feeIdGroup[j];
          for (var k = 0; k < dataList.length; k++) {
            var listFeeId = dataList[k].feeId;
            if (titleFeeId == listFeeId) {
              var obj = dataList[k];
            }
          }
        }
        if (obj !== null) {
          arr.push(obj);
          obj = null;
        }       
      }
      return arr;
    },
    buildValueWithAjaxTitle: function(data, parentNode) {
      for (var i = 0; i < data.length; i++) {
        var td = document.createElement('td');
        td.innerText = data[i];
        parentNode.appendChild(td);
      }
    },
    getCheckbox: function(ifAll) {
      var lab = document.createElement('label');
      lab.setAttribute('class', 'void');
      var chb = document.createElement('input');
      lab.appendChild(chb);
      chb.setAttribute('type', 'checkbox');
      chb.setAttribute('class', 'uk-checkbox');
      if (ifAll) {
        chb.setAttribute('id', 'selectAll');
        chb.setAttribute('disabled', '');
      } else {
        chb.setAttribute('class', 'cb_child');
      }
      chb.addEventListener('click', function(event) {
        var btn = document.getElementById('multiBtn');
        if (!btn) {
          throw new Error('没有对应按键');
          return;
        }
        if (this.checked) {
          btn.removeAttribute('disabled');
        } else {
          btn.setAttribute('disabled', '');
        }
      });
      return lab;
    },
    linkCheckboxes: function(selAll, selChildren) {
      selAll.addEventListener('click', function(event) {
        if (selAll.checked) {
          for (var i = 0; i < selChildren.length; i++) {
            if (!selChildren[i].checked) {
              selChildren[i].click();
            }
          }
        } else {
          for (var i = 0; i < selChildren.length; i++) {
            if (selChildren[i].checked) {
              selChildren[i].click();
            }
          }
        }
      });
    },
    addCheckedToList: function(chb, list) {
      for ( var i = 0; i < chb.length; i++) {
        if (chb[i].checked) {
          var data = chb[i].getAttribute('data-checked');
          list.push(data);
        } else {
          continue;
        }
      }
    }
  },
  getDictArg_forQueryBills: function() {
    var tType = document.querySelector('input[name=type]').value;
    if (!tType) {
      throw new Error('没有type参数');
      return null;
    }
    if (tType == '1' || tType == '2') {
      // 直达时货运类型查询
      return 'EXPIMP';
    } else if (tType  == '3') {
      // 中转时货运类型
      return 'TRANSFERTYPE';
    } else if (tType == '4') {
      // 快件货运类型
      return 'EXPMAIL';
    }
  },
  setSelDefaultOption: function(select, text, value) {
    var option0 = document.createElement('option');
    option0.setAttribute('value', value);
    option0.innerText = text;
    select.appendChild(option0);
  },
  setSelFromDict: function(select, data) {
    for (var i = 0; i < data.length; i++) {
      var option = document.createElement('option');
      option.innerText = data[i].value;
      option.value = data[i].key;
      select.appendChild(option);
    }
  },
  setInAndOut: function (res) {
    var data = res.data;
    if (data == null || data.length == 0) {
      throw new Error('字典接口无数据');
    }
    var select = document.querySelector('select[name=inAndOut]');
    this.setSelDefaultOption(select, '全部', '-1');
    try {
      this.setSelFromDict(select, data);
    } catch(e) {
      throw new Error(e);
    }
  },
  setOpedepartId: function (res) {
    var data = res.data;
    if (data == null || data.length == 0) {
      throw new Error('字典接口无数据');
    }
    var select = document.querySelector('select[name=opedepartId]');
    this.setSelDefaultOption(select, '全部', '-1');
    try {
      this.setSelFromDict(select, data);
    } catch(e) {
      throw new Error(e);
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