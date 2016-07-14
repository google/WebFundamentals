---
title: "Tiny tweaks"
description: "响应式网页设计模式正在快速发展，但只有少数几种成熟的 模式可以在桌面和 和移动设备上流畅运行"
updated_on: 2014-10-21
---

<p class="intro">
  Tiny tweaks 只对布局进行小更改，例如调整字号 、调整图片大小或对内容进行极其细微的移动。
</p>

它在单列布局上表现很好，例如单页面线性网站、
文本为主的文章。

{% link_sample _code/tiny-tweaks.html %}
  <img src="imgs/tiny-tweaks.svg">
  试一下
{% endlink_sample %}

正如其名所示，在屏幕大小改变时，本示例的变化很小。
当屏幕宽度增加时，字号和行距也变大。

使用此模式的网站包括：

 * [Opera 的闪亮演示](http://shinydemos.com/)
 * [Ginger Whale](http://gingerwhale.com/)
 * [Future Friendly](http://futurefriendlyweb.com/)

{% include_code src=_code/tiny-tweaks.html snippet=ttweaks lang=css %}


