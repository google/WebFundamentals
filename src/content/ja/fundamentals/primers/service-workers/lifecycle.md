project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Service Worker のライフサイクルの詳細

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-09-29 #}

# Service Worker のライフサイクル {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Service Worker のライフサイクルは、最も複雑な部分です。その目的やメリットがわからない場合は、戦いを挑まれているかのようでしょう。しかしいったんその仕組みがわかれば、ウェブとネイティブ パターンのよいところを組み合わせて、ユーザーにシームレスかつ目立たないようにアップデートを提供できます。

ここでは詳細を説明しますが、各セクションの先頭に必要な知識を箇条書きで示します。

## 目的

ライフサイクルの目的は次のとおりです。

- オフライン ファーストを可能にする。
- 現行の Service Worker を妨げることなく新しい Service Worker を使用可能にする。
- スコープ内のページが同じ Service Worker で制御されるようにする（または Service Worker なし）。
- 一度に 1 つのバージョンのサイトのみが実行されるようにする。

最後の 1 つは非常に重要です。Service Worker がない場合、ユーザーは 1 つのタブをサイトに読み込み、後で別のタブを開くことができます。これにより、同時に 2 つのバージョンのサイトが動作することになります。これでも正常に動作することがありますが、ストレージを処理する場合は、最終的に共有ストレージの管理方法が大きく異なる 2 つのタブが存在することになります。これにより、エラーが発生するか、もっと悪い場合はデータが失われる可能性があります。

Warning: ユーザーはデータが失われるのを非常に嫌います。悲痛な気持ちになります。

## 最初の Service Worker

概要:

- Service Worker が最初に取得するのは `install` イベントであり、これは一度だけ発生します。
- `installEvent.waitUntil()` に渡された Promise によって、インストールの時間と成功または失敗が通知されます。
- Service Worker は、インストールが正常に終了して「アクティブ」になるまで `fetch` や `push` などのイベントを受信しません。
- デフォルトでは、ページ リクエスト自体が Service Worker を通過した場合を除き、ページの fetch は Service Worker を通過することはありません。そのため、Service Worker の効果を確認するには、ページを更新する必要があります。
- `clients.claim()` はこのデフォルトをオーバーライドし、制御対象外のページを制御下に置くことができます。

<style>
  .framebox-container-container {
    max-width: 466px;
    margin: 1.8rem auto 0;
  }
  .framebox-container {
    position: relative;
    padding-top: 75.3%;
  }
  .framebox-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
  .browser-screenshot {
    filter: drop-shadow(0 6px 4px rgba(0,0,0,0.2));
  }
</style>

<div class="framebox-container-container">
<div class="framebox-container">
{% framebox height="100%" %}
<link href="https://fonts.googleapis.com/css?family=Just+Another+Hand" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js" defer>
</script><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js" defer>
</script><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js" defer>
</#cdata-section></style><style><#cdata-section>
<svg class="lifecycle-diagram" style="display:none" data-md-type="raw_html">
<defs data-md-type="raw_html">
<g id="diagram-static" data-md-type="raw_html">
<text y="6.7" x="14.5" class="label" data-md-type="raw_html">インストール</text><text y="6.7" x="81.1" class="label" data-md-type="raw_html">アクティブ</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder" data-md-type="raw_html"><circle r="14" cy="25.8" cx="47.8" class="state-placeholder" data-md-type="raw_html"><circle r="14" cy="25.8" cx="81.2" class="state-placeholder" data-md-type="raw_html">
</circle></circle></circle></g>
<g id="diagram-page" data-md-type="raw_html">
<path d="M 191.3,0 12.8,0 C 5.8,0 0,5.7 0,12.8 L 0,167 c 0,7.2 5.7,13 12.8,13 l 178.5,0 c 7,0 12.8,-5.8 12.8,-13 l 0,-154 C 204,6 198.7,0.2 191.6,0.2 Z M 11,11 c 0.5,-0.5 1,-0.7 1.8,-0.8 l 178.5,0 c 0.7,0 1.3,0.3 1.8,0.8 0.8,0.5 1,1 1,1.8 l 0,13.5 -184.1,0 0,-13.5 c 0,-0.7 0.3,-1.3 0.8,-1.8 z m 182,158 c -0.4,0.4 -1,0.7 -1.7,0.7 l -178.5,0 c -0.7,0 -1.3,-0.3 -1.8,-0.8 -0.5,-0.8 -0.8,-1.4 -0.8,-2 l 0,-130.4 183.6,0 0,130.5 c 0,0.8 -0.2,1.4 -0.7,2 z" data-md-type="raw_html">
<path d="m 26.5,18.6 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.2,0 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.3,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.3,0 c 0,2.8 -2.3,5 -5.2,5 -2.8,0 -5,-2.2 -5,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m -5.2,111 102.7,0 0,10.4 -102.7,0 0,-10.3 z m 0,-16.8 102.7,0 0,10.2 -102.7,0 0,-10 z M 52,96 l 45.4,0 0,10.2 -45.4,0 0,-10.2 z m 0,-17 45.4,0 0,10.3 -45.4,0 0,-10.3 z m 0,-16.8 45.6,0 0,10.3 -45.6,0 0,-10.3 z m 100.2,1.3 -45.4,0 0,42 45.4,0 0,-42 z m -10.2,31.8 -25,0 0,-21.5 25,0 0,21.5 z" data-md-type="raw_html">
</path></path></g>
<path id="diagram-sw" d="m 19.43,12.98 c 0.04,-0.32 0.07,-0.64 0.07,-0.98 0,-0.34 -0.03,-0.66 -0.07,-0.98 l 2.11,-1.65 c 0.19,-0.15 0.24,-0.42 0.12,-0.64 l -2,-3.46 C 19.54,5.05 19.27,4.97 19.05,5.05 l -2.49,1 C 16.04,5.65 15.48,5.32 14.87,5.07 L 14.49,2.42 C 14.46,2.18 14.25,2 14,2 L 10,2 C 9.75,2 9.54,2.18 9.51,2.42 L 9.13,5.07 C 8.52,5.32 7.96,5.66 7.44,6.05 l -2.49,-1 C 4.72,4.96 4.46,5.05 4.34,5.27 l -2,3.46 C 2.21,8.95 2.27,9.22 2.46,9.37 l 2.11,1.65 C 4.53,11.34 4.5,11.67 4.5,12 c 0,0.33 0.03,0.66 0.07,0.98 l -2.11,1.65 c -0.19,0.15 -0.24,0.42 -0.12,0.64 l 2,3.46 c 0.12,0.22 0.39,0.3 0.61,0.22 l 2.49,-1 c 0.52,0.4 1.08,0.73 1.69,0.98 l 0.38,2.65 C 9.54,21.82 9.75,22 10,22 l 4,0 c 0.25,0 0.46,-0.18 0.49,-0.42 l 0.38,-2.65 c 0.61,-0.25 1.17,-0.59 1.69,-0.98 l 2.49,1 c 0.23,0.09 0.49,0 0.61,-0.22 l 2,-3.46 c 0.12,-0.22 0.07,-0.49 -0.12,-0.64 L 19.43,12.98 Z M 12,15.5 c -1.93,0 -3.5,-1.57 -3.5,-3.5 0,-1.93 1.57,-3.5 3.5,-3.5 1.93,0 3.5,1.57 3.5,3.5 0,1.93 -1.57,3.5 -3.5,3.5 z" data-md-type="raw_html">
</path></circle></g><g id="diagram-refresh" data-md-type="raw_html"><circle id="page-action-circle" cx="81.2" cy="58.1" r="3.5" fill="#fff" stroke="#000" stroke-width=".5" data-md-type="raw_html"><path d="M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z" data-md-type="raw_html">
</path></use></g><g id="diagram-close" data-md-type="raw_html"><use xlink:href="#page-action-circle" data-md-type="raw_html"><path id="path5062" d="M83 56.58l-.37-.37-1.46 1.47-1.45-1.46-.37.38 1.46 1.46-1.45 1.46.37.36 1.45-1.45 1.46 1.46.37-.36-1.46-1.46z" data-md-type="raw_html">
</path></defs>
</svg>
</use></g></path></path></path></path></path></path></use></use></g></use></rect></svg><svg class="lifecycle-diagram register" viewbox="0 0 96.9 73" data-md-type="raw_html"><rect ry="15.8" y="10" x="65.4" height="63" width="31.6" class="controlled" data-md-type="raw_html"><use xlink:href="#diagram-static" data-md-type="raw_html"><g transform="matrix(1.1187 0 0 1.1187 1.078 12.408)" class="cog cog-new" data-md-type="raw_html"><use height="10" width="10" xlink:href="#diagram-sw" data-md-type="raw_html"><use transform="matrix(.09532 0 0 .09532 71.44 48.39)" xlink:href="#diagram-page" width="10" height="10" class="diagram-page" data-md-type="raw_html"><path d="M78.6 47.7c-1-6-2-11.6-1.6-17" class="fetch" data-md-type="raw_html"><path d="M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2" class="fetch" data-md-type="raw_html"><path d="M75.7 47c-2.3-6.3-3.2-12.5-2-18.2" class="fetch" data-md-type="raw_html"><path d="M89.5 29.5c.3 6-.4 12-4 18" class="fetch" data-md-type="raw_html"><path d="M75.4 30.3c0 4-1 6 2 17.2" class="fetch" data-md-type="raw_html"><path d="M86.6 31C88 37 86 42 84 47.4" class="fetch" data-md-type="raw_html"><g class="refresh-rotator" data-md-type="raw_html"><use xlink:href="#diagram-refresh" class="diagram-refresh" data-md-type="raw_html">
</#cdata-section></script><div data-md-type="block_html"><script><#cdata-section>
</div>
<p data-md-type="paragraph">{% endframebox %}</p>
</div><div data-md-type="block_html">
</div></script></div>
</div>
</div>
<p data-md-type="paragraph">次の HTML をご覧ください。</p>
<pre data-md-type="block_code" data-md-language=""><code><!DOCTYPE html>
An image will appear here in 3 seconds:
<script>
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered!', reg))
    .catch(err => console.log('Boo!', err));

  setTimeout(() => {
    const img = new Image();
    img.src = '/dog.svg';
    document.body.appendChild(img);
  }, 3000);
</script>
</code></pre>
<p data-md-type="paragraph">これは Service Worker を登録し、3 秒後に犬の画像を追加します。</p>
<p data-md-type="paragraph">その Service Worker <code data-md-type="codespan">sw.js</code> は次のとおりです。</p>
<pre data-md-type="block_code" data-md-language=""><code>self.addEventListener('install', event => {
  console.log('V1 installing…');

  // cache a cat SVG
  event.waitUntil(
    caches.open('static-v1').then(cache => cache.add('/cat.svg'))
  );
});

self.addEventListener('activate', event => {
  console.log('V1 now ready to handle fetches!');
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  if (url.origin == location.origin && url.pathname == '/dog.svg') {
    event.respondWith(caches.match('/cat.svg'));
  }
});
</code></pre>
<p data-md-type="paragraph">猫の画像をキャッシュし、<code data-md-type="codespan">/dog.svg</code> のリクエストがあるたびに表示します。
ただし、<a href="https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/" data-md-type="link">上記の例を実行</a>{:
.external}した場合、ページを最初に読み込んだときは犬が表示されます。
更新を押すと、猫が表示されます。</p>
<p data-md-type="paragraph">注: 猫の方が犬よりよいです。猫の方がよいと言ったらよいのです。</p>
<h3 data-md-type="header" data-md-header-level="3">スコープと制御</h3>
<p data-md-type="paragraph">Service Worker 登録のデフォルトのスコープは、スクリプト URL に対して相対的な <code data-md-type="codespan">./</code> です。
つまり、<code data-md-type="codespan">//example.com/foo/bar.js</code> に Service Worker を登録すると、デフォルトのスコープは <code data-md-type="codespan">//example.com/foo/</code> になります。</p>
<p data-md-type="paragraph">ページ、ワーカー、共有ワーカーは、<code data-md-type="codespan">clients</code> と呼ばれます。Service Worker で制御できるのは、スコープ内のクライアントのみです。
クライアントが制御されるようになると、その fetch はスコープ内の Service Worker を通過するようになります。
クライアントを制御している <code data-md-type="codespan">navigator.serviceWorker.controller</code> が null と Service Worker インスタンスのどちらであるかを判別できます。</p>
<h3 data-md-type="header" data-md-header-level="3">ダウンロード、解析、実行</h3>
<p data-md-type="paragraph">最初の Service Worker は、<code data-md-type="codespan">.register()</code> を呼び出すとダウンロードされます。スクリプトがダウンロードや解析に失敗したか、初期実行時にエラーをスローした場合、登録 Promise は棄却され、Service Worker は破棄されます。</p>
<p data-md-type="paragraph">Chrome の DevTools によって、エラーがコンソールと [Application] タブの Service Worker セクションに表示されます。</p>
<div data-md-type="block_html">
<figure>
  <img src="images/register-fail.png" class="browser-screenshot" alt="Service Worker の DevTools タブに表示されたエラー">
</figure>
</div>
<h3 data-md-type="header" data-md-header-level="3">インストール</h3>
<p data-md-type="paragraph">Service Worker が最初に取得するイベントは <code data-md-type="codespan">install</code> です。Service Worker が実行されるとすぐにトリガーされ、Service Worker ごとに一度だけ呼び出されます。Service Worker スクリプトを変更すると、ブラウザでは別の Service Worker と見なされ、その <code data-md-type="codespan">install</code> イベントが取得されます。<a href="#updates" data-md-type="link">アップデートの詳細については、後述します</a>。</p>
<p data-md-type="paragraph"><code data-md-type="codespan">install</code> イベントが発生すると、クライアントを制御する前に必要なものをすべてキャッシュできます。
<code data-md-type="codespan">event.waitUntil()</code> に Promise が渡されると、ブラウザはインストールの完了のタイミングと成功したかどうかを把握できます。</p>
<p data-md-type="paragraph">Promise が棄却されると、インストールは失敗したことになり、ブラウザは Service Worker を破棄します。
クライアントは制御されません。つまり、<code data-md-type="codespan">fetch</code> イベントではキャッシュに存在する「cat.svg」にのみ依存することになります。
これは依存関係です。</p>
<h3 data-md-type="header" data-md-header-level="3">アクティベート</h3>
<p data-md-type="paragraph">Service Worker がクライアントを制御したり、<code data-md-type="codespan">push</code> や <code data-md-type="codespan">sync</code> などの機能イベントを処理したりできるようになると、<code data-md-type="codespan">activate</code> イベントを取得します。
ただし、<code data-md-type="codespan">.register()</code> を呼び出したページが制御されるという意味ではありません。</p>
<p data-md-type="paragraph"><a href="https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/" data-md-type="link">デモ</a>{:
.external}を最初に読み込んだ場合、Service Worker のアクティベート後しばらくしてから <code data-md-type="codespan">dog.svg</code> をリクエストしても、リクエストは処理されず、犬の画像が表示されます。Service Worker なしでページが読み込まれ、サブリソースも読み込まれない場合、デフォルトは「一貫性」です。
<a href="https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/" data-md-type="link">デモ</a>{:
.external}を 2 回目に読み込んだ場合（つまり、ページを更新した場合）は制御されます。ページも画像も <code data-md-type="codespan">fetch</code> イベントを通過し、猫が表示されます。</p>
<h3 data-md-type="header" data-md-header-level="3">clients.claim</h3>
<p data-md-type="paragraph">アクティベート後に Service Worker 内で <code data-md-type="codespan">clients.claim()</code> を呼び出すことによって、制御されていないクライアントを制御できます。</p>
<p data-md-type="paragraph"><a href="https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/df4cae41fa658c4ec1fa7b0d2de05f8ba6d43c94/" data-md-type="link">前述のデモのバリエーション</a>{:
.external}（<code data-md-type="codespan">activate</code> イベントで <code data-md-type="codespan">clients.claim()</code> を呼び出す）を次に示します。
最初に猫が表示されるはずです。
「はずです」というのは、タイミングによって異なるからです。猫が表示されるのは、画像が読み込まれる前に Service Worker がアクティベートされ、<code data-md-type="codespan">clients.claim()</code> が有効になった場合のみです。</p>
<p data-md-type="paragraph">Service Worker を使用して、ページをネットワーク経由で読み込む場合とは異なる方法で読み込んだ場合、<code data-md-type="codespan">clients.claim()</code> は問題になることがあります。それは、Service Worker は最終的にはそれがない状態で読み込まれた一部のクライアントを制御するためです。</p>
<p data-md-type="paragraph">注: 多くのユーザーはボイラプレートとして <code data-md-type="codespan">clients.claim()</code> を使用しているようですが、私自身はめったに使用しません。
本当に重要になるのは最初の読み込み時のみであり、段階的な機能拡張により、ページは通常は Service Worker がなくても問題なく動作します。</p>
<h2 data-md-type="header" data-md-header-level="2">Service Worker のアップデート{: #updates}</h2>
<p data-md-type="paragraph">概要:</p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">アップデートは、次の場合にトリガーされます。
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">スコープ内ページへのナビゲーション時</li>
<li data-md-type="list_item" data-md-list-type="unordered">
<code data-md-type="codespan">push</code> や <code data-md-type="codespan">sync</code> などの機能イベントの発生時（24 時間以内にアップデート チェックが実行された場合を除く）</li>
<li data-md-type="list_item" data-md-list-type="unordered">
<code data-md-type="codespan">.register()</code> の呼び出し時（Service Worker URL が変更された場合のみ）</li>
</ul>
</li>
<li data-md-type="list_item" data-md-list-type="unordered">アップデートの取得時、Service Worker スクリプトのキャッシュ ヘッダーが（最大 24 時間）優先されます。
このオプトイン動作を行うのは、ユーザーを逃がさないためです。
Service Worker スクリプトでは、<code data-md-type="codespan">max-age</code> は 0 になります。</li>
<li data-md-type="list_item" data-md-list-type="unordered">Service Worker がアップデート済みと見なされるのは、そのバイト数がブラウザに既にあるものと異なる場合です
（これは、インポートされたスクリプトやモジュールも含むように拡張されています）。</li>
<li data-md-type="list_item" data-md-list-type="unordered">アップデートされた Service Worker は、既存のものとともに起動され、<code data-md-type="codespan">install</code> イベントを取得します。</li>
<li data-md-type="list_item" data-md-list-type="unordered">新しい Worker は、ステータス コードが正常でないか（たとえば 404）、解析に失敗するか、実行中にエラーをスローするか、インストール時に棄却される場合は破棄されますが、現行の Worker はアクティブなままです。</li>
<li data-md-type="list_item" data-md-list-type="unordered">インストールに成功すると、アップデートされた Worker は、既存の Worker の制御しているクライアントがゼロになるまで <code data-md-type="codespan">wait</code> 状態になります
（クライアントは、更新中は重複します）。</li>
<li data-md-type="list_item" data-md-list-type="unordered">
<code data-md-type="codespan">self.skipWaiting()</code> は待機を回避します。つまり、Service Worker は、インストールが完了するとすぐにアクティベートされます。</li>
</ul>
<div data-md-type="block_html">
<div class="framebox-container-container">
<div class="framebox-container">
{% framebox height="100%" %}
<link href="https://fonts.googleapis.com/css?family=Just+Another+Hand" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js" defer>
</script><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js" defer>
</script><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js" defer>
</#cdata-section></style><style><#cdata-section>
<svg class="lifecycle-diagram" style="display:none" data-md-type="raw_html">
<defs data-md-type="raw_html">
<g id="diagram-static" data-md-type="raw_html">
<text y="6.7" x="14.5" class="label" data-md-type="raw_html">インストール</text><text y="6.7" x="81.1" class="label" data-md-type="raw_html">アクティブ</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder" data-md-type="raw_html"><circle r="14" cy="25.8" cx="47.8" class="state-placeholder" data-md-type="raw_html"><circle r="14" cy="25.8" cx="81.2" class="state-placeholder" data-md-type="raw_html">
</circle></circle></circle></g>
<g id="diagram-page" data-md-type="raw_html">
<path d="M 191.3,0 12.8,0 C 5.8,0 0,5.7 0,12.8 L 0,167 c 0,7.2 5.7,13 12.8,13 l 178.5,0 c 7,0 12.8,-5.8 12.8,-13 l 0,-154 C 204,6 198.7,0.2 191.6,0.2 Z M 11,11 c 0.5,-0.5 1,-0.7 1.8,-0.8 l 178.5,0 c 0.7,0 1.3,0.3 1.8,0.8 0.8,0.5 1,1 1,1.8 l 0,13.5 -184.1,0 0,-13.5 c 0,-0.7 0.3,-1.3 0.8,-1.8 z m 182,158 c -0.4,0.4 -1,0.7 -1.7,0.7 l -178.5,0 c -0.7,0 -1.3,-0.3 -1.8,-0.8 -0.5,-0.8 -0.8,-1.4 -0.8,-2 l 0,-130.4 183.6,0 0,130.5 c 0,0.8 -0.2,1.4 -0.7,2 z" data-md-type="raw_html">
<path d="m 26.5,18.6 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.2,0 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.3,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.3,0 c 0,2.8 -2.3,5 -5.2,5 -2.8,0 -5,-2.2 -5,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m -5.2,111 102.7,0 0,10.4 -102.7,0 0,-10.3 z m 0,-16.8 102.7,0 0,10.2 -102.7,0 0,-10 z M 52,96 l 45.4,0 0,10.2 -45.4,0 0,-10.2 z m 0,-17 45.4,0 0,10.3 -45.4,0 0,-10.3 z m 0,-16.8 45.6,0 0,10.3 -45.6,0 0,-10.3 z m 100.2,1.3 -45.4,0 0,42 45.4,0 0,-42 z m -10.2,31.8 -25,0 0,-21.5 25,0 0,21.5 z" data-md-type="raw_html">
</path></path></g>
<path id="diagram-sw" d="m 19.43,12.98 c 0.04,-0.32 0.07,-0.64 0.07,-0.98 0,-0.34 -0.03,-0.66 -0.07,-0.98 l 2.11,-1.65 c 0.19,-0.15 0.24,-0.42 0.12,-0.64 l -2,-3.46 C 19.54,5.05 19.27,4.97 19.05,5.05 l -2.49,1 C 16.04,5.65 15.48,5.32 14.87,5.07 L 14.49,2.42 C 14.46,2.18 14.25,2 14,2 L 10,2 C 9.75,2 9.54,2.18 9.51,2.42 L 9.13,5.07 C 8.52,5.32 7.96,5.66 7.44,6.05 l -2.49,-1 C 4.72,4.96 4.46,5.05 4.34,5.27 l -2,3.46 C 2.21,8.95 2.27,9.22 2.46,9.37 l 2.11,1.65 C 4.53,11.34 4.5,11.67 4.5,12 c 0,0.33 0.03,0.66 0.07,0.98 l -2.11,1.65 c -0.19,0.15 -0.24,0.42 -0.12,0.64 l 2,3.46 c 0.12,0.22 0.39,0.3 0.61,0.22 l 2.49,-1 c 0.52,0.4 1.08,0.73 1.69,0.98 l 0.38,2.65 C 9.54,21.82 9.75,22 10,22 l 4,0 c 0.25,0 0.46,-0.18 0.49,-0.42 l 0.38,-2.65 c 0.61,-0.25 1.17,-0.59 1.69,-0.98 l 2.49,1 c 0.23,0.09 0.49,0 0.61,-0.22 l 2,-3.46 c 0.12,-0.22 0.07,-0.49 -0.12,-0.64 L 19.43,12.98 Z M 12,15.5 c -1.93,0 -3.5,-1.57 -3.5,-3.5 0,-1.93 1.57,-3.5 3.5,-3.5 1.93,0 3.5,1.57 3.5,3.5 0,1.93 -1.57,3.5 -3.5,3.5 z" data-md-type="raw_html">
</path></circle></g><g id="diagram-refresh" data-md-type="raw_html"><circle id="page-action-circle" cx="81.2" cy="58.1" r="3.5" fill="#fff" stroke="#000" stroke-width=".5" data-md-type="raw_html"><path d="M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z" data-md-type="raw_html">
</path></use></g><g id="diagram-close" data-md-type="raw_html"><use xlink:href="#page-action-circle" data-md-type="raw_html"><path id="path5062" d="M83 56.58l-.37-.37-1.46 1.47-1.45-1.46-.37.38 1.46 1.46-1.45 1.46.37.36 1.45-1.45 1.46 1.46.37-.36-1.46-1.46z" data-md-type="raw_html">
</path></defs>
</svg>
<svg class="lifecycle-diagram update" viewbox="0 0 96.9 73" data-md-type="raw_html"><rect ry="15.8" y="10" x="65.4" height="63" width="31.6" class="controlled" data-md-type="raw_html"><use xlink:href="#diagram-static" data-md-type="raw_html"><text x="47.7" y="6.7" class="label" data-md-type="raw_html">待機</text></use></use></g></path></path></path></path></path></path></use></use></g></use></g></use></rect></svg><g transform="matrix(1.1187 0 0 1.1187 1.078 12.408)" class="cog cog-new" data-md-type="raw_html"><use height="10" width="10" xlink:href="#diagram-sw" data-md-type="raw_html"><g transform="matrix(1.1187 0 0 1.1187 67.745 12.408)" class="cog cog-old" data-md-type="raw_html"><use xlink:href="#diagram-sw" width="10" height="10" data-md-type="raw_html"><use transform="matrix(.09532 0 0 .09532 71.44 48.39)" xlink:href="#diagram-page" width="10" height="10" class="diagram-page" data-md-type="raw_html"><path d="M78.6 47.7c-1-6-2-11.6-1.6-17" class="fetch" data-md-type="raw_html"><path d="M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2" class="fetch" data-md-type="raw_html"><path d="M75.7 47c-2.3-6.3-3.2-12.5-2-18.2" class="fetch" data-md-type="raw_html"><path d="M89.5 29.5c.3 6-.4 12-4 18" class="fetch" data-md-type="raw_html"><path d="M75.4 30.3c0 4-1 6 2 17.2" class="fetch" data-md-type="raw_html"><path d="M86.6 31C88 37 86 42 84 47.4" class="fetch" data-md-type="raw_html"><g class="refresh-rotator" data-md-type="raw_html"><use xlink:href="#diagram-refresh" class="diagram-refresh" data-md-type="raw_html"><use xlink:href="#diagram-close" class="diagram-close" data-md-type="raw_html">
</#cdata-section></script><div data-md-type="block_html"><script><#cdata-section>
</div>
<p data-md-type="paragraph">{% endframebox %}</p>
</div><div data-md-type="block_html">
</div></script></div>
</div>
</div>
<p data-md-type="paragraph">猫ではなく馬の画像をレスポンスとして返すように Service Worker スクリプトを変更したとします。</p>
<pre data-md-type="block_code" data-md-language=""><code>const expectedCaches = ['static-v2'];

self.addEventListener('install', event => {
  console.log('V2 installing…');

  // cache a horse SVG into a new cache, static-v2
  event.waitUntil(
    caches.open('static-v2').then(cache => cache.add('/horse.svg'))
  );
});

self.addEventListener('activate', event => {
  // delete any caches that aren't in expectedCaches
  // which will get rid of static-v1
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('V2 now ready to handle fetches!');
    })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // serve the horse SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  if (url.origin == location.origin && url.pathname == '/dog.svg') {
    event.respondWith(caches.match('/horse.svg'));
  }
});
</code></pre>
<p data-md-type="paragraph">注: 馬についてはっきりした意見はありません。</p>
<p data-md-type="paragraph"><a href="https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html" data-md-type="link">前述のデモを参照してください</a>{:
.external}。
まだ猫の画像が表示されるはずです。その理由を次に説明します。</p>
<h3 data-md-type="header" data-md-header-level="3">インストール</h3>
<p data-md-type="paragraph">キャッシュ名を <code data-md-type="codespan">static-v1</code> から <code data-md-type="codespan">static-v2</code> に変更したことに注意してください。つまり、古い Service Worker でまだ使用されている現行のキャッシュ内のものを上書きせずに、新しいキャッシュをセットアップできます。</p>
<p data-md-type="paragraph">このパターンでは、バージョン固有のキャッシュが作成されます。これは、ネイティブ アプリがその実行可能ファイルにバンドルするアセットに似ています。
<code data-md-type="codespan">avatars</code> などのバージョン固有でないキャッシュを使用することもできます。</p>
<h3 data-md-type="header" data-md-header-level="3">待機</h3>
<p data-md-type="paragraph">インストールに成功すると、アップデートされた Service Worker は、既存の Service Worker がクライアントを制御しなくなるまでアクティベートを遅らせます。
この状態は「待機中」と呼ばれ、これにより、ブラウザでは同時に 1 つのバージョンの Service Worker のみが実行されます。</p>
<p data-md-type="paragraph"><a href="https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html" data-md-type="link">アップデートされたデモ</a>{:
.external}を実行した場合、V2 Worker がまだアクティベートされていないため、まだ猫の画像が表示されるはずです。DevTools の [Application] タブで、新しい Service Worker が待機中であることを確認できます。</p>
<div data-md-type="block_html">
<figure>
  <img src="images/waiting.png" class="browser-screenshot" alt="新しい Service Worker が待機中であることを示す DevTools">
</figure>
</div>
<p data-md-type="paragraph">デモで 1 つのタブのみを開いている場合でも、ページを更新しただけでは新しいバージョンに引き継がれません。
これは、ブラウザ ナビゲーションの動作によるものです。ナビゲートすると、現在のページはレスポンス ヘッダーを受信するまで消えません。さらに、レスポンスに <code data-md-type="codespan">Content-Disposition</code> ヘッダーが含まれている場合、現在のページは消えないことがあります。このような重複があると、現行の Service Worker は、更新中は常にクライアントを制御していることになります。</p>
<p data-md-type="paragraph">アップデートを取得するには、現行の Service Worker を使用しているすべてのタブを閉じるか、それらのタブから移動します。
次に、<a href="https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html" data-md-type="link">再びデモに移動</a>{:
.external}すると、馬が表示されるはずです。</p>
<p data-md-type="paragraph">このパターンは、Chrome のアップデート方法に似ています。Chrome のアップデートはバックグラウンドでダウンロードされますが、Chrome が再起動するまで適用されません。
とりあえずは、引き続き混乱なしに現行バージョンを使用できます。
これは開発中は問題となりますが、DevTools にはこれを簡単にする方法があります。これについては<a href="#devtools" data-md-type="link">後で</a>説明します。</p>
<h3 data-md-type="header" data-md-header-level="3">アクティベート</h3>
<p data-md-type="paragraph">アクティベートにより、古い Service Worker はなくなり、新しい Service Worker でクライアントを制御できるようになります。
これは、データベースの移行やキャッシュの消去など、古い Worker の使用中に実行できなかったことを実行するのに最適な時間です。</p>
<p data-md-type="paragraph">前述のデモでは、必要なキャッシュのリストを保持し、<code data-md-type="codespan">activate</code> イベントで他のキャッシュを消去して、古い <code data-md-type="codespan">static-v1</code> キャッシュを削除しています。</p>
<p data-md-type="paragraph">Warning: 前のバージョンからアップデートしていない場合があります。その場合は、Service Worker の古いバージョンが多数存在する可能性があります。</p>
<p data-md-type="paragraph">Promise を <code data-md-type="codespan">event.waitUntil()</code> に渡すと、Promise が解決されるまで機能イベント（<code data-md-type="codespan">fetch</code>、<code data-md-type="codespan">push</code>、<code data-md-type="codespan">sync</code> など）がバッファされます。
そのため、<code data-md-type="codespan">fetch</code> イベントが発生すると、アクティベーションは完了します。</p>
<p data-md-type="paragraph">Warning: Cache Storage API は、（localStorage や IndexedDB のように）「オリジン ストレージ」です。同じオリジンで多くのサイト（<code data-md-type="codespan">yourname.github.io/myapp</code> など）を実行する場合は、他のサイトのキャッシュを削除しないように注意してください。これを回避するには、<code data-md-type="codespan">myapp-static-v1</code> のようにキャッシュ名に現在のサイトに固有の接頭辞を付け、<code data-md-type="codespan">myapp-</code> で始まらないキャッシュには触れないようにします。</p>
<h3 data-md-type="header" data-md-header-level="3">待機段階のスキップ</h3>
<p data-md-type="paragraph">待機段階とは、一度に 1 つのバージョンのサイトのみを実行していることを意味しますが、その機能が不要になった場合には、<code data-md-type="codespan">self.skipWaiting()</code> を呼び出して新しい Service Worker をすぐにアクティベートできます。</p>
<p data-md-type="paragraph">これにより、Service Worker は現在アクティブな Worker を追い出し、待機段階に入るとすぐに（または、既に待機段階に入っている場合は即座に）自身をアクティベートします。Worker はインストールをスキップせず、待機するだけです。</p>
<p data-md-type="paragraph">待機中または待機前は、<code data-md-type="codespan">skipWaiting()</code> をいつ呼び出しても実際には問題にはなりません。
通常は <code data-md-type="codespan">install</code> イベントで呼び出します。</p>
<pre data-md-type="block_code" data-md-language=""><code>self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    // caching etc
  );
});
</code></pre>
<p data-md-type="paragraph">ただし、Service Worker への <code data-md-type="codespan">postMessage()</code> の結果として呼び出すことが必要になる場合があります。
ユーザー インタラクションの後で <code data-md-type="codespan">skipWaiting()</code> が必要になります。</p>
<p data-md-type="paragraph"><a href="https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v3.html" data-md-type="link"><code data-md-type="codespan">skipWaiting()</code> を使用するデモをご覧ください</a>{:
.external}。
移動しなくても牛の画像が表示されるはずです。<code data-md-type="codespan">clients.claim()</code> と同様にレースであるため、ページが画像を読み込もうとする前に新しい Service Woker がフェッチ、インストール、アクティベートを行うと、牛のみが表示されます。</p>
<p data-md-type="paragraph">Warning: <code data-md-type="codespan">skipWaiting()</code> は、古いバージョンで読み込まれたページを新しい Service Worker で制御することを意味します。つまり、ページのフェッチの一部は古い Service Worker で処理され、その後のフェッチは新しい Service Worker で処理されます。これで問題になる可能性がある場合は、<code data-md-type="codespan">skipWaiting()</code> を使用しないでください。</p>
<h3 data-md-type="header" data-md-header-level="3">手動アップデート</h3>
<p data-md-type="paragraph">前述したとおり、ブラウザはナビゲーションや機能イベントの後、自動的にアップデートを確認しますが、手動でトリガーすることもできます。</p>
<pre data-md-type="block_code" data-md-language=""><code>navigator.serviceWorker.register('/sw.js').then(reg => {
  // sometime later…
  reg.update();
});
</code></pre>
<p data-md-type="paragraph">ユーザーがサイトを再読み込みすることなく長時間使用できるようにするには、<code data-md-type="codespan">update()</code> を定期的に呼び出す必要があります（1 時間ごとなど）。</p>
<h3 data-md-type="header" data-md-header-level="3">Service Worker スクリプトの URL の変更の回避</h3>
<p data-md-type="paragraph"><a href="https://jakearchibald.com/2016/caching-best-practices/" data-md-type="link">キャッシュのベスト プラクティスに関する私の投稿</a>{: .external}をご覧になったことがある場合は、Service Worker の各バージョンに一意の URL を指定することを検討するかもしれません。**その必要はありません。</p>
<p data-md-type="paragraph">次のような問題が発生する可能性があるからです。</p>
<ol data-md-type="list" data-md-list-type="ordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="ordered">
<code data-md-type="codespan">index.html</code> は <code data-md-type="codespan">sw-v1.js</code> を Service Worker として登録します。</li>
<li data-md-type="list_item" data-md-list-type="ordered">
<code data-md-type="codespan">sw-v1.js</code> は、オフライン ファーストで動作するように <code data-md-type="codespan">index.html</code> をキャッシュし、表示します。</li>
<li data-md-type="list_item" data-md-list-type="ordered">
<code data-md-type="codespan">index.html</code> をアップデートすると、新しい <code data-md-type="codespan">sw-v2.js</code> が登録されます。</li>
</ol>
<p data-md-type="paragraph">このようにすると、ユーザーは <code data-md-type="codespan">sw-v2.js</code> を取得しません。<code data-md-type="codespan">sw-v1.js</code> はキャッシュから古いバージョンの <code data-md-type="codespan">index.html</code> を表示するからです。
Service Worker をアップデートするために、Service Worker をアップデートすることが必要になるという状況になってしまいました。これはいけません。</p>
<p data-md-type="paragraph">ただし、<a href="https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html" data-md-type="link">上記のデモ</a>{:
.external}では、Service Worker の URL を変更しています。
デモ目的で、バージョンを切り替えることができるようにしています。
本番環境でこのようにすることはありません。</p>
<h2 data-md-type="header" data-md-header-level="2">開発の簡素化{: #devtools}</h2>
<p data-md-type="paragraph">Service Worker のライフサイクルは、ユーザーを考慮して構築されていますが、開発時は少し問題があります。
幸いなことに、この問題に役立つツールがあります。</p>
<h3 data-md-type="header" data-md-header-level="3">再読み込み時のアップデート</h3>
<p data-md-type="paragraph">これは私のお気に入りです。</p>
<div data-md-type="block_html">
<figure>
  <img src="images/update-on-reload.png" class="browser-screenshot" alt="DevTools の [Update on reload]">
</figure>
</div>
<p data-md-type="paragraph">これにより、ライフサイクルはデベロッパーにとって使いやすくなります。各ナビゲーションにより次が行われます。</p>
<ol data-md-type="list" data-md-list-type="ordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="ordered">Service Worker を再取得します。</li>
<li data-md-type="list_item" data-md-list-type="ordered">バイト数が同じでもそれを新しいバージョンとしてインストールします。つまり、<code data-md-type="codespan">install</code> イベントが実行され、キャッシュがアップデートされます。</li>
<li data-md-type="list_item" data-md-list-type="ordered">新しい Service Worker がアクティベートされるように、待機段階をスキップします。</li>
<li data-md-type="list_item" data-md-list-type="ordered">ページをナビゲートします。</li>
</ol>
<p data-md-type="paragraph">つまり、2 回再読み込みしたりタブを閉じたりすることなく、ナビゲーション（更新など）ごとにアップデートを取得します。</p>
<h3 data-md-type="header" data-md-header-level="3">待機のスキップ</h3>
<div data-md-type="block_html">
<figure>
  <img src="images/skip-waiting.png" class="browser-screenshot" alt="DevTools の [skipWaiting]">
</figure>
</div>
<p data-md-type="paragraph">待機中の Worker がある場合は、DevTools で [skipWaiting] を選択すると、すぐに「アクティブ」になります。</p>
<h3 data-md-type="header" data-md-header-level="3">シフト再読み込み</h3>
<p data-md-type="paragraph">ページを強制的に再読み込み（シフト再読み込み）すると、Service Worker 全体がスキップされます。
これは制御されません。この機能は仕様どおりであり、他の Service Worker 対応ブラウザで動作します。</p>
<h2 data-md-type="header" data-md-header-level="2">アップデートの処理</h2>
<p data-md-type="paragraph">Service Worker は、<a href="https://extensiblewebmanifesto.org/" data-md-type="link">拡張可能ウェブ</a>{: .external }の一部としてデザインされました。我々ブラウザ デベロッパーは、ウェブ デベロッパーよりもウェブ開発が得意ではないと認識しています。したがって、ブラウザ デベロッパーの好きなパターンを使用して特定の問題を解決する、限られた高レベルの API を提供すべきではありません。代わりに、ブラウザの中心部へのアクセス権を付与し、ユーザーに最適な方法で好きなように実行してもらいます。</p>
<p data-md-type="paragraph">できるだけ多くのパターンを有効にするために、アップデート サイクル全体は監視可能になっています。</p>
<pre data-md-type="block_code" data-md-language=""><code>navigator.serviceWorker.register('/sw.js').then(reg => {
  reg.installing; // the installing worker, or undefined
  reg.waiting; // the waiting worker, or undefined
  reg.active; // the active worker, or undefined

  reg.addEventListener('updatefound', () => {
    // A wild service worker has appeared in reg.installing!
    const newWorker = reg.installing;

    newWorker.state;
    // "installing" - the install event has fired, but not yet complete
    // "installed"  - install complete
    // "activating" - the activate event has fired, but not yet complete
    // "activated"  - fully active
    // "redundant"  - discarded. Either failed install, or it's been
    //                replaced by a newer version

    newWorker.addEventListener('statechange', () => {
      // newWorker.state has changed
    });
  });
});

navigator.serviceWorker.addEventListener('controllerchange', () => {
  // This fires when the service worker controlling this page
  // changes, eg a new worker has as skipped waiting and become
  // the new active worker. 
});
</code></pre>
<h2 data-md-type="header" data-md-header-level="2">乗り切りました！</h2>
<p data-md-type="paragraph">すばらしいですね！技術的な理論をたくさん説明しました。今後の数週間で上記の実用的なアプリケーションのいくつかに踏み込みますのでご期待ください。</p>
</div>
