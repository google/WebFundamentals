<!DOCTYPE html>
<html lang="{{.Lang}}">
  <head>
    <meta charset="utf-8" />

    {{.Content}}

    <!-- This is mdl version 1.0.5 -->
    <script src="https://code.getmdl.io/1.0.5/material.min.js"></script>
    <!--<script src="/web/scripts/material-design-lite/dist/material.js"></script>-->
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
