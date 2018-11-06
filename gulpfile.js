'use strict';

const gulp = require("gulp"),
      sass = require("gulp-sass"),
      clean = require('gulp-clean');

// set paths ...
const config = {
  scssPath: "src/scss",
  jsDestPath: "application/static/javascripts",
  destPath: "application/static/stylesheets",
  govukAssetPath: "application/static/govuk-frontend/assets"
}

// Delete our old stylesheets files
gulp.task('clean-css', function () {
  return gulp.src('application/static/stylesheets/**/*', {read: false})
    .pipe(clean());
});

// compile scss to CSS
gulp.task("scss", ['copy-assets'], function() {
	return gulp.src( config.scssPath + '/*.scss')
	.pipe(sass({outputStyle: 'expanded',
		includePaths: [ 'src/scss',
			'src/govuk-frontend']})).on('error', sass.logError)
	.pipe(gulp.dest(config.destPath))
})

// Watch src folder for changes
gulp.task("watch", ["scss"], function () {
  gulp.watch("src/scss/**/*", ["scss"])
});

gulp.task('copy-assets', ['clean-css'], function() {
  gulp.src('src/stylesheets/**/*')
    .pipe(gulp.dest(config.destPath));
  gulp.src('src/govuk-frontend/assets/**/*')
    .pipe(gulp.dest(config.govukAssetPath));
});

gulp.task('copy-frontend-js', function() {
  gulp.src('src/js/govuk-frontend/*.js')
    .pipe(gulp.dest(`${config.jsDestPath}/govuk-frontend`));
});

// Set watch as default task
gulp.task("default", ["watch"]);
