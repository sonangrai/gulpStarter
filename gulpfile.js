let gulp = require("gulp"),
  twig = require("gulp-twig2html"),
  plumber = require("gulp-plumber"),
  rename = require("gulp-rename"),
  devserver = require("browser-sync"),
  babel = require("gulp-babel"),
  autoprefixer = require("autoprefixer"),
  sass = require("gulp-sass")(require("sass")),
  postcss = require("gulp-postcss"),
  cssnano = require("cssnano"),
  sourcemap = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify");

/*
 * A twig task
 */
gulp.task("twig", function () {
  return gulp
    .src(["src/views/**/*.twig", "!src/views/**/_*.twig"])
    .pipe(plumber())
    .pipe(twig({}))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("dist"));
});

/*
 * A font task
 */
gulp.task("font", function () {
  return gulp.src("src/fonts/*.*").pipe(gulp.dest("dist/fonts"));
});

/*
 * Plugin CSS Move task
 */
gulp.task("plugins-css", function () {
  return gulp.src("src/plugins/*.css").pipe(gulp.dest("dist/css"));
});

/*
 * Plugin JS Move task
 */
gulp.task("plugins-js", function () {
  return gulp.src("src/plugins/*.js").pipe(gulp.dest("dist/js"));
});

/**
 * A js task
 */
gulp.task("javascript", function () {
  return gulp
    .src(["src/js/**/*.js"])
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("dist/js"));
});
gulp.task("javascript-build", function () {
  return gulp
    .src(["src/js/**/*.js"])
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

/**
 * A scss task
 */
gulp.task("style", function () {
  return gulp
    .src("src/scss/index.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(
      postcss([
        autoprefixer({
          flexbox: true,
          grid: "autoplace",
        }),
      ])
    )
    .pipe(sourcemap.write())
    .pipe(gulp.dest("dist/css"));
});
gulp.task("style-build", function () {
  return gulp
    .src("src/scss/index.scss")
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(
      postcss([
        autoprefixer({
          flexbox: true,
          grid: "autoplace",
        }),
        cssnano(),
      ])
    )
    .pipe(sourcemap.write())
    .pipe(gulp.dest("dist/css"));
});

//Image copy task
gulp.task("imageTask", function () {
  return gulp.src("src/images/**/*.*").pipe(gulp.dest("dist/images/"));
});

// Start development server
// This is an option
const serveoptions = {
  server: {
    baseDir: "./dist",
    index: "index.html",
    serveStaticOptions: {
      extensions: ["html"],
    },
  },
};
const httpserver = devserver.create();
gulp.task("browser-reload", function (cb) {
  httpserver.reload();
  cb();
});

function watch(cb) {
  gulp.watch(
    ["src/views/**/*.twig", "src/components/**/**/*.twig"],
    gulp.series("twig", "browser-reload")
  );
  gulp.watch("src/images/**/*.*", gulp.series("imageTask", "browser-reload"));
  gulp.watch("src/js/**/*.js", gulp.series("javascript", "browser-reload"));
  gulp.watch(
    ["src/scss/**/*.scss", "src/scss/**/_*.scss"],
    gulp.series("style", "browser-reload")
  );
  httpserver.init(serveoptions);
}

gulp.task(
  "serve",
  gulp.series(
    "twig",
    "javascript",
    "style",
    "imageTask",
    "font",
    "plugins-css",
    "plugins-js"
  )
);
gulp.task(
  "build",
  gulp.series(
    "twig",
    "javascript-build",
    "style-build",
    "imageTask",
    "font",
    "plugins-css",
    "plugins-js"
  )
);

module.exports.serve = gulp.series("serve", watch);
module.exports.build = gulp.series("build");
