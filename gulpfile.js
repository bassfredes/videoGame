// //adsasd
var gulp = require("gulp"),
    inject = require("gulp-inject"),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    minifyCss = require('gulp-minify-css');

gulp.task('injectCss', function () {
    gulp.src('./html/index.php')
    .pipe(inject(gulp.src('./html/assets/css/**/*.min.css', {read: false}), {relative: true}))
    .pipe(gulp.dest('./html'));
});

gulp.task('injectJs', function () {
    gulp.src('./html/index.php')
    .pipe(inject(gulp.src('./html/assets/js/videoGame/**/main.min.js', {read: false}), {relative: true}))
    .pipe(inject(gulp.src(['./html/assets/js/videoGame/**/*.js','!./html/assets/js/videoGame/**/main.min.js'], {read: false}), {name: 'game', relative: true}))
    .pipe(inject(gulp.src(['./html/assets/js/*/**/*.js','./html/assets/js/**/*.js','!./html/assets/js/videoGame/dist/*.js'], {read: false}), {name: 'head', relative: true}))
    .pipe(gulp.dest('./html'));
});

gulp.task('uglify', function() {
    gulp.src(['./html/vendors/videoGame/*.js', './html/vendors/*/dist/*.js', './html/vendors/*/build/*.js', '!./**/*.min.js'])//, {base: './'})
    .pipe(uglify())
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(gulp.dest('./html/assets/js'));
});

gulp.task('minify', function() {
    gulp.src('./html/vendors/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(gulp.dest('./html/assets/css'));
});

gulp.task('watch', function() {
    gulp.watch('./html/vendors/css/*.css', ['minify']);
    gulp.watch('./html/vendors/videoGame/dist/*.js', ['uglify']);
});

gulp.task('default', ['watch','uglify','minify','injectCss','injectJs']);
