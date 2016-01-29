const execFileSync = require('child_process').execFileSync
const path = require('path')

const ghpages = require('gh-pages')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')

const pkg = require('./package.json')

gulp.task('deploy', (done) => {
  var commit = execFileSync('git', ['rev-parse', '--short', 'HEAD'], {
    encoding: 'utf8'
  }).trim()

  ghpages.publish(
    path.join(process.cwd(), 'dist'), {
      clone: '.deploy',
      depth: 1,
      dotfiles: true,
      message: `Deploy ${commit} from v${pkg.version}`,
      repo: `git@github.com:${pkg.repository}.git`,
      user: {
        name: pkg.author.name,
        email: pkg.author.email
      }
    }, done)
})

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
