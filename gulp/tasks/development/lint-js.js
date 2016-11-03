var config  = require('../../config').LintJs;

var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');

// Lint JavaScript
// Executed by watch task
gulp.task('lint-js', function() {
  return gulp.src(config.src)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
