function styledConsoleLog() {
  'use strict';
  var argArray = [];

  if (arguments.length) {
    var startTagRe = /<span\s+style=(['"])([^'"]*)\1\s*>/gi;
    var endTagRe = /<\/span>/gi;

    var reResultArray;
    argArray.push( arguments[0].replace( startTagRe, '%c' ).replace( endTagRe, '%c' ) );
    while ( (reResultArray = startTagRe.exec( arguments[0] )) !== null ) {
      argArray.push( reResultArray[2] );
      argArray.push('');
    }

    // pass through subsequent args since chrome dev tools does not (yet) support console.log styling of the following form: console.log('%cBlue!', 'color: blue;', '%cRed!', 'color: red;');
    for (var j = 1; j < arguments.length; j++) {
      argArray.push( arguments[j] );
    }
  }

  console.log.apply( console, argArray );
}

// Test message...
styledConsoleLog( '<span style="color:#156aeb; font-family: Catull, Georgia, serif; font-size: 1.4em;">G</span><span style="color:#d6412b; font-family: Catull, Georgia, serif; font-size: 1.4em;">o</span><span style="color:#ffb600; font-family: Catull, Georgia, serif; font-size: 1.4em;">o</span><span style="color:#156aeb; font-family: Catull, Georgia, serif; font-size: 1.4em;">g</span><span style="color:#009956; font-family: Catull, Georgia, serif; font-size: 1.4em;">l</span><span style="color:#d6412b; font-family: Catull, Georgia, serif; font-size: 1.4em;">e</span>' );
