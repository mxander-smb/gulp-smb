var gulp        = require('gulp');
var runSequence = require('run-sequence');

// Run all tasks needed for a build, in defined order
gulp.task('build', function(callback) {
  runSequence('delete',
  [
    'copy:html',

    // CSS tasks
    'styles',
    'styles:less',

    // JavaScript tasks
    'scripts:modules',
    'scripts:base',
    'scripts:vendor',
    'scripts:require-config',

    'sprites',
    'images'
  ],
  callback);
});