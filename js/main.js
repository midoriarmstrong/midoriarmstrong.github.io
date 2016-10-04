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
  
  //Opening sidebar on click
  $('.nav-button').click(function() {
    var moveLeft = [$('header'), $('.nav-button'), $('main')];
    var nav = $('.sidebar');
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
            nav.css("display", "");
        });
      }
    }
  });
  
  //Bringing up contact info on click
  $('.contact-form').click(function() {
    var contactForm = $('.contact-form');
    if (contactForm.css('bottom') == '-300px') {
      contactForm.animate({
        bottom: -100, right: 0
      }, 500);
      contactForm.html('');
      contactForm.css("background-color", "white");
    }
    else {
      contactForm.animate({
        bottom: -300
      }, 500);
      contactForm.animate({
        right: -300
      }, 500, function() {      
        contactForm.html('<b>&#x2709;</b>');
        contactForm.css("background-color", "");
      });

    }
    return false;
  });
 });
