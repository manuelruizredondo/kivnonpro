$(document).ready(function () {
  $(".kv-menu-mobile-btn").click(function () {
    $("body").toggleClass("menu-on");
    $("body").toggleClass("no-scroll ");
    $("html").toggleClass("noscroll-menu ");
  });

  ("use strict");

  TweenLite.set('#frontal1inner', { left:"50%" , top:"0", xPercent:-50 ,opacity:1 });
  TweenLite.set('#frontal3inner', { left:"50%" , top:"0", xPercent:-50 ,opacity:0 });

  TweenLite.set('#frontal3inner', { left:"50%" , top:"0", xPercent:-50 ,opacity:0 });


  $('#frontal1').click(function () {
    if (!TweenMax.isTweening('#frontal1inner')) {   

        TweenLite.to('#frontal1inner', .3, { left:"50%" , top:"0", xPercent:-50 ,opacity:1 });
        TweenLite.to('#frontal2inner', .3, { left:"50%",  top:"0", xPercent:-50 , opacity:0 });
        TweenLite.to('#frontal3inner', .3, { left:"50%",  top:"0", xPercent:-50 , opacity:0 });
    }
    return false;
  });
  8
  
  $('#frontal2').click(function () {
    if (!TweenMax.isTweening('#frontal2inner')) {
        TweenLite.to('#frontal2inner', .3,{ left:"50%" , top:"0", xPercent:-50 ,opacity:1 });
        TweenLite.to('#frontal1inner', .3, { left:"50%", top:"0", xPercent:-50 ,opacity:0 });
        TweenLite.to('#frontal3inner', .3, { left:"50%", top:"0", xPercent:-50 ,opacity:0 });
    }
    return false;
  });
  
  
  $('#frontal3').click(function () {
    if (!TweenMax.isTweening('#frontal3inner')) {
        TweenLite.to('#frontal3inner', .3,{ left:"50%" , top:"0", xPercent:-50 , opacity:1 });
        TweenLite.to('#frontal1inner', .3, { left:"50%", top:"0", xPercent:-50 , opacity:0 });
        TweenLite.to('#frontal2inner', .3, { left:"50%", top:"0", xPercent:-50 , opacity:0 });
    }
    return false;
  });


});




