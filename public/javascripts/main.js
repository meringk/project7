/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

$(document).ready(function () {

	var g_idx = "";
	$.get('/guestList', function (data) {
		$('.guestResDiv').innerHTML = "";
		for (var i = 0; i < data.length; i++) {
			var date = (data[i].g_date).split('T')[0]
				, time = (data[i].g_date).split('T')[1]
				, time_H = (time.split(':')[0]) * 1
				, calTime = calTimeFnc(time_H);
			g_idx = data[i].g_idx;

			$('.guestResDiv').append('<div> <span class="icon fa-child "/> ' + data[i].g_content + '  '
				+ '<span style=\'font-size:12px\'>   -' + date
				+ ' ' + calTime.moon + ' ' + calTime.time_H + '시</span></div>');
		}
	});



	$("#guestSubmit").submit(function (event) {
		// Stop form from submitting normally
		event.preventDefault();

		// Get some values from elements on the page:
		var $form = $(this),
			ip = "";
			message = $form.find("input[name='guestContent']").val();
		var date = new Date();
		var d = date.getDate(),
			m = date.getMonth(),
			y = date.getFullYear();
		h = date.getHours();
		m += 1;

		if (m.toString().length == 1) m = "0" + m;
		if (d.toString().length == 1) d = "0" + d;
		var fullDay = y + "-" + m + "-" + d;
		calTime = calTimeFnc(h);

		if (message == "") {
			alert("한마디 적어주세여");
		} else {

			$.ajax({
 				url: '/guestSubmit',
 				type: 'post',
 				dataType: 'json',
 				data: { ip: '', message: message },
 				success: function (data) {
 					$('.guestResDiv').prepend('<div>  <span class="icon fa-paw "/>   ' + message
 						+ ' <span style=\'font-size:12px\'> -' + fullDay + ' '
 						+ calTime.moon + ' ' + calTime.time_H + '시</span></div>');
 					$form.find("input[name='guestContent']").val("");
 				}
  			});
			  
			
			$.ajax({
				url: '/guestSubmit',
				type: 'post',
				dataType: 'json',
				data: { ip: '', message: message },
				success: function (data) {
					$('.guestResDiv').prepend('<div>  <span class="icon fa-paw "/>   ' + message
						+ ' <span style=\'font-size:12px\'> -' + fullDay + ' '
						+ calTime.moon + ' ' + calTime.time_H + '시</span></div>');
					$form.find("input[name='guestContent']").val("");
				}
			});
		
		};
	});


	guestMore = function () {

		$.get('/guestListMore?g_idx=' + g_idx, function (data) {
			for (var i = 0; i < data.length; i++) {
				var date = (data[i].g_date).split('T')[0]
					, time = (data[i].g_date).split('T')[1]
					, time_H = (time.split(':')[0]) * 1 
					, calTime = calTimeFnc(time_H);

				$('.guestResDiv').append('<div  class="new-link" style="display:none"> <span class="icon fa-child "/> ' + data[i].g_content + '  '
					+ '<span style=\'font-size:12px\'>   -' + date
					+ ' ' + calTime.moon + ' ' + calTime.time_H + '시</span></div>');
				$('.guestResDiv').find(".new-link:last").slideDown("fast");
				g_idx = data[i].g_idx;

				if (g_idx == 3) $('#guestMore')[0].style.display = "none"
			}
		});
	};

});


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

		});

		// Touch mode.
		if (skel.vars.mobile)
			$body.addClass('is-touch');

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Prioritize "important" elements on medium.
		skel.on('+medium -medium', function () {
			$.prioritize(
				'.important\\28 medium\\29',
				skel.breakpoint('medium').active
			);
		});

		// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	

		// Parallax.
		// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (skel.vars.browser == 'ie'
			|| skel.vars.mobile) {

			$.fn._parallax = function () {
				return $(this);
			};

		}
		else {

			$.fn._parallax = function () {
				$(this).each(function () {
					var $this = $(this),
						on, off;

					on = function () {
						$this
							.css('background-position', 'center 0px');
						$window
							.on('scroll._parallax', function () {
								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);
								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');
							});
					};

					off = function () {

						$this
							.css('background-position', '');
						$window
							.off('scroll._parallax');
					};

					skel.on('change', function () {
						if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();

					});

				});

				return $(this);
			};

			$window
				.on('load resize', function () {
					$window.trigger('scroll');
				});

		}

		// Spotlights.
			var $spotlights = $('.spotlight');

			$spotlights
				._parallax()
				.each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						// Use main <img>'s src as this spotlight's background.
							$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

						// Enable transitions (if supported).
							if (skel.canUse('transition')) {

								var top, bottom, mode;

								// Side-specific scrollex tweaks.
									if ($this.hasClass('top')) {

										mode = 'top';
										top = '-20%';
										bottom = 0;

									}
									else if ($this.hasClass('bottom')) {

										mode = 'bottom-only';
										top = 0;
										bottom = '20%';

									}
									else {

										mode = 'middle';
										top = 0;
										bottom = 0;

									}

								// Add scrollex.
									$this.scrollex({
										mode:		mode,
										top:		top,
										bottom:		bottom,
										initialize:	function(t) { $this.addClass('inactive'); },
										terminate:	function(t) { $this.removeClass('inactive'); },
										enter:		function(t) { $this.removeClass('inactive'); },

										// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

										//leave:	function(t) { $this.addClass('inactive'); },

									});

							}

					};

					off = function() {

						// Clear spotlight's background.
							$this.css('background-image', '');

						// Disable transitions (if supported).
							if (skel.canUse('transition')) {

								// Remove scrollex.
									$this.unscrollex();

							}

					};

					skel.on('change', function() {

						if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();

					});

				});


		// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function () {

				var $this = $(this),
					on, off;

				on = function () {

					if (skel.canUse('transition')) {

						$this.scrollex({
							top: 250,
							bottom: 0,
							initialize: function (t) { $this.addClass('inactive'); },
							terminate: function (t) { $this.removeClass('inactive'); },
							enter: function (t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

					}

				};

				off = function () {

					if (skel.canUse('transition'))
						$this.unscrollex();

				};

				skel.on('change', function () {

					if (skel.breakpoint('medium').active)
						(off)();
					else
							(on)();

				});

			});

		// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();




	});

})(jQuery);