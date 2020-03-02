project_path: /web/feedback/_project.yaml
book_path: /web/feedback/_book.yaml

{# wf_updated_on: 2017-04-26 #}
{# wf_published_on: 2016-10-24 #}

# Поиск ошибок браузера {: .page-title }

{% framebox height="2000px" %}

  <style>
    iframe {
      border: 0;
      width: 100%;
      height: 100%;
    }
  </style>

<iframe src="https://browser-issue-tracker-search.appspot.com/devsite"
scrolling="no"></iframe>   <script>
    devsite.framebox.AutoSizeClient.initAutoSize();
    document.querySelector('html').style.height = '100%';
    document.querySelector('body').style.height = '100%';
    var iframe = document.querySelector('iframe');
    if (document.querySelector('body.staging-framebox')) {
      console.log('Query String doesn
iframe.src =
'https://browser-issue-tracker-search.appspot.com/devsite?q=flexbox';
    } else {
      setTimeout(function() {
devsite.framebox.AutoSizeClient.requestQueryAndFragment(function(query)
{
iframe.src =
'https://browser-issue-tracker-search.appspot.com/devsite' + query;
        });
      }, 1500);
    }
  </script> {% endframebox %}t work on staging.');
iframe.src =
'https://browser-issue-tracker-search.appspot.com/devsite?q=flexbox';
    } else {
      setTimeout(function() {
devsite.framebox.AutoSizeClient.requestQueryAndFragment(function(query)
{
iframe.src =
'https://browser-issue-tracker-search.appspot.com/devsite' + query;
        });
      }, 1500);
    }
  </script> {% endframebox %}
