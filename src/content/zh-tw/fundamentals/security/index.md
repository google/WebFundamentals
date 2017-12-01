project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:安全性是一個重要話題，詳細瞭解 HTTPS，爲什麼說 HTTPS 很重要以及如何將其部署到服務器。

{# wf_updated_on:2016-09-09 #}
{# wf_published_on:2015-09-08 #}

# 安全性和身份 {: .page-title }

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="pgBQn_z3zRE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

安全性是一個重要話題，您可以從以下幾點入手。 

<div class="clearfix"></div>


## 對傳輸中的數據進行加密

<img src="/web/images/content-https-2x.jpg" class="attempt-right">

[安全的 HTTP，也稱爲 HTTPS](encrypt-in-transit/why-https)，是最關鍵的安全功能之一，許多現代 API 和 [Progressive Web App](/web/progressive-web-apps/) 都需要使用它。人們對 HTTPS 有一個普遍的錯誤認識，認爲只有處理敏感通信的網站才需要 HTTPS。隱私和安全性並不是使用 HTTPS 保護用戶的充分理由，服務工作線程、Payment Request API 等許多新的瀏覽器功能也需要 HTTPS。

[在服務器上啓用 HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https)

<div class="attempt-left">
  <h2>內容安全政策</h2>
  <p>
    內容安全政策或 CSP 提供一個豐富的指令集，讓您可以對允許頁面加載的資源和資源加載位置進行精細控制。<br>


    <a href="csp/">瞭解詳情</a>
  </p>
</div>
<div class="attempt-right">
  <h2>防止混合內容</h2>
  <p>
    實現 HTTPS 時比較耗時的一項任務是查找和修復具有 HTTPS 和 HTTP 的混合內容。
幸運的是，有一些工具可幫助您處理此任務。
<br>
    <a href="prevent-mixed-content/what-is-mixed-content">使用入門 </a>
  </p>
</div>

<div style="clear:both"></div>

## 相關資源

### Chrome DevTools

* [瞭解安全問題](/web/tools/chrome-devtools/security)





{# wf_devsite_translation #}
