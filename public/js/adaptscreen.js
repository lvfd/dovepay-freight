const headerH = 73
const navH = 40
const footerH = 90
const browserH = window.outerHeight
const browserVisibleH = window.innerHeight
// console.log(browserH, browserVisibleH)
var dH = browserVisibleH - headerH - navH - footerH;
document.querySelector('main').setAttribute("style", "min-height:" + dH + "px")