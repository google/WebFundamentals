project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_review_required #}
{# wf_updated_on: 2015-03-26 #}
{# wf_published_on: 2000-01-01 #}

# Redirect HTTP to HTTPS {: .page-title }

{% include "_shared/contributors/TODO.html" %}




## TL;DR {: .hide-from-toc }
- 您需要在頁面的頁首 (head) 放置一標準連結，以告之搜尋引擎 https 是到達您網站的最佳方法。


在您頁面中設定 &lt; link rel="canonical" href="https://…"/&gt; 標籤。 [這有助於搜尋引擎]
(https://support.google.com/webmasters/answer/139066?hl=en)知道前往您網站的最佳方法。


大多數網頁伺服器提供了一個簡單的重新導向功能。 使用 301 (永久移動) 是向搜尋引擎和瀏覽器表示，HTTPS 版本為標準，並將您的使用者從 HTTP 重新導向至您的 HTTPS 版本。


