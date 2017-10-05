project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: スマートフォンからパソコンに至るまで、ますます多くの端末でタッチスクリーンが利用可能になっています。アプリはタップ操作に直感的かつ美しく反応する必要があります。

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-01-01 #}

# サイト上でのタップ操作をサポートする {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Rwc4fHUnGuU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

スマートフォンからパソコンの画面に至るまで、ますます多くの端末でタッチスクリーンが利用可能になっています。
ユーザーが UI を操作した際は、アプリ側でタップ操作に対して直感的に応答する必要があります。


<div class="clearfix"></div>

##  要素の状態を処理する

ウェブページ上の要素をタップまたはクリックしたときに、サイト側でその操作が本当に検知されているか疑問に感じた経験はないでしょうか？


UI の一部をタップまたは操作したときに要素の色が変わるだけでも、ユーザーはサイトが機能しているとわかり安心するものです。
こうした反応によってユーザーのストレスが緩和されるだけでなく、軽快で反応が良いサイトであると感じてもらえます。


DOM 要素は、デフォルト、フォーカス、ホバー、アクティブのいずれかの状態を継承できます。
それぞれの状態に合わせて UI を変更するには、以下に示すように擬似クラス `:hover`、`:focus`、`:active` にスタイルを適用する必要があります。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="btnstates" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

![状態によって色が異なるボタンの画像](images/button-states.png)

ほとんどのモバイル ブラウザでは、要素がタップされた後の状態として「hover」と「focus」の両方、またはこのどちらかを要素に適用します。


適用するスタイルとユーザーがタップした後の外観については、慎重に検討してください。


注: アンカータグとボタンは、ブラウザによって動作が異なることがあります。そのため、**hover** 状態のままになる場合もあれば、**focus** 状態のままになる場合もあることを認識しておいてください。



###  デフォルトのブラウザ スタイルを無効にする

さまざまな状態に対応したスタイルを追加すると、ほとんどのブラウザではユーザーのタップに応答して独自のスタイルが実装されることに気付くでしょう。
これは主に、モバイル端末が初めてリリースされた当時、`:active` 状態用のスタイルが用意されていないサイトが多かったことが原因です。結果的に、多くのブラウザでユーザー操作に応答するためにハイライト色やスタイルが追加されました。


大半のブラウザでは `outline` という CSS プロパティを使用して、フォーカスされた要素の輪郭線を表示しています。
この動作は、以下のようにすると無効にできます。

    .btn:focus {
      outline: 0;

      // Add replacement focus styling here (i.e. border)
    }

Safari と Chrome ではタップした要素がハイライト表示されますが、この動作は次のように CSS プロパティ
`-webkit-tap-highlight-color` で無効にできます。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="webkit-specific" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

Windows Phone 版の Internet Explorer でも同様の動作になりますが、これはメタタグを使用して無効にできます。


    <meta name="msapplication-tap-highlight" content="no">

Firefox では、次の 2 つの副作用に対処する必要があります。

擬似クラス `-moz-focus-inner` によってタップ可能な要素に輪郭線が表示されますが、これは `border: 0` を指定すると削除できます。


Firefox で `<button>` 要素を使用するとグラデーションが適用されますが、これは `background-image: none` を指定すると無効にできます。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="ff-specific" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

Warning: 上述のようにデフォルト スタイルを無効にするのは、`:hover`、`:active`、`:focus` の擬似クラスがある場合だけにしてください。


###  ユーザー選択を無効にする

UI を作成するときは、要素に対するユーザー操作は有効にしつつ、長押しによるテキスト選択や UI 上でのマウスによるドラッグ操作など、一部のデフォルト動作を無効にしたい場合があります。



これは、CSS プロパティ `user-select` を使用すると実現できます。ただし、コンテンツに対してこのような処理をすると、要素内のテキストを選択したいと思っているユーザーは、**非常に**ストレスを感じることがあるため注意が必要です。このような変更は、十分に検討したうえで慎重に行ってください。




    user-select: none;

##  カスタム ジェスチャーの実装

サイトでカスタムの操作およびジェスチャーを使用することを考えている場合は、以下の 2 つのトピックに留意してください。


1. すべてのブラウザに対応する方法。
1. 高いフレームレートを維持する方法。

この記事では、すべてのブラウザをサポートするために必要な API と、そのイベントを効率的に使用する方法について説明します。



ジェスチャーで実行したい内容によっては、ユーザーが一度に操作する要素を 1 つに制限するのか、または複数の要素を同時に操作可能にするのかが異なってきます。



Warning: キーボードでの入力を好むユーザーや、タッチスクリーン機器でユーザー補助機能を利用しているためにジェスチャーを使用できないユーザーもいる点に留意してください（ジャスチャーは、補助機能によってインターセプトまたは消費される場合があります）。




この記事では、すべてのブラウザをサポートし、高いフレームレートを維持する方法を示す 2 つの例を見ていきます。


![ドキュメント上の GIF 画像をタップする例](images/touch-document-level.gif){: .attempt-right }

最初の例では、ユーザーは 1 つの要素を操作できます。このケースでは、この要素上でジェスチャーが開始される場合に限り、この要素にすべてのタッチイベントを通知します。たとえば、このスワイプ可能な要素は指を放したあとでも制御が可能です。


結果的に柔軟性と利便性は大いに高まりますが、ユーザーが UI を操作する方法は限られます。


<div class="clearfix"></div>

![要素上の GIF 画像をタップする例](images/touch-element-level.gif){: .attempt-right }

一方、マルチタップによってユーザーに複数の要素を一度に操作して欲しい場合は、特定の要素に対するタップを制限する必要があります。



ユーザーにとってはさらに柔軟性が高くなりますが、UI を処理するロジックは複雑化し、ユーザーエラーに対処するのが難しくなります。


<div class="clearfix"></div>

###  イベントリスナを追加する

Chrome（バージョン 55 以降）、Internet Explorer、Edge では、カスタム ジェスチャーの実装に
`PointerEvents` を使用することをおすすめします。

その他のブラウザでは、`TouchEvents` と `MouseEvents` をご利用ください。

`PointerEvents`
の優れた機能を使うと、マウス、タップ、ペンなどのざまざまな入力タイプを 1 つのコールバック セットに統合できます。
リッスンするイベントは `pointerdown`、`pointermove`、`pointerup`、`pointercancel`
です。

その他のブラウザにおけるタッチイベントは `touchstart`、`touchmove`、`touchend`、`touchcancel`
です。マウス入力に対して同じジェスチャーを実装するには、`mousedown`、`mousemove`、`mouseup`
を実装する必要があります。


使用するイベントが不明な場合は、こちらの[タップ、マウス、ポインターのイベント](#touch-mouse-and-pointer-events)の表を確認してください。


これらのイベントを使用するには、イベント名、コールバック関数、ブール値を指定して DOM 要素で `addEventListener()` メソッドを呼び出す必要があります。ブール値は、その要素でイベントを捕捉するタイミングが、他の要素でイベントを捕捉して解釈可能になるタイミングよりも前か後かを示します（他の要素よりも先にイベントを捕捉したい場合は `true` を指定）。





操作の開始をリッスンする例を以下に示します。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="addlisteners" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

注: API の設計上、PointerEvents は 1 回の
`pointerdown` イベントで、マウスとタップの両方のイベントを処理できます。

####  単一の要素の操作を処理する

上の短いコード スニペットでは、マウスイベントに対しては開始イベントリスナのみを追加しています。
これは、イベントリスナが登録された要素の上にカーソルを合わせているときのみ、マウスイベントがトリガーされるためです。


TouchEvents はタップが発生した場所にかかわらず、開始されたジェスチャーを追跡します。PointerEvents はタップが発生した場所にかかわらず、開始されたジェスチャーを追跡して、DOM
要素の
`setPointerCapture` を呼び出します。

マウスの移動と終了のイベントに対しては、ジェスチャーの開始「メソッド」内にイベントリスナを追加して、ドキュメントにリスナを追加します。つまり、ジェスチャーが完了するまでカーソルを追跡します。



これを実装するためのステップは次のとおりです。

1. すべての TouchEvent リスナと PointerEvent リスナを追加します。MouseEvents には開始イベント**のみ**を追加します。
1. ジェスチャー開始のコールバック内で、マウスの移動と終了のイベントをドキュメントにバインドします。これにより、元の要素上でイベントが発生したかどうかにかかわらず、すべてのマウスイベントを受信できます。PointerEvents では、今後のイベントをすべて受信するために、元の要素で `setPointerCapture()` を呼び出す必要があります。次に、ジェスチャーの開始を処理します。
1. 移動イベントを処理します。
1. 終了イベントでは、マウスの移動と終了のリスナをドキュメントから削除して、ジェスチャーを終了します。


以下は、移動と終了のイベントをドキュメントに追加する `handleGestureStart()` メソッドのスニペットです。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

以下のように終了コールバックに `handleGestureEnd()` を追加して、ジェスチャーが完了した際に移動と終了のイベントリスナをドキュメントから削除し、PointerCapture を解放します。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-end-gesture" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

<div class="attempt-left">
  <p>このパターンに従ってドキュメントに移動イベントを追加すると、ユーザーが要素の操作を開始したあとにジェスチャーの位置が要素外に移った場合でも、ページ上の位置にかかわらずマウス移動を検知できます。これは、ドキュメントからイベントを受信しているためです。
</p>



  <p>この図は、ジャスチャーが開始した際に移動と終了のイベントをドキュメントに追加した場合の、タップイベントの処理を示しています。
</p>
</div>

![
`touchstart` のドキュメントにタップイベントをバインドした例](images/scroll-bottleneck.gif)

<div class="clearfix"></div>

###  効率的にタップに応答する

開始と終了のイベント処理を追加したので、これで実際にタップイベントに応答することができます。


あらゆる開始および移動イベントについて、イベントから `x` 座標と `y` 座標を簡単に取得できます。


以下の例では、`targetTouches` の有無をチェックして `TouchEvent` からのイベントかどうかを確認しています。
タップイベントであれば、最初にタップした位置の
`clientX` と `clientY` を取得します。イベントが `PointerEvent` または `MouseEvent` であれば、イベント自体から直接 `clientX` と
`clientY` を取得します。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-2.html" region_tag="extract-xy" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-2.html){: target="_blank" .external }

`TouchEvent` には、タップデータを含む 3 つのリストがあります。

* `touches`: 現在画面上にあるすべてのタップのリスト（DOM 要素上にあるかどうかは問わない）。
* `targetTouches`: 現在、イベントがバインドされている DOM 要素上にあるタップのリスト。
* `changedTouches`: イベントの発生原因となった変化が生じたタップのリスト。


ほとんどのケースでは、`targetTouches` を使用すれば事は足ります。（これらのリストの詳細については、[タップリスト](#touch-lists)をご覧ください。）


####  requestAnimationFrame を使用する

イベントのコールバックはメインスレッドで呼び出されるため、高いフレームレートを維持して遅延を防ぐには、イベントのコールバック内で実行するコードをできるだけ少なくする必要があります。



`requestAnimationFrame()` を使用すると、ブラウザでフレームを描画する直前に UI を更新できるため、一部の処理をイベントのコールバックの外に移すことでがきます。



`requestAnimationFrame()` になじみがない方は、[こちらで詳細をご確認ください](/web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes)。


一般的な実装では、開始および移動イベントで取得した
`x` 座標と `y` 座標を保存して、移動イベントのコールバック内でアニメーション フレームをリクエストします。


デモでは、最初にタップした位置を `handleGestureStart()` で保存しています（`initialTouchPos` を探す）。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

`handleGestureMove()` メソッドでは、イベントの位置を保存してから、必要に応じて
`onAnimFrame()` 関数をコールバックとして渡し、アニメーション フレームをリクエストします。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-move" adjust_indentation="auto" %}
</pre>

`onAnimFrame` 値は、UI の位置を動かすために呼び出される関数です。
この関数を `requestAnimationFrame()`
に渡すことで、ページを更新する（ページ上に変更内容を描画する）直前にこの関数を呼び出すようにブラウザに通知します。


`handleGestureMove()` コールバックでは、まず `rafPending` の値が false であるかを確認します。false の場合は、最後に移動イベントが発生してから `requestAnimationFrame()`
によって `onAnimFrame()` が呼び出されたことを示します。
つまり、実行待ちの `requestAnimationFrame()` は常に 1 つしか存在しないということになります。


`onAnimFrame()` コールバックが実行されたら、移動したい要素に対して遷移の設定を行ったあと、`rafPending` を `false` に更新して、次のタップイベントで新しいアニメーション フレームをリクエストできるようにします。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="on-anim-frame" adjust_indentation="auto" %}
</pre>

###  タップ アクションによるジェスチャーの制御

CSS プロパティ `touch-action` によって、要素のデフォルトのタップ動作を制御できます。
たとえば `touch-action: none` を使用すると、ユーザーがタップをしてもブラウザ側では何も処理を行いません。これにより、すべてのタップイベントをインターセプトできるようになります。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="touch-action-example" adjust_indentation="auto" %}
</pre>

`touch-action: none` はデフォルトのブラウザ動作を完全に抑制するため、使用する際は注意が必要です。
多くの場合は、以下のいずれかのオプションを使うとよいでしょう。


`touch-action` を使用すると、ブラウザに実装されたジャスチャーを無効にできます。たとえば、Internet Explorer バージョン 10 以降では、ダブルタップによるズーム操作がサポートされています。
このデフォルトのダブルタップ動作を無効にするには、`manipulation` のタップ操作を設定します。



これにより、自身でダブルタップ操作を実装することができます。

以下は、一般的に使用されているタップ操作の値のリストです。

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">タッチ操作パラメータ</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>touch-action: none</code></td>
      <td data-th="Description">ブラウザではタップ操作を一切処理しません。
</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pinch-zoom</code></td>
      <td data-th="Description">`touch-action: none` と同様にすべてのブラウザ操作を無効にします。ただし、`pinch-zoom` は例外で、引き続きブラウザによって処理されます。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pan-y pinch-zoom</code></td>
      <td data-th="Description">縦方向のスクロールやピンチズーム操作を無効にせずに、JavaScript で横方向のスクロールを処理します（例: 画像のカルーセル表示）。
</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: manipulation</code></td>
      <td data-th="Description">ダブルタップ操作を無効にして、ブラウザでのクリック遅延を防止します。


スクロールやピンチズームの処理はブラウザに委ねます。
</td>
    </tr>
  </tbody>
</table>

##  旧バージョンの Internet Explorer をサポートする

IE10 をサポートしたい場合は、ベンダー プレフィックスが付いたバージョンの
`PointerEvents` を処理する必要があります。


通常、`PointerEvents` のサポート状況を確認するには `window.PointerEvent` を探しますが、IE10 の場合は
`window.navigator.msPointerEnabled` を探します。


ベンダー プレフィックス付きのイベント名は、'MSPointerDown', 'MSPointerUp' and
'MSPointerMove'.

サポート状況を確認してイベント名を切り替える方法については、以下の例をご覧ください。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="pointereventsupport" adjust_indentation="auto" %}
</pre>

詳細については、[Microsoft の最新情報](https://msdn.microsoft.com/en-us/library/dn304886(v=vs.85).aspx)をご覧ください。


##  リファレンス

###  タップ状態の擬似クラス

<table>
  <thead>
    <tr>
      <th>クラス</th>
      <th>例</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Class">:hover</td>
      <td data-th="Example"><img alt="押された状態のボタン" src="images/btn-hover-state.png"></td>
      <td data-th="Description">
        要素の上にカーソルが置かれたときの状態です。
        UI をホバー状態に変えることで、ユーザーに要素を操作するように促すことができます。
        
      </td>
    </tr>
    <tr>
      <td data-th="Class">:focus</td>
      <td data-th="Example">
        <img alt="フォーカス状態のボタン" src="images/btn-focus-state.png">
      </td>
      <td data-th="Description">
        ページ上の要素までユーザーがタブで移動したときの状態です。フォーカス状態を使用すると、ユーザーは現在操作している要素を把握でき、キーボードで簡単に UI 操作が行えるようになります。
        
        
      </td>
    </tr>
    <tr>
      <td data-th="Class">:active</td>
      <td data-th="Example">
        <img alt="押された状態のボタン" src="images/btn-pressed-state.png">
      </td>
      <td data-th="Description">
        クリックやタップ操作などによって要素が選択されたときの状態です。
        
      </td>
    </tr>
  </tbody>
</table>


タップイベントの正式なリファレンスは、[w3 Touch Events](http://www.w3.org/TR/touch-events/) で参照することができます。


###  タッチ、マウス、ポインタのイベント

これらのイベントは、新しいジェスチャーをアプリケーションに追加するために必要な要素です。


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">タッチ、マウス、ポインタのイベント</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event Names">
        <code>touchstart</code>,
        <code>mousedown</code>,
        <code>pointerdown</code>
      </td>
      <td data-th="Description">
        初めて要素に指が触れたとき、またはユーザーがマウスでクリックをしたときに発生します。
        
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchmove</code>,
        <code>mousemove</code>,
        <code>pointermove</code>
      </td>
      <td data-th="Description">
        ユーザーがスクリーンを指でなぞったとき、またはマウスをドラッグしたときに発生します。
        
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchend</code>,
        <code>mouseup</code>,
        <code>pointerup</code>
      </td>
      <td data-th="Description">
        ユーザーがスクリーンから指を放したとき、またはマウスを放したときに発生します。

      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchcancel</code>
        <code>pointercancel</code>
      </td>
      <td data-th="Description">
        タップ操作がブラウザによってキャンセルされたときに発生します。たとえばユーザーがウェブアプリをタップしたあとに、タブを移動した場合などです。
      </td>
    </tr>
  </tbody>
</table>


###  タップリスト

各タップイベントには、次の 3 つのリスト属性が含まれます。

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">タップイベント属性</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>touches</code></td>
      <td data-th="Description">
        現在画面上にあるすべてのタップのリスト（タップされている要素は問わない）。
        
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>targetTouches</code></td>
      <td data-th="Description">
        現在のイベントの対象である要素上で開始されたタップのリスト。
たとえば  <code>&lt;button&gt;</code> にバインドすると、現在のそのボタン上でのタップのみが取得されます。
ドキュメントにバインドすると、現在のドキュメント上のすべてのタップが取得されます。
      </td>
    </tr>
    <tr>

      <td data-th="Attribute"><code>changedTouches</code></td>
      <td data-th="Description">
        イベントの発生原因となった変化が生じたタップのリスト:
        <ul>
          <li>
            <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchstart">touchstart</a></code>
イベント用
- 現在のイベントでアクティブになったばかりのタップポイントのリスト。

          </li>
          <li>
            <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchmove">touchmove</a></code>
イベント用
- 最後のイベント以降に移動したタップポイントのリスト。

          </li>
          <li>
            <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchend">touchend</a></code>
と<code>
<a href="http://www.w3.org/TR/touch-events/#dfn-touchcancel">touchcancel</a></code>
イベント用
- 画面から指が離れたばかりのタップポイントのリスト。
            

          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

###  iOS で active 状態をサポートする

iOS 版の Safari では、残念ながらデフォルトで「active」状態を適用できません。適用可能にするには、「document
body」または要素ごとに `touchstart` イベントリスナを追加する必要があります。


これは iOS 端末に特化した処理なので、ユーザー エージェントのテスト後に行ってください。

タッチ開始のリスナを body に追加すると、DOM のすべての要素に適用されるという利点がありますが、ページのスクロール時のパフォーマンスが低下するおそれもあります。



    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
      }
    };


パフォーマンスに関する懸念を軽減するには、代わりに、ページ上にある操作可能なすべての要素にタッチ開始のリスナを追加します。



    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        var elements = document.querySelectorAll('button');
        var emptyFunction = function() {};
        for(var i = 0; i < elements.length; i++) {
          elements[i].addEventListener('touchstart', emptyFunction, false);
        }
      }
    };


{# wf_devsite_translation #}
