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
      .wf-stage-warning { 
        color: white !important;
        font-weight: bold !important;
      }
      .wf-stage-warning .material-icons { vertical-align: middle; }
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
                    <li class="devsite-doc-set-nav-tab-container" style="float:right;">
                      <a href="https://github.com/google/WebFundamentals" class="devsite-doc-set-nav-tab wf-stage-warning">
                        <span class="material-icons">warning</span>
                        STAGING
                        <span class="material-icons">warning</span>
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
              <div class="devsite-article-body clearfix">
                {% autoescape off %}{{ content }}{% endautoescape %}
              </div>
              <div class="devsite-content-footer nocontent">
                <p>
                  Except as otherwise noted, the content of this page is licensed under the
                  <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons
                  Attribution 3.0 License</a>, and code samples are licensed under the
                  <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache 2.0 License</a>.
                  For details, see our <a href="https://developers.google.com/site-policies">
                  Site Policies</a>. Java is a registered trademark of Oracle and/or its
                  affiliates.
                </p>
                <p>
                  <b>Note:</b> This is a development version of /web,
                  visit <a href="https://developers.google.com/web/">
                  https://developers.google.com/web/</a> for the production version.
                </p>
                <p class="devsite-content-footer-date">
                  Last updated {{ dateUpdated }}.
                </p>
              </div>
            </article>
          </article>
        </div>
        <footer class="devsite-footer-promos nocontent">
          <nav class="devsite-full-site-width">
            <ul class="devsite-footer-promos-list">
              <li class="devsite-footer-promo">
                <a href="#" class="devsite-footer-promo-title">
                  <img class="devsite-footer-promo-icon" src="https://www.gstatic.com/images/icons/material/system/2x/stars_black_48dp.png">
                  Title
                </a>
                <div class="devsite-footer-promo-description">
                  Lorem ipsum something this that or the other thing.
                </div>
              </li>
              <li class="devsite-footer-promo">
                <a href="#" class="devsite-footer-promo-title">
                  <img class="devsite-footer-promo-icon" src="https://www.gstatic.com/images/icons/material/system/2x/thumb_up_black_48dp.png">
                  Title
                </a>
                <div class="devsite-footer-promo-description">
                  Lorem ipsum something this that or the other thing.
                </div>
              </li>
              <li class="devsite-footer-promo">
                <a href="#" class="devsite-footer-promo-title">
                  <img class="devsite-footer-promo-icon" src="https://www.gstatic.com/images/icons/material/system/2x/pets_black_48dp.png">
                  Title
                </a>
                <div class="devsite-footer-promo-description">
                  Lorem ipsum something this that or the other thing.
                </div>
              </li>
              <li class="devsite-footer-promo">
                <a href="#" class="devsite-footer-promo-title">
                  <img class="devsite-footer-promo-icon" src="https://www.gstatic.com/images/icons/material/system/2x/favorite_black_48dp.png">
                  Title
                </a>
                <div class="devsite-footer-promo-description">
                  Lorem ipsum something this that or the other thing.
                </div>
              </li>
            </ul>
          </nav>
        </footer>
        <footer class="devsite-footer-linkboxes nocontent">
          <nav class="devsite-full-site-width">
            <ul class="devsite-footer-linkboxes-list">
              <li class="devsite-footer-linkbox">
                <h3 class="devsite-footer-linkbox-heading">Heading</h3>
                <ul class="devsite-footer-linkbox-list">
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                </ul>
              </li>
              <li class="devsite-footer-linkbox">
                <h3 class="devsite-footer-linkbox-heading">Heading</h3>
                <ul class="devsite-footer-linkbox-list">
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                </ul>
              </li>
              <li class="devsite-footer-linkbox">
                <h3 class="devsite-footer-linkbox-heading">Heading</h3>
                <ul class="devsite-footer-linkbox-list">
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                </ul>
              </li>
              <li class="devsite-footer-linkbox">
                <h3 class="devsite-footer-linkbox-heading">Heading</h3>
                <ul class="devsite-footer-linkbox-list">
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                  <li class="devsite-footer-linkbox-item"><a href="#">Lorem Ipsum</a></li>
                </ul>
              </li>
            </ul>
          </nav>
        </footer>
        <footer class="devsite-utility-footer">
          <nav class="devsite-utility-footer-nav devsite-nav devsite-full-site-width">
            <span class="devsite-utility-footer-links">
              <a href="https://developers.google.com/site-terms/">Terms</a> |
              <a href="https://www.google.com/intl/en/privacy/">Privacy</a>
            </span>
            <form class="devsite-utility-footer-language">
              <select id="langSelector" class="kd-select">
                <option value="ar">العربية‬</option>
                <option value="de">Deutsch</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="he">עִבְרִית</option>
                <option value="hi">Hindi</option>
                <option value="it">Italiano</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
                <option value="nl">Nederlands</option>
                <option value="pl">Polski</option>
                <option value="pt-br">Português (Brasil)</option>
                <option value="ru">Pусский</option>
                <option value="tr">Türkçe</option>
                <option value="zh-cn">中文 (简体)</option>
                <option value="zh-tw">中文（繁體）</option>
              </select>
            </form>
          </nav>
        </footer>
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
