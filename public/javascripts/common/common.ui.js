/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/



(function ($) {


	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function () {

		var $window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function () {

			window.setTimeout(function () {
				$body.removeClass('is-loading');
			}, 0);


			// Off-Canvas Navigation.

			// Title Bar.

			var nowLocation = location.href;
			if(s.indexOf('blog') > -1){
				nowLocation = "<a href='/html/blog/blog.html'>BLOG</a>";
			}else{
				nowLocation = "";
			}

			$(
				'<div id="titleBar">' +
				'<a href="#navPanel" class="toggle"></a>' +
				'<span class="title">' + $('#logo').html() +' ' + nowLocation + '</span>'  + 
				'</div>'
			).appendTo($body);

			// Navigation Panel.
			$(
				'<div id="navPanel">' +
				'<nav>' +
				$('#nav').navList() +
				'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
			if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
				$('#titleBar, #navPanel, #page-wrapper')
					.css('transition', 'none');

			// Dropdowns.
			$('#nav > ul').dropotron({
				alignment: 'right',
				hideDelay: 350
			});


		});


	});

})(jQuery);