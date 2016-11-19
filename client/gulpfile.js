var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  var newDate = new Date();
  console.log(newDate+" -- Compile scss to css");
  return gulp.src('./src/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', function () {
  var newDate = new Date();
  console.log(newDate+" -- Content change");
  gulp.watch('./src/scss/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
