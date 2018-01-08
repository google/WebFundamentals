project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: アプリケーション実行中のすべてのアクティビティを記録して分析するには、Chrome DevTools の [Timeline] パネルを使います。アプリケーションで感じたパフォーマンスの問題の調査を開始する場合は、このパネルが適しています。

{# wf_updated_on:2016-03-07 #}
{# wf_published_on:2015-06-08 #}

# Timeline ツールの使い方 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

アプリケーション実行中のすべてのアクティビティを記録して分析するには、Chrome DevTools の Timeline<em></em> パネルを使います。
アプリケーションで感じたパフォーマンスの問題の調査を開始する場合は、このパネルが適しています。



![Timeline ツール](imgs/timeline-panel.png)


### TL;DR {: .hide-from-toc }
- ページの読み込み後またはユーザーの操作後に発生したすべてのイベントを分析するには、Timeline 記録を行います。
- 概要ペインで FPS、CPU、ネットワーク リクエスト数を表示します。
- フレーム チャート内のイベントをクリックして、イベントの詳細を表示します。
- 記録のセクションを拡大して、分析を容易にします。


##  [Timeline] パネルの概要{:#timeline-overview}

[Timeline] パネルは 4 つのペインで構成されます。

1. **コントロール**。記録の開始や停止、記録中に取得する情報の設定を行います。
2. **概要**。
ページのパフォーマンスの概要を示します。詳しくは後ほど説明します。
3. **フレームチャート**。
CPU スタックトレースを表示します。 

**フレーム チャート**には 1～3 本の点線が縦に表示されることがあります。青い線は `DOMContentLoaded` イベントを表します。
緑の線は最初のペイントまでの時間を表します。
赤い線は `load` イベントを表します。

4. **詳細**。イベントを選択すると、そのイベントに関する詳細情報がこのペインに表示されます。
イベントを選択していないときは、選択した期間についての情報がこのペインに表示されます。
 

![注釈付き [Timeline] パネル](imgs/timeline-annotated.png)

###  概要ペイン

**概要**ペインは 3 つのグラフから構成されます。

1. **FPS**。1 秒あたりのフレーム数。緑色の棒グラフが高いほど、FPS も高くなります。
FPS グラフ上部の赤いブロックは時間がかかっているフレームを示し、[問題を含んでいる][jank]可能性があります。
2. **CPU**。
CPU リソース。この[面グラフ][ac]は、CPU リソースを使用しているイベントの種類を示します。
3. **NET**。色分けされた各棒グラフがリソースを表します。棒グラフが長いほど、リソースの取得に時間がかかっています。
棒グラフの色が薄い部分は、待ち時間（リソースがリクエストされてから最初のバイトのダウンロードが終わるまでの時間）を表します。
色の濃い部分は、転送時間（最初のバイトのダウンロードから最後のバイトのダウンロードが終わるまでの時間）を表します。



   棒グラフは次のように色分けされます。
   <!-- source: https://goo.gl/eANVFf -->
   
   * HTML ファイルは**<span style="color:hsl(214, 67%, 66%)">青</span>**です。
   * スクリプトは**<span style="color:hsl(43, 83%, 64%)">黄色</span>**です。
   * スタイルシートは**<span style="color:hsl(256, 67%, 70%)">紫色</span>**です。
   * メディアファイルは**<span style="color:hsl(109, 33%, 55%)">緑</span>**です。
   * その他のリソースは**<span style="color:hsl(0, 0%, 70%)">灰色</span>**です。


![概要ペイン、注釈付き](imgs/overview-annotated.jpg)

[ac]: https://en.wikipedia.org/wiki/Area_chart 
[jank]: /web/fundamentals/performance/rendering/

##  記録

ページの読み込みを記録するには、[**Timeline**] パネルを開き、記録するページを開いて、そのページを再読み込みします。
[**Timeline**] パネルはページの再読み込みを自動的に記録します。


ページの操作を記録するには、[**Timeline**] パネルを開き、**記録**ボタン（![記録ボタン](imgs/record-off.png){:.inline}）をクリックするか、キーボード ショートカット <kbd>Cmd</kbd>+<kbd>E</kbd>（Mac）、<kbd>Ctrl</kbd>+<kbd>E</kbd>（Windows / Linux）を押します。
記録中、**記録**ボタンは赤く表示されます。ページの操作を実行後、**記録**ボタンをクリックするか、キーボード ショートカットをもう一度入力すると、記録が停止します。



記録が完了すると、DevTools によって関連性の高い部分が推測され、その部分が自動的に拡大されます。


###  記録の使い方

* **記録はできるだけ短時間にします**。通常、記録時間が短いほど分析は簡単です。
* **不要なアクションは避けます**。記録や分析の対象とするアクション以外（マウスのクリック、ネットワークの読み込みなど）は避けるようにします。たとえば、ログイン ボタンをクリック後に発生するイベントを記録する場合は、ページのスクロールやイメージの読み込みなどの操作はしないようにします。
* **ブラウザのキャッシュを無効にします**。ネットワーク操作を記録するときは、DevTools の [Settings] パネルまたは[**Network cinditions**][nc]ドロワーからブラウザのキャッシュを無効にすることをお勧めします。
* **拡張機能を無効にします**。Chrome 拡張機能によって、アプリケーションの Timeline 記録に無関係の操作が加わる可能性があります。
Chrome ウィンドウを[シークレット モード][incognito]で開くか、新しい [Chrome ユーザー プロフィール][new chrome profile]を作成して、現在の環境に拡張機能が含まれないようにします。




[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions
[incognito]: https://support.google.com/chrome/answer/95464
[new chrome profile]: https://support.google.com/chrome/answer/142059

##  記録の詳細表示

**フレーム チャート**でイベントを選択すると、**詳細**ペインにそのイベントに関する追加情報が表示されます。


![詳細ペイン](imgs/details-pane.png)

[**Summary**] のように、一部のタブはすべての種類のイベントに表示されます。また、特定の種類のイベントにしか表示されないタブもあります。
各種記録について詳しくは、[Timeline イベント リファレンス][event reference]をご覧ください。


[event reference]: /web/tools/chrome-devtools/profile/evaluate-performance/performance-reference

##  記録中のスクリーンショットの取得{:#filmstrip}

[**Timeline**] パネルでは、ページの読み込み中にスクリーンショットを取得できます。この機能を「**Filmstrip**」と呼びます。


記録のスクリーンショットを取得するには、記録を作成する前に、**コントロール**ペインの [**Screenshots**] チェックボックスをオンにします。
スクリーンショットは**概要**ペインの下に表示されます。


![Filmstrip による Timeline の記録](imgs/timeline-filmstrip.png)

**スクリーンショット** ペインまたは**概要**ペインにマウスカーソルを合わせると、その時点の記録のスクリーンショットが拡大表示されます。
マウスを左右に動かして記録のアニメーションのシミュレーションを行います。


<video src="animations/hover.mp4" autoplay muted loop controls></video>

##  JavaScript のプロファイル{:#profile-js}

Timeline 記録で JavaScript のスタックを取得するには、[**JS Profile**] チェックボックスをオンにします。
JS プロファイラを有効にすると、呼び出された JavaScript 関数がフレーム チャートに表示されます。
 

![JS Profile を有効にしたフレームチャート](imgs/js-profile.png)

##  ペイントのプロファイル{:#profile-painting}

記録を取って **Paint** イベントに対するインサイトを得るには、[**Paint**] チェックボックスをオンにします。
ペイントのプロファイリングを有効にして、[**Paint**] イベントをクリックすると、新しい [**Paint Profiler**] タブが**詳細**ペインに表示され、イベントについての詳しい情報が表示されます。



![Paint Profiler](imgs/paint-profiler.png)

###  レンダリングの設定{:#rendering-settings}

DevTools のメインメニューを開き、[**More tools**]、[**Rendering settings**] の順に選択してレンダリングの設定にアクセスします。この設定は、ペイントの問題のデバッグに役立ちます。レンダリングの設定は、[**Console**] ドロワーの隣のタブに表示されます（ドロワーが表示されていない場合は、<kbd>esc</kbd> キーを押して表示します）。




![レンダリングの設定](imgs/rendering-settings.png)

##  記録の検索

イベントを表示中に、ある種類のイベントに注目したい場合があります。たとえば、各 `Parse HTML` イベントの詳細を表示する必要があるとします。
 

**Timeline** にカーソルを合わせた状態で <kbd>Cmd</kbd>+<kbd>F</kbd>（Mac）、または <kbd>Ctrl</kbd>+<kbd>F</kbd>（Windows / Linux）を押して、検索ツールバーを開きます。`Event` など、検査するイベントの種類名を入力します。

ツールバーは現在選択している期間にのみ適用されます。選択した期間外のイベントは結果に含まれません。
 

上矢印と下矢印を使って、時系列に結果を移動します。先頭の結果は選択した期間に発生した最初のイベントを表し、末尾の結果は最後に発生したイベントを表します。
上矢印または下矢印を押すたびに新しいイベントが選択され、**詳細**ペインにそのイベントの詳細が表示されます。上矢印や下矢印を押しても、**フレーム チャート**のイベントをクリックしても同じ結果が得られます。


![検索ツールバー](imgs/find-toolbar.png)

##  Timeline セクションの拡大表示{:#zoom}

記録のセクションの 1 つを拡大表示して簡単に分析できるようにします。**概要**ペインを使って、記録のセクションの 1 つを拡大します。
拡大後には、同じセクションに合わせて**フレーム チャート**が自動的に拡大されます。


![Timeline 記録のセクションを拡大](imgs/zoom.png)

Timeline のセクションを拡大するには、以下のいずれかの方法を使用します。

* **概要**ペインで、マウスをドラッグして Timeline の選択範囲を広げます。
* ルーラー領域で灰色のスライダーを調整します。

セクションの選択後、<kbd>W</kbd> キー、<kbd>A</kbd> キー、<kbd>S</kbd> キー、<kbd>D</kbd> キーを使用して選択範囲を調整します。
<kbd>W</kbd> キーは拡大、<kbd>S</kbd> キーは縮小を行います。
<kbd>A</kbd> キーと <kbd>D</kbd> キーはそれぞれ左と右に移動します。


##  記録の保存と読み込み

記録を保存または開くには、**概要**ペイン内または**フレーム チャート**ペイン内を右クリックして関連オプションを選択します。


![記録の保存と開く](imgs/save-open.png)


{# wf_devsite_translation #}
