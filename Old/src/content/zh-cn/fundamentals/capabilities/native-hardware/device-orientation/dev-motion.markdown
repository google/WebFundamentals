---
title: "设备动作"
description: "设备动作提供了在指定时刻应用到设备 的加速力以及旋转速率的信息。"
updated_on: 2014-10-21
key-takeaways:
  devmotion: 
    -  在需要设备的当前动作时，使用设备动作。
    -  <code>rotationRate</code> 的单位为 &deg;/sec。
    -  <code>acceleration</code> 和 <code>accelerationWithGravity</code> 的 单位为 m/sec<sup>2</sup>。
    -  注意各种浏览器实现方法之间的差异。
---

<p class="intro">
  设备动作提供了在指定时刻应用到设备 的加速力以及旋转速率的信息。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.devmotion %}

## 何时使用设备动作事件

设备动作事件有多种用途。  例如：

<ul>
  <li>摇动手势以刷新数据。</li>
  <li>在游戏中让角色跳跃或移动。</li>
  <li>用于保健和健身应用</li>
</ul>

## 检查支持情况和侦听事件

要侦听 `DeviceMotionEvent`，首先检查浏览器是否支持
这些事件。  然后，将一个事件侦听器附加到 `window` 
对象，以侦听 `devicemotion` 事件。 

{% include_code src=_code/jump-test.html snippet=devmot lang=javascript %}

## 处理设备动作事件

设备动作事件按定期间隔检测，并及时返回
有关设备在该时刻旋转 (&deg;/sec) 和加速度 (m/sec<sup>2</sup>)
的数据。  一些设备没有硬件
来排除重力的影响。

此事件返回四个属性：
<a href="index.html#device-frame-coordinate">`accelerationIncludingGravity`</a>、
<a href="index.html#device-frame-coordinate">`acceleration`</a>（
排除重力影响）、
<a href="index.html#rotation-data">`rotationRate`</a> 和 `interval`。

例如，我们来看看手机放在平坦桌面上，
其屏幕朝上。

<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="State">状态</th>
      <th data-th="Rotation">旋转</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">加速度 (m/s<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">重力加速度 (m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">未移动</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 0, 9.8]</td>
    </tr>
    <tr>
      <td data-th="State">向上移动</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 5]</td>
      <td data-th="Acceleration with gravity">[0, 0, 14.81]</td>
    </tr>
    <tr>
      <td data-th="State">只向右移动</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 0, 9.81]</td>
    </tr>
    <tr>
      <td data-th="State">向上和向右移动</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 0, 5]</td>
      <td data-th="Acceleration with gravity">[5, 0, 14.81]</td>
    </tr>
  </tbody>
</table>

反过来，如果放置手机时屏幕与地面垂直
，并且观看者可直接看到屏幕：

<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="State">状态</th>
      <th data-th="Rotation">旋转</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">加速度 (m/s<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">重力加速度 (m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">未移动</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 9.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">向上移动</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 5, 0]</td>
      <td data-th="Acceleration with gravity">[0, 14.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">只向右移动</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 9.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">向上和向右移动</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 5, 0]</td>
      <td data-th="Acceleration with gravity">[5, 14.81, 0]</td>
    </tr>
  </tbody>
</table>

### 示例：计算一个对象的最大加速度

使用设备动作事件的一种方式是计算对象的
最大加速度。  例如，人跳跃的
最大加速度是多少。

{% include_code src=_code/jump-test.html snippet=devmothand lang=javascript %}

在点击 Go! 按钮之后，将告诉用户跳跃！在此时间中，
页面存储最大（和最小）加速度值，在跳跃
之后，将用户的最大加速度告诉用户。

