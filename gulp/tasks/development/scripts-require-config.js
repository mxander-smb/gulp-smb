var config = require('../../config').scripts;

var gulp   = require('gulp');
var wrap   = require('gulp-wrap');
var rename = require('gulp-rename');

// Create RequireJS config.js
gulp.task('scripts:require-config', function() {
  return gulp.src(config.requireJs.src)
    .pipe(wrap('require.config<%= contents %>;'))
    .pipe(rename(config.requireJs.rename))
    .pipe(gulp.dest(config.dest));
});