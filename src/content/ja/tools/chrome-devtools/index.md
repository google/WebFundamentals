project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: オプション 1

{# wf_updated_on:2016-07-26 #}
{# wf_published_on:2016-03-28 #}

#  Chrome DevTools {: .page-title }

Chrome DevTools は、Google Chrome に組み込まれたウェブ作成およびデバッグツールのセットです。
DevTools を使用してサイトの反復処理、デバッグ、プロファイリングを行います。

試験運用: [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html) には、常に最新の DevTools が備わっています。

##  Chrome DevTools を開く{: #open }

* Chrome メニューから [**More Tools**] > [**Developer Tools**] を選択します。
* ページ要素を右クリックして、[Inspect] を選択します。
* [キーボード ショートカット](/web/tools/chrome-devtools/inspect-styles/shortcuts)の <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> キー（Windows）または <kbd>Cmd</kbd>+<kbd>Opt</kbd>+<kbd>I</kbd> キー（Mac）を使用します。


##  パネルの概要

###  Device Mode
<img src="/web/tools/chrome-devtools/images/devicemode.png" alt="Device Mode" class="attempt-right">
Device Mode を使用して、レスポンシブなモバイル ファーストのウェブ エクスペリエンスを構築します。</p>

* [Device Mode](/web/tools/chrome-devtools/device-mode/)
* [レスポンシブな端末固有ビューポートのテスト](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports)
* [センサーのエミュレート: 位置情報と加速度計](/web/tools/chrome-devtools/device-mode/device-input-and-sensors)

<div style="clear:both;"></div>

###  Elements
<img src="images/elements-panel.png" alt="Elements パネル" class="attempt-right">
[Elements] パネルでは、DOM と CSS を自由に操作してサイトのレイアウトやデザインを反復処理できます。

* [ページの調査と微調整](/web/tools/chrome-devtools/inspect-styles/)
* [スタイルの編集](/web/tools/chrome-devtools/inspect-styles/edit-styles)
* [DOM の編集](/web/tools/chrome-devtools/inspect-styles/edit-dom)

<div style="clear:both;"></div>

###  Console
<img src="images/console-panel.png" alt="Console パネル" class="attempt-right">
[Console] では、開発中に診断情報を記録したり、その情報をシェルとして使用してページ上の JavaScript を操作したりできます。

* [コンソールの使用](/web/tools/chrome-devtools/console/)
* [コマンドラインからの操作](/web/tools/chrome-devtools/console/command-line-reference)

<div style="clear:both;"></div>

###  Sources
<img src="images/sources-panel.png" alt="Sources パネル" class="attempt-right">
[Sources] パネルでブレークポイントを使用して JavaScript をデバッグしたり、ワークスペース経由でローカル ファイルを接続して DevTools ライブエディタを使用したりできます。

* [ブレークポイントを使用したデバッグ](/web/tools/chrome-devtools/javascript/add-breakpoints)
* [難読化されたコードのデバッグ](/web/tools/chrome-devtools/javascript/add-breakpoints)
* [DevTools ワークスペースによる永続化の設定](/web/tools/setup/setup-workflow)

<div style="clear:both;"></div>

###  Network
<img src="images/network-panel.png" alt="Network パネル" class="attempt-right">
[Network] パネルでは、リクエストされたリソースやダウンロードされたリソースを詳しく分析したり、ページの読み込みパフォーマンスを最適化したりできます。

* [[Network] パネルの基本](/web/tools/chrome-devtools/network-performance/resource-loading)
* [Resource Timing について](/web/tools/chrome-devtools/network-performance/understanding-resource-timing)
* [ネットワーク スロットリング](/web/tools/chrome-devtools/network-performance/network-conditions)

<div style="clear:both;"></div>

###  Timeline
<img src="images/timeline-panel.png" alt="Timeline パネル" class="attempt-right">
[Timeline] では、サイトのライフサイクル中に発生するさまざまなイベントの記録や調査によってページの実行時パフォーマンスを向上できます。

* [パフォーマンスの考え方](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)
* [実行時のパフォーマンスの分析](/web/tools/chrome-devtools/rendering-tools/)
* [レイアウトの強制同期の診断](/web/tools/chrome-devtools/rendering-tools/forced-synchronous-layouts)

<div style="clear:both;"></div>

###  Profiles
<img src="images/profiles-panel.png" alt="Profiles パネル" class="attempt-right">
[Profiles] パネルは、メモリリークの追跡などのために、[Timeline] で提供される情報よりさらに多くの情報が必要な場合に使用します。

* [JavaScript CPU プロファイラ](/web/tools/chrome-devtools/rendering-tools/js-execution)
* [ヒープ プロファイラ](/web/tools/chrome-devtools/memory-problems/)

<div style="clear:both;"></div>

###  Application
<img src="images/application-panel.png" alt="Application パネル" class="attempt-right">
[Resources] パネルでは、IndexedDB や Web SQL データベース、ローカル ストレージやセッション ストレージ、Cookie、アプリケーション キャッシュ、画像、フォント、スタイルシートなど、読み込まれたすべてのリソースを調査できます。

* [データの管理](/web/tools/chrome-devtools/manage-data/local-storage)

<div style="clear:both;"></div>

###  Security
<img src="images/security-panel.png" alt="Security パネル" class="attempt-right">
[Security] パネルでは、混合コンテンツの問題、証明書の問題などをデバッグできます。

* [Security](/web/tools/chrome-devtools/security)

<div style="clear:both;"></div>

##  ディスカッションに参加する

[Twitter](https://twitter.com/ChromeDevTools){: .button .button-white}
[Stack Overflow](https://stackoverflow.com/questions/tagged/google-chrome-devtools){: .button .button-white}
[Slack](https://chromiumdev.slack.com/messages/devtools/){: .button .button-white}


{# wf_devsite_translation #}
