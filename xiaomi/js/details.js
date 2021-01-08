//详情页轮播图
var detImg=$('.det_img');//注意这里获取的是img的jQuery集合,不是dom元素
var ord=0;//用来记录当前图片的序号,初始从0开始
var timer3=null;
var flag2=true;//用于函数节流
//初始化轮播图界面
function initUi(){
    detImg.eq(0).css('opacity',1)
    .siblings().css('opacity',0);
    $('.det_swiper_controls>.det_control_bottom>span').removeClass('det_control_active')
    .eq(0).addClass('det_control_active');
}
//添加事件
//鼠标移入det_swiper容器,停止轮播
function initEvent2(){
    $('.det_swiper').mouseenter(function(){
        stopPlay();
    });
    $('.det_swiper').mouseleave(function(){
        autoPlay();
    });
    //点击下方按钮,显示对应图片
    $('.det_swiper_controls>.det_control_bottom>span').click(function(){
        goImg($(this).index());
    });
    //左箭头
    $('.det_control_prev').click(function(){
        if(!flag2){
            return;
        }
        let transNum=ord-1;//记录目标图片序号
        transNum=transNum<0?detImg.length-1:transNum;
        goImg(transNum);
    })
    //右箭头
    $('.det_control_next').click(function(){
        if(!flag2){
            return;
        }
        let transNum=ord+1;
        transNum=transNum>detImg.length-1?0:transNum;
        goImg(transNum);
    })

}
//自动播放
function autoPlay(){
    timer3=setInterval(function(){
        //数据改变
        let currentNum=ord;
        ord++;
        if(ord>detImg.length-1){
            ord=0;
        };
        //图片变化
        detImg.eq(currentNum).animate({'opacity':0},2000);
        detImg.eq(ord).animate({'opacity':1},2000);
        //下方按钮对应变化
        $('.det_swiper_controls>.det_control_bottom>span')
        .eq(ord).addClass('det_control_active')
        .siblings().removeClass('det_control_active');
    },4000)
}
//停止播放
function stopPlay(){
    clearInterval(timer3);
}
//点击按钮显示对应图片
function goImg(transNum){
    flag2=false;
    let currentNum=ord;
    ord=transNum;//目标图片序号
    //图片改变
    detImg.eq(currentNum).animate({'opacity':0},2000);
    detImg.eq(ord).animate({'opacity':1},2000,function(){
        flag2=true;
    });
    $('.det_swiper_controls>.det_control_bottom>span')
    .eq(ord).addClass('det_control_active')
    .siblings().removeClass('det_control_active');
}
(function(){
    //1、初始化界面
    initUi();
    //2、绑定事件
    initEvent2();
    //3、自动播放
    autoPlay();
})();

/* 
    思路分析:
            1,点击加入购物车按钮,发送ajax请求,将商品信息添加到后台,添加成功,弹出
            对话框,提示商品添加成功,并不跳转到购物车页面;
            2,需要手动点击购物车链接,才会跳转到购物车页面;
            3,打开购物车页面时,向后台发送ajax请求,查询并获取数据,然后渲染到页面展示;
    技术分析:
            1,点击事件,发送ajax请求,成功的回调;
            2,点击购物车a标签链接,跳转购物车;
            3,在购物车页面执行发送ajax请求,向后台查询数据,渲染页面;
*/
// console.log($('.shop_info>.shop_price>span').text())
$('.btn_box>.btn_box_innerLeft>a').click(function(){
    $.ajax({
        url:'../interface/add.php',
        method:'get',
        data:{
            id: $('.shop_info>.shop_id').text(),
            img: $('.shop_info>.shop_img').html(),
            name: $('.shop_info>.shop_name').text(),
            price: $('.shop_info>.shop_price>span').text(),
            num: $('.shop_info>.shop_num').text()
        },
        dataType: 'json',
        success:function(res){
            if(res.code===1){
                alert('商品已成功加入购物车');
            }
        },
        error:function(msg){
            console.log(msg);
        }
    })
})