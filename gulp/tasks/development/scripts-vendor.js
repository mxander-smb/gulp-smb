var config = require('../../config').scripts.vendor;

var gulp   = require('gulp');
var filter = require('gulp-filter');
var wrap   = require('gulp-wrap');


// Copy vendor JS and create AMD modules
// for in config.js defined files.
gulp.task('scripts:vendor', function() {

  // Filter with vendor scripts that need to
  // be converted to AMD modules.
  var amdFilter = filter(config.convertToAMD, {restore: true});

  // Wrapper template
  var template = 'define([<%= data.dependencies %>], function(require, $) {' +
    'var jQuery = $;' +
    'window.jQuery = jQuery;' +

    '<%= data.contents %>' +

    'delete window.jQuery;' +
    'return <%= data.returnName %>;' +
  '});';

  return gulp.src(config.src)
    // Convert filtered files to AMD modules
    .pipe(amdFilter)
    // @TODO: Refactor, if modules do have different dependencies
    // Use config.js to define dependencies per convertToAMD src
    .pipe(wrap(template, { dependencies: '"require", "jquery"', returnName: 'jQuery' }, { variable: 'data' }))

    // Bring back the previously filtered out files,
    // to also copy them to the destination.
    .pipe(amdFilter.restore)
    .pipe(gulp.dest(config.dest));
});