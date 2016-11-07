var config       = require('../../config').styles;

var gulp         = require('gulp');
var postcss      = require('gulp-postcss');
var scss         = require('gulp-sass');
var less         = require('gulp-less');
var cssnano      = require('cssnano');
var autoprefixer = require('autoprefixer');
var plumber      = require('gulp-plumber');
var sourcemaps   = require('gulp-sourcemaps');
var gutil        = require('gulp-util');
var browsersync  = require('browser-sync');

// PostCSS plugins
var processors = [
  autoprefixer(config.options.autoprefixer),
  cssnano()
];

function onError (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
}


// Compile SCSS, and then run through PostCSS and it’s plugins.
gulp.task('styles', function () {
  browsersync.notify('Transforming SCSS');

  return gulp.src(config.src.scss)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(scss(config.options.scss))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest));
});


// Compile LESS, and then run through PostCSS and it’s plugins.
gulp.task('styles:less', function () {
  browsersync.notify('Transforming LESS');

  return gulp.src(config.src.less)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest));
});