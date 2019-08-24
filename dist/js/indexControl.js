(function ($, root) {
    function Control(len) {//传入len值
        this.index = 0;
        this.len = len;
    }
    Control.prototype = {
        prev: function () {
            return this.getIndex(-1);
        },
        next: function () {
            return this.getIndex(1);
        },
        getIndex: function(val){
            var index = this.index;
            var len = this.len;
            var curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controlIndex = Control;//为了传入参数,将构造函数暴露出去
})(window.Zepto, window.player || (window.player = {}));