const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')

gulp.task('minify', () => {
  return gulp.src('dist/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      preserveLineBreaks: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true
    }))
    .pipe(gulp.dest('dist'))
})
