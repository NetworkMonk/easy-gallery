/*jshint esversion: 6 */ 

const package = require('./package.json');
const {parallel, series, src, dest} = require('gulp');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const del = require('del');
const babel = require('gulp-babel');
/*const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');*/

function clean(cb) {
    del(['dist/*']).then(function() {
        cb();
    });
}

function buildjs() {
    return src('src/js/**/*.js')
    .pipe(concat('easy-gallery.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(dest('dist/' + package.version + '/'));
}

function buildcss() {
    return src('src/css/**/*.css')
    .pipe(concat('easy-gallery.css'))
    .pipe(uglifycss())
    .pipe(rename({extname: '.min.css'}))
    .pipe(dest('dist/' + package.version + '/'));
}

exports.clean = clean;
exports.build = parallel(buildjs);
exports.default = exports.build;