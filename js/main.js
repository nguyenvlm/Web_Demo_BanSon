jQuery(document).ready(function($) {
    // jQuery sticky Menu
    $('.mainmenu-area').sticky({
        topSpacing: 0
    });


    $('.product-carousel').owlCarousel({
        autoplay: true,
        autoplayHoverPause: true,
        loop: true,
        nav: true,
        margin: 20,
        mouseDrag: false,
        touchDrag: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });

    $('.related-products-carousel').owlCarousel({
        autoplay: true,
        autoplayHoverPause: true,
        loop: true,
        nav: true,
        margin: 20,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            },
            1200: {
                items: 5
            }
        }
    });

    $('.brand-list').owlCarousel({
        autoplay: true,
        autoplayHoverPause: true,
        loop: true,
        nav: true,
        margin: 20,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });
    // Bootstrap Mobile Menu fix
    // $(".navbar-nav li a").click(function () {
    //     $(".navbar-collapse").removeClass('in');
    // });

    // jQuery Scroll effect
    // $('.navbar-nav li a, .scroll-to-up').bind('click', function (event) {
    //     var $anchor = $(this);
    //     var headerH = $('.header-area').outerHeight();
    //     $('html, body').stop().animate({
    //         scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
    //     }, 1200, 'easeInOutExpo');

    //     event.preventDefault();
    // });

    // // Bootstrap ScrollPSY
    // $('body').scrollspy({
    //     target: '.navbar-collapse',
    //     offset: 95
    // })
});



// Bông Xù Store

function switchForm(frm) {
    var lginfrm = $('#login-form');
    var regfrm = $('#register-form');
    
    if (frm === "login") {
        lginfrm.css('display','');
        regfrm.css('display','none');
    }
    else if (frm === 'register') {
        lginfrm.css('display','none');
        regfrm.css('display','');
    }
}


// END