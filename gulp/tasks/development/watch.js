var config = require('../../config').watch;

var gulp   = require('gulp');

// Start BrowserSync task,
// watch files for changes,
// and run defined task(s) on file change.
gulp.task('watch', ['browsersync'], function() {
  gulp.watch(config.html, ['rebuild']);
  gulp.watch(config.scss, ['styles', 'lint-styles']);
  gulp.watch(config.less, ['styles:less', 'lint-styles:less']);
  gulp.watch(config.scripts, ['scripts', 'lint-js']);
  gulp.watch(config.images, ['images']);
});

// Watch files for changes,
// and run defined task(s) on file change.
gulp.task('watch-simple', ['build'], function() {
  gulp.watch(config.html, ['rebuild']);
  gulp.watch(config.scss, ['styles', 'lint-styles']);
  gulp.watch(config.less, ['styles:less', 'lint-styles:less']);
  gulp.watch(config.scripts, ['scripts', 'lint-js']);
  gulp.watch(config.images, ['images']);
});