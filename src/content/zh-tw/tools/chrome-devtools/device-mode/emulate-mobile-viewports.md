project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:利用 Chrome DevTools 的 Device Mode，您可以在一系列設備上模擬開發網站在生產環境中的運行。

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-04-13 #}

# 測試自適應和設備特定的視口 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

更新後的 Device Mode（自 Chrome 49 起）是當前移動設備優先的 DevTools 的主要部分，並且擴展了主 DevTools 欄。瞭解如何使用其控件模擬各種設備或切換爲完全自適應。


### TL;DR {: .hide-from-toc }
- 使用 Device Mode 的屏幕模擬器測試網站的響應能力。
- 保存自定義預設，便於日後訪問。
- Device Mode 不能替代真實設備測試。請注意它的限制。


## 使用視口控件 {: #viewport-controls }

![Device Mode 已啓用](imgs/device-mode.png)

利用視口控件，您可以針對各種設備測試網站，以及是否能夠實現完全自適應。它包括以下兩個模式：

  1. **自適應**。使視口可以通過任意一側的大手柄隨意調整大小。
  2. **特定設備**。將視口鎖定爲特定設備確切的視口大小，並模擬特定設備特性。

## 自適應模式

我們建議將**自適應模式**用作您的默認工作模式。在您的網站和應用的活動開發期間使用這一模式，並經常調整視口大小以創建完全自適應設計，這種設計可以適應未知和未來的設備類型。

要充分利用自適應模式，請啓用[媒體查詢欄](#media-queries)。

### 自定義視口大小

在視口上拖動調整大小的大手柄，或者點擊菜單欄中的值進行精確調整。

## 特定設備模式

在接近活動開發末期以及想要了解網站在特定移動設備（例如，特定 iPhone 或 Nexus）上的外觀時，可以使用**特定設備模式**。

### 內置設備預設

<div class="wf-devtools-flex">
  <div>
  <p>我們已在設備下拉菜單中包含了當前最熱門的設備。選擇設備後，每個預設都會自動配置特定設備特性的模擬：</p>
  <ul>
    <li>設置正確的“User Agent”(UA) 字符串。</li>
    <li>設置設備分辨率和 DPI（設備像素比）。</li>
    <li>模擬觸摸事件（如果適用）。</li>
    <li>模擬移動設備滾動條疊加和 meta viewport。</li>
    <li>自動調整不帶已定義視口的頁面文本的大小（效果增強）。</li>
  </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/select-device.png" alt="選擇設備">
  </div>
</div>

### 添加自定義設備預設

Device Mode 提供了多種用於模擬的設備。如果您發現某款邊緣或冷門設備未涵蓋在內，可以添加自定義設備。
 

<div class="wf-devtools-flex">
  <div>
  <p>要添加自定義設備，請執行以下操作：</p>
  <ol>
    <li>轉至 DevTools 的 Settings 面板。</li>
    <li>點擊 <strong>Devices</strong> 標籤。</li>
    <li>點擊 <strong>Add custom device</strong>。</li>
    <li>輸入設備名稱、寬度、高度、設備像素比和 User Agent 字符串。</li>
     <li>點擊 <strong>Add</strong>。</li>
  </ol>
  <p>現在，您的自定義設備將顯示在 <strong>Device</strong> 下拉菜單中。</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/custom-device.png" alt="選擇設備">
  </div>
</div>

### 設備狀態和方向

![切換方向](imgs/change-orientation.png)

模擬特定設備時，Device Mode 工具欄會顯示另一個控件，主要用於在橫向和縱向屏幕方向之間切換。

<div class="wf-devtools-flex">
  <div>
    <p>在選定的設備上，控件不只是可以切換方向。對於支持的設備（如 Nexus 5X），您會獲得一個下拉菜單，可以模擬特定設備狀態，如：</p>
    <ul>
      <li>默認瀏覽器 UI</li>
      <li>顯示 Chrome 導航欄</li>
      <li>顯示打開的鍵盤</li>
    </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/change-device-state.png" alt="更改設備 UI">
  </div>
</div>

### 縮放到合適大小  

<div class="wf-devtools-flex">
  <div>
  <p>有時，您可能想要測試分辨率大於瀏覽器窗口實際可用空間的設備。這種情況下，<strong>Zoom to Fit</strong> 選項會很方便：</p>
  <ol>
    <li><strong>Fit to Window</strong> 會自動將縮放級別設置爲最大的可用空間。</li>
    <li>例如，如果您想要測試圖像的 DPI，<strong>Explicit percentages</strong> 會非常有用。</li>
  </ol>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/zoom-to-fit.png" alt="縮放到合適大小">
  </div>
</div>

## 可選控件（例如，觸摸、媒體查詢、DPR）

<div class="wf-devtools-flex">
  <div>
  <p>點擊設備工具欄右側上的三個小圓點，可以更改或啓用可選控件。當前選項包括：</p>
  <ul>
    <li>User Agent 類型（模擬 UA 和觸摸事件）</li>
    <li>設備像素比</li>
    <li>媒體查詢</li>
    <li>標尺</li>
    <li>配置網絡（UA、網絡節流）</li>
  </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/device-mode-dotmenu.png" alt="Device Mode 設置">
  </div>
</div>

繼續閱讀，詳細瞭解特定選項。

### User Agent 類型

**User Agent Type** 或 Device Type 設置讓您可以更改設備的類型。
可能的值爲：

  1. Mobile
  2. Desktop
  3. Desktop with touch

更改此設置會影響移動設備視口和觸摸事件模擬並更改 UA 字符串。
因此，如果您想要爲桌面設備創建自適應網站，且想要測試懸停效果，請在 Responsive 模式下切換到“Desktop”。
：

**提示**：您也可以在 [**Network conditions**][nc] 抽屜式導航欄中設置 User Agent。



### 設備像素比 (DPR)

如果您想要從非 Retina 機器上模擬 Retina 設備或者從 Retina 機器上模擬非 Retina 設備，請調整**設備像素比**。
**設備像素比** (DPR) 是邏輯像素與物理像素之間的比率。與普通設備相比，帶有 Retina 顯示屏的設備（如 Nexus 6P）的像素密度更高，像素密度會影響可視內容的清晰度和大小。



網頁上“設備像素比”(DPR) 靈敏度的部分示例如下：

* CSS 媒體查詢，例如：

      @media (-webkit-min-device-pixel-ratio: 2), 
             (min-resolution: 192dpi) { ... }

* CSS [image-set](http://dev.w3.org/csswg/css-images/#image-set-notation) 規則。


* 圖像上的 [srcset](/web/fundamentals/design-and-ux/media/images/images-in-markup) 屬性。


* `window.devicePixelRatio` 屬性。

如果擁有原生 Retina 顯示屏，您會注意到較低“每英寸點數”(DPI) 的資源看上去比較模糊，而較高 DPI 的資源比較清晰。
要在標準顯示屏上模擬這種效果，請將 DPR 設置爲 2 並通過縮放調整視口的大小。2 倍資源看上去還是比較清晰，1 倍資源看上去則比較模糊。


### 媒體查詢 {: #media-queries }

[媒體查詢](/web/fundamentals/design-and-ux/responsive/fundamentals/use-media-queries)是自適應網頁設計的基本部分。要查看媒體查詢檢查器，請在三圓點菜單中點擊 **Show Media queries**。DevTools 會在樣式表中檢測媒體查詢，並在頂端標尺中將它們顯示爲彩色條形。


![顯示媒體查詢](imgs/show-media-queries.png)

![媒體查詢檢查器](imgs/media-query-inspector-ruler.png)

用彩色標記的媒體查詢示例如下：

<style>#colortable { width: 60%; border: none; } #colortable td { border: none; } .max-width { background: #327ff2; width: 10%; } .max-and-min { background: #3b9903; width: 10%; } .min-width { background: #d4731f; width: 10%; }</style>

<table id="colortable">
  <tbody>
    <tr>
      <td class="max-width"></td>
      <td>針對最大寬度的查詢。</td>
    </tr>
    <tr>
      <td class="max-and-min"></td>
      <td>針對一定範圍內寬度的查詢。</td>
    </tr>
    <tr>
      <td class="min-width"></td>
      <td>針對最小寬度的查詢。</td>
    </tr>
  </tbody>
</table>

#### 快速預覽媒體查詢

點擊媒體查詢條形，調整視口大小和預覽適合目標屏幕大小的樣式。


#### 查看關聯的 CSS

右鍵點擊某個條形，查看媒體查詢在 CSS 中何處定義並跳到源代碼中的定義。


![網頁基礎知識媒體查詢視圖](imgs/reveal-source-code.png)

### 標尺

切換此選項可以在視口旁顯示基於像素的標尺。

### 配置網絡（UA、網絡節流）

選擇此選項會在抽屜式導航欄中打開一個面板，您可以在其中更改網絡相關行爲：


  1. **Disk Cache**：停用 Disk Cache 將在打開 DevTools 時停止瀏覽器緩存頁面及其資源。
  2. **Network Throttling**：在此處閱讀更多有關[網絡節流](/web/tools/chrome-devtools/network-performance/network-conditions)的信息。
  3. **User Agent**：允許您設置特定的 UA (User Agent) 字符串替換值。


**提示**：您也可以從[主菜單][nc]中打開 **Network conditions** 抽屜式導航欄。


## 限制

Device Mode 存在一些限制。

* **設備硬件**
  * 無法模擬 GPU 和 CPU 行爲。
* **瀏覽器 UI**
  * 無法模擬系統顯示，如地址欄。
  * 無法將原生顯示（如 `<select>` 元素）作爲模態列表模擬。
  * 一些增強功能（如數字輸入打開小鍵盤）可能會因實際設備行爲不同而不同。
* **瀏覽器功能**
  * WebGL 可以在模擬器中操作，但 iOS 7 設備不支持 WebGL。
  * Chrome 不支持 MathML，但 iOS 7 設備支持 MathML。
  * 無法模擬 [iOS 5 方向縮放錯誤](https://github.com/scottjehl/device-bugs/issues/2)。
  * 行高 CSS 屬性可以在模擬器中操作，但 Opera Mini 不支持行高 CSS。
  * 無法模擬 CSS 規則限制，例如 [Internet Explorer](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx) 中的規則限制。
* **AppCache**
  * 模擬器不會替換 AppCache [清單文件](https://code.google.com/p/chromium/issues/detail?id=334120) 的 <abbr title="User Agent">UA</abbr> 或[查看源請求](https://code.google.com/p/chromium/issues/detail?id=119767)。

儘管存在這些限制，Device Mode 還是十分強大，能夠完成大多數任務。
如果需要在真實設備上測試，可以使用[遠程調試](/web/tools/chrome-devtools/debug/remote-debugging)獲得其他數據分析。




[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions


{# wf_devsite_translation #}
