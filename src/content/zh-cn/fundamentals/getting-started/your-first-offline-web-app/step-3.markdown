---
title: "测试应用"
updated_on: 2016-09-10
translation_priority: 1
translators:
  - wangyu
---

确保你的扬声器是打开的，然后点击喇叭，它应该就会发出声音。

<img src="images/image01.png" />

现在关掉服务器（在命令行下按下 Ctrl+C）。这可以模拟离线的场景。重新加载页面。页面应该能够完整地重新呈现，且功能都完全可用。

<img src="images/image01.png"  />  

为什么它能离线使用的原因就是我们本次代码实验要谈论的基本内容：service worker 支持离线的功能。

现在我们将要移除掉所有的离线支持，你会学到如何将 service worker 添加至你的应用后台让它来支持应用的离线使用。
