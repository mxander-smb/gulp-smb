var gulp        = require('gulp');
var runSequence = require('run-sequence');

// Run all tasks needed for a build, in defined order
gulp.task('build:production', function(callback) {
  runSequence('delete',
  [
    // Use just 'styles', when CSS sourcemaps
    // are needed on production build.
    'styles:production',
    'styles:less:production',

    // JavaScript tasks
    'scripts:modules',
    'scripts:base',
    'scripts:vendor',
    'scripts:require-config',

    'images'
  ],
  [
    'copy:css',
    'copy:html:production',

    // Optional
    'optimize:js',
    'optimize:images'
  ],

  // After optimize:html, so that all files exist
  // for Phantom.JS (UnCSS)
  //
  // @NOTE: All unused CSS will be removed while this task,
  // is active! Disable to get the full CSS from the styles
  // task, or define in config.js which html files should be
  // used to lookup usage.
  //'optimize:css',

  // Revision asset files and update their references
  'revision',
  'rev-update-references',

  //'gzip',
  callback);
});
