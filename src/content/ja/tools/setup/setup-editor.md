project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: コードエディタが主要開発ツールです。コードエディタを使って、コード行を記述し、保存します。優れたコードを短時間で記述できるよう、エディタのショートカットを習得し、主要プラグインをインストールします。

{# wf_updated_on:2015-04-13 #}
{# wf_published_on:2014-05-28 #}

# エディタの設定 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

コードエディタが主要開発ツールです。コードエディタを使って、コード行を記述し、保存します。優れたコードを短時間で記述できるよう、エディタのショートカットを習得し、主要プラグインをインストールします。


### TL;DR {: .hide-from-toc }
- 優れたコードを記述できるように、ショートカットをカスタマイズでき、多くのプラグインが用意されているエディタを選択します。
- プラグインの検出、インストール、アップデートが簡単に行えるように、Package Manager を使用します。
- 開発中に生産性を確保できるプラグインをインストールします。まず、このガイドの推奨プラグインをインストールします。


## Sublime テキストエディタのインストール

[Sublime](http://www.sublimetext.com/){: .external } は、コードを簡単に記述できるようにする、信頼できる基礎レベルの機能を備えた優れたエディタです。
プラグインのインストールと新しい機能の追加を簡単に行うことができる Package Manager をインストールできます。


現状、Sublime Text のダウンロード オプションには[バージョン 2](http://www.sublimetext.com/2) と[バージョン 3](http://www.sublimetext.com/3) の 2 つがあります。バージョン 3 は非常に安定していて、Sublime Text 2 では利用できないパッケージにアクセスできますが、信頼性はバージョン 2 の方が高く感じられます。

注: エディタを最大限に活用するには、Sublime の理解を深める方法を紹介する Rob Dodson 氏の<a href='http://robdodson.me/blog/2012/06/23/sublime-text-2-tips-and-shortcuts/'>ブログ投稿</a>が参考になります。ブログで示されているコンセプトは、Sublime だけでなく、すべてのテキスト エディタに関係します。

## Package Manager を使う理由

Package Manager によって、パッケージやプラグインの検索、インストール、アップデートが簡単になります。


<img src="imgs/package_control.png" class="center" alt="Sublime テキスト エディタの Package Control のスクリーンショット"/>

[https://packagecontrol.io/installation](https://packagecontrol.io/installation) で示される手順に従って、Sublime 用 Package Manager をインストールします。


インストールは 1 回だけで、インストール後には推奨プラグインの一覧が表示されます。


## プラグインのインストール

プラグインは生産性を確保するのに役立ちます。状況によっては他のツールも必要になります。


たとえば、Linting のプラグインがあります。コミットされていない変更を表示する
- プラグインもあります。GitHub などは、さまざまなプラグインを統合するツールです。


Package Manager を使って、プラグインの検出、インストール、アップデートを簡単に行うことができます。

1. Sublime Text エディタで、Package Manager を開きます（Ctrl+Shift+P）。
2. 「Install Package」と入力します。
3. 検索するプラグインの名前を入力します（または、すべてのプラグインをブラウジングします）。


[人気の Sublime Text プラグインの一覧](https://packagecontrol.io/browse)をご覧ください。
ここからは、開発速度が上がるため、インストールをお勧めするプラグインを紹介します。


### Autoprefixer

ベンダー プレフィックスを CSS にすばやく追加するには、このプラグインが便利です。


CSS の作成時にはベンダー プレフィックスのことを考えず、追加が必要になったら `ctrl+shift+p` を押して、「`Autoprefix CSS`」と入力します。


[ビルドプロセスでこれを自動的に処理する方法については、こちらをご覧ください](/web/tools/setup/setup-buildtools)。自動化すれば、効率良く CSS を作成できるだけでなく、`ctrl+shift+p` を押し忘れることもありません。




<img src="imgs/sublime-autoprefixer.gif" alt="Sublime Autoprefixer プラグインの例" />

### ColorPicker

パレットから色を選択し、`ctrl+shift+c` を押して CSS にその色を追加します。

<img src="imgs/sublime-color-picker.png" alt="Sublime ColorPicker プラグイン" />

### Emmet

便利なキーボード ショートカットとスニペットをテキストエディタに追加します。[Emmet.io](http://emmet.io/){: .external } で、Emmet を使ってできることを紹介する動画をご覧ください（個人的なお気に入りは Toggle Comment コマンドです）。



<img src="imgs/emmet-io-example.gif" alt="Emmet.io プラグインのデモ" />

### HTML-CSS-JS Prettify

この拡張機能では、HTML、CSS、JS の書式を整えるコマンドが提供されます。ファイルを保存するたびにファイル内容を調整することもできます。


<img src="imgs/sublime-prettify.gif" alt="Sublime Prettify プラグインの gif" />

### Git Gutter

ファイルの変更箇所の余白にマーカーを追加します。

<img src="imgs/sublime-git-gutter.png" alt="Sublime Git Gutter プラグインのスクリーンショット" />

### Gutter Color

注: このプラグインは Sublime Text 3 でのみ使用可能です。

Gutter Color により、CSS の横の余白に小さいカラーサンプルが表示されます。

<img src="imgs/sublime-gutter-color.png" alt="Sublime Gutter Color のスクリーンショット" />

このプラグインを使用するには ImageMagick が必要です。Mac OS X の場合は、[CactusLabs](http://cactuslab.com/imagemagick/){: .external } からインストーラを入手することをお勧めします（ImageMagick を使用する場合、PC の再起動が必要になる場合があります）。







{# wf_devsite_translation #}
