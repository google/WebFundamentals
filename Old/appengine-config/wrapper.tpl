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
    <script src="https://storage.googleapis.com/code.getmdl.io/1.0.5/material.min.js"></script>
    <!--<script src="/web/scripts/material-design-lite/dist/material.js"></script>-->
    {% comment %}
      This helper script checks if a G+ comment block should be loaded and loads it if needed.
    {% endcomment %}
    <script>

      function initComments() {
        var commentElem = document.getElementById('gplus-comments');
        var parentElem = document.getElementById('gplus-comment-container');
        
        gapi.comments.render(commentElem, {
          href: commentElem.dataset.url,
          width: parentElem.offsetWidth,
          first_party_property: 'BLOGGER',
          view_type: 'FILTERED_POSTMOD'
        });
      }

      window.addEventListener('load', function() {
        if (document.getElementById('gplus-comments')) {
          var script = document.createElement('script');
          script.src = 'https://apis.google.com/js/plusone.js?onload=initComments';
          script.defer = true;
          document.head.appendChild(script);
        }
      });
    </script>


  </body>
</html>
