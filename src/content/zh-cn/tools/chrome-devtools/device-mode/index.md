project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Chrome 的 Device Mode 下的虚拟设备打造移动设备优先的网站。

{# wf_updated_on:2016-03-07 #}
{# wf_published_on:2015-04-13 #}

# 使用 Device Mode 模拟移动设备 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

使用 Chrome DevTools 的 Device Mode 打造移动设备优先的完全自适应式网站。了解如何使用 Device Mode 模拟多种设备及其功能。

警告：Device Mode 可以让您了解您的网站在移动设备上的大致显示效果，但要获得全面的了解，则应始终在真实设备上测试您的网站。DevTools 无法模拟移动设备的性能特性。



## 简述

* 在[不同的屏幕尺寸和分辨率](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports)（包括 Retina 显示屏）下模拟您的网站。
* 通过可视化和[检查 CSS 媒体查询](/web/tools/chrome-devtools/iterate/device-mode/media-queries)进行自适应设计。
* 使用[网络模拟器](/web/tools/chrome-devtools/network-performance/network-conditions)在不影响其他标签流量的情况下模拟您网站的性能。
* 针对触摸事件、地理定位和设备方向准确[模拟设备输入](/web/tools/chrome-devtools/device-mode/device-input-and-sensors)

## 切换 Device Mode {: #toggle }

切换 **Device Mode** 按钮可以打开或关闭 Device Mode。

![Device Mode 的初次启动](imgs/device-mode-initial-view.png)

当 Device Mode 打开时，该图标呈蓝色
(![Device Mode 打开](imgs/device-mode-on.png))。

当 Device Mode 关闭时，该图标呈灰色
(![Device Mode 关闭](imgs/device-mode-off.png))。

Device Mode 默认处于启用状态。 

您还可以通过按 <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> (Mac) 或 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>（Windows、Linux）来切换 Device Mode。要使用此快捷键，鼠标焦点需要位于 DevTools 窗口中。如果焦点位于视口中，您将触发 [Chrome 的切换用户快捷键](https://support.google.com/chrome/answer/157179)。










{# wf_devsite_translation #}
