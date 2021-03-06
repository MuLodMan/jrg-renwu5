/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Created by 张钧 on 2017/5/7.
 */
var Carousel = (function () {
    function slide($node) {
        var $ct = $node.find('.img-ct'),
            $items = $ct.children(),
            $bullet = $ct.parents('.carousel').find('.bullet'),
            imgWidth = $(window).width(),
            imgCount = $items.size(),
            $next = $ct.parents('.carousel').find('.next'),
            $pre = $ct.parents('.carousel').find('.pre');

        $ct.append($items.first().clone());
        $ct.prepend($items.last().clone());
        $ct.find('.item').css('width', imgWidth);
        var imgRealCount = $ct.children().size();
        $ct.css({
            left: 0 - imgWidth,
            width: imgRealCount * imgWidth
        })

        var curIdx = 0;
        var lock = false;

        $bullet.find('li').on('click', function () {
            var idx = $(this).index();
            if (curIdx > idx) {
                playPre(curIdx - idx)
            } else if (curIdx < idx) {
                playNext(idx - curIdx)
            }
        })
        $next.on('click', function (e) {
            e.preventDefault();
            playNext();
        })

        $pre.on('click', function (e) {
            e.preventDefault();
            playPre();
        })
        setBg(0);
        setBg(1);
        autoPlay();

        function playNext(idx) {
            var idx = idx || 1;
            if (!lock) {
                lock = true;
                setBg(curIdx + 2);
                $ct.animate({left: '-=' + (imgWidth * idx)}, function () {
                    curIdx += idx;
                    if (curIdx === imgCount) {
                        curIdx = 0;
                        $ct.css({left: 0 - imgWidth});
                        ;
                    }

                    lock = false;
                    setBullet();
                })
            }
        }

        function playPre(idx) {
            var idx = idx || 1;
            if (!lock) {
                lock = true;
                setBg(curIdx + 2);
                $ct.animate({left: '+=' + idx * imgWidth}, function () {
                    curIdx -= idx;
                    if (curIdx === -1) {
                        $ct.css({left: 0 - imgWidth * imgCount});
                        curIdx = imgCount - 1;
                    }
                    lock = false;
                    setBullet();
                })
            }

        }

        function setBullet() {
            $bullet.children().removeClass('active')
                .eq(curIdx).addClass('active');
        }

        function setBg(idx) {
            var idx = idx || 0;

            var $node = $ct.children().eq(idx).find('.cover');
            var imgUrl = $node.attr('data-bg-img');
            if ($node.data('isBgSet')) return;
            $node.css('background-image', 'url(' + imgUrl + ')')
                .data('isBgSet', true);
        }

        function autoPlay() {
            clock = setInterval(function () {
                playNext();
            }, 3000);
        }
    }

    return {
        init: slide
    }
})()


module.exports = Carousel;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Created by 张钧 on 2017/5/7.
 */
var Exposure = (function () {
    function exposure($node) {
        var clock;
        $(window).on('scroll', function () {


            if (clock) {
                clearTimeout(clock);
            }
            clock = setTimeout(function () {
                checkShow();
            }, 300);

        });


        checkShow();

        function checkShow() {
            $node.each(function () {
                var $cur = $(this);
                if ($cur.attr('isLoaded')) {
                    return;
                }

                if (isShow($cur)) {
                    showImg($cur);
                }
            });
        }

        function isShow($el) {
            var scrollH = $(window).scrollTop(),
                winH = $(window).height(),
                top = $el.offset().top;

            if (top < winH + scrollH) {
                return true;
            } else {
                return false;
            }
        }

        function showImg($el) {
            $el.css('opacity', 1);
            $el.attr('isLoaded', true);
        }
    }

    return exposure
})()
module.exports = Exposure;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Created by 张钧 on 2017/5/7.
 */

function goTop(id) {
    this.id = id || 'jrg-gotop';
    this.init();
}

goTop.prototype = {
    init: function() {
        var $el = $('#' + this.id);
        if ($el.length === 0) {
            console.log('回到顶部');
            this.$el = $('<div id="' + this.id + '" style="position: fixed; right: 10px; bottom: 10px; display: none; width: 32px; border-radius: 6px; padding: 10px;border: 1px solid #ccc;cursor: pointer;">GO TOP</div>');
            $('body').append(this.$el);
        } else {
            this.$el = $el;
        }

        this.bind();
    },

    bind: function() {
        var me = this;
        me.$el.on('click', function() {
            me.goToTop();
        });

        $(document).on('scroll', function(){
            me.scroll();
        });
    },

    goToTop: function() {
        $(document).scrollTop(0);
    },

    scroll: function() {
        var scrollTop = $(document).scrollTop();
        if (scrollTop > 400) {
            this.$el.show();
        } else {
            this.$el.hide();
        }
    }
};
module.exports = goTop;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * Created by 张钧 on 2017/5/7.
 */
var water = (function () {
    function waterFall($data) {
        var curPage = 1,
            PageCount = 9;

        function loadAndPlace() {
            $.ajax({
                url: 'http://platform.sina.com.cn/slide/album_tech',
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                data: {
                    app_key: '1271687855',
                    num: PageCount,
                    page: curPage
                }
            }).done(function (ret) {
                if (ret && ret.status && ret.status.code == '0') {
                    place(ret.data);
                } else {
                    console.log('get wrong data');
                }
            });
            curPage++
        }

        loadAndPlace();

        $('#load').on('click', function () {
            loadAndPlace();
        })

        function place(nodeList) {
            var $node = renderData(nodeList),
                defereds = [];
            $node.find('img').each(function () {
                var defer = $.Deferred();
                $(this).load(function () {
                    defer.resolve();
                })
                defereds.push(defer);
            })
            $.when.apply(null, defereds).done(function () {
                waterFallPlace($node);
            })
        }

        function renderData(items) {
            var tpl = '',
                $node;
            for (var i = 0; i < items.length; i++) {
                tpl += '<li class="item">';
                tpl += ' <a href="' + items[i].url + '" class="link"><img src="' + items[i].img_url + '" alt=""></a>';
                tpl += ' <h4 class="header">' + items[i].short_name + '</h4>';
                tpl += '<p class="desp">' + items[i].short_intro + '</p>';
                tpl += '</li>';
            }
            $node = $(tpl);
            $data.append($node);
            return $node;
        }

        var colSumHeight = [],
            nodeWidth = $data.find('.item').outerWidth(true),
            colNum = parseInt($data.width() / nodeWidth);
        for (var i = 0; i < colNum; i++) {
            colSumHeight.push(0)
        }

        function waterFallPlace($nodes) {
            $nodes.each(function () {
                var $cur = $(this),
                    idx = 0,
                    minSumHeight = colSumHeight[0];


                for (var i = 0; i < colSumHeight.length; i++) {
                    if (colSumHeight[i] < minSumHeight) {
                        minSumHeight = colSumHeight[i];
                        idx = i;
                    }
                }

                $cur.css({
                    top: minSumHeight,
                    left: idx * nodeWidth,
                    opacity: 1
                })

                colSumHeight[idx] += $cur.outerHeight(true);
                $data.height(Math.max.apply(null, colSumHeight));
            })
        }
    }

    return waterFall
})()

module.exports = water;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// import _ from 'lodash'
// import $ from 'jquery'
var Carousel = __webpack_require__(0)
var GoTop = __webpack_require__(2)
var WaterFall = __webpack_require__(3)
var Exposure = __webpack_require__(1)

Carousel.init($('.carousel'))
WaterFall($('#pic-ct'))
Exposure($('#about li'))
new Gotop

/***/ })
/******/ ]);