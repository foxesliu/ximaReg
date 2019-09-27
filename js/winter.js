var proudkidsInter = 'http://192.1.1.101/';
var phoneText, buttonCode = 0;
//页面滚动

function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true;
            }
        }));
    } catch(e) {}
    return supportsPassiveOption;
}

//轮播变数
function shuffLing(arg) {
    if(arg ==3 || arg ==6) {
        $('#shuff-num').html('0&emsp;&nbsp;1');
    }else if(arg == 4){
        $('#shuff-num').html('0&emsp;&nbsp;7');
    }else {
        $('#shuff-num').html('1&emsp;&nbsp;1');
    }
}
//登录注册..............................................................................................................

//实时监控电话号码格式
function checkPhone(e) {

    phoneText = $(e.target).val();
    console.log(phoneText)
    if(phoneText.length == 11 && (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phoneText))){
        $(e.target).siblings('p').addClass('hidden');
        //填写号码成功，自动获取验证码
        getSms();

    }else {
        $(e.target).siblings('p').removeClass('hidden');
    }
}
//获取验证码
function getSms() {
    console.log('获取验证码')
    changeText()
    $.ajax({
        //url : proudkidsInter+'ruser/v1/sendSMS/'+phoneText,
        type : 'get',
        async : false,
        cache : false,
        dataType : 'json',
        success : function(data) {
            console.log(data)
            //验证码发送成功，倒计时
            changeText()
        },
        error : function() {
            console.log('提交失败')
        }
    })
}
function changeText() {
    if(buttonCode==1){
        alert('验证码已发送，请稍后再次获取')
        return false
    }else {
        var rightTime = 60;
        $('.button-code').html('60秒');
        countdown = setInterval(function () {

            if(rightTime>0){
                buttonCode = 1;
                rightTime --;
                $('#get-message').html(rightTime+'秒');
            }else {
                clearInterval(countdown);
                buttonCode = 0;
                $('#get-message').html('点击获取');
            }
        },1000);
    }

}
//验证码正确错误
function checkSms() {
    //接口回掉成功新用户
    console.log('123s')
    $('.form-1').hide();
    $('.form-2').show();

   /* var codeTex = $('#message').val();
    if((/^\d{6}$/.test(codeTex))){

        $.ajax({
            //url : proudkidsInter+'ruser/v1/register',
            data : JSON.stringify({
                'phone':phoneText,
                'usertype':'1',
                'code':codeTex
            }),
            type : 'post',
            async : false,
            cache : false,
            /!*dataType : 'json',*!/
            contentType:'application/json;charset=UTF-8',
            success : function(data) {
                console.log(data)
                //接口回掉成功新用户
                $('.form-1').hide();
                $('.form-2').show();
            },
            error : function(data) {
                console.log(data)

            }
        });
    }else {
        console.log('no')
    }*/

}
//领取课程
function getLesson() {

}

//我得奖励。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
function getPeopleNum() {
    $.ajax({
        url : proudkidsInter+'winShareController.do?shareInfo',
        type : 'post',
        async : false,
        cache : false,
        dataType : 'json',
        success : function(data) {
            console.log(data)
            //获取数据后添加数据

        },
        error : function() {
            console.log('提交失败')
        }
    })
}
//假数据
var data1 = [
    /*{name:'小黄鸡1',status:'已报名'},
    {name:'小黄鸡2',status:'未报名'},
    {name:'小黄鸡3',status:'未报名'},
    {name:'小黄鸡4',status:'已报名'},
    {name:'小黄鸡5',status:'已报名'},
    {name:'小黄鸡6',status:'未报名'},
    {name:'小黄鸡7',status:'未报名'},
    {name:'小黄鸡8',status:'已报名'},
    {name:'小黄鸡9',status:'未报名'},
    {name:'小黄鸡10',status:'已报名'},
    {name:'小黄鸡11',status:'未报名'},
    {name:'小黄鸡12',status:'未报名'},
    {name:'小黄鸡13',status:'未报名'},
    {name:'小黄鸡14',status:'已报名'},
    {name:'小黄鸡1',status:'未报名'},
    {name:'小黄鸡1',status:'已报名'},*/
    ];

$(document).ready(function () {
    if(data1.length == 0){
        $('.have-prizes').hide();
        $('.no-prize').show();
    }else {
        $('.have-prize').show();
        $('.no-prize').hide();
        for(var i=0;i<data1.length;i++){
            $('.invited-person tbody').append('<tr><td></td><td></td></tr>');
            $('.invited-person tbody tr').eq(i).children('td:nth-child(1)').html(data1[i].name);
            $('.invited-person tbody tr').eq(i).children('td:nth-child(2)').html(data1[i].status);
        }
    };




//年级选择
    $('.grade-box').hide();
    $('.grade-click').click(function () {
        console.log('258')
        $('.grade-box').toggle();
    })
    $('.grade-box li').click(function () {
        console.log($(this).index());
        var gradeText = $(this).html();
        $('#grade').val(gradeText);
        $('.grade-box').toggle();
    });

//kaishi yincang
    $('.register-foot,.foot-space').hide();


});


var gradeNum;
/*/!*班级选择*!/
function chooseGrade(o) {
    $(o).addClass('active').siblings().removeClass('active');
    console.log(o.innerHTML)
    $('.grade').val($(o).html());
    $('.grade-box').slideUp();
    gradeNum = $(o).index();
    //alert(gradeNum);
    grade = $("#grade").val();
}*/
/*//下拉班级
function changeGrade(o) {
    $('.grade-box').toggle();
}*/
/*领取课程*/
function endSubmit() {
    stuName = $("#name").val();
    grade = $(".ul ul").children("li").eq(gradeNum).attr('value');
    phone = $("#phone").val();
    if (stuName == "") {
        tipBai("请输入孩子名字");
        return false;
    } else if (grade == "" ||grade == undefined) {
        tipBai("请选择阶段");
        return false;
    } else {
        oldUser = getCookie("oldUser");
        var params = new Array();
        params.push({ name: "phone", value: phone});
        params.push({ name: "type", value: oldUser});
        params.push({ name: "name", value: stuName});
        params.push({ name: "level", value: grade});
        post(hostpath + "/picBooksController.do?enrollSubmit", params);
    }
}