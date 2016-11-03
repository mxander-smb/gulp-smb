var config   = require('../../config').optimize.images;

var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var size     = require('gulp-size');

// Copy and minimize images, incl. sprites
gulp.task('optimize:images', function() {
  return gulp.src(config.src)
    .pipe(imagemin(config.options))
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});
