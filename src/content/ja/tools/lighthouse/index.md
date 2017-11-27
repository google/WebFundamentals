project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse を設定してウェブアプリを監査する方法について説明します。

{# wf_updated_on:2016-09-27 #}
{# wf_published_on:2016-09-27 #}

# Lighthouse によるウェブアプリの監査 {: .page-title }

[Lighthouse](https://github.com/GoogleChrome/lighthouse) はオープンソースの自動化されたツールでウェブアプリの品質向上に役立ちます。
このツールは Chrome 拡張機能として実行するか、コマンドラインから実行できます。
Lighthouse に監査したい URL を指定して実行すると、ページに対する集中的なテストを実行してパフォーマンスに関するレポートを生成できます。
今後は弱点を検出するテストを利用して、アプリの品質改善の指針を得られるようになります。


注: Lighthouse は現在、ホーム画面への追加やオフライン サポートをはじめとする Progressive Web App 機能に重点をおいています。また一方で、このプロジェクトの包括的な目標は、ウェブアプリ品質のあらゆる側面を網羅した、エンドツーエンドの監査を提供することです。

##  使ってみる

Lighthouse を実行するには 2 つの方法があります。Chrome 拡張機能として実行する方法と、コマンドライン ツールとして実行する方法です。
Chrome 拡張機能では、よりユーザー フレンドリーなインターフェースでレポートを確認できます。
コマンドライン ツールとして実行した場合は、Lighthouse を統合システムの一部として使うことができます。


###  Chrome 拡張機能

Google Chrome 52 以降をダウンロードします。

[Lighthouse Chrome 拡張機能](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)をインストールします。

監査するページに移動します。

Chrome ツールバーの Lighthouse アイコン（![Lighthouse アイコン](images/lighthouse-icon-16.png)）をクリックします。


![Chrome ツールバーの Lighthouse アイコン](images/icon-on-toolbar.png)

ツールバーにアイコンが見当たらないときは、Chrome のメインメニューに隠れている場合があります。


![Chrome のメニューの中の Lighthouse アイコン](images/icon-in-menu.png)

アイコンをクリックすると、メニューが表示されます。

![Lighthouse メニュー](images/menu.png)

監査のサブセットのみを実行する場合は、[**Options**] ボタンをクリックして必要のない監査を無効にします。
変更を確定するには、スクロール ダウンして [**OK**] を押します。


![Lighthouse のオプション メニュー](images/options.png)

[**Generate report**] ボタンをクリックすると、現在開いているページに対して Lighthouse のテストが実行されます。


監査が終了すると Lighthouse で新しいタブが開き、ページのテスト結果のレポートが表示されます。


![Lighthouse のレポート](images/report.png)

###  コマンドライン ツール

[Node](https://nodejs.org) のバージョン 5 以降をインストールします。

Lighthouse をグローバル Node モジュールとしてインストールします。

    npm install -g lighthouse

ページに対して Lighthouse の監査を実行します。

    lighthouse https://airhorner.com/

`--help` フラグを使うと、利用可能な入力オプションと出力オプションを確認できます。

    lighthouse --help

##  プロジェクトへの貢献

Lighthouse はオープンソースであるため、プロジェクトへの貢献をお待ちしています。レポジトリの [[Issues] トラッカー](https://github.com/GoogleChrome/lighthouse/issues)では、修正可能なバグや、作成または改良できる監査を調べることができます。また、この Issues トラッカーでは監査の指標や新しいアイデアに関する意見交換をしたり、Lighthouse
に関するさまざまな内容を話し合うことができます。





{# wf_devsite_translation #}
