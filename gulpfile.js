

var gulp = require("gulp"),
  to5 = require("gulp-6to5"),
  sass = require("gulp-sass");

gulp.task("6to5", function () {
  return gulp.src("src/**/*.{js,jsx}").pipe(to5()).pipe(gulp.dest("dist"));
});

gulp.task("sass", function () {
  return gulp.src("src/**/*.scss").pipe(sass()).pipe(gulp.dest("dist"));
});

gulp.task("default", ["sass", "6to5"]);


