var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  nodemon = require('gulp-nodemon'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat');

gulp.task('sass', function() {
  return gulp.src('src/css/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('master.css'))
    .pipe(rename({
            suffix: '.min'
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
    gulp.watch('./src/css/*.scss', ['sass'])
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('default', ['sass','watch','start']);
