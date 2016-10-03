$(document).ready(function() {
  //Going to correct anchor on clicking sidebar element
  $('nav a').click(function() {
	var tag = $($(this).attr('href'));
	$('html, body').animate(
		{scrollTop: tag.offset().top}, 1000
	);
    return false;
  });
  
  //Increasing image size on hover
  $('.profile-pic').hover(
    function() {
      $('.profile-pic').animate({
        width: 200, height: 200
      }, 200);
    },
    function() {
      $('.profile-pic').animate({
        width: 70, height: 70
      }, 200);
  });
  
  //Opening nav on click
  $('.nav-button').click(function() {
    var moveLeft = [$('header'), $('.nav-button'), $('main')];
    var nav = $('nav');
    if (moveLeft[1].css('left') == '0px') {
      nav.css("display", "block");
      nav.animate({
        width: 250
      }, 200);
	  
      for (var i = 0; i < moveLeft.length; i++) {
        moveLeft[i].animate({
          left: 270
        }, 500);
        moveLeft[i].animate({
          left: 250
        }, 200);
      }
    }
    else {
      nav.animate({
        width: 0
      }, 500);
      for (var i = 0; i < moveLeft.length; i++) {
        moveLeft[i].animate({
            left: 0
          }, 500, function() {
            nav.css("display", "none");
        });
      }
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
  $('footer').click(function() {
    var footer = $('footer');
    var contactInfo = $('.contact-info');
    if (footer.css('bottom') == '-300px') {
      footer.animate({
        bottom: -100, right: 0
      }, 500);
      footer.html('');
    }
    else {
      footer.animate({
        bottom: -300
      }, 500);
      footer.animate({
        right: -300
      }, 500, function() {      
        footer.html('<b>&#x2709;</b>');
      });

    }
    return false;
  });
 });
