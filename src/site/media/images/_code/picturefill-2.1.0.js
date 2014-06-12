/*! Picturefill - v2.1.0-beta - 2014-06-03
* http://scottjehl.github.io/picturefill
* Copyright (c) 2014 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT */
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

window.matchMedia || (window.matchMedia = function() {
  "use strict";

  // For browsers that support matchMedium api such as IE 9 and webkit
  var styleMedia = (window.styleMedia || window.media);

  // For those that don't support matchMedium
  if (!styleMedia) {
    var style       = document.createElement('style'),
      script      = document.getElementsByTagName('script')[0],
      info        = null;

    style.type  = 'text/css';
    style.id    = 'matchmediajs-test';

    script.parentNode.insertBefore(style, script);

    // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
    info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

    styleMedia = {
      matchMedium: function(media) {
        var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

        // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
        if (style.styleSheet) {
          style.styleSheet.cssText = text;
        } else {
          style.textContent = text;
        }

        // Test if media query is true or false
        return info.width === '1px';
      }
    };
  }

  return function(media) {
    return {
      matches: styleMedia.matchMedium(media || 'all'),
      media: media || 'all'
    };
  };
}());
/*! Picturefill - Responsive Images that work today.
*  Author: Scott Jehl, Filament Group, 2012 ( new proposal implemented by Shawn Jansepar )
*  License: MIT/GPLv2
*  Spec: http://picture.responsiveimages.org/
*/
(function( w, doc ) {
  // Enable strict mode
  "use strict";

  // If picture is supported, well, that's awesome. Let's get outta here...
  if ( w.HTMLPictureElement ) {
    return;
  }

  // HTML shim|v it for old IE (IE9 will still need the HTML video tag workaround)
  doc.createElement( "picture" );

  // local object for method references and testing exposure
  var pf = {};

  // namespace
  pf.ns = "picturefill";

  // srcset support test
  pf.srcsetSupported = new w.Image().srcset !== undefined;

  // just a string trim workaround
  pf.trim = function( str ) {
    return str.trim ? str.trim() : str.replace( /^\s+|\s+$/g, "" );
  };

  // just a string endsWith workaround
  pf.endsWith = function( str, suffix ) {
    return str.endsWith ? str.endsWith( suffix ) : str.indexOf( suffix, str.length - suffix.length ) !== -1;
  };

  /**
   * Shortcut method for matchMedia ( for easy overriding in tests )
   */
  pf.matchesMedia = function( media ) {
    return w.matchMedia && w.matchMedia( media ).matches;
  };

  /**
   * Shortcut method for `devicePixelRatio` ( for easy overriding in tests )
   */
  pf.getDpr = function() {
    return ( w.devicePixelRatio || 1 );
  };

  /**
   * Get width in css pixel value from a "length" value
   * http://dev.w3.org/csswg/css-values-3/#length-value
   */
  pf.getWidthFromLength = function( length ) {
    // If no length was specified, or it is 0, default to `100vw` (per the spec).
    length = length && parseFloat( length ) > 0 ? length : "100vw";

    /**
    * If length is specified in  `vw` units, use `%` instead since the div we’re measuring
    * is injected at the top of the document.
    *
    * TODO: maybe we should put this behind a feature test for `vw`?
    */
    length = length.replace( "vw", "%" );

    // Create a cached element for getting length value widths
    if ( !pf.lengthEl ) {
      pf.lengthEl = doc.createElement( "div" );
      doc.documentElement.insertBefore( pf.lengthEl, doc.documentElement.firstChild );
    }

    // Positioning styles help prevent padding/margin/width on `html` from throwing calculations off.
    pf.lengthEl.style.cssText = "position: absolute; left: 0; width: " + length + ";";
    // Using offsetWidth to get width from CSS
    return pf.lengthEl.offsetWidth;
  };

  // container of supported mime types that one might need to qualify before using
  pf.types =  {};

  // Add support for standard mime types.
  pf.types["image/jpeg"] = true;
  pf.types["image/gif"] = true;
  pf.types["image/png"] = true;

  // test svg support
  pf.types[ "image/svg+xml" ] = doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");

  // test webp support, only when the markup calls for it
  pf.types[ "image/webp" ] = function() {
    // based on Modernizr's lossless img-webp test
    // note: asynchronous
    var img = new w.Image(),
      type = "image/webp";

    img.onerror = function() {
      pf.types[ type ] = false;
      picturefill();
    };
    img.onload = function() {
      pf.types[ type ] = img.width === 1;
      picturefill();
    };
    img.src = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
  };

  /**
   * Takes a source element and checks if its type attribute is present and if so, supported
   * Note: for type tests that require a async logic,
   * you can define them as a function that'll run only if that type needs to be tested. Just make the test function call picturefill again when it is complete.
   * see the async webp test above for example
   */
  pf.verifyTypeSupport = function( source ) {
    var type = source.getAttribute( "type" );
    // if type attribute exists, return test result, otherwise return true
    if ( type === null || type === "" ) {
      return true;
    } else {
      // if the type test is a function, run it and return "pending" status. The function will rerun picturefill on pending elements once finished.
      if ( typeof( pf.types[ type ] ) === "function" ) {
        pf.types[ type ]();
        return "pending";
      } else {
        return pf.types[ type ];
      }
    }
  };

  /**
  * Parses an individual `size` and returns the length, and optional media query
  */
  pf.parseSize = function( sourceSizeStr ) {
    var match = /(\([^)]+\))?\s*(.+)/g.exec( sourceSizeStr );
    return {
      media: match && match[1],
      length: match && match[2]
    };
  };

  /**
   * Takes a string of sizes and returns the width in pixels as a number
   */
  pf.findWidthFromSourceSize = function( sourceSizeListStr ) {
    // Split up source size list, ie ( max-width: 30em ) 100%, ( max-width: 50em ) 50%, 33%
    //                            or (min-width:30em) calc(30% - 15px)
    var sourceSizeList = pf.trim( sourceSizeListStr ).split( /\s*,\s*/ ),
      winningLength;

    for ( var i = 0, len = sourceSizeList.length; i < len; i++ ) {
      // Match <media-condition>? length, ie ( min-width: 50em ) 100%
      var sourceSize = sourceSizeList[ i ],
        // Split "( min-width: 50em ) 100%" into separate strings
        parsedSize = pf.parseSize( sourceSize ),
        length = parsedSize.length,
        media = parsedSize.media;

      if ( !length ) {
          continue;
      }
      if ( !media || pf.matchesMedia( media ) ) {
        // if there is no media query or it matches, choose this as our winning length
        // and end algorithm
        winningLength = length;
        break;
      }
    }

    // pass the length to a method that can properly determine length
    // in pixels based on these formats: http://dev.w3.org/csswg/css-values-3/#length-value
    return pf.getWidthFromLength( winningLength );
  };

  pf.parseSrcset = function( srcset ) {
    /**
    * A lot of this was pulled from Boris Smus’ parser for the now-defunct WHATWG `srcset`
    * https://github.com/borismus/srcset-polyfill/blob/master/js/srcset-info.js
    *
    * 1. Let input (`srcset`) be the value passed to this algorithm.
    * 2. Let position be a pointer into input, initially pointing at the start of the string.
    * 3. Let raw candidates be an initially empty ordered list of URLs with associated 
    *    unparsed descriptors. The order of entries in the list is the order in which entries 
    *    are added to the list.
    */
    var candidates = [];

    while ( srcset !== "" ) {
      srcset = srcset.replace(/^\s+/g,"");

      // 5. Collect a sequence of characters that are not space characters, and let that be url.
      var pos = srcset.search(/\s/g),
        url, descriptor = null;

      if ( pos !== -1 ) {
        url = srcset.slice( 0, pos );

        var last = url[ url.length - 1 ];

        // 6. If url ends with a U+002C COMMA character (,), remove that character from url
        // and let descriptors be the empty string. Otherwise, follow these substeps
        // 6.1. If url is empty, then jump to the step labeled descriptor parser.

        if ( last === "," || url === "" ) {
          url = url.replace(/,+$/, "");
          descriptor = "";
        }
        srcset = srcset.slice( pos + 1 );

        // 6.2. Collect a sequence of characters that are not U+002C COMMA characters (,), and 
        // let that be descriptors.
        if ( descriptor === null ) {
          var descpos = srcset.indexOf(",");
          if ( descpos !== -1 ) {
            descriptor = srcset.slice( 0, descpos );
            srcset = srcset.slice( descpos + 1 );
          } else {
            descriptor = srcset;
            srcset = "";
          }
        }
      } else {
        url = srcset;
        srcset = "";
      }

      // 7. Add url to raw candidates, associated with descriptors.
      if ( url || descriptor ) {
        candidates.push({
          url: url,
          descriptor: descriptor
        });
      }
    }
    return candidates;
  };

  pf.parseDescriptor = function( descriptor, sizes ) {
    // 11. Descriptor parser: Let candidates be an initially empty source set. The order of entries in the list 
    // is the order in which entries are added to the list.
    var sizeDescriptor = descriptor && descriptor.replace(/(^\s+|\s+$)/g, ""),
      widthInCssPixels = sizes ? pf.findWidthFromSourceSize( sizes ) : "100%",
      resCandidate;

      if ( sizeDescriptor ) {
        var splitDescriptor = sizeDescriptor.split(" ");

        for (var i = splitDescriptor.length + 1; i >= 0; i--) {

          var curr = splitDescriptor[ i ],
            lastchar = curr && curr.slice( curr.length - 1 );

          if ( lastchar === "w" || lastchar === "x" ) {
            resCandidate = curr;
          }
          if ( sizes && resCandidate ) {
            // get the dpr by taking the length / width in css pixels
            resCandidate = parseFloat( ( parseInt( curr, 10 ) / widthInCssPixels ) );
          } else {
            // get the dpr by grabbing the value of Nx
            var res = curr && parseFloat( curr, 10 );

            resCandidate = res && !isNaN( res ) && lastchar === "x" || lastchar === "w" ? res : 1;
          }
        }
      } else {
        resCandidate = 1;
      }
    return resCandidate;
  };

  /**
   * Takes a srcset in the form of url/
   * ex. "images/pic-medium.png 1x, images/pic-medium-2x.png 2x" or
   *     "images/pic-medium.png 400w, images/pic-medium-2x.png 800w" or
   *     "images/pic-small.png"
   * Get an array of image candidates in the form of
   *      {url: "/foo/bar.png", resolution: 1}
   * where resolution is http://dev.w3.org/csswg/css-values-3/#resolution-value
   * If sizes is specified, resolution is calculated
   */
  pf.getCandidatesFromSourceSet = function( srcset, sizes ) {
    var candidates = pf.parseSrcset( srcset ),
      formattedCandidates = [];

    for ( var i = 0, len = candidates.length; i < len; i++ ) {
      var candidate = candidates[ i ];

      formattedCandidates.push({
        url: candidate.url,
        resolution: pf.parseDescriptor( candidate.descriptor, sizes )
      });
    }
    return formattedCandidates;
  };

  /*
   * if it's an img element and it has a srcset property,
   * we need to remove the attribute so we can manipulate src
   * (the property's existence infers native srcset support, and a srcset-supporting browser will prioritize srcset's value over our winning picture candidate)
   * this moves srcset's value to memory for later use and removes the attr
   */
  pf.dodgeSrcset = function( img ) {
    if ( img.srcset ) {
      img[ pf.ns ].srcset = img.srcset;
      img.removeAttribute( "srcset" );
    }
  };

  /*
   * Accept a source or img element and process its srcset and sizes attrs
   */
  pf.processSourceSet = function( el ) {
    var srcset = el.getAttribute( "srcset" ),
      sizes = el.getAttribute( "sizes" ),
      candidates = [];

    // if it's an img element, use the cached srcset property (defined or not)
    if ( el.nodeName.toUpperCase() === "IMG" && el[ pf.ns ] && el[ pf.ns ].srcset ) {
      srcset = el[ pf.ns ].srcset;
    }

    if ( srcset ) {
      candidates = pf.getCandidatesFromSourceSet( srcset, sizes );
    }
    return candidates;
  };

  pf.applyBestCandidate = function( candidates, picImg ) {
    var candidate,
      length,
      bestCandidate;

    candidates.sort( pf.ascendingSort );

    length = candidates.length;
    bestCandidate = candidates[ length - 1 ];

    for ( var i = 0; i < length; i++ ) {
      candidate = candidates[ i ];
      if ( candidate.resolution >= pf.getDpr() ) {
        bestCandidate = candidate;
        break;
      }
    }

    if ( !pf.endsWith( picImg.src, bestCandidate.url ) ) {
      picImg.src = bestCandidate.url;
      // currentSrc attribute and property to match
      // http://picture.responsiveimages.org/#the-img-element
      picImg.currentSrc = picImg.src;
    }
  };

  pf.ascendingSort = function( a, b ) {
    return a.resolution - b.resolution;
  };

  /*
   * In IE9, <source> elements get removed if they aren't children of
   * video elements. Thus, we conditionally wrap source elements
   * using <!--[if IE 9]><video style="display: none;"><![endif]-->
   * and must account for that here by moving those source elements
   * back into the picture element.
   */
  pf.removeVideoShim = function( picture ) {
    var videos = picture.getElementsByTagName( "video" );
    if ( videos.length ) {
      var video = videos[ 0 ],
        vsources = video.getElementsByTagName( "source" );
      while ( vsources.length ) {
        picture.insertBefore( vsources[ 0 ], video );
      }
      // Remove the video element once we're finished removing its children
      video.parentNode.removeChild( video );
    }
  };

  /*
   * Find all picture elements and,
   * in browsers that don't natively support srcset, find all img elements
   * with srcset attrs that don't have picture parents
   */
  pf.getAllElements = function() {
    var pictures = doc.getElementsByTagName( "picture" ),
      elems = [],
      imgs = doc.getElementsByTagName( "img" );

    for ( var h = 0, len = pictures.length + imgs.length; h < len; h++ ) {
      if ( h < pictures.length ) {
        elems[ h ] = pictures[ h ];
      } else {
        var currImg = imgs[ h - pictures.length ];

        if ( currImg.parentNode.nodeName.toUpperCase() !== "PICTURE" &&
          ( ( pf.srcsetSupported && currImg.getAttribute( "sizes" ) ) ||
          currImg.getAttribute( "srcset" ) !== null ) ) {
            elems.push( currImg );
        }
      }
    }
    return elems;
  };

  pf.getMatch = function( picture ) {
    var sources = picture.childNodes,
      match;

    // Go through each child, and if they have media queries, evaluate them
    for ( var j = 0, slen = sources.length; j < slen; j++ ) {
      var source = sources[ j ];

      // ignore non-element nodes
      if ( source.nodeType !== 1 ) {
        continue;
      }

      // Hitting an `img` element stops the search for `sources`.
      // If no previous `source` matches, the `img` itself is evaluated later.
      if ( source.nodeName.toUpperCase() === "IMG" ) {
        return match;
      }

      // ignore non-`source` nodes
      if ( source.nodeName.toUpperCase() !== "SOURCE" ) {
        continue;
      }

      var media = source.getAttribute( "media" );

      // if source does not have a srcset attribute, skip
      if ( !source.getAttribute( "srcset" ) ) {
        continue;
      }

      // if there's no media specified, OR w.matchMedia is supported
      if ( ( !media || pf.matchesMedia( media ) ) ) {
        var typeSupported = pf.verifyTypeSupport( source );

        if ( typeSupported === true ) {
          match = source;
          break;
        } else if ( typeSupported === "pending" ) {
          return false;
        }
      }
    }

    return match;
  };

  function picturefill( options ) {
    var elements,
      element,
      elemType,
      firstMatch,
      candidates,
      picImg;

    options = options || {};
    elements = options.elements || pf.getAllElements();

    // Loop through all elements
    for ( var i = 0, plen = elements.length; i < plen; i++ ) {
      element = elements[ i ];
      elemType = element.nodeName.toUpperCase();
      firstMatch = undefined;
      candidates = undefined;
      picImg = undefined;

      // expando for caching data on the img
      if ( !element[ pf.ns ] ) {
        element[ pf.ns ] = {};
      }

      // if the element has already been evaluated, skip it
      // unless `options.force` is set to true ( this, for example,
      // is set to true when running `picturefill` on `resize` ).
      if ( !options.reevaluate && element[ pf.ns ].evaluated ) {
        continue;
      }

      // if element is a picture element
      if ( elemType === "PICTURE" ) {

        // IE9 video workaround
        pf.removeVideoShim( element );

        // return the first match which might undefined
        // returns false if there is a pending source
        // TODO the return type here is brutal, cleanup
        firstMatch = pf.getMatch( element );

        // if any sources are pending in this picture due to async type test(s)
        // remove the evaluated attr and skip for now ( the pending test will
        // rerun picturefill on this element when complete)
        if ( firstMatch === false ) {
          continue;
        }

        // Find any existing img element in the picture element
        picImg = element.getElementsByTagName( "img" )[ 0 ];
      } else {
        // if it's an img element
        firstMatch = undefined;
        picImg = element;
      }

      if ( picImg ) {

        // expando for caching data on the img
        if ( !picImg[ pf.ns ] ) {
          picImg[ pf.ns ] = {};
        }

        // Cache and remove `srcset` if present and we’re going to be doing `sizes`/`picture` polyfilling to it.
        if ( picImg.srcset && ( elemType === "PICTURE" || picImg.getAttribute( "sizes" ) ) ) {
          pf.dodgeSrcset( picImg );
        }

        if ( firstMatch ) {
          candidates = pf.processSourceSet( firstMatch );
          pf.applyBestCandidate( candidates, picImg );
        } else {
          // No sources matched, so we’re down to processing the inner `img` as a source.
          candidates = pf.processSourceSet( picImg );

          if ( picImg.srcset === undefined || picImg[ pf.ns ].srcset ) {
            // Either `srcset` is completely unsupported, or we need to polyfill `sizes` functionality.
            pf.applyBestCandidate( candidates, picImg );
          } // Else, resolution-only `srcset` is supported natively.
        }

        // set evaluated to true to avoid unnecessary reparsing
        element[ pf.ns ].evaluated = true;
      }
    }
  }

  /**
   * Sets up picture polyfill by polling the document and running
   * the polyfill every 250ms until the document is ready.
   * Also attaches picturefill on resize
   */
  function runPicturefill() {
    picturefill();
    var intervalId = setInterval( function() {
      // When the document has finished loading, stop checking for new images
      // https://github.com/ded/domready/blob/master/ready.js#L15
      picturefill();
      if ( /^loaded|^i|^c/.test( doc.readyState ) ) {
        clearInterval( intervalId );
        return;
      }
    }, 250 );
    if ( w.addEventListener ) {
      var resizeThrottle;
      w.addEventListener( "resize", function() {
        if (!w._picturefillWorking) {
          w._picturefillWorking = true;
          w.clearTimeout( resizeThrottle );
          resizeThrottle = w.setTimeout( function() {
            picturefill({ reevaluate: true });
            w._picturefillWorking = false;
          }, 60 );
        }
      }, false );
    }
  }

  runPicturefill();

  /* expose methods for testing */
  picturefill._ = pf;

  /* expose picturefill */
  if ( typeof module === "object" && typeof module.exports === "object" ) {
    // CommonJS, just export
    module.exports = picturefill;
  } else if ( typeof define === "function" && define.amd ){
    // AMD support
    define( function() { return picturefill; } );
  } else if ( typeof w === "object" ) {
    // If no AMD and we are in the browser, attach to window
    w.picturefill = picturefill;
  }

} )( this, this.document );