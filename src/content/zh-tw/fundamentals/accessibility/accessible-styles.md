project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:使用合適的樣式化提升可訪問性


{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2016-10-04 #}

# 可訪問的樣式 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



我們已經瞭解了可訪問性的兩個關鍵方面（焦點和語義）。接下來，我們來看一下第三個方面，即樣式化。
樣式化主題廣，我們將分三部分介紹。


 - 爲焦點和各種 ARIA 狀態添加樣式，確保對元素進行樣式化以支持我們的可訪問性工作。
 - 賦予 UI 靈活的樣式，以便對它們進行放大來滿足無法看清小號文字的用戶的需求。
 - 選擇合適的顏色和對比度，避免僅通過顏色傳達信息。


## 對焦點進行樣式化

一般情況下，每次聚焦到一個元素時，我們都依靠瀏覽器內置的焦點環（CSS `outline` 屬性）對元素進行樣式化。
焦點環非常方便，沒有它，鍵盤用戶就無法分辨哪個元素具有焦點。
[WebAIM 檢查單](http://webaim.org/standards/wcag/checklist){: .external }提到了這一點，其中的表述爲“很容易就能看到哪個頁面元素具有當前鍵盤焦點（即，瀏覽頁面時，您可以看到自己所處的位置）。”





![帶焦點環的表單元素](imgs/focus-ring.png)

不過，焦點環有時看起來是歪曲的，或者不適合您的頁面設計。
一些開發者通過將元素的 `outline` 設爲 `0` 或 `none` 的方式完全移除此樣式。
但是，沒有了焦點指示器，鍵盤用戶怎樣才能知道他們正與哪個項目交互呢？


Warning: 切忌在不提供焦點替代項的情況下將 outline 設爲 0 或 none！

您可能對使用 CSS `:hover` *僞類*向控件添加懸停狀態比較熟悉。
例如，您可以對某個鏈接元素使用 `:hover`，在鼠標懸停到該元素上時更改其顏色或背景。
與 `:hover` 類似，您可以使用 `:focus` 僞類在某個元素具有焦點時將其鎖定。



    /* At a minimum you can add a focus style that matches your hover style */
    :hover, :focus {
      background: #c0ffee;
    }

解決移除焦點環後問題的一種替代方法是爲您的元素設置相同的懸停和焦點樣式，這樣可以解決鍵盤用戶“焦點在哪”的問題。照例，提升可訪問性體驗將提升每個人的體驗。


### 輸入形式

![帶焦點環的原生 HTML 按鈕](imgs/sign-up.png){: .attempt-right }

對於像 `button` 一樣的原生元素，瀏覽器可以檢測用戶交互是來自鼠標還是鍵盤按動，並且一般僅爲鍵盤交互顯示焦點環。例如，當您通過鼠標點擊原生 `button` 時，不會有焦點環，但是當您通過鍵盤跳轉到該元素時，將顯示焦點環。



其中的邏輯是，鼠標用戶需要焦點環的可能性較低，因爲他們知道自己點擊了哪個元素。
遺憾的是，目前還沒有一種跨瀏覽器解決方案可以產生相同的行爲。
因此，如果您爲任何元素設置 `:focus` 樣式，那麼當用戶點擊元素或者通過鍵盤使其具有焦點時，該樣式都會顯示。試着點擊下面這個假按鈕，您會注意到 `:focus` 樣式始終都會應用。


    <style>
      fake-button {
        display: inline-block;
        padding: 10px;
        border: 1px solid black;
        cursor: pointer;
        user-select: none;
      }

      fake-button:focus {
        outline: none;
        background: pink;
      }
    </style>
    <fake-button tabindex="0">Click Me!</fake-button>

{% framebox height="80px" %}
<style>
  fake-button {
    display: inline-block;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    user-select: none;
  }

  fake-button:focus {
    outline: none;
    background: pink;
  }
</style>
<fake-button tabindex="0">Click Me!</fake-button>
{% endframebox %}

這有點讓人覺得討厭，開發者因此經常使用 JavaScript 編寫自定義控件來幫助區分鼠標焦點和鍵盤焦點。



在 Firefox 中，您可以利用 `:-moz-focusring` CSS 僞類編寫一個僅在通過鍵盤操作使元素具有焦點時應用的焦點樣式，這一功能非常方便。儘管此僞類目前僅存在於 Firefox 中，[大家正在致力於使其成爲一項標準](https://github.com/wicg/modality){: .external }。



[Alice Boxhall 和 Brian Kardell 合作撰寫的這篇很棒的文章](https://www.oreilly.com/ideas/proposing-css-input-modality){: .external }也提到了輸入形式這一主題，並提供了用於區分鼠標輸入與鍵盤輸入的原型代碼。您可以立即使用他們的解決方法，然後在焦點環僞類獲得更廣泛支持後再行添加這一功能。



## 使用 ARIA 對狀態進行樣式化

構建組件時，常見的做法是使用由 JavaScript 控制的 CSS 類反映組件的狀態，進而反映其外觀。


例如，假設一個切換按鈕在用戶點擊後會進入“按下”視覺狀態，並一直保持該狀態，直至用戶再次點擊。
要對該狀態進行樣式化，您的 JavaScript 可以向按鈕添加一個 `pressed` 類。
另外，由於希望所有控件均具有良好的語義，您還需要將按鈕的 `aria-pressed` 狀態設爲 `true`。



在這裏可以使用的一種有用技巧是，完全移除該類，然後僅使用 ARIA 屬性對元素進行樣式化。
現在，您可以爲按鈕的按下狀態更新 CSS 選擇器，從



    .toggle.pressed { ... }


更新爲


    .toggle[aria-pressed="true"] { ... }


這樣將在 ARIA 狀態與元素外觀之間同時創建邏輯關係和語義關係，同時還能縮減額外的代碼。


## 多設備自適應設計

我們知道自適應設計是一種不錯的方法，可以提供最佳的多設備體驗，而且自適應設計也可以提升可訪問性。



假設存在一個像 [Udacity.com](https://www.udacity.com/courses/all) 一樣的網站：

![100% 放大下的 Udacity.com](imgs/udacity.jpg)

對於閱讀小號印刷字體存在困難的視力較弱的用戶來說，他們可能會放大頁面，最高可能會放大到 400%。
由於網站採用自適應設計，UI 將針對“較小視口”（實際上是較大頁面）自動重排，這一特性非常適合需要放大屏幕的桌面用戶和移動設備屏幕閱讀器用戶。這是一種雙贏的方式。下面是相同頁面放大到 400% 的效果：


![400% 放大下的 Udacity.com](imgs/udacity-zoomed.jpg)

事實上，僅僅通過自適應設計，我們就可以滿足 [WebAIM 檢查單第 1.4.4 條規則](http://webaim.org/standards/wcag/checklist#sc1.4.4){: .external }的要求，其表述爲頁面“...應在文本大小加倍的情況下便於閱讀和正常發揮作用。”




詳細介紹自適應設計不在本指南的範圍之內，以下幾條建議有助於您實現自適應設計並讓用戶更方便地訪問您的內容。



 - 首先，確保始終使用正確的 `viewport` 元標記。<br>
   `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
   <br>設置 `width=device-width` 將匹配屏幕寬度（以設備無關像素爲單位），設置 `initial-scale=1` 將在 CSS 像素與設備無關像素之間建立 1:1 的關係。這樣，瀏覽器會將您的內容調整爲適合屏幕尺寸，用戶看到的不會是一堆揉在一起的文本。



![帶和不帶視口元標記的電話顯示](imgs/scrunched-up.jpg)

Warning: 使用視口元標記時，切忌設置 maximum-scale=1 或設置 user-scaleable=no。讓用戶根據他們自己的需求縮放。


 - 另一個需要記住的技巧是使用自適應網格進行設計。正如您在 Udacity 網站的示例中看到的，使用網格進行設計意味着您的內容會在頁面更改大小時自動重排。這種佈局一般使用百分比、em 或 rem 之類的相對單位生成，而非使用硬編碼像素值。使用相對單位的優勢是文本和內容可以放大，並將其他項目擠到頁面下方。因此，DOM 順序和閱讀順序保持不變，即使佈局因爲放大而發生變化亦是如此。


 - 另外，請考慮爲文本大小之類的項目使用諸如 `em` 或 `rem` 的相對單位，而非像素值。一些瀏覽器支持僅根據用戶偏好調整文本大小，如果您爲文本使用像素值，此設置不會影響您的副本。不過，如果您完全使用相對單位，網站副本將更新以反映用戶偏好。


 - 最後，如果您的設計在移動設備上顯示，您還應確保按鈕或鏈接之類的交互式元素足夠大，並在其周圍留出足夠的空間，使其便於按下，而不會意外重疊到其他元素上。這不僅會讓所有用戶受益，更會爲行動不便的人帶來極大幫助。


對於正確設置移動視口的網站，建議的最小觸摸目標大小約爲 48 個設備無關像素。
例如，儘管一個圖標的寬度和高度僅爲 24px，您仍然可以使用額外邊距將點按目標大小增加到 48px。48x48 像素的面積約爲 9mm 見方，與一個人手指墊的面積大小相當。


![顯示一對 48 像素觸摸目標的圖片](imgs/touch-target.jpg)

不同觸摸目標之間在水平和垂直方向上還應留出大約 8 像素的間隔，以便用戶手指按下一個點按目標不會意外觸摸另一個點按目標。



## 顏色和對比度

如果您的視力很好，您會很自然地假設每個人都能辨識顏色，在文本易讀性方面也是如此 &mdash; 但事實不是這樣。我們來看一下如何有效使用顏色和對比度創建便於每個人訪問的舒適設計。




正如您想象的一樣，一些便於某些人閱讀的顏色組合可能會讓其他人閱讀起來非常困難或者令其根本無法閱讀。
這通常歸結爲*顏色對比度*，即前景色與背景色*亮度*之間的關係。如果顏色類似，對比度比率低；如果顏色不同，對比度比率高。


[WebAIM 指導原則](http://webaim.org/standards/wcag/){: .external } 建議爲所有文本使用 4.5:1 的 AA（最低）對比度比率。
非常大的文本（比默認正文文本大 120-150%）是一個例外，此類文本的對比度比例可以降低至 3:1。請注意下面所示對比度比率的不同。




![各種對比度比率的比較](imgs/contrast-ratios.jpg)

之所以爲級別 AA 選擇 4.5:1 的對比度比率是因爲，此比率可以補償視力降低至大約 20/40 水平的用戶在一般情況下的對比度靈敏度損失。20/40 是 80 歲左右老年人的典型視敏度。
對於存在視力障礙或色覺缺陷的用戶，我們可以將正文文本的對比度增大至 7:1。


您可以使用適合 Chrome 的 [Accessibility DevTools 擴展程序](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb){: .external }確定對比度比率。使用 Chrome DevTools 的一個優勢是它們可以爲您當前的顏色建議 AA 和 AAA（增強）替代值，您可以點擊值來預覽它們在應用中的顯示效果。



要審覈顏色/對比度，請按下面這些基本步驟操作。

 1. 安裝擴展程序後，點擊 `Audits`
 1. 取消選中除 `Accessibility` 之外的任何選項
 1. 點擊 `Audit Present State`
 1. 記住任何對比度警告

![devtools 對比度審覈對話框](imgs/contrast-audit.png)

WebAIM 也提供了一個方便的[顏色對比度檢查器](http://webaim.org/resources/contrastchecker/){: .external }，您可以用它來查看任何顏色對的對比度。



### 不要僅通過顏色傳達信息

大約 3.2 億位用戶存在色覺障礙。大約十二分之一的男性和二百分之一的女性患有某種形式的“色盲”；也就是說，大約二十分之一（或 5%）的用戶在訪問您的網站時無法獲得您預想的體驗。如果我們依賴顏色傳達信息，我們會將這一數字推高至無法接受的水平。





Note: 術語“色盲”經常用於描述一種視覺條件，在此條件下，患者在區分顏色方面存在困難。事實上，很多人都是色盲。存在色覺障礙的大多數人都能看到一些或大多數顏色，但是無法準確區分具體顏色，例如紅色和綠色（最常見）、棕色和橙色，以及藍色和紫色。



例如，在輸入表單中，電話號碼可能帶有紅色下劃線，表示無效。
但是對於色覺異常人士或屏幕閱讀器用戶來說，該信息即使可以傳達，也談不上準確。
因此，您應始終爲用戶提供多種途徑來獲取關鍵信息。


![使用紅色下劃線指示錯誤的輸入表單](imgs/input-form1.png)

[WebAIM 檢查單第 1.4.1 部分的表述](http://webaim.org/standards/wcag/checklist#sc1.4.1){: .external } 爲“不應將顏色作爲傳達內容或區分可視元素的唯一方法。”該部分還提到“不應僅使用顏色區分文本週圍的鏈接”，除非鏈接滿足特定的對比度要求。檢查單建議（使用 CSS `text-decoration` 屬性）添加一個額外的指示器（例如下劃線）來指示鏈接何時處於活動狀態。



一種可以修復上個示例所遇問題的簡單方式是，向字段添加一條額外的消息，指示電話號碼無效並說明原因。


![使用錯誤消息闡釋原因的輸入表單](imgs/input-form2.png)

構建應用時，請謹記這些事項並留意那些您過於依賴顏色來傳達重要信息的區域。



如果您對網站向不同用戶顯示的外觀比較好奇，或者在 UI 中嚴重依賴顏色的使用，您可以使用 [NoCoffee Chrome 擴展程序](https://chrome.google.com/webstore/detail/nocoffee/jjeeggmbnhckmgdhmgdckeigabjfbddl){: .external } 來模擬各種視覺障礙，包括不同類型的色盲。





### 高對比度模式

高對比度模式讓用戶可以顛倒前景色和背景色，這樣做經常有助於突出顯示文本。
對於視力較弱的人，高對比度模式可以讓在頁面上瀏覽內容變得更加簡單。可以通過多種方式在您的機器上設置高對比度。

對於像 Mac OSX 和 Windows 一樣的操作系統，可以在系統級別爲任何操作啓用其提供的高對比度模式。
此外，用戶也可以安裝擴展程序（例如 [Chrome High Contrast 擴展程序](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph){: .external }，僅在特定應用中啓用高對比度。




一種比較好的做法是開啓高對比度設置，並驗證應用中的所有 UI 是否仍然可見和可以使用。


例如，導航欄可以使用細微的背景色來指示哪個頁面當前處於選中狀態。
如果您在高對比度擴展程序中查看，該細微差異完全消失，隨之而來的是用戶也無法瞭解哪個頁面處於活動狀態。



![處於高對比度模式下的導航欄](imgs/tab-contrast.png)

類似地，對於上一部分中的示例，無效電話號碼字段上的紅色下劃線可能以不容易區分的藍-綠顏色顯示。



![帶錯誤字段並處於高對比度模式下的表單](imgs/high-contrast.jpg)

如果您滿足上面幾部分介紹的對比度比率要求，那麼在對高對比度模式的支持方面，效果也應不錯。
但是爲了更加保險，不妨安裝 Chrome High Contrast 擴展程序並大致檢查一下您的頁面，瞭解一切是否按預期工作和顯示。





{# wf_devsite_translation #}
