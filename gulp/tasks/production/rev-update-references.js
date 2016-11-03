var config  = require('../../config').revUpdate;

var gulp    = require('gulp');
var collect = require('gulp-rev-collector');

// Replace all links to asset files via a manifest file
gulp.task('rev-update-references', function() {
  return gulp.src(config.src)
  .pipe(collect())
  .pipe(gulp.dest(config.dest));
});
