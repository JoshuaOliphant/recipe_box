var basePath = '../';

var gulp = require('gulp'),
	sass = require('gulp-sass');

var sassPath = basePath + 'public/scss/',
	cssPath = basePath + 'public/css';


gulp.task('sass', function(){
	return gulp.src(sassPath + '**/*.scss') //get all .scss files
	.pipe(sass())
	.pipe(gulp.dest(cssPath))
});

gulp.watch(sassPath + '**/*.scss', ['sass']);