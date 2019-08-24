//实现页面渲染 img+info+like-btn
(function ($, root) {
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
                $('.img-box img').attr('src', src);
                root.blurImg(img, $('body'));
        }
    }
    function renderInfo(data) {
        var str = '';
        str = '<div class="song-name">'+data.song+'</div>\
               <div class="singer-name">'+data.singer+'</div>\
               <div class="album-name">'+data.album+'</div>'
        $('.song-info').html(str);
    }
    function renderIsLike(isLike) {
        if(isLike){
            $('.btn.like').addClass('liking');
        }else{
            $('.btn.like').removeClass('liking');
        }
    }
    function renderSongList(data) {
        var str = '';
        data.forEach(ele => {
            str += `<li data-id=${ele.id}>${ele.song}<span>-&nbsp;${ele.singer}</span></li>`;
        });
        $('.song_list_ul').html(str);
    }
    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }
    root.renderSongList = renderSongList;
})(window.Zepto, window.player || (window.player = {}));