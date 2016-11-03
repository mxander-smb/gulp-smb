var config         = require('../../config').styles;

var gulp           = require('gulp');
var postcss        = require('gulp-postcss');
var sass           = require('gulp-sass');
var cssnano        = require('cssnano');
var autoprefixer   = require('autoprefixer');
var plumber        = require('gulp-plumber');
var gutil          = require('gulp-util');
var browsersync    = require('browser-sync');

function onError (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
}

// Compile SCSS, and then run through PostCSS and it’s plugins.
//
// Extra task with no sourcemaps for production. We could also
// remove cssnano from the dev style task to make it faster.
// Or use gulp-if (sourcemaps) to make one task out of it.
gulp.task('styles:production', function () {
  browsersync.notify('Transforming CSS');

  var processors = [
    autoprefixer(config.options.autoprefixer),
    cssnano
  ];

  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest(config.dest));
});