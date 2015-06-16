<!DOCTYPE html>
<html lang="{{ lang }}" class="no-js no-touch">
  <head>
    <meta charset="utf-8" />

    {% include content %}

    {% comment %}
      Simple navigation enhancement JS

      I was unable to add JS comments because it
      breaks the build for some weird reason.

      - initSmallNav/initSubMenus:
        Initializes the main menu.
      - initComments:
        Initializes Google Plus comments when the correct container element
        is found on the page.
      - initAnimations:
        A helper that makes looping videos play only when they are visible
        (within the viewport). Note: Currently does not take window resizes
        into account.

    {% endcomment %}

    <script>
    (function() {

     var SlashWeb = {

      helpers: {
        isTouch: function() {
          return ('ontouchstart' in window) ||
            window.DocumentTouch && document instanceof DocumentTouch;
        },

        addClass: function (elem, className) {
          if (!elem) { return; }
          elem.className = elem.className.replace(/\s+$/gi, '') +
                            ' ' + className;
        },

        removeClass: function(elem, className) {
          if (!elem) { return; }
          elem.className = elem.className.replace(className, '');
        }
      },

      init: function() {

        var html = document.querySelector('html');
        SlashWeb.helpers.removeClass(html, 'no-js');
        SlashWeb.helpers.addClass(html, 'js');

        if (SlashWeb.helpers.isTouch()) {
          SlashWeb.helpers.removeClass(html, 'no-touch');
          SlashWeb.helpers.addClass(html, 'is-touch');
        }

        SlashWeb.initSmallNav();
        SlashWeb.initSubMenus();
        SlashWeb.initComments();
        SlashWeb.initAnimations();

      },

      initSmallNav: function() {

        var navBtn = document.querySelector('.main-nav__btn');
        var navList = document.querySelector('.main-nav__list');
        var navIsOpenedClass = 'nav-is-opened';
        var navListIsOpened = false;

        navBtn.addEventListener('click', function (event) {
          event.preventDefault();

          if (!navListIsOpened) {
            SlashWeb.helpers.addClass(navList, navIsOpenedClass);
            navListIsOpened = true;
          } else {
            SlashWeb.helpers.removeClass(navList, navIsOpenedClass);
            navListIsOpened = false;
          }
        });

      },

      initSubMenus: function() {

        var parentIsOpenedClass = 'subnav-is-opened';
        var openParent = null;

        var initParent = function(parent, link) {

          link.addEventListener('click', function (event) {
            event.preventDefault();

            if (!openParent) {
              openParent = parent;
              SlashWeb.helpers.addClass(parent, parentIsOpenedClass);
            } else if(openParent === parent) {
              openParent = false;
              SlashWeb.helpers.removeClass(parent, parentIsOpenedClass);
            } else {
              SlashWeb.helpers.removeClass(openParent, parentIsOpenedClass);
              openParent = parent;
              SlashWeb.helpers.addClass(parent, parentIsOpenedClass);
            }

          });

        };

        var parents = document.querySelectorAll('.main-nav__item--has-child');
        var parent;
        var link;

        for (var i = 0; i < parents.length; i++) {
          parent = parents[i];
          link = parent.querySelector('.main-nav__link');
          if(link) {
            initParent(parent, link);
          }
        }

      },

      initComments: function() {

        if(document.getElementById('gplus-comments')) {

          var script = document.createElement('script');
          script.onload = function() {

            var commentElem = document.getElementById('gplus-comments');
            var parentElem = document.getElementById('gplus-comment-container');
            var parentCompStyle = getComputedStyle(parentElem);
            var parentInnerWidth = parentElem.offsetWidth -
                                    parseInt(parentCompStyle.paddingRight, 10) -
                                    parseInt(parentCompStyle.paddingLeft, 10);

            gapi.comments.render(commentElem, {
              href: commentElem.dataset.url,
              width: parentInnerWidth,
              first_party_property: 'BLOGGER',
              view_type: 'FILTERED_POSTMOD'
            });

            var counterElem = document.getElementById('gplus-comment-counter');
            var counterComputedStyle = getComputedStyle(counterElem);

            gapi.commentcount.render(counterElem, {
              count_only: 'true',
              href: commentElem.dataset.url,
              'font-family': counterComputedStyle.fontFamily,
              'font-size': counterComputedStyle.fontSize,
              color: '#404040'
            });

          };
          script.src = 'https://apis.google.com/js/plusone.js';
          document.head.appendChild(script);

        }

      },

      initAnimations: function() {

        window.addEventListener('load', function() {

          var getElementTop = function(elem) {
            var top = elem.offsetTop;
            var offsetParent = elem.offsetParent;

            while ( offsetParent != null ) {
              top += offsetParent.offsetTop;
              offsetParent = offsetParent.offsetParent;
            }

            return top;
          };

          var videoEls = document.querySelectorAll('video.autoplay-animation');
          if(!videoEls.length) {
            return;
          }

          if('ontouchstart' in window) {

            for (var i = 0; i < videoEls.length; i++) {
              videoEls[i].setAttribute('controls', 1);
            }

          } else {

            var items = [];
            for (var i = 0; i < videoEls.length; i++) {
              items.push({
                element: videoEls[i],
                top: getElementTop(videoEls[i]),
                height: videoEls[i].offsetHeight,
                playing: false
              });
            }

            window.addEventListener('scroll', function() {
              var scrollY = window.scrollY;
              for (var i = 0, item; i < items.length; i++) {
                item = items[i];
                if(-scrollY + item.top > -item.height &&
                    window.innerHeight - (-scrollY + item.top) > 0) {
                  if(item.element.paused) {
                    item.element.play();
                  }
                } else {
                  if(!item.element.paused) {
                    item.element.pause();
                  }
                }
              }
            }, false);

          }

        }, false);

      }

    };

    SlashWeb.init();

    })();
    </script>
  </body>
</html>
