project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2019-02-06 #}
{# wf_tags: fundamentals, performance, app-shell #}
{# wf_featured_image: /web/updates/images/2019/02/rendering-on-the-web/icon.png #}
{# wf_featured_snippet: Where should we implement logic and rendering in our applications? Should we use Server Side Rendering? What about Rehydration? Let's find some answers! #}
{# wf_blink_components: N/A #}

# Rendering on the Web - Web上のレンダリング {: .page-title }

{% include "web/_shared/contributors/developit.html" %}
{% include "web/_shared/contributors/addyosmani.html" %}

私たちは開発者として、何度もアプリケーションのアーキテクチャ全体に影響する決断へ直面します。Web開発者が行わなければならない主要な決断のひとつが、アプリケーションでロジックとレンダリングを実装する部分です。
これはウェブサイトを構築する方法によっては難しい場合があります。

ここにある私たちの知識は、過去数年間、大規模なサイトとやり取りをするChromeへ関わった事によりもたらされたものです。
かいつまんで言うと、私たちは開発者が完全なリハイドレーションの上で、サーバーレンダリングまたは静的レンダリングを検討することを勧めるでしょう。

この決定を下す際に選択しているアーキテクチャをより理解するには、それぞれのアプローチについてしっかりと把握し、それらに関する一貫した用語を使う必要があります。
これらのアプローチの違いは、パフォーマンスの観点からWeb上でのレンダリングのトレードオフを説明するのに役立ちます。

## 用語 {: #terminology }

**レンダリング**

- **SSR:** サーバーサイド レンダリング - クライアントサイド、または HTMLによるユニバーサルアプリをサーバー上でレンダリングしたもの。
- **CSR:** クライアントサイド レンダリング - ブラウザでアプリをレンダリングしたもの。一般的にはDOMを使用する。
- **リハイドレーション:**  サーバーでレンダリングされた HTMLのDOMツリーとデータを再利用するよう、クライアント上でJavaScriptビューを “起動” したもの。
- **プリレンダリング:**  ビルド時に実行したクライアントサイドアプリケーションの初期状態を静的HTMLとしてキャプチャしたもの。

**パフォーマンス**

- **TTFB:**  Time to First Byte - リンクをクリックしてから、コンテンツの最初のビットが来るまでの時間。
- **FP:**  First Paint - 何らかの情報がユーザーに表示される最初のタイミング。
- **FCP:**  First Contentful Paint - リクエストしたコンテンツ (記事の本文など) が表示されるようになった時間。
- **TTI:**  Time To Interactive - ページが対話可能（イベントが通ったなど）になった時間。

## サーバーレンダリング {: #server-rendering }

*サーバーレンダリングはナビゲーションに応じたサーバー上のページのために、完全なHTMLを生成します。これはブラウザが応答を受ける前に処理されるため、データフェッチとクライアント上の成形による追加のラウンドトリップを回避します。*

サーバーレンダリングは一般的に、迅速な [First Paint](/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint) (FP) と [First
Contentful Paint](/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint) (FCP) を生み出します。
ページのロジックとレンダリングをサーバー上で実行すると、Javascriptをクライアントへ大量送信することが回避できます。これは短時間の [Time to Interactive](/web/tools/lighthouse/audits/time-to-interactive) (TTI) を達成するのを助けます。サーバーレンダリングは、テキストとリンクをユーザーのブラウザへ送信するだけなので理にかなっています。
このアプローチは、広範囲のデバイスやネットワークの状態に適しており、ストリーミングドキュメントのパースのように興味深いブラウザの最適化が見られます。

<img src="../../images/2019/02/rendering-on-the-web/server-rendering-tti.png" alt="Diagram showing server rendering and JS execution affecting FCP and TTI" width="350">

サーバーレンダリングでは、ユーザーがサイトを使用可能になる前、CPUの制約によるJavascriptの処理過程において待たされることがありません。
[サードパーティのJS](/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/)が回避できない時でも、サーバーレンダリングを使用すると、あなたのファーストパーティーの [JSのコスト](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)を削減して、残りの部分ではより多くの “[バジェット](https://medium.com/@addyosmani/start-performance-budgeting-dabde04cf6a3)” を得ることができます。
しかし、このアプローチには主な欠点が1つあります。サーバー上でページを生成するには時間を要するため、しばしば [Time to First Byte](https://en.wikipedia.org/wiki/Time_to_first_byte) (TTFB) の時間が遅くなるのです。

サーバーレンダリングが十分かどうかはあなたが積んできた経験に大きく依存します。
正しいアプリケーションについて、サーバーレンダリング対クライアントレンダリングの長年に渡る議論はありますが、重要なのは、一部のページにサーバーレンダリングの使用が選択できるのを忘れないことです。
いくつかのサイトはハイブリッドレンダリングの手法を採用して成功しています。
[Netflix](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9) のサーバーレンダリングは比較的静的なランディングページであり、対話の多いページのJSを [事前に読み込む](https://dev.to/addyosmani/speed-up-next-page-navigations-with-prefetching-4285) ことで、クライアントレンダリングされた重いページを素早くロードする、より良い機会をもたらします。

いくつかのモダンなフレームワーク、ライブラリやアーキテクチャは、クライアントとサーバー両方で同じアプリケーションのレンダリングを可能にします。これらの手法はサーバーレンダリングに使用できます。ただし、レンダリングがサーバー***と*** クライアントの両方で行われるアーキテクチャの場合、まったく異なるパフォーマンス特性とトレードオフを持つ独自のソリューションのクラスであることが重要です。

Reactユーザーは、[renderToString()](https://reactjs.org/docs/react-dom-server.html) 、または [Next.js](https://nextjs.org) のように、その上へ構築されたソリューションをサーバーレンダリングで使うことができます。

Vueユーザーは、Vueの[サーバーレンダリングガイド](https://ssr.vuejs.org)]か [Nuxt](https://nuxtjs.org) を見ることができます。

Angular は [Universal](https://angular.io/guide/universal) を持っています。
最も一般的なソリューションでは、何らかの形でハイドレーションを使用しますが、ツールを選択する前に使用しているアプローチに気をつけてください。

## 静的レンダリング {: #static-rendering }

[静的レンダリング](https://frontarm.com/articles/static-vs-server-rendering/) はビルド時に行われ、最速のFPとFCP、TTIを提供します（クライアントサイドのJS量が有限であると仮定する）
サーバーレンダリングとは違い、ページのHTMLをすぐに生成する必要がないため、一貫して最速のTTFBを達成することが可能です。
通常、静的レンダリングは、各URLに対応する個別のHTMLファイルを前もって作成することを意味します。HTMLの応答が予め生成されているので、静的レンダリングは複数のCDNをデプロイし、エッジキャッシュを活用することができます。

<img src="../../images/2019/02/rendering-on-the-web/static-rendering-tti.png" alt="Diagram showing static rendering and optional JS execution affecting FCP
and TTI" width="280">

静的レンダリングのためのソリューションは さまざまな形態やサイズが存在します。
[Gatsby](https://www.gatsbyjs.org) のようなツールは、開発者の作成したアプリケーションが、ビルドステップで生成されたものよりも、より動的に変化しているように感じられる設計となっています。
[Jekyl](https://jekyllrb.com) や [Metalsmith](https://metalsmith.io) のような他のツールは、それらの静的な性質をふまえ、よりテンプレート駆動のアプローチを提供します。

静的レンダリングの欠点のひとつは、すべての有効なURLに対し、個々にHTMLファイルを生成しなければならないことです。
これらのURLが事前に、また多くの固有ページを持つサイトであるか予測できない場合、これは難題であり実行不可能になることもあります。

Reactのユーザーは [Gatsby](https://www.gatsbyjs.org) や [Next.jsの静的エクスポート](https://nextjs.org/learn/excel/static-html-export/)、または [Navi](https://frontarm.com/navi/) になじみがあるかもしれません － これらすべては、コンポーネントを使った作成を便利にします。
ただし、静的レンダリングとプリレンダリングの違いを理解することが重要です：
静的にレンダリングされたページは、クライアントサイドJSの実行をあまり使わず対話性のあるものにできます。一方、プリレンダリングは、ページを本格的に対話可能とする必要があり、クライアント上でブートしなければならないシングルページアプリケーションのFPまたはFCPを向上させます。

もし、とあるソリューションが静的レンダリングかプリレンダリングか分からない場合、このテストを試してみてください：
JavaScriptを無効にし、作成したWebページを読み込みます。
静的レンダリングのページの場合、ほとんどの機能がJavaScriptが有効でなくても存在し続けます。
プリレンダリングのページの場合、リンクのような基本的な機能は残りますが、ほとんどのページは不活性となります。

他の有用なテストは、Chrome DevTools を使用してネットワークの速度を落とし、ページが対話可能になるまで、どのくらいの量のJavaScriptがダウンロードされたかを観察することです。
プリレンダリングは通常、対話性のあるものとなるために多くのJavaScriptを必要とします。そして、そのJavaScriptは、静的レンダリングで使われる [プログレッシブエンハンスメント](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) の手法よりも複雑になりがちです。

## サーバーレンダリング vs 静的レンダリング {: #server-vs-static }

サーバーレンダリングは銀の弾丸ではありません － その動的な性質は[大きな演算でのオーバーヘッド](https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9)コストを伴います。
多くのサーバーレンダリング手法は早期にフラッシュせず、TTFBを遅らせる、または送信するデータを2倍にします（例：クライアント上でJSを使用した時のインライン状態）

Reactでは、renderToString() が同期処理でシングルスレッドのため遅くなることがあります。サーバーレンダリングを「正しく」行うためには、[コンポーネントのキャッシュ](https://medium.com/@reactcomponentcaching/speedier-server-side-rendering-in-react-16-with-component-caching-e8aa677929b1)、メモリ消費の管理、[メモ化](https://speakerdeck.com/maxnajim/hastening-react-ssr-with-component-memoization-and-templatization)の適用、その他多くの懸念事項に対するソリューションの検索や構築が必要です。
通常は同じアプリケーションを複数回、処理／再構築します － 1回はクライアント上、1回はサーバー上です。
だからといって、サーバーレンダリングで何かが素早く表示されたとしても、突如、作業が減るということではありません。

サーバーレンダリングは各URLに対し、オンデマンドでHTMLを生成しますが、静的レンダリングがコンテンツを配信する速度より遅くなることがあります。
もしあなたが追加の足掛かりを置ければ、サーバーレンダリング ＋ [HTMLキャッシュ](https://freecontent.manning.com/caching-in-react/)は、サーバーのレンダリング時間をがっつり減らすことが可能です。
パーソナライズが必要なページは、静的レンダリングで上手く動作しないタイプのリクエストの具体例です。

サーバーレンダリングもまた、[PWA](/web/progressive-web-apps/) を構築する際に興味深い提案をすることができます。
フルページの[サービスワーカ](/web/fundamentals/primers/service-workers/)キャッシュを使用するのが良いでしょうか？それとも個々のコンテンツをサーバーレンダリングするのが良いでしょうか？

## クライアントサイド レンダリング (CSR) {: #csr }

*クライアントサイド レンダリング（CSR）は JavaScriptを使用し、直接ブラウザでページをレンダリングすることを意味します。すべてのロジック、データフェッチ、テンプレーティングやルーティングは、サーバーではなくクライアント上で扱われます。*

クライアントサイド レンダリングは、取得が難しく、モバイル用に高速を保つことも難しい場合があります。
もし、最小の作業で[JavaScriptのバジェット](https://mobile.twitter.com/HenrikJoreteg/status/1039744716210950144)を抑え、可能な限り少ない[RTT（往復遅延時間）](https://en.wikipedia.org/wiki/Round-trip_delay_time)で価値を提供すれば、純粋なサーバーレンダリングのパフォーマンスへ近づくことができます。
[HTTP/2 サーバー通知](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/)、または `<link rel=preload>` を使うことで、クリティカルなスクリプトとデータをすぐに配信することができます。これにより、パーサーはより早く動きます。
[PRPL](/web/fundamentals/performance/prpl-pattern/) のようなパターンは、初期状態とその後のナビゲーションが瞬時に感じられるようにするため、その価値が評価されます。

<img src="../../images/2019/02/rendering-on-the-web/client-rendering-tti.png" alt="Diagram showing client-side rendering affecting FCP and TTI" width="500">

クライアントサイド レンダリングの主な欠点は、アプリケーションが大きくなるにつれ、JavaScriptの量も増える傾向にあることです。これは、処理能力を奪いあい、大抵はページのコンテンツをレンダリングする前に処理しなければならないため、新しいJavaScriptライブラリ、polyfill、サードパーティーのコードの追加は特に難しくなります。
経験上、大きいJavaScriptをバンドルするCSRの場合は、[積極的なコード分割](/web/fundamentals/performance/optimizing-javascript/code-splitting/)を心がけ、必ずJavaScriptを遅延ロードするようにします ー「必要な時に必要なものだけを」
経験によると、ほとんど対話性がない、または、全く対話可能ではない場合、サーバーレンダリングはこれらの問題のよりスケーラブルな解決方法を提示することができます。

シングルページアプリケーションを構築する人々にとって、ほとんどのページで共有されているユーザーインターフェースの中心部分を判別することは、[アプリケーション シェル キャッシング](/web/updates/2015/11/app-shell)の技術が適用できることを意味します。
サービスワーカーと組み合わせると、再訪問時のパフォーマンスを劇的に向上させることができます。

## リハイドレーションによるサーバーレンダリングと CSRの組み合わせ {: #rehydration }

ユニバーサルレンダリング、または 単に「SSR」とよく呼ばれるこのアプローチは、クライアントサイドレンダリングとサーバーレンダリング間のトレードオフを、両方を実行することで取り繕おうと図ります。
注意深く実装すると、これはサーバーレンダリング同様、高速のFCP（First Contentful Paint）を達成します。そして、[(リ)ハイドレーション](https://docs.electrode.io/guides/general/server-side-data-hydration)と呼ばれるテクニックを用いて、クライアント上で再レンダリングすることにより「ピックアップ」します。
これは独創的な解決方法ですが、パフォーマンスに重大な欠点があります。

リハイドレーションを伴うSSRの主な欠点は、もしFP（First Paint）を改善したとしても、TTI（Time To Interactive）に重大な悪い影響を及ぼす可能性があることです。
SSRのページは、しばしば不正にロードされ、対話性があるように見えますが、クライアントサイドのJSが実行され、イベントハンドラがアタッチされるまで、真に入力へ応答することはできません。これはモバイル上だと数秒から数分かかることがあります。

おそらく、あなたは自らこの現象を経験したと思います - ページがロードされたように見えた後しばらくの間、クリックやタップをしても何も行われません。
これはすぐにフラストレーションを招きます…… *「なんで何も起こらないんだ？どうしてスクロールできないんだ？」*

### リハイドレーションの問題：ふたつの価値のためのひとつのアプリ {: #rehydration-issues }

リハイドレーションの問題は、JSによる対話の遅延よりも悪化することがしばしばあります。
クライアントサイドのJavaScriptが、そのHTMLをレンダリングするために使用したすべてのデータを再リクエストする必要なく、サーバーが中断したところから正しく「ピックアップ」できるようにするため、現行のSSRソリューションは、UIのデータ依存関係をスクリプトタグとしてドキュメントへ追加し、そこからの応答を全般的にシリアライズします。
結果としてHTMLドキュメントは高レベルの重複を含みます：

<img src="../../images/2019/02/rendering-on-the-web/html.png" alt="HTML document
containing serialized UI, inlined data and a bundle.js script">

ご覧のように、サーバーはナビゲーションリクエストに応答してアプリケーションUIのディスクリプションを返します。ただし、そのUIを作られるために使われたソースデータも返され、UI実装の完全なコピーがクライアント上で起動します。bundle.js のロードと実行が完了した後でのみ、このUIは対話可能になります。

SSRリハイドレーションを使用している実際のWebサイトから収集されたパフォーマンスのメトリクスは、その使用を強く勧められないことを表しています。
最終的に、その理由はユーザーエクスペリエンスにたどり着きます：それはユーザーをとても簡単に“不気味の谷”へ陥らせるのです。

<img src="../../images/2019/02/rendering-on-the-web/rehydration-tti.png" alt="Diagram showing client rendering negatively affecting TTI" width="600">

しかし、リハイドレーションを伴う SSR には希望があります。
短期的には、高度にキャッシュ可能なコンテンツに SSR を使用するだけで TTBF の遅延を減らすことができ、プリレンダリングと同様の結果を作り出します。
[少しづつ](https://www.emberjs.com/blog/2017/10/10/glimmer-progress-report.html)、徐々に、また部分的にリハイドレーションを行うことは、将来的にこの技術をより実用的にすることの鍵となるでしょう。

## ストリーミング サーバーレンダリング と プログレッシブ リハイドレーション {: #progressive-rehydration }

サーバーレンダリングは、ここ数年で多くの開発が行われました。

[ストリーミング サーバーレンダリング](https://zeit.co/blog/streaming-server-rendering-at-spectrum)は、HTMLをチャンクで送信し、ブラウザが受信した通り、徐々にレンダリングすることが可能です。これは、マークアップがより早くユーザーへ到達するため、最速のFP（First Paint）とFCP（First Contentful Paint）を提供することができます。
Reactでは、[renderToNodeStream()](https://reactjs.org/docs/react-dom-server.html#rendertonodestream) でストリームは非同期になります - 同期である renderToString と比較して - バックプレッシャーが上手く制御されることを意味します。

プログレッシブ リハイドレーションもまた注目する価値があり、React が[探ってきた](https://github.com/facebook/react/pull/14717)ものもあります。
このアプローチでは、アプリケーションすべてを一度に初期化する現行の一般的なアプローチではなく、サーバーレンダリング アプリケーションの各部品が時間とともに“起動”されます。
これは、クライアントサイドでページ内の優先度が低い部分をアップグレードした場合でも、メインスレッドがブロックされるのを防ぐことができるので、ページを対話可能とにするのに必要なJavaScript量の削減を助けることができます。
また、サーバーレンダリングされたDOMツリーが破壊され、直ちに再構築された場合に、最も一般的なSSRリハイドレーションの落とし穴を回避するのを助けます - ほとんどの場合、初期の同期を行うクライアントサイド レンダリングにはまだ準備のできていないデータが必要であり、おそらくPromisの解決を待っている状態です。

### 部分的なリハイドレーション {: #partial-rehydration }

部分的なリハイドレーションの実装は難しいということが裏付けられています。
このアプローチは、段階的なリハイドレーションのアイディアの拡張で、段階的にリハイドレーションされるべき個々の部分（コンポーネント／ビュー／ツリー）が分析され、ほとんど対話可能でないものか、またはリアクティブではないものが識別されます。
これらほとんどの静的な部分に対して、該当するJavaScriptのコードは、その時に不活性な参照と装飾になる機能に変換され、クライアント側のフットプリントは、ほぼ0へ縮小されます。
部分的なハイドレーションのアプローチは、自身の問題と妥協が伴います。それはキャッシングのための興味深い挑戦を示し、クライアントサイドのナビゲーションは、アプリケーションの不活性部分のためにサーバーレンダリングされたHTMLが、全ページのロードなしで使用可能になると想定できないことを意味します。

### トライソモルフィック レンダリング  {: #trisomorphic }

もしも[サービスワーカー](/web/fundamentals/primers/service-workers/)をあなたのために選択するなら、“トライソモルフィック” レンダリングも面白いかもしれません。
これは initial/non-JS ナビゲーションのためにストリーミング サーバー レンダリングを使うことができる時のテクニックで、それら（initial/non-JS）がインストールされた後、あなたのサービスワーカーはナビゲーションのためのHTMLレンダリングに取りかかります。
これはキャッシュコンポーネントと最新のテンプレートを保持し、同一セッション内の新規ビューをレンダリングするためのSPAスタイルナビゲーションを有効にします。
このアプローチは、同じテンプレートを生成したり、サーバー、クライアントページ、サーバーワーカーの間でルーティングコードを共有できる場合に適しています。

<img src="../../images/2019/02/rendering-on-the-web/trisomorphic.png" alt="Diagram of Trisomorphic rendering, showing a browser and service worker
communicating with the server">

## SEOについての考察 {: #seo }

チームは Web上でレンダリングするための戦略を選択する場合、しばしば SEOの影響を考慮します。サーバーレンダリングはクローラが解釈しやすい“完全な見え方”のエクスペリエンスを提供するためによく選ばれます。
クローラは [JavaScript を理解できます](https://web.dev/discoverable/how-search-works)が、それらはしばしば、どのようにレンダリングするかを認識している価値がある という[制約があります](/search/docs/guides/rendering)。
クライアントサイドレンダリングは機能しますが、大抵は追加テストや地道な調査が欠かせません。
ごく最近では、クライアントサイドのJavaScriptによってアーキテクチャが大きく左右される場合、[ダイナミックレンダリング](/search/docs/guides/dynamic-rendering)もまた考慮する価値のある選択肢になりました。

確信が持てない場合、あなたの選択したアプローチが期待通りに動作しているかをテストするため、[モバイルフレンドリーなテストツール](https://search.google.com/test/mobile-friendly)が非常に貴重なものとなります。
それは、どのページがどのように Google クローラーに表示されるかや、（JavaScript実行後に）発見されたシリアル化されたHTMLコンテンツ、レンダリング中に発生したエラーを視覚的にプレビューします。

<img src="../../images/2019/02/rendering-on-the-web/mobile-friendly-test.png" alt="Screenshot of the Mobile Friendly Test UI">

## まとめ {: #wrapup }

レンダリングのアプローチを決定するときは、ボトルネックを計測し、把握してください。
静的レンダリング、またはサーバーレンダリングのどちらでも、その90％を達成できるかどうかを検討してください。
対話性を得るためには、大部分が最小限のJSを伴うHTMLで全然大丈夫です。
これは、サーバ－クライアントの範囲を示す簡単な図です：

<img src="../../images/2019/02/rendering-on-the-web/infographic.png" alt="Infographic showing the spectrum of options described in this article">

## 謝辞 {: #credits }

みなさまのレビューと感想に感謝します:

Jeffrey Posnick
Houssein Djirdeh
Shubhie Panicker
Chris Harrelson
Sebastian Markbåge

<div class="clearfix"></div>

Translated by {% include "web/_shared/contributors/skikuchi.html" %}

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
