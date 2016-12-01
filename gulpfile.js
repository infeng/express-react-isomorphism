var gulp = require('gulp');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('build', (callback) => {
  let compiler = webpack(webpackConfig, () => {
    let copyViews = gulp.src(['./server/views/*.html'])
    .pipe(gulp.dest('build/server/views'));
    callback();
  });
});