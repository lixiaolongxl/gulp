var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var open = require('open')
//注册任务


// 常用插件
/**
 * gulp-concat :合并文件（js/css）
 * gulp-uglify :压缩js文件
 * gulp-rename :文件重命名
 * gulp-less   :编译less
 * gulp-clean-css:压缩css
 * gulp-livereload:实时自动编译刷新
 * gulp-htmlmin :压缩html
 * gulp-connect :启动一个服务 
 * */ 
gulp.task('js',function(){
    return gulp.src('src/js/**/*.js') //找到目标文件
    .pipe(concat('build.js')) //合并文件并起名字
    .pipe(gulp.dest('dist/js/')) //输出文件
    .pipe(uglify()) //压缩
    .pipe(rename({
        suffix:'.min'
    }))//重命名
    .pipe(gulp.dest('dist/js/'))//输出文件
    .pipe(livereload()) //实时刷新
    .pipe(connect.reload())
})

gulp.task('less',function(){
    return gulp.src('src/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/'))//输出文件
    .pipe(livereload()) //实时刷新
    .pipe(connect.reload())
})

gulp.task('css',['less'],function(){
    return gulp.src('src/css/**/*.css')
    .pipe(concat('build.css'))
    .pipe(rename({
        suffix:'.min'
    }))//重命名
    .pipe(cleanCss({compatibility:'ie8'}))
    .pipe(gulp.dest('dist/css/'))
    .pipe(livereload()) //实时刷新
    .pipe(connect.reload())
})
// 注册默认任务
gulp.task('html',function(){
    return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload()) //实时刷新
    .pipe(connect.reload())
})
// livereload 半自动
gulp.task('watch',['default'],function(){
    livereload.listen(); //开启监听
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch(['src/css/**/*.css','src/less/**/*.less'],['css']);
})

//全自动

gulp.task('server',['default'],function(){
    // livereload.listen(); //开启监听
    connect.server({
        root:'dist/',
        livereload:true,
        port:'8080',
    })
    open('http://localhost:8080/'); //让浏览器打开指定地址
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch(['src/css/**/*.css','src/less/**/*.less'],['css']);
})

gulp.task('default',['js','less','css','html'])
