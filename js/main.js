$(document).ready(function() {
  // Scrolling to contact form on click
  $('main > a').click(function() {
	var tag = $($(this).attr('href'));
	$('html, body').animate(
		{scrollTop: tag.offset().top}, 1000
	);
    return false;
  });
 });
