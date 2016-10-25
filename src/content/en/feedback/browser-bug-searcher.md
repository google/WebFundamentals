project_path: /web/_project.yaml
book_path: /web/feedback/_book.yaml
full_width: True

{# wf_updated_on: 2016-10-24 #}
{# wf_published_on: 2016-10-24 #}

# Browser Bug Searcher {: .page-title }

Note: The red box is temporary only to indicate the iframe.

<style>iframe {border: 1px solid red;}</style>

{% framebox height="1600px" %}
  <style>
    iframe {
      border: 0;
      width: 100%;
      height: 100%;
    }
  </style>
  <script>
    devsite.framebox.AutoSizeClient.initAutoSize();
    document.querySelector('html').style.height = '100%';
    document.querySelector('body').style.height = '100%';
    setTimeout(fakeSearch, 250);
    function populateSearch() {
      devsite.framebox.AutoSizeClient.requestQueryAndFragment(function(query) {
        var iframe = document.createElement('iframe');
        iframe.src = 'https://browser-issue-tracker-search.appspot.com/' + query;
        document.querySelector('body').appendChild(iframe);
      });
    }
    function fakeSearch() {
      var query = '?q=flexbox';
      var iframe = document.createElement('iframe');
      iframe.src = 'https://browser-issue-tracker-search.appspot.com/' + query;
      document.querySelector('body').appendChild(iframe);
    }
  </script>
{% endframebox %}
