project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:ページがすばやくインタラクティブになるために、ネットワーク通信と JavaScript の解析やコンパイルのコストを低く抑える。

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-11-30 #}
{# wf_blink_components: Blink>JavaScript #}

# JavaScript の起動の最適化 {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

JavaScript に深く依存するサイトを構築する際に、送信した内容に対して、簡単にはわからない方法で費用を支払っていることがあります。
 この記事では、モバイル端末でサイトをすばやく読み込んでインタラクティブにさせたい場合に、ちょっとした **抑制** が役立つ理由を説明します。
 JavaScript の量を減らすことで、ネットワーク伝送時間、コードの展開時間、JavaScript の解析やコンパイルに必要な時間が少なくなります。



## ネットワーク

ほとんどのデベロッパーが JavaScript のコストについて考えるとき、**ダウンロードと実行コスト** の観点から考えます。
 ネットワークを経由する JavaScript のバイト数が増えると、ユーザーの接続がより長く、より遅くなります。


<img src="images/1_U00XcnhqoczTuJ8NH8UhOw.png" alt="ブラウザがリソースをリクエストすると、そのリソースを取得して解凍する必要があります。
 JavaScript のようなリソースの場合、それらのリソースを実行の前に解析し、コンパイルする必要があります。"/>



先進国においてさえ、ユーザーが保持する **効果的なネットワーク接続の種類** が 3G や 4G、Wi-Fi ではないことがあるため、こうしたことが問題になる可能性があります。
 コーヒーショップで利用する Wi-Fi の接続が、2G の速度の携帯アクセス ポイントの場合もあります。


以下の方法で、JavaScript のネットワーク転送コストを **削減** できます。

* **ユーザーが必要とするコードだけを送信する**。
    * [コード分​​割](/web/updates/2017/06/supercharged-codesplit)を使用して、JavaScript を重要なものと重要でないものに分割します。
 [webpack](https://webpack.js.org) のようなモジュール バンドラーは[コード分割](https://webpack.js.org/guides/code-splitting/)をサポートします。
    * 重要ではないコードを遅延読み込みします。
* **縮小化**
    * ES5 コードを[縮小化する](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#minification_preprocessing_context-specific_optimizations)には [UglifyJS](https://github.com/mishoo/UglifyJS) を使用します。
    * ES2015+ を縮小化するには [babel-minify](https://github.com/babel/minify) または [uglify-es](https://www.npmjs.com/package/uglify-es) を使用します。
* **圧縮**
    * 少なくとも [gzip](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text_compression_with_gzip) を使用してテキストベースのリソースを圧縮します。
    * [Brotli](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/) ~[q11](https://twitter.com/paulcalvano/status/924660429846208514) の使用を考慮してください。
 Brotli は圧縮率の点で gzip より優れています。
 これにより、CertSimple は圧縮された JS のバイトサイズの [17%](https://speakerdeck.com/addyosmani/the-browser-hackers-guide-to-instant-loading?slide=30) を節約し、LinkedIn は読み込み時間 [4%](https://engineering.linkedin.com/blog/2017/05/boosting-site-speed-using-brotli-compression) を節約しました。
* **未使用のコードの削除**。
    * [DevTools のコード カバレッジ](/web/updates/2017/04/devtools-release-notes#coverage)で削除できるまたは遅延読み込みできるコードを特定します。
    * 最近のブラウザに既存のトランスパイル機能を避けるために、[babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) および browserlist を使用します。
      上級デベロッパーであれば、慎重な [Webpack バンドルの分析](https://github.com/webpack-contrib/webpack-bundle-analyzer)によって不要な依存関係を削除できるかもしれません。
    * コードを削除する方法の詳細については、[tree-shaking](https://webpack.js.org/guides/tree-shaking/)、[Closure Compiler](/closure/compiler/) の高度な最適化、または Moment.js のようなライブラリのための [lodash-babel-plugin](https://github.com/lodash/babel-plugin-lodash) や webpack の [ContextReplacementPlugin](https://iamakulov.com/notes/webpack-front-end-size-caching/#moment-js) のようなライブラリ トリミング プラグインを参照してください。
* **ネットワーク トリップを最小限に抑えるためのコード キャッシング**。
    * ブラウザが応答を効率的にキャッシュするように [HTTP キャッシュ](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)を使用します。
 変更されていないバイトが転送されないように、スクリプトの最適な有効期間（max-age）を決定し、検証トークン（ETag）を指定します。
    * Service Worker のキャッシング機能はアプリケーションのネットワーク回復力を高め、[V8 のコード キャッシュ](https://v8project.blogspot.com/2015/07/code-caching.html)などの機能に積極的にアクセスできるようになります。
    * 変更されていないリソースを再獲得する必要がないように、長期キャッシングを使用します。
 Webpack を使用している場合は、[ファイル名のハッシュ](https://webpack.js.org/guides/caching/)を参照してください。


## 解析とコンパイル

ダウンロード後、JavaScript で最もコストが **かかる** ことの 1 つは、JS エンジンがこのコードを **解析しコンパイルする** 時間です。
 [Chrome DevTools](/web/tools/chrome-devtools/) では、解析とコンパイルはパフォーマンス パネルの黄色い「スクリプト」時間の一部です。



<img src="images/1__4gNDmBlXxOF2-KmsOrKkw.png"/>

[Bottom-Up] タブと [Call Tree] タブには、解析とコンパイルの正確な時間が表示されます。

<figure> <img src="images/1_GdrVt_BTTzzBOIoyZZsQZQ.png"/> <figcaption> Chrome DevTools [Performance] パネル > [Bottom-Up]。
 V8 の Runtime Call Stats が有効になっていると、Parse や Compile などのフェーズで費やされた時間がわかります</figcaption> </figure>


注: Runtime Call Stats に関する Performance パネルのサポートは現在試験運用版です。
有効にするには、chrome://flags/#enable-devtools-experiments -> Chrome の再起動 -> DevTools -> Settings -> Experiments -> shift を 6 回押す -> `Timeline: V8 Runtime Call Stats on Timeline` というオプションにチェックを入れて DevTools を閉じて再度開きます。



しかし、なぜこれが重要なのでしょうか。

<img src="images/1_Dirw7RdQj9Dktc-Ny6-xbA.png"/>

コードの解析とコンパイルに長い時間を費やすと、ユーザーがサイトとやり取りできるようになるまでの時間が大幅に遅れる場合があります。
 送信する JavaScript が多いほど、サイトがインタラクティブになる前にその JavaScript の解析とコンパイルにかかる時間が長くなります。


> バイト単位で比較すると、**JavaScript は同等サイズのイメージや Web フォントよりもブラウザ処理の負荷がかかります** — Tom Dale


JavaScript と比較すると同等サイズのイメージの処理には多くのコスト（イメージにはデコードも必要です！）がかかりますが、平均的なモバイル ハードウェアでは、JavaScript はページの対話性に悪影響を及ぼす可能性が高くなります。



<figure> <img src="images/1_PRVzNizF9jQ_QADF5lQHpA.png"/> <figcaption>JavaScript とイメージのバイトでは、コストの種類が異なります。
 通常、イメージは、デコードおよびラスタライズされている間に、メインスレッドをブロックしたり、インターフェースがインタラクティブになるのを妨げることはありません。

 しかし JS は、解析、コンパイル、および実行のコストのために対話性を遅らせることがあります。</figcaption> </figure>


解析やコンパイルが低速になる問題について考える場合、コンテキストが重要です。ここでは、**平均的な** スマートフォンについて考えています。
 **平均的なユーザーは、低速の CPU と GPU を搭載し、L2/L3 キャッシュがなく、メモリの制約を受ける可能性のあるスマートフォンを使用しているかもしれません。**



> ネットワーク機能とデバイスの機能は必ずしも同等とは限りません。 > 素晴らしい光ファイバー接続を使用するユーザーが、自分のデバイスに送信された JavaScript を解析して評価するのに最適な CPU を持っているとは限りません。

 > 一方で、劣悪なネットワーク接続を使用していても、CPU は極めて高速である場合もあり得ます。
 — Kristofer Baxter, LinkedIn


以下では、1MB 以下の解凍された（シンプルな）JavaScript をローエンドおよびハイエンドのハードウェアで解析するコストを確認できます。
 **マーケットで最速のスマートフォンと平均的なスマートフォンでは、コードの解析やコンパイルの時間差は 2〜5 倍になります**。


<figure> <img src="images/1_8BQ3bCYu1AVvJWPR1x8Yig.png"/> <figcaption>このグラフは、さまざまなクラスの PC 端末やモバイル端末で 1MB の JavaScript バンドル（gzip で 250KB 以下）を解析した時間を示しています。

 解析のコストについて言えば、それは解凍済みの数値です。たとえば gzip された 250KB 以下のファイルは JS で 1MB 以下のコードに解凍されます。</figcaption> </figure>



では、CNN.com のような実際のサイトではどうなるでしょうか？

**ハイエンドの iPhone 8 では、CNN の JS を解析してコンパイルするのに要する時間は 4 秒以下です。一方、平均的なスマートフォン（Moto G4）では 13 秒以下でした**。
 これは、ユーザーがこのサイトを完全に操作可能になるまでの速度に大きく影響する可能性があります。


<figure> <img src="images/1_7ysArXJ4nN0rQEMT9yZ_Sg.png"/> <figcaption>上記の解析時間は、Apple の A11 Bionic チップの性能と、より平均的な Android ハードウェアの Snapdragon 617 の性能を比較したものです。</figcaption> </figure>



これによって、あなたのポケットの中にあるスマートフォンではなく、**平均的な** ハードウェア（Moto G4 のような）でテストすることの重要性が強調されます。
 環境は重要です。**ユーザーが持つデバイスやネットワークの状況に合わせて最適化してください。**


<figure> <img src="images/1_6oEpMEi_pjRNjmtN9i2TCA.png"/> <figcaption>Google アナリティクスは、実際のユーザーがサイトにアクセスしている<a
href="https://crossbrowsertesting.com/blog/development/use-google-analytics-find-devices-customers-use/">モバイル端末のクラス</a>に関する分析を提供します。

 これにより、稼働に使用している実際の CPU/GPU の制約を理解する機会が得られます。</figcaption> </figure>




**JavaScript を送りすぎていませんか？そう、多分。**

HTTP Archive （上位 500K のサイト）を使用して[モバイル上の JavaScript](http://beta.httparchive.org/reports/state-of-javascript#bytesJs) の状態を分析すると、50% のサイトでインタラクティブになるまでに 14 秒以上かかることがわかります。
 これらのサイトでは、JS の解析とコンパイルだけでも最大 4 秒かかります。


<img src="images/1_sVgunAoet0i5FWEI9NSyMg.png"/>

JS やその他のリソースを取得して処理するのにかかる時間を考慮に入れてください。ページが使用可能になるまでユーザーがしばらく待たされることは珍しくありません。

 ここでは、もっと良い方法があるはずです。

**ページから重要ではない JavaScript を削除すると、転送時間、CPU に負荷がかかる解析とコンパイル、および潜在的なメモリオーバーヘッドを削減できます。
 そうすることで、ページがインタラクティブになるまでの時間も短縮されます。**


## 実行時間

コストがかかるのは、解析やコンパイルだけではありません。 **JavaScript の実行**
（解析しコンパイルされたコードの実行）は、メインスレッドで行わなければならないオペレーションの 1 つです。
 実行時間が長いと、ユーザーがサイトとやり取りできるようになるまでの時間も長くなる可能性があります
。

<img src="images/1_ec0wEKKVl7iQidBks3oDKg.png"/>

> スクリプトの実行に 50 ミリ秒以上かかる場合、Time-to-Interactive（操作可能になるまでの時間）は、JS のダウンロード、コンパイル、および実行にかかる*全体の*時間だけ遅れる —
> Alex Russell


これに対処するため、JavaScript を**小さな塊**に分けて、メインスレッドがロックされることを回避できます。
 実行中の作業量を減らすことができるかどうかを調べてください。


## その他のコスト

JavaScript はページのパフォーマンスに他の方法で影響を与える可能性があります。

* メモリ。 GC （ガベージ コレクション）により、ページの表示が乱れたり頻繁に一時停止したりすることがあります。
 ブラウザがメモリを取り戻すと JS の実行が一時停止されるため、ブラウザが頻繁にガベージ コレクションを実行すると、実行が一時停止する頻度が上がりすぎる可能性があります。
 [メモリリーク](/web/tools/chrome-devtools/memory-problems/)
や GC による頻繁な一時停止を避けて、ページの乱れを防ぎます。
* ランタイムに、長時間実行されている JavaScript がメインスレッドをブロックして、ページが応答しなくなることがあります。
 作業を細かく分割（スケジューリングに
<code><a
  href="/web/fundamentals/performance/rendering/optimize-javascript-execution#use_requestanimationframe_for_visual_changes">requestAnimationFrame()</a></code>
  または <code><a
  href="/web/updates/2015/08/using-requestidlecallback">requestIdleCallback()</a></code>
  を使用）して、応答に関連する問題を最小限に抑えることができます。

## JavaScript 配信コストを削減するためのパターン

JavaScript の解析やコンパイル時間とネットワーク送信時間を低速に抑えようとしている場合は、ルートベース チャンキングや [PRPL](/web/fundamentals/performance/prpl-pattern/) のようなパターンが利用できます。



### PRPL

PRPL（プッシュ、レンダリング、プリキャッシュ、遅延読み込み（レイジーロード））は、積極的なコード分割とキャッシングによって対話性を最適化するパターンです。


<img src="images/1_VgdNbnl08gcetpqE1t9P9w.png"/>

その影響を視覚化してみましょう。

V8 の Runtime Call Stats を使用して、人気のあるモバイルサイトとプログレッシブ ウェブアプリの読み込み時間を分析します。
 ご覧のとおり、解析時間（オレンジ色で表示）は、これらのサイトのほとんどが多くの時間を費やす部分です。


<img src="images/1_9BMRW5i_bS4By_JSESXX8A.png"/>

PRPL を使用するサイトの [Wego](https://www.wego.com) は、ルートの解析時間を短くすることができ、すばやくインタラクティブになっています。
 上記の他のサイトの多くは、JS のコストを低く抑えるためにコード分割と Performance Budgets を採用していました。




### プログレッシブ ブートストラップ

多くのサイトでは、対話性を犠牲にしてコンテンツの可視性を最適化しています。 大規模な JavaScript バンドルがある場合、最初の描画を早くするために、デベロッパーはサーバーサイド レンダリングを採用することがあります。JavaScript が最終的に取得できたときに、イベント ハンドラを添付してそれを「アップグレード」します。




これにはコストがかかるため、注意が必要です。 1）一般的に **大きな** HTML 応答を送信しますが、これはインタラクションを阻害します。2）JavaScript が処理を終えるまで、操作の半分が実質的には対話的ではない「不気味の谷」にユーザーを置き去りにすることになります。




プログレッシブ ブートストラップはそれよりも優れたアプローチになるかもしれません。 最低限の機能しかないページ（現在のルートに必要な HTML/JS/CSS のみで構成されているページ）を送ります。
より多くのリソースが到着すると、アプリはより多くの機能を遅延読み込みしてロック解除することができます。

<figure> <img src="images/1_zY03Y5nVEY21FXA63Qe8PA.png"/> <figcaption> <a
href="https://twitter.com/aerotwist/status/729712502943174657">プログレッシブ
ブートストラップ</a>（Paul Lewis） </figcaption> </figure>

表示されているものに対応したコードを読み込むことがカギです。 PRPL とプログレッシブ ブートストラップは、これを実現するのに役立つパターンです。


## まとめ

**送信サイズは、ローエンド ネットワークにとって重要。 解析時間は CPU バウンドのデバイスにとって重要。
 大切なのは、これらを低く抑えることです。**

チームは、JavaScript の送信時間と解析やコンパイルの時間を短く抑えるために、厳しい Performance Budgets を採用することに成功しました。
 モバイル向け Budgets については、Alex Russell の [Can You
Afford It?:Real-world Web Performance
Budgets](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)
を参照してください。

<figure> <img src="images/1_U8PJVNrA_tYADQ6_S4HUYw.png"/> <figcaption>アーキテクチャー上の決定によってアプリのロジックのための JS の「ヘッドルーム」をどれだけ増やすことができるかを検討することは有用です。</figcaption> </figure>



モバイル端末をターゲットとするサイトを構築する場合は、代表的なハードウェアで開発し、JavaScript の解析やコンパイル時間を短く抑え、チームが JavaScript のコストを監視できるように Performance Budget を採用します。




## 詳細を見る

* [Chrome Dev Summit 2017 - Modern Loading Best Practices](https://www.youtube.com/watch?v=_srJ7eHS3IM)
* [JavaScript Start-up Performance](https://medium.com/reloading/javascript-start-up-performance-69200f43b201)
* [Solving the web performance crisis](https://nolanlawson.github.io/frontendday-2016/) — Nolan Lawson
* [Can you afford it?
Real-world performance
  budgets](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)
  — Alex Russell
* [Evaluating web frameworks and
  libraries](https://twitter.com/kristoferbaxter/status/908144931125858304) —
  Kristofer Baxter
* [Cloudflare’s Results of experimenting with
  Brotli](https://blog.cloudflare.com/results-experimenting-brotli/)
（圧縮に関して。高品質の動的 Brotli は最初のページの表示を遅らせる可能性があるため、慎重に評価してください。
 代わりに静的に圧縮することをお勧めします）。
* [Performance Futures](https://medium.com/@samccone/performance-futures-bundling-281543d9a0d5)
  — Sam Saccone


