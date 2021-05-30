"use strict";

const gulp = require('gulp');
const del = require('del');
const fs = require('fs');
const browserify = require('browserify');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const postcss = require('gulp-postcss');
const postcss_import = require('postcss-import');
const tailwindcss = require('tailwindcss');
const nested = require('postcss-nested');
const cssnano = require('cssnano')({
    preset: ['default', {
        discardComments: {
            removeAll: true,
        },
    }]
});
const autoprefixer = require('autoprefixer');
const noop = require('gulp-noop');
const uglify = require('gulp-uglify');
const serve = require('gulp-webserver');
const rev = require('gulp-rev');
const revReplace = require("gulp-rev-replace");
const inlineSource = require('gulp-inline-source');
const browserSync = require("browser-sync").create();

const paths = {
    dist: {
        html: 'dist',
        css: 'dist/css',
        js: 'dist/js',
        images: 'dist/images'
    },
    src: {
        html: 'src/html',
        css: 'src/css',
        js: 'src/js',
        images: 'src/images'
    }
};

// CLEAN TASKS
gulp.task('clean:dist', () => {
    return del(['./dist']);
});
gulp.task('create:dist', (cb) => {
    fs.mkdirSync('./dist');
    cb();
});
gulp.task('clean:html', () => {
    return del([`${paths.dist.html}/**/*.html`]);
});
gulp.task('clean:css', () => {
    return del([`${paths.dist.css}/**/*.css`]);
});
gulp.task('clean:js', () => {
    return del([`${paths.dist.js}/**/*.js`]);
});
gulp.task('clean:images', () => {
    return del([`${paths.dist.images}/*`]);
});
gulp.task('clean', gulp.series('clean:html', 'clean:css', 'clean:js', 'clean:images', 'clean:dist'));

// HTML TASKS
gulp.task('build:html', () => {
    return gulp.src(`${paths.src.html}/**/*.html`)
        .pipe(gulp.dest(`${paths.dist.html}`));
});
gulp.task('watch:html', () => {
    gulp.watch(`${paths.src.html}/**/*.html`, gulp.series('build:html'));
});
gulp.task('build:inline:js:html', () => {
    return gulp.src(`${paths.src.html}/**/*.html`)
        .pipe(inlineSource({ compress: true }))
        .pipe(gulp.dest(`${paths.dist.html}`))
        .pipe(browserSync.stream());
});
gulp.task('watch:inline:js:html', () => {
    gulp.watch([`${paths.src.js}/**/*.inline.js`, `${paths.src.html}/**/*.html`], gulp.series('build:css', 'build:inline:js:html'));
});

// IMAGES TASKS
gulp.task('build:images', () => {
    return gulp.src(`${paths.src.images}/**/*`)
        .pipe(gulp.dest(`${paths.dist.images}`));
});
gulp.task('watch:images', () => {
    gulp.watch(`${paths.src.images}/**/*`, gulp.series('build:images'));
});

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
        .pipe(process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? gulp.dest('.') : noop())
        .pipe(browserSync.stream());
});
gulp.task('watch:js', () => {
    gulp.watch(`${paths.src.js}/**/*.script.js`, gulp.series('build:js'));
});

// CSS TASKS
gulp.task('build:css', () => {
    const plugins = [postcss_import, tailwindcss, nested];
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
        plugins.push(cssnano);
    }
    plugins.push(autoprefixer);
    return gulp.src(`${paths.src.css}/**/*.css`)
        .pipe(!process.env.NODE_ENV || process.env.NODE_ENV !== 'production' ?
            sourcemaps.init() : noop())
        .pipe(postcss(plugins))
        .pipe(!process.env.NODE_ENV || process.env.NODE_ENV !== 'production' ?
            sourcemaps.write('.') : noop())
        .pipe(process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? rev() : noop())
        .pipe(gulp.dest(`${paths.dist.css}`))
        .pipe(process.env.NODE_ENV && process.env.NODE_ENV === 'production' ?
            rev.manifest(`${paths.dist.html}/manifest.json`, { merge: true }) : noop())
        .pipe(process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? gulp.dest('.') : noop())
        .pipe(browserSync.stream());
});
gulp.task('watch:css', () => {
    gulp.watch(`${paths.src.css}/**/*`, gulp.series('build:css'));
});

// Set env variables
gulp.task('set:env:dev', (cb) => {
    process.env = {
        ...process.env,
        NODE_ENV: 'development',
        TAILWIND_DISABLE_TOUCH: true,
        TAILWIND_MODE: 'build'
    };
    cb();
});
gulp.task('set:env:prod', function (cb) {
    process.env = {
        ...process.env,
        NODE_ENV: 'production',
        TAILWIND_DISABLE_TOUCH: true,
        TAILWIND_MODE: 'build'
    };
    cb();
});

gulp.task('rev-replace', () => {
    return gulp.src(`${paths.dist.html}/**/*.html`)
        .pipe(revReplace({ manifest: gulp.src(`${paths.dist.html}/manifest.json`) }))
        .pipe(gulp.dest(paths.dist.html));
});

gulp.task('serve', (cb) => {
    // gulp.src(paths.dist.html)
    //     .pipe(serve({
    //         livereload: true,
    //         open: false,
    //         port: 8080,
    //         https: {
    //             cert: '/Users/shubhatt/.certbot/config-dir/live/shubhomeet.net/fullchain.pem',
    //             key: '/Users/shubhatt/.certbot/config-dir/live/shubhomeet.net/privkey.pem'
    //         },
    //         host: 'html.shubhomeet.net'
    //     }));
    browserSync.init({
        server: {
            baseDir: paths.dist.html,
        },
        open: false
    });
    cb();
});

gulp.task('build:all', gulp.series('build:inline:js:html', 'build:js', 'build:images', 'build:css'));
gulp.task('dev', gulp.series('clean', 'set:env:dev', 'build:all'));

gulp.task('watch:all', gulp.parallel('watch:inline:js:html', 'watch:js', 'watch:images', 'watch:css'));
gulp.task('watch', gulp.series('dev', 'watch:all'));

gulp.task('build', gulp.series('clean', 'set:env:prod', 'build:all', 'rev-replace'));
gulp.task('default', gulp.parallel('watch', 'serve'));
