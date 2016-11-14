var config = require('../../config').copyhtml.production;

var gulp   = require('gulp');
var size   = require('gulp-size');

// Copy HTML files
gulp.task('copy:html:production', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});