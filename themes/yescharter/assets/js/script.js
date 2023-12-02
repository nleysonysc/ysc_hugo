(function ($) {
  'use strict';

  // Preloader js    
  $(window).on('load', function () {
    $('.preloader').fadeOut(100);
  });

  function contractHeader(){
    var height = $('.top-header').innerHeight();
    $('.top-header').addClass('hide');
    $('.navigation').addClass('nav-bg');
    $('.navigation').css('margin-top','-'+height+'px');
    $('#header').addClass('contracted');
  }

  function expandHeader(){
    $('.top-header').removeClass('hide');
    $('.navigation').removeClass('nav-bg');
    $('.navigation').css('margin-top','-'+0+'px');
    $('#header').removeClass('contracted');
  }

  // Sticky Menu
  $(window).scroll(function () {
    if ($('#header').offset().top > 10) {
      contractHeader();
    } else {
      expandHeader();
    }
  });

  $(".search-toggle").click(_ => {
    var height = window.innerHeight*.75-$('.navigation').innerHeight();
    $("#search-box").toggleClass("hide");
    $("#search-wrapper").css("max-height", height+"px");
    $("#close-search-btn").toggleClass("hide");
    $(".pagefind-ui__search-input").focus();
    $(".search-toggle").attr('aria-expanded', (i, expanded) => {return expanded === "true" ? "false" : true});
  })

  $("#close-search-btn").click(_ => {
    $("#search-box").toggleClass("hide");
    $("#close-search-btn").toggleClass("hide");
  })

  // Background-images
  $('[data-background]').each(function () {
    $(this).css({
      'background-image': 'url(' + $(this).data('background') + ')'
    });
  });

  //Hero Slider
  $('.hero-slider').slick({
    autoplay: true,
    autoplaySpeed: 7500,
    pauseOnFocus: false,
    pauseOnHover: false,
    infinite: true,
    arrows: true,
    fade: true,
    prevArrow: '<button type=\'button\' class=\'prevArrow\' aria-label=\'previous slide button\'><i class=\'ti-angle-left\'></i></button>',
    nextArrow: '<button type=\'button\' class=\'nextArrow\' aria-label=\'next slide button\'><i class=\'ti-angle-right\'></i></button>',
    dots: false
  });
  $('.hero-slider').slickAnimation();

  // venobox popup
  $(document).ready(function () {
    $('.venobox').venobox();
  });

  //  Count Up
  function counter() {
    var oTop;
    if ($('.count').length !== 0) {
      oTop = $('.count').offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $('.count').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 1000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          }
        });
      });
    }
  }
  $(window).on('scroll', function () {
    counter();
  });


})(jQuery);