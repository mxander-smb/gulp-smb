var config      = require('../../config').lintStyles;

var gulp        = require('gulp');
var postcss     = require('gulp-postcss');
var stylelint   = require('stylelint');
var reporter    = require('postcss-reporter');
var syntax_scss = require('postcss-scss');

// Lint styles
// Executed by watch task
gulp.task('lint-styles', function () {

  var processors = [
    stylelint(config.options.stylelint),
    reporter(config.options.reporter)
  ];

  return gulp.src(config.src)
    .pipe(postcss(processors, {syntax: syntax_scss}));
});