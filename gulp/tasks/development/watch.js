var config = require('../../config').watch;

var gulp   = require('gulp');


// Watch files for changes,
// and run defined task(s) on file change.
gulp.task('watch', ['build'], function() {
  gulp.watch(config.html, ['rebuild']);
  gulp.watch(config.scss, ['styles', 'lint-styles']);
  gulp.watch(config.less, ['styles:less', 'lint-styles:less']);
  gulp.watch(config.scripts, ['scripts', 'lint-js']);
  gulp.watch(config.images, ['images']);
});


// Start BrowserSync task,
// watch files for changes,
// and run defined task(s) on file change.
gulp.task('watch:browsersync', ['browsersync'], function() {
  gulp.watch(config.html, ['rebuild:browsersync']);
  gulp.watch(config.scss, ['styles', 'lint-styles']);
  gulp.watch(config.less, ['styles:less', 'lint-styles:less']);
  gulp.watch(config.scripts, ['scripts', 'lint-js']);
  gulp.watch(config.images, ['images']);
});