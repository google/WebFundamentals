---
title: "设备方向"
description: "设备动作和方向事件可访问移动设备上的 内置加速度计、陀螺仪和罗盘。"
updated_on: 2014-10-21
notes:
  not-stable:
    - 在决定使用设备动作或设备方向事件时，务必<b>非常</b> 小心。  遗憾的是，并非所有浏览器都使用 相同的坐标系，因此可能在相同情况下报告 不同的值。
---
<p class="intro">
  设备动作和方向事件可访问移动设备上的 内置加速度计、陀螺仪和罗盘。
</p>

这些事件可以用于许多用途；例如在游戏中
控制人物的方向，或确定人物跳跃
的高度。 当与地理位置配合使用时，它可以建立更准确的
转弯提示导航系统，或提供有关某一商店在何处的信息。

{% include shared/remember.liquid title="Warning" list=page.notes.not-stable %}

## 哪边是向上？

要使用设备方向和动作事件返回的数据，
务必理解所提供的值。  

### 地球坐标系

地球坐标系由 `X`、`Y` 和 `Z` 表示，以
重力和标准的磁定向为基准。

<ul>
  <li>
    <b>X:</b> 表示东西方向（东为正值）。
  </li>
    <li>
    <b>Y:</b> 表示南北方向（北为正值）。
  </li>
    <li>
    <b>Z:</b> 表示上下方向，与地面垂直
（向上为正值）。
  </li>
</ul>

### 设备坐标系

设备坐标系由 `x`、`y` 和 `z` 值表示，以
设备的中心为基准。

<img src="images/axes.png" alt="设备坐标系的图示">
<!-- 特别感谢 Sheppy (https://developer.mozilla.org/en-US/profiles/Sheppy) 
在公共域中提供的图像。 -->

<ul>
  <li>
    <b>x:</b> 处于屏幕平面，正值表示向右。
  </li>
    <li>
    <b>y:</b> 处于屏幕平面，正值表示向上。
  </li>
    <li>
    <b>z:</b> 与屏幕或键盘垂直，正值表示
远离。
  </li>
</ul>

在手机或平板电脑上，设备的朝向是基于屏幕
的典型朝向。  对于手机和平板电脑，它基于设备处于
纵向模式时。 对于台式机或笔记本电脑，是相对于键盘
来考虑朝向。

### 旋转数据

旋转数据是作为 [欧拉角](http://en.wikipedia.org/wiki/Euler_angles)返回，
表示设备坐标系与地球坐标系
之间的差异度数。

<div>
  <div class="g--third">
    <img src="images/alpha.png"><br>
    <b>alpha:</b> 围绕 Z 轴的旋转，当设备的顶部指向
正北时其值为 0&deg;。  当设备逆时针旋转时，
`alpha` 值增加。
  </div>
  <div class="g--third">
    <img src="images/beta.png"><br>
    <b>beta:</b> 围绕 X 轴的旋转，当设备的顶部和底部与
地球表面等距时其值为 0&deg;。 当设备的顶部倾向地球表面时，此值
增加。
  </div>
  <div class="g--third g--last">
    <img src="images/gamma.png"><br>
    <b>gamma:</b> 围绕 Y 轴的旋转，当设备的右侧和右侧与地球表面等距时
其值为 0&deg;。  当设备的右侧倾向地球表面时，此值
增加。 
  </div>
</div>

<div style="clear:both;"></div>



