const { series, watch, src, dest } = require('gulp')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()
const less = require('gulp-less')
const concat = require('gulp-concat')
const path = require('path')
const plumber = require('gulp-plumber')

function watchExpress(cb) {
  nodemon({
    script: 'express.js',
    // env: { 'NODE_ENV': 'production' },
    env: { 'NODE_ENV': 'development' },
    ext: 'js json', /* watch on *.ext */
    ignore: [
      'views/',
      'node_modules/',
      'public/'
    ]
  })
  cb()
}

function watchClient(cb) {
  let files = [
    'views/**/*.*',
    'public/**/*.*'
  ]
  browserSync.init({
      proxy: `http://localhost:3000`,
      logPrefix: `browserSync`,
      browser: `chrome`,
      port: 3001
  })
  watch(files).on('change', browserSync.reload)
  cb()
}

function compileLessFontawesome() {
  return src('src/less/font-awesome/*.less')
    .pipe(concat('font-awesome.less'))
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(dest('public/css/plugins/'))
}

function compileLessUIkit() {
  return src('src/less/UIkit/uikit.less')
    .pipe(plumber())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(dest('public/css/plugins/'))
}

function watchLess(cb) {
  compileLessFontawesome()
  watch('src/less/font-awesome/*.less').on('change', compileLessFontawesome)
  compileLessUIkit()
  watch('src/less/UIkit/*.less').on('change', compileLessUIkit)
  cb()
}

exports.devmode = series(watchLess, watchExpress, watchClient)