const gulp        = require('gulp')
const sourcemaps  = require('gulp-sourcemaps')
const sass        = require('gulp-sass')
const csso        = require('gulp-csso')
const gulpif      = require('gulp-if')
const browserSync = require('browser-sync').create()
const runSequence = require('run-sequence')
// const del         = require('del')
const prefix      = require('gulp-autoprefixer')
const concat      = require('gulp-concat')
const cssnano     = require('gulp-cssnano')
// const pump        = require('pump')
const browserify  = require('browserify')
const uglify      = require('gulp-uglify')
// const babel       = require('gulp-babel')
const source      = require('vinyl-source-stream')
const buffer      = require('vinyl-buffer')

console.log(process.env.development)
const isDev = process.env.development || true

const config = {
  isDev,
  views: {
    watch: __dirname + '/assets/views/**/*.hbs',
  },
  styles: {
    src: __dirname + '/assets/src/scss/application.scss',
    dist: __dirname + '/assets/dist/css',
    watch: __dirname + '/assets/src/scss/**/*.scss',
  },
  js: {
    src: __dirname + '/assets/src/js/application.js',
    dist: __dirname + '/assets/dist/js',
    watch: __dirname + '/assets/src/js/**/*.js',
  },
  browserSync: {
    files: __dirname + '/views/**/*',
    proxy: 'http://localhost:3000',
    browser: 'google chrome',
  },
  dist: __dirname + '/assets/dist/**/*',
}

gulp.task('js', () => {
  return browserify({ entries: config.js.src, debug: true })
    .transform('babelify')
    .bundle()
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.js.dist))
})

gulp.task('js-watch', ['js'], (done) => {
    browserSync.reload()
    done()
});

gulp.task('styles', () => {
  return gulp.src(config.styles.src)
    .pipe(sass())
    .pipe(gulp.dest(config.styles.dist))
    .pipe(browserSync.stream())
})

gulp.task('serve', ['styles', 'js'], () => {
  browserSync.init({
    default: false,
    proxy: config.browserSync.proxy,
  })

  gulp.watch(config.js.watch, ['js-watch'])
  gulp.watch(config.styles.watch, ['styles'])
})

gulp.task('default', ['serve']);

