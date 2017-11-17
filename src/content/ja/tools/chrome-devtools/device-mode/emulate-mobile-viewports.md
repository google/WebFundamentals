project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools の Device Mode では、開発サイトがさまざまな端末で本番環境においてどのように表示されるかを再現できます。

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-04-13 #}

# レスポンシブな端末固有ビューポートのテスト {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

アップデート版の Device Mode（Chrome 49 以降）は、モバイル ファーストになった DevTools において不可欠な部分であり、メインの DevTools バーを拡張するものです。ここでは、そのコントロールを使用して幅広い端末をシミュレートする方法やレスポンシブにする方法について説明します。


### TL;DR {: .hide-from-toc }
- Device Mode のスクリーン エミュレータを使用してサイトがレスポンシブであるかテストします。
- カスタム プリセットを保存して、後で簡単に利用できるようにします。
- Device Mode は、実際の端末テストの代わりになるものではありません。制限事項に注意してください。


##  ビューポート コントロールの使用{: #viewport-controls }

![Device Mode が有効](imgs/device-mode.png)

ビューポート コントロールを使用して、さまざまな端末でサイトがレスポンシブであるかテストできます。2 つのモードがあります。

  1. [**Responsive**]。両側の大きいハンドルを使用してビューポートを自由にリサイズできるようにします。
  2. **特定の端末**。ビューポートを特定の端末の正確なビューポート サイズに固定し、特定の端末の特性をエミュレートします。

##  Responsive モード

既定の動作モードとして **[Responsive] モード** を使用することをおすすめします。サイトやアプリの開発中にこのモードを使用し、ビューポートを頻繁にサイズ変更して、不明な端末タイプや将来の端末タイプにも適応するレスポンシブ デザインを作成します。

[Responsive] モードを最大限に活用するには、[メディアクエリ バー](#media-queries) を有効にします。

###  ビューポート サイズのカスタマイズ

ビューポートの大きいサイズ変更ハンドルをドラッグするか、メニューバーの値をクリックしてより細かく設定します。

##  端末固有モード

開発が終わりに近づき、特定のモバイル（特定の iPhone や Nexus など）でのサイトの表示を完成させるには、**端末固有モード** を使用します。

###  組み込みの端末プリセット

<div class="wf-devtools-flex">
  <div>
  <p>現在最もよく使用される端末が端末ドロップダウンに表示されます。端末を選択すると、各プリセットによって以下のような特定の端末特性のエミュレーションが自動的に設定されます。</p>
  <ul>
    <li>正しい「User Agent（UA）」文字列を設定します。</li>
    <li>端末の解像度と DPI（デバイス ピクセル比）を設定します。</li>
    <li>タップ イベントをエミュレートします（該当する場合）。</li>
    <li>モバイル スクロールバーのオーバーレイと meta viewport をエミュレートします。</li>
    <li>ビューポートが定義されていないページのテキストのサイズを自動的に設定します（大きくします）。</li>
  </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/select-device.png" alt="端末を選択">
  </div>
</div>

###  カスタム端末プリセットの追加

Device Mode には、エミュレーション用にさまざまな端末が用意されています。用意されていない特殊な端末やニッチ端末が見つかった場合は、カスタム端末を追加できます。
 

<div class="wf-devtools-flex">
  <div>
  <p>カスタム端末を追加するには、次のようにします。</p>
  <ol>
    <li>DevTools の [Settings] に移動します。</li>
    <li>[<strong>Devices</strong>] タブをクリックします。</li>
    <li>[<strong>Add custom device</strong>] をクリックします。</li>
    <li>端末名、幅、高さ、デバイス ピクセル比、および User Agent 文字列を入力します。
</li>
     <li>[<strong>Add</strong>] をクリックします。</li>
  </ol>
  <p>カスタム端末が [<strong>Device</strong>] ドロップダウン メニューで利用できるようになります。</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/custom-device.png" alt="端末を選択">
  </div>
</div>

###  端末状態と画面の向き

![画面の向きの切り替え](imgs/change-orientation.png)

特定の端末をエミュレートする場合、Device Mode のツールバーに追加のコントロールが表示されます。このコントロールは、主に端末画面の向き（横向きと縦向き）を切り替えるために使用します。

<div class="wf-devtools-flex">
  <div>
    <p>一部の端末では、コントロールによって実行されるのは画面の向きの切り替えだけではありません。Nexus 5X など、サポートされている端末の場合は、次のような特定の端末状態をエミュレートできるドロップダウンが表示されます。</p>
    <ul>
      <li>既定のブラウザ UI</li>
      <li>Chrome ナビゲーション バー付き</li>
      <li>開いたキーボード</li>
    </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/change-device-state.png" alt="端末 UI の変更">
  </div>
</div>

### ズームしてフィット  

<div class="wf-devtools-flex">
  <div>
  <p>ブラウザ ウィンドウで実際に使用できるスペースよりも解像度が高い端末でテストする場合があります。このような場合は、<strong>ズームしてフィット</strong> オプションが便利です。</p>
  <ol>
    <li>[<strong>Fit to Window</strong>] を選択すると、使用可能な最大スペースに合わせてズームレベルが自動的に設定されます。</li>
    <li><strong>明示的なパーセンテージ</strong> は、画像の DPI をテストする場合などに役立ちます。</li>
  </ol>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/zoom-to-fit.png" alt="ズームしてフィット">
  </div>
</div>

## オプション コントロール（タッチ、メディアクエリ、DPR など）

<div class="wf-devtools-flex">
  <div>
  <p>オプション コントロールを変更したり有効にしたりするには、端末ツールバーの右側にあるスリードットのアイコンをクリックします。現在、次のオプションが含まれています。</p>
  <ul>
    <li>ユーザー エージェント タイプ（UA とタップイベントのエミュレート）</li>
    <li>デバイス ピクセル比</li>
    <li>メディアクエリ</li>
    <li>ルーラー</li>
    <li>ネットワークの設定（UA、ネットワーク スロットリング）</li>
  </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/device-mode-dotmenu.png" alt="Device Mode の設定">
  </div>
</div>

各オプションの詳細については、以下の説明をご覧ください。

###  ユーザー エージェント タイプ

[**User Agent Type**]、つまり端末タイプを設定すると、端末のタイプを変更できます。
有効な値は次のとおりです。

  1. Mobile
  2. Desktop
  3. Desktop with touch

この設定を変更すると、モバイル ビューポートとタップイベントのエミュレーションに影響があり、UA 文字列が変更されます。
そのため、PC 用のレスポンシブなサイトを作成し、カーソルを合わせたときの効果をテストする場合は、[Responsive] モードで [Desktop] に切り替えます。


**使い方**:[[**Network conditions**]][nc] ドロワーでユーザー エージェントを設定することもできます。



###  デバイス ピクセル比（DPR）

Retina ではないマシンで Retina 端末（またはその逆）をエミュレートする場合は [**Device pixel ratio**] を調整します。
**デバイス ピクセル比** （DPR）は、論理ピクセルと物理ピクセルの比です。
Nexus 6P などの Retina ディスプレイ搭載端末では、標準の端末よりピクセル密度が高くなります。これは、ビジュアル コンテンツの鮮明さやサイズに影響する可能性があります。



ウェブ上の「デバイス ピクセル比」（DPR）の感度の例を次に示します。

* 次のような CSS メディアクエリ

      @media (-webkit-min-device-pixel-ratio: 2), 
             (min-resolution: 192dpi) { ... }

* CSS [image-set](http://dev.w3.org/csswg/css-images/#image-set-notation) ルール。


* 画像の [srcset](/web/fundamentals/design-and-ux/media/images/images-in-markup) 属性。


* `window.devicePixelRatio` プロパティ。

ネイティブ Retina ディスプレイでは、1 インチあたりのドット数（DPI）が低いと粗い表示になり、DPI アセットが高いほど鮮明になることがわかります。
標準ディスプレイでこの効果をシミュレートするには、DPR を 2 に設定し、ズームでビューポートのサイズを変更します。
2x のアセットは表示が鮮明で、1x のアセットは表示が粗くなります。


###  メディアクエリ {: #media-queries }

[メディアクエリ](/web/fundamentals/design-and-ux/responsive/fundamentals/use-media-queries)は、レスポンシブ ウェブデザインに不可欠な要素です。メディアクエリ インスペクターを表示するには、スリードット メニューで [**Show Media queries**] をクリックします。
DevTools によってスタイルシートのメディアクエリが検出され、一番上のルーラーに色付きのバーとして表示されます。


![Show media queries](imgs/show-media-queries.png)

![メディアクエリ インスペクター](imgs/media-query-inspector-ruler.png)

メディアクエリは、次のように色分けされます。

<style>#colortable { width: 60%; border: none; } #colortable td { border: none; } .max-width { background: #327ff2; width: 10%; } .max-and-min { background: #3b9903; width: 10%; } .min-width { background: #d4731f; width: 10%; }</style>

<table id="colortable">
  <tbody>
    <tr>
      <td class="max-width"></td>
      <td>最大幅を対象とするクエリ。</td>
    </tr>
    <tr>
      <td class="max-and-min"></td>
      <td>範囲内の幅を対象とするクエリ。</td>
    </tr>
    <tr>
      <td class="min-width"></td>
      <td>最小幅を対象とするクエリ。</td>
    </tr>
  </tbody>
</table>

####  メディアクエリの即時プレビュー

ビューポート サイズを調整して対象の画面サイズのスタイルをプレビューするには、メディアクエリ バーをクリックします。


####  関連する CSS の表示

メディアクエリが定義されている CSS 内の場所を表示し、ソースコード内の定義にジャンプするには、バーを右クリックします。


![Web Fundamentals のメディアクエリの表示](imgs/reveal-source-code.png)

###  ルーラー

ビューポートの横にピクセルベースのルーラーを表示するには、このオプションを切り替えます。

###  ネットワークの設定（UA、ネットワーク スロットリング）

このオプションを選択すると、ネットワーク関連の動作を変更できるパネルがドロワーに表示されます。


  1. **Disk Cache**: [Disk Cache] を無効にすると、DevTools が開いている間にページとそのアセットがブラウザによってキャッシュに保存されなくなります。
  2. **Network Throttling**: [ネットワーク スロットリングの詳細](/web/tools/chrome-devtools/network-performance/network-conditions)を参照してください。
  3. **User Agent**: 特定の UA（User Agent）文字列のオーバーライドを設定できます。


**使い方**:[メインメニュー][nc] から [**Network conditions**] ドロワーを開くこともできます。


## 制限事項

Device Mode にはいくつかの制限事項があります。

* **端末ハードウェア**
  * GPU と CPU の動作はエミュレートされません。
* **ブラウザ UI**
  * アドレスバーなどのシステム表示はエミュレートされません。
  * `<select>` 要素などのネイティブ表示はモーダルリストとしてエミュレートされません。
  * キーパッドを開く数字入力などの一部の機能強化は、実際の端末動作とは異なる場合があります。
* **ブラウザ機能**
  * WebGL はエミュレータで動作しますが、iOS 7 端末ではサポートされていません。
  * MathML は Chrome でサポートされていませんが、iOS 7 端末ではサポートされています。
  * [iOS 5 での画面の向きのズームバグ](https://github.com/scottjehl/device-bugs/issues/2)はエミュレートされません。
  * line-height CSS プロパティはエミュレータで動作しますが、Opera Mini ではサポートされていません。
  * [Internet Explorer](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx) に見られるような CSS ルールの制限は、エミュレートされません。
* **AppCache**
  * エミュレータは、AppCache [マニフェスト ファイル](https://code.google.com/p/chromium/issues/detail?id=334120) または[ソース表示リクエスト](https://code.google.com/p/chromium/issues/detail?id=119767)の <abbr title="User Agent">UA</abbr> をオーバーライドしません。

これらの制限はありますが、Device Mode は十分に堅牢であり、ほとんどのタスクに対応できます。
実際の端末でテストする必要がある場合は、[リモート デバッグ](/web/tools/chrome-devtools/debug/remote-debugging)を使用してさらに詳しく分析できます。




[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions


{# wf_devsite_translation #}
