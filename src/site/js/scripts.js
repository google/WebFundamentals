$(document).ready(function() {
  var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i) ? true : false;
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i) ? true : false;
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i) ? true : false;
      },
      any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
      }
  };

  if (isMobile.any() != true) {
    $('.download-buttons').show();
    $('.os-choices').show();
  } else {
    $('.navbar-toggle');
    $('.icon-bar');
    $('.navbar-toggle').addClass('mobile-deactivated');
    $('.icon-bar').addClass('mobile-deactivated');
  }

  var addPermalink = function() {
    if ($(this).hasClass('no-permalink')) {
      return;
    }
    $(this).addClass('has-permalink');
    $(this).append($('<a class="permalink" title="Permalink" href="#' + $(this).attr('id') + '">#</a>'));
  };

  $.each(['h2','h3','h4'], function(n, h) { $('.has-permalinks ' + h).each(addPermalink); });

  // Add the `prettyprint` class to the blocks of code specified in the way that
  // the book pages use.
  $('pre.programlisting > em > span.remark, pre.screen > em > span.remark')
      .each(function(i, element) {
    var $element = $(element);
    var $programListing = $element.parent().parent();
    $programListing.addClass('prettyprint');
    // This regular expression is to test if this remark is of the right form to
    // specify the language of the code block.
    var re = /^lang\-[a-z]+$/i;
    if (re.test($element.text().trim())) {
      $programListing.addClass($element.text().trim());
    }
  });

  // Add syntax highlighting.
  prettyPrint();

});

// Anchor scrolling for the page
$(function() {
  var scrollPadding   = 5;

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      var isnavtabs = $('.nav-tabs')[0];
      if (target.length && !isnavtabs) {
        window.location.hash = this.hash;
        return false;
      } else {
        window.location.hash = this.hash;
      }
    }
  });
});


$(function(){

  var popOpen = false;

  $('.dart-popover').popover();

  var i = 0;
  var navDisabled = false;
  var navToggle = $('.navbar-toggle');
  var iconBar = $('.icon-bar');
  var navDropdown = $('.navbar-collapse');
  var containerPage = $('.container-page');
  var lastScrollPosY = 0;

  navDropdown.collapse({
    toggle: false
  });

  $(document).on('touchstart', function(e) {
    lastScrollPosY = $(this).scrollTop();
    // console.log($(this).scrollTop(), lastScrollPosY);
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    var targetTouch = $(touch.target);
    if(!navDisabled) {
      if(targetTouch[0] == navToggle[0] || targetTouch[0] == iconBar[0]) {

        // iconBar.removeClass('collapsed');
      }
    } else {
      return false;
    }

    if($(touch.target).parents('.container-page')[0] === containerPage[0]) {
      navDropdown.collapse('hide');

      navToggle.addClass('mobile-deactivated');
      iconBar.addClass('mobile-deactivated');
      // iconBar.removeClass('collapsed');
    }


  });


  $(document).on('touchmove', function(e) {
    // console.log($(this).scrollTop(), lastScrollPosY);
    if($(this).scrollTop() != lastScrollPosY) {
      // navDropdown.collapse('hide');

      // navToggle.toggleClass('mobile-deactivated');
      // iconBar.toggleClass('mobile-deactivated');
      // iconBar.removeClass('collapsed');
    }

    lastScrollPosY = $(this).scrollTop();
  });

  $(document).on('touchend', function(e) {
    lastScrollPosY = $(this).scrollTop();
    // console.log($(this).scrollTop(), lastScrollPosY);
  });

  navDropdown.on('show.bs.collapse', function(e) {
    navDisabled = true;
    navToggle.before('<div class="disabled-block"></div>');
    navToggle.removeClass('mobile-deactivated');
    iconBar.removeClass('mobile-deactivated');
  });

  navDropdown.on('shown.bs.collapse', function(e) {
    navDisabled = false;
    $('.disabled-block').remove();
  });

  navDropdown.on('hide.bs.collapse', function(e) {
    navDisabled = true;
    navToggle.before('<div class="disabled-block"></div>');
    navToggle.addClass('mobile-deactivated');
  });

  navDropdown.on('hidden.bs.collapse', function(e) {
    navDisabled = false;
    $('.disabled-block').remove();
  });

  $('.dart-popover').on( 'click', function(e) {
    e.preventDefault();
    if (popOpen) {
      $('.dart-popover').not(this).popover('hide');
    }
    popOpen = true;

  });



  // Adding the navigation to the popup
  // $("a.dart-popover").each(function(index) {
  //   var lnk = $(this);

  //   // Add prev and nex buttons
  //   if ( lnk == $('.lang-dart:first-child a.dart-popover') ) {
  //     //console.log('first');
  //     var navCopy = '<div class="popover_nav"><div class="left"></div><div class="right"><a class="btn" href="#">Next &gt;</a></div></div>';
  //   } else if ( lnk == $('.lang-dart a.dart-popover:last') ) {
  //     //console.log('last');
  //     var navCopy = '<div class="popover_nav"><div class="left"><a class="btn" href="#">&lt; Previous</a></div><div class="right"></div></div>';
  //   } else {
  //     //console.log('not first or last');
  //     var navCopy = '<div class="popover_nav"><div class="left"><a class="btn" href="#">&lt; Previous</a></div><div class="right"><a class="btn" href="#">Next &gt;</a></div></div>';
  //   };

  //   var orgCopy = lnk.attr('data-content');
  //   lnk.attr('data-content', orgCopy + navCopy);


  //   // Add close button to each one.
  //   var popTitle = lnk.attr('data-original-title');
  //   var closeBtn = '<a class="close-btn" href="javascript:"><i class="sprite-icon-close-x"></i></a>';
  //   lnk.attr('data-original-title', closeBtn + popTitle);

  // });

  // $( document ).ready(function() {
  //   $("a.close-btn").on( "click", function(e) {
  //     e.preventDefault();
  //     console.log('close was just called.');
  //   });
  // });

});


