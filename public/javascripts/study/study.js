$(document).ready(function () {
   
    var categoryCode = $('.categoryCode').val();
    console.log(categoryCode);

    if(categoryCode!=undefined){
        categoryCode= "" + categoryCode.toString();

        $.ajax({
            url: '/study/selectStudyList',
            type: 'post',
            dataType: 'json',
            data: $('#dataForm').serialize(),
            success: function (data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    $('.main-list').append(

                    '<div  class="study-list">'
                        + '<div class="study-title"><span class="icon fa-bookmark-o"/>  '
                        + '<a class="a-study-title" href="javascript:viewPage('
                        + data[i].cont_num 
                        +')">'
                        + data[i].cont_title
                        + '</a>'
                        + '</div>'
                        + '</div>');
                }
            }
        });
    }


    viewPage = function(cont_num){
        console.log(categoryCode, cont_num);
        location.href="/html/study/study_view.html?categoryCode="+categoryCode+"&cont_num="+cont_num;
    };
});


(function ($) {

    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)',
        xxsmall: '(max-width: 360px)'
    });

    $(function () {

        var $window = $(window),
            $body = $('body'),
            $main = $('#main');
		// Fix: Placeholder polyfill.
			$('form').placeholder();

        // Nav.
        var $nav = $('#studyHead');
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