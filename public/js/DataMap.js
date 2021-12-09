var DataMapFn = {
  fn_getThData_simple: function(obj) {
    var theadData = [],
    fixedTheadData = this.queryFromArray(obj.res.class2, 'exp');
    theadData = this.addToArr(fixedTheadData, obj.args.addTit);
    return theadData;
  },
  fn_getTbData_simple: function(data, obj, type) {
    if ( !data.data[obj.res.class1] ) {
      return '无数据';
    }
    var actionName = '';
    if (type == 'station') {
      actionName = '推送账单';
    }
    if (type == 'agent') {
      actionName = '付款'
    }
    var tbodyData = [],
        allData = data.data[obj.res.class1],
        fixedQueryNames = this.queryFromArray(obj.res.class2, 'name'),
        postData = '',
        ccustomerId = '';
    for ( i = 0; i < allData.length; i++) {  // 遍历每行数据
      var values = [],
          keys = Object.keys(allData[i]);
      for ( var j = 0; j < fixedQueryNames.length; j++) {  // 遍历需要展示的每个key
        var el = '-';
        for ( var k = 0; k < keys.length; k++) { // 遍历每行数据的每个key
          var key = keys[k],
              name = fixedQueryNames[j];
          if ( key == name) { // 匹配
            if ( allData[i][key] === null) {
              el = '-';
            } else {
              el = allData[i][key];
            }
            if (key == 'orderNo') {
              postData = allData[i][key];
            }
            if (key == 'customerId') {
              customerId = allData[i][key];
            }
          }
        }
        values.push(el);
      }  // 获取主体
      values.unshift({name: 'serial', value: i + 1});  // 添加序号
      if ( type == 'station' || type == 'agent') {
        var actionFlag = false;
        for ( var j = 0; j < keys.length; j++) { // 遍历每行数据的每个key
          var key = keys[j],
              keyFlag = '',
              valFlag = '';
          if (type == 'station') {
            keyFlag = (key == 'confirm');
            valFlag = (allData[i][key] == '0' && allData[i].payMode != 'CS' && allData[i].bindingStatus == '1');
          }
          if (type == 'agent') {
            keyFlag = (key == 'status');
            valFlag = (allData[i][key] == ('1' || '3') && allData[i].payMode != 'CS');
          }
          if (keyFlag && valFlag) {
            actionFlag = true;
          }
        }
        if ( actionFlag ) {
          values.push({action: '查询', url: 'billDetails/', data: postData, type: type, modify: '/modify' },
                      {action: actionName, url: 'table>data-pay', data: postData, type: type});  // 收银台(货代)账单推送(货站)
        } else {
          values.push({action: '查询', url: 'billDetails/', data: postData, type: type, modify: '/readonly', colspan: 2});
        }
      }
      if ( type == 'userInfo') {
        var discSetF = false; // 优惠设置
        var discShoF = false; // 优惠查看
        for ( var j = 0; j < keys.length; j++) {
          var key = keys[j];
          var keyFlag1 = (key == 'feeWayId'),
              valFlag1 = (allData[i][key] == 'MP' && allData[i].canYes == '0'), // 使用中&&月结
              valFlag2 = (allData[i][key] == 'MP');
          if (keyFlag1 && valFlag1) { discSetF = true; }
          if (keyFlag1 && valFlag2) { discShoF = true; }
        }
        if ( discSetF ) {
          values.push({action: '优惠设置', customerId: customerId, url: '#discSet'},
            {action: '优惠查看', customerId: customerId, url: '#discShow'});
        } else if ( discShoF ) {
          values.push({action: '优惠查看', customerId: customerId, url: '#discShow'});
        } else {
          values.push({action: '-', colspan: 2});
        }
      }
      tbodyData.push(values);  // 添加一行
    }
    return tbodyData; // array    
  },
  fn_getThData_compli: function(data, obj) {
    var theadData = [],
        fixedData = this.queryFromArray(obj.res.class2, 'exp'),
        ajaxData = [],
        ajaxData_raw = [],
        ajaxDataAttr = [],
        key = 'feeShortNm',
        keyAttr = 'feeId',
        rateName = '地面费率',
        rateFeeId = Cons.rateId;  // 处置费
    fixedData.push('账单类型');
    if ( !data.data ) {
      throw new Error('初始化表头错误。');
    } else {
      ajaxData_raw = data.data;
    }
    for ( var i = 0; i < ajaxData_raw.length; i++) {  // 遍历ajax表头原始data
      var val1 = ajaxData_raw[i][key],
          val2 = ajaxData_raw[i][keyAttr];
      if ( !val1 || !val2 ) {
        throw new Error('表头信息数据格式错误');
      } else {
        var arr = val2.toString().replace(/-/g, '#')
                  .match(/-?([1-9]\d*(\.\d*)*|0\.[1-9]\d*)/g),
            arrFlag = false;
        for (var j = 0; j < arr.length; j++) {
          if (arr[j] == rateFeeId) {
            arrFlag = true;
          }
        }
        if (arrFlag) {
          ajaxData.push(rateName, val1);
        } else {
          ajaxData.push(val1);
        }
        ajaxDataAttr.push(val2);
      }
    }
    obj.marryAttr = ajaxDataAttr;
    theadData = fixedData.concat(ajaxData);
    theadData = this.addToArr(theadData, obj.args.addTit);
    return theadData;    
  },
  fn_getTbData_compli: function(data, obj, args) {
    var type = args? args.type: null;
    if ( !data.data[obj.res.class1] ) {
      return '无数据';
    }
    var fixedData = [],
        ajaxData = [],
        allData = data.data[obj.res.class1],
        marryAttr = obj.marryAttr, // array of feeId
        ajaxDataAttr = obj.ajaxDataAttr
        fixedQueryNames = this.queryFromArray(obj.res.class2, 'name'),
        child_listName1 = 'feeItemList',
        child_listName2 = 'realFeeItemList';
    for ( var i = 0; i < allData.length; i++) {
      var child = this.queryFromObject(allData[i], fixedQueryNames),
          child_list1 = allData[i][child_listName1],
          child_list2 = allData[i][child_listName2];
      if ( !child_list1 || !child_list2) {
        throw new Error('数据格式错误');
      }
      child.unshift({name: 'serial', value: i + 1}); // 添加序号
      fixedData.push(child);
      // console.log(allData[i].realFeeItemList);
      var ajaDatL1_raw = JSON.parse(allData[i].feeItemList),
          ajaDatL2_raw = JSON.parse(allData[i].realFeeItemList),
          ajaDatL1 = this.getV2AFrmLisByV1A(ajaDatL1_raw, 'feeId', marryAttr, 'fee').result,
          ajaDatL2 = this.getV2AFrmLisByV1A(ajaDatL2_raw, 'feeId', marryAttr, 'fee').result,
          updData = '';
      ajaDatL1.unshift('原始账单');
      ajaDatL2.unshift('开账账单');
      ajaDatL1.push(allData[i].totalFeeStr);
      ajaDatL2.push(allData[i].realTotalFeeStr);
      if ( type == 'station') {
        var mdfVal = document.querySelector('input[name=modify]').value;
        flag = (mdfVal === 'modify');
        updData = {
          "stockNo": allData[i].stockNo,
          "totalFee": allData[i].totalFeeStr,
          "feeWt": allData[i].feeWt,
          "feeItemList": 
            this.getV2AFrmLisByV1A(ajaDatL2_raw, 'feeId', marryAttr, 'fee').object
        };
        ajaDatL1.push('-');
        ajaDatL2.push(flag? { action: '修改', url: '#modify', updData: updData}: '-');
      }
      ajaxData.push([ajaDatL1,ajaDatL2]);
    }
    return { fixed: fixedData, ajax: ajaxData };    
  },
  queryFromArray: function(array, name) {
    var valueArray = [],
        count = array.length;
    for (var i = 0; i < count; i++) {
      if (array[i][name]) {
        valueArray.push(array[i][name]);        
      }
    }
    return valueArray;
  },
  queryFromObject: function(obj, nameArr) {
    var values = [],
        keys = Object.keys(obj); // ==> arr
    for ( var j = 0; j < nameArr.length; j++) {
      var el = '-'
      for ( var i = 0; i < keys.length; i++ ) {
        var key = keys[i],
            name = nameArr[j];
        if ( key == name) {
          el = obj[key] ? obj[key] : '-';
        }
      }
      values.push(el);
    }
    return values;
  },
  addToArr: function(titArr, addTitArr) {
    var newTitArr = titArr,
        count = addTitArr.length;
    for (var i = 0; i < count; i++) {
      var name = addTitArr[i].name,
          index = addTitArr[i].index;
      if (index == 'last') {
        newTitArr.push(name);
      } else {
        newTitArr.splice(index, 0, name);
      }
    }
    return newTitArr;
  },
  getV2AFrmLisByV1A: function(rawListA, matchkey, matValA, resultkey) {
    // console.log(rawListA,matValA)
    var resultArr = [],
        objectArr = [],
        rateFeeId = Cons.rateId;
    for ( var j = 0; j < matValA.length; j++ ) {
      var el = '-',
          rateFlag = false;
      for ( var i = 0; i < rawListA.length; i++ ) {
        var arr = matValA[j].toString().replace(/-/g, '#')
                  .match(/-?([1-9]\d*(\.\d*)*|0\.[1-9]\d*)/g);  // arr'[1,2]'
        for (var k = 0; k < arr.length; k++ ) {
          if ( rawListA[i][matchkey] == arr[k] ) {
            // console.log(rawListA[i][matchkey])  // 2,6,19
            if (arr[k] == rateFeeId) {
              rateFlag = true;
              var feerate = rawListA[i].feerate? rawListA[i].feerate: '-';
            }
            // if (rawListA[i][resultkey] !== null) {
              el = rawListA[i][resultkey];
              var obj = rawListA[i];
            // }
          }
        }
        // if ( rawListA[i][matchkey] == matValA[j]) {  // matValA[j]'-1-2-'
        //   el = rawListA[i][resultkey] ? rawListA[i][resultkey] : '-';
        // }
      }
      if (rateFlag) {
        resultArr.push(feerate, el);
      } else {
        resultArr.push(el);
      }
      if (obj !== null) {
        objectArr.push(obj);
        obj = null;
      }
    }
    return {
      result: resultArr,
      object: objectArr
    };
  }
}
var DataMap = {
  Table: {
    consumer_consumerQueryBill: {
      res: {
        class1: "summaryList",
        class2: [
          {name: "createTimeStr",  exp: "开账时间"},
          {name: "time",  exp: "账期"},
          {name: "type",  exp: "货运类型"},
          {name: "orderNo",  exp: "结算订单号"},
          {name: "payNo",  exp: "支付订单号"},
          {name: "totalFee",  exp: "费用汇总",},
          {name: "realTotalFee",  exp: "优惠后费汇总"},
          {name: "status",  exp: "结算状态"},
          {name: "payModeStr",  exp: "计费方式"}
        ]
      },
      args: {
        addTit: [
          {name: '序号', index: 0},
          {name: '操作', index: 'last'}
        ]
      },
      theadData: function(data) {
        return DataMapFn.fn_getThData_simple(this);
      },
      tbodyData: function(data) {
        return DataMapFn.fn_getTbData_simple(data, this, 'agent');
      }
    },
    consumer_consumerQueryBillDetails: {
      res: {
        class1: "feeList",
        class2: [
          {name: "feeRecId", exp: "费用记录编号"},
          {name: "stockPre", exp: "运单前缀"},
          {name: "stockNo", exp: "运单号"},
          {name: "cargoNm", exp: "品名"},
          {name: "sAirportId", exp: "运单始发站"},
          {name: "sAirportDsc", exp: "运单目的站"},
          {name: "flight", exp: "航班号"},
          {name: "pcs", exp: "件数"},
          {name: "weight", exp: "重量"},
          {name: "feeWt", exp: "计费重量"},
          {name: "crtopeTime", exp: "计费时间"},
          {name: "opedepartId", exp: "计费营业点"}
        ]
      },
      args: {
        addTit: [
          {name: '序号', index: 0},
          {name: '金额', index: 'last'}
        ]
      },
      marryAttr: '',
      theadData: function(data) {
        return DataMapFn.fn_getThData_compli(data, this);
      },
      tbodyData: function(data) {
        return DataMapFn.fn_getTbData_compli(data, this);
      }
    },
    station_stationQueryBill: {
      res: {
        class1: "summaryList",
        class2: [
          {name: "createTimeStr",  exp: "开账时间"},
          {name: "time",  exp: "账期"},
          {name: "type",  exp: "货运类型"},
          {name: "orderNo",  exp: "结算订单号"},
          {name: "payNo",  exp: "支付订单号"},
          {name: "totalFee",  exp: "费用汇总",},
          {name: "realTotalFee",  exp: "优惠后费汇总"},
          {name: "status",  exp: "结算状态"},
          {name: "payModeStr",  exp: "计费方式"},
          {name: "customerId",  exp: "客户代码"},
          {name: "customerName",  exp: "客户名"}
        ]
      },
      args: {
        addTit: [
          {name: '序号', index: 0},
          {name: '操作', index: 'last'}
        ]
      },
      theadData: function(data) {
        return DataMapFn.fn_getThData_simple(this);
      },
      tbodyData: function(data) {
        return DataMapFn.fn_getTbData_simple(data, this, 'station');
      }
    },
    station_stationQueryBillDetails: {
      res: {
        class1: "feeList",
        class2: [
          {name: "feeRecId", exp: "费用记录编号"},
          {name: "stockPre", exp: "运单前缀"},
          {name: "stockNo", exp: "运单号"},
          {name: "cargoNm", exp: "品名"},
          {name: "sAirportId", exp: "运单始发站"},
          {name: "sAirportDsc", exp: "运单目的站"},
          {name: "flight", exp: "航班号"},
          {name: "pcs", exp: "件数"},
          {name: "weight", exp: "重量"},
          {name: "feeWt", exp: "计费重量"},
          {name: "crtopeTime", exp: "计费时间"},
          {name: "opedepartId", exp: "计费营业点"}
        ]
      },
      args: {
        addTit: [
          {name: '序号', index: 0},
          {name: '金额', index: 'last'},
          {name: '操作', index: 'last'}
        ]
      },
      marryAttr: '',
      theadData: function(data) {
        return DataMapFn.fn_getThData_compli(data, this);
      },
      tbodyData: function(data) {
        return DataMapFn.fn_getTbData_compli(data, this, {type: 'station'});
      }
    },
    station_getStationAllConsumer: {
      res: {
        class1: "consumerList",
        class2: [
          {name: "customerId", exp: "客户代码"},
          {name: "customerNameChn", exp: "货运公司全称"},
          {name: "statusDesc", exp: "状态"},
          {name: "canYesDesc", exp: "用户状态"},
          {name: "feeWayDesc", exp: "结算方式"},
        ]
      },
      args: {
        addTit: [
          {name: '序号', index: 0},
          {name: '操作', index: 'last'}
        ]
      },
      theadData: function(data) {
        return DataMapFn.fn_getThData_simple(this);
      },
      tbodyData: function(data) {
        return DataMapFn.fn_getTbData_simple(data, this, 'userInfo');
      }
    }
  }
};