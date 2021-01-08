
//书写一个函数来检测输入的手机号码是否符合规范
//手机号是11位数字,

function checkPhoneNum(){
    var reg=/^(1)(3|5|8|7)\d{9}$/;
    var num=$('.phone_numIn').val();
    if(reg.test(num)){
        return true;
    }else{
        $('.rMain_inner>.rForm>.warn').css('display','block');
        $('.rMain_inner>.rForm>fieldset>.phone_num').css('borderColor','#ff6666');
        return false;
    }
}
function check(){
    $('.rMain_inner>.rForm>.phone_warn').css('display','none');
    $('.rMain_inner>.rForm>.warn').css('display','none');
    $('.rMain_inner>.rForm>fieldset>.phone_num').css('borderColor','#e8e8e8');
    if($('.phone_numIn').val()==''){
        $('.rMain_inner>.rForm>.phone_warn').css('display','none');
        $('.rMain_inner>.rForm>.warn').css('display','none');
        $('.rMain_inner>.rForm>fieldset>.phone_num').css('borderColor','#e8e8e8');
    }
}

function getRegList(){
    let regList=localStorage.getItem('registerList')||"[]";
    return JSON.parse(regList);
}

function setRegList(arr){
    localStorage.setItem('registerList',JSON.stringify(arr));
}
//注册提交时检测一遍
$('.rMain_inner>.rForm>#btn').click(function(e){
    e = window.event||e;
    // e.preventDefault?e.preventDefault():e.returnValue=false;
    e.stopPropagation?e.stopPropagation():e.cancelBubble = true;
    if($('.phone_numIn').val()==''){
        $('.rMain_inner>.rForm>.phone_warn').css('display','block');
        $('.rMain_inner>.rForm>fieldset>.phone_num').css('borderColor','#ff6666');
        return;
    }
    if(checkPhoneNum()){
        let newUser={
            name:$('.reg_sel').val(),
            phoneNum:$('.phone_numIn').val()
        };
        let UserList=getRegList();//获取本地存储数据
        // UserList.forEach(function(item){
        //     if(item.phoneNum==Number(newUser.phoneNum)){
        //         alert('用户名已存在,请登录')
        //         let flagger=false;
        //         break;
        //     }
        // })

        UserList.push(newUser);
        setRegList(UserList);
        $('.phone_numIn').val('');
        $('.phone_num').css('borderColor','#e8e8e8');
        $('.rMain_inner>.rForm>.phone_warn').css('display','none');
        $('.warn').css('display','none');
        alert('账号注册成功,快去登录吧');
        // location.href='http://localhost/php/xiaomi/login.html';
    }else{
        return;
    }
})