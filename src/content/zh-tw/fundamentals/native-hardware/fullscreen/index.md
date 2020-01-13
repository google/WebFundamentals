project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:進入全屏模式。

{# wf_updated_on: 2017-10-06 #}
{# wf_published_on:2016-10-01 #}

# 打造全屏體驗 {: .page-title }

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="ZRqr5x73-ng"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

我們有能力輕鬆打造出沉浸式全屏網站和應用，而就像網絡上的所有事物一樣，可以通過幾種方式來實現。這在時下顯得尤爲重要，因爲已有更多瀏覽器支持一種全屏啓動的“安裝型網絡應用”體驗。




<div class="clearfix"></div>

## 讓應用或網站進入全屏模式

用戶或開發者可通過幾種方法讓網絡應用進入全屏模式。

* 作爲對用戶手勢的響應請求瀏覽器進入全屏模式。
* 將應用安裝到主屏幕。
* 弄虛作假：自動隱藏地址欄。

### 作爲對用戶手勢的響應請求瀏覽器進入全屏模式

<a href="http://caniuse.com/#feat=fullscreen">並非所有平臺都相同</a>。iOS Safari 沒有全屏 API，但 Chrome（Android 版）、Firefox 和 IE 11+ 上則有相應的 API。您構建的大多數應用都是組合使用全屏規範提供的 JS API 和 CSS 選擇器。
您在打造全屏體驗時需要在意的主要 JS API 如下：


* `element.requestFullscreen()`（目前在 Chrome、Firefox 和 IE 中添加前綴）：以全屏模式顯示元素。

* `document.exitFullscreen()`（目前在 Chrome、Firefox 和 IE 中添加前綴。
  Firefox 改用 `cancelFullScreen()`）：取消全屏模式。
* `document.fullscreenElement`（目前在 Chrome、Firefox 和 IE 中添加前綴）：如有任何元素處於全屏模式，返回 true。


Note: 您會注意到，在添加前綴的版本中，屏幕中“S”的大小寫處理存在大量不一致的情況。
這很不雅觀，但也正是實行中規範存在的問題。


應用進入全屏模式時，無法再使用瀏覽器的 UI 控件。
這會改變用戶與所提供體驗的交互方式。
全屏模式下的瀏覽器沒有 Forwards 和 Backwards 這樣的標準導航控件，也沒有 Refresh 按鈕這樣的出路。
必須迎合這種情境。
當瀏覽器進入全屏模式時，可以利用某些 CSS 選擇器來幫助您改變網站的樣式和呈現方式。



    <button id="goFS">Go fullscreen</button>
    <script>
      var goFS = document.getElementById("goFS");
      goFS.addEventListener("click", function() {
          document.body.requestFullscreen();
      }, false);
    </script>

上例有點人爲的痕跡；我將供應商前綴使用方面的複雜性全都隱藏了起來。


Note: 該死的供應商前綴！

實際代碼要複雜得多。<a
href="https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode">Mozilla 創建了</a>一個非常有用的腳本，您可以用它來切換全屏。
如您所見，與指定 API 相比，供應商前綴的情況更爲複雜和繁瑣。即便是以下略加簡化的代碼，看上去仍顯複雜。


    function toggleFullScreen() {
      var doc = window.document;
      var docEl = doc.documentElement;

      var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

      if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
      }
      else {
        cancelFullScreen.call(doc);
      }
    }

我們這些網絡開發者痛恨複雜性。您可以使用的一個不錯的高級抽象 API 是 <a href="http://sindresorhus.com/screenfull.js"/>Sindre Sorhus 的</a> <ahref="https://github.com/sindresorhus/screenfull.js">Screenfull.js</a> 模塊，該模塊將兩個略有不同的 JS API 和供應商前綴統一成一個一致的 API。





#### Fullscreen API 溫馨提示

##### 讓文檔進入全屏模式

<figure class="attempt-right" style="max-width: 320px;">
  <img src="images/body.png">
  <figcaption>圖 1：讓 body 元素進入全屏模式。</figcaption>
</figure>


讓 body 元素進入全屏模式是很自然的想法，但如果使用的是基於 WebKit 或 Blink 的渲染引擎，就會發現這會產生一種怪異的效果：將正文寬度縮減到能夠容納所有內容的最小尺寸。（Mozilla Gecko 不存在這個問題。）

<div class="clearfix"></div>

<figure class="attempt-right" style="max-width: 320px;">
<img src="images/document.png" >
<figcaption>圖 2：讓 document 元素進入全屏模式。</figcaption>
</figure>

要修復此問題，請使用 document 元素替代 body 元素：

    document.documentElement.requestFullscreen();



<div class="clearfix"></div>


##### 讓 video 元素進入全屏模式

讓 video 元素進入全屏模式與讓任何其他元素進入全屏模式的方法完全相同。
只需調用 video 元素上的 `requestFullscreen` 方法。


    <video id=videoElement></video>
    <button id="goFS">Go Fullscreen</button>
    <script>
      var goFS = document.getElementById("goFS");
      goFS.addEventListener("click", function() {
          var videoElement = document.getElementById("videoElement");
          videoElement.requestFullscreen();
      }, false);
    </script>

如果 `<video>` 元素未定義控件屬性，視頻進入全屏模式後用戶將無法對其進行控制。
建議的對策是使用一個初級容器，將視頻和您希望用戶看到的控件包裝在這個容器內。



    <div id="container">
      <video></video>
      <div>
        <button>Play</button>
        <button>Stop</button>
        <button id="goFS">Go fullscreen</button>
      </div>
    </div>
    <script>
      var goFS = document.getElementById("goFS");
      goFS.addEventListener("click", function() {
          var container = document.getElementById("container");
          container.requestFullscreen();
      }, false);
    </script>

這可以大幅提高靈活性，因爲您可以將 container 對象與 CSS 僞選擇器合併（例如，達到隱藏“goFS”按鈕的目的）。


    <style>
      #goFS:-webkit-full-screen #goFS {
        display: none;
      }
      #goFS:-moz-full-screen #goFS {
        display: none;
      }
      #goFS:-ms-fullscreen #goFS {
        display: none;
      }
      #goFS:fullscreen #goFS {
        display: none;
      }
    </style>

按照這些模式，可以在檢測到全屏模式處於運行狀態時對用戶界面作出相應調整，例如：


* 提供一個返回開始頁面的鏈接
* 提供一種關閉對話框或回退的機制


### 從主屏幕以全屏模式啓動頁面

無法實現在用戶導航到網頁時啓動全屏模式。瀏覽器供應商深知在每次頁面加載時都提供全屏體驗很令人討厭，因此會要求用戶通過手勢進入全屏模式。但供應商也的確允許用戶“安裝”應用，安裝行爲是向操作系統發出的一個信號，表示用戶想在平臺上以應用的形式啓動網頁。






如下所述，在各主流移動平臺上，使用元標記或清單文件實現起來相當簡便。


#### iOS

自從 iPhone 發佈以來，用戶就一直能將網絡應用安裝到主屏幕，並以全屏模式啓動。


    <meta name="apple-mobile-web-app-capable" content="yes">

> 如果 content 設置爲 yes，則網絡應用以全屏模式運行；> 否則，不以全屏模式運行。
默認行爲是使用 Safari 顯示網絡 > 內容。
可以 > 利用 window.navigator.standalone 只讀布爾值 JavaScript 屬性 > 確定網頁是否以全屏模式顯示。<a href="https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html">Apple</a>



#### Chrome（Android 版）

Chrome 團隊近期實現的一項功能可在用戶已將頁面添加到主屏幕的情況下指示瀏覽器以全屏模式啓動頁面。
這與 iOS Safari 模式類似。


    <meta name="mobile-web-app-capable" content="yes">

> 可以利用 Chrome（Android 版）的“Add to Home screen”菜單項 > 將網絡應用設置爲將應用快捷方式圖標添加到 > 設備的主屏幕，讓應用以全屏“應用模式”啓動。>  <a href="https://developers.chrome.com/multidevice/android/installtohomescreen">Google Chrome</a>




更好的選擇是使用網絡應用清單。

#### 網絡應用清單（Chrome、Opera、Firefox、Samsung）

[網絡應用清單](/web/fundamentals/web-app-manifest)是一個簡單的 JSON 文件，使您（開發者）能夠控制在用戶可能看到應用的區域（例如手機主屏幕）中如何向用戶顯示應用，指示用戶可以啓動哪些功能，更重要的是說明啓動方法。未來，清單將讓您對應用進行更多控制，但現在我們只側重於如何啓動應用。

具體而言：

1. 將清單的相關信息告知瀏覽器
2. 說明啓動方法

在創建清單並託管在網站上之後，只需要從所有包含應用的頁面添加一個下面這樣的 link 標記：


    <link rel="manifest" href="/manifest.json">

Chrome（Android 版）從 38 版（2014 年 10 月）起就已支持清單，讓您能夠控制當網絡應用安裝到主屏幕時的顯示方式（通過 `short_name`、`name` 和 `icons` 屬性），以及當用戶點擊啓動圖標時應以何種方式啓動應用（通過 `start_url`、`display` 和 `orientation`）。





清單示例如下所示。其中並未詳盡展示清單可能包含的內容。


    {
      "short_name": "Kinlan's Amaze App",
      "name": "Kinlan's Amazing Application ++",
      "icons": [
        {
          "src": "launcher-icon-4x.png",
          "sizes": "192x192",
          "type": "image/png"
        }
      ],
      "start_url": "/index.html",
      "display": "standalone",
      "orientation": "landscape"
    }

此功能是完全漸進式的功能，可通過它爲支持該功能的瀏覽器用戶打造更好、集成度更高的體驗。


當用戶將網站或應用添加到主屏幕時，其意圖是將它當作應用對待。
這意味着，您的目標應該是將用戶導向應用的功能而不是產品着陸頁。
例如，如果用戶需要登錄應用，那麼它就是適合啓動的頁面。



##### 實用程序應用

大多數實用程序應用都將立即受益於清單。對於您可能希望像移動平臺上的所有其他應用一樣獨立啓動的應用，要指示應用獨立啓動，請向網絡應用清單添加以下內容：


    "display": "standalone"

##### 遊戲

大多數遊戲都將立即受益於清單。絕大多數遊戲都希望強制按特定屏幕方向以全屏模式啓動。



如果您開發的是縱向滾動遊戲或 Flappy Birds 之類的遊戲，那麼您很可能希望遊戲始終以縱向模式顯示。


    "display": "fullscreen",
    "orientation": "portrait"

如果與之相反，您開發的是益智遊戲或 X-Com 之類的遊戲，那麼您多半希望遊戲始終採用橫向屏幕方向。


    "display": "fullscreen",
    "orientation": "landscape"

##### 新聞網站

在大多數情況下，新聞網站提供純粹的內容型體驗。可以預見的是，大多數開發者不會想到爲新聞網站添加清單。
可以通過清單定義啓動項（新聞網站的頭版）和啓動方式（全屏或正常瀏覽器標籤形式）。



是否選擇使用清單取決於您以及您認爲用戶喜歡以何種方式訪問您提供的體驗。
如果希望網站具有您認爲應該具有的所有瀏覽器配色，可以將 display 設置爲 `browser`。


    "display": "browser"

如果希望新聞網站像大多數新聞中心型應用一樣提供應用般的體驗並從 UI 中移除所有網站式配色，可以通過將 display 設置爲 `standalone` 來實現。



    "display": "standalone"

### 弄虛作假：自動隱藏地址欄

可通過像下面這樣自動隱藏地址欄來“僞造全屏模式”：

    window.scrollTo(0,1);

Note: 是朋友我才告訴你。辦法有是有，雖然有效，卻並非正途。
還是不要使用爲好。&mdash; Paul

這是個相當簡單的方法，頁面加載時系統會指示瀏覽器地址欄讓開。
遺憾的是，這種方法並未標準化，也未得到充分支持。
此外還必須解決大量兼容性問題。

例如，當用戶導航返回時，瀏覽器往往會在頁面上將地址欄恢復原位。
如果使用 `window.scrollTo` 進行替換，會給用戶造成妨礙。
要想解決此問題，需要將最後位置存儲在 localStorage 中，並處理邊緣情況（例如，當用戶在多個窗口中打開該頁面時）。



## 用戶體驗指導原則

當您構建可充分利用全屏模式的網站時，需要注意若干潛在的用戶體驗變化，才能打造出得到用戶喜愛的服務。



### 不要依賴導航控件

iOS 沒有硬件返回按鈕或刷新手勢。因此，必須確保用戶能在應用內四處導航而不被鎖入。


在所有主流平臺上都可以輕鬆檢測到您是在全屏模式還是安裝模式下運行。


#### iOS

在 iOS 上，可以利用 `navigator.standalone` 布爾值來確認用戶是否是從主屏幕啓動的。


    if(navigator.standalone == true) {
      // My app is installed and therefore fullscreen
    }

#### 網絡應用清單（Chrome、Opera、Samsung）

以安裝應用形式啓動時，Chrome 並非運行在真正的全屏體驗下，因此 `document.fullscreenElement` 返回 null，並且 CSS 選擇器不起作用。



當用戶通過在網站上使用手勢來請求全屏時，有標準 Fullscreen API 可以使用，其中包括下面這樣可調整 UI 來響應全屏狀態的 CSS 僞選擇器



    selector:-webkit-full-screen {
      display: block; // displays the element only when in fullscreen
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

如果用戶從主屏幕啓動網站，`display-mode` 媒體查詢將按照網絡應用清單中的定義進行設置。
在純粹全屏的情況下，其內容將是：


    @media (display-mode: fullscreen) {

    }

如果用戶以獨立模式啓動應用，`display-mode` 媒體查詢將是 `standalone`：


    @media (display-mode: standalone) {

    }


#### Firefox

當用戶通過網站請求全屏，或者用戶以全屏模式啓動應用時，所有標準 Fullscreen API 都可使用，其中包括下面這樣可調整 UI 來響應全屏狀態的 CSS 僞選擇器：




    selector:-moz-full-screen {
      display: block; // hides the element when not in fullscreen mode
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

#### Internet Explorer

在 IE 中，CSS 僞類缺少連字符，但在其他方面的作用與 Chrome 和 Firefox 類似。


    selector:-ms-fullscreen {
      display: block;
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

#### 規範

規範中的拼寫匹配 IE 使用的語法。

    selector:fullscreen {
      display: block;
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

### 保持用戶的全屏體驗

有時 Fullscreen API 可能有點吹毛求疵。瀏覽器供應商不想把用戶鎖定在全屏頁面中，因此他們開發了相應的機制，只要滿足條件，便可立即擺脫全屏模式。

這意味着您無法讓構建的全屏網站跨越多個頁面，這是因爲：


* 利用 ‘window.location =  "http://example.com"` 以編程方式更改網址會擺脫全屏模式。
* 用戶點擊頁面內的外部鏈接時將會退出全屏模式。
* 通過 `navigator.pushState` API 更改網址也會擺脫全屏體驗。


如果想保持用戶的全屏體驗，可以採用以下這兩個方案：

1. 利用可安裝網絡應用機制進入全屏模式。
2. 利用 # 片段管理 UI 和應用狀態。

通過使用 #syntax 更新網址 (window.location = "#somestate") 以及偵聽 `window.onhashchange` 事件，可以利用瀏覽器自身的歷史堆棧管理應用狀態變化，允許用戶使用其硬件返回按鈕，或者利用如下 history API 提供簡單的編程返回按鈕體驗：





    window.history.go(-1);

### 讓用戶選擇進入全屏模式的時機

沒有什麼比網站的意外行爲更讓用戶惱火。
當用戶導航到網站時，不要試圖誘騙他們進入全屏模式。


不要截取第一個觸摸事件並調用 `requestFullscreen()`。

1. 這很令人討厭。
2. 瀏覽器可能決定在未來的某個時間點就允許應用佔據全屏提示用戶。


如果想以全屏模式啓動應用，可以考慮採用各平臺的安裝體驗。


### 不要濫發信息騷擾用戶，讓他們將應用安裝到主屏幕

如果計劃通過安裝應用機制提供全屏體驗，請爲用戶着想。


* 謹慎小心。利用橫幅或頁腳告知用戶他們可以安裝應用。

* 如果他們關閉了提示，不要再次顯示。
* 用戶首次訪問時，除非他們對您的服務感到滿意，否則可能並不想安裝應用。可以考慮在用戶與網站的交互產生了積極印象後再提示他們安裝。

* 如果用戶經常訪問網站卻沒有安裝應用，那麼他們未來也不太可能安裝應用。不要不斷地濫發信息騷擾用戶。

##  結論

儘管我們尚未開發出完全標準化並且全面實現的 API，但利用這篇文章中提供的指引，無論使用什麼客戶端，您都可以輕鬆地打造出充分利用用戶整個屏幕的體驗。




{# wf_devsite_translation #}
