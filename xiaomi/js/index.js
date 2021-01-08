

//横向导航栏
$('.li_two').hover(function(){
    
    $('.li_two>.hide_menu').animate({'height':'229px'},'fast');
},function(){
    
    $('.li_two>.hide_menu').animate({'height':'0px'},'slow');
})
//banner---轮播图
var swiperLiArr = $('.swiper-li')
var num = 0;//用来记录当前图片的序号,初始从0开始;
var timer1 = null;
var flag=true;//用于函数节流
//初始化轮播图界面
function initUI() {
    $('#banner_wrapper>.ul_01>li:nth-child(1)').css({ 'opacity': 1 })
        .siblings().css({ 'opacity': 0 });
    $('#banner_wrapper>.ul_02>li').eq(0).addClass('swiper-slide-active');
}
//添加事件
function initEvent() {
    $('#banner_wrapper').mouseenter(() => {
        stopPlay();
    });
    $('#banner_wrapper').mouseleave(() => {
        autoPlay();
    });
    //点击某个小圆点,跳转到对应的图片
    $('#banner_wrapper>.ul_02>li').click(function(){
        goImg($('#banner_wrapper>.ul_02>li').index(this));//要注意箭头函数的this指向上下文,不是事件源
    });
    //左箭头
    $('#prev').click(() => {
        if(!flag){
            return;
        }
        let transNum = num - 1;//记录目标图片序号
        transNum = transNum < 0 ? swiperLiArr.length - 1 : transNum;
        goImg(transNum);
    });
    //右箭头
    $('#next').click(() => {
        if(!flag){
            return;
        }
        let transNum = num + 1;//记录目标图片序号
        transNum = transNum > swiperLiArr.length - 1 ? 0 : transNum;
        goImg(transNum);
    });
}
//自动播放
function autoPlay() {
    timer1 = setInterval(function () {
        //数据改变
        let currentNum = num;//记录当前图片序号
        num++;//下一张图片序号
        if (num > swiperLiArr.length - 1) {
            num = 0;
        };
        //图片变化
        swiperLiArr.eq(currentNum).animate({ 'opacity': 0 }, 2000);
        swiperLiArr.eq(num).animate({ 'opacity': 1 }, 2000);
        //对应小圆点高亮
        $('#banner_wrapper>.ul_02>li').eq(num).addClass('swiper-slide-active')
            .siblings().removeClass('swiper-slide-active');
    }, 3000);
}
//停止播放
function stopPlay() {
    clearInterval(timer1);
}
//跳转到指定图片
function goImg(transNum) {
    flag=false;
    //数据改变
    let currentNum = num;//记录当前图片序号
    num = transNum;//目标图片序号
    //图片变化
    swiperLiArr.eq(currentNum).animate({ 'opacity': 0 }, 2000);
    swiperLiArr.eq(num).animate({ 'opacity': 1 }, 2000,function(){
        flag=true;
    });//这里的function是animate动画完成的回调函数,是可选参数
    //对应小圆点高亮
    $('#banner_wrapper>.ul_02>li').eq(num).addClass('swiper-slide-active')
        .siblings().removeClass('swiper-slide-active');
}
(function () {
    //1、初始化界面
    initUI();
    //2、绑定事件
    initEvent();
    //3、自动播放
    autoPlay();
})();

//侧边导航栏功能
$('.side_nav>.ul-2>li').mouseenter(function(){
    $(this).css('backgroundColor','#ff6700');
    $(this).children('.hide_options').css('display','block');
})
$('.side_nav>.ul-2>li').mouseleave(function(){
    $(this).css('backgroundColor','rgba(255,255,255,0)');
    $(this).children('.hide_options').css('display','none');
})
//闪购功能
/* 
    思路分析:
            1,获取目标时间的时间戳;
            2,获取当前时间的时间戳;
            3,计算2者的差值,再换算成小时,分钟,秒;
            4,放在定时器里面,每秒钟更新一次;
            5,利用jQuery设置text()或html()来设置值;
*/

var deadline=function (){
    let time1=new Date('2021.1.8 15:00:00');
    let time2=new Date();
    let displayTime=parseInt((time1-time2)/1000);//单位是秒数
    // console.log(displayTime)
    //计算小时
    let hours=parseInt(displayTime/3600);
    displayTime=displayTime-hours*3600;
    //计算分钟
    let minutes=parseInt(displayTime/60);
    displayTime=displayTime-minutes*60;
    //计算秒
    let seconds=displayTime;
    $('.deadlineTime>.hours').text(hours);
    $('.deadlineTime>.minutes').text(minutes);
    $('.deadlineTime>.seconds').text(seconds);
    if(time1<=time2){
        clearInterval(timer3);
        $('.deadlineTime>.hours').text('00');
        $('.deadlineTime>.minutes').text('00');
        $('.deadlineTime>.seconds').text('00');
        $('.inner_left>.dec').text('本场已结束');
    }
}
deadline();
var timer3=setInterval(function(){
    deadline();
},1000)



//横向轮播图
/* 
    思路分析:
            1,ul向左偏移,即x轴方向负向偏移;使用transform:translate3d(0px,0px,0px)
            2,使用定时器自动滚动;
            3,鼠标放上去并不停止滚动;
            4,最后2张图片偏移量是前面每次偏移量的一半;
            5,所有图片偏移完成后,退回到起点,重新开始偏移;
            6,右上角的左右箭头,可以手动切换滚动方向;
            7,每4张图片为一组滚动;
*/
//获取元素
var now=0;//记录单程滚动的次数
var count=Math.ceil(14/4)-1;//总共滚动的次数
var timer2=null;

timer2=setInterval(function(){
    now++;
    
    if(now>count){
        $('.m_one_inner>.inner_right>ul').css({
            "transform":'translate3d(0px,0px,0px)',
            "transitionDuration":"1000ms"
        });
        now=0;
    }else{
        tab();
    }
    
},4000)
//左右切换箭头
var spans=$('.slide-controls>span');
spans.click(function(){
    if($(this).index()==0){
        now--;
        now=Math.max(0,now);
    }else{
        now++;
        now=Math.min(count,now);
    }
    tab();
})
//把滚动封装成一个函数
function tab(){
    now==0?spans.eq(0).css('aria-disabled',true):spans.eq(0).css('aria-disabled',false);
    now==count?spans.eq(1).css('aria-disabled',true):spans.eq(0).css('aria-disabled',false);
    var target=now==count?now*-992+496:now*-992;
    $('.m_one_inner>.inner_right>ul').css({
        "transform":'translate3d('+target+'px,0px,0px)',
        "transitionDuration":"1000ms"
    });
}

//商品展示效果
$('.m_two_inner_left').mouseenter(up);
$('.m_two_inner_left').mouseleave(back);

$('.m_two_inner_right>ul>li').mouseenter(up);
$('.m_two_inner_right>ul>li').mouseleave(back);

$('.m_last_inner>ul>li').mouseenter(up);
$('.m_last_inner>ul>li').mouseleave(back);
//商品效果封装成一个函数
function up(){
    $(this).css({
        transform:'translate3d(0px,-2px,0px)',
        transitionDuration:'0.2s',
        transitionTimingFunction:'linear',
        boxShadow:'0px 15px 30px rgba(0,0,0,.1)'
    })
}
function back(){
    $(this).css({
        transform:'translate3d(0px,0px,0px)',
        transitionDuration:'0.2s',
        transitionTimingFunction:'linear',
        boxShadow:'0px 0px 0px rgba(0,0,0,0)'
    })
}
//横向导航栏
// $('.li_two').each(function(index,item){
//         $(item).mouseenter(function(){
//             $.ajax({
//                 url:'',
//                 success:function(){

//                 },
//                 error:function(msg){
//                     console.log(msg);
//                 }
//             })
//             $(this).append($(`<div class="pictureBox">
//                 <img src="" alt="">
//                 </div>
//                 <p class="title"></p>
//                 <p class="price"></p>
//                 <a href="#"></a>`))

//         })

// })


//回到顶部
console.log($('.home_tool_bar>ul>li').eq(5));
$(window).scroll(function () {
    if ($(this).scrollTop() > 720) {
        $('.home_tool_bar>ul>li').eq(5).css('display', 'block');
    } else {
        $('.home_tool_bar>ul>li').eq(5).css('display', 'none');
    }
})
$('.home_tool_bar>ul>li').eq(5).on('click', function () {
    $(window).scrollTop(0);
})