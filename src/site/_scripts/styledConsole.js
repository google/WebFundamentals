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

styledConsoleLog( '<span style="color:#156aeb">G</span><span style="color:#d6412b">o</span><span style="color:#ffb600">o</span><span style="color:#156aeb">g</span><span style="color:#009956">l</span><span style="color:#d6412b">e</span>' );
