<!DOCTYPE html>
<html lang="{{ lang }}" class="no-js no-touch">
  <head>
    <meta charset="utf-8" />

    {% include content %}


    {% comment %}
      Simple navigation enhancement JS

      I was unable to add JS comments because it
      breaks the build for some weird reason,
      but this is all we should need really

      Most of the code is just some helper functions.
    {% endcomment %}

    <script>
      (function() {

            var isTouch = function() {
              return ('ontouchstart' in window) ||
                window.DocumentTouch && document instanceof DocumentTouch;
            };

            var addClass = function (element, className) {
              if (!element) { return; }
              element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
            };

            var removeClass = function(element, className) {
              if (!element) { return; }
              element.className = element.className.replace(className, '');
            };

            var html = document.querySelector('html');
            removeClass(html, 'no-js');
            addClass(html, 'js');

            if (isTouch()) {
              removeClass(html, 'no-touch');
              addClass(html, 'is-touch');
            }

            var initSmallNav = function() {
              var navBtn = document.querySelector('.main-nav__btn');
              var navList = document.querySelector('.main-nav__list');
              var navIsOpenedClass = 'nav-is-opened';
              var navListIsOpened = false;

              navBtn.addEventListener('click', function (event) {
                event.preventDefault();

                if (!navListIsOpened) {
                  addClass(navList, navIsOpenedClass);
                  navListIsOpened = true;
                } else {
                  removeClass(navList, navIsOpenedClass);
                  navListIsOpened = false;
                }
              });
            }

            var initSubMenus = function() {

              var parentIsOpenedClass = 'subnav-is-opened';
              var openParent = null;

              var initParent = function(parent, link) {

                link.addEventListener('click', function (event) {
                  event.preventDefault();

                  if (!openParent) {
                    openParent = parent;
                    addClass(parent, parentIsOpenedClass);
                  } else if(openParent === parent) {
                    openParent = false;
                    removeClass(parent, parentIsOpenedClass);
                  } else {
                    removeClass(openParent, parentIsOpenedClass);
                    openParent = parent;
                    addClass(parent, parentIsOpenedClass);
                  }

                });

              };

              var parents = document.querySelectorAll('.main-nav__item--has-child')
              var parent
              var link;

              for (var i = 0; i < parents.length; i++) {
                parent = parents[i];
                link = parent.querySelector('.main-nav__link');
                if(link) {
                  initParent(parent, link);
                }
              }

            };

            initSmallNav();
            initSubMenus();

          })(document);
    </script>

    {% comment %}
      This helper script checks if a G+ comment block should be loaded and loads it if needed.
    {% endcomment %}
    <script>
    (function() {

      if(document.getElementById('gplus-comments')) {

        var script = document.createElement('script');
        script.onload = function() {

          var commentElement = document.getElementById('gplus-comments');
          var parentElement = document.getElementById("gplus-comment-container");
          var parentComputedStyle = getComputedStyle(parentElement);
          var parentInnerWidth = parentElement.offsetWidth - parseInt(parentComputedStyle.paddingRight, 10) - parseInt(parentComputedStyle.paddingLeft, 10);

          gapi.comments.render(commentElement, {
            href: commentElement.dataset.url,
            width: parentInnerWidth,
            first_party_property: 'BLOGGER',
            view_type: 'FILTERED_POSTMOD'
          });

          var counterElement = document.getElementById("gplus-comment-counter");
          var counterComputedStyle = getComputedStyle(counterElement);

          gapi.commentcount.render(counterElement, {
            count_only: 'true',
            href: commentElement.dataset.url,
            'font-family': counterComputedStyle.fontFamily,
            'font-size': counterComputedStyle.fontSize,
            color: "#404040"
          });

        };
        script.src = "https://apis.google.com/js/plusone.js";
        document.head.appendChild(script);

      }

    })();
    </script>
  </body>
</html>
