$(document).ready(function() {
    var $window = $(window),
        $body = $('body'),
        minifyClass = 'minify',
        $expandBar = $('.expand-bar'),
        $circleEl = $('.clocks-wrapper');

    feather.replace();

    $('nav .hamburger').click(function() {
        $(this).toggleClass('is-active');
        $body.toggleClass('nav-open');
        $('.dimmer').delay(300).fadeToggle();
        $('.sticky-top-cover').delay(300).fadeToggle();

        if($body.hasClass('nav-open')) {
        	var $delay = 0;
        	$($('ul.anchor-link li').get().reverse()).each(function() {
				$(this).delay($delay).animate({
			        marginRight: '0px'
			    }, 800, 'easeOutQuart');
			    $delay += 50;
	        });
        } else {
        	var $delay = 0;
	        $('ul.anchor-link li').each(function() {
				$(this).delay($delay).animate({
			        marginRight: '-300px'
			    }, 600, 'easeInQuart');
			    $delay += 50;
	        });
        }
    });

    $('.anchor-link li a').click(function() {
    	var $delay = 0;
        $('ul.anchor-link li').each(function() {
			$(this).delay($delay).animate({
		        marginRight: '-300px'
		    }, 800, 'easeInQuart');
		    $delay += 50;
        });

        $('nav .hamburger').toggleClass('is-active');
        $body.removeClass('nav-open');
    });

    // Change active menu item on page scroll
    // Cache selectors
    var lastId,
        topMenu = $(".anchor-link"),
        topMenuHeight = topMenu.outerHeight(),
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 2000, 'easeInOutExpo', function() {
            $('.dimmer').fadeOut();
            $('.sticky-top-cover').fadeOut();
        });

        e.preventDefault();
    });

    $window.scroll(function() {
        // If scroll down, add class minify to body
        if ($window.scrollTop() >= 50) {
            $body.addClass(minifyClass);
        } else {
            $body.removeClass(minifyClass);
        }

        // Bind to Scroll
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });

    // $('.bar > div p, .bars > div p').text(function() {
    //     return $(this).parent().data('value');
    // }).append('%');

    // Scroll smooth to anchor Function
    // var $root = $('html, body');

    // $anchors.click(function () {
    //     $root.animate({
    //         scrollTop: $( $.attr(this, 'href') ).offset().top
    //     }, 3000, 'easeInOutQuint');

    //     return false;
    // });

    // Hidden magic
    var $clicked = 0;

    $('.hidden-magic').click(function() {
    	if ($clicked >= 10) {
    		$('.adv-logo').attr('src', 'img/content/advance-logo-white-magic.svg');
    		$('.adv-logo-footer').attr('src', 'img/content/advance-logo-color-magic.svg');
    		$body.addClass('hidden-magic');
    	} else {
    		$clicked ++;
    		console.log('clicked: ' + $clicked);
    	}
    });

    $circleEl.viewportChecker({
        classToAdd: 'visible',
        repeat: false,
        offset: '10%',
        invertBottomOffset: true
    });


    //All kinds of functions to move the bars and their percentages

    //Function to change the width of symmetrical (50/50) bars
    var $barEl = $('.horizontal-bar-container');
    $barEl.viewportChecker({
        repeat: false,
        offset: '10%',
        invertBottomOffset: true,
        callbackFunction: function(elem, action){
          var dataPercentage = elem.attr('data-percentage')
          if(action == 'add') {
            elem.find('.bar-foreground').css('width', dataPercentage + '%');
            changeNumberValue(elem, dataPercentage);
          }
        }
    });
    //Use for symmetrical (50/50) bars
    function changeNumberValue(element, endValue) {
      const start = 50;
      //current always starts in the middle
      var current = start;
      //end is the the given percentage (attribute)
      var end = endValue;
      //difference is the ABSOLUTE difference between start (50%) and end (attribute)
      var difference = Math.abs(start - end);
      //transitionDelay is the amount of time each number change should take to change, in order to allow the numbers and the bar to end AT THE SAME TIME!
      var transitionDelay = 1000 / difference
      if (end < start) {
        subtract(current, end, element, transitionDelay);
      }
      else if (end > start) {
        add(current, end, element, transitionDelay);
      }
    }
    //Use when value is bellow 50%
    function subtract (current, end, element, transitionDelay) {
       setTimeout(function () {
          current--;
          if (current >= end) {
             subtract(current, end, element, transitionDelay);
             element.find('.text-left').html(current + '%')
             element.find('.text-right').html(100 - current + '%')
          }
       }, transitionDelay)
    }
    //Use when value is above 50%
    function add (current, end, element, transitionDelay) {
       setTimeout(function () {
          current++;
          if (current <= end) {
             add(current, end, element, transitionDelay);
             element.find('.text-left').html(current + '%')
             element.find('.text-right').html(100 - current + '%')
          }
       }, transitionDelay)
    }

    //Use to expand width of expandable horizontal and vertical bars
    $expandBar.viewportChecker({
        classToAdd: 'visible',
        repeat: false,
        offset: '10%',
        invertBottomOffset: true,
        callbackFunction: function(elem, action){
          var dataValue = elem.attr('data-value')
          //How long it takes each number to change depends on how many numbers need to change. In total, the final number must be visible after 1 second.
          var transitionDelay = 1000 / dataValue;
          //What is the total value of the element. In other words, how wide is the bar when it is 100% wide?
          var totalValue = elem.attr('data-total-value')
          //In which direction must the bar expand? Upwards or sidewards? Height or width?
          var expandDirection = elem.attr('data-expand-direction')
          //Provide the element with the correct width or height
          elem.css(expandDirection, ((100 / totalValue) * dataValue) + '%')
          //Run the function which increases the number on the side
          increaseNumber(elem, dataValue, 0, transitionDelay)
        },
    });
    //Use for expanding bars
    function increaseNumber(elem, dataValue, current, transitionDelay) {
      //This a recursive loop with a transitional Delay.
      setTimeout(function () {
        elem.find('p').html(current + '%')
        current++;
        if (current <= dataValue) {
          elem.find('p').html(current + '%')
          increaseNumber(elem, dataValue, current, transitionDelay)
        }
      }, transitionDelay)
    }

    $('.triangle-symbol').viewportChecker({
        classToAdd: 'visible',
        repeat: false,
        offset: '10%',
        invertBottomOffset: true,
        repeat: true,
    });

});
