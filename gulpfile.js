const gulp = require('gulp');
const sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

function reload(done) {
    browserSync.reload();
    done();
}

function style() {
    return (
        gulp.src('app/scss/styles.scss')
            .pipe(sass())
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.stream())
    );
}

function watch() {
    browserSync.init({
        // proxy: 'mihodaniel.local/app/'
        watch: true,
        server: "./app"
    });
    gulp.watch("app/scss/**/*.scss", style);
    gulp.watch("app/*.html", reload);
}

exports.watch = watch;