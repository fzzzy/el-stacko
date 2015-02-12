

var browserify = require("browserify"),
  gulp = require("gulp"),
  to5 = require("gulp-6to5"),
  sass = require("gulp-sass"),
  source = require("vinyl-source-stream");

gulp.task("6to5", function () {
  return gulp.src("src/**/*.{js,jsx}").pipe(to5()).pipe(gulp.dest("dist"));
});

gulp.task("sass", function () {
  return gulp.src("src/**/*.scss").pipe(sass()).pipe(gulp.dest("dist/css"));
});

gulp.task("javascript", ["6to5"], function () {
  var bundler = browserify({
    entries: ["./dist/routes.js"],
    debug: true
  });

  return (function () {
    return bundler.bundle().pipe(source("bundle.js")).pipe(gulp.dest("dist/js"));
  }());
});

gulp.task("default", ["sass", "javascript"]);


