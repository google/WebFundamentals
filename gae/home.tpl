<!DOCTYPE html>
<html lang="{{ lang }}">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex">
    <link rel="canonical" href="https://developers.google.com/web/{{requestPath}}">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,400italic,500,500italic,700,700italic|Roboto+Mono:400,500,700|Material+Icons">
    <link rel="stylesheet" href="/wf-local/styles/uhura-google-blue.css">
    <title>{{ title }}</title>
    {% autoescape off %}{{ customcss }}{% endautoescape %}
    <style>
      .wf-stage-warning {
        color: #4285f4 !important;
        font-weight: bold !important;
      }
      .wf-stage-warning .material-icons { vertical-align: middle; }
      .devsite-top-logo-row-wrapper-wrapper { border-bottom: 1px solid #4285f4; }
    </style>
  </head>
  <body class="devsite-uhura devsite-landing-page devsite-header-no-lower-tabs" id="top_of_page">
    <div class="devsite-wrapper">
      <div class="devsite-top-section-wrapper">
        <header class="devsite-top-section nocontent" style="position: static;">
          <div class="devsite-top-logo-row-wrapper-wrapper" style="position:fixed;">
            <div class="devsite-top-logo-row-wrapper">
              <div class="devsite-top-logo-row devsite-full-site-width">
                <div class="devsite-product-name-wrapper">
                  <a class="devsite-product-name-link" href="/web/">
                    <img src="/web/images/web-fundamentals-icon192x192.png" class="devsite-product-logo" alt="Web">
                  </a>
                  <span class="devsite-product-name">
                    <ul class="devsite-breadcrumb-list">
                      <li class="devsite-breadcrumb-item">
                        <a href="/web/" class="devsite-breadcrumb-link">
                          <h1 class="devsite-product-name">{{ title }}</h1>
                        </a>
                      </li>
                    </ul>
                  </span>
                </div>
                <div class="devsite-header-upper-tabs">
                  <nav class="devsite-doc-set-nav devsite-nav devsite-overflow-tabs-scroll-wrapper">
                    <ul class="devsite-doc-set-nav-tab-list devsite-overflow-tabs-scroll" style="min-width: 448px; left: 0px;">
                      <li class="devsite-doc-set-nav-tab-container">
                        <a href="/web/fundamentals/" class="devsite-doc-set-nav-tab">Fundamentals</a>
                      </li>
                      <li class="devsite-doc-set-nav-tab-container">
                        <a href="/web/tools/" class="devsite-doc-set-nav-tab">Tools</a>
                      </li>
                      <li class="devsite-doc-set-nav-tab-container">
                        <a href="/web/updates/" class="devsite-doc-set-nav-tab">Updates</a>
                      </li>
                      <li class="devsite-doc-set-nav-tab-container">
                        <a href="/web/showcase/" class="devsite-doc-set-nav-tab">Case Studies</a>
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
          {% autoescape off %}{{ header }}{% endautoescape %}
        </header>
      </div>
      <div id="gc-wrapper">
        <div class="devsite-main-content clearfix">
          {% autoescape off %}{{ announcementBanner }}{% endautoescape %}
          <article class="devsite-article">
            <article class="devsite-article-inner">
              {% autoescape off %}
                {{ content }}
              {% endautoescape %}
            </article>
          </article>
        </div>
        <footer class="devsite-footer-promos nocontent">
          <nav class="devsite-full-site-width">
            <ul class="devsite-footer-promos-list">
              {% autoescape off %}{{footerPromo}}{% endautoescape %}
            </ul>
          </nav>
        </footer>
        <footer class="devsite-footer-linkboxes nocontent">
          <nav class="devsite-full-site-width">
            <ul class="devsite-footer-linkboxes-list">
              {% autoescape off %}{{footerLinks}}{% endautoescape %}
            </ul>
          </nav>
        </footer>
        <footer class="devsite-utility-footer">
          <nav class="devsite-utility-footer-nav devsite-nav devsite-full-site-width">
            <span class="devsite-utility-footer-links">
              <a href="https://developers.google.com/site-terms">Terms</a> |
              <a href="https://www.google.com/intl/en/policies/privacy/">Privacy</a>
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
                <option value="id">Bahasa Indonesia</option>
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
  <script async defer src="/wf-local/scripts/devsite.js"></script>
  <!-- loads the code prettifier -->
  <script async src="/wf-local/scripts/prettify-bundle.js" onload="prettyPrint();">
  </script>
  <script async src="/wf-local/scripts/footer-closure.js" onload="devsite.kennedy.InitializeTabbars();">
  </script>
</html>
