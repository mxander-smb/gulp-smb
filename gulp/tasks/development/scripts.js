// @TODO: This task probably needs to be optimized by
// someone who’s knee-deep into RequireJS :)

var config     = require('../../config').scripts;

var gulp       = require('gulp');
var shell      = require('gulp-shell');
var requirejs  = require('gulp-requirejs-optimize');
var sourcemaps = require('gulp-sourcemaps');


// Create RequireJS modules,
// with sourcemaps.
gulp.task('scripts', function() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(requirejs({
      optimize: 'none',
      findNestedDependencies: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest));
});


// Run r.js directly via gulp-shell.
// Alternative.
gulp.task('scripts:shell', function () {
  return gulp.src(config.src, {read: false})
    .pipe(shell('r.js -o <%= file.path %>'));
});