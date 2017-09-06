project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: DevTools の外観を変え、表示されていない機能にアクセスします。

{# wf_updated_on:2016-07-26 #}
{# wf_published_on:2016-03-28 #}

# DevTools の設定とカスタマイズ {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

DevTools の外観を変え、表示されていない機能にアクセスします。



### TL;DR {: .hide-from-toc }
- メインメニューと [Settings] メニューを開きます。
- DevTools の外観をカスタマイズします。
- 表示されていない機能にアクセスします。


##  メインメニューを開く{:#main-menu}

DevTools の**メインメニュー**は、DevTools の外観の設定、別のツールへのアクセス、[Settings] を開くなど、さまざまな操作を行うドロップダウン メニューです。


メインメニューを開くには、DevTools ウィンドウの右上にある**メインメニュー** ボタンをクリックします。


![メインメニュー](images/main-menu.png)

##  [Settings] を開く{:#settings}

DevTools の [Settings] を開くには、DevTools にフォーカスを設定した状態で <kbd>F1</kbd> キーを押すか、[メインメニューを開き](#main-menu)、[**Settings**] を選択します。


##  コマンド メニューを開く{:#command-menu}

<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（Mac）を押すか、<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（Windows、Linux）を押してコマンド メニューを開きます。



![コマンド メニュー](images/command-menu.png)

##  パネルのタブの並べ替え{:#panel-tabs}

パネルのタブをクリックしたままドラッグし、タブの順序を変えます。カスタムタブの順序は、DevTools のすべてのセッションで維持されます。


たとえば、既定の状態では [**Network**] タブが通常左から 4 番目の位置にあります。

![並べ替え前](images/before-reorder.png)

このタブを、左端など、任意の位置にドラッグできます。

![並べ替え後](images/after-reorder.png)

##  DevTools の位置のカスタマイズ{:#placement}

DevTools は、ページの一番下やページの右側に配置したり、新しいウィンドウで開いたりすることができます。
 

DevTools の位置を変えるには、[メインメニューを開いて](#main-menu) **固定を解除して個別のウィンドウにする**（(![固定解除ボタン](images/undock.png){:.inline}）ボタン、**下部に固定する**（![下部に固定ドするボタン](images/dock-bottom.png){:.inline}）ボタン、または**右側に固定する**]（![右側に固定するボタン](images/dock-right.png){:.inline}）ボタンを選択します。







 

##  Dark テーマの使用{:#dark-theme}

DevTools の Dark テーマを使用するには、[DevTools の [Settings] を開き](#settings)、[**Preferences**] ページに移動します。[**Appearance**] セクションを見つけて、[**Theme**] ドロップダウン メニューから [**Dark**] を選択します。



![Dark テーマ](images/dark-theme.png)

##  ドロワーのタブの表示と非表示{:#drawer-tabs}

<kbd>Esc</kbd> キーを押して DevTools の**ドロワー**を開いたり閉じたりします。以下のスクリーンショットは、下部に [**Console**] ドロワーが開いた状態の [**Elements**] パネルの例を示しています。



![ドロワーを表示する [Elements] パネル](images/drawer.png)

ドロワーから、[Console] でのコマンドの実行、Animation Inspector の表示、ネットワーク状態やレンダリング設定の構成、文字列やファイルの検索、モバイル センサーのエミュレーションなどを実行できます。



ドロワーが開いた状態で、[**Console**] タブの左にある 3 ドットアイコン（![3 ドットアイコン](images/three-dot.png){:.inline}）をクリックし、ドロップダウン メニュー オプションの 1 つを選択して、他のタブを開きます。




![ドロワーのタブのメニュー](images/drawer-tabs.png)

##  [Experiments] の有効化{:#experiments}

DevTools の [Experiments] を有効にすると、[**Experiments**] という新しいページが DevTools の [Settings] に表示されます。
このページから、試験運用版機能を有効または無効にできます。


[Experiments] を有効にするには、`chrome://flags/#enable-devtools-experiments` に移動して [**Enable**] をクリックします。
ページの一番下にある [**Relaunch Now**] ボタンをクリックします。
 

DevTools の [Settings] を開くと、[**Experiments**] という新しいページが表示されるようになります。


![DevTools の [Experiments]](images/experiments.png)

##  印刷メディアのエミュレーション{:#emulate-print-media}

印刷プレビュー モードでページを表示するには、[DevTools のメインメニューを開き](#main-menu)、[**More Tools**]、[**Rendering Settings**] の順に選択して、[**emulate media**] チェックボックスを有効にし、そのドロップダウン メニューで [**print**] を設定します。



![印刷プレビュー モードの有効化](images/emulate-print-media.png)

##  HTML コメントの表示{: #show-html-comments }

[**Elements**] パネルで HTML コメントを表示または非表示にするには、[[**Settings**] を開き](#settings)、[**Preferences**] パネルに移動します。[**Elements**] セクションを見つけて、[**Show HTML comments**] チェックボックスを切り替えます。




{# wf_devsite_translation #}
