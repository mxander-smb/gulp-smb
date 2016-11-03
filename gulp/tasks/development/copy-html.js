var config = require('../../config').copyhtml;

var gulp   = require('gulp');
var size   = require('gulp-size');

// Copy HTML files
gulp.task('copy:html', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});