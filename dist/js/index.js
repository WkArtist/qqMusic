//信息+图片渲染到页面上 render
//点击按钮
//音频的播放与暂停 切歌
//图片旋转
//列表切歌
//进度条运动与拖拽

root = window.player;
var dataList, len;
var audio = root.AudioManager;
var control;
var timer;

function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (result) {
            dataList = result.data;
            len = dataList.length;
            control = new root.controlIndex(len);
            root.render(dataList[0]);
            audio.getAudio(dataList[0].audio);
            root.pro.renderAlltime(dataList[0].duration);
            root.renderSongList(dataList);
            bindEvent();
            bindTouch(dataList[0].duration);
        },
        error: function () {
            console.log('error');
        }
    })
}

function bindEvent() {
    //将next和prev点击事件中的公共代码提取出来，定义自定义事件
    $('body').on('play:change', function (e, index) {
        root.render(dataList[index]);
        audio.getAudio(dataList[index].audio);
        $('.play').addClass('playing');
        audio.play();
        rotated(0);
        //渲染总时间
        root.pro.renderAlltime(dataList[index].duration);
        bindTouch(dataList[index].duration);
    })
    $('.prev').on('click', function () {
        var i = control.prev();
        $('body').trigger('play:change', i);
        root.pro.start(0);
    });
    $('.next').on('click', function () {
        var i = control.next();
        $('body').trigger('play:change', i);
        root.pro.start(0);
    });
    $('.list').on('click',function () {
        $('.song_list').show();
    });
    $('.close_list').on('click',function () {
        $('.song_list').hide();
    });
    $('.song_list_ul').on('click',function (e) {
        var i = e.target.getAttribute('data-id');
        $('body').trigger('play:change', i);
        root.pro.start(0);
        $('.song_list').hide();
    })
    $('.play').on('click', function () {
        if (audio.status == 'play') {
            $(this).removeClass('playing');
            audio.pause();
            clearInterval(timer);
            //进度条停止记录时间
            root.pro.stop();
        } else if (audio.status == 'pause') {
            $(this).addClass('playing');
            var deg = $('.img-box').attr('data-deg');
            audio.play();
            rotated(deg);
            //进度条开始记录时间
            root.pro.start();
        }
    })
}

function rotated(deg) {
    clearInterval(timer);
    var deg = +deg;
    timer = setInterval(function () {
        deg +=1;
        $('.img-box').attr('data-deg',deg);
        $('.img-box').css({ transform: 'rotate('+ deg + 'deg)'});
    }, 50);
}

// 拖拽事件  拖动小圆点 带着进度条运动
function bindTouch(duration) {
    var duration = duration;
    var spot = $('.spot');
    var offset = $('.pro-bottom').offset();
    var left = offset.left;
    var width = offset.width;
    var leftWidth = 0;
    spot.on('touchstart',function () {
        root.pro.stop();
    }).on('touchmove',function (e) {
        var x = e.changedTouches[0].clientX;
        leftWidth = x - left;
        root.pro.update(leftWidth);//更新小圆点位置，进度条宽度，播放时间
    }).on('touchend',function (e) {
        //获取当前时间点
        var x = e.changedTouches[0].clientX;
        leftWidth = x - left;
        var curTime = leftWidth/width*duration;
        audio.playTo(curTime);//从当前位置播放
        $('.play').addClass('playing');
        root.pro.start(leftWidth);
        audio.play();
    })
}


getData("https://www.easy-mock.com/mock/5d609f524bb1b33b12ea69e6/qqMisic/querySongList");
