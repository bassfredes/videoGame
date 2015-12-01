// //adsasd
var gulp = require("gulp"),
    inject = require("gulp-inject"),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    minifyCss = require('gulp-minify-css');

gulp.task('injectCss', function () {
    gulp.src('./html/resources/views/blade.index.php')
    .pipe(inject(gulp.src('./html/public/assets/css/**/*.min.css', {read: false}), {relative: true}))
    .pipe(gulp.dest('./html/resources/views/'));
});

gulp.task('injectJs', function () {
    gulp.src('./html/resources/views/blade.index.php')
    .pipe(inject(gulp.src('./html/public/assets/js/videoGame/**/main.min.js', {read: false}), {relative: true}))
    .pipe(inject(gulp.src(['./html/public/assets/js/videoGame/**/*.js','!./html/public/assets/js/videoGame/**/main.min.js'], {read: false}), {name: 'game', relative: true}))
    .pipe(inject(gulp.src(['./html/public/assets/js/*/**/*.js','./html/public/assets/js/**/*.js','!./html/public/assets/js/videoGame/dist/*.js'], {read: false}), {name: 'head', relative: true}))
    .pipe(gulp.dest('./html/resources/views/'));
});

gulp.task('uglify', function() {
    gulp.src(['./html/public/assets/videoGame/*.js', './html/vendors_game/*/dist/*.js', './html/vendors_game/*/build/*.js', '!./**/*.min.js'])//, {base: './'})
    .pipe(uglify())
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(gulp.dest('./html/public/assets/js'));
});

gulp.task('minify', function() {
    gulp.src('./html/vendors_game/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(gulp.dest('./html/public/assets/css'));
});

gulp.task('watch', function() {
    gulp.watch('./html/vendors_game/css/*.css', ['minify']);
    gulp.watch('./html/public/assets/videoGame/dist/*.js', ['uglify']);
});

gulp.task('default', ['watch','uglify','minify','injectCss','injectJs']);
