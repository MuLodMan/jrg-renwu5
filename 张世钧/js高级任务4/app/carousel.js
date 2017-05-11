/**
 * Created by 张钧 on 2017/5/7.
 */
var $ = require('jquery')
var Carousel = (function () {
    function slide($node) {
        var $ct = $node.find('.img-ct'),
            $items = $ct.children(),
            $bullet = $ct.parents('.carousel').find('.bullet'),
            imgWidth = $(window).width(),
            imgCount = $items.length,
            $next = $ct.parents('.carousel').find('.next'),
            $pre = $ct.parents('.carousel').find('.pre');

        $ct.append($items.first().clone());
        $ct.prepend($items.last().clone());
        $ct.find('.item').css('width', imgWidth);
        var imgRealCount = $ct.children().length;
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