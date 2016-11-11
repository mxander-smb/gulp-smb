var config     = require('../../config').scripts.base;

var gulp       = require('gulp');
var shell      = require('gulp-shell');


// Create base.js
//
// Run r.js directly via gulp-shell, because
// I wasn’t able to make our setup work with
// gulp-requirejs-optimize.
gulp.task('scripts:base', function () {

  // r.js out destination
  var dest = './' + config.dest + config.name;

  return gulp.src(config.src, {read: false})
    .pipe(shell('r.js -o <%= file.path %> out=' + dest));
});