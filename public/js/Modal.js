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
  var inp_spec = form.querySelector('input[name="' + Cons.rateId + '"]'),
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
    if ((list.name != 'feerate') && (list.name != Cons.rateId)) {
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
      if (list.name != ('feerate' || Cons.rateId)) {
        result += Number(list.value);
      }
    }
    return result;
  }
  function getSpecFee(feeWt, oldValue) {
    var result = 0,
    result = Number(feeWt) * Number(oldValue);
    console.log(result)
    return result;
  }
};
Modal.getPostData = function(form) {
  var postData = {
    stockNo: '',
    totalFee: '',
    feeItemList: []
  };
  var feeItemListNode = form.querySelectorAll('input[data-feeItemList]'),
      feerateNode = form.querySelector('input[name=feerate]');
  postData.stockNo = form.getAttribute('data-stockNo');
  postData.totalFee = form.querySelector('input[name=totalFee]').value;
  postData.remark = form.querySelector('textarea[name=description]').value;
  for (var i = 0; i < feeItemListNode.length; i++) {
    var obj = {};
    obj.feeId = feeItemListNode[i].name;
    if (obj.feeId == Cons.rateId) {
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
    var data = Modal.getPostData(form);
    $(this).fn_updateFee(data);
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
    if (feeId != Cons.rateId) throw new Error('feeId不匹配');
    var el1 = createInp('feerate'),
        el2 = createInp();
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
    if (input.getAttribute('name') == Cons.rateId) {
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