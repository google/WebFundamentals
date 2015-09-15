---
title: "响应式网页设计模式"
description: "响应式网页设计模式正在快速发展，但只有少数几种成熟的 模式可以在桌面和 和移动设备上流畅运行"
updated_on: 2014-10-21
---

<p class="intro">
  响应式网页设计模式正在快速发展，但只有少数几种成熟的 模式可以在桌面和 和移动设备上流畅运行。
</p>


响应式网页所用的大部分布局可以归类为五种
模式：mostly fluid、column drop、layout shifter、tiny tweaks 和 off canvas。
在某些情况下，页面可能使用组合模式，例如 column drop
和 off canvas。  这些模式最初由[Luke
Wroblewski](http://www.lukew.com/ff/entry.asp?1514)确定，为任何响应式页面提供了可靠的
起点。

## 模式

为创建简单易懂的示例，下面每个示例
都是使用
[`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)通过真实标记创建的，
一般在主要容器`div` 内设置了三个内容`div`。
 每个示例都从最小的视图开始，然后在必要时加上视图断点
。  现代浏览器[能很好地支持 flexbox 布局模式l
](http://caniuse.com/#search=flexbox)，尽管可能仍
需要供应商前缀才能实现最佳支持。


