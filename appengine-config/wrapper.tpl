<!DOCTYPE html>
<html lang="{{ lang }}">
  <head>
    <meta charset="utf-8" />

    {% comment %}
      The autoescape off means the content is printed as is - no filtering
      of HTML characters (i.e. '<' gets turned to '&lt;')
    {% endcomment %}
    {% autoescape off %}
      {{ content }}
    {% endautoescape %}

    <!-- This is mdl version 1.0.5 -->
    <script src="/web/scripts/material-design-lite/dist/material.js"></script>
    <link href='https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto:400,300,500,700,400italic,700italic' rel='stylesheet' type='text/css'>

    {% comment %}
      This helper script checks if a G+ comment block should be loaded and loads it if needed.
    {% endcomment %}
    <script>
      (function() {

        var SlashWeb = {

          init: function() {
            SlashWeb.initComments();
          },

          initComments: function() {
            var commentElem = document.getElementById('gplus-comments');
            if (commentElem) {

              var script = document.createElement('script');
              script.onload = function() {

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

              };
              script.src = 'https://apis.google.com/js/plusone.js';
              document.head.appendChild(script);
            }

          }
        };

        SlashWeb.init();

      })();
    </script>
  </body>
</html>
