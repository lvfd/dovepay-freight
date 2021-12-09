var btns = document.querySelectorAll('nav button')
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