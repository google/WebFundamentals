project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:ユーザー中心のパフォーマンス指標

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-06-01 #}
{# wf_tags: performance #}
{# wf_blink_components: Blink>PerformanceAPIs #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# ユーザー中心のパフォーマンス指標 {: .page-title }

{% include "web/_shared/contributors/philipwalton.html" %}

パフォーマンスが大切だとか Web アプリが高速であることが重要なのだということを、これまで何度となく聞かされてきたことでしょう。


しかし、*「自分のアプリはどれくらい速いのか」*という質問に答えようすると、この「速い」という言葉の意味が実にあいまいであることに気付かされます。
 厳密に言って、「速い」という言葉をどのような意味で使っていますか?どんな文脈で使っているのでしょうか。
だれにとって速いのでしょうか。

<aside>
  <strong>注: </strong>記事を読むよりもビデオを見る方がよろしければ、Google I/O 2017 でのこのトピックに関する同僚の <a href="https://twitter.com/shubhie">Shubhie Panicker</a> との対談をご覧ください。


</aside>

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="6Ljq-Jn-EgU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

パフォーマンスについて論じる場合、誤解を生じさせたり作り話や盲信を広めたりすることのないよう、正確な説明を行うことが大切です。そうしなければ、デベロッパーたちは良い意図で間違ったものに合わせて最適化してしまい、結果として使い心地を良くするよりもむしろ悪くしてしまうことさえあるからです。




具体的に例を挙げると、最近は、__*自分のアプリをテストしてみたら、X.XX 秒で読み込みました*__という話を聞くことが多くなりました。


こんなとき、言っていること自体は間違い*ではない*のですが、事実を正しく伝えていないところに問題があります。
 読み込み時間は端末の性能やネットワーク状態によってユーザーごとに大きく異なります。
 読み込み時間を 1 つの数値だけで言い切ってしまうなら、読み込みにもっと長い時間がかかった他のユーザーを度外視してしまうことになります。


実際には、あなたのアプリの読み込み時間は個々のユーザーの読み込み時間の総体であって、その全体を図示すると次のヒストグラムのような分布になるでしょう。



<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-histogram.png"
       alt="ウェブサイト訪問者の読み込み時間のヒストグラム"/>
</figure>

X 軸の値は読み込み時間を示し、Y 軸の棒の高さは特定の範囲の読み込み時間を経験したユーザーの相対的な数を示します。
 このグラフに示されているように、読み込み時間が 1 秒または 2 秒未満だったユーザーが最も多い一方で、読み込み時間がそれよりずっと長いユーザーもまだまだたくさんいるのです。



「自分のサイトは X.XX 秒で読み込める」というのが真実ではないと言える別の理由は、読み込みは処理のある一瞬のことではなく、その使用感は 1 つの指標では捉えきれないからです。
 読み込み中にはユーザーが「速い」と感じるかどうかに影響するポイントがいくつもあるため、そのうちの 1 つだけに注目してしまうと、それ以外の使用感の悪さを見逃してしまう可能性があります。



例えば、高速な初期レンダリングに最適化されたアプリは、コンテンツを瞬時にユーザーに送信します。
 しかし、このアプリが解析と実行に数秒かかる大きな JavaScript バンドルを続けて読み込むなら、ページのコンテンツはその JavaScript が実行されるまで応答しません。
 ページにリンクが表示されていてもクリックできなかったり、テキストボックスが表示されていても入力できなかったりすると、ページのレンダリングがいかに速かったかということはおそらくユーザーにとってどうでも良くなってしまうのです。



したがって、1 つの指標だけで読み込みを測定するのではなく、ユーザーが*体感する*読み込みに影響を与える可能性のある、読み込み中のいろいろな場面の時間を測定することが必要です。



パフォーマンスに関する盲信の 2 番目の例は、__*パフォーマンスは読み込み時にのみ重要だ*__という考え方です。


わたしたちはチームとしてこのミスを犯したことがありますし、ほとんどのパフォーマンス ツールが読み込みパフォーマンス*のみ*を測定しているという事実によってもこの見方を裏付けることができます。


しかし実際には、パフォーマンスの低下は読み込み中だけではなくいつでも起こり得えます。
 タップやクリックに素早く反応しないアプリや、スクロールやアニメーションがスムーズでないアプリも、読み込み速度の遅いアプリと同じようにパフォーマンスは良くありません。
 ユーザーが全体的な使用感を問題にするように、わたしたちデベロッパーも全体的なパフォーマンスを考える必要があります。


こうしたパフォーマンスの誤解すべてに共通しているのは、ユーザーの使用感にほとんど関係ない、またはまったく無縁な事柄に目が向けられているということです。
 同様に、[load](https://developer.mozilla.org/en-US/docs/Web/Events/load) 時間や [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) 時間のような伝統的なパフォーマンス指標は、それらのイベントが発生するタイミングでアプリが読み込まれたとユーザーが考える時点に必ずしも対応していないため、信頼性は極めて低くなります。






それで、こうした間違いを繰り返さないために、次の質問に答える必要があります。


1. 人間が体感するパフォーマンスを最も正確に測定するのはどの指標か。
2. 実際のユーザーでこれらの指標を測定するにはどうすればよいか。
3. アプリが「高速」であるかどうかを判断するために、測定値をどう解釈したらよいか。
4. 実際のユーザーでのアプリのパフォーマンスがわかったら、パフォーマンスを後退させずに、将来的にできるだけパフォーマンスを向上させるにはどうしたらよいか。


## ユーザー中心のパフォーマンス指標

ユーザーはウェブページに移動すると、すべてが期待どおりに動作していることを確認するために、視覚的なフィードバックを確かめるものです。


<table>
  <tr>
   <td><strong>きちんと動作しているか。</strong></td>
   <td>ナビゲーションが正常に開始したか。サーバーは応答したか。</td>
  </tr>
  <tr>
   <td><strong>実用的か。</strong></td>
   <td>ユーザーが利用できる十分なコンテンツがレンダリングされているか。</td>
  </tr>
  <tr>
   <td><strong>使い勝手が良いか。</strong></td>
   <td>ユーザーの操作にページが反応するか、それともまだ読み込み中で反応しないか。</td>
  </tr>
  <tr>
   <td><strong>快適か。</strong></td>
   <td>アプリとの対話はスムーズかつ自然で、処理や反応の遅延がないか。</td>
  </tr>
</table>

ページからユーザーにどのタイミングでこのフィードバックが提供されるかを理解するために、以下のいくつかの新しい指標を定義しました。


### 最初の描画と最初のコンテンツの描画

[Paint Timing](https://github.com/WICG/paint-timing) API は*最初の描画*（FP）と*最初のコンテンツの描画*（FCP）の 2 つの指標を定義します。
 これらの指標は、ナビゲーション直後に、ブラウザが画面にピクセルをレンダリングするタイミングの目印となります。
 これは、*「きちんと動作しているか」*という質問への答えになるので、ユーザーにとって重要です
。

2 つの指標の主な違いは、FP がナビゲーション前に画面に表示されていたものとは視覚的に異なる*何か*をブラウザがレンダリングするタイミングの目印となるのに対して、
 FCP はブラウザが DOM から受け取ったコンテンツの最初の部分（テキスト、画像、SVG、または `<canvas>` 要素である場合もある）をレンダリングするタイミングであることです。



### 最初の意味がある描画とヒーロー要素のタイミング

最初の意味がある描画（FMP）は、「実用的か」という質問の答えとなる指標です。
 「実用的」という概念をあらゆるウェブページにおしなべて当てはまるように定義することは非常に難しい（したがって、仕様はまだ存在していません）反面、ウェブページのどの部分がユーザーにとって最も実用的つまり役立つかということはウェブ デベロッパー自身にはいとも簡単にわかります。




<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-hero-elements.png"
       alt="さまざまなウェブサイトでのヒーロー要素の例"/>
</figure>

例に示されているようなウェブページの「最も重要な部分」は*ヒーロー要素*と呼ばれます。
 例えば、YouTube の視聴ページのヒーロー要素はメインのビデオです。
 Twitter の場合は、通知バッジと最初のツイートだと言えるでしょう。
 天気アプリでは、指定した地域の天気予報です。 ニュースサイトでは、主要なニュースと注目の写真ということになります。


ほとんどの場合、ウェブページには他よりも重要な部分があります。 ページの中で最も重要な部分が速く読み込まれれば、そのページの残りの部分が読み込まれなくても、そのことにユーザーが気付かないことすらあります。



### 処理に時間がかかるタスク

ブラウザは、ユーザーの入力に反応して、実行するタスクをメインスレッドのキューに 1 つずつ追加します。
 この同じスレッドでブラウザはアプリケーションの JavaScript を実行するので、この点でブラウザはシングルスレッドであると言えます。


場合によっては、これらのタスクの実行に時間がかかることがあり、仮にそうなると、メインスレッドはふさがってしまい、キュー内の他のすべてのタスクは待機しなければなりません。


<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-long-tasks.png"
       alt="Chrome デベロッパー ツールに表示された処理に時間がかかるタスク"/>
</figure>

この状態はユーザーにとって処理や反応が遅いと感じられますが、昨今ではこれがウェブの使用感が悪いと感じる主な原因です。


[long tasks API](https://w3c.github.io/longtasks/) は、処理に 50 ミリ秒以上かかるタスクを問題となる可能性のあるタスクとみなし、それらのタスクをアプリ デベロッパーに通知します。
 50 ミリ秒の時間が選択されているので、アプリケーションは 100 ミリ秒以内でユーザー入力に応答するという [RAIL guidelines](/web/fundamentals/performance/rail) の条件を満たすことができます。



### 操作可能になるまでの時間

*操作可能になるまでの時間*（TTI）指標は、アプリケーションが視覚的にレンダリングされてユーザー入力に確実に応答できるようになるタイミングの目印となります。
 次のようないくつかの理由で、アプリケーションがユーザー入力に応答できないことがあります。


* ページを作動させるコンポーネントを作成する JavaScript がまだ読み込まれていない。
* 処理に時間のかかるタスクがメインスレッドをふさいでいる（前のセクションの説明を参照）。


TTI 指標は、ページに最初の JavaScript が読み込まれて、メインスレッドがアイドル状態（処理に時間のかかるタスクがない状態）になるタイミングを表します。


### 指標とユーザーの使用感との対応関係

ユーザーの使用感にとって一番大切なことは何かという質問に戻り、最適化したい使用感とここまでで取り上げた各指標がどのように対応するかについて、次の表に示します。



<table>
  <tr>
    <th>使用感</th>
    <th>指標</th>
  </tr>
  <tr>
    <td>きちんと動作しているか。</td>
    <td>最初の描画（FP）/ 最初のコンテンツの描画（FCP）</td>
  </tr>
  <tr>
    <td>実用的か。</td>
    <td>最初の意味がある描画（FMP）/ ヒーロー要素のタイミング</td>
  </tr>
  <tr>
    <td>使い勝手が良いか。</td>
    <td>操作可能になるまでの時間（TTI）</td>
  </tr>
  <tr>
    <td>快適か。</td>
    <td>処理に時間がかかるタスク（厳密には、処理に時間がかかるタスクがないこと）</td>
  </tr>
</table>

読み込みの進み方を時系列で並べたスクリーンショットを見ると、それぞれの読み込み指標が読み込み体験のどこに対応するかがひと目で理解しやすくなります。


<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-load-timeline.png"
       alt="読み込み体験の中で各指標が発生するタイミングのスクリーンショット"/>
</figure>

次のセクションでは、実際のユーザーの端末でこれらの指標を測定する方法について説明します。

## 実際のユーザーの端末での指標の測定

load や `DOMContentLoaded` などの指標がこれまで、また今もなお最適化の対象となってきた主な理由には、これらの指標がブラウザにイベントとして認識され、実際のユーザーで簡単に測定できるということがあります。



一方で、他の多くの指標を測定することはこれまで非常に困難でした。
 たとえば、多くの場合デベロッパーは次のようなコードを使って処理に時間がかかるタスクを検出しています。


```
(function detectLongFrame() {
  var lastFrameTime = Date.now();
  requestAnimationFrame(function() {
    var currentFrameTime = Date.now();

    if (currentFrameTime - lastFrameTime > 50) {
      // Report long frame here...
    }

    detectLongFrame(currentFrameTime);
  });
}());
```

このコードは `requestAnimationFrame` の無限ループを開始し、反復するたびに時刻を記録します。
 そして、現在時刻が前回の時刻よりも 50 ミリ秒以上後である場合に、それは時間のかかるタスクだったと見なされます。
 このコードは十分機能するのですが、このコードにはたくさんの欠点があります。


* フレームごとにオーバーヘッドが発生する。
* アイドル状態の防止ができなくなる。
* 電池寿命を縮める。

パフォーマンス測定コードの大原則は、コード自体がパフォーマンスを下げる原因となってはならないというものです。


ここしばらくの間に [Lighthouse](/web/tools/lighthouse/) や [Web Page Test](https://www.webpagetest.org/) などのサービスがこうした新しいメトリックをいくつか提供してきました（そして一般的にこれらは、リリース前に機能の性能をテストするための優れたツールです）が、これらのツールはユーザーの端末上で動作しないため、ユーザーの実際のパフォーマンス体験を反映してはいません。





嬉しいことに、いくつかの新しいブラウザ API を追加することによって、パフォーマンスを低下させる可能性のあるハッキングや回避策をあまり使わずに、実際の端末上でこれらの指標を測定することがついに可能になりました。



その新しい API は [`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)、[`PerformanceEntry`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry)、そして [`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp) です。
これらの新しい API が動作するコードの例として、次のコードサンプルでは新しい `PerformanceObserver` インスタンスを作成し、
 描画エントリ（FP や FCP など）だけでなく処理に時間がかかるタスクの発生を通知するようにサブスクライブしています。

```
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // `entry` is a PerformanceEntry instance.
    console.log(entry.entryType);
    console.log(entry.startTime); // DOMHighResTimeStamp
    console.log(entry.duration); // DOMHighResTimeStamp
  }
});

// Start observing the entry types you care about.
observer.observe({entryTypes: ['resource', 'paint']});
```

`PerformanceObserver` を使用することで、パフォーマンス イベントが発生した時点でそれにサブスクライブして、非同期でそのイベントに対応することが初めて可能になりました。
 データが利用可能になるタイミングを知るためにポーリングが必要となることが多かったこれまでの [PerformanceTiming](https://www.w3.org/TR/navigation-timing/#sec-navigation-timing-interface) インターフェースの代わりに、この API が使用されます。




### FP/FCP のトラッキング

特定のパフォーマンス イベントのデータを取得した後、そのデータを任意のアナリティクス サービスに送信することで、現在のユーザーの指標を取得することができます。
たとえば、Google アナリティクスを使用し、次のようにして最初の描画時刻をトラッキングできます。


```
<head>
  <!-- Add the async Google Analytics snippet first. -->
  <script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
  </script>
  <script async src='https://www.google-analytics.com/analytics.js'></script>

  <!-- Register the PerformanceObserver to track paint timing. -->
  <script>
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // `name` will be either 'first-paint' or 'first-contentful-paint'.
      const metricName = entry.name;
      const time = Math.round(entry.startTime + entry.duration);

      ga('send', 'event', {
        eventCategory:'Performance Metrics',
        eventAction: metricName,
        eventValue: time,
        nonInteraction: true,
      });
    }
  });
  observer.observe({entryTypes: ['paint']});
  </script>

  <!-- Include any stylesheets after creating the PerformanceObserver. -->
  <link rel="stylesheet" href="...">
</head>
```

<aside>
  <p><strong>重要:</strong> ドキュメントの <code>&lt;head&gt;</code> 内のすべてのスタイルシートより前に <code>PerformanceObserver</code> が必ず登録されている必要があります。そうすることで、FP/FCP が現れる前にこの API が実行されます。
<p>

  <p>レベル 2 の <a
  href="https://w3c.github.io/performance-timeline/">Performance Observer 仕様</a>が実装されている場合、この仕様では <code>PerformanceObserver</code> を作成する前にキューに入れられたパフォーマンス エントリーにアクセスできるようにする <a
  href="https://w3c.github.io/performance-timeline/#dom-performanceobserverinit-  buffered"><code>buffered</code></a> フラグが導入されているため、その必要はありません。



  </p>
</aside>

### ヒーロー要素を使用した FMP のトラッキング

ページのどの要素がヒーロー要素であるかを特定できたなら、その要素がどのタイミングでユーザーに見えるようになるかをトラッキングする必要があります。


FMP の標準化された定義はまだありません（したがって、パフォーマンス エントリー タイプもありません）。
 あらゆるページに一様に適用されるものとして「意味がある」の意味を決めることは非常に難しいというのが、その理由の 1 つです。


しかし、1 つのページまたは 1 つのアプリケーションについて言えば、一般的に FMP はヒーロー要素が画面上に表示されるタイミングであると考えるのがよいでしょう。



Steve Souders は [User Timing and Custom Metrics](https://speedcurve.com/blog/user-timing-and-custom-metrics/) という優れた記事の中で、ブラウザのパフォーマンス API をコード内に使用してさまざまなタイプのメディアが表示されるタイミングを測定するいろいろなテクニックについて詳しく述べています。




### TTI のトラッキング

ゆくゆくは TTI 指標が標準化され、PerformanceObserver によってブラウザに提供されるようになることを願っています。
 それまでの対応として、Google では、現段階での TTI の検出に使用でき、[Long Tasks API](https://w3c.github.io/longtasks/) をサポートするブラウザであれば動作する Polyfill を開発しました。



この Polyfill が提供する `getFirstConsistentlyInteractive()` メソッドは Promise を返し、この Promise から TTI 値を得ることができます。
 Google アナリティクスを使用して、次のように TTI をトラッキングできます。


```
import ttiPolyfill from './path/to/tti-polyfill.js';

ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  ga('send', 'event', {
    eventCategory:'Performance Metrics',
    eventAction:'TTI',
    eventValue: tti,
    nonInteraction: true,
  });
});
```

`getFirstConsistentlyInteractive()` メソッドはオプションの `startTime` 設定オプションを受け入れ、その時間まではアプリが対話式に動作していいないことが分かっている下限を指定できます。
 デフォルトでは、Polyfill は DOMContentLoaded を開始時刻として使用しますが、ヒーロー要素が表示されるタイミングや、すべてのイベント リスナーが追加されたことがわかったタイミングなどを使用したほうが、たいていはより正確になります。




インストールおよび使用の詳しい手順については、[TTI Polyfill 資料](https://github.com/GoogleChrome/tti-polyfill) を参照してください。



<aside>
  <strong>注: </strong> FMP の場合と同じように、すべてのウェブページに適用できる完璧な TTI 指標を定義するのはたやすいことではありません。
 Polyfill に実装したバージョンはほとんどのアプリに使えますが、特定のアプリでは使えないということもありえます。

 ですから、まずテストしてから安心して使用するということが重要です。
 TTI の定義と実装について詳しくは、<a href="https://goo.gl/OSmrPk">TTI 指標定義資料</a>を参照してください。


</aside>

### 処理に時間がかかるタスクのトラッキング

処理に時間がかかるタスクが原因で、ユーザーの使用感に何らかのマイナスな影響（
 イベント ハンドラの動作がもっさりしたり、フレーム落ちが発生するなど）が及ぶことが多いということはすでに述べました。 こうしたことがどれくらいの頻度で起きているのか知っておくと、それを最小限に抑える努力をするものです。


JavaScript で処理に時間がかかるタスクを検出するには、新しい `PerformanceObserver` を作成し、タイプ `longtask` のエントリを観察します。
 longtask のエントリ機能の良いところは [attribution プロパティ](https://w3c.github.io/longtasks/#sec-TaskAttributionTiming)が含まれていて、それによってどのコードが原因で処理に時間がかかるのかを簡単にトラッキングできることです。




```
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    ga('send', 'event', {
      eventCategory:'Performance Metrics',
      eventAction: 'longtask',
      eventValue:Math.round(entry.startTime + entry.duration),
      eventLabel:JSON.stringify(entry.attribution),
    });
  }
});

observer.observe({entryTypes: ['longtask']});
```

attribution プロパティは、処理に時間がかかる原因となっているのがどのフレーム コンテキストであるかを示します。これは、サードパーティの iframe スクリプトが問題の原因かどうかを判断するのに役立ちます。
 将来のバージョンの仕様ではより細分化して、スクリプト URL、行、カラム番号を提供する予定です。こうした情報は、自分の作成したスクリプトが原因で処理が遅くなっているかのどうかを判断するのに非常に役立ちます。



### 入力待ち時間のトラッキング

処理に時間がかかるタスクによってメインスレッドがふさがれてしまうと、イベントリスナーがタイミング良く実行されなくなる可能性があります。
 [RAIL パフォーマンス モデル](/web/fundamentals/performance/rail) から分かることは、ユーザー インターフェースがなめらかであると感じるためには、ユーザー入力から 100 ミリ秒以内に応答しなければならないということです。もしこのような動作になっていない場合は、この点を銘記することが大切です。




コードで入力待ち時間を検出するには、イベントのタイムスタンプを現在時刻と比較すればよく、その差が 100 ミリ秒より大きい場合にそのことを報告できます（むしろ報告すべきです）。



```
const subscribeBtn = document.querySelector('#subscribe');

subscribeBtn.addEventListener('click', (event) => {
  // Event listener logic goes here...

  const lag = performance.now() - event.timeStamp;
  if (lag > 100) {
    ga('send', 'event', {
      eventCategory:'Performance Metric'
      eventAction: 'input-latency',
      eventLabel: '#subscribe:click',
      eventValue:Math.round(lag),
      nonInteraction: true,
    });
  }
});
```

イベント待ち時間は処理に時間がかかるタスクのせいで発生することが多いため、イベント待ち時間検出ロジックと処理に時間がかかるタスクの検出ロジックとを組み合わせることができます。`event.timeStamp` と同じときに処理に時間がかかるタスクでメインスレッドがふさがれている場合は、そのタスクの属性値も報告することができます。
 こうすることで、パフォーマンスが低下した感覚とその原因となっているコードとを明確に関連付けることができます。



この方法は完璧ではありませんが（伝播フェーズの後の方で処理に時間がかかるイベントリスナーは扱えませんし、メインスレッドで実行されないスクロールや合成アニメーションには使用できない）、長時間実行される JavaScript コードがユーザー エクスペリエンスにどれほど頻繁に影響を与えているかをよく理解できるよう手始めに行うこととしては良い方法です。





## データの解釈

実際のユーザーのパフォーマンス指標の収集を開始したなら、そのデータを使用する必要があります。
 実際のユーザーのパフォーマンス データは、主に次のいくつかの理由で役立ちます。


* アプリケーションが期待通りのパフォーマンスを出しているか検証できる。
* （どんなものであれ考慮中のアプリの）コンバージョンに悪影響を及ぼすパフォーマンスの低下を招いている場所を特定できる。
* ユーザー エクスペリエンスを向上させ、ユーザーを満足させるための機会を見つけることができる。

モバイル端末とデスクトップでのアプリのパフォーマンスの違いを比較することは、是非とも行う価値があります。
 次のグラフはデスクトップ（青色）とモバイル（オレンジ色）での TTI の分布を示しています。
 この例からわかるように、モバイルの TTI 値はデスクトップよりもかなり長くなっています。


<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-tti-mobile-v-desktop.png"
       alt="デスクトップとモバイルでの TTI の分布"/>
</figure>

ここでの数字はアプリ固有（つまり、この数値と自分の数値とが一致することは期待できないので、自分でテストする必要がある）ではあるものの、この例を使用状況の指標に関するレポートをどのように行ったらよいか考える参考にすることができます。



#### デスクトップ

<table>
  <tr>
   <td><strong>百分位数</strong></td>
   <td align="right"><strong>TTI（秒）</strong></td>
   </td>
  </tr>
  <tr>
   <td>50%</td>
   <td align="right">2.3</td>
  </tr>
  <tr>
   <td>75%</td>
   <td align="right">4.7</td>
  </tr>
  <tr>
   <td>90%</td>
   <td align="right">8.3</td>
  </tr>
</table>

#### モバイル

<table>
  <tr>
   <td><strong>百分位数</strong></td>
   <td align="right"><strong>TTI（秒）</strong></td>
   </td>
  </tr>
  <tr>
   <td>50%</td>
   <td align="right">3.9</td>
  </tr>
  <tr>
   <td>75%</td>
   <td align="right">8.0</td>
  </tr>
  <tr>
   <td>90%</td>
   <td align="right">12.6</td>
  </tr>
</table>

得た結果をモバイルとデスクトップとに分け、データを分布として分析することで、実際のユーザーの使用感を手早く把握することができます。
例えば上の表を見ると、このアプリの場合、**モバイル ユーザーの 10% で操作可能になるまでに 12 秒以上かかった**ことが分かります。


### パフォーマンスがビジネスに与える影響

分析ツールでパフォーマンスをトラッキングすることの大きな利点は、そのデータを使用して、パフォーマンスがビジネスに与える影響を分析できることです。


分析ツールで目標達成数や e コマース コンバージョン数をトラッキングしている場合、これらの数値とアプリのパフォーマンス指標との相関を調べるレポートを作成することができます。
 例えば、次のようなことが分かります。

* ユーザーが操作可能になるまでの時間が短くなれば購入する量は多くなるか。
* 注文生産のタスク処理に時間がかかるほど、カゴ落ちの割合も高くなるか。

相関関係が見つかると、パフォーマンスが重要かつ優先されるべきビジネスケースの作成がかなり容易になります。


### 読み込みの放棄

ページの読み込みに時間がかかりすぎると、ユーザーがそのページを離れてしまうことはよくあるものです。
このことから分かるのは、残念ながら、パフォーマンス指標すべてにおいて[生存バイアス](https://en.wikipedia.org/wiki/Survivorship_bias)の問題が見られ、ページの読み込みが完了するのを待てなかった人たちの読み込み指標（この場合の数値は非常に低いと考えられます）がデータに含まれないということです。




これらのユーザーがそのまま読み込みの完了を待ち続けていたらこの数値がどうなっただろうかということはトラッキングできませんが、このようなことがどの程度の頻度で起きており、各ユーザーがどれくらいの時間待ったかはトラッキングすることができます。



Google アナリティクスの analytics.js ライブラリは通常非同期に読み込まれ、ユーザーがページを離れることを決めたときにはこのライブラリを使用できないため、これはかなりトリッキーな方法で行います。
 しかし、analytics.js が読み込まれるのを待って Google アナリティクスにデータを送信する必要はありません。
 [Measurement Protocol](/analytics/devguides/collection/protocol/v1/) を使用してデータを直接送信することができます。


このコードは、[`visibilitychange`](https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange) イベント（読み込んだデータがページから削除されるか、ページがバックグラウンドに移るときに起動されます）のリスナーを追加し、その時点の `performance.now()` 値を送信します。




```
<script>
window.__trackAbandons = () => {
  // Remove the listener so it only runs once.
  document.removeEventListener('visibilitychange', window.__trackAbandons);
  const ANALYTICS_URL = 'https://www.google-analytics.com/collect';
  const GA_COOKIE = document.cookie.replace(
    /(?:(?:^|.*;)\s*_ga\s*\=\s*(?:\w+\.\d\.)([^;]*).*$)|^.*$/, '$1');
  const TRACKING_ID = 'UA-XXXXX-Y';
  const CLIENT_ID =  GA_COOKIE || (Math.random() * Math.pow(2, 52));

  // Send the data to Google Analytics via the Measurement Protocol.
  navigator.sendBeacon && navigator.sendBeacon(ANALYTICS_URL, [
    'v=1', 't=event', 'ec=Load', 'ea=abandon', 'ni=1',
    'dl=' + encodeURIComponent(location.href),
    'dt=' + encodeURIComponent(document.title),
    'tid=' + TRACKING_ID,
    'cid=' + CLIENT_ID,
    'ev=' + Math.round(performance.now()),
  ].join('&'));
};
document.addEventListener('visibilitychange', window.__trackAbandons);
</script>
```

このコードをドキュメントの `<head>` にコピーし、`UA-XXXXX-Y` プレースホルダを自分の[トラッキング ID](https://support.google.com/analytics/answer/1008080) に置き換えます。



また、ページが操作可能になったらこのリスナーが削除されるようにすることもできますし、TTI をレポートした読み込みの放棄をレポートすることもできます。



```
document.removeEventListener('visibilitychange', window.__trackAbandons);
```

## パフォーマンスの最適化と退行の防止

ユーザー中心の指標を定義することの優れた点は、それらの指標に最適化することで、ユーザーの操作性も間違いなく向上することです。


パフォーマンスを改善する最も簡単な方法の一つは、クライアントに送信する JavaScript コードを小さくすることですが、コードサイズを小さくすることができない場合は、JavaScript の配布の*仕方*を考えることが重要です。



### FP/FCP の最適化

ドキュメントの `<head>` からレンダリング ブロック スクリプトやスタイルシートを削除することによって、最初の描画と最初のコンテンツの描画までの時間を短縮できます。


ユーザーに「きちんと動作している」ことを示すために必要な最低限のスタイルセットの時間を取って指定し、それらを `<head>` にインライン化することで（または [HTTP/2 server push](/web/fundamentals/performance/http2/#server_push)) を使用することで)、最初の描画時間を大幅に短縮することができます。




[アプリ シェル パターン](/web/updates/2015/11/app-shell)は[プログレッシブ ウェブアプリ](/web/progressive-web-apps/)に対してこのことを行う良い例です。


### FMP/TTI の最適化

ページ上で一番重要な UI 要素（ヒーロー要素）を決めたら、最初のスクリプト読み込みにはその要素をレンダリングして操作可能にするために必要なコードだけが含まれるようにします。



ヒーロー要素に関係のないコードが最初の JavaScript バンドルに含まれていると、操作可能になるまでの時間が遅くなります。
 今すぐに必要としない JavaScript コードをダウンロードして構文解析するようにユーザーの端末に強制する理由はありません。



原則として、FMP から TTI までの時間は可能な限り短くするようにします。
 この時間を最小限に抑えることができない場合は、ページがまだ操作可能ではないことをインターフェースによってはっきりと示すことが非常に重要です。



操作していて最もイライラすることの 1 つは、ユーザーが要素をタップして何も起こらないことです。


### 処理に時間がかかるタスクの防止

コードを分割し、それぞれに読み込まれる順序の優先順位を付けることで、ページをより速く操作可能にすることができるだけでなく、処理に時間がかかるタスクを減らし、入力待ち時間やフレームの低速化を避けられることが期待できます。



コードを分割して別個のファイルに分けるだけでなく、同期コードの大きなチャンクを非同期的に実行できる小さなチャンクに分割したり、[次のアイドルポイントに延期](/web/updates/2015/08/using-requestidlecallback)することもできます。
このロジックを小さなチャンクで非同期に実行することで、ブラウザのメインスレッドにユーザー入力に応答する余地を残すことができます。


最後に、サードパーティのコードをテストし、特定のコードの実行速度が遅い理由について理解しておく必要があります。
 サードパーティの広告スクリプトやトラッキング スクリプトでタスク処理に時間がかかり、結果的にビジネスを支援するよりもビジネスの妨げとなる場合さえあります。



## 退行の防止

この記事は実際のユーザーのパフォーマンス測定に重点を置いており、最終的に重要なパフォーマンス データは RUM データであるということは確かですが、新機能をリリースする前に、アプリが正常に機能すること（そして退行していないこと）を確認する上で、ラボデータは重要です。
 ラボテストは、制御された環境で実行され、RUM 試験のランダムな変動ははるかに小さいため、退行の検出には理想的です。



[Lighthouse](/web/tools/lighthouse/) や [Web Page Test](https://www.webpagetest.org/) などのツールを継続的統合サーバーに統合し、重要な指標が退行したか特定のしきい値を下回るかした場合にはビルドに失敗するというテストを作成することができます。




また、すでにリリースされているコードには [custom alerts](https://support.google.com/analytics/answer/1033021) を追加して、パフォーマンス悪化イベントが予期せず大量に発生した場合には通知するようにできます。
たとえば、使用しているサードパーティ サービスの新しいバージョンがリリースされ、処理に時間がかかるタスクがかなり増えたとユーザーが急に感じ始めた場合などです。



退行を防ぐには、新しい機能がリリースされるたびに、ラボと実地でパフォーマンスを継続してテストする必要があります。


<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-test-cycle.png"
       alt="リリース プロセスにおける RUM とラボテストのフローチャート"/>
</figure>

## まとめと展望

昨年 Google はブラウザで使用できるユーザー中心の指標をデベロッパーに公開することにより、飛躍的な進展を遂げました。しかし、それで終わりではなく、まだまだたくさんの計画があります。



操作可能になるまでの時間とヒーロー要素の指標については、デベロッパーが独自に測定したり Polyfill に依存しなくても良いように、これらの指標を標準化したいと考えています。
 また、フレーム落ちや入力待ち時間の問題が、どのタスクで処理に時間がかかっているからかまたはどのコードが原因なのかを、デベロッパーがもっと簡単に発見できるようにしたいと思っています。



まだまだしなければならないことはたくさんありますが、これまで成し遂げた事柄を振り返ると胸が躍ります。 `PerformanceObserver` などの新しい API やブラウザでネイティブにサポートされている long tasks によって、デベロッパーは操作性を損なうことなく実際のユーザーのパフォーマンスを測定するために必要な基本構造をついに得ることができました。




最も重要な指標は実際のユーザー エクスペリエンスを表す指標です。快適な操作性を実現してユーザーを魅了し、デベロッパーが素晴らしいアプリケーションを造り出すことがしやすくなるよう、わたしたちもできる限りお手伝いしたいと思います。



## 別の記事もお読みください

{% include "web/_shared/helpful.html" %}

ファイル仕様関連の記事:

* [https://github.com/w3c/longtasks/issues](https://github.com/w3c/longtasks/issues)
* [https://github.com/WICG/paint-timing/issues](https://github.com/WICG/paint-timing/issues)
* [https://github.com/w3c/performance-timeline/issues](https://github.com/w3c/performance-timeline/issues)

ファイル Polyfill 関連の記事:

* [https://github.com/GoogleChrome/tti-polyfill/issues](https://github.com/GoogleChrome/tti-polyfill/issues)

ご質問:

* [progressive-web-metrics@chromium.org](mailto:progressive-web-metrics@chromium.org)
* [public-web-perf@w3.org](mailto:public-web-perf@w3.org)

新しい API の計画に関するコメントをお寄せください。

* [https://github.com/w3c/charter-webperf/issues](https://github.com/w3c/charter-webperf/issues)
