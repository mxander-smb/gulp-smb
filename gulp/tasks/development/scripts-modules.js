// Work in Progress
//
// This should pipe /js/sti/*/ files and use r.js
// with the /js/require-config.js && /js/module-config.js
// config files and the extending arguments defined somewhere
// in config.js or the module provides a config file.
// Destination: build-path + /js/build/sti/*.js.

var config = require('../../config').scripts;

var gulp   = require('gulp');


gulp.task('scripts:modules', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});