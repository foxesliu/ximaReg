$(function() {
    //服务器现在的时间（这里只是测试，就用浏览器时间代替）
    var startTime = '';
    //活动截止时间endTime（以服务器时间为标准，即给定的时间）
    var end = '';
    var endTime = '';
    //活动截止时间（以浏览器时间为标准）
    var browserEndTime = '';
    //距离活动结束还剩余的时间（以浏览器为标准）
    var plus = '';
    //倒计时
    startTime = new Date()

    //设置cookie
    function setCookie(name, value, iDay, iPath) {
        var oDate = new Date();
        iDay = arguments[2] ? arguments[2] : 7;
        iPath = arguments[3] ? arguments[3] : "/";
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + oDate + ";path=" + iPath;
    }
    //时间为一位数时显示格式为："0X"
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    //显示浏览器现在的时间
    function formatTime(timeVal) {
        var datePara = new Date(timeVal); //定义日期对象
        var yyyy = datePara.getFullYear(); //通过日期对象的getFullYear()方法返回年
        var MM = datePara.getMonth() + 1; //通过日期对象的getMonth()方法返回月
        var dd = datePara.getDate(); //通过日期对象的getDate()方法返回日
        var hh = datePara.getHours(); //通过日期对象的getHours方法返回时
        var mm = datePara.getMinutes(); //通过日期对象的getMinutes方法返回分
        var ss = datePara.getSeconds(); //通过日期对象的getSeconds方法返回秒
        // 如果分钟或小时的值小于10，则在其值前加0，比如如果时间是下午3点20分9秒的话，则显示15：20：09
        MM = checkTime(MM);
        dd = checkTime(dd);
        hh = checkTime(hh);
        mm = checkTime(mm);
        ss = checkTime(ss);
        return yyyy + "-" + MM + "-" + dd + " " + '23' + ":" + '59' + ":" + '59';
    }

    function setTimer() {
        end = formatTime(startTime);

        if (!plus) {
            //服务器现在的时间（这里只是测试，就用浏览器时间代替）
            startTime = new Date();
            //活动截止时间endTime（预先给定的值）
            endTime = new Date(end.replace(/-/g, "/"));
            //活动截止时间与当前时间的时间差
            plus = endTime - startTime;
        } else {
            //距离活动结束还剩余的时间， 第二次以后就不需要再计算， 直接自减即可
            plus -= 100;
            //更新当前时间(getTime()获取时间转化成毫秒后的数值)
            startTime = new Date(startTime.getTime() + 100);
            $("#start").val(formatTime(startTime));
        }

        var day = parseInt(plus / 1000 / 60 / 60 / 24);
        var hour = parseInt(plus / 1000 / 60 / 60) - day * 24;
        var minute = parseInt(plus / 1000 / 60) - parseInt(plus / 1000 / 60 / 60) * 60;
        var second = parseInt(plus / 1000) - parseInt(plus / 1000 / 60) * 60;
        var ms = parseInt(plus) - parseInt(plus / 1000) * 1000; // 剩余的毫秒数
        // 如果分钟或小时的值小于10，则在其值前加0，比如如果时间是下午3点20分9秒的话，则显示15：20：09            
        day = checkTime(day);
        hour = checkTime(hour);
        minute = checkTime(minute);
        second = checkTime(second);
        // alert('开始事件' + startTime + 'endTime' + endTime);
        // console.log(plus);
        // console.log(startTime);
        // console.log(endTime);
        //$('.second1').text(ms.substring(0, 1));
        // if (day > 9) {
        //     $('.day1').text(parseInt(day / 10))
        //     $('.day2').text(parseInt(day % 10))
        // } else {
        //     $('.day1').text('0')
        //     $('.day2').text(day % 10)
        // }
        $('.ms').text(ms.toString().substring(0, 1));
        if (hour > 9) {
            $('.hour').text(parseInt(hour));
        } else {
            $('.hour').text('0' + parseInt(hour));
        }
        if (minute > 9) {
            $('.minute').text(parseInt(minute));
        } else {
            $('.minute').text('0' + parseInt(minute));
        }
        if (second > 9) {
            $('.second').text(parseInt(second));
        } else {
            $('.second').text('0' + parseInt(second));
        }
        //console.log(day + '天' + hour + '时' + minute + '分' + second + '秒' + ms)
        if (plus <= 1) {
            clearInterval(id);
        }
    }
    //每秒循环一次，刷新活动截止时间与当前时间的时间差
    var id = setInterval(setTimer, 100);
})