var gulp        = require('gulp');
var runSequence = require('run-sequence');

// Run all tasks needed for a build, in defined order
gulp.task('build:production', function(callback) {
  runSequence('delete',
  [
    // Use just 'styles', when CSS sourcemaps
    // are needed on production build.
    'styles:production',

    'scripts',
    'images'
  ],
  [
    'copy:css',

    // Optional
    'optimize:js',
    'optimize:html',
    'optimize:images'
  ],

  // After optimize:html, so that all files exist
  // for Phantom.JS (UnCSS)
  'optimize:css',

  // Revision asset files and update their references
  'revision',
  'rev-update-references',

  //'gzip',
  callback);
});
