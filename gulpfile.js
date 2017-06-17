const gulp        = require('gulp')
const sourcemaps  = require('gulp-sourcemaps')
const sass        = require('gulp-sass')
const csso        = require('gulp-csso')
const gulpif      = require('gulp-if')
const browserSync = require('browser-sync')
const runSequence = require('run-sequence')
const del         = require('del')
const prefix      = require('gulp-autoprefixer')
const concat      = require('gulp-concat')
const cssnano     = require('gulp-cssnano')
const pump        = require('pump')

const isDev = process.NODE_ENV || true

const reload = browserSync.reload

const config = {
  isDev,
  styles: {
    src: __dirname + '/assets/src/scss/application.scss',
    dist: __dirname + '/assets/dist/css',
    watch: __dirname + '/assets/src/scss/**/*.scss',
  },
  js: {
    src: '',
    dist: __dirname + '/assets/dist/js',
    watch: ''
  },
  dist: __dirname + '/assets/dist/**/*',
}

gulp.task('clean', del.sync([config.dist]))

gulp.task('default', ['clean'], () => {
  const tasks = [
    'styles',
  ]

  runSequence(tasks, () => {
    if (config.isDev) {
      gulp.start('serve')
    }
  })
})

gulp.task('styles', (cb) => {
  pump(
    [
      gulp.src([
        config.styles.watch
      ]),
      sourcemaps.init(),
      concat('application.css'),
      sass(),
      cssnano({
        autoprefixer: {
          add: true,
        },
      }),
      sourcemaps.write(),
      gulp.dest(config.styles.dist),
      // browserSync.stream(),
    ],
    cb
  )
})

// compile javascript
gulp.task('serve', () => {
  // browserSync({
  //   server: {
  //     baseDir: config.dest,
  //   },
  //   notify: false,
  //   open: false,
  // })

  gulp.task('styles:watch', ['styles'])
  gulp.watch(config.styles.watch, ['styles:watch'])

})

// compile scss

