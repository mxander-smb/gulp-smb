var config     = require('../../config').scripts;

var gulp       = require('gulp');
var requirejs  = require('gulp-requirejs-optimize');
var sourcemaps = require('gulp-sourcemaps');

// Create RequireJS modules.
// Each file passed to the plugin is optimized
// as a separate module.
gulp.task('scripts', function() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(requirejs())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest));
});