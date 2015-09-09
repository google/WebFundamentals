<!DOCTYPE html>
<html lang="{{ lang }}" class="no-js no-touch">
  <head>
    <meta charset="utf-8" />

    {% comment %}
      The autoescape off means the content is printed as is - no filtering
      of HTML characters (i.e. '<' gets turned to '&lt;')
    {% endcomment %}
    {% autoescape off %}
      {{ content }}
    {% endautoescape %}


    <script src="/web/scripts/material-design-lite/src/mdlComponentHandler.js"></script>
    <script src="/web/scripts/material-design-lite/src/layout/layout.js"></script>
    <script src="/web/scripts/standard-page-controller.es6.js"></script>

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
          if (counterElement) {
            var counterComputedStyle = getComputedStyle(counterElement);

            gapi.commentcount.render(counterElement, {
              count_only: 'true',
              href: commentElement.dataset.url,
              'font-family': counterComputedStyle.fontFamily,
              'font-size': counterComputedStyle.fontSize,
              color: "#404040"
            });
          }

        };
        script.src = "https://apis.google.com/js/plusone.js";
        document.head.appendChild(script);

      }

    })();
    </script>
  </body>
</html>
