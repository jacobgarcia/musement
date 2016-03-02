var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

var config={
  scripts: {
    main:'src/js/main.js',
    watch:'src/js/**/*.js',
    output:'public/js'
  }
}
gulp.task('browserify', function() {
  return browserify(config.scripts.main)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(config.scripts.output));
});

gulp.task('watch', function(){
  gulp.watch(config.scripts.watch, ['browserify']);
});

gulp.task('build', ['browserify']);

gulp.task('default', ['watch', 'build']);
