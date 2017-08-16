// 版本控制
// 编译sass
// 检查js
// 图片合并
// 压缩css
// 压缩js
"use strict";

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyhtml = require('gulp-minify-html'),
    jshint = require('gulp-jshint'),
    rjsOptimize = require('gulp-requirejs-optimize'),
    base64 = require('gulp-base64'),
    cssimport = require("gulp-cssimport"),
    plumber = require("gulp-plumber"),
    buffer = require('vinyl-buffer'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    merge = require('merge-stream'),
    spritesmith = require('gulp.spritesmith'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    through2 = require('through2'),
    del = require("del"),
    filter = require("gulp-filter"),
    rename = require("gulp-rename"),
    watch = require("gulp-watch"),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    runSequence = require("run-sequence"),
    yargs = require('yargs')
        .options({
            'w': {
                alias: 'watch',
                type: 'boolean'
            },
            's': {
                alias: 'server',
                type: 'boolean'
            },
            'p': {
                alias: 'port',
                type: 'number'
            },
            'r': {
                alias: "release",
                type: "boolean"
            }
        }).argv;

var appJsSrc = 'src/app/**/*.js',
    src = 'src/',
    dist = 'dist/',
    jsSrc = 'src/**/*.js',
    jsDist = 'dist/',
    cssSrc = 'src/**/*.css',
    cssDist = 'dist/',
    htmlSrc = 'src/**/*.html',
    htmlDist = 'dist/',
    imageSrc = 'src/app/**/*.{png,jpg,gif}',
    imageDist = 'dist/app/',
    jsonSrc = 'src/**/*.json',
    jsonDist = 'dist/';



/**
 * @description requirejs 优化
 */
gulp.task("opt1", function () {
    gulp.src(["src/app/demo/main.js"])
        .pipe(plumber())
        //.pipe(sourcemaps.init())
        .pipe(rjsOptimize(function (file) {
            return {
                mainConfigFile: ["src/app/demo/main.js", "src/main.js"]
            };
        }))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/app/demo'));
});

gulp.task("opt", function () {
    return gulp.src(["src/main.js"])
        .pipe(plumber())
        //.pipe(sourcemaps.init())
        .pipe(rjsOptimize(function (file) {
            return {
                baseUrl: "src/",
                mainConfigFile: ["src/main.js"]
            };
        }))
        .pipe(rev())
        .pipe(through2.obj(function (file, enc, cb) {
            file.contents = new Buffer(file.contents.toString().replace(/\"main\"/, "\"" + "main-" + file.revHash + "\""));
            cb(null, file);
        }))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest("dist/app/demo/rev/js/"));

});


// 合成雪碧图
gulp.task('sprite', function () {
    // Generate our spritesheet
    imageSrc = "image/*.png";
    var spriteData = gulp.src(imageSrc).pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));

    // Pipe image stream through image optimizer and onto disk
    var imgStream = spriteData.img
        // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest("sprite/"));

    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
        .pipe(csso())
        .pipe(gulp.dest("sprite/"));

    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);
});


// 图片转base64
gulp.task("base64", function () {
    return gulp.src(cssDist)
        .pipe(base64())
        .pipe(gulp.dest(cssDist));
});

// 清空文件
gulp.task("clean", function () {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
});

// 检查js
// 清空文件 复制项目
// 压缩js requirejs优化
// 编译sass/less 添加css前缀 压缩css
// 压缩图片 合并图片
// 压缩html
// 添加版本号

/**
 * @description 构建项目
 *      1.清空文件
 *      2.复制项目
 *      3.压缩js
 *      4.requirejs 优化
 *      5.编译sass/less
 *      6.添加css前缀
 *      7.压缩css
 *      8.压缩html
 *      9.压缩图片
 *      10.合并图片
 *      11.添加版本号
 */


// 公共模块单独一个task来构建  build:common

// 独立模块构建  build:example
//    assets 静态资源  build:example:assets
//    style  样式     build:example:style
//    html   主页面   build:example:html

// release 发布
//    公共模块 + 独立模块 build:common + build:example

// watch
//   公共模块
//   独立模块构建  build:example
//      assets 静态资源
//      style  样式
//      html   主页面


// 公共模块单独一个task来构建  build:common
gulp.task("build:common:js", function () {
    var mainFilter = filter("src/main.js", {restore: true}),
        mainName = "main";
    return gulp.src(["src/**/*.js", "!src/app/**"])
        .pipe(sourcemaps.init())
        // 压缩js
        .pipe(uglify().on('error', function (e) {
            console.error(e.message);
            this.emit('end');
        }))

        //-->>-- main.js -->>--
        .pipe(mainFilter)

        // 检查
        .pipe(jshint())
        .pipe(jshint.reporter('default'))

        // 优化requirejs
        .pipe(rjsOptimize(function () {
            return {
                baseUrl: "src/",
                mainConfigFile: ["src/main.js"]
            };
        }))

        // urlArg
        .pipe(through2.obj(function (file, enc, cb) {
            file.contents = new Buffer(file.contents.toString().replace(/\{VERSION\}/, "v=" + (+new Date()) ));
            cb(null, file);
        }))

        // 添加版本号
        .pipe(rev())
        .pipe(through2.obj(function (file, enc, cb) {
            file.contents = new Buffer(file.contents.toString().replace(/\"main\"/, "\"main-" + file.revHash + "\""));
            cb(null, file);
        }))
        .pipe(mainFilter.restore)
        //--<<-- main.js --<<--

        // 输出
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/"))

        // 输出版本映射
        .pipe(rev.manifest())
        .pipe(gulp.dest("dist/app/demo/rev/js/"));
});

// 独立模块构建  build:example

// 检查js
// 压缩js
gulp.task("build:demo:js", function () {
	var src = "src/app/demo/**/*.js";
	var dist = "dist/app/demo/";

	src = "assets/zepto-master/src/*.js";
	dist = "assets/zepto-master/dist/module/";

  gulp.src(src)
    .pipe(sourcemaps.init())
    // 检查
    .pipe(jshint())
    .pipe(jshint.reporter('default'))

    // 压缩js
    .pipe(uglify().on('error', function (e) {
        console.error(e.message);
        this.emit('end');
    }))

    // 输出
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest(dist))
    .pipe(reload({stream: true}));
});


// 添加前缀
// 压缩css
// 添加版本号
gulp.task("build:demo:css", function () {
    return gulp.src("src/app/demo/css/style.css")
        .pipe(sourcemaps.init())
        // 添加前缀
        .pipe(autoprefixer({
            browsers: 'last 2 versions'
        }))

        // @import 处理
        .pipe(cssimport())

        // 压缩css
        .pipe(csso())

        // 添加版本号
        .pipe(rev())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/app/demo/css/'))

        // 版本号映射
        .pipe(rev.manifest())
        .pipe(gulp.dest("dist/app/demo/rev/css/"));
});

// 压缩图片
gulp.task("build:demo:image", function () {
    return gulp.src("src/app/demo/**/*.?(png|jpg|gif)")
        .pipe(imagemin(
            //[imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()],
            {verbose: true}
        ))
        .pipe(gulp.dest("dist/app/demo/"))
        .pipe(reload({stream: true}));
});

// 压缩html
gulp.task("build:demo:html", function () {
    return gulp.src(["src/app/demo/**/*.html", "!src/app/demo/index.html"])
        .pipe(minifyhtml())
        .pipe(gulp.dest("dist/app/demo/"))
        .pipe(reload({stream: true}));
});

// 复制文件
gulp.task("build:demo:copy", function () {
    return gulp.src(["src/app/demo/**", "!src/app/demo/**/*.?(js|html|htm|css|png|jpg|gif)"])
        .pipe(gulp.dest("dist/app/demo/"));
});

// 添加版本号
gulp.task("build:demo:rev", function () {
    return gulp.src(["dist/app/demo/rev/**/*.json", "src/app/demo/index.html"])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest("dist/app/demo/"))
        .pipe(reload({stream: true}));
});

// 公共模块单独一个task来构建  build:common
gulp.task("build:common", ["build:common:js"], function () {
    gutil.log("执行common完成!");
});

// 独立模块构建  build:demo
gulp.task(
    "build:demo",
    function (callback) {
        runSequence(
            [
                "build:demo:js",
                "build:demo:css",
                "build:demo:image",
                "build:demo:html",
                "build:demo:copy"
            ],
            "build:demo:rev",
            function (error) {
                if (error) {
                    gutil.log(error.message);
                } else {
                    gutil.log("执行build:demo完成!");
                }
                callback(error);
            }
        );
    }
);

// release 发布项目
gulp.task("release", function (callback) {
    runSequence(
        "clean",
        [
            "build:common",
            "build:demo"
        ],
        function (error) {
            if (error) {
                gutil.log(error.message);
            } else {
                gutil.log("执行release完成!");
            }
            callback(error);
        }
    );
});

// 观察文件变化
gulp.task("watch", function () {
    gulp.watch(["src/**/*.js", "!src/app/**"], function () {
        runSequence("build:common:js", "build:demo:rev");
    });

    gulp.watch("src/app/demo/**/*.js", ["build:demo:js"]);
    gulp.watch("src/app/demo/css/*.css", function () {
        runSequence("build:demo:css", "build:demo:rev");
    });
    gulp.watch("src/app/demo/**/*.?(png|jpg|gif)", ["build:demo:image"]);
    gulp.watch(["src/app/demo/**/*.html", "!src/app/demo/index.html"], ["build:demo:html"]);
    gulp.watch(["src/app/demo/**", "!src/app/demo/**/*.?(js|html|htm|css|png|jpg|gif)"], ["build:demo:copy"]);
    gulp.watch(["src/app/demo/index.html"], ["build:demo:rev"]);

    // 同步删除和修改文件名.
    watch("src/**", {events: ["unlink"]}, function (file) {
        del("dist/" + file.relative);
    });
});

// default
gulp.task('default', ['release'], function () {
    gutil.log("执行default完成!");
});

// server
gulp.task('server', function () {
    yargs.p = yargs.p || 8080;
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        ui: {
            port: yargs.p + 1,
            weinre: {
                port: yargs.p + 2
            }
        },
        port: yargs.p,
        startPath: '/app/demo/index.html'
    });
});

// 参数说明
//  -r: 发布项目
//  -w: 实时监听
//  -s: 启动服务器
//  -p: 服务器启动端口，默认8080
gulp.task('default', function () {
    if(yargs.r){
        gulp.start("release");
    }

    if (yargs.s) {
        gulp.start('server');
    }

    if (yargs.w) {
        gulp.start('watch');
    }
});






