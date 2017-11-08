project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 端末のモーション イベントおよび画面の向きのイベントによって、モバイル端末に組み込まれた加速度計、ジャイロスコープ、およびコンパスの機能を利用することができます。

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-06-17 #}

# 端末画面の向きと端末のモーション {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

端末のモーション イベントおよび画面の向きのイベントによって、モバイル端末に組み込まれた加速度計、ジャイロスコープ、およびコンパスの機能を利用することができます。

これらのイベントにはさまざまな用途があり、ゲームでキャラクターの向きやアクションを制御することもできます。
位置情報とあわせて使用すると、より正確なターンバイターンのナビゲーションの作成や、特定の場所に関する情報提供が可能になります。

Warning: ブラウザによって使用する座標系は異なり、同じ状況下でも別の値が返される場合があります。この問題は徐々に改善されていますが、自身の状況で必ずテストを実施してください。

##TL;DR

- 端末の上端を検出し、端末の回転状態を特定します。
- 端末のモーション イベントおよび画面の向きのイベントに応答するタイミングと方法について説明します。

## どちらの端が上か？

端末のモーション イベントおよび画面の向きのイベントによって返されるデータを使用するためには、その値の意味を理解する必要があります。

### 地球の座標フレーム

地球座標フレームでは、重力と標準的な磁北方向を基準とした軸を用いて、`X`、`Y`、および `Z` の値で座標を記述します。


<table class="responsive">
<tr><th colspan="2">座標系</th></tr>
<tr>
  <td><code>X</code></td>
  <td>東西方向を表します（東が正）。</td>
</tr>
<tr>
  <td><code>Y</code></td>
  <td>南北方向を表します（北が正）。</td>
</tr>
<tr>
  <td><code>Z</code></td>
  <td>地面に対して垂直な上下方向を表します（上が正）。</td>
</tr>
</table>


### 端末の座標フレーム


<div class="attempt-right">
  <figure id="fig1">
    <img src="images/axes.png" alt="端末の座標フレームの図">
    <figcaption>
      端末の座標フレームの図</figcaption>
  </figure>
</div>



<!-- Special thanks to Sheppy (https://developer.mozilla.org/en-US/profiles/Sheppy)
  for his images which are in the public domain. -->


端末の座標フレームでは、端末の中心を基準とした軸を用いて、`x`、`y`、および `z` の値で座標を記述します。


<table class="responsive">
<tr><th colspan="2">座標系</th></tr>
<tr>
  <td><code>X</code></td>
  <td>画面の水平面において右方向が正。</td>
</tr>
<tr>
  <td><code>Y</code></td>
  <td>画面の水平面において上方向が正。</td>
</tr>
<tr>
  <td><code>Z</code></td>
  <td>画面またはキーボードに直交して遠ざかる方向が正。</td>
</tr>
</table>


携帯電話やタブレットでは、端末の向きは画面の典型的な向きを基準とします。
携帯電話やタブレットの場合、端末が縦表示になっている状態を基準とします。
デスクトップまたはラップトップ コンピュータの場合は、画面の向きはキーボードに対する向きとして考えられます。

### 回転データ

回転データは[オイラー角](https://en.wikipedia.org/wiki/Euler_angles)で返されます。これは、端末の座標フレームと地球の座標フレーム間の角度の差を表します。

#### alpha


<div class="attempt-right">
  <figure id="fig1">
    <img src="images/alpha.png" alt="端末の座標フレームの図">
    <figcaption>
      端末の座標フレームにおける alpha の図</figcaption>
  </figure>
</div>


回転軸は Z 軸です。端末の上部が真北を向いている場合、`alpha` の値は 0° です。
端末が反時計回りに回転するにつれて `alpha` の値は増加します。


<div style="clear:both;"></div>


#### beta


<div class="attempt-right">
  <figure id="fig1">
    <img src="images/beta.png" alt="端末の座標フレームの図">
    <figcaption>
      端末の座標フレームにおける beta の図</figcaption>
  </figure>
</div>


回転軸は X 軸です。端末の上部と下部が地表から等距離にある場合、`beta` の値は 0° です。
端末の上部が地表に近づくように傾くにつれて、値が増加します。


<div style="clear:both;"></div>


#### gamma


<div class="attempt-right">
  <figure id="fig1">
    <img src="images/gamma.png" alt="端末の座標フレームの図">
    <figcaption>
      端末の座標フレームの gamma の図</figcaption>
  </figure>
</div>


回転軸は Y 軸です。端末の左端と右端が地表から等距離にある場合、`gamma` の値は 0° です。
端末の右端が地表に近づくように傾くにつれて、値が増加します。


<div style="clear:both;"></div>


## 端末画面の向き

端末画面の向きのイベントは回転データを返します。このデータには、端末の前後および左右への傾き具合、スマートフォンやノートパソコンにおけるコンパスの有無、端末画面の方向など、さまざまな情報が含まれます。

端末画面の向きのイベントは慎重に使用し、利用するにあたってテストを実施してください。また、このイベントが発生するたびに UI を更新することは避けて、代わりに `requestAnimationFrame` に同期するようにしてください。

### 端末画面の向きのイベントの扱い

端末画面の向きのイベントにはいくつかの用途があります。以下に例を挙げます。

- ユーザーの移動に伴いマップを更新します。
- 視差効果の追加など、UI の細かい調整を行います。
- 位置情報と組み合わせると、ターンバイターンのナビゲーションに使用できます。

### サポート状況を確認して、イベントをリッスンする

`DeviceOrientationEvent` をリッスンするには、まずこのイベントがブラウザでサポートされていることを確認します。次に、`deviceorientation` イベントを受け取る `window` オブジェクトにイベント リスナーを登録します。

```
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', deviceOrientationHandler, false);
  document.getElementById("doeSupported").innerText = "Supported!";
}
```

### 端末画面の向きのイベントを処理する

端末画面の向きのイベントは、端末の位置や向きが変化したときに発生します。
このイベントは、[地球の座標フレーム](#earth-coordinate-frame)を基準として、端末の現在位置の変化量を返します。

このイベントは通常、[`alpha`](#alpha)、[`beta`](#beta)、および [`gamma`](#gamma) の3 つのプロパティを返します。
Mobile Safari では、追加のパラメータ [`webkitCompassHeading`](https://developer.apple.com/library/ios/documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/){: .external } がコンパス方位とともに返されます。

## 端末のモーション

端末画面の向きのイベントは回転データを返します。このデータには、端末の前後および左右への傾き具合、スマートフォンやノートパソコンにおけるコンパスの有無、端末画面の方向など、さまざまな情報が含まれます。

一方、端末の現在の動きを知りたい場合は、端末のモーション イベントを使用します。`rotationRate` は °/sec 単位で、`acceleration` と `accelerationWithGravity` は m/sec<sup>2</sup> 単位で提供されます。ブラウザによって実装に差異があるので注意してください。

### 端末モーション イベントの用途

端末モーション イベントにはいくつかの用途があります。以下に例を挙げます。

- データを更新するためのシェイク操作。
- ゲームでキャラクターをジャンプさせたり動かしたりする。
- 健康およびフィットネス用のアプリに使用する。

### サポート状況を確認して、イベントをリッスンする

`DeviceMotionEvent` をリッスンするには、まずこのイベントがブラウザでサポートされていることを確認します。
次に、`devicemotion` イベントをリッスンする `window` オブジェクトにイベント リスナーを登録します。

```
if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', deviceMotionHandler);
  setTimeout(stopJump, 3*1000);
}
```

### 端末モーション イベントの扱い

端末のモーション イベントは一定間隔で発生し、その時点での端末の回転（°/sec）および加速度（m/sec<sup>2</sup>）のデータを返します。一部の端末では、重力の影響を除外するためのハードウェアを備えていません。

このイベントは、[`accelerationIncludingGravity`](#device-coordinate-frame)、[`acceleration`](#device-coordinate-frame)（重力の影響を排除）、[`rotationRate`](#rotation-data)、および `interval` の 4 つのプロパティを返します。

たとえば、平らなテーブルの上に、画面が上を向くように置かれているスマートフォンでは、以下の値になります。


<table>
  <thead>
    <tr>
      <th data-th="State">状態</th>
      <th data-th="Rotation">回転</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">Acceleration (m/s<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">Acceleration with gravity (m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">移動していない</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 0, 9.8]</td>
    </tr>
    <tr>
      <td data-th="State">空に向かって上方向に移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 5]</td>
      <td data-th="Acceleration with gravity">[0, 0, 14.81]</td>
    </tr>
    <tr>
      <td data-th="State">右方向へのみ移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 0, 9.81]</td>
    </tr>
    <tr>
      <td data-th="State">上方向と右方向に移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 0, 5]</td>
      <td data-th="Acceleration with gravity">[5, 0, 14.81]</td>
    </tr>
  </tbody>
</table>


以下は、携帯電話の画面が地面に対して垂直になるように保持し、ユーザーに直接画面が見える向きにした場合の値です。


<table>
  <thead>
    <tr>
      <th data-th="State">状態</th>
      <th data-th="Rotation">回転</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">Acceleration (m/s<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">Acceleration with gravity (m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">移動していない</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 9.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">空に向かって上方向に移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 5, 0]</td>
      <td data-th="Acceleration with gravity">[0, 14.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">右方向へのみ移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 9.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">上方向と右方向に移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 5, 0]</td>
      <td data-th="Acceleration with gravity">[5, 14.81, 0]</td>
    </tr>
  </tbody>
</table>


### サンプル: オブジェクトの最大加速度の計算

端末モーション イベントの 1 つの用途として、オブジェクトの最大加速度を計算することができます。
たとえば、人がジャンプする際の最大加速度を求めることも可能です。

```
if (evt.acceleration.x > jumpMax.x) {
  jumpMax.x = evt.acceleration.x;
}
if (evt.acceleration.y > jumpMax.y) {
  jumpMax.y = evt.acceleration.y;
}
if (evt.acceleration.z > jumpMax.z) {
  jumpMax.z = evt.acceleration.z;
}
```

[Go!] ボタンをタップした後、ユーザーにジャンプするよう指示します。この間、ページは最大（および最小）加速度値を記憶します。そしてジャンプの後、ユーザーに最大加速度を表示します。
