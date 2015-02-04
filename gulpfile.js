
var gulp = require("gulp"),
  to5 = require("gulp-6to5");

gulp.task("default", function () {
  return gulp.src("src/**/*.{js,jsx}").pipe(to5()).pipe(gulp.dest("dist"));
});


