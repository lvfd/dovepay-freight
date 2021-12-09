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
  console.error('xhr: ', xhr, 'settings: ', settings);
  // var text = '', mes = '',
  //     main = document.querySelector('.maincontent'),
  //     form = document.querySelector('form.fn_showTab');
  // // for ( var p in settings) {
  // //   text += p + ': ' + settings[p] + '<br>';
  // // }
  // mes = fn_getMes({title: xhr.status, text: xhr.statusText}, {style: 'danger'});
  // if (form) {
  //   main.insertBefore(mes, form.nextSibling);
  // } else {
  //   main.appendChild(mes);
  // }
  UIkit.modal.alert(xhr.statusText);
});
$(document).ajaxStart(function() {
  console.log('Requesting...');
  // $( "#loading" ).show();
 });
// $(document).ajaxSend(function(event, xhr, settings) {
//   console.log(xhr);
// });
// $(document).ajaxSuccess(function(event, xhr, settings) {
//   console.info(xhr);
// });
function checkRes (res) {
  if (res.code != '200') {
    alert(res.msg);
    return false;
  }
}