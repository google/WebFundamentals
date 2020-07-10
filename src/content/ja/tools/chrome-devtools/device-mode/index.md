project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description:Chrome の Device Mode の仮想端末を使用して、モバイル ファーストのウェブサイトを構築します。

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

[capture]: /web/tools/chrome-devtools/images/shared/capture-settings.png
[customize]: /web/tools/chrome-devtools/images/shared/customize-and-control-devtools.png

# Chrome DevTools での Device Mode によるモバイル端末のシミュレート {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Device Mode では、モバイル端末でサイトのページがどのように見えて機能するか、実際に近い見た目で確認できます。

Device Mode は、モバイル端末のシミュレーションを行える Chrome DevTools の諸機能をまとめて呼ぶときの呼称です。
 以下の機能が含まれます。

* [モバイル ビューポイントのシミュレーション](#viewport)
* [ネットワークのスロットリング](#network)
* [CPU のスロットリング](#cpu)
* [位置情報のシミュレーション](#geolocation)
* [画面の向きの設定](#orientation)

## 制限事項 {: #limitations }

Device Mode はモバイル端末におけるページのルック アンド フィールの [1 次近似][approximation]{:.external} として利用できます。
 Device Mode を使用する場合、モバイル端末でコードを実際に実行することはありません。
 ノートパソコンまたはデスクトップ パソコンからモバイル ユーザーの体験をシミュレーションします。

[approximation]: https://en.wikipedia.org/wiki/Order_of_approximation#First-order

モバイル端末のある面については、DevTools でシミュレーションすることができません。 たとえば、モバイル CPU のアーキテクチャは、ノートパソコンやデスクトップ パソコンの CPU のアーキテクチャとは大きく異なります。
 不明な点がある場合は、モバイル端末でページを実際に実行してみるのが最善です。 
モバイル端末でページのコードが実際に実行されている間に、ノートパソコンやデスクトップ パソコンからページのコードを表示、変更、デバッグ、およびプロファイル作成するには、[Remote Debugging](/web/tools/chrome-devtools/remote-debugging/) を使用します。


## モバイル ビューポートのシミュレーション {: #viewport }

**[Toggle Device Toolbar]** ![Toggle Device Toolbar][TDB] をクリックすると、{: .inline-icon } モバイル ビューポートをシミュレーションできる UI が開きます。


[TDB]: /web/tools/chrome-devtools/images/shared/toggle-device-toolbar.png

<figure>
  <img src="imgs/device-toolbar.png"
       alt="Device Toolbar"/>
  <figcaption>
    <b>図 1</b>。 Device Toolbar
  </figcaption>
</figure>

デフォルトでは、Device Toolbar は Responsive Viewport モードで開きます。 

### Responsive Viewport モード {: #responsive }

ハンドルをドラッグして、ビューポートのサイズを自由に変更できます。 または、幅と高さのボックスに特定の値を入力することもできます。
 **図 2** では、幅を `628` に、高さを `662` に設定しています。


<figure>
  <img src="imgs/responsive-handles.png"
       alt="Responsive Viewport モードで、ビューポートのサイズを変更するためのハンドル。"/>
  <figcaption>
    <b>図 2</b>。 Responsive Viewport モードで、ビューポートのサイズを変更するためのハンドル。
  </figcaption>
</figure>

#### メディアクエリの表示 {: #queries }

ビューポートの上部にメディアクエリのブレークポイントを表示するには、**[More options]** をクリックして**[Show media queries]** を選択します。


<figure>
  <img src="imgs/show-media-queries.png"
       alt="Show media queries."/>
  <figcaption>
    <b>図 3</b>。 Show media queries
  </figcaption>
</figure>

ビューポートの幅を変更するためにブレークポイントをクリックすると、ブレークポイントがトリガーされた状態になります。

<figure>
  <img src="imgs/breakpoint.png"
       alt="ビューポートの幅を変更するためにブレークポイントをクリックします。"/>
<figcaption>
    <b>図 4</b>。 ビューポートの幅を変更するためにブレークポイントをクリックします
</figcaption>
</figure>

### モバイル端末の Viewport モード {: #device }

特定のモバイル端末のサイズをシミュレーションするには、**[Device]** リストから端末を選択します。

<figure>
  <img src="imgs/device-list.png"
       alt="[Device] リスト。"/>
  <figcaption>
    <b>図 5</b>。 [Device] リスト。
  </figcaption>
</figure>

#### ビューポートの画面の向きを横向きに回転する {: #landscape }

**[Rotate]** ![Rotate](imgs/rotate.png) をクリックすると、{: .inline-icon } ビューポートの画面の向きが横向きに回転します。

<figure>
  <img src="imgs/landscape.png"
       alt="横向きの画面。"/>
  <figcaption>
    <b>図 6</b>。 横向きの画面
  </figcaption>
</figure>

**Device Toolbar** の幅が狭いと、**[Rotate]** ボタンが表示されなくなることに注意してください。

<figure>
  <img src="imgs/device-toolbar.png"
       alt="Device Toolbar"/>
  <figcaption>
    <b>図 7</b>。 Device Toolbar
  </figcaption>
</figure>

[画面の向きの設定](#orientation)も参照してください。

#### 端末フレームの表示 {: #frame }

iPhone 6 などの特定のモバイル端末の寸法にシミュレートする場合は、**[More options]** を開いて**[Show device frame]** を選択して、ビューポートの周りの物理端末フレームを表示します。


注: 特定の端末の端末フレームが表示されない場合は、DevTools にその特定の端末のアート情報がないのかもしれません。


<figure>
  <img src="imgs/show-device-frame.png"
       alt="Show device frame."/>
  <figcaption>
    <b>図 8</b>。 Show device frame
  </figcaption>
</figure>

<figure>
  <img src="imgs/iphone-frame.png"
       alt="iPhone 6 の端末フレーム。"/>
  <figcaption>
    <b>図 9</b>。 iPhone 6 の端末フレーム
  </figcaption>
</figure>

### ルーラーの表示 {: #rulers }

**[More options]** をクリックしてから **[Show rulers]** を選択すると、ビューポートの上部と左側にルーラーが表示されます。
 ルーラーのサイズ指定単位はピクセルです。

<figure>
  <img src="imgs/show-rulers.png"
       alt="Show rulers."/>
  <figcaption>
    <b>図 10</b>。 Show rulers
  </figcaption>
</figure>

<figure>
  <img src="imgs/rulers.png"
       alt="ビューポート上部および左側のルーラー。"/>
  <figcaption>
    <b>図 11</b>。 ビューポート上部および左側のルーラー。
  </figcaption>
</figure>

### ビューポートのズーム {: #zoom }

ズームインまたはズームアウトするには、**[Zoom]** リストを使用します。

<figure>
  <img src="imgs/zoom-viewport.png"
       alt="ズーム。"/>
<figcaption> 
    <b>図 11</b>。 ズーム
</figcaption> 
</figure>

## ネットワークおよび CPU のスロットリング {: #throttle }

ネットワークおよび CPU をスロットリングするには、**[Throttle]** リストから **[Mid-tier mobile]** または **[Low-end mobile]** を選択します。


<figure>
  <img src="imgs/throttling.png"
       alt="[Throttle] リスト。"/>
<figcaption>
    <b>図 12</b>。 [Throttle] リスト。
</figcaption>
</figure>

**[Mid-tier mobile]** は高速 3G をシミュレートし、CPU を通常より 4 倍低速になるようにスロットリングします。
 **[Low-end mobile]** は低速 3G をシミュレートし、CPU を通常より 6 倍低速になるようにスロットリングします。
スロットリングは使用するノートパソコンまたはデスクトップ パソコンの通常の能力に比例したものになることを覚えておいてください。 

**Device Toolbar** の幅が狭いと **[Throttle]** リストが非表示になることに注意してください。

<figure>
  <img src="imgs/device-toolbar.png"
       alt="Device Toolbar"/>
  <figcaption>
    <b>図 13</b>。 Device Toolbar
  </figcaption>
</figure>

### CPU のみのスロットリング {: #cpu }

CPU のみをスロットリングしてネットワークはスロットリングしない場合は、**[Performance]** パネルで
**[Capture Settings]** ![Capture Settings][capture] をクリックしてから、{:.inline-icon}**[CPU]** リストから
**[4x slowdown]** または **[6x slowdown]** を選択します。

<figure>
  <img src="imgs/cpu.png"
       alt="[CPU] リスト。"/>
  <figcaption>
    <b>図 14</b>。 [CPU] リスト
  </figcaption>
</figure>

### ネットワークのみのスロットリング {: #network }

ネットワークのみをスロットリングして CPU をスロットリングしない場合は、**[Network]** パネルで **[Throttle]** リストから **[Fast 3G]** または **[Slow 3G]** を選択します。


<figure>
  <img src="imgs/network.png"
       alt="[Throttle] リスト。"/>
<figcaption>
    <b>図 14</b>。 [Throttle] リスト。
</figcaption>
</figure>

または、<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（Mac）または
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（Windows、Linux、Chrome OS）を押してコマンド メニューを開き、`3G` と入力し、**[Enable fast 3G throttling]** 
または
**[Enable slow 3G throttling]** を選択します。

<figure>
  <img src="imgs/commandmenu.png"
       alt="コマンド メニュー"/>
  <figcaption>
    <b>図 15</b>。 コマンド メニュー
  </figcaption>
</figure>

**[Performance]** パネルからネットワーク スロットリングを設定することもできます。 **[Capture Settings]** ![Capture Settings][capture]
をクリックし、{: .inline-icon } **[Network]** リストから **[Fast 3G]** または **[Slow 3G]** を選択します。


<figure>
  <img src="imgs/network2.png"
       alt="[Performance] パネルからのネットワーク スロットリングの設定。"/>
  <figcaption>
    <b>図 16</b>。 [Performance] パネルからのネットワーク スロットリングの設定
  </figcaption>
</figure>

## 位置情報のオーバーライド {: #geolocation }

位置情報オーバーライド UI を開くには、**[Customize and control DevTools]**
![Customize and control DevTools][customize] をクリックして、{: .inline-icon } **[More tools]** > **[Sensors]** の順に選択します。


<figure>
  <img src="imgs/sensors.png"
       alt="Sensors"/>
  <figcaption>
    <b>図 17</b>。 Sensors
  </figcaption>
</figure>

または、<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（Mac）または
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（Windows、Linux、Chrome OS）を押してコマンド メニューを開き、`Sensors` と入力し、**[Show Sensors]**
を選択します。

<figure>
  <img src="imgs/show-sensors.png"
       alt="Show Sensors"/>
  <figcaption>
    <b>図 18</b>。 Show Sensors
  </figcaption>
</figure>

**[Geolocation]** リストからいずれかのプリセットを選択したり、**[Custom location]** を選択して座標を入力したり、**[Location unavailable]** を選択して位置情報がエラー状態にある場合のページ動作をテストしたりできます。



<figure>
  <img src="imgs/geolocation.png"
       alt="Geolocation"/>
<figcaption>
    <b>図 19</b>。 Geolocation
</figcaption>
</figure>

## 画面の向きの設定 {: #orientation }

画面の向き UI を開くには、**[Customize and control DevTools]**
![Customize and control DevTools][customize] をクリックして、{: .inline-icon } **[More tools]** > **[Sensors]** の順に選択します。



<figure>
  <img src="imgs/sensors.png"
       alt="Sensors"/>
  <figcaption>
    <b>図 20</b>。 Sensors
  </figcaption>
</figure>

または、<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（Mac）または
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（Windows、Linux、Chrome OS）を押してコマンド メニューを開き、`Sensors` と入力し、**[Show Sensors]**
を選択します。

<figure>
  <img src="imgs/show-sensors.png"
       alt="Show Sensors"/>
  <figcaption>
    <b>図 21</b>。 Show Sensors
  </figcaption>
</figure>

**[Orientation]** リストからいずれかのプリセットを選択するか、または **[Custom orientation]** を選択してアルファ、ベータ、およびガンマ値を設定します。


<figure>
  <img src="imgs/orientation.png"
       alt="Orientation"/>
<figcaption>
    <b>図 22</b>。 Orientation
</figcaption>
</figure>

## フィードバック {: #feedback }

{% include "web/_shared/helpful.html" %}

フィードバックをお送りいただくその他の方法については、[Join the DevTools community](/web/tools/chrome-devtools/#community) をご覧ください。

