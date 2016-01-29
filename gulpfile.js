var gulp = require('gulp');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var gprint = require('gulp-print');
var clean = require('gulp-clean');

var connect = require('gulp-connect');
var wait = require('gulp-wait');

var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream2');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');

var ROOT = __dirname + '/build';

gulp.task('browserify', function() {
    var watcher = watchify(browserify({
        entries: ['./client/js/components/Router.react.jsx'],
        debug: true,
        extension: ['.jsx', '.es6'],
        transform: [
            ["babelify", {"optional": ["es7.objectRestSpread", "es7.decorators"]}]
        ],
        cache: {},
        packageCache: {},
        fullPaths: true,
        detectGlobals: true
    }));

    watcher.on('log', gutil.log);

    return watcher.on('update', function() {
            var updateStart = Date.now();
            watcher.bundle()
                .pipe(source('main.js'))
                .pipe(gulp.dest('./build/js/'))
                .pipe(gprint())
                .pipe(connect.reload());
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./build/js/'))
        .pipe(gprint());
});

gulp.task('clean', function () {
    return gulp.src('build/js', {read: false})
        .pipe(clean());
});

gulp.task('styles', function () {
    var postcss = require('gulp-postcss');
    var autoprefixer = require('autoprefixer-core');
    var autoprefix = autoprefixer({browsers: ['last 2 version']});

    gulp.src('client/scss/main.scss')
        .pipe(sass())
        .pipe(postcss([autoprefix]))
        .pipe(gulp.dest('build/css/'))
        .pipe(gprint())
        .pipe(connect.reload());
});

gulp.task('copy-html', function(){
    gulp.src('client/*.html')
        .pipe(gulp.dest('build/'))
        .pipe(gprint());
});

gulp.task('copy-img', function(){
    gulp.src('client/img/*')
        .pipe(gulp.dest('build/img'))
        .pipe(gprint());
});


gulp.task('copy-data', function(){
    gulp.src('data/**/*')
        .pipe(gulp.dest('build/data'))
        .pipe(gprint());
});

gulp.task('watch', function() {
    gulp.watch('client/scss/**/*.scss', [ 'styles' ]);
    gulp.watch('client/*.html', [ 'copy-html' ]);
});

gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        root: 'build',
        host: '0.0.0.0',
        port: 3000,
    });
});

gulp.task('deploy-gh-pages', function() {
    var ghpages = require('gulp-gh-pages');

    return gulp.src('./build/**/*')
        .pipe(ghpages({
            cacheDir: '/tmp/',
            message: 'Deploy to gh-pages ' + new Date(),
        }));
});

gulp.task('build', ['clean', 'styles', 'browserify', 'copy-html', 'copy-img', 'copy-data']);
gulp.task('default', ['build', 'webserver', 'watch']);
