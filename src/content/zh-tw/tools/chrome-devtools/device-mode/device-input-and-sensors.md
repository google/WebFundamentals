project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:由於大多數桌面設備都沒有觸摸屏、GPS 芯片和加速度計，所以測試它們比較困難。Chrome DevTools 傳感器模擬器可以通過模擬常見的移動設備傳感器來降低測試的開銷。

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2015-04-13 #}

# 模擬傳感器：地理定位與加速度計 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

由於大多數桌面設備都沒有 GPS 芯片和加速度計，所以測試它們比較困難。Chrome DevTools 的 Sensors 模擬窗格可以通過模擬常見的移動設備傳感器來降低測試的開銷。


### TL;DR {: .hide-from-toc }
- 模擬地理定位座標以測試地理定位替換值。
- 模擬設備方向以測試加速度計數據。


## 訪問傳感器控件

<div class="wf-devtools-flex">
  <div>
    <p>要訪問 Chrome DevTools 傳感器控件，請執行以下操作：</p>
    <ol>
      <li>打開 DevTools 主菜單</li>
      <li>在 <strong>More Tools</strong> 菜單下，點擊 <strong>Sensors</strong></li>
    </ol>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/navigate-to-sensors.png" alt="導航至 Sensors 面板">
  </div>
</div>

Note: 如果您的應用檢測到使用 JavaScript（如 Modernizr）的傳感器加載，請確保在啓用傳感器模擬器之後重新加載頁面。

## 替換地理定位數據

與桌面設備不同，移動設備通常使用 GPS 硬件檢測位置。在 Sensors 窗格中，您可以模擬地理定位座標，以便與 <a href='http://www.w3.org/TR/geolocation-API/'>Geolocation API</a> 結合使用。

<div class="wf-devtools-flex">
  <div>
    <p>在模擬抽屜式導航欄的 Sensors 窗格中選中 <strong>Emulate geolocation coordinates</strong> 複選框，啓用地理定位模擬。</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-geolocation.png" alt="已啓用的地理定位模擬器">
  </div>
</div>

您可以使用此模擬器替換 `navigator.geolocation` 的位置值，並在地理定位數據不可用時模擬用例。

## 模擬加速度計（設備方向）

<div class="wf-devtools-flex">
  <div>
    <p>要測試來自 <a href='http://www.w3.org/TR/screen-orientation/'>Orientation API</a> 的加速度計數據，請在 Sensors 窗格中選中 <strong>Accelerometer</strong> 複選框，啓用加速度計模擬器。</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-accelerometer.png" alt="加速度計控件">
  </div>
</div>

您可以操作下列方向參數：

<dl>
<dt><abbr title="alpha">α</abbr></dt>
<dd>圍繞 Z 軸旋轉。</dd>
<dt><abbr title="beta">β</abbr></dt>
<dd>左右傾斜。</dd>
<dt><abbr title="gamma">γ</abbr></dt>
<dd>前後傾斜。</dd>
</dl>

您也可以點擊模型加速度計並將其拖動到所需方向。

使用此[設備方向演示](http://googlesamples.github.io/web-fundamentals/fundamentals/native-hardware/device-orientation/dev-orientation.html)試用加速度計模擬器。




{# wf_devsite_translation #}
