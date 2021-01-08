$('.cHeader_logo').mouseenter(function () {
    $(this).children('.cHeader_logo_a1').css({
        transform: 'translate3d(48px,0px,0px)',
        transitionDuration: '200ms'
    })
    $(this).children('.cHeader_logo_a2').css({
        transform: 'translate3d(48px,0px,0px)',
        transitionDuration: '200ms'
    })
})
$('.cHeader_logo').mouseleave(function () {
    $(this).children('.cHeader_logo_a1').css({
        transform: 'translate3d(0px,0px,0px)',
        transitionDuration: '200ms'
    })
    $(this).children('.cHeader_logo_a2').css({
        transform: 'translate3d(-48px,0px,0px)',
        transitionDuration: '200ms'
    })
})

//购物车勾选按钮
//未选中状态下,鼠标移入勾显示,透明度为1,鼠标移出透明度为0;


//购物车商品展示---主要采用后台数据渲染
//在购物车页面向后台请求查询数据,并将数据渲染到页面;
showData();
function showData() {
    $.ajax({
        url: '../interface/showlist.php',
        method: 'get',
        dataType: 'json',
        success: function (res) {
            if (res.code === 1) {
                $('.product_list').empty();
                var list = res.data;
                if (list.length < 1) {
                    $('#cEmpty').show();
                    $('#main>.container').hide();
                    return;
                }
                $('#cEmpty').hide();
                $('#main>.container').show();
                // console.log(list);
                $(list).each(function (index, item) {
                    $('#main>.container>.product>.product_list').append(`
                    <div class="product_list_child">
                        <ul class="clearfix">
                            <li><span class="sp1"><i class="iconfont icon-gou"></i></span><span class="sp2"></span></li>
                            <li>
                                ${item.product_img}
                            </li>
                            <li>
                                <h3 class="product_name">${item.product_name}</h3>
                            </li>
                            <li><p class="product_price">${item.product_price}</p></li>
                            <li>
                                <div class="upnum_box">
                                    <span class="cut"><i class="iconfont icon-jianhao"></i></span>
                                    <input type="text" class="shop_num" value="${item.product_num}">
                                    <span class="add"><i class="iconfont icon-jiahao"></i></span>
                                    
                                </div>
                            </li>
                            <li>
                                <span class="total"></span>元
                                <span></span>
                            </li>
                            <li>
                                <span class="del"><i class="iconfont icon-chahao"></i></span>
                            </li>
                            <li><p class="product_id">${item.product_id}</p></li>
                        </ul>
                </div>
                    `)
                    $('.total').eq(index).text(parseInt(item.product_price) * item.product_num);
                    
                })
                
            } else {
                $('#cEmpty').show();
                $('#main>.container').hide();
            }
        },
        error: function (msg) {
            console.log(msg);
        }
    })
}

//点击-号,减少商品数量
$('.product>.product_list').on('click', '.cut', function () {

    $.ajax({
        url: '../interface/update.php',
        method: 'get',
        data: {
            id: $(this).parents('ul').children().last().children('.product_id').text(),
            type: this.className
        },
        dataType: 'json',
        success: (res) => {
            console.log($(this));
            if (res.code === 1) {
                let dec = $(this).siblings('.shop_num').val() - 1;
                if (dec < 1) {
                    dec = 1;
                    alert('商品数量不能为空');
                }
                $(this).siblings('.shop_num').val(dec); //修改的数量
                //把小计计算出来,并更新
                let result = parseInt($(this).parent('.upnum_box').parent().prev().children('.product_price').text()) * dec
                $(this).parent('.upnum_box').parent().next().children('.total').text(result);
            }


        },
        error: function (msg) {
            console.log(msg);
        }
    })
})
//点击+号,增加商品数量
$('.product>.product_list').on('click', '.add', function () {
    $.ajax({
        url: '../interface/update.php',
        method: 'get',
        data: {
            id: $(this).parents('ul').children().last().children('.product_id').text(),
            type: this.className
        },
        dataType: 'json',
        success: (res) => {
            console.log(1)
            console.log(this)
            console.log($(this))
            console.log($(this).siblings('.shop_num'))
            if (res.code === 1) {
                let dec = Number($(this).siblings('.shop_num').val()) + 1;
                $(this).siblings('.shop_num').val(dec);
                let result = parseInt($(this).parent('.upnum_box').parent().prev().children('.product_price').text()) * dec
                $(this).parent('.upnum_box').parent().next().children('.total').text(result);

            }
        },
        error: function (msg) {
            console.log(msg);
        }
    })
})

//用户点击删除按钮,可以删除当前商品,删除完成后,需要重新查询数据库,判断数据,再渲染页面
//删除商品应该是在数据库删除商品,然后把数据库的数据重新渲染到页面,不是直接删除这个结构;
$('.product>.product_list').on('click', '.del', function () {
    $.ajax({
        url: '../interface/del.php',
        method: 'get',
        data: {
            id: $(this).parents('ul').children().last().children('.product_id').text(),
        },
        dataType: 'json',
        success: function (res) {
            if (res.code === 1) {
                showData();
            }
        },
        error: function (msg) {
            console.log(msg);
        }
    })
})