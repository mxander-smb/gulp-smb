var config      = require('../../config').lintStyles;

var gulp        = require('gulp');
var postcss     = require('gulp-postcss');
var stylelint   = require('stylelint');
var reporter    = require('postcss-reporter');
var syntax_scss = require('postcss-scss');
var syntax_less = require('postcss-less');

// PostCSS plugins
var processors = [
  stylelint(config.options.stylelint),
  reporter(config.options.reporter)
];


// Lint SCSS styles
// Executed by watch task
gulp.task('lint-styles', function () {
  return gulp.src(config.src.scss)
    .pipe(postcss(processors, {syntax: syntax_scss}));
});


// Lint LESS styles
// Executed by watch task
//
// Extra task, so that we can easily disable, or switch
// to another linter for LESS, as stylelint support is
// experiemental for LESS.
gulp.task('lint-styles:less', function () {
  return gulp.src(config.src.less)
    .pipe(postcss(processors, {syntax: syntax_less}));
});