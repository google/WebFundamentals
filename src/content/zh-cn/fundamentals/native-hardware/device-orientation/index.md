project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 设备动作和方向事件可访问移动设备上的 内置加速度计、陀螺仪和罗盘。

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# 设备方向 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


设备动作和方向事件可访问移动设备上的 内置加速度计、陀螺仪和罗盘。

这些事件可以用于许多用途；例如在游戏中
控制人物的方向，或确定人物跳跃
的高度。 当与地理位置配合使用时，它可以建立更准确的
转弯提示导航系统，或提供有关某一商店在何处的信息。

<!-- TODO: Verify note type! -->
Note: 在决定使用设备动作或设备方向事件时，务必<b>非常</b> 小心。  遗憾的是，并非所有浏览器都使用 相同的坐标系，因此可能在相同情况下报告 不同的值。

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





## 设备方向 




device orientation 事件返回旋转数据，包括设备前后倾斜度、两侧倾斜度，如果手机或笔记本电脑有罗盘，则还包括设备正在朝向的 方向。


### TL;DR {: .hide-from-toc }
- 谨慎使用。
- 测试支持情况。
- 不要在每个方向事件发生时更新 UI；而是同步到 <code>requestAnimationFrame。</code>


### 何时使用 device orientation 事件

device orientation 事件有多种用途。  例如：

<ul>
  <li>随着用户移动而更新地图。</li>
  <li>细微的 UI 调整，例如增加 paralax 效果。</li>
  <li>与地理定位结合，可以用于全程转弯提示导航。</li>
</ul>

### 检查支持情况和侦听事件

要侦听 `DeviceOrientationEvent`，首先检查浏览器是否支持
这些事件。  然后，将一个事件侦听器附加到 `window` 
对象，以侦听 `deviceorientation` 事件。 

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/capabilities/native-hardware/device-orientation/_code/dev-orientation.html" region_tag="devori" lang=javascript %}
</pre>

### 处理 device orientation 事件

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




## 设备动作 




设备动作提供了在指定时刻应用到设备 的加速力以及旋转速率的信息。


### TL;DR {: .hide-from-toc }
- 在需要设备的当前动作时，使用设备动作。
- <code>rotationRate</code> 的单位为 &deg;/sec。
- <code>acceleration</code> 和 <code>accelerationWithGravity</code> 的 单位为 m/sec<sup>2</sup>。
- 注意各种浏览器实现方法之间的差异。


### 何时使用设备动作事件

设备动作事件有多种用途。  例如：

<ul>
  <li>摇动手势以刷新数据。</li>
  <li>在游戏中让角色跳跃或移动。</li>
  <li>用于保健和健身应用</li>
</ul>

### 检查支持情况和侦听事件

要侦听 `DeviceMotionEvent`，首先检查浏览器是否支持
这些事件。  然后，将一个事件侦听器附加到 `window` 
对象，以侦听 `devicemotion` 事件。 

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/capabilities/native-hardware/device-orientation/_code/jump-test.html" region_tag="devmot" lang=javascript %}
</pre>

### 处理设备动作事件

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

#### 示例：计算一个对象的最大加速度

使用设备动作事件的一种方式是计算对象的
最大加速度。  例如，人跳跃的
最大加速度是多少。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/capabilities/native-hardware/device-orientation/_code/jump-test.html" region_tag="devmothand" lang=javascript %}
</pre>

在点击 Go! 按钮之后，将告诉用户跳跃！在此时间中，
页面存储最大（和最小）加速度值，在跳跃
之后，将用户的最大加速度告诉用户。

