const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const nano = require('gulp-cssnano')
const imagemin = require('gulp-imagemin')
const autoprefix = require('gulp-autoprefixer')
const groupqueries = require('gulp-group-css-media-queries')
const purgecss = require('gulp-purgecss')
const browserSync = require('browser-sync')
const reload = browserSync.reload

const raw = {
  scss: './static/scss/',
  img: './static/img/raw/',
}

const build = {
  css: './static/css/',
  img: './static/img/'
}

gulp.task('css', function() {
  return gulp.src(raw.scss + 'main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefix())
    .pipe(groupqueries())
    .pipe(nano())
    .pipe(rename((path) => { path.extname = ".css" }))
    .pipe(purgecss({ content: ['layouts/**/*.html'] }))
    .pipe(gulp.dest(build.css))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('img', function() {
  return gulp.src(raw.img + '*.*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({progressive: true}),
    	imagemin.optipng({optimizationLevel: 5}),
    	imagemin.svgo({
    		plugins: [
    			{removeViewBox: true},
    			{cleanupIDs: false}
    		]
    	})
    ], {verbose: true}))
    .pipe(gulp.dest(build.img))
})

gulp.task('browser-sync', function () {
	browserSync.init({
		proxy: "localhost:1313",
		notify: false
	})

  gulp.watch(raw.scss + '**/*.scss').on('change', reload)
})

exports.default = gulp.series('css', 'img', 'browser-sync')
