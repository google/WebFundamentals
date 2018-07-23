project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:您的任務不只侷限於確保網站在 Chrome 和 Android 上出色運行。即使 Device Mode 可以模擬 iPhone 等多種其他設備，我們仍鼓勵您查看其他瀏覽器模擬解決方案。

{# wf_updated_on:2018-07-23 #}
{# wf_published_on:2015-04-13 #}

# 模擬和測試其他瀏覽器 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

您的任務不只侷限於確保網站在 Chrome 和 Android 上出色運行。即使 Device Mode 可以模擬 iPhone 等多種其他設備，我們仍鼓勵您查看其他瀏覽器模擬解決方案。


### TL;DR {: .hide-from-toc }
- 如果您沒有特定設備，或者想要執行抽檢，最佳方式就是直接在瀏覽器中模擬設備。
- 利用設備模擬器，您可以從工作站在一系列設備上模擬開發網站。
- 基於雲的模擬器讓您可以在不同平臺之間對網站進行自動化單元測試。"


## 瀏覽器模擬器

瀏覽器模擬器非常適合於測試網站的自適應能力，但它們無法模擬 API 差異、CSS 支持，以及您可以在移動設備瀏覽器中看到的某些行爲。在真實設備運行的瀏覽器上測試您的網站，確保一切均按照預期運行。


### Firefox 的自適應設計視圖

Firefox 擁有一個[自適應設計視圖](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View)，讓您可以探索您的設計在常見屏幕尺寸上的變化或者通過拖動邊緣的方式確定自己的大小，而不用考慮具體設備。




### Edge 的 F12 模擬

要模擬 Windows Phones，請使用 Microsoft Edge 的[內置模擬](https://dev.modern.ie/platform/documentation/f12-devtools-guide/emulation/)。

由於 Edge 不具備舊版兼容性，請使用 [IE 11 的模擬](https://msdn.microsoft.com/en-us/library/dn255001(v=vs.85).aspx)模擬您的頁面在較舊版本 Internet Explorer 中的外觀。

## 設備模擬器

設備模擬器不僅可以模擬瀏覽器環境，也能模擬整個設備。它們可以用於測試需要 iOS 集成的內容，例如帶虛擬鍵盤的表單輸入。

### Android Emulator

<figure class="attempt-right">
  <img src="imgs/android-emulator-stock-browser.png" alt="Android Emulator Stock Browser">
  <figcaption>Android Emulator 中的 Stock Browser</figcaption>
</figure>

目前，無法在 Android Emulator 上安裝 Chrome。不過，您可以使用 Android Browser、Chromium Content Shell 和 Firefox for Android，我們將在本指南的稍後部分進行介紹。Chromium Content Shell 與 Chrome 使用相同的渲染引擎，但沒有任何瀏覽器特定的功能。

Android Emulator 標配 Android SDK，您需要從<a href="http://developer.android.com/sdk/installing/studio.html">此處</a>下載。
然後，按照說明<a href="http://developer.android.com/tools/devices/managing-avds.html">設置虛擬設備</a>和<a href="http://developer.android.com/tools/devices/emulator.html">啓動模擬器</a>。

模擬器啓動後，點擊 Browser 圖標，就可以在較舊的 Stock Browser for Android 上測試網站了。

#### Android 上的 Chromium Content Shell

<figure class="attempt-right">
  <img src="imgs/android-avd-contentshell.png" alt="Android Emulator Content Shell">
  <figcaption>Android Emulator Content Shell</figcaption>
</figure>

要安裝 Chromium Content Shell for Android，請保持模擬器運行並在命令提示符處運行以下命令：


    git clone https://github.com/PaulKinlan/chromium-android-installer.git
    chmod u+x ./chromium-android-installer/\*.sh
    ./chromium-android-installer/install-chromeandroid.sh

現在，您可以使用 Chromium Content Shell 測試您的網站。


#### Android 上的 Firefox

<figure class="attempt-right">
  <img src="imgs/ff-on-android-emulator.png" alt="Android Emulator 上的 Firefox 圖標">
  <figcaption>Android Emulator 上的 Firefox 圖標</figcaption>
</figure>

與 Chromium 的 Content Shell 類似，您可以獲取一個 APK 以將 Firefox 安裝到模擬器上。

從 <a href="https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/">https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/</a> 下載合適的 .apk 文件。

從這裏，您可以使用以下命令將文件安裝到打開的模擬器或連接的 Android 設備上：

    adb install &lt;path to APK&gt;/fennec-XX.X.XX.android-arm.apk


### iOS 模擬器

適用於 Mac OS X 的 iOS 模擬器標配 Xcode，您可以[從 App Store 安裝](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12)。


完成後，您可以通過 [Apple 的文檔](https://developer.apple.com/library/prerelease/ios/documentation/IDEs/Conceptual/iOS_Simulator_Guide/Introduction/Introduction.html)學習如何使用模擬器。

Note: 爲了避免在每次想要使用 iOS 模擬器時都要打開 Xcode，請打開 Xcode，然後右鍵點擊停靠欄中的 iOS Simulator 圖標並選擇 `Keep in Dock`。現在，您可以在需要時隨時點擊此圖標。

### Modern.IE

<figure class="attempt-right">
  <img src="imgs/modern-ie-simulator.png" alt="Modern IE VM">
  <figcaption>Modern IE VM</figcaption>
</figure>

利用 Modern.IE 虛擬機，您可以在自己的計算機上通過 VirtualBox（或 VMWare）訪問不同版本的 IE。在<a href="https://modern.ie/en-us/virtualization-tools#downloads">此處的下載頁面</a>上選擇一款虛擬機。


## 基於雲的模擬器

如果您無法使用模擬器並且沒有真實設備，那麼基於雲的模擬器是您的最佳選擇。基於雲的模擬器相對於真實設備和本地模擬器的一大優勢是，您可以在不同平臺上對網站進行自動化單元測試。

* [BrowserStack（商用）](https://www.browserstack.com/automate)是最便於進行手動測試的雲模擬器。您可以選擇操作系統、瀏覽器版本與設備類型，以及要瀏覽的網址，模擬器將啓動一個您可以與之交互的託管式虛擬機。您還可以在相同屏幕中啓動多個模擬器，這樣，您能夠同時測試應用在多個設備上的外觀。
* [SauceLabs（商用）](https://saucelabs.com/){: .external } 允許您在模擬器內部運行單元測試，這對於將網站流腳本化和稍後在各種設備上觀看視頻記錄非常有用。您也可以對網站進行手動測試。
* [Device Anywhere（商用）](http://www.keynote.com/solutions/testing/mobile-testing)不使用模擬器，而是使用您可以遠程控制的真實設備。
如果您需要在特定設備上重現問題並且在本指南之前的任何選項上都無法看到錯誤，遠程控制真實設備將非常有用。





{# wf_devsite_translation #}
