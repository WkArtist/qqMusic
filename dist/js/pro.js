(function ($, root) {
    var allTime;
    var frameId;
    var offset = $('.pro-bottom').offset();
    var width = offset.width;
    var baseWidth = 0;
    var startTime = 0;
    //渲染歌曲总时间
    function renderAlltime(time) {
        allTime = time;
        //格式化时间
        var dur = formatTime(time);
        $('.all-time').html(dur);
    }
    //格式化时间
    function formatTime(time) {
        var minutes = Math.floor(time / 60);
        var second = time % 60 > 9 ? time % 60 : '0' + time % 60;
        return minutes < 10 ? '0' + minutes + ':' + second : minutes + ':' + second;
    }
    // 进度条开始记录时间
    function start(base) {
        baseWidth = base == undefined ? baseWidth : base;
        cancelAnimationFrame(frameId);
        //获得刚开始的时间戳
        startTime = new Date().getTime();
        function frame() {
            //获得此刻的时间戳
            var curTime = new Date().getTime();
            var leftWidth = baseWidth + (curTime-startTime)/(allTime*1000)*width;
            if(leftWidth < width){
                update(leftWidth);
            }else{
                console.log('0');
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }
    // 记录一下停止时间
    function stop() {
        cancelAnimationFrame(frameId);
        var lastTime = new Date().getTime();
        baseWidth += (lastTime-startTime)/(allTime*1000)*width;
    }
    //更新小圆点位置，进度条宽度，播放时间
    function update(leftWidth) {
        var per = leftWidth/width;
        var nowTime = Math.round(per*allTime);
        var curTime = formatTime(nowTime);
        if (per > 0 && per < 1) {
            $('.spot').css('left',leftWidth+'px');
            $('.pro-top').css('width',leftWidth+'px');
            $('.cur-time').html(curTime);
        }
        
    }

    root.pro = {
        renderAlltime: renderAlltime,
        start: start,
        stop: stop,
        update: update
    }
})(window.Zepto, window.player || (window.player = {}))