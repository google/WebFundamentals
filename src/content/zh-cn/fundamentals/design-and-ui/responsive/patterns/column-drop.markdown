---
title: "Column Drop"
description: "响应式网页设计模式正在快速发展，但只有少数几种成熟的 模式可以在桌面和 和移动设备上流畅运行"
updated_on: 2014-10-21
---

<p class="intro">
  对于全宽度的多列布局，当窗口宽度太窄不能容纳内容时，Column drop 就将各列垂直排列。  
</p>

最终
使所有列都垂直排列。  为此布局模式
选择视图断点时要依据内容，并且将针对每种设计
而改变。

{% link_sample _code/column-drop.html %}
  <img src="imgs/column-drop.svg">
  试一下
{% endlink_sample %}


与 Mostly fluid 示例类似，内容在最小视图中垂直
排列，但当屏幕宽度超过 600px 时，第一个和第二个内容
`div` 占用屏幕的全宽度。  `div` 的顺序是使用
 CSS 属性的顺序进行设置的。  在 800px 时，
使用全屏宽度来显示全部三个内容 `div`。

使用此模式的网站包括：

 * [Modernizr](http://modernizr.com/)
 * [Wee Nudge](http://weenudge.com/)

{% include_code src=_code/column-drop.html snippet=cdrop lang=css %}


