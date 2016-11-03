// Sprites can be used with the <symbol> technique.
// See: https://css-tricks.com/svg-symbol-good-choice-icons/

var config   = require('../../config').sprites;

var gulp     = require('gulp');
var svgstore = require('gulp-svgstore');

// Create SVG sprites
// On production they are optimized through the
// optimize-images task.
gulp.task('sprites', function () {
  return gulp.src(config.src)
    .pipe(svgstore())
    .pipe(gulp.dest(config.dest));
});