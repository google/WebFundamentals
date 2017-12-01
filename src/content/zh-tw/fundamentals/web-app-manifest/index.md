project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:網絡應用清單是一個 JSON 文件，您可以利用它控制在用戶想要看到本機應用的區域（例如設備主屏幕）中如何向用戶顯示網絡應用或網站，指示用戶可以啓動哪些功能，以及定義其在啓動時的外觀。

{# wf_updated_on: 2017-10-06 #}
{# wf_published_on:2016-02-11 #}

# 網絡應用清單 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

[網絡應用清單](https://developer.mozilla.org/en-US/docs/Web/Manifest)是一個 JSON 文件，您（即開發者）可以利用它控制在用戶想要看到應用的區域（例如移動設備主屏幕）中如何向用戶顯示網絡應用或網站，指示用戶可以啓動哪些功能，以及定義其在啓動時的外觀。

網絡應用清單提供了將網站書籤保存到設備主屏幕的功能。當網站以這種方式啓動時： 

* 它具有唯一的圖標和名稱，以便用戶將其與其他網站區分開來。
* 它會在下載資源或從緩存恢復資源時向用戶顯示某些信息。
* 它會向瀏覽器提供默認顯示特性，以避免網站資源可用時的過渡過於生硬。 

它通過一個文本文件中的元數據這一簡單機制完成所有這些工作。那就是網絡應用清單。

注：儘管您可以在任何網站上使用網絡應用清單，它們卻是 [Progressive Web App](/web/progressive-web-apps/) 的必備要素。

### TL;DR {: .hide-from-toc }
- 創建清單並將其鏈接到您的頁面，這是非常簡單的過程。
- 控制用戶從主屏幕啓動時看到的內容。
- 這包括啓動畫面、主題顏色以及打開的網址等。 

## 創建清單

在對網絡應用清單做詳細探究之前，讓我們先創建一個基本清單，然後爲其鏈接一個網頁。


不管您要什麼，都可以調用清單。大多數人使用 `manifest.json`。下面是一個示例：


    {
      "short_name": "AirHorner",
      "name": "Kinlan's AirHorner of Infamy",
      "icons": [
        {
          "src": "launcher-icon-1x.png",
          "type": "image/png",
          "sizes": "48x48"
        },
        {
          "src": "launcher-icon-2x.png",
          "type": "image/png",
          "sizes": "96x96"
        },
        {
          "src": "launcher-icon-4x.png",
          "type": "image/png",
          "sizes": "192x192"
        }
      ],
      "start_url": "index.html?launcher=true"
    }
    

確保包括以下內容： 

* 在用戶主屏幕上用作文本的 `short_name`。  
* 在網絡應用安裝橫幅中使用的 `name`。  
  

## 將清單的相關信息告知瀏覽器

在您創建清單且將清單添加到您的網站之後，將 `link` 標記添加到包含網絡應用的所有頁面上，如下所示：



    <link rel="manifest" href="/manifest.json">
  
## 設置啓動網址

如果您不提供 `start_url`，則將使用當前頁面，這不太可能是您的用戶想要的內容。
但這並不是將它包括在內的唯一原因。
由於您現在可以定義應用的啓動方式，因此可向 `start_url` 添加一個查詢字符串參數來說明其啓動方式。
 

    "start_url": "/?utm_source=homescreen"

這可以是您希望的任何內容；我們要使用的值的優點是對 Google Analytics 十分有意義。
 

## 自定義圖標

<figure class="attempt-right">
  <img src="images/homescreen-icon.png" alt="“添加到主屏幕”圖標">
  <figcaption>“添加到主屏幕”圖標</figcaption>
</figure>

 當用戶將您的網站添加到其主屏幕時，您可以定義一組供瀏覽器使用的圖標。您可以通過類型和大小定義它們，如下所示：

<div style="clear:both;"></div>

    "icons": [{
        "src": "images/touch/icon-128x128.png",
        "type": "image/png",
        "sizes": "128x128"
      }, {
        "src": "images/touch/apple-touch-icon.png",
        "type": "image/png",
        "sizes": "152x152"
      }, {
        "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
        "type": "image/png",
        "sizes": "144x144"
      }, {
        "src": "images/touch/chrome-touch-icon-192x192.png",
        "type": "image/png",
        "sizes": "192x192"
      }],
    

注：將圖標保存到主屏幕時，Chrome 首先尋找與顯示密度匹配並且尺寸調整到 48dp 屏幕密度的圖標。如果未找到任何圖標，則會查找與設備特性匹配度最高的圖標。無論出於任何原因，如果您想把目標明確鎖定在具有特定像素密度的圖標，可以使用帶數字參數的可選  <code>density</code> 成員。如果您不聲明密度，其默認值爲 1.0。這意味着“可將該圖標用於等於和大於 1.0 的屏幕密度”，而這通常就是您所需要的。

## 添加啓動畫面

<figure class="attempt-right">
  <img src="images/background-color.gif" alt="背景顏色">
  <figcaption>啓動屏幕的背景顏色</figcaption>
</figure>

當您從主屏幕啓動網絡應用時，幕後執行了若干操作：


1. Chrome 啓動。
2. 顯示頁面的渲染器啓動。
3. 您的網站從網絡（如果網站有服務工作線程，則從緩存）加載。

執行以上操作時，屏幕顯示爲白色並且看似已經停滯。如果您從網絡加載網頁時頁面需要花費不止一兩秒的時間才能讓首頁顯現任何內容，這種情況將變得尤爲明顯。



爲提供更優質的用戶體驗，您可以用標題、顏色和圖像來替換白色屏幕。 

### 設置圖像和標題

如果您從未落下課程進度，您已應完成了圖像和標題的設置。Chrome 會根據清單的特定成員推斷圖像和標題。此處的要點是瞭解詳情。 

啓動畫面圖像提取自 `icons` 數組。Chrome 爲設備選擇最接近 128dp 的圖像。標題是直接從 `name` 成員獲取的。

### 設置背景顏色 

利用適當命名的 `background_color` 屬性指定背景顏色。
Chrome 在網絡應用啓動後會立即使用此顏色，這一顏色將保留在屏幕上，直至網絡應用首次呈現爲止。


要設置背景顏色，請在您的清單中設置下列內容：


    "background_color": "#2196F3",
    

現在，從主屏幕啓動您的網站時將不會呈現白色屏幕。

該屬性的建議適用值是加載頁面的背景顏色。使用與加載頁面相同的顏色可實現從啓動畫面到首頁的平穩過渡。


### 設置主題顏色

使用 `theme_color` 屬性指定主題顏色。該屬性設置工具欄的顏色。
對此，我們還建議複製某種現有顏色，具體地講就是 `theme-color` `<meta>`。



## 設置啓動樣式

<figure class="attempt-right">
  <img src="images/manifest-display-options.png" alt="網絡應用支持">
  <figcaption>清單顯示選項</figcaption>
</figure>

利用網絡應用清單來控制顯示類型和頁面方向。

### 自定義顯示類型

您可以通過將 `display` 類型設置爲 `standalone`，讓您的網絡應用隱藏瀏覽器的 UI：


    "display": "standalone"
    

如果您認爲用戶喜歡在瀏覽器中像正常網站一樣查看您的網頁，您可以將 `display` 類型設置爲 `browser`：


    "display": "browser"
    
<div style="clear:both;"></div>

### 指定頁面的初始方向

<figure class="attempt-right">
  <img src="images/manifest-orientation-options.png" alt="網絡應用清單方向選項">
  <figcaption>網絡應用清單方向選項</figcaption>
</figure>

您可以強制一個特定方向，這對於某些應用很有用，例如只能在一個方向上運行的遊戲。
請有選擇地使用。
用戶更願意能夠自行選擇方向。


    "orientation": "landscape"

<div style="clear:both;"></div>
    

## 提供全站主題顏色

<figure class="attempt-right">
  <img src="images/theme-color.png" alt="背景顏色">
  <figcaption>主題顏色</figcaption>
</figure>

Chrome 在 2014 年爲您的網站引入了主題顏色這一概念。主題顏色是來自您的網頁的提示，用於告知瀏覽器使用什麼顏色來爲[地址欄等 UI 元素](/web/fundamentals/design-and-ux/browser-customization/)着色。

  

如果沒有清單，您需要在每個頁面上定義主題顏色，並且如果您擁有的是大型網站或舊版網站，進行大量全站更改並不可行。


<div style="clear:both;"></div>

向您的清單添加 `theme_color` 屬性後，從主屏幕啓動網站時，網域中的每個頁面都將自動獲得主題顏色。




    "theme_color": "#2196F3"
    

<figure>
  <img src="images/manifest-display-options.png" alt="背景顏色">
  <figcaption>全站主題顏色</figcaption>
</figure>

## 測試您的清單 {: #test }

如果您想要手動驗證網絡應用清單是否已正確設置，請使用 Chrome DevTools 的 **Application** 面板上的 **Manifest** 標籤。


![Chrome DevTools 的“Manifest”標籤](images/devtools-manifest.png)

此標籤提供了人類可讀版本的許多清單屬性。
請參閱 Chrome DevTools 文檔中的[網絡應用清單](/web/tools/chrome-devtools/progressive-web-apps#manifest)，瞭解有關此標籤的詳細信息。您還可以從此處模擬 Add to Homescreen 事件。
請參閱[測試應用安裝橫幅](/web/fundamentals/app-install-banners#test)，瞭解有關此主題的詳細信息。



如果您希望採取自動化方法來驗證自己的網絡應用清單，請參閱 [Lighthouse](/web/tools/lighthouse/)。
Lighthouse 是一個網絡應用審覈工具，您可以將其作爲 Chrome 擴展程序或 NPM 模塊運行。
您爲 Lighthouse 提供一個網址，它會對此頁面運行一套審覈，然後以報告形式顯示結果。與網絡應用清單相關 Lighthouse 審覈包括檢查以下內容：


* 應用是否可以添加到主屏幕。
* 添加後，應用是否以自定義啓動畫面啓動。
* 瀏覽器地址欄的顏色是否可自定義。
* 應用是否採用 HTTPS（Add to Homescreen 的先決條件）。

## 更多信息

這篇文章爲您簡要介紹了網絡應用清單，但還有更多信息需要了解。


* 如果您使用了網絡應用清單，可能還想設置一個[應用安裝橫幅](/web/fundamentals/app-install-banners)。
 

* Mozilla 開發者網絡上提供了網絡應用清單的[完整參考文檔](https://developer.mozilla.org/en-US/docs/Web/Manifest)。


* 如果您需要由創建網絡應用清單的工程師提供的功能說明，可以閱讀[實際 W3C 規範](http://www.w3.org/TR/appmanifest/){: .external }。


注：如果您將來更新 `manifest.json` 文件，用戶不會自動獲取這些更改，除非他們將您的應用重新添加到自己的主屏幕上。







{# wf_devsite_translation #}
