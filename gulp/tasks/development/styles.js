var config       = require('../../config').styles;

var gulp         = require('gulp');
var postcss      = require('gulp-postcss');
var sass         = require('gulp-sass');
var cssnano      = require('cssnano');
var autoprefixer = require('autoprefixer');
var plumber      = require('gulp-plumber');
var sourcemaps   = require('gulp-sourcemaps');
var gutil        = require('gulp-util');
var browsersync  = require('browser-sync');

function onError (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
}

// Compile SCSS, and then run through PostCSS and it’s plugins.
gulp.task('styles', function () {
  browsersync.notify('Transforming CSS');

  var processors = [
    autoprefixer(config.options.autoprefixer),
    cssnano
  ];

  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest));
});