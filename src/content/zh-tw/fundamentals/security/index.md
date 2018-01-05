project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:安全性是一個重要話題，詳細了解 HTTPS，為什麼說 HTTPS 很重要以及如何將其部署到伺服器。

{# wf_updated_on: 2017-05-22 #}
{# wf_published_on: 2015-09-08 #}
{# wf_blink_components: Blink>SecurityFeature,Internals>Network>SSL #}

# 安全性和身份 {: .page-title }

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="pgBQn_z3zRE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

安全性是一個重要話題，可以從這裡的幾件事開始。

<div class="clearfix"></div>


## 對傳輸中的資料進行加密

<img src="/web/images/content-https-2x.jpg" class="attempt-right">

[安全的HTTP，也稱為HTTPS](encrypt-in-transit/why-https)，​​是最關鍵的安全功能之一，許多現代API 和[Progressive Web App](/web/progressive-web-apps/) 都需要使用它。人們對 HTTPS 有一個普遍的錯誤認識，認為只有處理敏感資料的網站才需要使用到 HTTPS。隱私和安全性並不是使用 HTTPS 保護使用者的充分理由。許多新的瀏覽器功能，例如付款請求 API 也需要使用到 HTTPS 。

[在伺服器上啟用 HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https)

<div class="attempt-left">
  <h2>內容安全政策</h2>
  <p>
    內容安全政策或 CSP 提供一組豐富的指令集，可以精確控制允許的頁面進行加載資源和加載資源的位置。<br>


    <a href="csp/">了解詳情</a>
  </p>
</div>
<div class="attempt-right">
  <h2>防止混合內容</h2>
  <p>
    在實現 HTTPS 終有一項比較耗時的任務是查找和修復具有 HTTPS 和 HTTP 的混合內容。
幸運的是，有一些工具可幫助您解決這問題。
<br>
    <a href="prevent-mixed-content/what-is-mixed-content">使用入門</a>
  </p>
</div>

<div style="clear:both"></div>

## 相關資源

* [透過 Google 學習 Web 安全](https://www.youtube.com/watch?v=tgEIo7ZSkbQ)
* [Getting the Green Lock: HTTPS Stories from the
  Field](https://www.youtube.com/watch?v=GoXgl9r0Kjk)

### Chrome DevTools

* [了解安全問題](/web/tools/chrome-devtools/security)

