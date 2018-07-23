project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:设备动作和方向事件可访问移动设备上的内置加速度计、陀螺仪和罗盘。

{# wf_updated_on:2018-07-23 #}
{# wf_published_on:2014-06-17 #}

# 设备屏幕方向与运动 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

设备动作和方向事件可访问移动设备上的内置加速度计、陀螺仪和罗盘。


这些事件可以用于许多用途；例如在游戏中控制人物的方向或动作。
当与地理定位配合使用时，它们可以帮助建立更准确的转弯提示导航系统，或提供有关具体位置的信息。



Note: 并非所有浏览器都使用相同的坐标系，因此它们可能在完全相同的情况下报告不同的值。这种情况已逐渐得到改善，但务必要根据具体情况进行测试。

##TL;DR

* 检测设备哪一侧向上以及设备的旋转方式。
* 了解响应运动和方向事件的时机和方法。


## 哪边是向上？

要使用设备方向和动作事件返回的数据，必须理解所提供的值。


### 地球坐标系

地球坐标系由 `X`、`Y` 和 `Z` 值表示，以重力和标准的磁定向为基准。


<table class="responsive">
<tr><th colspan="2">坐标系</th></tr>
<tr>
  <td><code>X</code></td>
  <td>表示东西方向（东为正值）。</td>
</tr>
<tr>
  <td><code>Y</code></td>
  <td>表示南北方向（北为正值）。</td>
</tr>
<tr>
  <td><code>Z</code></td>
  <td>表示上下方向，与地面垂直（向上为正值）。
</td>

</tr>
</table>

### 设备坐标系

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/axes.png" alt="设备坐标系的图示">
    <figcaption>
      设备坐标系的图示</figcaption>

  </figure>
</div>

<!-- Special thanks to Sheppy (https://developer.mozilla.org/en-US/profiles/Sheppy)
  for his images which are in the public domain. -->

设备坐标系由 `x`、`y` 和 `z` 值表示，以设备的中心为基准。


<table class="responsive">
<tr><th colspan="2">坐标系</th></tr>
<tr>
  <td><code>X</code></td>
  <td>处于屏幕平面，正值表示向右。</td>
</tr>
<tr>
  <td><code>Y</code></td>
  <td>处于屏幕平面，正值表示向上。</td>
</tr>
<tr>
  <td><code>Z</code></td>
  <td>与屏幕或键盘垂直，正值表示远离。
</td>

</tr>
</table>

在手机或平板电脑上，设备方向基于屏幕的典型方向。
对于手机和平板电脑，它以设备处于纵向模式为基准。
对于台式机或笔记本电脑，则是相对于键盘来考虑方向。


### 旋转数据

旋转数据以[欧拉角](https://en.wikipedia.org/wiki/Euler_angles)形式返回，表示设备坐标系与地球坐标系之间的差异度数。



#### Alpha

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/alpha.png" alt="设备坐标系的图示">
    <figcaption>
      设备坐标系中 Alpha 的图示</figcaption>

  </figure>
</div>

围绕 Z 轴的旋转。当设备的顶部指向正北时 `alpha` 值为 0&deg;。
当设备逆时针旋转时，`alpha` 值增加。


<div style="clear:both;"></div>

#### Beta

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/beta.png" alt="设备坐标系的图示">
    <figcaption>
      设备坐标系中 Beta 的图示</figcaption>

  </figure>
</div>

围绕 X 轴的旋转。当设备的顶部和底部与地球表面等距时 `beta` 值为 0&deg;。
当设备的顶部倾向地球表面时，此值增加。


<div style="clear:both;"></div>

#### Gamma

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/gamma.png" alt="设备坐标系的图示">
    <figcaption>
      设备坐标系中 Gamma 的图示</figcaption>

  </figure>
</div>

围绕 Y 轴的旋转。当设备的左右边缘与地球表面等距时 `gamma` 值为 0&deg;。
当设备的右侧倾向地球表面时，此值增加。


<div style="clear:both;"></div>

## 设备方向

设备方向事件返回旋转数据，包括设备前后倾斜度、两侧倾斜度，如果手机或笔记本电脑有罗盘，则还包括设备正在朝向的方向。



谨慎使用。
测试支持情况。
不要在每个方向事件发生时更新 UI；而是同步到 `requestAnimationFrame`。

### 何时使用设备方向事件

设备方向事件有多种用途。举例来说，包括以下用途：

* 随着用户移动而更新地图。
* 细微的 UI 调整，例如增加视差效果。
* 与地理定位结合，可以用于全程转弯提示导航。

### 检查支持情况和侦听事件

要侦听 `DeviceOrientationEvent`，首先检查浏览器是否支持这些事件。然后，将一个事件侦听器附加到 `window` 对象，以侦听 `deviceorientation` 事件。

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', deviceOrientationHandler, false);
      document.getElementById("doeSupported").innerText = "Supported!";
    }

### 处理设备方向事件

在设备移动或改变方向时，会触发设备方向事件。
它返回有关设备当前位置相对于[地球坐标系](#earth-coordinate-frame)的差异的数据。



此事件一般返回三个属性：[`alpha`](#alpha)、[`beta`](#beta) 和 [`gamma`](#gamma)。
在 Mobile Safari 上，会额外返回一个带有罗盘航向的参数 [`webkitCompassHeading`](https://developer.apple.com/library/ios/documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/){: .external }。



## 设备动作

设备方向事件返回旋转数据，包括设备前后倾斜度、两侧倾斜度，如果手机或笔记本电脑有罗盘，则还包括设备正在朝向的方向。



在需要设备的当前动作时，使用设备动作。
`rotationRate` 的单位为 &deg;/sec。
`acceleration` 和 `accelerationWithGravity` 的单位为 m/sec<sup>2</sup>。
注意各种浏览器实现方法之间的差异。

### 何时使用设备动作事件

设备动作事件有多种用途。举例来说，包括以下用途：

* 摇动手势以刷新数据。
* 在游戏中让角色跳跃或移动。
* 用于保健和健身应用。


### 检查支持情况和侦听事件

要侦听 `DeviceMotionEvent`，首先检查浏览器是否支持这些事件。
然后，将一个事件侦听器附加到 `window` 对象，以侦听 `devicemotion` 事件。


    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', deviceMotionHandler);
      setTimeout(stopJump, 3*1000);
    }

### 处理设备动作事件

设备动作事件按定期间隔触发，并及时返回有关设备在该时刻旋转 (&deg;/sec) 和加速度 (m/sec<sup>2</sup>) 的数据。一些设备没有硬件来排除重力的影响。


此事件返回四个属性，[`accelerationIncludingGravity`](#device-coordinate-frame)、[`acceleration`](#device-coordinate-frame)（排除重力影响）、[`rotationRate`](#rotation-data) 和 `interval`。




例如，我们来看一台放在平坦桌面上的手机，其屏幕朝上。


<table>
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

反过来，如果放置手机时屏幕与地面垂直，并且观看者可直接看到屏幕：


<table>
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

### 示例：计算一个物体的最大加速度

使用设备动作事件的一种方式是计算物体的最大加速度。
例如，人跳跃的最大加速度是多少？


    if (evt.acceleration.x > jumpMax.x) {
      jumpMax.x = evt.acceleration.x;
    }
    if (evt.acceleration.y > jumpMax.y) {
      jumpMax.y = evt.acceleration.y;
    }
    if (evt.acceleration.z > jumpMax.z) {
      jumpMax.z = evt.acceleration.z;
    }


点按 Go! 按钮之后，将告诉用户跳跃。在此时间中，页面存储最大（和最小）加速度值，在跳跃之后，将用户的最大加速度告诉用户。




{# wf_devsite_translation #}
