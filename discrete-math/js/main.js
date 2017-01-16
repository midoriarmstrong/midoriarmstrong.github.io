$(document).ready(function() {
  /**
  * Displays the steps of a calculation
  *
  * @param {string} div The div to append the results to
  * @param {object} results The results to output
  *
  * @returns {void}
  *
  */

  function showSteps (div, results) {
    // Resetting div state
    div.empty();
    
    // Displaying steps
    for (var i = 0; i < results.length; i++) {
      $('<li><span>' + results[i] + '</span></li>').appendTo(div);
    }
  }
  
  // Calculates gcd(a, b) using the Euclidean Algorithm then displays steps and results
  $('#eucliAlgo button').click(function() {
    // Getting input values
    var x = $('#x').val();
    var y = $('#y').val();

    // If x or y are decimals, set as ints
    x = x.split('.')[0];
    y = y.split('.')[0];
    
    // If x or y are null, set as zero
    if (x == '') { x = '0';}
    if (y == '') { y = '0';}

    var results = findGCD(x, y);
    var div = $('#eucliAlgo > div');
    
    // Hiding the results while content is being replaced
    div.slideUp(function() {
      // Displaying all headers
      div.children().show();
      
      // Displaying EA calculation steps
      showSteps(div.children('ul'), results.output);
      
      // Displaying final answer
      div.children('p').html('<span>gcd(' + bigInt(x) + ', ' + bigInt(y) + ') = ' + results.gcd + '</span>');
      
      // Reshowing the results once content has been replaced
      div.slideDown();
    });
  });
  
  // Solves a Linear Diophantine Equation in the form ax + by = c using the Extended Euclidean Algorithm 
  //       then displays steps and results
  $('#linDio button').click(function() {
    // Getting input values
    var a = $('#a').val();
    var b = $('#b').val();
    var c = $('#c').val();
    
    // If a, b, or n are decimals, set as ints
    a = a.split('.')[0];
    b = b.split('.')[0];
    c = c.split('.')[0];
    
    // If a, b, or n are null, set as zero
    if (a == '') { a = '0';}
    if (b == '') { b = '0';}
    if (c == '') { c = '0';}

    var results = solveLinDiophantineEqn(a, b, c);
    var div = $('#linDio > div');
    
    // Hiding the results while content is being replaced
    div.slideUp(function() {
      // Displaying all headers
      div.children().show();
      
      // Displaying EEA calculation steps
      showSteps(div.children('ul:first-of-type'), results.eaOutput);
      
      // Displaying results of EEA calculation
       $('<li><span>' + 'gcd(' + bigInt(a) + ', ' + bigInt(b) + ') = ' + results.gcd + '</span></li>').appendTo(div.children('ul:first-of-type'));
       
      // If there are solutions to the equation 
      if (results.hasOwnProperty('x')) {
        // Displaying Linear Diophantine Equation calculation steps 
        showSteps(div.children('ul:last-of-type'), results.subOutput);
        
        // Determining proper signage for final answer
        var solution = 'The complete solution is <span>{(' + results.x;
        
        var d = bigInt(b).divide(results.gcd);
        
        if (d.greater(bigInt())) {
          solution += ' + ' + d + 'k, ' + results.y;
        } else {
          solution += ' - ' + (d * -1) + 'k, ' + results.y;
        }
        
        var e = bigInt(a).divide(results.gcd);
        
        if (e.greater(bigInt())) {
          solution += ' - ' + e;
        } else {
          solution += ' + ' + (e * -1);
        }
        
        // Displaying final answer
        div.children('p').html(solution + 'k ) | k &#x2208; &#x2124;}</span>');
      } else {    
        // Displaying error output 
        div.children('ul:last-of-type').html('<li>' + results.errOutput + '</li>');
        
        // Displaying no solution message
        div.children('p').text('There are no valid solutions.');
      }

      // Reshowing the results once content has been replaced
      div.slideDown();
    });
  });
  
  // Displays the steps and complete solution to ax = b (mod n)
  $('#linCong button').click( function() {
    // Getting input values
    var a = $('#f').val();
    var b = $('#g').val();
    var n = $('#n').val();

    // If a, b, or n are decimals, set as ints
    a = a.split('.')[0];
    b = b.split('.')[0];
    n = n.split('.')[0];
    
    // If a, b, or n are null, set as zero
    if (a == '') { a = '0';}
    if (b == '') { b = '0';}
    if (n == '') { n = '0';}
    
    var results = solveCongruence(a, b, n);
    var div = $('#linCong > div');
    
    // Hiding the results while content is being replaced
    div.slideUp(function() {
      // Displaying all headers
      div.children().show();
      
      // Displaying EEA calculation steps
      showSteps(div.children('ul:first-of-type'), results.eaOutput);
      
      // Displaying results of EEA calculation
       $('<li><span>' + 'gcd(' + bigInt(a) + ', ' + bigInt(b) + ') = ' + results.gcd + '</span></li>').appendTo(div.children('ul:first-of-type'));
       
      // If there are solutions to the equation 
      if (results.hasOwnProperty('x')) {
        // Displaying Linear Diophantine Equation calculation steps 
        showSteps(div.children('ul:nth-of-type(2)'), results.subOutput);
        
        // Displaying linear congruence calculation steps
        showSteps(div.children('ul:last-of-type'), results.output);
        
        // Displaying final results
        div.children('p').html("The complete solution is <span><em>" +
                                results.x + " (mod " + results.m + ")</em></span> or alternatively, <span><em>" +
                                results.x + " + " + results.m + "k, k</em> &#x2208; &#x2124;</span>");
      } else {    
        // Hiding last section
        div.children('h5:last-of-type, ul:last-of-type').hide();
        
        // Displaying error output 
        div.children('ul:nth-of-type(2)').html('<li>' + results.errOutput + '</li>');
        
        // Displaying no solution message
        div.children('p').text('There are no valid solutions.');
      }
      
      // Reshowing the results once content has been replaced
      div.slideDown();
      
      // Scrolling down to content once expanded
      $('html, body').animate(
        {scrollTop: $(document).height()}, 1000
      );
    });
  });
});
