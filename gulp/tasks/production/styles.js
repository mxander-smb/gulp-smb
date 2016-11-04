// Extra task with no sourcemaps for production. We could also
// remove cssnano from the dev style task to make it faster.
// Or use gulp-if (sourcemaps) to make one task out of it.

var config       = require('../../config').styles;

var gulp         = require('gulp');
var postcss      = require('gulp-postcss');
var scss         = require('gulp-sass');
var less         = require('gulp-less');
var cssnano      = require('cssnano');
var autoprefixer = require('autoprefixer');
var plumber      = require('gulp-plumber');
var gutil        = require('gulp-util');
var browsersync  = require('browser-sync');

// PostCSS plugins
var processors = [
  autoprefixer(config.options.autoprefixer),
  cssnano
];

function onError (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
}


// Compile SCSS, and then run through PostCSS and it’s plugins.
gulp.task('styles:production', function () {
  browsersync.notify('Transforming SCSS');

  return gulp.src(config.src.scss)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(scss(config.options.scss))
    .pipe(postcss(processors))
    .pipe(gulp.dest(config.dest));
});


// Compile LESS, and then run through PostCSS and it’s plugins.
gulp.task('styles:less:production', function () {
  browsersync.notify('Transforming LESS');

  return gulp.src(config.src.less)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(gulp.dest(config.dest));
});