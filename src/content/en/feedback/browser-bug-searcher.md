project_path: /web/_project.yaml
book_path: /web/feedback/_book.yaml
full_width: True

{# wf_updated_on: 2016-10-24 #}
{# wf_published_on: 2016-10-24 #}

# Browser Bug Searcher {: .page-title }

Note: The red box is temporary and is only used to indicate the iframe.

<style>iframe {border: 1px solid red;}</style>

{% framebox height="1600px" %}
  <style>
    iframe {
      border: 0;
      width: 100%;
      height: 100%;
    }
  </style>
  <iframe></iframe>
  <script>
    devsite.framebox.AutoSizeClient.initAutoSize();
    document.querySelector('html').style.height = '100%';
    document.querySelector('body').style.height = '100%';
    var iframe = document.querySelector('iframe');
    if (document.querySelector('body.staging-framebox')) {
      iframe.src = 'https://browser-issue-tracker-search.appspot.com/devsite?q=flexbox';
    } else {
      setTimeout(function() {
        devsite.framebox.AutoSizeClient.requestQueryAndFragment(function(query) {
          console.log('requestQueryAndFragment', query);
          iframe.src = 'https://browser-issue-tracker-search.appspot.com/devsite' + query;
        });
      }, 100);
    }
  </script>
{% endframebox %}
