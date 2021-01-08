const { xiaomi, parallel, series }=require('gulp');
const gulp=require('gulp');
const cssmin=require('gulp-cssmin');
const autoprefixer=require('gulp-autoprefixer');
const del=require('del');
const uglify=require('gulp-uglify');
const babel=require('gulp-babel');
const htmlmin=require('gulp-htmlmin');
const webserver=require('gulp-webserver');

//书写一个压缩并移动css文件夹的方法
const cssHandler =()=>{
    return gulp.src('./xiaomi/css/*.css')//找到文件
    .pipe(autoprefixer())//加前缀
    .pipe(cssmin())//压缩css
    .pipe(gulp.dest('./dist/css'));
}

const delHandler=()=>{
    return del(['./dist']);
}

//书写一个压缩并移动js文件夹的方法
const jsHandler=()=>{
    return gulp.src('./xiaomi/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
}
//书写一个压缩并移动htnl文件夹的方法
const htmlHandler=()=>{
    return gulp.src('./xiaomi/pages/*.html')
    .pipe(htmlmin({
        
            collapseWhitespace:true,  // 压缩所有空格，变成一行
            removeAttributeQuotes:true, //去除html属性值的引号
            minifyCSS:true, // 把html文件里面的style标签里面的压缩
            minifyJS:true,  // 把html文件里面的script标签里面的压缩
            collapseBooleanAttributes:true,//把值为布尔值的属性简写
            removeComments:true // 移除注释
        
    }))
    .pipe(gulp.dest('./dist/pages'));
}
//书写一个移动文件夹的方法
const imgHandler=()=>{
    return gulp.src('./xiaomi/images/**')
    .pipe(gulp.dest('./dist/images'));
}
//书写一个移动文件夹的方法
const fontHandler=()=>{
    return gulp.src('./xiaomi/font/**')
    .pipe(gulp.dest('./dist/font'));
}
//书写一个移动文件夹的方法
const interface1Handler=()=>{
    return gulp.src('./xiaomi/interface/model/*.php')
    .pipe(gulp.dest('./dist/interface/model'));
}
//书写一个移动文件夹的方法
const interface2Handler=()=>{
    return gulp.src('./xiaomi/interface/add.php')
    .pipe(gulp.dest('./dist/interface'));
}
//书写一个移动文件夹的方法
const interface3Handler=()=>{
    return gulp.src('./xiaomi/interface/del.php')
    .pipe(gulp.dest('./dist/interface'));
}
//书写一个移动文件夹的方法
const interface4Handler=()=>{
    return gulp.src('./xiaomi/interface/showlist.php')
    .pipe(gulp.dest('./dist/interface'));
}
//书写一个移动文件夹的方法
const interface5Handler=()=>{
    return gulp.src('./xiaomi/interface/update.php')
    .pipe(gulp.dest('./dist/interface'));
}
//书写一个移动文件夹的方法
const sassHandler=()=>{
    return gulp.src('./xiaomi/sass/**')
    .pipe(gulp.dest('./dist/sass'));
}
//书写一个开启静态服务器的任务
const serverHandler=()=>{
    return gulp.src('./dist')//找到要开启服务的根目录
    .pipe(webserver({//需要一些配置项
        port:8080,
        open:'./pages/index.html',//输入ip自动打开的页面
        livereload:true,//自动刷新浏览器,热启动
    }))
}

//自动监听文件
const watchHandler=()=>{
    gulp.watch('./xiaomi/pages/*.html',htmlHandler),
    gulp.watch('./xiaomi/css/*.css',cssHandler),
    gulp.watch('./xiaomi/images/**',imgHandler),
    gulp.watch('./xiaomi/js/**',jsHandler),
    gulp.watch('./xiaomi/sass/**',sassHandler),
    gulp.watch('./xiaomi/font/**',fontHandler),
    gulp.watch('./xiaomi/interface/**',interface1Handler),
    gulp.watch('./xiaomi/interface/**',interface2Handler),
    gulp.watch('./xiaomi/interface/**',interface3Handler),
    gulp.watch('./xiaomi/interface/**',interface4Handler),
    gulp.watch('./xiaomi/interface/**',interface5Handler)
}
module.exports.default=gulp.series(
    delHandler,
    gulp.parallel(cssHandler,jsHandler,htmlHandler,imgHandler,
        sassHandler,fontHandler,interface1Handler,interface2Handler,
        interface3Handler,interface4Handler,interface5Handler),
    serverHandler,
    watchHandler
)