$(document).ready(function() {
  // Scrolling to top of page on click
  $('main > a').click(function() {
    $('html, body').animate(
      {scrollTop: 0}, 500
    );
      return false;
  });
  
  // Sliding in/out slide to top span on scroll 
  $(window).scroll(function() {
    if ($(this).scrollTop() > 150) {
      $('main > a').fadeIn();
      return;
    }
    
    $('main > a').fadeOut();
  });
  
  // Ouputting error/success messages for contact form.
  $('section#mail form').submit(function(e) {  
    e.preventDefault();
    var mail = $('section#mail > p');
    
    if ($('section#mail input[name="entry.731334852"]').val() != "" && $('section#mail textarea').val() != "") {
      mail.removeAttr('class');
      mail.text('Your message has been sent.').fadeIn();
      mail.attr('class', 'success');
      $('section#mail label > input, textarea').val('');
     
      this.submit();
    } else {
      mail.text('Error: please fill in all required fields.').fadeIn();
      mail.attr('class', 'error');
    } 
  });
  
  // Toggling main menu on mobile devices
  $('header > nav > ul > li:last-of-type').click(function() {
    var prev = $(this).prevAll();
 
    // If menu items are hidden 
    if (prev.css('display') == 'none') {
      prev.slideDown(); // Slide down menu items

    } else {
      prev.slideUp(function() { // Slide up menu items
        prev.removeAttr('style'); // Remove superfluous in-line style element to prevent issues when shifting to larger display size
      });
    }
  });
  
 });

