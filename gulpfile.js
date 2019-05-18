const gulp = require('gulp');
const sass = require('gulp-sass');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

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
        watch: true,
        server: "./app"
    });
    gulp.watch("app/scss/**/*.scss", style);
    gulp.watch("app/*.html", reload);
}

function build(done) {
    // Copy HTML Files
    gulp.src("app/*.html")
        .pipe(gulp.dest('dist/'));

    // Copy CSS
    gulp.src("app/css/*.css")
        .pipe(gulp.dest("dist/css/"));

    // Copy JS Files
    gulp.src("app/js/*.js")
        .pipe(terser().on('error', function(e) {
            console.log(e)
        }))
        .pipe(gulp.dest("dist/js/"));

    done();
}

exports.watch = watch;
exports.build = build;