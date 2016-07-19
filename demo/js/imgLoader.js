/**
 * 预加载图片资源
 */
(function(window, document) {
    function ImgLoader(res, options) {
        this.opts = {
            onLoading: function() {},
            onComplete: function() {}
        };

        if (typeof options == 'function') {
            var tempFun = options;
            options = {
                'onComplete': tempFun
            };
        }

        for (var i in options) {
            this.opts[i] = options[i];
        }

        this._init(res);
    }

    ImgLoader.prototype = {
        _init: function(res) {
            var _self = this,
                opts = _self.opts,
                res = [].concat(res);

            var len = res.length,
                loaded = 0,
                sTime = new Date().getTime();

            var load = function(src) {

                opts.onLoading(++loaded, len, src);

                if (loaded == len) {
                    var times = new Date().getTime() - sTime;
                    opts.onComplete(times);
                }
            }

            if (len) {
                var loadItem = function(item, loadCb) {
                    var loadImgFunc = _self.loadImage;
                    loadImgFunc(item, function() {
                        var args = Array.prototype.slice.call(arguments, 0);
                        loadCb.apply(null, args);
                    })
                }

                for(var i=0; i<len; i++) {
                    loadItem(res[i], load);
                }
            } else {
                opts.onComplete(0);
            }
        },
        loadImage: function(src, fn) {
            var img = new Image(),
                sTime = new Date().getTime();
            img.onload = img.onerror = function() {
                fn(src, img, new Date().getTime() - sTime);
                img.onload = null;
            }
            img.src = src;
        }
    }

    window.ImgLoader = ImgLoader;

    if (typeof module != 'undefined' && module.exports) {
        module.exports = ImgLoader;
    } else if (typeof define == 'function' && define.amd) {
        define(function() {
            return ImgLoader;
        });
    }

})(window, document);
