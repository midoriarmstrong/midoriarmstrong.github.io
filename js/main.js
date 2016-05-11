$(document).ready(function() {
  //Going to correct anchor on clicking sidebar element
  $('.sidebar a').click(function() {
    var $url = $(this).attr('href');
    var $offset =  $($url).position();
    $('.site-wrap').animate({
      scrollTop: $offset.top
    }, 1000);
    return false;
  });
  
  //changing menu label text on click
  $('#label').click(function() {
    if ($('#nav-trigger').is(':checked') == false) {
      $('#label').html('<b><p class=\'plain-text\'> &#x25c4; menu</p></b>');
    }
    else {
      $('#label').html('<b><p class=\'plain-text\'>menu &#x25ba;</p></b>');
    }
  });
   
  //Going to top of page on clicking go to top icon
  $('#scroll-to-top').click(function() {
    $('.site-wrap').animate({
      scrollTop: $('#about').offset().top
    }, 1000);
    return false;
  });
  
  //Bringing up contact info on click
  $('.footer').click(function() {
    var footer = $('.footer');
    var contactInfo = $('.contact-info');
    var scrolled = $(this).scrollTop();
    if (footer.css('bottom') == '0px') {
      if ($('#scroll-to-top').css('display') == 'block') {
        $('.scroll-to-top').animate({bottom: 410}, 650);
        $('.scroll-to-top').animate({bottom: 385}, 200);
      }
      footer.animate({
        bottom: 335
      }, 700);
      footer.animate({
        bottom: 315
      }, 200);
      footer.html('<b><p class=\'plain-text\'>contact info &#x25BC;</p></b>');
      contactInfo.animate({
        height: 338
      }, 700);
      contactInfo.animate({
        height: 318
      }, 200);
    }
    else {
      $('.scroll-to-top').animate({bottom: 60}, 650);
      $('.scroll-to-top').animate({bottom: 70}, 200);
      footer.animate({
        bottom: -10
      }, 500);
      footer.animate({
        bottom: 0
      }, 200);
      footer.html('<b><p class=\'plain-text\'>contact info &#x25B2;</p></b>');
      contactInfo.animate({
        height: 0
      }, 500);
      if (scrolled > 200) {
        $('.scroll-to-top').animate({bottom: '70px'}, 600);
      }
    }
    return false;
  });
  
  //Fading in go to top icon and footer on scrolling down far enough
  $('.site-wrap').scroll(function() {
    var scrolled = $(this).scrollTop();
    if (scrolled > 200) {
      $('.scroll-to-top').fadeIn(); 
    }
    else {
      $('.scroll-to-top').fadeOut();
    }
    return false;
  });
 });