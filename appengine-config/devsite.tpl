<!DOCTYPE html>
<html lang="{{ lang }}">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,400italic,500,500italic,700,700italic|Roboto+Mono:400,500,700|Material+Icons">
    <link rel="stylesheet" href="https://developers.google.com/_static/5258774f52/css/devsite-google-blue.css">
  </head>
  <body class="devsite-chekov devsite-doc-page devsite-header-no-lower-tabs" id="top_of_page">
    <div class="devsite-wrapper">
      <header class="devsite-top-section nocontent" style="position: static;">
        <div class="devsite-top-logo-row-wrapper-wrapper" style="position:fixed;">
          <div class="devsite-top-logo-row-wrapper">
            <div class="devsite-top-logo-row devsite-full-site-width">
              DevSite Header
            </div>
          </div>
        </div>
          DevSite Section Name
      </header>
      <div id="gc-wrapper">
        <div class="devsite-main-content clearfix">
          <hav class="devsite-section-nav devsite-nav">
            Section Nav
          </hav>
          <nav class="devsite-page-nav devsite-nav">
            <ul class="devsite-page-nav-list">
              <li class="devsite-nav-item devsite-nav-item-heading">
                <a href="#top_of_page" class="devsite-nav-title">
                  <span>Contents</span>
                </a>
              </li>
              <li class="devsite-nav-item">Heading 1</li>
              <li class="devsite-nav-item">Heading 1</li>
              <li class="devsite-nav-item">Heading 1</li>
              <li class="devsite-nav-item">Heading 1</li>
            </ul>
          </nav>
          <article class="devsite-article">
            <article class="devsite-article-inner">
              {% autoescape off %}
                {{ content }}
              {% endautoescape %}
            </article>
          </article>
        </div>
      </div>
    </div>
  </body>
</html>
