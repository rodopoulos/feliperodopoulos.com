var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var nano = require('gulp-cssnano');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


var raw = {
  scss: './static/scss/',
  img: './static/img/raw/',
};

var build = {
  css: './static/css/',
  img: './static/img/'
};

gulp.task('sass', function() {
  return gulp.src(raw.scss + 'main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(build.css));
});

gulp.task('css', ['sass'], function() {
  return gulp.src(build.css + 'style.css')
    .pipe(prefix('last 5 versions'))
    .pipe(nano())
    .pipe(gulp.dest(build.css))
    .pipe(reload({stream: true}));
});

gulp.task('img', function() {
  return gulp.src(raw.img + '*.*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
    	imagemin.optipng({optimizationLevel: 5}),
    	imagemin.svgo({
    		plugins: [
    			{removeViewBox: true},
    			{cleanupIDs: false}
    		]
    	})
    ], {verbose: true}))
    .pipe(gulp.dest(build.img));
});

gulp.task('browser-sync', function () {
	browserSync.init({
		proxy: "localhost:1313",
		notify: false
	});

  gulp.watch(raw.scss + '**/*.scss', ['sass', 'css']).on('change', reload);
});

gulp.task('default', ['css', 'img', 'browser-sync']);
