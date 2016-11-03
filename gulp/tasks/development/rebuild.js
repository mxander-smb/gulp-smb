var gulp        = require('gulp');
var size        = require('gulp-size');
var runSequence = require('run-sequence');

// Rebuild site and reload BrowserSync
gulp.task('rebuild', function(callback) {
  runSequence('copy:html', 'browsersync:reload', callback);
});