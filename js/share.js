$(document).ready(function() {
    $.ajax({
        type: 'get',
        url: 'https://wechat.proudkids.cn/winShareController.do?shareView&route=' + encodeURIComponent(window.location.href.split("#")[0]),
        async: false,
        cache: false,
        dataType: 'json',
        success: function(res) {
            wxConfig = res.obj
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wxff0504465ffbaacd', // 必填，公众号的唯一标识
                timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
                nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
                signature: wxConfig.signature, // 必填，签名
                jsApiList: ['chooseWXPay', 'onMenuShareTimeline',
                        'onMenuShareAppMessage', 'onMenuShareQQ',
                        'onMenuShareWeibo', 'onMenuShareQZone'
                    ] // 必填，需要使用的JS接口列表
            });
        }
    })
});
wx.ready(function() {

    wx.checkJsApi({
        jsApiList: ['onMenuShareTimeline',
            'onMenuShareAppMessage', 'onMenuShareQQ',
            'onMenuShareWeibo', 'onMenuShareQZone'
        ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            return {
                "checkResult": {
                    "onMenuShareTimeline": true
                },
                "errMsg": "checkJsApi:ok"
            };
        }
    });

    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    wx.onMenuShareTimeline({
        title: 'Proud Kids 1V4小班体验课', // 分享标题
        desc: "粉丝福利，固定外教小班课选：Proud Kids", // 分享描述
        link: "https://wechat.proudkids.cn/" + channelName + "/index.html?cid=" + cid,
        imgUrl: "https://files.proudkids.cn/default/tiyanbao.png", // 分享图标
        success: function() {
            alert("分享成功!");
        },
        cancel: function() {
            alert("取消分享！");
        }
    });

    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
    wx.onMenuShareAppMessage({
        title: 'Proud Kids 1V4小班体验课', // 分享标题
        desc: "粉丝福利，固定外教小班课选：Proud Kids", // 分享描述
        link: "https://wechat.proudkids.cn/" + channelName + "/index.html?cid=" + cid,
        imgUrl: "https://files.proudkids.cn/default/tiyanbao.png", // 分享图标
        success: function() {
            alert("分享成功!");
        },
        cancel: function() {
            alert("取消分享！");
        }
    });

    //获取“分享到QQ”按钮点击状态及自定义分享内容接口
    wx.onMenuShareQQ({
        title: 'Proud Kids 1V4小班体验课', // 分享标题
        desc: "粉丝福利，固定外教小班课选：Proud Kids", // 分享描述
        link: "https://wechat.proudkids.cn/" + channelName + "/index.html?cid=" + cid,
        imgUrl: "https://files.proudkids.cn/default/tiyanbao.png", // 分享图标
        success: function() {
            alert("分享成功!");
        },
        cancel: function() {
            alert("取消分享！");
        }
    });

    //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
    // wx.onMenuShareWeibo({
    //     title: '阅读打卡14天 实体绘本免费送', // 分享标题
    //     desc: '14天Raz绘本阅读训练营', // 分享描述
    //     link: "https://wechat.proudkids.cn/picBooksController.do?myIndex&invitedOpenId=" +
    //         wxConfig.openId,
    //     imgUrl: "https://wechat.proudkids.cn/webpage/winter/images/wechat.jpg", // 分享图标
    //     success: function() {
    //         alert("分享成功!");
    //     },
    //     cancel: function() {
    //         alert("取消分享！");
    //     }
    // });
    //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
    wx.onMenuShareQZone({
        title: 'Proud Kids 1V4小班体验课', // 分享标题
        desc: "粉丝福利，固定外教小班课选：Proud Kids", // 分享描述
        link: "https://wechat.proudkids.cn/" + channelName + "/index.html?cid=" + cid,
        imgUrl: "https://files.proudkids.cn/default/tiyanbao.png", // 分享图标
        success: function() {
            alert("分享成功!");
        },
        cancel: function() {
            alert("取消分享！");
        }
    });
});
