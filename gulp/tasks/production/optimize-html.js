var config  = require('../../config').optimize.html;

var gulp    = require('gulp');
var htmlmin = require('gulp-htmlmin');

// Copy and minimize HTML
gulp.task('optimize:html', function() {
  return gulp.src(config.src)
    .pipe(htmlmin(config.options))
    .pipe(gulp.dest(config.dest));
});
