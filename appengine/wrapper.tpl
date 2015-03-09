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

    <script type="text/javascript">
      (function(document) {

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

              var initParent = function(parent, link) {

                var parentIsOpenedClass = 'subnav-is-opened';
                var parentIsOpened = false;

                link.addEventListener('click', function (event) {
                  event.preventDefault();

                  if (!parentIsOpened) {
                    parentIsOpened = true;
                    addClass(parent, parentIsOpenedClass);
                  } else {
                    parentIsOpened = false;
                    removeClass(parent, parentIsOpenedClass);
                  }

                });

              };

              var parents = document.querySelectorAll('.main-nav__item--has-child'), parent, link;

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
  </body>
</html>
