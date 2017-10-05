project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome と Android でサイトがうまく実行できることを確認したら作業完了というわけではありません。Device Mode では iPhone などの他のさまざまな端末をシミュレートできますが、他のブラウザ ソリューションでエミュレーションを行ってみることをおすすめします。

{# wf_updated_on:2015-04-13 #}
{# wf_published_on:2015-04-13 #}

#  他のブラウザのエミュレートとテスト {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Chrome と Android でサイトがうまく実行できることを確認したら作業完了というわけではありません。Device Mode では iPhone などの他のさまざまな端末をシミュレートできますが、他のブラウザ ソリューションでエミュレーションを行ってみることをおすすめします。


### TL;DR {: .hide-from-toc }
- 特定の端末がない場合、またはなんらかのスポット チェックを行いたい場合は、ブラウザ内で端末をエミュレートするのが最適です。
- 端末エミュレータとシミュレータを使用すると、ワークステーションからさまざまな端末上の開発サイトを再現できます。
- クラウドベースのエミュレータを使用すると、さまざまなプラットフォームにおけるサイトのユニットテストを自動化できます。


##  ブラウザ エミュレータ

ブラウザ エミュレータは、サイトがレスポンシブであるかをテストするのに最適ですが、モバイル ブラウザで見られる API、CSS サポート、および特定の動作の相違はエミュレートされません。
実際の端末で実行されるブラウザでサイトをテストし、すべてが想定どおりに動作することを確認してください。


###  Firefox のレスポンシブ デザイン ビュー

Firefox の[レスポンシブ デザイン ビュー](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View)を使用すると、特定の端末を対象に考えるのではなく、縁をドラッグして一般的な画面サイズや独自のサイズでデザインがどのように変わるかを調べることができます。




###  Edge の F12 エミュレーション

Windows Phone をエミュレートするには、Microsoft Edge の [組み込みエミュレーション](https://dev.modern.ie/platform/documentation/f12-devtools-guide/emulation/) を使用します。

Edge にはレガシー互換性がないため、古いバージョンの Internet Explorer でページがどのように表示されるかをシミュレートするには、[IE 11 のエミュレーション](https://msdn.microsoft.com/en-us/library/dn255001(v=vs.85).aspx) を使用します。

##  端末エミュレータとシミュレータ

端末エミュレータとシミュレータは、ブラウザ環境だけではなく、端末全体をシミュレートします。仮想キーボードを使用したフォーム入力など、OS との統合が必要な機能をテストするのに役立ちます。

###  Android Emulator

<figure class="attempt-right">
  <img src="imgs/android-emulator-stock-browser.png" alt="Android Emulator の Stock Browser">
  <figcaption>Android Emulator の Stock Browser</figcaption>
</figure>

現時点では、Android エミュレータに Chrome をインストールする方法はありません。ただし、Android ブラウザ、Chromium Content Shell、およびこのガイドで後述する Android 版 Firefox を使用できます。Chromium Content Shell では、同じ Chrome レンダリング エンジンを使用しますが、ブラウザ固有機能は一切付属していません。

Android エミュレータは、<a href="http://developer.android.com/sdk/installing/studio.html">ここからダウンロード</a>できる Android SDK に含まれています。
手順に従って<a href="http://developer.android.com/tools/devices/managing-avds.html">仮想端末を設定</a>し、<a href="http://developer.android.com/tools/devices/emulator.html">エミュレータを起動</a>します。

エミュレータが起動したら、ブラウザ アイコンをクリックします。これで Android 版の古い Stock Browser でサイトをテストできます。

#### Android 上の Chromium Content Shell

<figure class="attempt-right">
  <img src="imgs/android-avd-contentshell.png" alt="Android Emulator の Content Shell">
  <figcaption>Android Emulator の Content Shell</figcaption>
</figure>

Android 用の Chromium Content Shell をインストールするには、エミュレータを実行した状態で、コマンド プロンプトで次のコマンドを実行します。


    git clone https://github.com/PaulKinlan/chromium-android-installer.git
    chmod u+x ./chromium-android-installer/\*.sh
    ./chromium-android-installer/install-chromeandroid.sh

これで、Chromium Content Shell でサイトをテストできます。


#### Android 上の Firefox

<figure class="attempt-right">
  <img src="imgs/ff-on-android-emulator.png" alt="Android Emulator 上の Firefox アイコン">
  <figcaption>Android Emulator 上の Firefox アイコン</figcaption>
</figure>

Chromium の Content Shell と同様に、APK を取得してエミュレータに Firefox をインストールできます。

<a href="https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/">https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/</a> から適切な .apk ファイルをダウンロードします。

ここから、次のコマンドを使用して、開いているエミュレータまたは接続されている Android 端末にファイルをインストールできます。

    adb install &lt;path to APK&gt;/fennec-XX.X.XX.android-arm.apk


###  iOS シミュレータ

Mac OS X 用の iOS シミュレータは、[App Store からインストール](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12)できる Xcode に含まれています。


インストールしたら [Apple のドキュメント](https://developer.apple.com/library/prerelease/ios/documentation/IDEs/Conceptual/iOS_Simulator_Guide/Introduction/Introduction.html)でシミュレータの操作方法を確認してください。

注: iOS シミュレータを使用するたびに Xcode を開かなくても済むようにするには、Xcode を開いてからドックで iOS シミュレータのアイコンを右クリックし、[`Keep in Dock`] を選択します。これで、必要なときにこのアイコンをクリックするだけで済みます。

###  Modern.IE

<figure class="attempt-right">
  <img src="imgs/modern-ie-simulator.png" alt="Modern IE VM">
  <figcaption>Modern IE VM</figcaption>
</figure>

Modern.IE 仮想マシンを使用すると、VirtualBox（または VMWare）を使用してコンピュータでさまざまなバージョンの IE にアクセスできます。<a href="https://modern.ie/en-us/virtualization-tools#downloads">このダウンロード ページ</a>で仮想マシンを選択します。


##  クラウドベースのエミュレータとシミュレータ

エミュレータを使用できず、実際の端末も使用できない場合は、クラウドベースのエミュレータが次善の策となります。クラウドベースのエミュレータが実際の端末とローカル エミュレータよりも優れている点は、さまざまなプラットフォームにおけるサイトのユニットテストを自動化できることです。

* [BrowserStack（商用）](https://www.browserstack.com/automate)は、手動テストに最も簡単に使用できます。オペレーティング システム、ブラウザ バージョンと端末タイプ、およびブラウジングする URL を選択すると、ホストされている操作可能な仮想マシンが起動します。複数のエミュレータを同じ画面で起動して、同時に複数の端末でアプリのルック アンド フィールをテストすることもできます。
* [SauceLabs（商用）](https://saucelabs.com/){: .external } を使用すると、エミュレータの内部でユニットテストを実行できます。これは、サイト全体のフローのスクリプトを作成するのに非常に便利で、録画した実行時の動画を後でさまざまな端末上で視聴できます。サイトの手動テストを実行することもできます。
* [Device Anywhere（商用）](http://www.keynote.com/solutions/testing/mobile-testing)ではエミュレータは使用されませんが、リモートで制御できる実際の端末が使用されます。
これは、特定の端末で問題を再現する必要があり、前のガイドにオプションに関するバグが見つからない場合に非常に便利です。





{# wf_devsite_translation #}
