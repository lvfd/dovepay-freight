function initLogin_page() {
  var pageFor = document.querySelector('input[name=pagefor]').value;
  var sel_type = document.querySelector('select[name=userType]');
  var inp_accountId = document.querySelector('input[name=accountId]');
  var form = document.getElementById('form_login');
  var inp_userId = document.querySelector('input[name=userId]');
  if (pageFor === 'system') {
    inp_accountId.value = 'system';
    sel_type.value = 'system';
    form.submit();
  } else {
    var url = document.querySelector('input[name=api_role]').value;
    inp_userId.addEventListener('change', function(event) {
      event.preventDefault();
      fetchData();
    });
    fetchData();
  }
  function fetchData() {
    var data = {
      'userId': inp_userId.value
    };
    var inp_accountId = document.querySelector('input[name=accountId]');
    inp_accountId.value = '';
    fetch_login_getRole(url, data);
  }
}
function initLogin_initQuirBtn() {
  var quitBtn = document.getElementById('quitBtn');
  quitBtn.addEventListener('click', function() {
    // window.location.href = this.getAttribute('data-url');
    var url = this.getAttribute('data-url');
    var userType = document.getElementById('userType').value;
    var data = {
      userType: userType
    };
    console.log(data)
    fetch_login_logout(url, data);
  });
}

function Page_login() {}
Page_login.prototype.setRole = function(res) {
  if (res.code != 200) {
    UIkit.modal.alert(res.code + ': ' + res.msg);
    // then() => redirect to dovepay
    return;
  }
  var data = res.data;
  var accountId = data.accountId;
  var type = data.type;
  var inp_accountId = document.querySelector('input[name=accountId]');
  var sel_type = document.querySelector('select[name=userType]');
  var form = document.getElementById('form_login');
  inp_accountId.value = accountId;
  sel_type.value = type;
  if (!!inp_accountId.value && !!sel_type.value) {
    form.submit();
  } else {
    UIkit.modal.alert('参数错误: accountId=' + accountId + ', type=' + type).then(function(){
      // redirect();
    });
  }
}