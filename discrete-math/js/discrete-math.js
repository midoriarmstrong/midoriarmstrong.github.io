/**
* Finds the GCD of two large integers in the form of strings using the Euclidean Algorithm
*
* @param {string} x First integer
* @param {string} y Second integer
*
* @returns {Object} Object containing the GCD and output to display
*
*/

function findGCD(x, y) {
  // Converting from string to bigInt
  x = bigInt(x.split('.')[0]);
  y = bigInt(y.split('.')[0]);

  // Declaring variables to hold calculation output
  var quotientArray = []; // Stores the quotient with remainder of num2 / num1
  var output = []; // Stores each step
  
  if (y.greater(x)) {
    var num1 = x;
    var num2 = y;
  } else {
    var num1 = y;
    var num2 = x;
  }
  
  var count = 0;
  
  // Setting the default output in case num1 == 0
  output[count] = "0 = " + "0 * " + num2 + " + 0";
  
  // While the remainder of num2 / num1 is not zero
  while (!num1.isZero()) {
    quotientArray[count] = num2.divmod(num1); // Get the quotient with remainder of num2 / num1

    output[count] = num2 + " = " + quotientArray[count].quotient + " * " + num1 + " + " + quotientArray[count].remainder;

    num2 = num1;
    num1 = quotientArray[count].remainder;
    
    count++;
  }
  
  return {
    gcd: num2, 
    quotientArray: quotientArray, 
    output: output
  };
}

/**
* Solves a linear Diophantine equation in the form ax + by = c where a, b, c are all integers (inputted as strings)
*   
* @param {string} a 
* @param {string} b
* @param {string} c
*
* @returns {Object} Returns base x and y values that satisfy the equation, gcd(a, b), and output
*
*/

function solveLinDiophantineEqn(a, b, c) {
  // Getting gcd(a, b)
  var ea = findGCD(a, b);
  
  // Converting from string to bigInt
  a = bigInt(a.split('.')[0]);
  b = bigInt(b.split('.')[0]);
  c = bigInt(c.split('.')[0]);
  
  // If a = 0 or b = 0, then this is not a valid LDE
  if (a.isZero() || b.isZero()) {
    var errOutput = "Error: Cannot solve through Extended Euclidean Algorithm. Please input non-zero values for a and b.";
    
    return {
      gcd: ea.gcd, 
      eaOutput: ea.output, 
      errOutput: errOutput
    };
  }
  
  // Declaring first two 'remainder' values in quotientArray
  if (a.greater(b)) {
    var firstValues = [{remainder: a},{remainder: b}];
  } else {
    var firstValues = [{remainder: b},{remainder: a}];
  }
  
  // Combining firstValues with Euclidean Algorithm quotientArray
  var quotientArray = firstValues.concat(ea.quotientArray);
  
  // Declaring variables to hold calculation output
  var count = quotientArray.length - 1, subCount = 0; // Counts used for iteration
  var x = bigInt(), y = bigInt.one;
  var subOutput = [];

  // Using Extended Euclidean Algorithm to find base x and y values
  while (count > 2) {
    var temp = y;
    y = x.add(y.multiply(quotientArray[count - 1].quotient).multiply(bigInt.minusOne));
    x = temp;

    subOutput[subCount] = ea.gcd + " = " + x + " * " + quotientArray[count - 3].remainder + " + " + 
                          y + " * " + quotientArray[count - 2].remainder;

    subCount++;
    count--;
  }

  // Checking if gcd is 0 to avoid division by 0 error
  if (!ea.gcd.isZero()) {
    var division = c.divmod(ea.gcd);
    
    // If c is divisible by gcd(a, b)
    if (!(division.remainder.compare(bigInt()))) {  
      // Multiply the base x and y values by the quotient of c / gcd(a, b)
      x = x.multiply(division.quotient);
      y = y.multiply(division.quotient);
      
      // As x is associated with the greater number and y with the lesser number
      if (a.greater(b)) {
        // Add final step to subOutput
        subOutput[subCount] = '&#x2234; ' + c + ' = ' + x + ' * ' + a + ' + ' + y + ' * ' + b;
        
        return {
          x: x, 
          y: y,  
          gcd: ea.gcd, 
          subOutput: subOutput, 
          eaOutput: ea.output
        };
      } else {
        // Add final step to subOutput
        subOutput[subCount] = '&#x2234; ' + c + ' = ' + x + ' * ' + b + ' + ' + y + ' * ' + a;
        
        return {
          x: y, 
          y: x,  
          gcd: ea.gcd, 
          subOutput: subOutput, 
          eaOutput: ea.output
        };
      }
    }
  } 

  // If c is not divisible by gcd(a, b), output an error
  var errOutput = "Error: " + c + " is not divisible by gcd(" + a + ", " + b + "), " + ea.gcd + "."; 
  
  return {
    gcd: ea.gcd, 
    eaOutput: ea.output, 
    errOutput: errOutput
  };
}

/**
* Solves a linear congruence in the form ax = b (mod n) where a, b, n are all integers (inputted as strings)
*
* @param {string} a 
* @param {string} b
* @param {string} n
*
* @returns {Object} Returns complete solution of congruence x (mod y) in object form or error message if no solution exists
*
*/

function solveCongruence(a, b, n) {
  // Solving the associated linear diophantine equation
  var results = solveLinDiophantineEqn(a, n, b);

  // If there are solutions to the associated LDE
  if (results.hasOwnProperty('x')) {
    a = bigInt(a.split('.')[0]);
    n = bigInt(n.split('.')[0]);
    
    // Declaring output
    var output = [];
   
    var answer = results.x;
    
    var base = answer;
    var m = n.divide(results.gcd);
    
    output[0] = '<em>x</em> = ' + answer;
    output[1] = '<em>m</em> = ' + n + ' / ' + results.gcd + ' = ' + m;
    
    answer = answer.mod(m);
    
    // To return a positive answer value
    while (answer < 0) { answer += m;}
   
    output[2] = '&#x2234; <em>x (mod m) &#x2261; ' + base + '(mod ' + m + ')  &#x2261; ' + answer + '(mod ' + m + ')</em>';
    
    return {
      gcd: results.gcd,
      x: answer, 
      m: m, 
      eaOutput: results.eaOutput,  
      subOutput: results.subOutput,
      output: output
    };
  }
  
  // If there are no solutions to the associated LDE, there are no solutions to the congruence
  return {
    gcd: results.gcd,
    eaOutput: results.eaOutput, 
    errOutput: results.errOutput
  };
}

/**
* Converts a text message to ASCII characters then encrypts it
*
* @param {string} e The first half of the encryption key
* @param {string} n The second half of the encryption key
* @param {string} message Message to encrypt
*
* @returns {string} Encrypted message
*
*/
  
function encrypt(e, n, message) {
    // Converting from string to bigInt
    e = bigInt(e.split('.')[0]);
    n = bigInt(n.split('.')[0]);
    
    // Converting message to ASCII 
    var ascii = "";
    for (var i = 0; i < message.length; i++) {
      var code = message.charAt(i).charCodeAt(0) + '';
      var codeLen = code.length;

      // Append zeros to the front if the ASCII code is not three characters long
      while (codeLen != 3) {
        code = '0' + code;
        codeLen = code.length;
      }

      ascii += code;
    }

    if (ascii.length > n.toString().length) {
      return "Error: message is too long";
    }
    
    // Encrypting ASCII message
    ascii = bigInt(ascii).modPow(e, n);
    return ascii.toString();
}

/**
* Decrypts a numerical message then converts it from ASCII to plain text
*
* @param {string} d The first half of the decryption key
* @param {string} n The second half of the decryption key
* @param {string} message Message to decrypt
*
* @returns {string} Decrypted message
*
*/
  
function decrypt(d, n, message) {
    // Converting from string to bigInt
    d = bigInt(d.split('.')[0]);
    n = bigInt(n.split('.')[0]);    
    
    // Decrypting ASCII message
    message = bigInt(message).modPow(d, n);
    
    // Converting message to plain text 
    var decrypted = "";
    for (var i = 0; i < message.length; i += 3) {
      decrypted += String.fromCharCode(parseInt(message.substring(i, i + 3)));
    }

    return decrypted;
}

/**
* Generates RSA public and private keys
*
* @returns {Object} Public and private keys
*
*/
  
function generateKeys() {
    // Generating random primes for p, q
    var p = bigInt.randBetween('1e10', '1e11');
    var q = bigInt.randBetween('1e10', '1e11');
    
    while (!p.isProbablePrime) { p = bigInt.randBetween('1e10', '1e11');}
    while (!q.isProbablePrime && q.compare(p) != 0) { q = bigInt.randBetween('1e10', '1e11');}

    // Calculating n and phi
    var n = (p.multiply(q)).toString();
    var phi = ((p.subtract(bigInt.one)).multiply(q.subtract(bigInt.one))).toString();

    // Determining e value relatively prime to phi
    var e = bigInt.randBetween('1e5', '1e6').toString();
    
    while (findGCD(e, phi).gcd.compare(bigInt.one) != 0) { 
      e = bigInt.randBetween('1e5', '1e6').toString();
    }
    
    // Calculating d
    var d = (solveCongruence(e, '1', phi).x).toString();

    return {
      public: [e, n],
      private: [d, n]
    };
}