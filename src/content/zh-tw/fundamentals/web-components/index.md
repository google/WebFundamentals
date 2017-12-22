project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 網頁元件（Components）是現代網頁應用程式的基礎。你該如何建構你的網頁元件使得他們經得起時間的考驗呢？

{# wf_updated_on: 2017-08-14 #}
{# wf_published_on: 2017-08-14 #}
{# wf_blink_components: Blink>DOM #}

<style>
nav.devsite-page-nav, .devsite-rating-container {display:none;}
</style>

# Building Components {: .page-title }

網頁元件(Components)是現代網頁應用程式的基礎。你該如何建構你的網頁元件使得他們經
得起時間的考驗呢？

<div class="attempt-left">
  <h2><a href="./customelements">Custom Elements</a></h2>
  <a href="./customelements">
    <img width="48" src="/web/images/md-icons/ic_code_black_24px.svg"
      class="attempt-right">
  </a>
  <p>
    Custom elements 使得開發者能夠擴展HTML並且建立屬於他們自己的標籤（tags），
    因為 Custom elements 是基於標準的，使他們也可以利用網頁內建的元件模型（com-
    ponent model），帶來的好處是可以讓更多模組化的程式碼可以重複應用在不同的情
    況。
  </p>
  <a href="./customelements" class="button button-primary">更多內容</a>
</div>

<div class="attempt-right">
  <h2><a href="./shadowdom">Shadow DOM</a></h2>
  <a href="./shadowdom">
    <img width="48" src="/web/images/md-icons/ic_border_style_black_24px.svg"
      class="attempt-right">
  </a>
  <p>
    Shadow DOM 是一個提供元件樣式（component style）及標記封裝（markup enc-
    apsulation）的網頁標準。他是網頁元件中相當重要的一員，確保了網頁元件能夠
    正常運行，即使已經有其他 CSS 或 Javascript 執行在頁面上。
  </p>
  <a href="./shadowdom" class="button button-primary">更多內容</a>
</div>

<div style="clear:both;"></div>

<div class="attempt-left">
  <h2><a href="./best-practices">最好的實作方法</a></h2>
  <a href="./best-practices">
    <img width="48" src="/web/images/md-icons/ic_done_black_24px.svg"
      class="attempt-right">
  </a>
  <p>
    因為 custom elements 和 shadow DOM 屬於低層級的語法，在不同的環境下要完美
    的整合利用它們並不是那麼容易，所以你能做的就是盡量熟悉這些APIs，這裡有一
    些最好的實作方法來確保你的元件能在不同環境下運作正常。
  </p>
  <a href="./best-practices" class="button button-primary">更多內容</a>
</div>

<div class="attempt-right">
  <h2><a href="./examples/">範例</a></h2>
  <a href="./examples/">
    <img width="48" src="/web/images/md-icons/ic_explore_black_24px.svg"
      class="attempt-right">
  </a>
  <p>
    HowTo-Components 是一些元素的集合，它們展示了一些利用 Custom Element 和
    Shadow DOM 的優秀的實作方法。但這些實作並不適合用在正式上線的服務，這些
    實作方法是用來幫助你將這兩種技巧利用在實際的實作上的教學參考。
  </p>
  <a href="./examples/" class="button button-primary">更多內容</a>
</div>

<div style="clear:both;"></div>
