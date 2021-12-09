const quitBtn = document.querySelector('header #quitBtn')
quitBtn.addEventListener('click', function() {
  window.location.href = this.getAttribute('data-url');
})