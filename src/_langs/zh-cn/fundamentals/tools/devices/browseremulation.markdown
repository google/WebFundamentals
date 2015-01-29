---
layout: article
title: "Use DevTools Emulation"
description: "When you don’t have a particular device, or want to do a spot check on something, the best option is to emulate the device right inside your browser."
introduction: "When you don’t have a particular device, or want to do a spot check on something, the best option is to emulate the device right inside your browser."
article:
  written_on: 2014-05-29
  updated_on: 2014-09-25
  order: 2
collection: devices
authors:
  - megginkearney
  - mattgaunt
key-takeaways:
  emulator:
    - Quickly test your site’s responsiveness and support for mobile APIs using DevTools emulation.
notes:
    - TBD.
---
{% wrap content %}

Browser emulation is great for testing a sites responsiveness, but they don’t
emulate differences in API, CSS support and certain behaviors that you'd see
on a mobile browser. Test your site on browsers running on real devices to be
certain everything behaves as expected.

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.emulator %}

## Chrome DevTools 模拟

[Chrome DevTools](https://developer.chrome.com/devtools) 有一个设备模拟工具用于模拟不同设备下的屏幕大小和像素密度。

通过以下步骤开启你的设备模拟:

1. 打开 Chrome 开发者工具，点击菜单（汉堡）按钮。
2. 点击左上角的移动设备按钮
3. 点击底部的 `Emulation` 标签。
4. 在下拉菜单中选择你想要模拟的设备。

<img src="imgs/chrome-devtools-emulation.png" alt="Chrome DevTools Emulation Guide" />

## Firefox 响应式视图

Firefox 有一个 [响应式设计视图](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View)
鼓励你停止胡乱猜测，通过拖动窗口边缘，
开始探索在不同大小的屏幕中你设计的变化。


To use the responsive view, open the developer tools in Firefox and click the
icon illustrated in step 1 below and use the handles at the side of the web page
to resize it, illustrated in step 2.

<img src="imgs/ff-responsive-design-mode.png" alt="Firefox Responsive Design View" />

## IE 设备模拟

IE11 有一个 [将你的视角变为 Windows Phone](http://msdn.microsoft.com/en-gb/library/ie/dn255001(v=vs.85).aspx) 的特性，也支持模拟旧版IE哦。
改变模拟浏览器，请按照如下步骤操作：

1. 选择模拟标签。
2. 右键菜单选择 **Browser profile** 并选择你的设备。


<img src="imgs/ie-device-emulation.png" alt="IE Device Emulation" />

{% include modules/nextarticle.liquid %}

{% endwrap %}
