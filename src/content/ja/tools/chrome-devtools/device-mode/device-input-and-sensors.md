project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: タッチ スクリーン、GPS チップ、および加速度計は、ほとんどの PC に搭載されていないので、テストが難しい場合があります。Chrome DevTools センサー エミュレータでは、一般的なモバイル端末センサーをエミュレートすることによって、テストのオーバーヘッドを削減できます。

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-04-13 #}

# センサーのエミュレート: 位置情報と加速度計 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

GPS チップと加速度計は、ほとんどの PC に搭載されていないので、テストが難しい場合があります。Chrome DevTools のセンサー エミュレーション ペインでは、一般的なモバイル端末センサーをエミュレートすることによって、テストのオーバーヘッドを削減できます。


### TL;DR {: .hide-from-toc }
- 位置情報の座標をエミュレートして位置情報のオーバーライドをテストします。
- 端末画面の向きをシミュレートして加速度計データをテストします。


## センサー コントロールへのアクセス

<div class="wf-devtools-flex">
  <div>
    <p>Chrome DevTools センサー コントロールにアクセスするには、次のようにします。</p>
    <ol>
      <li>DevTools のメインメニューを開きます。</li>
      <li>[<strong>More Tools</strong>] の [<strong>Sensors</strong>] をクリックします。</li>
    </ol>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/navigate-to-sensors.png" alt="[Sensors] パネルへの移動">
  </div>
</div>

注: アプリで、JavaScript（Modernizr など）を使用してセンサーの読み込みが検出された場合、ページを再読み込みする前に、センサー エミュレータを有効にしてください。

##  位置情報データのオーバーライド

PC とは異なり、モバイル端末では一般的に GPS ハードウェアを使用して位置を検出します。[Sensors] ペインでは、<a href='http://www.w3.org/TR/geolocation-API/'>Geolocation API</a> で使用する位置情報の座標をシミュレートできます。

<div class="wf-devtools-flex">
  <div>
    <p>位置情報エミュレーションを有効にするには、エミュレーション ドロワーの [Sensors] ペインで [<strong>Emulate geolocation coordinates</strong>] チェックボックスをオンにします。</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-geolocation.png" alt="位置情報エミュレーションを有効化">
  </div>
</div>

このエミュレータを使用して、`navigator.geolocation` の位置の値をオーバーライドしたり、位置情報データが利用できないケースをシミュレートしたりできます。

##  加速度計（端末画面の向き）のエミュレート

<div class="wf-devtools-flex">
  <div>
    <p><a href='http://www.w3.org/TR/screen-orientation/'>Orientation API</a> から得られた加速度計データをテストするには、[Sensors] ペインで [<strong>Accelerometer</strong>] チェックボックスをオンにして加速度計エミュレータを有効にします。</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-accelerometer.png" alt="加速度計コントロール">
  </div>
</div>

操作できる画面の向きのパラメータは次のとおりです。

<dl>
<dt><abbr title="alpha">α</abbr></dt>
<dd>z 軸周りの回転。</dd>
<dt><abbr title="beta">β</abbr></dt>
<dd>左から右へのチルト。</dd>
<dt><abbr title="gamma">γ</abbr></dt>
<dd>前面から背面へのチルト。</dd>
</dl>

モデル加速度計をクリックして目的の画面の向きにドラッグすることもできます。

この[端末画面の向きのデモ](http://googlesamples.github.io/web-fundamentals/fundamentals/native-hardware/device-orientation/dev-orientation.html)を使用して加速度計エミュレータを試してください。




{# wf_devsite_translation #}
