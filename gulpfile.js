
const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const minify = require("gulp-minify-css");
const connect = require("gulp-connect");

gulp.task("copy-html", function(){
    gulp.src("index.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload())
})

gulp.task("copy_html", function(){
    gulp.src(["*.html", "!index.html"])
    .pipe(gulp.dest("dist/html"))
    .pipe(connect.reload())
})

gulp.task("copy-js", function(){
    gulp.src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
})

gulp.task("copy-data", function(){
    gulp.src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload())
})

gulp.task("copy-pic", function(){
    gulp.src("images/*.{jpg,png,gif}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload())
})

gulp.task("copy-css", function(){
    gulp.src("*.css")
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

gulp.task("sass", function(){
    gulp.src("stylesheet/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minify())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

gulp.task("sass1", function(){
    gulp.src("stylesheet/shopping.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minify())
    .pipe(rename("shopping.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

gulp.task("sass2", function(){
    gulp.src("stylesheet/shopping_cart.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minify())
    .pipe(rename("shopping_cart.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

gulp.task("copy-php", function(){
    gulp.src("*.php")
    .pipe(gulp.dest("dist/php"))
    .pipe(connect.reload())
})

gulp.task("bulid", ["copy-html", "copy_html", "copy-js", "copy-data", "copy-pic", "copy-css", "sass", "sass1", "sass2", "copy-php"], function(){
    console.log("数据加载完成")
})


gulp.task("watch", function(){
    gulp.watch("index.html", ["copy-html"]);
    gulp.watch(["*.html", "!index.html"], ["copy_html"]);
    gulp.watch(["*.js", "!gulpfile.js"], ["copy-js"]);
    gulp.watch(["*.json", "!package.json"], ["copy-data"]);
    gulp.watch("images/*.{jpg,png,gif}", ["copy-pic"]);
    gulp.watch("stylesheet/index.scss", ["sass"]);
    gulp.watch("stylesheet/shopping.scss", ["sass1"]);
    gulp.watch("stylesheet/shopping_cart.scss", ["sass2"]);
    gulp.watch("*.css", ["copy-css"]);
    gulp.watch("*.php", ["copy-php"]);
})

gulp.task("server", function(){
    connect.server({
        root:"dist",
        port:3014,
        livereload: true

    })
})

gulp.task("default",  ["server","watch"])