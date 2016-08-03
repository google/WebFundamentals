<!DOCTYPE html>
<html lang="{{ lang }}">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,400italic,500,500italic,700,700italic|Roboto+Mono:400,500,700|Material+Icons">
    <link rel="stylesheet" href="https://developers.google.com/_static/5258774f52/css/devsite-google-blue.css">
    <title>{{ title }}</title>
    {{ customcss }}
  </head>
  <body class="devsite-chekov devsite-landing-page devsite-header-no-lower-tabs" id="top_of_page">
    <div class="devsite-wrapper">
      <header class="devsite-top-section nocontent" style="position: static;">
        <div class="devsite-top-logo-row-wrapper-wrapper" style="position:fixed;">
          <div class="devsite-top-logo-row-wrapper">
            <div class="devsite-top-logo-row devsite-full-site-width">
              <div class="devsite-product-name-wrapper">
                <a class="devsite-product-name-link" href="https://developers.google.com/web/">
                  <div class="devsite-product-logo-container">
                    <img src="https://www.gstatic.com/images/branding/product/2x/google_developers_64dp.png" class="devsite-product-logo" alt="Web">
                  </div>
                </a>
                <span class="devsite-product-name">
                  <ul class="devsite-breadcrumb-list">
                    <li class="devsite-breadcrumb-item">
                      <a href="https://developers.google.com/web/" class="devsite-breadcrumb-link">
                        <h1 class="devsite-product-name">Web</h1>
                      </a>
                    </li>
                  </ul>
                </span>
              </div>
              <div class="devsite-header-upper-tabs">
                <nav class="devsite-doc-set-nav devsite-nav devsite-overflow-tabs-scroll-wrapper">
                  <ul class="devsite-doc-set-nav-tab-list devsite-overflow-tabs-scroll">
                    <li class="devsite-doc-set-nav-tab-container">
                      <a href="/web/fundamentals/" class="devsite-doc-set-nav-tab">
                        Fundamentals
                      </a>
                    </li>
                    <li class="devsite-doc-set-nav-tab-container">
                      <a href="/web/tools/" class="devsite-doc-set-nav-tab">
                        Tools
                      </a>
                    </li>
                    <li class="devsite-doc-set-nav-tab-container">
                      <a href="/web/updates/" class="devsite-doc-set-nav-tab">
                        Updates
                      </a>
                    </li>
                    <li class="devsite-doc-set-nav-tab-container">
                      <a href="/web/showcase/" class="devsite-doc-set-nav-tab">
                        Case Studies
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
          {{ header }}
      </header>
      <div id="gc-wrapper">
        <div class="devsite-main-content clearfix">
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
  <script async defer src="/devsite.js"></script>
</html>
