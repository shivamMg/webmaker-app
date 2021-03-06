var gulp = require('gulp');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var handleErrors = require('./error');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function () {
    var dest = gulp.dest('./build/');
    var browserified = browserify('./lib/index.js', {
        insertGlobals: false,
        transform: ['partialify', 'bulkify']
    });

    return browserified
        .bundle()
        .on('error', handleErrors.onError)
        .pipe(source('index.js'))
        .pipe(buffer())
        //.pipe(uglify())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(sourcemaps.write())
        .pipe(dest);
};
