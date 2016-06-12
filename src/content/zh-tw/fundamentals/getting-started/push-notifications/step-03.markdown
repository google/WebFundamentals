---
title: "開始使用Service Worker"
description: "添加JavaScript以安裝service worker"
notes:
  styling:
    - Styling will come later
updated_on: 2015-09-28
translators:
 - henrylim
---
你可以在completed/step3目錄找到這步驟的完整代碼。

{% include shared/toc.liquid %}

## 1. 創建 index.html

在 _app_ 目錄裏，創建一個名為 _index.html_ 的文件並把以下的代碼添加進去:

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <title>推送通知 codelab</title>
</head>
<body>
  <h1>推送通知 codelab</h1>
  <p>這網頁必須使用HTTPS或通過localhost。</p>
  <script src="js/main.js"></script>
</body>
</html>
{% endhighlight %}

使用Chrome, 在本地開啟 _index.html_ : 該URL應該像
http://localhost/push-notifications/app/index.html_.

## 2. 添加Service Worker

在 _app_ 目錄裏，創建一個名為 _sw.js_ 的文件。稍後你將會把代碼添加進去。

如果你從來沒有使用過Service Workers, 別擔心。就算你不是很了解，你還是可以完成這codelab. Service workers是個在後臺執行的worker scripts。它是用來攔截網絡請求，處理推送消息以及執行其他任務。如果你想知道更多，你可以在HTML5 Rocks網頁中的[Introduction to Service Worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)找到更多資料。

當接收到一個推送消息時，遊覽器能在後臺運行service worker。並在網頁沒有開啟的情況下，處理推送消息。

## 3. 註冊和安裝Service Worker

在這個步驟裏，創建一個名為 _sw.js_ 的JavaScript文件。並在 _index.html_ 導入 _sw.js_ 。這將應許網頁存取該Service Worker的腳本。

在 _app_ 目錄裏，創建一個名為 _js_ 的文件夾。並把以下的代碼加進 _main.js—_:

{% highlight javascript %}
if ('serviceWorker' in navigator) {
 console.log('Service Worker is supported');
 navigator.serviceWorker.register('sw.js').then(function(reg) {
   console.log(':^)', reg);
   // TODO
 }).catch(function(err) {
   console.log(':^(', err);
 });
}
{% endhighlight %}

這代碼將確保該遊覽器支持service worker。如果該遊覽器支持service worker, 他將會註冊和安裝Service Worker。

## 4. 從本地主機試試吧

在Chrome中使用本地主機打開 _index.html_。然後打開Chrome開發者工具中的控制臺。

它應該是這樣的：

<img src="images/image01.png" width="965" height="901" alt="Codelab web page open in Chrome, showing ServiceWorkerRegistration in DevTools console" />

## 5. 嘗試 serviceworker-internals

使用 _chrome://serviceworker-internals_ 診斷頁以檢查你的service workers是否正常運作:

<img src="images/image02.png" width="907" height="641" alt="chrome:serviceworker-internals diagnostic page open in Chrome" />

## 6. 添加事件監聽器進你的 Service Worker

把以下的代碼添加進 _sw.js_:

{% highlight javascript %}
console.log('Started', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {
  console.log('Push message received', event);
  // TODO
});
{% endhighlight %}

在這service worker裏，`self` 指的是 `ServiceWorkerGlobalScope` 物件，也就是service worker。

**小貼士!**

在默認中，舊的service worker將會保持運行直到所有正在是用該service worker的網頁關閉。而新的service worker將會保持在`waiting`的狀態下。

當`skipWaiting()`被引用時(見以上的代碼),service worker將會跳過waiting(等待)狀態，並立即啟用新的service worker。

這能方便調試!

在 _chrome://serviceworker-internals_ 裏，點擊 **Inspect** 按鈕。你將會看到以下的情況:

<img src="images/image03.png" width="888" height="845" alt="Chrome DevTools console showing service worker instal and activate events" />

**警告**: 如果service worker中有任何錯誤,service worker將不會被安裝。
因此, 當Service worker正在安裝時，錯誤將會被運行。
當你更改代碼時，這可能導致你的service worker更新失敗。當你更改任何代碼，請檢查和驗證您的代碼.
