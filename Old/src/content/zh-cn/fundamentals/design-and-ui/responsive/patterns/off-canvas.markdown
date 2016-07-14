---
title: "Off canvas"
description: "响应式网页设计模式正在快速发展，但只有少数几种成熟的 模式可以在桌面和 和移动设备上流畅运行"
updated_on: 2014-10-21
---

<p class="intro">
  off canvas 模式不是垂直排列内容，而是将不 常用的内容（可能是导航或应用的菜单）放在屏幕之外，只在屏幕足够大时才显示。在较小屏幕上，只需点击 就能显示内容。
</p>

{% link_sample _code/off-canvas.html %}
  <img src="imgs/off-canvas.svg">
  试一下
{% endlink_sample %}

此示例不是垂直排列内容，而是使用`transform: translate(-250px, 0)` 将两个内容
`div`隐藏在屏幕之外。  然后通过给元素添加 Open 类来使其可见，使用 JavaScript 
来显示这些 div。  当
屏幕变宽时，从元素中去掉屏幕外的定位，并且让它显示在
可见视口内。

注意，在本例中，Safari for iOS 6 和安卓浏览器不支持
`flexbox` 的`flex-flow: row nowrap` 功能，因此我们必须回退到
绝对定位。

使用此模式的网站包括：

 * [HTML5Rocks
 文章](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](http://www.google.com/nexus/)
 * [Facebook 移动网站](https://m.facebook.com/)

{% include_code src=_code/off-canvas.html snippet=ocanvas lang=css %}


