/* 
    登录页面思路分析:
                1,点击登录按钮时,首先按照正则检查输入的用户名和密码是否符合规范,
                如果不符合规范就返回错误或提示;
                符合规范,再把用户名和密码与本地存储的用户名和密码进行比较,如果一致,
                提示登录成功,自动跳转跳转到首页;
                2,检查时,如果用户名为空,提示请输入用户名;密码为空,请输入密码;
                2个都为空,提示请输入用户名;
*/
//书写一个函数用来检查用户名是否符合规范
function checkUserName(){
    let reg=/^(1)(3|5|8|7)\d{9}$/;
    if(reg.test($('.login_form>.txt').val())){
        return true;
    }else{
        $('.login_form>.txt').css('borderColor','#ff6700');
        $('.login_form>.wrong').css('display','block');
        return false;
    }
}
//书写一个函数用来检测输入的密码是否符合规范
// \w:匹配字母数字下划线   abc123@#_!~
function checkPassword(){
    let reg=/^[\w~!@#]{8,12}$/;
    if(reg.test($('.login_form>.pw').val())){
        return true;
    }else{
        $('.login_form>.pw').css('borderColor','#ff6700');
        $('.login_form>.wrong').css('display','block');
        return false;
    }
}
//书写一个函数用来实时检测用户名输入框和密码输入框的动态变化
function check(){
        $('.login_form>.txt').css('borderColor','#e0e0e0');
        $('.login_form>.txt_warn').css('display','none');
        $('.login_form>.pw').css('borderColor','#e0e0e0');
        $('.login_form>.pw_warn').css('display','none');
        $('.login_form>.wrong').css('display','none');
}

function getRegList(){
    let regList=localStorage.getItem('registerList')||"[]";
    return JSON.parse(regList);
}

function setRegList(arr){
    localStorage.setItem('registerList',JSON.stringify(arr));
}

//给登录按钮绑定点击事件
$('.login_form>.login_btn').click(function(){
    if($('.login_form>.txt').val()==''){
        $('.login_form>.txt').css('borderColor','#ff6700');
        $('.login_form>.txt_warn').css('display','block');
        return;
    }
    if($('.login_form>.pw').val()==''){
        $('.login_form>.pw').css('borderColor','#ff6700');
        $('.login_form>.pw_warn').css('display','block');
        return;
    }
    let flag=checkUserName()&&checkPassword();
    if(flag){
        let userList=getRegList();
        userList.forEach(function(item){
            if(item.phoneNum==Number($('.txt').val())){
                alert('登录成功');
                $('.login_form>.txt').val('');
                $('.login_form>.pw').val('');
                location.href='./index.html';
            }else{
                alert('登录失败,请重新登录或注册帐号');
            }
        })
    }
})
