---
title: "裝置動作"
description: "裝置動作提供在特定時刻套用在裝置身上的加速度，以及旋轉速度的資訊。"
updated_on: 2014-10-21
key-takeaways:
  devmotion: 
    - 在需要裝置的目前動作時，使用裝置動作。
    - <code>rotationRate</code> 是以 &deg;/sec 為單位呈現。
    - <code>acceleration</code> 和 <code>accelerationWithGravity</code> 是以 m/sec<sup>2</sup> 為單位呈現。
    - 請注意瀏覽器實作之間的差異。
---

<p class="intro">
  裝置動作提供在特定時刻套用在裝置身上的加速度，以及旋轉速度的資訊。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.devmotion %}

## 使用裝置動作事件的時機

裝置動作事件有有幾個用途。  例如：

<ul>
  <li>搖晃手勢以重新整理資料。</li>
  <li>在遊戲中導致角色跳躍或移動。</li>
  <li>針對健康和健身的應用程式</li>
</ul>

## 查看支援並接聽事件

要接聽 `DeviceMotionEvent`，
首先查看瀏覽器是否支援這些事件。  然後，將事件接聽器附加到 `window` 
 物件，接聽 `devicemotion` 物件。 

{% include_code src=_code/jump-test.html snippet=devmot lang=javascript %}

## 處理裝置動作事件

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

<table class="mdl-data-table mdl-js-data-table">
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

<table class="mdl-data-table mdl-js-data-table">
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

### 範例：計算物件的最大加速度

使用裝置動作事件的一種方法是計算物件的最大加速度。
  例如，一個人跳躍的最大加速度為何。


{% include_code src=_code/jump-test.html snippet=devmothand lang=javascript %}

在點選「執行！」按鈕後，使用者被告知要跳躍！在這段時間中，
頁面會儲存最大 (和最小) 的加速度值，並在跳躍後，
告知使用者他們的最大加速度。

