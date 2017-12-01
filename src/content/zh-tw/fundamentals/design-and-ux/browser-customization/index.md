project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:現代瀏覽器讓您能夠輕鬆地定製特定組件，如圖標、地址欄顏色，甚至允許添加自定義磁貼等對象。這些簡單的改進可提升吸引力，吸引用戶再次訪問您的網站。


{# wf_updated_on: 2015-09-21 #}
{# wf_published_on: 2015-09-21 #}

# 圖標和瀏覽器顏色 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

現代瀏覽器讓您能夠輕鬆地定製特定組件，如圖標、地址欄顏色，甚至允許添加自定義磁貼等對象。這些簡單的改進可提升吸引力，吸引用戶再次訪問您的網站。


## 提供出色的圖標和磁貼 

當用戶訪問您的網頁時，瀏覽器會嘗試從 HTML 提取圖標。圖標可能出現在許多地方，包括瀏覽器標籤、最近的應用切換、新的（或最近訪問的）標籤頁面等。

提供高質量的圖像將使您的網站更具辨識度，讓用戶更容易發現您的網站。
 

爲充分支持所有瀏覽器，您需要向每個頁面的 `<head>` 元素添加幾個標記。



    <!-- icon in the highest resolution we need it for -->
    <link rel="icon" sizes="192x192" href="icon.png">
    
    <!-- reuse same icon for Safari -->
    <link rel="apple-touch-icon" href="ios-icon.png">
    
    <!-- multiple icons for IE -->
    <meta name="msapplication-square310x310logo" content="icon_largetile.png">
    

### Chrome 和 Opera

Chrome 和 Opera 均使用 `icon.png`，圖標將被縮放到設備所需的大小。
爲防止自動縮放，您還可以通過指定 `sizes` 屬性另外提供尺寸。



注：圖標大小應基於 48px，例如 48px、96px、144px 和 192px

### Safari

Safari 還使用帶有 `rel` 屬性的 `<link>` 標記：`apple-touch-icon`。

您可以指定[顯式尺寸](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27)，即爲每個圖標提供單獨的鏈接標記，防止操作系統調整圖標的大小：




    <link rel="apple-touch-icon" href="touch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
    

### Internet Explorer 和 Windows Phone

Windows 8 的新主屏幕體驗可支持 4 種不同固定網站佈局，因此需要 4 個圖標。
如果您不想支持特定尺寸，則可以省去相關的元標記。



    <meta name="msapplication-square70x70logo" content="icon_smalltile.png">
    <meta name="msapplication-square150x150logo" content="icon_mediumtile.png">
    <meta name="msapplication-wide310x150logo" content="icon_widetile.png">
    

### Internet Explorer 中的磁貼

Microsoft 的“固定網站”及其旋轉的“動態磁貼”遠遠超越了其他實現方法，不在本指南的介紹範圍內。
您可以在 MSDN 的[如何創建動態磁貼](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx)中瞭解更多信息。




## 定義瀏覽器元素的顏色

使用不同的 `meta` 元素，您可以自定義瀏覽器，甚至自定義平臺的元素。
請謹記，某些元素只能在特定平臺或瀏覽器上使用，但是它們可以大大增強體驗。
 

Chrome、Firefox OS、Safari、Internet Explorer 和 Opera Coast 允許您使用元標記來定義瀏覽器元素的顏色，甚至定義平臺的顏色。


### Chrome 和 Opera 的元主題背景色

要指定 Android 版 Chrome 的主題背景色，請使用元主題背景色。

    <!-- Chrome, Firefox OS and Opera -->
    <meta name="theme-color" content="#4285f4">
    

<img src="imgs/theme-color.png" alt="在 Chrome 中定製地址欄的主題顏色">

### Safari 特定的樣式

Safari 允許您設置狀態欄樣式和指定啓動圖像。

#### 指定啓動圖像

默認情況下，Safari 在加載過程中顯示空白屏幕，在多次加載之後會顯示應用之前狀態的屏幕截圖。
要避免出現這種情況，您可以通過 `rel=apple-touch-startup-image` 添加一個鏈接標記，讓 Safari 顯示獨特的啓動圖像。

例如：


    <link rel="apple-touch-startup-image" href="icon.png">
    

圖像必須爲目標設備屏幕的特定尺寸，否則不會被使用。
請參考 [Safari 網頁內容指南](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)瞭解更多詳情。



儘管 Apple 的文檔缺少此主題的內容，但開發者社區已想出一種針對所有設備的辦法：使用高級媒體查詢來選擇相應的設備，然後指定正確的圖像。以下是一個可行的解決方法，此方法由 [tfausak 的 gist](//gist.github.com/tfausak/2222823) 提供


#### 更改狀態欄的外觀

您可以將默認狀態欄的外觀更改爲 `black` 或 `black-translucent`。
通過 `black-translucent`，狀態欄浮在全屏內容的頂層，而不是將內容向下推。
這樣使佈局有更大高度，但有點遮擋頂層。
以下是所需的代碼：


    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
<div class="attempt-left">
  <figure>
    <img src="imgs/status-bar-translucent.png" srcset="imgs/status-bar-translucent.png 1x, imgs/status-bar-translucent-2x.png 2x" alt="black-translucent">
    <figcaption>使用  <code>black-translucent</code> 的屏幕截圖</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/status-bar-black.png" srcset="imgs/status-bar-black.png 1x, imgs/status-bar-black-2x.png 2x" alt="black-black">
    <figcaption>使用  <code>black</code> 的屏幕截圖</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>




{# wf_devsite_translation #}
