'use strict'

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const gitRevSync = require('git-rev-sync')
const ghpages = require('gh-pages')
const gulp = require('gulp')
const replace = require('replace')
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
      '!src/_assets/javascripts/fonts/set-*.js',
      '!src/_assets/javascripts/main.js'
    ]
  },

  styles: {
    src: 'src/_assets/stylesheets/**/*.scss'
  },

  modernizr: {
    js: 'assets/modernizr'
  },

  vulcanize: {
    polymer: {
      build: 'polymer.html',
      name: 'polymer-vulcanized.html',
      src: 'src/_assets/bower_components/polymer',
      dest: 'src/_assets/elements',
      html: 'polymer-vulcanized'
    },
    elements: {
      name: 'vulcanized.html',
      src: 'src/_assets/elements/elements.html',
      dest: 'src/_assets/elements'
    }
  },

  crisper: {
    dest: 'dist/assets',
    polymer: {
      src: 'assets/polymer-vulcanized*.html'
    },
    elements: {
      src: 'assets/vulcanized*.html'
    }
  },

  hashed: {
    src: [
      'dist/assets/sw-toolbox/**/*',
      'dist/assets/platinum-sw/**/*'
    ]
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

gulp.task('vulcanize', () => {
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
    .pipe(gulp.dest(paths.crisper.dest))

  return gulp.src(`${paths.dist.dest}/${paths.crisper.elements.src}`)
    .pipe($.crisper({scriptInHead: false}))
    .pipe(gulp.dest(paths.crisper.dest))
})

gulp.task('hashed', () => {
  gulp.src(`${paths.dist.dest}/${paths.crisper.polymer.src}`, {
    base: paths.dist.dest
  }).pipe($.filenames('polymer'))

  gulp.src([
    `${paths.dist.dest}/${paths.crisper.elements.src}`,
    `${paths.dist.dest}/${paths.crisper.elements.src.replace('.html', '.js')}`
  ], {base: paths.dist.dest})
    .pipe($.filenames('elements'))

  return gulp.src(paths.hashed.src, {base: paths.dist.dest})
    .pipe($.filenames('hashed'))
    .on('end', () => {
      const elements = $.filenames.get('elements')
      const polymer = $.filenames.get('polymer')
      const assets = $.filenames.get('hashed').concat(polymer)
      const names = assets.map(
        (f) => (f.replace(/-[a-z0-9]+\.?([a-z]+)$/, '.$1'))
      )
      const replacePaths = assets.concat(elements).map(
        (f) => `${paths.dist.dest}/${f}`
      )

      assets.forEach((f, i) => {
        replace({
          silent: true,
          regex: path.basename(names[i]),
          replacement: path.basename(f),
          paths: replacePaths
        })
      })
    })
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

  const replacement = {
    src: `${paths.modernizr.js}.js`,
    dest: makeHashed(paths.modernizr.js, 'js')
  }

  return gulp.src(paths.dist.src)
    .pipe($.replace(replacement.src, replacement.dest, {skipBinary: true}))
    .pipe(gulp.dest(paths.dist.dest))
})

gulp.task('precache', () => {
  return gulp.src(paths.precache.src, {base: paths.dist.dest})
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
        .concat(json.precache)
        .sort()

      fs.writeFileSync(paths.precache.json, JSON.stringify(json))
    })
})

gulp.task('minify', () => {
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

gulp.task('deploy', (done) => {
  ghpages.publish(
    path.join(process.cwd(), 'dist'), {
      clone: '.deploy',
      depth: 2,
      dotfiles: true,
      message: `Deploy ${gitRevSync.short()} from v${pkg.version}`,
      repo: `git@github.com:${pkg.repository}.git`,
      branch: process.env.DEPLOY_BRANCH || 'gh-pages',
      user: {
        name: pkg.author.name,
        email: pkg.author.email
      }
    }, done)
})
