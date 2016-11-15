let gulp = require('gulp');
let mocha = require('gulp-mocha');

gulp.task('test', () => {
  let error = false;
gulp
  .src('./test/*test.js')
  .pipe(mocha({'timeout': 2000}))
  .on('error', () => {
  error = true;
})
.on('end', () => {
  if (!error) {
  console.log(`Bingo, tests passed at ${new Date()}`);
} else {
  console.log(`Tests failed at ${new Date()}`);
}
});
});

gulp.task('watch', () => {
  gulp.watch([
  './test/*test.js',
  './server/*.js',
  './common/*',
], ['test']);
});
