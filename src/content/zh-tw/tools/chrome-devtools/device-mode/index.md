project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Chrome 的 Device Mode 下的虛擬設備打造移動設備優先的網站。

{# wf_updated_on:2016-03-07 #}
{# wf_published_on:2015-04-13 #}

# 使用 Device Mode 模擬移動設備 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

使用 Chrome DevTools 的 Device Mode 打造移動設備優先的完全自適應式網站。瞭解如何使用 Device Mode 模擬多種設備及其功能。

Warning: Device Mode 可以讓您瞭解您的網站在移動設備上的大致顯示效果，但要獲得全面的瞭解，則應始終在真實設備上測試您的網站。DevTools 無法模擬移動設備的性能特性。



## 簡述

* 在[不同的屏幕尺寸和分辨率](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports)（包括 Retina 顯示屏）下模擬您的網站。
* 通過可視化和[檢查 CSS 媒體查詢](/web/tools/chrome-devtools/iterate/device-mode/media-queries)進行自適應設計。
* 使用[網絡模擬器](/web/tools/chrome-devtools/network-performance/network-conditions)在不影響其他標籤流量的情況下模擬您網站的性能。
* 針對觸摸事件、地理定位和設備方向準確[模擬設備輸入](/web/tools/chrome-devtools/device-mode/device-input-and-sensors)

## 切換 Device Mode {: #toggle }

切換 **Device Mode** 按鈕可以打開或關閉 Device Mode。

![Device Mode 的初次啓動](imgs/device-mode-initial-view.png)

當 Device Mode 打開時，該圖標呈藍色
(![Device Mode 打開](imgs/device-mode-on.png))。

當 Device Mode 關閉時，該圖標呈灰色
(![Device Mode 關閉](imgs/device-mode-off.png))。

Device Mode 默認處於啓用狀態。 

您還可以通過按 <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> (Mac) 或 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>（Windows、Linux）來切換 Device Mode。要使用此快捷鍵，鼠標焦點需要位於 DevTools 窗口中。如果焦點位於視口中，您將觸發 [Chrome 的切換用戶快捷鍵](https://support.google.com/chrome/answer/157179)。










{# wf_devsite_translation #}
