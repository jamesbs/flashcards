const gulp = require('gulp');
const del = require('del');
const R = require('ramda');
const browserSync = require('browser-sync').create();
const merge = require('merge-stream');

const vendorFiles = ['jspm_packages/**/*'];

const applicationFiles = [
    'config.js',
    'jspm_packages/system.js',
    'index.html',
    'app/**/*.{ts,js,html,gif,jpg,png,ttf}'
];


gulp.task('clean', () => del('dist'));


gulp.task('vendor', ['clean'], () => {
    return gulp.src(vendorFiles, { base: '.' })
        .pipe(gulp.dest('dist'));
});


gulp.task('build.dev', ['vendor'], () => {
    console.log('building');
    return gulp.src(applicationFiles, { base: '.' })
        .pipe(gulp.dest('dist'));
});


gulp.task('rebuild.dev', ['build.dev'], () => {
    console.log('reloading');
    browserSync.reload();
});


gulp.task('start', ['build.dev'], () => {
    gulp.watch(applicationFiles, ['rebuild.dev']);
    
    browserSync.init({
       server: {
           baseDir: 'dist'
       }
    });
});