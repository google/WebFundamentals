project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:由于大多数桌面设备都没有触摸屏、GPS 芯片和加速度计，所以测试它们比较困难。Chrome DevTools 传感器模拟器可以通过模拟常见的移动设备传感器来降低测试的开销。

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-04-13 #}

# 模拟传感器：地理定位与加速度计 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

由于大多数桌面设备都没有 GPS 芯片和加速度计，所以测试它们比较困难。Chrome DevTools 的 Sensors 模拟窗格可以通过模拟常见的移动设备传感器来降低测试的开销。


### TL;DR {: .hide-from-toc }
- 模拟地理定位坐标以测试地理定位替换值。
- 模拟设备方向以测试加速度计数据。


## 访问传感器控件

<div class="wf-devtools-flex">
  <div>
    <p>要访问 Chrome DevTools 传感器控件，请执行以下操作：</p>
    <ol>
      <li>打开 DevTools 主菜单</li>
      <li>在 <strong>More Tools</strong> 菜单下，点击 <strong>Sensors</strong></li>
    </ol>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/navigate-to-sensors.png" alt="导航至 Sensors 面板">
  </div>
</div>

注：如果您的应用检测到使用 JavaScript（如 Modernizr）的传感器加载，请确保在启用传感器模拟器之后重新加载页面。

## 替换地理定位数据

与桌面设备不同，移动设备通常使用 GPS 硬件检测位置。在 Sensors 窗格中，您可以模拟地理定位坐标，以便与 <a href='http://www.w3.org/TR/geolocation-API/'>Geolocation API</a> 结合使用。

<div class="wf-devtools-flex">
  <div>
    <p>在模拟抽屉式导航栏的 Sensors 窗格中选中 <strong>Emulate geolocation coordinates</strong> 复选框，启用地理定位模拟。</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-geolocation.png" alt="已启用的地理定位模拟器">
  </div>
</div>

您可以使用此模拟器替换 `navigator.geolocation` 的位置值，并在地理定位数据不可用时模拟用例。

## 模拟加速度计（设备方向）

<div class="wf-devtools-flex">
  <div>
    <p>要测试来自 <a href='http://www.w3.org/TR/screen-orientation/'>Orientation API</a> 的加速度计数据，请在 Sensors 窗格中选中 <strong>Accelerometer</strong> 复选框，启用加速度计模拟器。</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-accelerometer.png" alt="加速度计控件">
  </div>
</div>

您可以操作下列方向参数：

<dl>
<dt><abbr title="alpha">α</abbr></dt>
<dd>围绕 Z 轴旋转。</dd>
<dt><abbr title="beta">β</abbr></dt>
<dd>左右倾斜。</dd>
<dt><abbr title="gamma">γ</abbr></dt>
<dd>前后倾斜。</dd>
</dl>

您也可以点击模型加速度计并将其拖动到所需方向。

使用此[设备方向演示](http://googlesamples.github.io/web-fundamentals/fundamentals/native-hardware/device-orientation/dev-orientation.html)试用加速度计模拟器。




{# wf_devsite_translation #}
