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
    ],
    minify: [
      'dist/sw-import.js',
      'dist/assets/platinum-sw/bootstrap/*.js',
      'dist/assets/sw-toolbox/*.js',
      'dist/assets/*vulcanized-*.js'
    ]
  },

  styles: {
    src: 'src/_assets/stylesheets/**/*.scss'
  },

  modernizr: {
    js: 'assets/modernizr'
  },

  sw: {
    toolbox: {
      src: 'src/_assets/bower_components/sw-toolbox/sw-toolbox*',
      dest: 'dist/assets/sw-toolbox'
    },
    platinum: {
      src: 'src/_assets/bower_components/platinum-sw/bootstrap/*.js',
      dest: 'dist/assets/platinum-sw/bootstrap'
    }
  },

  vulcanize: {
    polymer: {
      build: 'polymer.html',
      name: 'polymer-vulcanized.html',
      src: 'src/_assets/bower_components/polymer',
      dest: 'dist/assets',
      html: 'polymer-vulcanized'
    },
    elements: {
      name: 'vulcanized.html',
      src: 'src/_assets/elements/elements.html',
      dest: 'src/_assets/elements'
    }
  },

  crisper: {
    dest: 'assets',
    polymer: {
      src: 'assets/polymer-vulcanized*.html',
      js: 'polymer-vulcanized'
    },
    elements: {
      src: 'assets/vulcanized*.html'
    }
  },

  precache: {
    src: [
      'dist/**/*',
      '!dist/CNAME',
      '!dist/404.html'
    ],
    json: 'dist/cache.json'
  }
}

gulp.task('default', ['watch'])
gulp.task('optimize', ['minify', 'imagemin'])
gulp.task('lint', ['standard', 'sass-lint', 'htmlhint'])

gulp.task('htmlhint', () => {
  return gulp.src([paths.html.src, `!${paths.dist.dest}/assets/*vulcanized*`])
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

gulp.task('service-worker', () => {
  gulp.src(paths.sw.toolbox.src)
    .pipe(gulp.dest(paths.sw.toolbox.dest))

  return gulp.src(paths.sw.platinum.src)
    .pipe(gulp.dest(paths.sw.platinum.dest))
})

gulp.task('vulcanize', ['service-worker'], () => {
  gulp.src(`${paths.vulcanize.polymer.src}/${paths.vulcanize.polymer.build}`)
    .pipe($.vulcanize({
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe($.rename(paths.vulcanize.polymer.name))
    .pipe(gulp.dest(paths.vulcanize.polymer.dest))

  return gulp.src(paths.vulcanize.elements.src)
    .pipe($.vulcanize({
      inlineCss: true,
      inlineScripts: true,
      stripExcludes: ['polymer.html'],
      addedImports: ['polymer-vulcanized.html']
    }))
    .pipe($.rename(paths.vulcanize.elements.name))
    .pipe(gulp.dest(paths.vulcanize.elements.dest))
})

gulp.task('crisper', () => {
  gulp.src(`${paths.dist.dest}/${paths.crisper.polymer.src}`)
    .pipe($.crisper({scriptInHead: false}))
    .pipe(gulp.dest(`${paths.dist.dest}/${paths.crisper.dest}`))

  return gulp.src(`${paths.dist.dest}/${paths.crisper.elements.src}`)
    .pipe($.crisper({scriptInHead: false}))
    .pipe(gulp.dest(`${paths.dist.dest}/${paths.crisper.dest}`))
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

  const replacements = [
    [
      `${paths.vulcanize.polymer.html}.html`,
      makeHashed(`assets/${paths.vulcanize.polymer.html}`, 'html')
        .replace('assets/', '')
    ],
    [
      `${paths.crisper.polymer.js}.js`,
      makeHashed(`assets/${paths.crisper.polymer.js}`, 'js')
        .replace('assets/', '')
    ],
    [
      `${paths.modernizr.js}.js`,
      makeHashed(paths.modernizr.js, 'js')
    ]
  ]

  return gulp.src(paths.dist.src)
    .pipe($.replace(replacements[0][0], replacements[0][1], {skipBinary: true}))
    .pipe($.replace(replacements[1][0], replacements[1][1], {skipBinary: true}))
    .pipe($.replace(replacements[2][0], replacements[2][1], {skipBinary: true}))
    .pipe(gulp.dest(paths.dist.dest))
})

gulp.task('precache', () => {
  return gulp.src(paths.precache.src)
    .pipe($.filenames('assets'))
    .on('end', () => {
      const json = JSON.parse(fs.readFileSync(paths.precache.json))

      json.precacheFingerprint = gitRevSync.long()
      json.precache =
        $.filenames.get('assets')
        .map((f) => {
          if (f === 'index.html') { return '/' }
          return f.replace('/index.html', '/')
        })
        .sort()

      fs.writeFileSync(paths.precache.json, JSON.stringify(json))
    })
})

gulp.task('minify', () => {
  gulp.src(paths.scripts.minify, {base: 'dist'})
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dist.dest))

  return gulp.src(paths.html.src)
    .pipe($.htmlmin({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      preserveLineBreaks: true,
      removeComments: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyCSS: true,
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
      branch: process.env.DEPLOY_BRANCH || 'gh-pages',
      remoteUrl: `git@github.com:${pkg.repository}.git`,
      message: `Deploy ${gitRevSync.short()} from v${pkg.version}`
    }))
})
