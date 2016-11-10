var config = require('../../config').scripts;

var gulp   = require('gulp');


gulp.task('scripts:sti', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});