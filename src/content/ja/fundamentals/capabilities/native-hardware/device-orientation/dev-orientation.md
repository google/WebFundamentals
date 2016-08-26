project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 端末画面の向きのイベントは回転データを返しますが、それには端末が前面から背面への傾斜、 両側面への傾斜、携帯電話やノート パソコンのコンパスの有無、 端末画面の向きなどの情報が含まれています。

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# 端末画面の向き {: .page-title }

{% include "_shared/contributors/TODO.html" %}



端末画面の向きのイベントは回転データを返しますが、それには端末が前面から背面への傾斜、 両側面への傾斜、携帯電話やノート パソコンのコンパスの有無、端末画面の向きなどの情報が含まれています。


## TL;DR {: .hide-from-toc }
- 慎重に使用してください。
- サポートをテストしてください。
- すべての orientation イベントで UI をアップデートしないでください。代わりに、<code>requestAnimationFrame</code> に同期します。


## device orientation イベントの用途

device orientation イベントにはいくつかの用途があります。  次に例を示します。

<ul>
  <li>ユーザーの移動に伴いマップをアップデートします。</li>
  <li>視差効果の追加など、UI の微妙な調整を行います。</li>
  <li>GeoLocation と組み合わせて、ターンバイターン ナビゲーションに使用します。</li>
</ul>

## サポートを確認して、イベントをリッスンする

`DeviceOrientationEvent` をリッスンするには、先ず最初に、イベントがブラウザでサポートされている
ことを確認します。  次に、`deviceorientation` イベントを受け取る `window` 
オブジェクトにイベント リスナーを添付します。 

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/capabilities/native-hardware/device-orientation/_code/dev-orientation.html" region_tag="devori" lang=javascript %}
</pre>

## device orientation イベントの扱い

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


