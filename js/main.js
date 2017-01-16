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
  
  $('section#mail form').submit(function(e) {  
    e.preventDefault();
    
    if ($('section#mail input[name="entry.731334852"]').val() != "" && $('section#mail textarea').val() != "") {
      $('section#mail > p').removeAttr('class');
      $('section#mail > p').text('Your message has been sent.').fadeIn();
      $('section#mail > p').attr('class', 'success');
      $('section#mail input').val('');
      $('section#mail textarea').val('');      
      this.submit();
    } else {
      $('section#mail > p').text('Error: please fill in all required fields.').fadeIn();
      $('section#mail > p').attr('class', 'error');
    } 
  });
 });

