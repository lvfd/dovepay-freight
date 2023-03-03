const { src, dest } = require('gulp')
const path = require('path')

exports.default = function() {
  return src(path.resolve(__dirname, '../', 'dovepay-freight-ui/release/dovepayFreight.min.js'))
    .pipe(dest('dist/'))
}