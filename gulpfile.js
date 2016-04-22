const crypto = require('crypto')
const fs = require('fs')

const gitRevSync = require('git-rev-sync')
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

const pkg = require('./package.json')

const paths = {
  dist: {
    src: 'dist/**/*',
    dest: 'dist'
  },

  html: {
    src: 'dist/**/*.html'
  },

  scripts: {
    src: [
      'src/_assets/javascripts/**/*.js',
      '!src/_assets/javascripts/vendor/**/*.js',
      '!src/_assets/javascripts/main.js'
    ]
  },

  styles: {
    src: 'src/_assets/stylesheets/**/*.scss'
  },

  modernizr: {
    js: 'assets/modernizr'
  }
}

gulp.task('default', ['watch'])
gulp.task('optimize', ['minify', 'imagemin'])
gulp.task('lint', ['standard', 'sass-lint', 'htmlhint'])

gulp.task('htmlhint', () => {
  return gulp.src(paths.html.src)
    .pipe($.htmlhint())
    .pipe($.htmlhint.failReporter())
})

gulp.task('standard', () => {
  return gulp.src(paths.scripts.src)
    .pipe($.standard())
    .pipe($.standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('sass-lint', () => {
  return gulp.src(paths.styles.src)
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError())
})

gulp.task('watch', () => {
  gulp.src(paths.html.src)
    .pipe($.watch(paths.html.src))
    .pipe($.plumber())
    .pipe($.htmlhint())
    .pipe($.htmlhint.reporter())

  gulp.src(paths.scripts.src)
    .pipe($.watch(paths.scripts.src))
    .pipe($.plumber())
    .pipe($.standard())
    .pipe($.standard.reporter('default'))

  return gulp.src(paths.styles.src)
    .pipe($.watch(paths.styles.src))
    .pipe($.plumber())
    .pipe($.sassLint())
    .pipe($.sassLint.format())
})

gulp.task('hash', () => {
  const makeHashed = (src, ext) => {
    const distSrc = `${paths.dist.dest}/${src}.${ext}`

    try {
      fs.statSync(distSrc)
    } catch (err) {
      return src
    }

    const hash =
      crypto.createHash('sha1')
      .update(fs.readFileSync(distSrc, 'utf8'), 'utf8')
      .digest('hex')

    const dest = `${src}-${hash}.${ext}`

    fs.renameSync(distSrc, `${paths.dist.dest}/${dest}`)

    return dest
  }


  return gulp.src(paths.dist.src)
    .pipe($.replace(
      `${paths.modernizr.js}.js"`,
      `${makeHashed(paths.modernizr.js, 'js')}"`
    ))
    .pipe(gulp.dest(paths.dist.dest))
})

gulp.task('minify', () => {
  return gulp.src(paths.html.src)
    .pipe($.htmlmin({
      collapseWhitespace: true,
      preserveLineBreaks: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true
    }))
    .pipe(gulp.dest(paths.dist.dest))
})

gulp.task('imagemin', () => {
  return gulp.src(paths.dist.src)
    .pipe($.imagemin())
    .pipe(gulp.dest(paths.dist.dest))
})

gulp.task('deploy', () => {
  return gulp.src(paths.dist.src)
    .pipe($.ghPages({
      remoteUrl: `git@github.com:${pkg.repository}.git`,
      message: `Deploy ${gitRevSync.short()} from v${pkg.version}`
    }))
})
