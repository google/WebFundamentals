project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description:Get Started with Workbox.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2018-03-13 #}
{# wf_published_on: 2017-11-15 #}

# 使用入門{：.page-title}

本指南將向您展示如何使用工作箱啟動和運行網頁，並演示如何使用通用策略進行緩存。

由於大多數網站都包含CSS，JavaScript和圖像，我們來看看如何使用服務工作者和工作箱來緩存和提供這些文件。

## 創建並註冊Service Worker文件

在我們使用工作箱之前，我們需要創建一個Service Worker文件並將其註冊到我們的網站。

首先在站點的根目錄下創建一個名為`sw.js`的文件，然後向文件添加一個控制台消息（這樣我們就可以看到它加載了）。

```javascript
console.log('Hello from sw.js');
```

在您的網頁中註冊您的新Service Worker文件，如下所示：

{% include "web/tools/workbox/guides/_shared/register-sw.html" %}

這告訴瀏覽器這是用於站點的Service Worker。

如果刷新頁面，則會看到service worker文件中的日誌。

![Console message from sw.js in DevTools](../images/guides/get-started/hello-console.png)

查看Chrome DevTools中的“應用程序”選項卡，您應該看到您的服務人員已註冊。

![Application Tab displaying a registered service worker.](../images/guides/get-started/application-tab.png)

注意：單擊“重新載入更新”複選框可以更輕鬆地與新的服務人員一起開發。

現在我們已經註冊了一名service
worker，讓我們來看看我們如何使用工作箱。

## 導入工作箱

要開始使用工作箱，只需要在service
worker中導入工作`workbox-sw.js`文件。

更改您的service
worker，使其具有以下`importScripts()`調用。

<pre class="prettyprint js">
importScripts('{% include "web/tools/workbox/_shared/workbox-sw-cdn-url.html" %}');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
</pre>

有了這個，你應該看到“Yay”消息，所以我們知道workbox已正式加載到我們的service
worker中。

![DevTools screenshot of Workbox loading in a service worker.](../images/guides/get-started/yay-loaded.png)

現在我們可以開始使用workbox了。

## 使用工作箱

Workbox的主要功能之一是路由和緩存策略模塊。它允許您監聽來自網頁的請求，並確定是否以及如何緩存和響應該請求。

讓我們將緩存後備添加到我們的JavaScript文件。最簡單的方法是使用工作箱註冊路線，該路線將與請求的任何“.js”文件相匹配，我們可以使用正則表達式執行此操作：

```javascript
workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  …
);
```

這告訴Workbox，當發出請求時，它應該看看正則表達式是否與URL的一部分匹配，如果是，則對該請求執行一些操作。對於本指南，“做某事”將通過工作箱的緩存策略之一傳遞請求。

如果我們希望我們的JavaScript文件盡可能來自網絡，但如果網絡出現故障，則回退到緩存版本，我們可以使用“網絡優先”策略來實現此目的。

```javascript
workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.networkFirst()
);
```

將此代碼添加到您的service
worker並刷新頁面。如果您的網頁中包含JavaScript文件，您應該看到類似如下的日誌：

![Example console logs from routing a JavaScript file.](../images/guides/get-started/routing-example.png)

Workbox已經發送了對任何“.js”文件的請求，並使用網絡優先策略來確定如何響應請求。您可以查看DevTools的緩存以檢查請求是否已實際緩存。

![Example of a JavaScript file being cached.](../images/guides/get-started/cached-request.png)

工作箱提供了一些您可以使用的緩存策略。例如，您的CSS可以先從緩存中提供並在後台進行更新，或者您的圖像可以緩存並使用，直到一周之後才能更新。

```javascript
workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'css-cache',
  })
);

workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);
```

## Workbox還有可以做什麼工作？

路由和緩存策略由`routing`和`strategies`模塊執行，但還有很多其他模塊，每個模塊都提供可在服務人員中使用的特定行為。

您會發現許多指南，其中涵蓋了Workbox的其他功能以及有關配置Workbox的更多信息。查找左側的完整列表，但下一步很自然的步驟是啟用預緩存，即在加載服務Service Worker時將文件添加到緩存的過程。

<a href="./precache-files" class="button">了解更多關於Precaching的信息</a>
