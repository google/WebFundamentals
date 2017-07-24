project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 裝置動作和定位事件能存取行動裝置中內建的加速計、陀螺儀和羅盤。

{# wf_updated_on: 2017-07-17 #}
{# wf_published_on: 2000-01-01 #}

# 裝置定向 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


裝置動作和定位事件能存取行動裝置中內建的加速計、陀螺儀和羅盤。

這些事件可用於多種用途；
例如在遊戲中要控制角色的方向，或判斷角色應該跳多高。
 當用於 GeoLocation 時，它可以建立更精確的逐向式導航系統，
或提供有關商店所在的資訊。

Note: 決定要使裝置動作或裝置定向事件時，請<b>極為</b>謹慎。  遺憾的是，並非所有瀏覽器都使用相同的座標系統，並可能會在類似情況下回報不同的值。

## 哪一端朝上？

要使用裝置定向和動作事件所傳回的資料，
理解所提供的值很重要。  

### 地球座標視框。

以 `X`、`Y` 與 `Z` 值所描述的地球座標視框，
是根據重力和標準的磁性定向對準。

<ul>
  <li>
    <b>X：</b>代表東西方向 (其中東是正值)。
  </li>
    <li>
    <b>Y：</b>代表南北方向 (北是正值)。
  </li>
    <li>
    <b>Z：</b>表示上下方向，
垂直於地面 (其中上是正值)。
  </li>
</ul>

### 裝置座標框架的圖例

以 `x`、`y` 與 `z` 值所描述的裝置座標框架，
是根據裝置中心對準。

<img src="images/axes.png" alt="裝置座標框架的圖例">
<!-- 特別感謝 Sheppy (https://developer.mozilla.org/en-US/profiles/Sheppy){: .external} 
提供其公共版權的影像。 -->

<ul>
  <li>
    <b>x：</b>在螢幕平面上，往右為正值。
  </li>
    <li>
    <b>y：</b>在螢幕平面上，往上為正值。
  </li>
    <li>
    <b>z：</b>垂直於螢幕或鍵盤，
遠離為正值。
  </li>
</ul>

在手機或平板電腦上，
裝置定向是基於螢幕的典型定向。螢幕方向螢幕方向  對於手機和平板電腦而言，
它則是基於垂直模式下的裝置。 對於桌上型電腦或筆記型電腦，
定向是考慮與鍵盤的相對位置。

### 旋轉資料

旋轉資料會被傳回為 [尤拉角] (http://en.wikipedia.org/wiki/Euler_angles){: .external}，
代表裝置的座標框架與地球座標框架之間差異的角度數字。


<figure>
  <img src="images/alpha.png">
  <figcaption>
    <b>alpha:</b> 繞著 z 軸的旋轉角度，在裝置頂部直接指北時為 0&deg;。
  逆時針方向旋轉的設備價值就增加了。`alpha`
  </figcaption>
</figure>
<figure>
  <img src="images/beta.png">
  <figcaption>
    <b>beta:</b> 繞著 x 軸的旋轉，在裝置頂部與底部和地球表面等距時為 0&deg;。
 裝置頂部倒向地球表面時，
此值會增加。
  </figcaption>
</figure>
<figure>
  <img src="images/gamma.png">
  <figcaption>
    <b>gamma:</b> 繞著 y 軸的旋轉，當裝置左右側和地球表面等距時為 0&deg;。
  右側倒向地球表面時，
此值會增加。 
  </figcaption>
</figure>




## 裝置定向 




裝置定向事件會傳回旋轉資料，此資料包含裝置的前後與左右傾斜程度，以及電話或筆記型電腦是否具有羅盤、裝置面對的方向。


### TL;DR {: .hide-from-toc }
- 請保守使用。
- 支援測試。
- 不要每次定向事件就更新 UI；反之請同步至 requestAnimationFrame。


### 使用裝置定位事件的時機

裝置定向事件有幾個用途。  例如：

<ul>
  <li>當使用者移動時更新地圖。</li>
  <li>細微的 UI 調校，例如新增視差效果。</li>
  <li>結合地理位置，可用於逐向式導航。</li>
</ul>

### 查看支援並接聽事件

若要接聽 `DeviceOrientationEvent`，
首先請查看瀏覽器是否支援這些事件。  然後，將事件接聽器附加到 `window` 
 物件，接聽 `deviceorientation` 物件。 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/native-hardware/device-orientation/_code/dev-orientation.html" region_tag="devori"   adjust_indentation="auto" %}
</pre>

### 處理裝置定位事件

當裝置移動或變更方向時，
裝置定位事件會觸發。  它會傳回裝置在目前位置相對於
 <a href="index.html#earth-coordinate-frame"> 之間差異的資料
地球座標視框</a>。

此事件通常會傳回三個屬性，
<a href="index.html#rotation-data">`alpha`</a>、
<a href="index.html#rotation-data">`beta`</a>和
<a href="index.html#rotation-data">`gamma`</a>。  在 Mobile Safari 上，
額外參數<a href="https://developer.apple.com/library/safari/documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/DeviceOrientationEvent/DeviceOrientationEvent.html">`webkitCompassHeading`</a>會與羅盤標題一起傳回
。




## 裝置動作 




裝置動作提供在特定時刻套用在裝置身上的加速度，以及旋轉速度的資訊。


### TL;DR {: .hide-from-toc }
- 在需要裝置的目前動作時，使用裝置動作。
- `rotationRate` 是以 &deg;/sec 為單位呈現。
- `acceleration` 和 `accelerationWithGravity` 是以 m/sec<sup>2</sup> 為單位呈現。
- 請注意瀏覽器實作之間的差異。


### 使用裝置動作事件的時機

裝置動作事件有有幾個用途。  例如：

<ul>
  <li>搖晃手勢以重新整理資料。</li>
  <li>在遊戲中導致角色跳躍或移動。</li>
  <li>針對健康和健身的應用程式</li>
</ul>

### 查看支援並接聽事件

要接聽 `DeviceMotionEvent`，
首先查看瀏覽器是否支援這些事件。  然後，將事件接聽器附加到 `window` 
 物件，接聽 `devicemotion` 物件。 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/native-hardware/device-orientation/_code/jump-test.html" region_tag="devmot"   adjust_indentation="auto" %}
</pre>

### 處理裝置動作事件

裝置動作事件會以規律周期觸發，
並及時在當下傳回關於裝置的旋轉 (每秒 &deg; 次) 和加速度 (單位為 m/sec<sup>2</sup>) 的資料。
  某些裝置沒有必要硬體，
可以排除重力的作用。

此事件會返回四個屬性、
<a href="index.html#device-frame-coordinate">`accelerationIncludingGravity`</a>、
<a href="index.html#device-frame-coordinate">`acceleration`</a>
 (排除重力的影響)、
<a href="index.html#rotation-data">`rotationRate`</a>和`interval`。

例如，讓我們看看手機放在平坦桌面上，
螢幕朝上。

<table>
    <thead>
    <tr>
      <th data-th="State">狀態</th>
      <th data-th="Rotation">旋轉</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">加速度 (m/s<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">帶重力的加速度 (m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">不移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 0, 9.8]</td>
    </tr>
    <tr>
      <td data-th="State">往天空移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 5]</td>
      <td data-th="Acceleration with gravity">[0, 0, 14.81]</td>
    </tr>
    <tr>
      <td data-th="State">只向右移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 0, 9.81]</td>
    </tr>
    <tr>
      <td data-th="State">往上移動&amp;向右</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 0, 5]</td>
      <td data-th="Acceleration with gravity">[5, 0, 14.81]</td>
    </tr>
  </tbody>
</table>

反之，如果手持電話時，螢幕垂直於地面，
並直接面對檢視者：

<table>
    <thead>
    <tr>
      <th data-th="State">狀態</th>
      <th data-th="Rotation">旋轉</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">加速度 (m/s<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">帶重力的加速度 (m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">不移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 9.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">往天空移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 5, 0]</td>
      <td data-th="Acceleration with gravity">[0, 14.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">只向右移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 9.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">往上移動&amp;向右</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 5, 0]</td>
      <td data-th="Acceleration with gravity">[5, 14.81, 0]</td>
    </tr>
  </tbody>
</table>

#### 範例：計算物件的最大加速度

使用裝置動作事件的一種方法是計算物件的最大加速度。
  例如，一個人跳躍的最大加速度為何。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/native-hardware/device-orientation/_code/jump-test.html" region_tag="devmothand"   adjust_indentation="auto" %}
</pre>

在點選「執行！」按鈕後，使用者被告知要跳躍！在這段時間中，
頁面會儲存最大 (和最小) 的加速度值，並在跳躍後，
告知使用者他們的最大加速度。

