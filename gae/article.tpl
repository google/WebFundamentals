<!DOCTYPE html>
<html lang="{{ lang }}">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,400italic,500,500italic,700,700italic|Roboto+Mono:400,500,700|Material+Icons">
    <link rel="stylesheet" href="/wf-local/styles/devsite-google-blue.css">
    <meta name="robots" content="noindex">
    <link rel="canonical" href="https://developers.google.com/web/{{requestPath}}">
    <style>
      video {
        max-width: 100%;
      }
    </style>
    <title>{{ title }}</title>
  </head>
  <body class="devsite-chekov devsite-doc-page devsite-header-no-lower-tabs" id="top_of_page">
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
                      <a href="/web/" class="devsite-breadcrumb-link">
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
          DevSite Section Name
      </header>
      <div id="gc-wrapper">
        <div class="devsite-main-content clearfix">
          {% autoescape off %}{{ announcementBanner }}{% endautoescape %}
          <nav class="devsite-section-nav devsite-nav nocontent">
            {% autoescape off %}
              {{ leftNav }}
            {% endautoescape %}
          </nav>
          <nav class="devsite-page-nav devsite-nav">
            <ul class="devsite-page-nav-list">
              <li class="devsite-nav-item devsite-nav-item-heading">
                <a href="#top_of_page" class="devsite-nav-title">
                  <span>Contents</span>
                </a>
              </li>
              {% autoescape off %}
                {{ toc }}
              {% endautoescape %}
            </ul>
          </nav>
          <article class="devsite-article">
            <article class="devsite-article-inner">
              <div class="devsite-rating-container">
                <div class="devsite-rating-stars">
                  <div class="devsite-rating-star devsite-rating-star-outline gc-analytics-event material-icons">
                  </div><div class="devsite-rating-star devsite-rating-star-outline gc-analytics-event material-icons">
                  </div><div class="devsite-rating-star devsite-rating-star-outline gc-analytics-event material-icons">
                  </div><div class="devsite-rating-star devsite-rating-star-outline gc-analytics-event material-icons">
                  </div><div class="devsite-rating-star devsite-rating-star-outline gc-analytics-event material-icons">
                  </div>
                </div>
                <div class="devsite-rating-description">
                </div>
                <div class="devsite-rating-internal">
                  <span class="devsite-rating-stats"></span>
                </div>
              </div>
              {% autoescape off %}
                {{ content }}
              {% endautoescape %}
            </article>
          </article>
        </div>
      </div>
    </div>
  </body>

  <!-- loads the code prettifier -->
  <script async src="/wf-local/scripts/prettify-bundle.js" onload="prettyPrint();">
  </script>
  <script async defer src="/wf-local/scripts/devsite.js"></script>
  <script async src="/wf-local/scripts/footer-closure.js" onload="devsite.kennedy.InitializeTabbars();">
  </script>
</html>
