var del = require('del');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');

// Initiate local server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
    })
});

// Cleaning
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

// Use "build" comments in html to minify css and js
gulp.task('useref', function() {
    return gulp.src('src/**/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist'))
});

// Copy fonts
gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

// Watch for changes and reload
gulp.task('watch', function() {
    gulp.watch('src/**/*.html', browserSync.reload);
    gulp.watch('src/css/**/*.css', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('default', function(callback) {
  runSequence(['browserSync', 'watch'], callback)
});

gulp.task('build', function(callback) {
  runSequence('clean:dist', ['useref', 'fonts'], callback)
});