var gulp        = require('gulp');
var size        = require('gulp-size');
var runSequence = require('run-sequence');


// Rebuild site
gulp.task('rebuild', function(callback) {
  runSequence('copy:html', callback);
});


// Rebuild site and reload BrowserSync
gulp.task('rebuild:browsersync', function(callback) {
  runSequence('copy:html', 'browsersync:reload', callback);
});