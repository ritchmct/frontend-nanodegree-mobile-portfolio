var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var livereload = require('gulp-livereload');

var src = 'src';
var dist = 'dist';

var paths = {
	js: src + 'js/*.js',
	css: src + 'css/*.css',
	html: src + '**/*.html'
};

// Start a webserver @ localhost:8000
gulp.task('server', function () {
  return gulp.src(dist + '/')
    .pipe(webserver());
});

// Combine & Compress JS into one script.js
gulp.task('combine-js', function () {
  return gulp.src(paths.js)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist + '/js'));
});

// Compress HTML
gulp.task('minify', function () {
  return gulp.src(paths.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(dist));
});

// Watch files and reload browser
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(paths.js, ['combine-js']);
  gulp.watch(paths.scss, ['compile-sass']);
  gulp.watch(paths.html, ['compress-html']);
  gulp.watch(dist + '/**').on('change', livereload.changed);
});

gulp.task('default', [
  'server', 'combine-js',
  'compile-sass', 'compress-html',
  'watch' ]);