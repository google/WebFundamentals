project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:從 Windows、Mac 或 Linux 計算機遠程調試 Android 設備上的實時內容。

{# wf_updated_on:2016-12-09 #}
{# wf_published_on:2015-04-13 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

# 遠程調試 Android 設備使用入門 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

從 Windows、Mac 或 Linux 計算機遠程調試 Android 設備上的實時內容。
本教程將向您展示如何：

* 設置您的 Android 設備進行遠程調試，並從開發計算機上發現設備。
* 從您的開發計算機檢查和調試 Android 設備上的實時內容。
* 將 Android 設備上的內容抓屏到您的開發計算機上的 DevTools 實例中。


![遠程調試圖示](imgs/remote-debugging.png)

## 要求 {: #requirements }

* 開發計算機上已安裝 Chrome 32 或更高版本。
* 開發計算機上已安裝 [USB 驅動程序][drivers]（如果您使用 Windows）。
確保設備管理器報告正確的 USB 驅動程序
* 擁有一根可以將您的 Android 設備連接至開發計算機的 USB 電纜。
* Android 4.0 或更高版本。
* 您的 Android 設備上已安裝 Chrome（Android 版）。

[drivers]: https://developer.android.com/tools/extras/oem-usb.html

## 第 1 步：發現您的 Android 設備 {: #discover }

1. 在您的 Android 設備上，選擇 **Settings** > **Developer Options** > **Enable USB Debugging**。
在運行 Android 4.2 及更新版本的設備上，**Developer options** 默認情況下處於隱藏狀態。
請參閱[啓用設備上的開發者選項][android]以瞭解如何啓用它。


[android]: https://developer.android.com/studio/run/device.html#developer-device-options

1. 在您的開發計算機上打開 Chrome。您應使用您的一個 Google 帳戶登錄到 Chrome。
遠程調試在[隱身模式][incognito]或[訪客模式][guest]下無法運行。


[guest]: https://support.google.com/chrome/answer/6130773
[incognito]: https://support.google.com/chrome/answer/95464

1. [打開 DevTools](/web/tools/chrome-devtools/#open)。

1. 在 DevTools 中，點擊 **Main Menu** ![主菜單][main]{:.devtools-inline}，然後選擇 **More tools** > **Remote devices**。
 

     ![打開遠程設備抽屜式導航欄][open]

[main]: /web/tools/chrome-devtools/images/three-dot.png
[open]: /web/tools/chrome-devtools/remote-debugging/imgs/open-remote-devices.png

1. 在 DevTools 中，點擊 **Settings** 標籤（如果正在顯示另一個標籤）。

1. 確保已啓用 **Discover USB devices**。

     ![已啓用 Discover USB devices][discover]

[discover]: /web/tools/chrome-devtools/remote-debugging/imgs/discover-usb-devices.png

1. 使用一根 USB 電纜將 Android 設備直接連接到您的開發計算機。
請勿使用任何中間 USB 集線器。如果這是您首次將您的 Android 設備連接到此開發計算機，您的設備將顯示在 **Unknown** 中，其下面具有文本 **Pending Authorization**。




       ![未知的設備，待授權][unknown]

[unknown]: /web/tools/chrome-devtools/remote-debugging/imgs/unknown-device.png

1. 如果您的設備顯示爲 **Unknown**，則在 Android 設備上接受 **Allow USB Debugging** 權限提示。
**Unknown** 被替換爲您的 Android 設備的型號名稱。
綠色圓圈和 **Connected** 文本表示您已大功告成，可以從開發計算機遠程調試您的 Android 設備。


Note: 如果您在發現流程中遇到任何問題，您可以通過在 Android 設備上選擇 **Settings** > **Developer Options** > **Revoke USB Debugging Authorizations** 重啓該流程。



## 第 2 步：從您的開發計算機調試 Android 設備上的內容。 {: #debug }

1. 如果您尚未在 Android 設備上打開 Chrome，則現在打開它。

1. 返回 DevTools，點擊與設備的型號名稱匹配的標籤。
在此頁面的頂部，您會看到 Android 設備的型號名稱，後面緊跟着其序列號。
在型號名稱下面，您可以看到在設備上運行的 Chrome 的版本，版本號在括號裏。每個打開的 Chrome 標籤都會有自己的區域。您可以從此區域與該標籤交互。
如果有任何使用 WebView 的應用，您也會看到針對每個應用的區域。
下面的屏幕截圖沒有任何打開的標籤或 WebViews。


       ![連接的遠程設備][connected]

[connected]: /web/tools/chrome-devtools/remote-debugging/imgs/connected-remote-device.png

1. 在 **New tab** 旁輸入一個網址，然後點擊 **Open**。此頁面將在 Android 設備上的新標籤中打開。


1. 點擊您剛剛打開的網址旁的 **Inspect**。這將打開一個新的 DevTools 實例。
您的 Android 設備上運行的 Chrome 的版本決定在開發計算機上打開的 DevTools 的版本。因此，如果您的 Android 設備正在運行一個非常舊的 Chrome 版本，則 DevTools 實例看上去可能與您常用的實例有很大的差別。


### 更多操作：重新加載、聚焦或關閉一個標籤 {: #more-actions }

點擊您要重新加載、聚焦或關閉的標籤旁的 **More Options** ![更多選項][more]{:.devtools-inline}。


[more]: /web/tools/chrome-devtools/images/three-dot.png

![重新加載、聚焦或關閉一個標籤](imgs/reload.png)

### 檢查元素 {: #inspect }

轉到您的 DevTools 實例的 **Elements** 面板，將鼠標懸停在一個元素上以在 Android 設備的視口中突出顯示它。


您還可以在 Android 設備屏幕上點按一個元素，以在 **Elements** 面板中選中它。
點擊您的 DevTools 實例上的 **Select Element** ![Select
Element][select]{:.devtools-inline}，然後在您的 Android 設備屏幕上點按此元素。
請注意，**Select Element** 將在第一次觸摸後停用，因此，每次想要使用此功能時您都需要重新啓用它。



[select]: imgs/select-element.png

### Android 設備到開發計算機的抓屏 {: #screencast }

點按 **Toggle Screencast** ![Toggle Screencast][screencast]{:.devtools-inline} 以在您的 DevTools 實例中查看 Android 設備的內容。


[抓屏]: imgs/toggle-screencast.png

您可以通過多種方式與抓屏互動：

* 將點擊轉變爲點按，在設備上觸發適當的觸摸事件。 
* 將計算機上的按鍵發送至設備。 
* 要模擬雙指張合手勢，請按住 <kbd>Shift</kbd> 拖動。 
* 要滾動，請使用您的觸控板或鼠標滾輪，或者使用您的鼠標指針拋式滾動。


關於抓屏的一些注意事項：

* 抓屏僅顯示頁面內容。抓屏的透明部分表示設備界面，如 Chrome 多功能框、Android 狀態欄或 Android 鍵盤。
* 抓屏會對幀率產生負面影響。在測量滾動或動畫時停用抓屏，以更準確地瞭解頁面的性能。
* 如果您的 Android 設備屏幕鎖定，您的抓屏內容將消失。
將您的 Android 設備屏幕解鎖可自動恢復抓屏。


## 反饋 {: #feedback }

如果您想幫助我們改進此教程，請回答下面的問題！


{% framebox width="auto" height="auto" %}
<p>您是否已成功完成此教程？</p>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Completed / Yes">是</button>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Completed / No">否</button>
<p>此教程是否包含您在尋找的信息？</p>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Relevant / Yes">是</button>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Relevant / No">否</button>
{% endframebox %}


{# wf_devsite_translation #}
