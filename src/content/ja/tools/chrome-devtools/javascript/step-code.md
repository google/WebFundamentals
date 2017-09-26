project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: コードを行または関数ごとに実行すると、データやページ内の変更を観察して、何が起こっているかを正確に把握できます。

{# wf_updated_on: 2015-09-01 #}
{# wf_published_on: 2015-04-13 #}

# コードをステップ実行する方法 {: .page-title }

{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

コードを行または関数ごとに実行すると、データやページ内の変更を観察して、何が起こっているかを正確に把握できます。スクリプトで使用されているデータ値を変更したり、スクリプト自体を変更したりすることもできます。

「この変数値が 30 ではなく 20 なのはなぜでしょうか。そのコード行が作用していないように見えるのはなぜでしょうか。false にすべきこのフラグが true なのはなぜでしょうか」。どの開発者も直面するこれらの問題について、コードをステップ実行して確認します。

[ブレークポイントの設定](add-breakpoints)後、ページに戻り、ブレークポイントに到達するまで通常どおりページを使用します。到達すると、ページ上ですべての JavaScript が一時停止し、フォーカスが DevTools の [Sources] パネルに移り、ブレークポイントがハイライト表示されます。ここで、選択的にコードを実行し、段階を追ってそのデータを調べることができます。


### TL;DR {: .hide-from-toc }
- 問題が発生する前、または発生している間にコードをステップ実行して問題を観察し、ライブ エディットにより変更をテストします。
- ログに記録されたデータはコンソールに到着した時点で既に古くなっているため、コンソールのログ記録よりもステップ実行を優先させてください。
- 非同期コールスタック機能を有効にすると、非同期関数のコールスタックを把握しやすくなります。
- コールスタックからサードパーティ コードを非表示にするには、スクリプトをブラックボックス化します。
- 匿名関数ではなく名前付き関数を使用すると、コールスタックがわかりやすくなります。


##  ステップイン アクション

すべてのステップ オプションは、サイドバーにクリック可能なアイコン ![ブレークポイント ボタンバー](imgs/image_7.png){:.inline}として表示されますが、ショートカットからトリガーすることもできます。次に要約を示します。

<table>
  <thead>
    <tr>
      <th data-th="Icon/Button">アイコン / ボタン</th>
      <th data-th="Action">アクション</th>
      <th data-th="Description">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_8.png" alt="Resume" class="inline"></td>
      <td data-th="Action">Resume</td>
      <td data-th="Description">実行を再開して次のブレークポイントまで進みます。ブレークポイントが見つからない場合は、通常の実行が再開されます。</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_9.png" alt="Long Resume" class="inline"></td>
      <td data-th="Action">Long Resume</td>
      <td data-th="Description">ブレークポイントを 500 ミリ秒間無効にして実行を再開します。ループ内のブレークポイントなど、コードを頻繁に一時停止するブレークポイントを一時的にスキップする場合に便利です。<p><b>展開してアクションが表示されるまで [Resume] をクリックし続けます。<i></i></b></p></td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_10.png" alt="Step Over" class="inline"></td>
      <td data-th="Action">Step Over</td>
      <td data-th="Description">実行される内容に関係なく次の行で処理を実行し、次の行にジャンプします。</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_11.png" alt="Step Into" class="inline"></td>
      <td data-th="Action">Step Into</td>
      <td data-th="Description">次の行に関数呼び出しが含まれている場合、[Step Into] はその関数にジャンプし、最初の行で関数を一時停止します。<i></i></td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_12.png" alt="Step Out" class="inline"></td>
      <td data-th="Action">Step Out</td>
      <td data-th="Description">現在の関数の残りの部分を実行し、関数呼び出し後の次の文で一時停止します。</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_13.png" alt="Deactivate breakpoints" class="inline"></td>
      <td data-th="Action">Deactivate breakpoints</td>
      <td data-th="Description">すべてのブレークポイントを一時的に無効にします。ブレークポイントを実際に削除することなく、完全な実行を再開する場合に使用します。もう一度クリックすると、ブレークポイントが再度有効になります。</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_14.png" alt="Pause on exceptions" class="inline"></td>
      <td data-th="Action">Pause on exceptions</td>
      <td data-th="Description">例外が発生した場合に、コードを自動的に一時停止します。</td>
    </tr>
  </tbody>
</table>

[**Step Into**] は、ステップインおよびステップアウトする関数に関係なく、1 つの文のみを実行するため、一般的な「一度に 1 行ずつ」のアクションとして使用します。

捕捉されない例外により問題が発生していることが疑われますが、その問題の発生場所がわからない場合は、[Pause on exceptions](add-breakpoints#break-on-uncaught-exception) を使用します。このオプションを有効にした場合、[**Pause On Caught Exceptions**] チェックボックスをオンにして微調整できます。この場合、実行は明確に処理される例外が発生した場合にのみ一時停止します。

##  スコープによるプロパティの表示{: #scope }

スクリプトを一時停止すると、現在定義されているすべてのプロパティが [**Scope**] ペインに瞬時に表示されます。


このペインは、以下のスクリーンショットでは青色でハイライト表示されています。

![\[Sources\] パネルの \[Scope\] ペイン](imgs/scope-pane.png)

[Scope] ペインにはスクリプトが一時停止された場合のみ表示されます。ページの実行中は、[Scope] ペインは空です。


[Scope] ペインに表示されるプロパティは、ローカル レベル、クロージャ レベル、グローバル レベルで定義されたプロパティです。


プロパティの横にカラット アイコンがある場合は、それがオブジェクトであることを意味します。カラット アイコンをクリックしてオブジェクトを展開すると、そのプロパティが表示されます。


プロパティが淡色で表示されることもあります。たとえば、以下のスクリーンショットでは、`constructor` プロパティは `confirm` プロパティよりも淡色で表示されています。


![淡色表示されたプロパティ](imgs/enumerables.png)

濃色で表示されたプロパティは列挙可能です。淡色で表示されたプロパティはそうではありません。
詳しくは、Stack Overflow スレッド（[What do the colors mean in Chrome Developer Tools Scope panel?](What do the colors mean in Chrome Developer Tools Scope panel?)）をご覧ください。


##  コールスタック

サイドバーの上部近くに [**Call Stack**] セクションがあります。コードがブレークポイントで一時停止すると、コードのこのブレークポイントまでの実行パスが、コールスタックに新しい順で表示されます。これは、現在の実行がどこにあるかだけでなく、これまでの過程（デバッグにおける重要な要素）もわからない場合に役立ちます。

### 例

<img src="imgs/image_15.png" alt="Call stack" class="attempt-left">

最初の onclick イベントは `index.html` ファイルの 50 行目にありますが、これが `setone()` 関数（JavaScript ファイル `dgjs.js` の 18 行目）を呼び出し、次に `setall()` 関数（同じファイルの 4 行目）を呼び出して、実行が現在のブレークポイントで一時停止しています。




<div class="clearfix"></div>

###  非同期コールスタックの有効化

非同期コールスタック機能を有効にすると、非同期関数呼び出しの実行を把握しやすくなります。


1. DevTools の [**Sources**] パネルを開きます。
2. [**Call Stack**] ペインで、[**Async**] チェックボックスをオンにします。

以下の動画は、非同期コールスタック機能のデモを示す単純なスクリプトを示しています。
スクリプトでは、サードパーティ ライブラリを使用して DOM 要素を選択しています。
`onClick` という関数が要素の `onclick` イベント ハンドラとして登録されています。
`onClick` が呼び出されるたびに、`f` という関数が呼び出され、スクリプトは強制的に `debugger` キーワードで一時停止されます。

 

<video src="animations/async-call-stack-demo.mp4"
       autoplay muted loop controls></video>

動画では、ブレークポイントがトリガーされ、コールスタックが展開されています。スタックには、1 つの呼び出し `f` のみがあります。
非同期コールスタック機能を有効にしてスクリプトを再開すると、ブレークポイントが再度トリガーされ、コールスタックが再び展開されます。
今度はコールスタックに `f` までのすべての呼び出し（サードパーティ ライブラリの呼び出しや `onClick` の呼び出しを含む）が含まれています。
最初にスクリプトが呼び出されたときは、コールスタックに呼び出しが 1 つしかありませんでした。
2 回目は、4 つありました。つまり、非同期コールスタック機能を使用すると、非同期関数のコールスタック全体が把握しやすくなります。



###  ヒント: 関数には、コールスタックがわかりやすくなるように名前を付けます。

匿名関数を使用すると、コールスタックがわかりにくくなります。関数には、わかりやすい名前を付けてください。


以下の 2 つのスクリーンショットのコード スニペットは、機能的には同じです。コードの正確な機能は重要ではありません。重要なのは、最初のスクリーンショットのコードで匿名関数が使用され、2 つ目のスクリーンショットのコードで名前付き関数が使用されていることです。




最初のスクリーンショットのコールスタックでは、上の 2 つの関数に `(anonymous function)` というタイトルだけが付いています。
2 つ目のスクリーンショットでは、上の 2 つの関数に名前が付いているため、プログラム フローが一目でわかります。
サードパーティのライブラリやフレームワークなど、多くのスクリプト ファイルを使用し、コールスタックの呼び出しの深さが 5 または 10 の場合は、関数に名前を付けると、コールスタック フローが理解しやすくなります。




匿名関数を含むコールスタック:

![わかりにくい匿名関数を含むコールスタック](imgs/anon.png)

名前付き関数を含むコールスタック: 

![わかりやすい名前付き関数を含むコールスタック](imgs/named.png)

<!-- blackbox OR disable third-party code??? -->

###  サードパーティ コードのブラックボックス化

サードパーティ ファイルがコールスタックに表示されないようにするには、スクリプト ファイルをブラックボックス化します。

ブラックボックス化前:

![ブラックボックス化前のコールスタック](imgs/before-blackbox.png)

ブラックボックス化後:

![ブラックボックス化後のコールスタック](imgs/after-blackbox.png)

ファイルをブラックボックス化するには、次の手順に従います。

1. DevTools の [Settings] を開きます。

   ![DevTools の [Settings] を開く](imgs/open-settings.png)

2. 左側のナビゲーション メニューで、[**Blackboxing**] をクリックします。

   ![Chrome DevTools の [Blackboxing] パネル](imgs/blackbox-panel.png)

3. [**Add pattern**] をクリックします。

4. [**Pattern**] テキスト項目に、コールスタックから除外するファイル名パターンを入力します。
DevTools により、そのパターンに一致するスクリプトが除外されます。
 

   ![ブラックボックス パターンの追加](imgs/add-pattern.png)

5. テキスト項目の右側にあるドロップダウン メニューで、[**Blackbox**] を選択して、スクリプト ファイルを実行し、呼び出しをコールスタックから除外します。または、[**Disabled**] を選択して、ファイルが実行されないようにします。



6. [**Add**] をクリックして保存します。

次回ページを実行してブレークポイントがトリガーされたときに、ブラックボックス化されたスクリプトからの関数呼び出しは、コールスタックに表示されません。


##  データ操作

コードの実行を一時停止すると、処理中のデータを観察したり変更したりできます。これは、値が間違っていると思われる変数や、渡したものの想定どおりに受け入れられないパラメータを追跡する場合に重要です。

[**Show/Hide drawer**] ![Show/Hide drawer](imgs/image_16.png){: .inline} をクリックするか、<kbd class="kbd">ESC</kbd> キーを押して [Console] ドロワーを表示します。ステップ実行中にコンソールを開いていると、次の操作を実行できます。

* 変数の名前を入力して、現在の関数のスコープ内における現在の値を確認できます。
* JavaScript 代入文を入力して、値を変更できます。

値を変更して実行を続行し、コードの結果がどのように変わるか、想定どおりに動作するかどうかを確認します。

#### 例

<img src="imgs/image_17.png" alt="Console Drawer" class="attempt-left">

パラメータ `dow` の値は現在 2 ですが、実行を再開する前に手動で 3 に変更しています。


<div class="clearfix"></div>

##  ライブ エディット

実行中のコードを観察や一時停止することによりエラーを特定し、ライブ エディットによって、再度読み込むことなく即座に変更をプレビューできます。

スクリプトをライブ エディットするには、ステップ実行中に [Sources] パネルのエディタ部分をクリックするだけです。エディタで変更を加え、<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">S</kbd>（または Mac の場合は <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">S</kbd>）で変更をコミットします。この時点で、JS ファイル全体が VM に適用され、すべての関数定義が更新されます。 

これで、実行を再開できます。変更したスクリプトがオリジナルの代わりに実行され、変更の効果を観察できます。

#### 例

![ライブ エディット](imgs/image_18.png)

パラメータ `dow` は、どのような場合でも、関数 `setone()` に渡されると 1 ずつずれる疑いがあります。つまり、`dow<` の値は、受信時に 0 のはずが 1 に、1 のはずが 2 になっています。
渡された値を減らすことでこれが問題であることが裏付けられるかどうかをすばやくテストするために、関数の先頭に行 17 を追加し、<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">S</kbd> でコミットして再開します。




##  スレッドの実行の管理{: #threads }

[Sources] パネルの [**Threads**] ペインを使用して、Service Worker スレッドや Web Worker スレッドなどの他のスレッドを一時停止し、ステップインして調査します。


[Threads] ペインを説明するために、このセクションではデモ（[Web Workers basic example](http://mdn.github.io/simple-web-worker/)）を使用します。


アプリで DevTools を開くと、main スクリプトが `main.js` にあることがわかります。


![main スクリプト](imgs/main-script.png)

また、Web Worker スクリプトは `worker.js` にあります。

![Worker スクリプト](imgs/worker-script.png)

main スクリプトは、[**Multiply number 1**] または [**Multiply number 2**] 入力フィールドへの変更をリッスンします。
変更されると、main スクリプトは Web Worker に 2 つの数値を乗算するようメッセージを送信します。
Web Worker は乗算を実行して、main スクリプトに結果を渡します。



最初の数値が変更されるとトリガーされるブレークポイントを `main.js` に設定するとします。


![main スクリプトのブレークポイント](imgs/main-script-breakpoint.png)

また、Worker がメッセージを受信した場合に `worker.js` にブレークポイントを設定します。


![worker スクリプトのブレークポイント](imgs/worker-script-breakpoint.png)

アプリの UI で最初の数値が変更されると、両方のブレークポイントがトリガーされます。

![トリガーされた main スクリプトと worker スクリプトのブレークポイント](imgs/breakpoints-triggered.png)

[Threads] ペインの青い矢印は、現在選択されているスレッドを示しています。
たとえば、上のスクリーンショットでは、[**Main**] スレッドが選択されています。 

コードをステップ実行するための DevTools コントロール（スクリプトの実行の再開または一時停止、次の関数呼び出しのステップ オーバー、次の関数呼び出しのステップインなど）のすべては、特定のスレッドに関係しています。
つまり、DevTools が上のスクリーンショットのような場合に [**Resume script execution**] ボタンをクリックすると、Main スレッドは実行を再開しますが、Web Worker スレッドは一時停止したままです。
また、[**Call Stack**] セクションと [**Scope**] セクションは、Main スレッドの情報のみを表示しています。


Web Worker スレッドのコードをステップ実行する場合、またはそのスコープとコールスタックの情報を確認する場合は、[Threads] ペインでそのラベルをクリックすると、青い矢印がその横に表示されます。
以下のスクリーンショットは、Worker スレッドの選択後にコールスタックとスコープの情報がどのように変化するかを示しています。再度、コードのステップ実行ボタン（スクリプトの実行の再開、次の関数呼び出しのステップ オーバーなど）のいずれかをクリックすると、その操作は Worker スレッドにのみ関係します。
Main スレッドは影響を受けません。

![フォーカスされている Worker スレッド](imgs/worker-thread.png)


{# wf_devsite_translation #}
