var config      = require('../../config').browsersync.development;

var gulp        = require('gulp');
var browsersync = require('browser-sync');

// Run build task and start a server with BrowserSync
gulp.task('browsersync', ['build'], function() {
  browsersync(config);
});

// Reload task, used by rebuild task
gulp.task('browsersync:reload', function() {
  browsersync.reload();
});