project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:很容易忽視您的用戶在使用移動設備時遇到的網絡條件。使用 DevTools 可以模擬不同的網絡條件。解決全部的加載時間問題，您的用戶會感謝您。

{# wf_updated_on:2015-07-20 #}
{# wf_published_on:2015-04-13 #}

# 在不斷變化的網絡條件下優化性能 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/jonathangarbee.html" %}

很容易忽視您的用戶在使用移動設備時遇到的網絡條件。使用 DevTools 可以模擬不同的網絡條件。解決全部的加載時間問題，您的用戶會感謝您。


### TL;DR {: .hide-from-toc }
- 使用 Chrome DevTools 網絡模擬器，在不影響其他標籤流量的情況下模擬您網站的性能。
- 使用特定於您的受衆網絡條件的自定義配置文件。


## 模擬網絡連接

利用網絡調節，您可以在不同的網絡連接（包括 Edge、3G，甚至離線）下測試網站。這樣可以限制出現最大的下載和上傳吞吐量（數據傳輸速率）。延遲時間操控會強制連接往返時間 (RTT) 出現最小延遲。



可以通過 Network 面板開啓網絡調節。從下拉菜單中選擇要應用網絡節流和延遲時間操控的連接。


![選擇網絡節流](imgs/throttle-selection.png)

**提示**：您還可以通過 [Network conditions](#network-conditions) 抽屜式導航欄設置網絡節流。


啓用節流後，面板指示器會顯示一個警告圖標，在您位於其他面板時提醒您已啓用節流。


![Network 面板選擇器，帶警告指示器](imgs/throttling-enabled.png)

## 自定義節流

DevTools 提供了許多默認條件。您可能需要添加自定義條件，以便覆蓋受衆的主要條件。


要添加條件，請打開下拉菜單應用條件。在 **custom** 標題下，找到並選擇 **Add...** 選項。這將打開 DevTools 的 Settings 對話框，“Throttling”標籤也會處於打開狀態。



![節流設置索引](imgs/throttle-index.png)

首先，請點擊 **Add custom profile** 按鈕。這將打開一個內聯表單，用於提供配置文件條件。準確地填寫表單，滿足您的需求後按 **Add** 按鈕。



![節流設置，添加自定義節流](imgs/add-custom-throttle.png)

您可以將鼠標懸停在條目上修改現有的自定義配置文件。懸停時，**Edit** 和 **Delete** 圖標會顯示在條目的右側。


![節流設置，修改自定義條目](imgs/hover-to-modify-custom-throttle.png)

現在您可以關閉 Settings 對話框。您的新自定義配置文件會顯示在 **custom** 標題下，用於條件選擇。


## 打開 Network conditions 抽屜式導航欄{:#network-conditions}

其他 DevTools 面板會隨 **Network conditions** 抽屜式導航欄一起打開，您可以藉此訪問諸多網絡功能。
 

![Network conditions 抽屜式導航欄](imgs/network-drawer.png)

從 DevTools 主菜單訪問抽屜式導航欄（**Main Menu** > **More Tools** >
**Network Conditions**）。

![打開 Network conditions 抽屜式導航欄](imgs/open-network-drawer.png)


{# wf_devsite_translation #}
