var config = require('../../config').watch;

var gulp   = require('gulp');

// Start BrowserSync task and watch files for changes
gulp.task('watch', ['browsersync'], function() {
  gulp.watch(config.html, ['rebuild']);
  gulp.watch(config.styles, ['styles', 'lint-styles']);
  gulp.watch(config.scripts, ['scripts', 'lint-js']);
  gulp.watch(config.images, ['images']);
});