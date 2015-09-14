---
title: "端末のモーション"
description: "端末モーションは、特定の瞬間にデバイスに適用された アクセラレーション の力に関する情報と、回転速度の情報を提供します。"
updated_on: 2014-10-21
key-takeaways:
  devmotion: 
    - "端末の現在の動作が必要な場合に、端末モーションを使用します。"
    - "<code>rotationRate</code> が &deg;/sec で提供されます。"
    - "<code>acceleration</code> および <code>accelerationWithGravity</code> は m/sec<sup>2</sup> で提供されます。"
    - "ブラウザの実装の違いに注意してください。"
---

<p class="intro">
  端末モーションは、特定の瞬間にデバイスに適用された アクセラレーション の力に関する情報と、回転速度の情報を提供します。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.devmotion %}

## 端末モーション イベントの用途

端末モーション イベントにはいくつかの用途があります。  次に例を示します。

<ul>
  <li>データをリフレッシュためのシェイク操作。</li>
  <li>ゲームでキャラクターをジャンプさせたり動かす。</li>
  <li>健康およびフィットネス用アプリ</li>
</ul>

## サポートを確認して、イベントをリッスンする

`DeviceMotionEvent` をリッスンするには、先ず最初に、イベントがブラウザでサポートされている
ことを確認します。  次に、`devicemotion` イベントを受け取る `window` 
オブジェクトにイベント リスナーを添付します。 

{% include_code src=_code/jump-test.html snippet=devmot lang=javascript %}

## 端末モーション イベントの扱い

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

<table class="mdl-data-table mdl-js-data-table">
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

<table class="mdl-data-table mdl-js-data-table">
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

### サンプル:オブジェクトの最大加速度の計算

端末モーション イベントの 1 つの用途として、オブジェクトの最大加速度を
計算することができます。  たとえば、人がジャンプする際の
最大加速度です。

{% include_code src=_code/jump-test.html snippet=devmothand lang=javascript %}

[Go!] ボタンをタップした後、ユーザーにジャンプを指示します。この間、
ページは最大 (および最小) 加速度値を記憶します。そしてジャンプの後、
ユーザーに最大加速度を報告します。

