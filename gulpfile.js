const gulp        = require('gulp')
const sourcemaps  = require('gulp-sourcemaps')
const sass        = require('gulp-sass')
const csso        = require('gulp-csso')
const gulpif      = require('gulp-if')
const browserSync = require('browser-sync')
const runSequence = require('run-sequence')
const del         = require('del')
const prefix      = require('gulp-autoprefixer')
const concatCss   = require('gulp-concat-css')

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

gulp.task('styles', () => {
  gulp
    .src(config.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix('last 1 version'))
    .pipe(gulpif(!config.isDev, csso()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.styles.dist))
    .pipe(gulpif(config.isDev, reload({ stream: true })))
})

// compile javascript


// compile scss

