$(function() { //获取OpenId
    var BaseUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?";
    //公众号的唯一标识
    var AppId = "wxff0504465ffbaacd";
    //授权后重定向的回调链接地址(填当前页)
    var GetCodes = 'https://wechat.proudkids.cn/landing/index.html';
    //返回类型，请填写code
    var Response_type = "code";
    //应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid）
    var Scope = "snsapi_userinfo";
    //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
    var State = "test";
    //必须带此参数
    var Wechat_Redirect = "#wechat_redirect";
    var code;
    var url = 'https://ce.proudkids.cn'
    var cid;
    var pid;

    function ReturnGetCodeUrl() {

        return BaseUrl + "appid=" + AppId + "&redirect_uri=" +
            GetCodes + "&response_type=" +
            Response_type + "&scope=" + Scope + "&state=" +
            State + Wechat_Redirect
    };
    //获取地址栏code参数
    function GetQueryString(name) {
        var url = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var newUrl = window.location.search.substr(1).match(url);
        if (newUrl != null) {
            return unescape(newUrl[2]);
        } else {
            return false;
        }
    };

    function GetCode() {
        //GetCodesUrl = 'https://wechat.proudkids.cn/purchase/index.html?' + 'cid=' + cid + '&pid=' + pid;
        //如果有code参数，那么GetOpenId获取openid
        if (GetQueryString("code")) {
            code = GetQueryString("code")
            console.log(code)
            if (localStorage.getItem('oldCode') == code) {
                console.log('have equal code')
                location.href = 'https://wechat.proudkids.cn/purchase/index.html?' + 'cid=' + cid + '%26pid=' + pid;
            } else {
                localStorage.setItem('oldCode', code)
                GetOpenId(GetQueryString("code"))
            }
            //没有那么重定向去获取
        } else {
            console.log("redict weichat auth get code")
                //重定向去微信来获取code
            location.href = ReturnGetCodeUrl()
        }
    };
    //通过上面的GetCode()取得code，然后通过code取openid
    function GetOpenId(code) {
        $.ajax({
            type: 'get',
            url: url + '/ruser/ruser/v1/wechatUser',
            async: false,
            cache: false,
            data: {
                code: code
            },
            dataType: 'json',
            success: function(res) {
                console.log(res)
                var data = res.data
                $('.nickname').text(data.nickname);
                $('.wxHeadImg').attr('src', data.headimgurl);
                console.log(data.openid)
                openId = data.openid;
                headimgurl = data.headimgurl
                localStorage.setItem('nickName', data.nickname);
                localStorage.setItem('headimgurl', data.headimgurl);
                localStorage.setItem('openId', openId);
            }
        })
    };
    $(document).ready(function() {
        if (!openId) {
            GetCode();
        }
    });
})