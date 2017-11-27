project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools JavaScript コンソールの操作方法について説明します。

{# wf_updated_on:2016-02-01 #}
{# wf_published_on:2015-05-10 #}

#  コンソールの使用 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/andismith.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

ここでは、DevTools コンソールを開く方法、重複するメッセージをスタックするか個々の行に表示する方法、出力をクリア、保持、またはファイルに保存する方法、出力のフィルタ方法、その他のコンソール設定にアクセスする方法について説明します。




### TL;DR {: .hide-from-toc }
- コンソールを専用のパネル、または他のパネルに隣接するドロワーとして開きます。
- 重複するメッセージは、スタックするか、個々の行に表示します。
- 出力をクリア、ページ間で保持、またはファイルに保存します。
- 出力は、重要度や正規表現パターンでフィルタしたり、ネットワーク メッセージを非表示にすることによってフィルタしたりできます。

##  コンソールを開く

フルスクリーンの専用パネルとしてアクセスしたコンソール:

![[Console] パネル](images/console-panel.png)

他のパネルに隣接するドロワーとして開いた場合:

![[Console] ドロワー](images/console-drawer.png)

###  パネルとして開く

次のいずれかの方法で、専用の [**Console**] パネルとして開きます。

* <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd>（Windows / Linux）または <kbd>Cmd</kbd>+<kbd>Opt</kbd>+<kbd class="kbd">J</kbd>（Mac）を押します。
* DevTools が既に開いている場合は、[**Console**] ボタンをクリックします。

[Console] パネルを開くと、[Console] ドロワーは自動的に折りたたまれます。

###  ドロワーとして開く

次のいずれかの方法で、コンソールを他のパネルに隣接するドロワーとして開きます。

* DevTools がフォーカスされている状態で <kbd>Esc</kbd> キーを押します。
* [**Customize and control DevTools**] ボタンをクリックしてから [**Show console**] をクリックします。


![Show console](images/show-console.png)

##  メッセージ スタッキング

連続して繰り返されるメッセージの場合は、各インスタンスが新しい行に出力されるのではなく、「スタック」されて左側の余白に数字が表示されます。
この数字は、メッセージが繰り返された回数を示します。


![メッセージ スタッキング](images/message-stacking.png)

メッセージが記録されるたびに 1 行ずつエントリを表示するには、DevTools の設定で [**Show timestamps**] をオンにします。


![Show timestamps](images/show-timestamps.png)

各メッセージのタイムスタンプが異なるため、各メッセージは個々の行に表示されます。


![タイムスタンプが表示されたコンソール](images/timestamped-console.png)

##  コンソール履歴の使用

###  履歴のクリア {: #clearing}

コンソール履歴は、次のいずれかの方法でクリアできます。

* コンソール内を右クリックし、[**Clear console**] をクリックします。
* コンソールで「`clear()`」と入力します。
* JavaScript コード内から `console.clear()` を呼び出します。
* <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">L</kbd> を押します（Mac、Windows、Linux）。


###  履歴の保持 {: #preserve-log}

ページを更新または変更してもコンソール履歴を保持するには、コンソールの上部にある [**Preserve log**] チェックボックスをオンにします。
コンソールをクリアするかタブを閉じるまでメッセージは保存されます。


###  履歴の保存

コンソールの出力をログファイルに保存するには、コンソール内で右クリックして [**Save as**] を選択します。


![コンソールを保存してログファイルに保存](images/console-save-as.png)

##  実行コンテキストの選択 {: #execution-context }

下記のスクリーンショットで青色にハイライト表示されたドロップダウン メニューは [**Execution Context Selector**] と呼ばれています。


![Execution Context Selector](images/execution-context-selector.png)

コンテキストは通常 `top`（ページの一番上のフレーム）に設定されています。

他のフレームや拡張機能はそれぞれのコンテキストで動作します。こうした他のコンテキストを使用するには、このドロップダウン メニューから選択する必要があります。
たとえば、`<iframe>` 要素のログ出力を見てそのコンテキスト内にある変数を変更する場合は、[Execution Context Selector] ドロップダウン メニューから選択する必要があります。




他のコンテキスト内で要素を調査して DevTools にアクセスしない限り、コンソールはデフォルトで `top` コンテキストになります。
たとえば、ある `<iframe>` 内で `<p>` 要素を調査した場合、DevTools では [Execution Context Selector] がその `<iframe>` のコンテキストに設定されます。



`top` 以外のコンテキストで作業中は、DevTools では [Execution Context Selector] が下記のスクリーンショットのように赤くハイライト表示されます。
これは、デベロッパーが `top` 以外のコンテキストで作業する必要がほとんどないためです。
変数を入力して値を想定していたら、それが `undefined`（別のコンテキストで定義されているため）という結果になれば、非常に混乱するおそれがあります。



![赤くハイライト表示される [Execution Context Selector]](images/non-top-context.png)

##  コンソール出力のフィルタリング

コンソール出力をフィルタするには、[**Filter**] ボタン（![[Filter] ボタン](images/filter-button.png){:.inline}）をクリックします。

重要度や正規表現でフィルタしたり、ネットワーク メッセージを非表示にすることによってフィルタできます。


![フィルタされたコンソール出力](images/filtered-console.png)

重要度によるフィルタリングは以下のとおりです。

<table class="responsive">
  <thead>
     <tr>
      <th colspan="2">オプション &amp; 表示</th>
    </tr>   
  </thead>
  <tbody>
  <tr>
    <td>All</td>
    <td>すべてのコンソール出力を表示します。</td>
  </tr>
  <tr>
    <td>Errors</td>
    <td><a href="/web/tools/chrome-devtools/debug/console/console-reference#consoleerrorobject--object-">console.error()</a> からの出力のみを表示します。</td>
  </tr>
  <tr>
    <td>Warnings</td>
    <td><a href="/web/tools/chrome-devtools/debug/console/console-reference#consolewarnobject--object-">console.warn()</a> からの出力のみを表示します。</td>
  </tr>
  <tr>
    <td>Info</td>
    <td><a href="/web/tools/chrome-devtools/debug/console/console-reference#consoleinfoobject--object-">console.info()</a> からの出力のみを表示します。</td>
  </tr>
  <tr>
    <td>Logs</td>
    <td><a href="/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-">console.log()</a> からの出力のみを表示します。</td>
  </tr>
  <tr>
    <td>Debug</td>
    <td><a href="/web/tools/chrome-devtools/debug/console/console-reference#consoletimeendlabel">console.timeEnd()</a> および <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoledebugobject--object-">console.debug()</a> からの出力のみを表示します。</td>
  </tr>
  </tbody>
</table>

##  その他の設定

DevTools の設定を開き、[**General**] タブに移動して、コンソール設定が見えるように [**Console**] セクションまでスクロール ダウンします。


![Console settings](images/console-settings.png)

<table class="responsive">
  <thead>
     <tr>
      <th colspan="2">設定 &amp; 説明</th>
    </tr>   
  </thead>
  <tbody>
  <tr>
    <td>Hide network messages</td>
    <td>デフォルトでは、コンソールではネットワーク問題が報告されます。これをオンにすると、コンソールにこれらのエラーのログが表示されなくなります。たとえば、404 シリーズや 500 シリーズのエラーはログに記録されません。</td>
  </tr>
  <tr>
    <td>Log XMLHttpRequests</td>
    <td>各 XMLHttpRequest をコンソールに記録するかどうかを決定します。</td>
  </tr>
  <tr>
    <td>Preserve log upon navigation</td>
    <td>ページの更新または操作中にコンソール履歴を保持します。</td>
  </tr>
  <tr>
    <td>Show timestamps</td>
    <td>各コンソール メッセージの前に、呼び出しの日時を示すタイムスタンプが付けられます。特定のイベントがいつ発生したかをデバッグする場合に役立ちます。これをオンにすると、メッセージ スタッキングは無効になります。</td>
  </tr>
  <tr>
    <td>Enable custom formatters</td>
    <td>JavaScript オブジェクトの <a href="https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview">フォーマット</a>を制御します。</td>
  </tr>
  </tbody>
</table>


{# wf_devsite_translation #}
