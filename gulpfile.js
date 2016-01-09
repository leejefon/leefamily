var gulp = require('gulp');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');

var paths = {
	target: '.tmp/public',
	assets: [
		'assets/**'
	],
	templates: [
		'src/**/*.html'
	],
	assetsToWatch: [
		'assets/**',
		'src/**'
	]
};

gulp.task('uglifyJs', function () {
	rjs({
		baseUrl: "src",
		name: "Leefamily",
		mainConfigFile: "src/Leefamily.js",
		out: "leefamily.compiled.js"
	})
	.pipe(uglify())
	.pipe(gulp.dest(paths.target + '/js'));
});

gulp.task('compileAssets', function () {
	gulp.src(paths.assets)
		.pipe(gulp.dest(paths.target));

	gulp.src(paths.templates)
		.pipe(gulp.dest(paths.target + '/templates'));
});

gulp.task('watch', function () {
	gulp.watch(paths.assetsToWatch, ['uglifyJs', 'compileAssets']);
});

gulp.task('default', ['uglifyJs', 'compileAssets', 'watch']);
