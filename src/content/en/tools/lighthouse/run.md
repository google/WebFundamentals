project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Run Lighthouse against any site.

{# wf_updated_on: 2017-06-06 #}
{# wf_published_on: 2016-06-06 #}

# Try Lighthouse {: .page-title }

<style>
.devsite-section-nav,
.devsite-page-nav {
  display: none;
}
.devsite-article {
  margin-left: 0 !important;
  width: 100% !important;
}
.framebox {
  margin: 0;
}
</style>

Take [Lighthouse](/web/tools/lighthouse/) for a spin. Enter the URL of any site
to get started.

{% framebox height="500px" %}
  <style>
    .devsite-framebox {
      padding: 0;
    }
    html, body, iframe {
      border: 0;
      width: 100%;
      height: 100%;
    }
  </style>
  <iframe src="https://lighthouse-ci.appspot.com/try" scrolling="no"></iframe>
  <script>
    devsite.framebox.AutoSizeClient.initAutoSize();
    //document.querySelector('html').style.height = '100%';
    //document.querySelector('body').style.height = '100%';
  </script>
{% endframebox %}
