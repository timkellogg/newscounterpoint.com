const gulp         = require('gulp')
const gutil        = require('gulp-util')
const uglify       = require('gulp-uglify')
const gulpif       = require('gulp-if')
const exec         = require('child_process').exec
const notify       = require('gulp-notify')
const buffer       = require('vinyl-buffer')
const argv         = require('yargs').argv;
const sass         = require('gulp-sass')
const postcss      = require('gulp-postcss')
const autoprefixer = require('autoprefixer-core')
const sourcemaps   = require('gulp-sourcemaps')
const browserSync  = require('browser-sync')
const watchify     = require('watchify')
const browserify   = require('browserify')
const source       = require('vinyl-source-stream')
const imagemin     = require('gulp-imagemin')
const babelify     = require('babelify')

const production = !!argv.production

const build = argv._.length ? argv._[0] === 'build' : false;
const watch = argv._.length ? argv._[0] === 'watch' : true;

const config = {
  views: {
    watch: __dirname + '/views/**/*.pug',
  },
  styles: {
    src: __dirname + '/assets/scss/application.scss',
    dist: __dirname + '/public/css',
    watch: __dirname + '/assets/scss/**/*.scss',
  },
  js: {
    src: __dirname + '/assets/js/application.js',
    dist: __dirname + '/public/js',
    watch: __dirname + '/assets/js/**/*.js',
  },
  browserSync: {
    files: __dirname + '/views/**/*',
    proxy: 'http://localhost:3000',
    browser: 'google chrome',
  },
  dist: __dirname + '/public/**/*',
  images: {
    src: __dirname + '/assets/**/*.{gif,jpg,png,svg}',
  }
}

const beep = () => {
  const file = 'gulp/error.wav'
  exec("afplay " + file);
}

const handleError = (task) => {
  return (err) => {
    beep()
    
      notify.onError({
        message: task + ' failed, check the logs..',
        sound: false
      })(err)
    
    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err))
  }
}

const tasks = {
  sass() {
    return gulp.src(config.styles.src)
      .pipe(gulpif(!production, sourcemaps.init()))
      .pipe(sass({
        sourceComments: !production,
        outputStyle: production ? 'compressed' : 'nested'
      }))
      .on('error', handleError('SASS'))
      .pipe(gulpif(!production, sourcemaps.write({
        'includeContent': false,
        'sourceRoot': '.'
      })))
      .pipe(gulpif(!production, sourcemaps.init({
        'loadMaps': true
      })))
      .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
      .pipe(sourcemaps.write({
        'includeContent': true
      }))
      .pipe(gulp.dest(config.styles.dist));
  },

  browserify() {
    return browserify({
      entries: config.js.src,
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('application.js'))
    .pipe(gulpif(production, buffer()))
    .pipe(gulpif(production, uglify()))
    .pipe(gulp.dest(config.js.dist))
  },
  // browserify() {
  //   let bundler = browserify(config.js.src, {
  //     debug: !production,
  //     cache: {}
  //   })
  //     .transform(babelify.configure({ presets: ['es2015']}))

  //   const build = argv._.length ? argv._[0] === 'build' : false;

  //   if (watch) {
  //     bundler = watchify(bundler)
  //   }

  //   const rebundle = () => {
  //     return bundler.bundle()
  //       .on('error', handleError('Browserify'))
  //       .pipe(source('application.js'))
  //       .pipe(gulpif(production, buffer()))
  //       .pipe(gulpif(production, uglify()))
  //       .pipe(gulp.dest(config.js.dist))
  //   }
  //   bundler.on('update', rebundle)
  //   return rebundle()
  // },

  optimize() {
    return gulp.src(config.images.src)
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        optimizationLevel: production ? 3 : 1
      }))
      .pipe(gulp.dest(config.dist))
  },
}

gulp.task('serve', (done) => {
  browserSync.init({
    default: false,
    proxy: config.browserSync.proxy,
  }, done)
})

gulp.task('reload-sass', ['sass'], () => {
  browserSync.reload()
})

gulp.task('reload-js', () => {
  return gulp.watch(config.js.watch, ['browserify'], (done) => {
    browserSync.reload()
    done()
  })
})

const req = build ? ['clean'] : []

gulp.task('sass', req, tasks.sass)
gulp.task('browserify', req, tasks.browserify)
gulp.task('optimize', tasks.optimize)

gulp.task('watch', ['sass', 'browserify', 'serve'], () => {
  gulp.watch(config.styles.watch, ['reload-sass'])
  gulp.watch(config.js.watch, ['reload-js'])

  gutil.log(gutil.colors.bgGreen('Watching for changes...'))
});

gulp.task('build', ['assets', 'sass', 'browserify'])

gulp.task('default', ['watch'])
