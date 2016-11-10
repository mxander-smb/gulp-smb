// @TODO: This task probably needs to be optimized by
// someone who’s knee-deep into RequireJS :)

var config     = require('../../config').scripts;

var gulp       = require('gulp');
var shell      = require('gulp-shell');
var requirejs  = require('gulp-requirejs-optimize');
var sourcemaps = require('gulp-sourcemaps');


// Create RequireJS modules,
// with sourcemaps.
// gulp.task('scripts:base', function() {
//   return gulp.src(config.src)
//     .pipe(requirejs({
//       optimize: 'none',
//       findNestedDependencies: true
//     }))
//     .pipe(gulp.dest(config.dest));
// });


// Run r.js directly via gulp-shell.
// Alternative.
gulp.task('scripts:base', function () {
  return gulp.src(config.requireJs.srcConfig, {read: false})
    .pipe(shell('r.js -c <%= file.path %>'));
});