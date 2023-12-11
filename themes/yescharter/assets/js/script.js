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
  window.addEventListener("scroll", function () {
    if ($('#header').offset().top > 10) {
      contractHeader();
    } else {
      expandHeader();
    }
  }, {passive: true})

  $(".search-toggle").click(_ => {
    var height = window.innerHeight*.8-$('.navigation').outerHeight();
    $("#search-box").slideToggle(150);
    $("#search-wrapper").css("max-height", height+"px");
    $(".pagefind-ui__search-input").focus();
    $(".search-toggle").attr('aria-expanded', (i, expanded) => {return expanded === "true" ? "false" : true});
  })

  $("#close-search-btn").click(_ => {
    $("#search-box").slideToggle(150);
  })

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
    var venobox = new VenoBox({
        selector: '.venobox',
        numeration: true,
        infinigall: true,
        share: true,
        spinner: 'rotating-plane'
    })
  });

})(jQuery);