project_path: "/web/tools/_project.yaml"
book_path: "/web/tools/_book.yaml"
description: 如何從Chrome DevTools的“應用程序”面板查看緩存數據。

{# wf_updated_on: 2019-09-03 #} {# wf_published_on: 2019-03-25 #} {# wf_blink_components: Platform>DevTools #}

# 使用Chrome DevTools查看緩存數據{: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

本指南介紹如何使用[Chrome DevTools](/web/tools/chrome-devtools)檢查[Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) {: .external }數據.

如果您正在嘗試檢查[HTTP緩存](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) {: .external }數據,那麼這不是您想要的指南. **網絡日誌的** “ **大小”**列包含您要查找的信息.請參閱[記錄網絡活動](/web/tools/chrome-devtools/network/#load) .

## 查看緩存數據{: #view }

1. 單擊**Application**選項卡以打開**Application**面板。默認情況下， **Manifest**窗格通常會打開。

      <figure>
        <img src="/web/tools/chrome-devtools/storage/imgs/manifest.png" alt="The Manifest pane.">
        <figcaption><b>圖1</b> 。清單窗格。</figcaption>
      </figure>
    

2. 展開“ **緩存存儲”**部分以查看可用緩存。

      <figure>
        <img src="/web/tools/chrome-devtools/storage/imgs/cache.png" alt="Available caches.">
        <figcaption><b>圖2</b> 。可用的緩存。</figcaption>
      </figure>
    

3. 單擊緩存以查看其內容。

      <figure>
        <img src="/web/tools/chrome-devtools/storage/imgs/cacheview.png" alt="Viewing a cache's contents.">
        <figcaption><b>圖3</b> 。查看<b>airhorner-0.6.11</b>緩存。</figcaption>
      </figure>
    

4. 單擊資源以在表下方的部分中查看其HTTP標頭。

      <figure>
        <img src="/web/tools/chrome-devtools/storage/imgs/viewcacheresource.png" alt="Viewing a resource's HTTP headers.">
        <figcaption><b>圖4</b> 。查看<b>/index.html</b>資源的HTTP標頭。</figcaption>
      </figure>
    

5. 單擊“ **預覽”**以查看資源的內容。

      <figure>
        <img src="/web/tools/chrome-devtools/storage/imgs/cachecontent.png" alt="Viewing a resource's content.">
        <figcaption><b>圖5</b> 。查看<b>/scripts.comlink.global.js</b>資源的內容。</figcaption>
      </figure>
    

## 刷新資源{: #refresh }

1. [查看緩存的數據](#view) 。

2. 單擊要刷新的資源。 DevTools將其突出顯示為藍色，表示已選中。

      <figure>
        <img src="/web/tools/chrome-devtools/storage/imgs/cacheselected.png" alt="Selecting a resource.">
        <figcaption><b>圖6</b> 。選擇<b>/styles/main.css</b>資源。</figcaption>
      </figure>
    

3. 單擊**刷新** ![刷新](/web/tools/chrome-devtools/images/shared/reload.png) {: .inline-icon }.

## 過濾資源{: #filter }

1. [查看緩存的數據](#view) 。

2. 使用“ **按路徑篩選”**文本框可篩選出與您提供的路徑不匹配的所有資源。

      <figure>
        <img src="/web/tools/chrome-devtools/storage/imgs/cachefilter.png" alt="Filtering out resources that do not match the specified path.">
        <figcaption><b>圖7</b> 。過濾掉與<code>/script</code>路徑不匹配的資源。</figcaption>
      </figure>
    

## 刪除資源{: #deleteresource }

1. [查看緩存的數據](#view) 。

2. 單擊要刪除的資源。 DevTools將其突出顯示為藍色，表示已選中。

      <figure>
        <img src="/web/tools/chrome-devtools/storage/imgs/cacheselected.png" alt="Selecting a resource.">
        <figcaption><b>圖8</b> 。選擇<b>/styles/main.css</b>資源。</figcaption>
      </figure>
    

3. 單擊**刪除所選項** ![刪除所選](/web/tools/chrome-devtools/images/shared/delete.png) {: .inline-icon }.

## 刪除所有緩存數據{: #deletecache }

1. 打開**應用程序** > **清除存儲** 。

2. 確保已啟用“ **緩存存儲”**複選框。

      <figure>
        <img src="/web/tools/chrome-devtools/storage/imgs/cachecheckbox.png" alt="The Cache Storage checkbox.">
        <figcaption><b>圖9</b> 。 <b>緩存存儲</b>複選框。</figcaption>
      </figure>
    

3. 單擊**清除站點數據** 。

      <figure>
        <img src="/web/tools/chrome-devtools/storage/imgs/cacheclearsite.png" alt="The Clear Site Data button.">
        <figcaption><b>圖10</b> 。 <b>清除站點數據</b>按鈕。</figcaption>
      </figure>
    

## 反饋{: #feedback }

{% include "web/_shared/helpful.html" %}
