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

let tsFiles = ['./server/**/*.ts', './server/**/*.tsx', './client/**/*.ts', './client/**/*.tsx'];
gulp.task('tsc', (done) => {
  runCmd('npm', ['run', 'tsc'], done);
});

let viewGlob = './server/views/*.html';
gulp.task('copyViews', () => {
  return gulp.src([viewGlob])
  .pipe(gulp.dest('tslib/server/views'));
});

let lessGlob = './client/**/*.less';
gulp.task('copyLess', () => {
  return gulp.src([lessGlob])
  .pipe(gulp.dest('tslib/client/'));  
});

let webpackConfigGlob = './webpack.config.js';
gulp.task('copyWebpckConfig', () => {
  return copyWebpckConfig = gulp.src(webpackConfigGlob)
  .pipe(gulp.dest('tslib'));
});

gulp.task('watch', () => {
  gulp.watch(viewGlob, ['copyViews']);
  gulp.watch(lessGlob, ['copyLess']);
  gulp.watch(webpackConfigGlob, ['copyWebpckConfig']);
  gulp.watch(tsFiles, ['tsc']);
});

gulp.task('dev', ['watch', 'tsc', 'copyLess', 'copyViews', 'copyWebpckConfig']);

function runCmd(cmd, _args, fn) {
  const args = _args || [];
  const runner = require('child_process').spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
  });

  runner.on('close', (code) => {
    if (fn) {
      fn(code);
    }
  });
}