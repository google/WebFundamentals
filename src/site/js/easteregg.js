/* global Konami */

// hasClass
function hasClass(elem, className) {
  'use strict';
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}
// toggleClass
function toggleClass(elem, className) {
  'use strict';
  var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ' ) + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
      newClass = newClass.replace( ' ' + className + ' ' , ' ' );
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  } else {
    elem.className += ' ' + className;
  }
}

var easterEgg = new Konami(function() {
  'use strict';
  var theBody = document.getElementsByTagName('body')[0];
  toggleClass(theBody, 'debug');
});

if (typeof easterEgg !== 'undefined'){
  console.log('Look for easter eggs...');
}