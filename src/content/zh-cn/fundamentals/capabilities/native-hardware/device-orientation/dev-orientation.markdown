---
title: "设备方向"
description: "device orientation 事件返回旋转数据，包括设备前后倾斜度、两侧倾斜度，如果手机或笔记本电脑有罗盘，则还包括设备正在朝向的 方向。"
updated_on: 2014-10-21
key-takeaways:
  devorientation: 
    -  谨慎使用。
    -  测试支持情况。
    -  不要在每个方向事件发生时更新 UI；而是同步到 <code>requestAnimationFrame。</code>
---

<p class="intro">
  device orientation 事件返回旋转数据，包括设备前后倾斜度、两侧倾斜度，如果手机或笔记本电脑有罗盘，则还包括设备正在朝向的 方向。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.devorientation %}

## 何时使用 device orientation 事件

device orientation 事件有多种用途。  例如：

<ul>
  <li>随着用户移动而更新地图。</li>
  <li>细微的 UI 调整，例如增加 paralax 效果。</li>
  <li>与地理定位结合，可以用于全程转弯提示导航。</li>
</ul>

## 检查支持情况和侦听事件

要侦听 `DeviceOrientationEvent`，首先检查浏览器是否支持
这些事件。  然后，将一个事件侦听器附加到 `window` 
对象，以侦听 `deviceorientation` 事件。 

{% include_code src=_code/dev-orientation.html snippet=devori lang=javascript %}

## 处理 device orientation 事件

在设备移动、或改变
方向时，会触发 device orientation 事件。  它返回有关设备当前位置
相对于<a href="index.html#earth-coordinate-frame"> 
地球坐标系</a>的差异的数据。

此事件一般返回三个属性：
<a href="index.html#rotation-data">`alpha`</a>、
<a href="index.html#rotation-data">`beta`</a> 和 
<a href="index.html#rotation-data">`gamma`</a>。  在 Mobile Safari 上，会
返回一个带有罗盘航向的额外参数<a href="https://developer.apple.com/library/safari/documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/DeviceOrientationEvent/DeviceOrientationEvent.html">`webkitCompassHeading`</a>
。


