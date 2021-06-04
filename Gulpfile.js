"use strict";

const gulp = require('gulp');
const browserify = require('browserify');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const noop = require('gulp-noop');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
const revReplace = require("gulp-rev-replace");

const paths = {
    dist: {
        js: 'src/_tmp/js',
    },
    src: {
        js: 'src/scripts',
    }
};

// JS TASKS
gulp.task('build:js', () => {
    return browserify({ entries: `${paths.src.js}/all.script.js`, debug: true })
        .transform('babelify', { presets: ['@babel/preset-env'] })
        .bundle()
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(!process.env.NODE_ENV || process.env.NODE_ENV !== 'production' ?
            sourcemaps.init() : noop())
        .pipe(!process.env.NODE_ENV || process.env.NODE_ENV !== 'production' ?
            sourcemaps.write('.') : noop())
        .pipe(process.env.NODE_ENV && process.env.NODE_ENV === 'production' ?
            uglify() : noop())
        .pipe(process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? rev() : noop())
        .pipe(gulp.dest(paths.dist.js))
        .pipe(process.env.NODE_ENV && process.env.NODE_ENV === 'production' ?
            rev.manifest(`${paths.dist.html}/manifest.json`, { merge: true }) : noop())
        .pipe(process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? gulp.dest('.') : noop());
});
gulp.task('watch:js', () => {
    gulp.watch(`${paths.src.js}/**/*.js`, gulp.series('build:js'));
});

// Set env variables
gulp.task('set:env:dev', (cb) => {
    process.env = {
        ...process.env,
        NODE_ENV: 'development',
    };
    cb();
});
gulp.task('set:env:prod', function (cb) {
    process.env = {
        ...process.env,
        NODE_ENV: 'production',
    };
    cb();
});

gulp.task('rev-replace', () => {
    return gulp.src(`${paths.dist.html}/**/*.html`)
        .pipe(revReplace({ manifest: gulp.src(`${paths.dist.html}/manifest.json`) }))
        .pipe(gulp.dest(paths.dist.html));
});

gulp.task('dev', gulp.series('set:env:dev', 'build:js'));
gulp.task('watch', gulp.series('dev', 'watch:js'));

