'use strict'

let gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    webpack = require('webpack-stream'),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon')

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
    .pipe(gulp.dest('public/css'))
})

gulp.task('htmlminify', function() {
  return gulp.src(['./src/views/*/*.html','./src/views/*.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./public/views'))
})

gulp.task('webpack', function(){
  return gulp.src(['./src/js/**/*.js'])
  .pipe(
    webpack(require(__dirname + '/webpack.config.js'))
    .on('error', (err) => {
      if (err) console.log('--- Webpack error ---\n', err)
    })
  )
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('public/js'))
})

gulp.task('watch', function () {
  gulp.watch("./src/views/**/*.html", ['htmlminify'])
  gulp.watch('./src/js/**/*.js', ['webpack'])
  gulp.watch('./src/css/*.scss', ['sass'])
})

gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('default', ['sass','htmlminify','webpack','watch','start'])
