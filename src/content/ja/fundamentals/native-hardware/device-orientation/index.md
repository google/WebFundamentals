project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 端末モーションと画面の向きのイベントによって、モバイルデバイスに組み込まれた加速度計、ジャイロスコープ、およびコンパスへアクセスすることができます。

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# 端末画面の向き {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}


端末モーションと画面の向きのイベントによって、モバイルデバイスに組み込まれた加速度計、ジャイロスコープ、およびコンパスへアクセスすることができます。

これらのイベントは多くの目的のために使用することができます。
たとえばゲームでは、キャラクターの向きを制御したり、キャラクターがジャンプする高さを
決定するために使用します。 GeoLocation と共に使用する際には、より正確なターンバイターンのナビゲーションシステム
を作成したり、店の場所に関する情報を提供することができます。

Note: device motion イベントまたは device orientation イベントの使用を決定する際には、<b>最大限に</b>注意を払ってください。  残念ながら、すべてのブラウザが同じ座標系を 使用するとは限りません。また、同じような状況の下で別の値が 報告されることがあります。

## どちらの端が上か?

device orientation イベントや motion イベントによって返されたデータを使用するためには、
提供される値を理解することが重要です。  

### 地球の座標フレーム

地球の座標フレームは `X`、`Y`、および `Z` の値によって記述され、
重力と標準磁気の向きに基づいて配列されます。

<ul>
  <li>
    <b>X:</b> は東西方向を表します (東が正)。
  </li>
    <li>
    <b>Y:</b> は南北方向を表します (北が正)。
  </li>
    <li>
    <b>Z:</b> 地面に対して垂直上下方向を表します
    (上が正)。
  </li>
</ul>

### 端末の座標フレーム

端末の座標フレームは `x`、`y`、および `z` の値によって記述され、
端末の中心に基づいて配列されます。

<img src="images/axes.png" alt=" 端末の座標フレームの図">
<!-- Sheppy の(https://developer.mozilla.org/en-US/profiles/Sheppy) 
  パブリックドメインへの画像投稿に感謝します。 -->

<ul>
  <li>
    <b>x:</b> 画面の平面、右方向が正。
  </li>
    <li>
    <b>y:</b> 画面の平面、上方向が正。
  </li>
    <li>
    <b>z:</b> 画面またはキーボードに対して垂直、延びている方向が
    正。
  </li>
</ul>

携帯電話やタブレットで、端末の向きは画面の典型的な向き
に準じています。  携帯電話やタブレットで、縦表示の端末
に準じています。 デスクトップまたはラップトップ コンピュータの場合は、画面の向きはキーボードとの関連性で
考慮されます。

### 回転データ

回転データは [Euler angle](http://en.wikipedia.org/wiki/Euler_angles) として返されます。
これは、端末の座標フレームと地球は座標フレーム間の
f差異度の数を表します。

<div>
  <div class="g--third">
    <img src="images/alpha.png"><br>
    <b>アルファ:</b> Z 軸周りの回転は、端末上部が
真北に向いている場合 0 &deg;です。  端末が反時計回りに回転するにつれて
    `alpha` 値が増加します。
  </div>
  <div class="g--third">
    <img src="images/beta.png"><br>
    <b>ベータ:</b> X 軸周りの回転は、端末の上部と底部が地球の
表面から等距離にある場合 0 &deg;です。 端末の上部が
地球の表面に向かって傾斜するにつれて、値が増加します。
  </div>
  <div class="g--third g--last">
    <img src="images/gamma.png"><br>
    <b>ガンマ:</b> Y 軸周りの回転は、端末の左端と右端が地球の
表面から等距離にある場合 0 &deg;です。  端末の右端が
地球の表面に向かって傾斜するにつれて、値が増加します。 
  </div>
</div>

<div style="clear:both;"></div>





## 端末画面の向き 




端末画面の向きのイベントは回転データを返しますが、それには端末が前面から背面への傾斜、 両側面への傾斜、携帯電話やノート パソコンのコンパスの有無、端末画面の向きなどの情報が含まれています。


### TL;DR {: .hide-from-toc }
- 慎重に使用してください。
- サポートをテストしてください。
- すべての orientation イベントで UI をアップデートしないでください。代わりに、<code>requestAnimationFrame</code> に同期します。


### device orientation イベントの用途

device orientation イベントにはいくつかの用途があります。  次に例を示します。

<ul>
  <li>ユーザーの移動に伴いマップをアップデートします。</li>
  <li>視差効果の追加など、UI の微妙な調整を行います。</li>
  <li>GeoLocation と組み合わせて、ターンバイターン ナビゲーションに使用します。</li>
</ul>

### サポートを確認して、イベントをリッスンする

`DeviceOrientationEvent` をリッスンするには、先ず最初に、イベントがブラウザでサポートされている
ことを確認します。  次に、`deviceorientation` イベントを受け取る `window` 
オブジェクトにイベント リスナーを添付します。 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/capabilities/native-hardware/device-orientation/_code/dev-orientation.html" region_tag="devori"   adjust_indentation="auto" %}
</pre>

### device orientation イベントの扱い

device orientation イベントは、端末が移動したり、向きが
変わったときに起動します。  このイベントは、<a href="index.html#earth-coordinate-frame"> に関連して、
現在の位置にある端末との間の差分データを返します。
地球の座標フレーム</a>。

このイベントは通常 3 つのプロパティを返します。 
<a href="index.html#rotation-data">`alpha`</a>、
<a href="index.html#rotation-data">`beta`</a>、および 
<a href="index.html#rotation-data">`gamma`</a>です。  Mobile Safari では、
別のパラメータ<a href="https://developer.apple.com/library/safari/documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/DeviceOrientationEvent/DeviceOrientationEvent.html">`webkitCompassHeading`</a> がコンパスの
ヘッダーとともに返されます。




## 端末のモーション 




端末モーションは、特定の瞬間にデバイスに適用された アクセラレーション の力に関する情報と、回転速度の情報を提供します。


### TL;DR {: .hide-from-toc }
- 端末の現在の動作が必要な場合に、端末モーションを使用します。
- <code>rotationRate</code> が &deg;/sec で提供されます。
- <code>acceleration</code> および <code>accelerationWithGravity</code> は m/sec<sup>2</sup> で提供されます。
- ブラウザの実装の違いに注意してください。


### 端末モーション イベントの用途

端末モーション イベントにはいくつかの用途があります。  次に例を示します。

<ul>
  <li>データをリフレッシュためのシェイク操作。</li>
  <li>ゲームでキャラクターをジャンプさせたり動かす。</li>
  <li>健康およびフィットネス用アプリ</li>
</ul>

### サポートを確認して、イベントをリッスンする

`DeviceMotionEvent` をリッスンするには、先ず最初に、イベントがブラウザでサポートされている
ことを確認します。  次に、`devicemotion` イベントを受け取る `window` 
オブジェクトにイベント リスナーを添付します。 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/capabilities/native-hardware/device-orientation/_code/jump-test.html" region_tag="devmot"   adjust_indentation="auto" %}
</pre>

### 端末モーション イベントの扱い

端末モーション イベントは定期的に起動し、端末の
回転 (&deg;/秒) およびアクセラレーション (m/秒<sup>2</sup>) 
のデータを瞬時に返します。  一部の端末では、重力の影響を除外するための
ハードウェアを備えていません。

イベントは 4 つのプロパティを返します。 
<a href="index.html#device-frame-coordinate">`accelerationIncludingGravity`</a>、 
<a href="index.html#device-frame-coordinate">`acceleration`</a>、 
重力の影響を排除、 
<a href="index.html#rotation-data">`rotationRate`</a> および `interval` です。

たとえば、平らなテーブルの上に画面を上にして置かれている
携帯電話で見てみましょう。

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
      <td data-th="State">空に向かって移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 5]</td>
      <td data-th="Acceleration with gravity">[0, 0, 14.81]</td>
    </tr>
    <tr>
      <td data-th="State">右方向へのみ移動 </td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 0, 9.81]</td>
    </tr>
    <tr>
      <td data-th="State">右上方向へ &amp; 移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 0, 5]</td>
      <td data-th="Acceleration with gravity">[5, 0, 14.81]</td>
    </tr>
  </tbody>
</table>

逆に、携帯電話の画面が地面に対して垂直になるよう
に保持し、直接画面を視ることができる場合:

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
      <td data-th="State">空に向かって移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 5, 0]</td>
      <td data-th="Acceleration with gravity">[0, 14.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">右方向へのみ移動 </td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 9.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">右上方向へ &amp; 移動</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 5, 0]</td>
      <td data-th="Acceleration with gravity">[5, 14.81, 0]</td>
    </tr>
  </tbody>
</table>

#### サンプル:オブジェクトの最大加速度の計算

端末モーション イベントの 1 つの用途として、オブジェクトの最大加速度を
計算することができます。  たとえば、人がジャンプする際の
最大加速度です。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/capabilities/native-hardware/device-orientation/_code/jump-test.html" region_tag="devmothand"   adjust_indentation="auto" %}
</pre>

[Go!] ボタンをタップした後、ユーザーにジャンプを指示します。この間、
ページは最大 (および最小) 加速度値を記憶します。そしてジャンプの後、
ユーザーに最大加速度を報告します。

