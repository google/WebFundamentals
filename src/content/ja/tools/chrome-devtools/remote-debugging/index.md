project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Windows、Mac、または Linux コンピュータから Android 端末上のライブ コンテンツのリモート デバッグを行います。

{# wf_updated_on:2016-12-09 #}
{# wf_published_on:2015-04-13 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

#  Android 端末のリモート デバッグを行う {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Windows、Mac、または Linux コンピュータから Android 端末上のライブ コンテンツのリモート デバッグを行います。
このチュートリアルでは、次の操作を行う方法について説明します。

* Android 端末をリモート デバッグ用に設定し、開発マシンから検出します。
* 開発マシンで Android 端末上のライブ コンテンツを調査し、デバッグします。
* Android 端末のコンテンツを開発マシン上の DevTools インスタンスにスクリーンキャストします。


![リモート デバッグの図](imgs/remote-debugging.png)

##  要件{: #requirements }

* 開発マシンに Chrome 32 以降がインストールされていること。
* Windows を使用している場合、開発マシンに [USB ドライバ][drivers]がインストールされていること。
デバイス マネージャーで正しい USB ドライバが報告されていることを確認してください。
* Android 端末を開発マシンに接続するための USB ケーブル。
* Android 4.0 以降。
* Android 端末にインストールされた Chrome for Android。

[drivers]: https://developer.android.com/tools/extras/oem-usb.html

##  ステップ 1: Android 端末を検出する{: #discover }

1. Android 端末で [**Settings**] > [**Developer Options**] > [**Enable USB Debugging**] を選択します。
Android 4.2 以降のバージョンでは、[**Developer Options**] はデフォルトで非表示になっています。
このオプションを有効にする方法については、[端末開発者向けオプションを有効にする][android]をご覧ください。


[android]: https://developer.android.com/studio/run/device.html#developer-device-options

1. 開発マシンで Chrome を開きます。いずれかの Google アカウントで Chrome にログインする必要があります。
[シークレット モード][incognito]または[ゲストモード][guest]でリモート デバッグを行うことはできません。


[guest]: https://support.google.com/chrome/answer/6130773
[incognito]: https://support.google.com/chrome/answer/95464

1. [DevTools を開きます](/web/tools/chrome-devtools/#open)。

1. DevTools で、[**Main Menu**] ![Main Menu][main]{:.devtools-inline} をクリックして、[**More tools**] > [**Remote devices**] を選択します。
 

     ![[remote devices] ドロワーを開く][open]

[main]: /web/tools/chrome-devtools/images/three-dot.png
[open]: /web/tools/chrome-devtools/remote-debugging/imgs/open-remote-devices.png

1. DevTools で [**Settings**] タブをクリックします（別のタブが表示されている場合）。

1. [**Discover USB devices**] がオンになっていることを確認してください。

     ![[Discover USB devices] をオンにする][discover]

[discover]: /web/tools/chrome-devtools/remote-debugging/imgs/discover-usb-devices.png

1. USB ケーブルを使用して、Android 端末を開発マシンに直接接続します。
中間 USB ハブは使用しないでください。この開発マシンに Android 端末を初めて接続する場合、端末は **Unknown** として表示され、その下に **Pending Authorization** というテキストが表示されます。


       ![承認待ち状態の不明な端末][unknown]

[unknown]: /web/tools/chrome-devtools/remote-debugging/imgs/unknown-device.png

1. 端末が [**Unknown**] と表示される場合は、Android 端末に表示される [**Allow USB Debugging**] パーミッション プロンプトでデバッグを許可します。
[**Unknown**] が Android 端末のモデル名に置き替わります。
緑の丸と [**Connected**] のテキストは、開発マシンからリモートで Android 端末をデバッグする準備が整ったことを表します。



注: 端末の検出プロセスで問題が発生した場合は、Android 端末で [**Settings**] > [**Developer Options**] > [**Revoke USB Debugging Authorizations**] を選択してプロセスをやり直します。



##  ステップ 2: 開発マシンから Android 端末のコンテンツをデバッグする{: #debug }

1. Android 端末で Chrome をまだ開いていない場合は、Chrome を開きます。

1. DevTools に戻り、端末のモデル名に一致するタブをクリックします。
ページの上部に Android 端末のモデル名が表示され、その横にシリアル番号が表示されます。
その下には、端末で実行している Chrome のバージョンが表示され、かっこ内にバージョン番号が示されます。開いている各 Chrome タブについて独自のセクションが表示されます。このセクションからそのタブを操作することができます。
WebView を使用しているアプリがある場合は、それらの各アプリのセクションが表示されます。
次のスクリーンショットではタブまたは WebView が開いていません。


       ![接続済みのリモート端末][connected]

[connected]: /web/tools/chrome-devtools/remote-debugging/imgs/connected-remote-device.png

1. [**New tab**] の横に URL を入力して、[**Open**] をクリックします。Android 端末の新しいタブでページが開きます。


1. 開いた URL の横にある [**Inspect**] をクリックします。新しい DevTools インスタンスが開きます。Android 端末で実行している Chrome のバージョンによって、開発マシン上で起動する DevTools のバージョンが決まります。そのため、Android 端末で非常に古いバージョンの Chrome を使用している場合は、DevTools インスタンスが、使い慣れたものとは異なって見えることがあります。


###  その他のアクション: タブを再読み込みする、フォーカスを移動する、閉じる{: #more-actions }

再読み込み、フォーカス移動、または閉じる必要があるタブの横にある [**More Options**] ![More Options][more]{:.devtools-inline} をクリックします。


[more]: /web/tools/chrome-devtools/images/three-dot.png

![タブを再読み込みする、フォーカスを移動する、閉じる](imgs/reload.png)

###  要素を調査する{: #inspect }

DevTools インスタンスの [**Elements**] パネルを表示し、要素にカーソルを合わせて、Android 端末のビューポートで要素をハイライト表示します。


Android 端末の画面上で要素をタップすることにより、[**Elements**] パネルの要素を選択することもできます。
DevTools インスタンスで [**Select Element**] ![Select Element][select]{:.devtools-inline} をクリックしてから、Android 端末の画面上で要素をタップします。
1 回タップすると [**Select Element**] が無効になるため、この機能を使用するたびに再度有効にする必要があることに注意してください。



[select]: imgs/select-element.png

###  Android 端末から開発マシンにスクリーンキャストする{: #screencast }

[**Toggle Screencast**] ![Toggle Screencast][screencast]{:.devtools-inline} をクリックして、DevTools インスタンスで Android 端末のコンテンツを表示します。


[screencast]: imgs/toggle-screencast.png

さまざまな方法でスクリーンキャストを操作できます。

* クリックはタップに変換され、端末で正しいタッチイベントが発生します。 
* コンピュータでのキーストロークが端末に送信されます。 
* ピンチ操作をシミュレートするには、<kbd>Shift</kbd> キーを押しながらドラッグします。 
* スクロールするには、トラックパッドやマウスホイールを使用するか、マウスポインタでフリングします。


スクリーンキャストに関する注意事項:

* スクリーンキャストではページのコンテンツのみが表示されます。スクリーンキャストの透明な部分は、Chrome のアドレスバー、Android のステータスバー、Android のキーボードなど、端末のインターフェースを表します。
* スクリーンキャストはフレームレートに悪影響を及ぼします。スクロールやアニメーションを調整するときには、スクリーンキャストを無効にすると、ページのパフォーマンスをより正確に把握できます。
* Android 端末の画面をロックすると、スクリーンキャストのコンテンツが非表示になります。
Android 端末の画面をロック解除すると、スクリーンキャストが自動的に再開します。


##  フィードバック{: #feedback }

このチュートリアルを改善するために、以下の質問にご回答ください。


{% framebox width="auto" height="auto" %}<p>チュートリアルを完了できましたか？</p>

<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Completed / Yes">はい</button>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Completed / No">いいえ</button>
<p>チュートリアルには、探していた情報が含まれていましたか？</p>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Relevant / Yes">はい</button>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Relevant / No">いいえ</button>
{% endframebox %}


{# wf_devsite_translation #}
