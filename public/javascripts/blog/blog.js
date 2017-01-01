$(document).ready(function () {
    var nowLocation = location.href;
    var s = nowLocation;
    if (s.indexOf('schedule') == -1) {
        var categoryCode = $('.categoryCode').val();
        $.ajax({
            url: '/blog/selectBlogList',
            type: 'post',
            dataType: 'json',
            data: $('#dataForm').serialize(),
            success: function (data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    // var date = (data[i].cont_regdate).split('T')[0]
                    // 	, time = (data[i].cont_regdate).split('T')[1]
                    // 	, time_H = (time.split(':')[0]) * 1 
                    // 	, calTime = calTimeFnc(time_H);

                    $('.main-list').append(
                        '<div  class="blog-list">'
                        + '<div class="blog-title"><span class="icon fa-bookmark-o"/>  '
                        + '<a class="a-blog-title" href="javascript:viewPage('
                        + data[i].cont_num
                        + ')">'
                        + data[i].cont_title
                        + '</a>'
                        + '</div>'
                        // + '<div class="blog-list-time"> <span style=\'font-size:12px\'>   -' + date
                        // + ' ' + calTime.moon + ' ' + calTime.time_H + '시</span></div>'
                        + '</div>');
                }
            }
        });
        viewPage = function (cont_num) {
            console.log("33??")
            console.log(categoryCode, cont_num);
            cont_num = cont_num*1;
            $.ajax({
                url: '/blog/selectBlogContent',
                type: 'post',
                dataType: 'json',
                data: { categoryCode: categoryCode, cont_num: cont_num },
                success: function (data) {
                    console.log(data);
                    $('.main-list')[0].innerHTML = "";
                    $('.main-list').append(
                        '<div class="blog_cont_title">' + data[0].cont_title + '<br/></div>'
                        + '<div class="blog_cont_content">' + data[0].cont_content + '<br/></div>'

                    );
                }
            });
        };
    }
});


(function ($) {

    $(function () {

        var $window = $(window),
            $body = $('body'),
            $main = $('#main');

        // Fix: Placeholder polyfill.
        $('form').placeholder();


        console.log($('.blog-head'))
        $('.blog-head > ').removeClass("active");

        // Nav.
        var $nav = $('#blogHead');
        console.log($nav);

        if ($nav.length > 0) {

            // Shrink effect.
            $main
                .scrollex({
                    mode: 'top',
                    enter: function () {
                        $nav.addClass('alt');
                    },
                    leave: function () {
                        $nav.removeClass('alt');
                    },
                });

            // Links.
            var $nav_a = $nav.find('a');

            $nav_a
                .scrolly({
                    speed: 1000,
                    offset: function () { return $nav.height(); }
                })
                .on('click', function () {

                    var $this = $(this);

                    // External link? Bail.
                    if ($this.attr('href').charAt(0) != '#')
                        return;

                    // Deactivate all links.
                    $nav_a
                        .removeClass('active')
                        .removeClass('active-locked');

                    // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
                    $this
                        .addClass('active')
                        .addClass('active-locked');

                })
                .each(function () {

                    var $this = $(this),
                        id = $this.attr('href'),
                        $section = $(id);

                    // No section for this link? Bail.
                    if ($section.length < 1)
                        return;

                    // Scrollex.
                    $section.scrollex({
                        mode: 'middle',
                        initialize: function () {

                            // Deactivate section.
                            if (skel.canUse('transition'))
                                $section.addClass('inactive');

                        },
                        enter: function () {

                            // Activate section.
                            $section.removeClass('inactive');

                            // No locked links? Deactivate all links and activate this section's one.
                            if ($nav_a.filter('.active-locked').length == 0) {

                                $nav_a.removeClass('active');
                                $this.addClass('active');

                            }

                            // Otherwise, if this section's link is the one that's locked, unlock it.
                            else if ($this.hasClass('active-locked'))
                                $this.removeClass('active-locked');

                        }
                    });

                });

        }

    });

})(jQuery);