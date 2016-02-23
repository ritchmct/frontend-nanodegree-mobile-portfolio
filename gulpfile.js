var del = require('del');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var inlineCss = require('gulp-inline-css');
var responsive = require('gulp-responsive');

// Initiate local server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
});

// Cleaning
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

// Use "build" comments in html to minify css and js
// Exclude views directory and process separately
gulp.task('useref', function() {
    return gulp.src(['src/**/*.html', '!src/views/*.html'])
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist'))
});

// Use "build" comments in html to minify css and js under views directory
// useref didn't put the css and js files in the correct location
gulp.task('useref-views', function() {
    return gulp.src('src/views/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist/views'))
});

// Inline css in index.html
gulp.task('inlinecss', function() {
    return gulp.src('dist/index.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('dist'))
});

// Copy fonts
gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});


gulp.task('image-resize', function() {
    // return gulp.src('src/**/{img,images}/**/*.{jpg,png}')
    return gulp.src('src/**/*.{jpg,png}')
        .pipe(responsive({
            // Resize all JPG images to three different sizes: 200, 500, and 630 pixels
            '**/*.{jpg,png}': [{
                width: 200,
                rename: { suffix: '-200px' }
            }, {
                width: 500,
                rename: { suffix: '-500px' }
            }, {
                // Copy original image
                rename: { suffix: '' }
            }],
        }, {
            // Global configuration for all images
            // The output quality for JPEG, WebP and TIFF output formats
            quality: 70,
            // Use progressive (interlace) scan for JPEG and PNG output
            progressive: true,
            // Strip all metadata
            withMetadata: false,
            skipOnEnlargement: true,
            errorOnEnlargement: false
        }))
        .pipe(gulp.dest('dist'))
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
  runSequence('clean:dist', ['useref', 'useref-views', 'fonts', 'image-resize'], 'inlinecss', callback)
});