project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description:Windows、Mac、または Linux コンピュータから Android 端末上のライブ コンテンツのリモート デバッグを行います。

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

# Android 端末のリモート デバッグを行う {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Windows、Mac、または Linux コンピュータから Android 端末上のライブ コンテンツのリモート デバッグを行います。
 このチュートリアルでは、次の操作を行う方法について説明します。

* Android 端末をリモート デバッグ用に設定し、開発マシンから検出します。
* 開発マシンで Android 端末上のライブ コンテンツを調査し、デバッグします。
* Android 端末のコンテンツを開発マシン上の DevTools インスタンスにスクリーンキャストします。


<figure>
  <img src="imgs/remote-debugging.png"
       alt="リモート デバッグを行うと、Android 端末で実行されているページを開発マシンで調査できます。
"/>
  <figcaption>
    <b>図 1</b>。 リモート デバッグを行うと、Android 端末で実行されているページを開発マシンで調査できます。

  </figcaption>
</figure>

## ステップ 1: Android 端末を検出する {: #discover }

以下のワークフローは、ほとんどのユーザーが使用できます。 さらに詳しくは、[トラブルシューティング:DevTools が Android 端末を検出しない](#troubleshooting)をご覧ください。


1. Android で **[Developer Options]** 画面を開きます。 [端末の開発者向けオプションの設定](https://developer.android.com/studio/debug/dev-options.html){:.external}をご覧ください。
1. **[Enable USB Debugging]** を選択します。 
1. 開発マシンで Chrome を開きます。
1. [DevTools を開きます](/web/tools/chrome-devtools/#open)。
1. DevTools で、**[Main Menu]** ![Main Menu][main]{:.devtools-inline} をクリックします。 
   次に、**[More tools]** > **[Remote devices]** の順に選択します。 

     <figure>
       <img src="imgs/open-remote-devices.png"
            alt="[Main Menu] から [Remote Devices] タブを開きます。"/>
       <figcaption>
         <b>図 2</b>。 <b>[Main Menu]</b> から <b>[Remote Devices]</b> タブを開きます
       </figcaption>
     </figure>

[main]: /web/tools/chrome-devtools/images/three-dot.png
[open]: /web/tools/chrome-devtools/remote-debugging/imgs/open-remote-devices.png

1. DevTools で、**[Settings]** タブを開きます。

1. **[Discover USB devices]** チェックボックスが有効になっていることを確認します。

     <figure>
       <img src="imgs/discover-usb-devices.png" alt="[Discover USB Devices] チェックボックスが有効になっています。
"/>
       <figcaption>
         <b>図 3</b>。 <b>[Discover USB Devices]</b> チェックボックスが有効になっています
</figcaption>
     </figure>

[discover]: /web/tools/chrome-devtools/remote-debugging/imgs/discover-usb-devices.png

1. USB ケーブルを使用して、Android 端末を開発マシンに直接接続します。
 初めてこの操作を行う場合、DevTools が不明なデバイスを検出したことが表示されます。
 DevTools が端末への接続を確立すると、Android 端末のモデル名の下に、緑色の点と **[Connected]** が表示されます。
 [ステップ 2](#debug)に進みます。

     <figure>
       <img src="imgs/unknown-device.png" alt="[Remote Devices] タブが、承認待ちの不明な端末を検出しました。
"/>
       <figcaption>
         <b>図 4</b>。 <b>[Remote Devices]</b> タブが、承認待ちの不明な端末を検出しました
</figcaption>

     </figure>


[unknown]: /web/tools/chrome-devtools/remote-debugging/imgs/unknown-device.png

1. 端末に **[Unknown]** と表示される場合は、Android 端末に表示される **[Allow USB Debugging]** パーミッション プロンプトでデバッグを許可します。
 

### トラブルシューティング：DevTools が、Android 端末を検出しません {: #troubleshooting }

ハードウェアが正しく設定されていることを確認してください。

* USB ハブを使用している場合は、Android 端末を開発マシンに直接接続してみてください。
* Android 端末と開発マシンをつないでいる USB ケーブルをいったん抜いて、再び差し込んでください。
 この操作は、Android 端末と開発マシンの画面がロックされていない間に行います。
* USB ケーブルが機能することを確認してください。 開発マシンから Android 端末のファイルが調査できるようになるはずです。


ソフトウェアが正しく設定されていることを確認してください。

* 開発マシンが Windows を実行している場合は、Android 端末用の USB ドライバを手動でインストールしてください。
 [OEM USB ドライバのインストール][drivers]をご覧ください{:.external}。
* Windows と Android 端末（特に Samsung）を組み合わせる場合は、特別な設定が必要となることがあります。
 [端末を接続しても Chrome DevTools Devices が検出しない][SO]をご覧ください{:.external}。

Android 端末に **[Allow USB Debugging]** プロンプトが表示されない場合は、次の操作を行ってください。

* 開発マシンで DevTools にフォーカスがあり Android のホーム画面が表示されている間に、USB ケーブルをいったん抜いてから再度接続してください。
 Android または開発マシンの画面がロックされていると、プロンプトが表示されない場合があります。
* Android 端末および開発マシンの表示設定を更新し、スリープ状態にならないようにしてください。
* Android の USB モードを PTP に設定します。 [Galaxy S4 に [USB デバッグの承認] ダイアログ ボックスが表示されない](https://android.stackexchange.com/questions/101933){: .external }をご覧ください。
* Android 端末の **[Developer Options]** 画面から **[Revoke USB Debugging Authorizations]** を選択し、新しい状態にリセットします。


このセクションまたは[端末を接続しても Chrome DevTools Devices が検出しない][SO]{: .external}に記載されていない解決策が見つかった場合、該当する Stack Overflow の質問への回答を追加するか、または [webfundamentals リポジトリで問題をオープンしてください][issue]{:.external}。

[drivers]: https://developer.android.com/tools/extras/oem-usb.html
[SO]: https://stackoverflow.com/questions/21925992
[issue]: https://github.com/google/webfundamentals/issues/new?title=[Remote%20Debugging]

## ステップ 2: 開発マシンから Android 端末のコンテンツをデバッグする {: #debug }

1. Android 端末で Chrome を開きます。
1. **[Remote Devices]** タブで、使用する Android 端末のモデル名と一致するタブをクリックします。
   ページの上部に Android 端末のモデル名が表示され、その横にシリアル番号が表示されます。
 その下には、端末で実行している Chrome のバージョンが表示され、かっこ内にバージョン番号が示されます。
 開いている各 Chrome タブについて独自のセクションが表示されます。 このセクションからそのタブを操作することができます。
 WebView を使用しているアプリがある場合は、それらの各アプリのセクションが表示されます。
 <b>図 5</b> では、開かれているタブや WebView はありません。

     <figure>
       <img src="imgs/connected-remote-device.png" alt="接続済みのリモート端末。"/>
       <figcaption>
         <b>図 5</b>。 接続済みのリモート端末
       </figcaption>
     </figure>

1. **[New tab]** テキストボックスで、URL を入力して **[Open]** をクリックします。 Android 端末の新しいタブでそのページが開きます。

1. 開いた URL の横にある **[Inspect]** をクリックします。 新しい DevTools インスタンスが開きます。
 Android 端末で実行している Chrome のバージョンによって、開発マシン上で起動する DevTools のバージョンが決まります。
   そのため、Android 端末で非常に古いバージョンの Chrome を使用している場合は、DevTools インスタンスが、使い慣れたものとは異なって見えることがあります。


### その他のアクション: タブを再読み込みする、タブをフォーカスする、タブを閉じる {: #more-actions }

再読み込みするタブ、フォーカスするタブ、閉じるタブの横にある **[More Options]** ![More Options][more]{:.devtools-inline}  をクリックします。


[more]: /web/tools/chrome-devtools/images/three-dot.png

<figure>
  <img src="imgs/reload.png" alt="タブを再読み込みする、タブをフォーカスする、タブを閉じるためのメニュー。"/>
  <figcaption>
    <b>図 6</b>。 タブを再読み込みする、タブをフォーカスする、タブを閉じるためのメニュー
</figcaption>
</figure>

### 要素を調査する {: #inspect }

DevTools インスタンスの **[Elements]** パネルを表示し、要素にカーソルを合わせると Android 端末のビューポートで要素がハイライト表示されます。


Android 端末の画面上で要素をタップして、**[Elements]** パネルの要素を選択することもできます。
 DevTools インスタンスで **[Select Element]** ![Select Element][select]
{:.devtools-inline} をクリックしてから、Android 端末の画面上で要素をタップします。
 1 回タップすると **[Select Element]** が無効になるため、この機能を使用する場合は毎回再度有効にする必要があることに注意してください。



[select]: imgs/select-element.png

### 開発マシンに Android の画面をスクリーンキャストします {: #screencast }

**[Toggle Screencast]** ![Toggle Screencast][screencast]{:.devtools-inline}
 をクリックして、DevTools インスタンスで Android 端末のコンテンツを表示します。

[screencast]: imgs/toggle-screencast.png

さまざまな方法でスクリーンキャストを操作できます。

* クリックはタップに変換され、端末で正しいタッチイベントが発生します。 
* コンピュータでのキーストロークが端末に送信されます。 
* ピンチ操作をシミュレートするには、<kbd>Shift</kbd> キーを押しながらドラッグします。 
* スクロールするには、トラックパッドやマウスホイールを使用するか、マウスポインターでフリングします。


スクリーンキャストに関する注意事項:

* スクリーンキャストではページのコンテンツのみが表示されます。 スクリーンキャストの透明な部分は、Chrome のアドレスバー、Android のステータスバー、Android のキーボードなど、端末のインターフェースを表します。
* スクリーンキャストはフレームレートに悪影響を及ぼします。 スクロールやアニメーションのパフォーマンスを計測するときは、スクリーンキャストを無効にすると、ページのパフォーマンスをより正確に把握できます。
* Android 端末の画面がロックされると、スクリーンキャストのコンテンツが非表示になります。
 Android 端末の画面のロックを解除すると、スクリーンキャストが自動的に再開します。


## フィードバック {: #feedback }

{% include "web/_shared/helpful.html" %}
