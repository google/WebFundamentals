project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Service Worker のライフサイクルの詳細

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-09-29 #}

# Service Worker のライフサイクル {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Service Worker のライフサイクルは、最も複雑な部分です。その目的やメリットがわからない場合は、戦いを挑まれているかのようでしょう。しかしいったんその仕組みがわかれば、ウェブとネイティブ パターンのよいところを組み合わせて、ユーザーにシームレスかつ目立たないようにアップデートを提供できます。


ここでは詳細を説明しますが、各セクションの先頭に必要な知識を箇条書きで示します。


##  目的

ライフサイクルの目的は次のとおりです。

* オフライン ファーストを可能にする。
* 現行の Service Worker を妨げることなく新しい Service Worker を使用可能にする。
* スコープ内のページが同じ Service Worker で制御されるようにする（または Service Worker なし）。
* 一度に 1 つのバージョンのサイトのみが実行されるようにする。

最後の 1 つは非常に重要です。Service Worker がない場合、ユーザーは 1 つのタブをサイトに読み込み、後で別のタブを開くことができます。これにより、同時に 2 つのバージョンのサイトが動作することになります。これでも正常に動作することがありますが、ストレージを処理する場合は、最終的に共有ストレージの管理方法が大きく異なる 2 つのタブが存在することになります。これにより、エラーが発生するか、もっと悪い場合はデータが失われる可能性があります。


Warning: ユーザーはデータが失われるのを非常に嫌います。悲痛な気持ちになります。

##  最初の Service Worker

概要:

* Service Worker が最初に取得するのは `install` イベントであり、これは一度だけ発生します。
* `installEvent.waitUntil()` に渡された Promise によって、インストールの時間と成功または失敗が通知されます。
* Service Worker は、インストールが正常に終了して「アクティブ」になるまで `fetch` や `push` などのイベントを受信しません。
* デフォルトでは、ページ リクエスト自体が Service Worker を通過した場合を除き、ページの fetch は Service Worker を通過することはありません。
そのため、Service Worker の効果を確認するには、ページを更新する必要があります。
* `clients.claim()` はこのデフォルトをオーバーライドし、制御対象外のページを制御下に置くことができます。


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
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js" defer></script>
<style>
.lifecycle-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.lifecycle-diagram .label {
  font-size: 9.46829414px;
  font-family: 'Just Another Hand';
  text-align: center;
  text-anchor: middle;
}

.lifecycle-diagram .state-placeholder {
  fill: none;
  stroke-opacity: 0.28;
  stroke-width: 1px;
  stroke: #000;
  stroke-dasharray: 1;
}
.lifecycle-diagram .fetch {
  fill: none;
  stroke: #000;
  stroke-width: 1px;
}
.lifecycle-diagram .controlled {
  fill: #d1eaff;
}

.lifecycle-diagram .fetch {
  stroke-dasharray: 7 30;
  stroke-dashoffset: 8;
}

.lifecycle-diagram.register,
.lifecycle-diagram .diagram-refresh,
.lifecycle-diagram .diagram-close,
.lifecycle-diagram.register .controlled,
.lifecycle-diagram .cog-new {
  opacity: 0;
}
</style>
<svg class="lifecycle-diagram" style="display:none">
  <defs>
    <g id="diagram-static">
      <text y="6.7" x="14.5" class="label">インストール</text><text y="6.7" x="81.1" class="label">アクティブ</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder"/><circle r="14" cy="25.8" cx="47.8" class="state-placeholder"/><circle r="14" cy="25.8" cx="81.2" class="state-placeholder"/>
    </g>
    <g id="diagram-page">
      <path d="M 191.3,0 12.8,0 C 5.8,0 0,5.7 0,12.8 L 0,167 c 0,7.2 5.7,13 12.8,13 l 178.5,0 c 7,0 12.8,-5.8 12.8,-13 l 0,-154 C 204,6 198.7,0.2 191.6,0.2 Z M 11,11 c 0.5,-0.5 1,-0.7 1.8,-0.8 l 178.5,0 c 0.7,0 1.3,0.3 1.8,0.8 0.8,0.5 1,1 1,1.8 l 0,13.5 -184.1,0 0,-13.5 c 0,-0.7 0.3,-1.3 0.8,-1.8 z m 182,158 c -0.4,0.4 -1,0.7 -1.7,0.7 l -178.5,0 c -0.7,0 -1.3,-0.3 -1.8,-0.8 -0.5,-0.8 -0.8,-1.4 -0.8,-2 l 0,-130.4 183.6,0 0,130.5 c 0,0.8 -0.2,1.4 -0.7,2 z" />
      <path d="m 26.5,18.6 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.2,0 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.3,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.3,0 c 0,2.8 -2.3,5 -5.2,5 -2.8,0 -5,-2.2 -5,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m -5.2,111 102.7,0 0,10.4 -102.7,0 0,-10.3 z m 0,-16.8 102.7,0 0,10.2 -102.7,0 0,-10 z M 52,96 l 45.4,0 0,10.2 -45.4,0 0,-10.2 z m 0,-17 45.4,0 0,10.3 -45.4,0 0,-10.3 z m 0,-16.8 45.6,0 0,10.3 -45.6,0 0,-10.3 z m 100.2,1.3 -45.4,0 0,42 45.4,0 0,-42 z m -10.2,31.8 -25,0 0,-21.5 25,0 0,21.5 z" />
    </g>
    <path id="diagram-sw" d="m 19.43,12.98 c 0.04,-0.32 0.07,-0.64 0.07,-0.98 0,-0.34 -0.03,-0.66 -0.07,-0.98 l 2.11,-1.65 c 0.19,-0.15 0.24,-0.42 0.12,-0.64 l -2,-3.46 C 19.54,5.05 19.27,4.97 19.05,5.05 l -2.49,1 C 16.04,5.65 15.48,5.32 14.87,5.07 L 14.49,2.42 C 14.46,2.18 14.25,2 14,2 L 10,2 C 9.75,2 9.54,2.18 9.51,2.42 L 9.13,5.07 C 8.52,5.32 7.96,5.66 7.44,6.05 l -2.49,-1 C 4.72,4.96 4.46,5.05 4.34,5.27 l -2,3.46 C 2.21,8.95 2.27,9.22 2.46,9.37 l 2.11,1.65 C 4.53,11.34 4.5,11.67 4.5,12 c 0,0.33 0.03,0.66 0.07,0.98 l -2.11,1.65 c -0.19,0.15 -0.24,0.42 -0.12,0.64 l 2,3.46 c 0.12,0.22 0.39,0.3 0.61,0.22 l 2.49,-1 c 0.52,0.4 1.08,0.73 1.69,0.98 l 0.38,2.65 C 9.54,21.82 9.75,22 10,22 l 4,0 c 0.25,0 0.46,-0.18 0.49,-0.42 l 0.38,-2.65 c 0.61,-0.25 1.17,-0.59 1.69,-0.98 l 2.49,1 c 0.23,0.09 0.49,0 0.61,-0.22 l 2,-3.46 c 0.12,-0.22 0.07,-0.49 -0.12,-0.64 L 19.43,12.98 Z M 12,15.5 c -1.93,0 -3.5,-1.57 -3.5,-3.5 0,-1.93 1.57,-3.5 3.5,-3.5 1.93,0 3.5,1.57 3.5,3.5 0,1.93 -1.57,3.5 -3.5,3.5 z"/>
    <g id="diagram-refresh"><circle id="page-action-circle" cx="81.2" cy="58.1" r="3.5" fill="#fff" stroke="#000" stroke-width=".5"/><path d="M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z"/></g>
    <g id="diagram-close"><use xlink:href="#page-action-circle"/><path id="path5062" d="M83 56.58l-.37-.37-1.46 1.47-1.45-1.46-.37.38 1.46 1.46-1.45 1.46.37.36 1.45-1.45 1.46 1.46.37-.36-1.46-1.46z"/></g>
  </defs>
</svg>
<svg class="lifecycle-diagram register" viewBox="0 0 96.9 73"><rect ry="15.8" y="10" x="65.4" height="63" width="31.6" class="controlled"/><use xlink:href="#diagram-static"/><g transform="matrix(1.1187 0 0 1.1187 1.078 12.408)" class="cog cog-new"><use height="10" width="10" xlink:href="#diagram-sw"/></g><use transform="matrix(.09532 0 0 .09532 71.44 48.39)" xlink:href="#diagram-page" width="10" height="10" class="diagram-page"/><path d="M78.6 47.7c-1-6-2-11.6-1.6-17" class="fetch"/><path d="M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2" class="fetch"/><path d="M75.7 47c-2.3-6.3-3.2-12.5-2-18.2" class="fetch"/><path d="M89.5 29.5c.3 6-.4 12-4 18" class="fetch"/><path d="M75.4 30.3c0 4-1 6 2 17.2" class="fetch"/><path d="M86.6 31C88 37 86 42 84 47.4" class="fetch"/><g class="refresh-rotator"><use xlink:href="#diagram-refresh" class="diagram-refresh"/></g></svg>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var el = document.querySelector('.lifecycle-diagram.register');
    var timeline = new TimelineLite({paused: true, onComplete: function() {
      timeline.play(0);
    }});

    var cogRotate = TweenLite.fromTo(el.querySelector('.cog-new use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      cogRotate.play(0);
    }});

    timeline.to(el, 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,67.745203,12.407711)', ease: Quint.easeInOut});
    timeline.addLabel('cog-active');

    var subTimeline = new TimelineLite();
    subTimeline.set({}, {}, "+=0.7");
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut});
    subTimeline.set({}, {}, "+=0.5");
    subTimeline.addLabel('page-load')
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    subTimeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut, delay: 0.25}, 'page-load');

    var refresh = new TimelineLite();
    refresh.set({}, {}, "+=0.5");
    refresh.addLabel('refresh-appearing');
    refresh.fromTo(el.querySelector('.diagram-refresh'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    refresh.set({}, {}, "+=1.3");
    refresh.to(el.querySelector('.diagram-refresh'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut});
    refresh.to(el.querySelector('.refresh-rotator'), 2, {rotation: 360, ease: Linear.easeNone}, 'refresh-appearing');

    timeline.add(subTimeline, 'cog-active');
    timeline.add(refresh, 'cog-active');

    var fetching = new TimelineLite();
    Array.prototype.slice.call(el.querySelectorAll('.fetch')).forEach(function(el, i) {
      fetching.to(el, 0.5, {strokeDashoffset: '-19px', ease: Linear.easeNone}, i * 0.15);
    });

    timeline.add(fetching);
    timeline.set({}, {}, "+=3");
    timeline.to(el, 0.5, {opacity: 0, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");

    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function(changes) {
        changes.forEach(function(change) {
          if (change.intersectionRatio) {
            timeline.play(0);
            cogRotate.play(0);
            return;
          }
          timeline.pause();
          cogRotate.pause();
        });
      }, {});

      observer.observe(document.documentElement);
    }
    else {
      timeline.play(0);
      cogRotate.play(0);
    }
  });
</script>
{% endframebox %}
</div>
</div>

次の HTML をご覧ください。

    <!DOCTYPE html>
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

これは Service Worker を登録し、3 秒後に犬の画像を追加します。

その Service Worker `sw.js` は次のとおりです。

    self.addEventListener('install', event => {
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

猫の画像をキャッシュし、`/dog.svg` のリクエストがあるたびに表示します。
ただし、[上記の例を実行](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}した場合、ページを最初に読み込んだときは犬が表示されます。
更新を押すと、猫が表示されます。


注: 猫の方が犬よりよいです。猫の方がよいと言ったらよいのです。

###  スコープと制御

Service Worker 登録のデフォルトのスコープは、スクリプト URL に対して相対的な `./` です。
つまり、`//example.com/foo/bar.js` に Service Worker を登録すると、デフォルトのスコープは `//example.com/foo/` になります。


ページ、ワーカー、共有ワーカーは、`clients` と呼ばれます。Service Worker で制御できるのは、スコープ内のクライアントのみです。
クライアントが制御されるようになると、その fetch はスコープ内の Service Worker を通過するようになります。
クライアントを制御している `navigator.serviceWorker.controller` が null と Service Worker インスタンスのどちらであるかを判別できます。



###  ダウンロード、解析、実行

最初の Service Worker は、`.register()` を呼び出すとダウンロードされます。スクリプトがダウンロードや解析に失敗したか、初期実行時にエラーをスローした場合、登録 Promise は棄却され、Service Worker は破棄されます。



Chrome の DevTools によって、エラーがコンソールと [Application] タブの Service Worker セクションに表示されます。


<figure>
  <img src="images/register-fail.png" class="browser-screenshot" alt="Service Worker の DevTools タブに表示されたエラー">
</figure>

###  インストール

Service Worker が最初に取得するイベントは `install` です。Service Worker が実行されるとすぐにトリガーされ、Service Worker ごとに一度だけ呼び出されます。Service Worker スクリプトを変更すると、ブラウザでは別の Service Worker と見なされ、その `install` イベントが取得されます。[アップデートの詳細については、後述します](#updates)。


`install` イベントが発生すると、クライアントを制御する前に必要なものをすべてキャッシュできます。
`event.waitUntil()` に Promise が渡されると、ブラウザはインストールの完了のタイミングと成功したかどうかを把握できます。


Promise が棄却されると、インストールは失敗したことになり、ブラウザは Service Worker を破棄します。
クライアントは制御されません。つまり、`fetch` イベントではキャッシュに存在する「cat.svg」にのみ依存することになります。
これは依存関係です。

###  アクティベート

Service Worker がクライアントを制御したり、`push` や `sync` などの機能イベントを処理したりできるようになると、`activate` イベントを取得します。
ただし、`.register()` を呼び出したページが制御されるという意味ではありません。


[デモ](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}を最初に読み込んだ場合、Service Worker のアクティベート後しばらくしてから `dog.svg` をリクエストしても、リクエストは処理されず、犬の画像が表示されます。Service Worker なしでページが読み込まれ、サブリソースも読み込まれない場合、デフォルトは「一貫性」です。
[デモ](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}を 2 回目に読み込んだ場合（つまり、ページを更新した場合）は制御されます。ページも画像も `fetch` イベントを通過し、猫が表示されます。




###  clients.claim

アクティベート後に Service Worker 内で `clients.claim()` を呼び出すことによって、制御されていないクライアントを制御できます。


[前述のデモのバリエーション](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/df4cae41fa658c4ec1fa7b0d2de05f8ba6d43c94/){:
.external}（`activate` イベントで `clients.claim()` を呼び出す）を次に示します。
最初に猫が表示されるはずです。
「はずです」というのは、タイミングによって異なるからです。猫が表示されるのは、画像が読み込まれる前に Service Worker がアクティベートされ、`clients.claim()` が有効になった場合のみです。



Service Worker を使用して、ページをネットワーク経由で読み込む場合とは異なる方法で読み込んだ場合、`clients.claim()` は問題になることがあります。それは、Service Worker は最終的にはそれがない状態で読み込まれた一部のクライアントを制御するためです。



注: 多くのユーザーはボイラプレートとして `clients.claim()` を使用しているようですが、私自身はめったに使用しません。
本当に重要になるのは最初の読み込み時のみであり、段階的な機能拡張により、ページは通常は Service Worker がなくても問題なく動作します。



##  Service Worker のアップデート{: #updates}

概要:

* アップデートは、次の場合にトリガーされます。
    * スコープ内ページへのナビゲーション時
    * `push` や `sync` などの機能イベントの発生時（24 時間以内にアップデート チェックが実行された場合を除く）
    * `.register()` の呼び出し時（Service Worker URL が変更された場合のみ）
* アップデートの取得時、Service Worker スクリプトのキャッシュ ヘッダーが（最大 24 時間）優先されます。
このオプトイン動作を行うのは、ユーザーを逃がさないためです。
Service Worker スクリプトでは、`max-age` は 0 になります。
* Service Worker がアップデート済みと見なされるのは、そのバイト数がブラウザに既にあるものと異なる場合です
（これは、インポートされたスクリプトやモジュールも含むように拡張されています）。
* アップデートされた Service Worker は、既存のものとともに起動され、`install` イベントを取得します。
* 新しい Worker は、ステータス コードが正常でないか（たとえば 404）、解析に失敗するか、実行中にエラーをスローするか、インストール時に棄却される場合は破棄されますが、現行の Worker はアクティブなままです。
* インストールに成功すると、アップデートされた Worker は、既存の Worker の制御しているクライアントがゼロになるまで `wait` 状態になります
（クライアントは、更新中は重複します）。
* `self.skipWaiting()` は待機を回避します。つまり、Service Worker は、インストールが完了するとすぐにアクティベートされます。


<div class="framebox-container-container">
<div class="framebox-container">
{% framebox height="100%" %}
<link href="https://fonts.googleapis.com/css?family=Just+Another+Hand" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js" defer></script>
<style>
.lifecycle-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.lifecycle-diagram .label {
  font-size: 9.46829414px;
  font-family: 'Just Another Hand';
  text-align: center;
  text-anchor: middle;
}

.lifecycle-diagram .state-placeholder {
  fill: none;
  stroke-opacity: 0.28;
  stroke-width: 1px;
  stroke: #000;
  stroke-dasharray: 1;
}
.lifecycle-diagram .fetch {
  fill: none;
  stroke: #000;
  stroke-width: 1px;
}
.lifecycle-diagram .controlled {
  fill: #d1eaff;
}

.lifecycle-diagram .fetch {
  stroke-dasharray: 7 30;
  stroke-dashoffset: 8;
}

.lifecycle-diagram.register,
.lifecycle-diagram .diagram-refresh,
.lifecycle-diagram .diagram-close,
.lifecycle-diagram.register .controlled,
.lifecycle-diagram .cog-new {
  opacity: 0;
}
</style>
<svg class="lifecycle-diagram" style="display:none">
  <defs>
    <g id="diagram-static">
      <text y="6.7" x="14.5" class="label">インストール</text><text y="6.7" x="81.1" class="label">アクティブ</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder"/><circle r="14" cy="25.8" cx="47.8" class="state-placeholder"/><circle r="14" cy="25.8" cx="81.2" class="state-placeholder"/>
    </g>
    <g id="diagram-page">
      <path d="M 191.3,0 12.8,0 C 5.8,0 0,5.7 0,12.8 L 0,167 c 0,7.2 5.7,13 12.8,13 l 178.5,0 c 7,0 12.8,-5.8 12.8,-13 l 0,-154 C 204,6 198.7,0.2 191.6,0.2 Z M 11,11 c 0.5,-0.5 1,-0.7 1.8,-0.8 l 178.5,0 c 0.7,0 1.3,0.3 1.8,0.8 0.8,0.5 1,1 1,1.8 l 0,13.5 -184.1,0 0,-13.5 c 0,-0.7 0.3,-1.3 0.8,-1.8 z m 182,158 c -0.4,0.4 -1,0.7 -1.7,0.7 l -178.5,0 c -0.7,0 -1.3,-0.3 -1.8,-0.8 -0.5,-0.8 -0.8,-1.4 -0.8,-2 l 0,-130.4 183.6,0 0,130.5 c 0,0.8 -0.2,1.4 -0.7,2 z" />
      <path d="m 26.5,18.6 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.2,0 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.3,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.3,0 c 0,2.8 -2.3,5 -5.2,5 -2.8,0 -5,-2.2 -5,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m -5.2,111 102.7,0 0,10.4 -102.7,0 0,-10.3 z m 0,-16.8 102.7,0 0,10.2 -102.7,0 0,-10 z M 52,96 l 45.4,0 0,10.2 -45.4,0 0,-10.2 z m 0,-17 45.4,0 0,10.3 -45.4,0 0,-10.3 z m 0,-16.8 45.6,0 0,10.3 -45.6,0 0,-10.3 z m 100.2,1.3 -45.4,0 0,42 45.4,0 0,-42 z m -10.2,31.8 -25,0 0,-21.5 25,0 0,21.5 z" />
    </g>
    <path id="diagram-sw" d="m 19.43,12.98 c 0.04,-0.32 0.07,-0.64 0.07,-0.98 0,-0.34 -0.03,-0.66 -0.07,-0.98 l 2.11,-1.65 c 0.19,-0.15 0.24,-0.42 0.12,-0.64 l -2,-3.46 C 19.54,5.05 19.27,4.97 19.05,5.05 l -2.49,1 C 16.04,5.65 15.48,5.32 14.87,5.07 L 14.49,2.42 C 14.46,2.18 14.25,2 14,2 L 10,2 C 9.75,2 9.54,2.18 9.51,2.42 L 9.13,5.07 C 8.52,5.32 7.96,5.66 7.44,6.05 l -2.49,-1 C 4.72,4.96 4.46,5.05 4.34,5.27 l -2,3.46 C 2.21,8.95 2.27,9.22 2.46,9.37 l 2.11,1.65 C 4.53,11.34 4.5,11.67 4.5,12 c 0,0.33 0.03,0.66 0.07,0.98 l -2.11,1.65 c -0.19,0.15 -0.24,0.42 -0.12,0.64 l 2,3.46 c 0.12,0.22 0.39,0.3 0.61,0.22 l 2.49,-1 c 0.52,0.4 1.08,0.73 1.69,0.98 l 0.38,2.65 C 9.54,21.82 9.75,22 10,22 l 4,0 c 0.25,0 0.46,-0.18 0.49,-0.42 l 0.38,-2.65 c 0.61,-0.25 1.17,-0.59 1.69,-0.98 l 2.49,1 c 0.23,0.09 0.49,0 0.61,-0.22 l 2,-3.46 c 0.12,-0.22 0.07,-0.49 -0.12,-0.64 L 19.43,12.98 Z M 12,15.5 c -1.93,0 -3.5,-1.57 -3.5,-3.5 0,-1.93 1.57,-3.5 3.5,-3.5 1.93,0 3.5,1.57 3.5,3.5 0,1.93 -1.57,3.5 -3.5,3.5 z"/>
    <g id="diagram-refresh"><circle id="page-action-circle" cx="81.2" cy="58.1" r="3.5" fill="#fff" stroke="#000" stroke-width=".5"/><path d="M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z"/></g>
    <g id="diagram-close"><use xlink:href="#page-action-circle"/><path id="path5062" d="M83 56.58l-.37-.37-1.46 1.47-1.45-1.46-.37.38 1.46 1.46-1.45 1.46.37.36 1.45-1.45 1.46 1.46.37-.36-1.46-1.46z"/></g>
  </defs>
</svg>
<svg class="lifecycle-diagram update" viewBox="0 0 96.9 73"><rect ry="15.8" y="10" x="65.4" height="63" width="31.6" class="controlled"/><use xlink:href="#diagram-static"/><text x="47.7" y="6.7" class="label">待機</text><g transform="matrix(1.1187 0 0 1.1187 1.078 12.408)" class="cog cog-new"><use height="10" width="10" xlink:href="#diagram-sw"/></g><g transform="matrix(1.1187 0 0 1.1187 67.745 12.408)" class="cog cog-old"><use xlink:href="#diagram-sw" width="10" height="10"/></g><use transform="matrix(.09532 0 0 .09532 71.44 48.39)" xlink:href="#diagram-page" width="10" height="10" class="diagram-page"/><path d="M78.6 47.7c-1-6-2-11.6-1.6-17" class="fetch"/><path d="M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2" class="fetch"/><path d="M75.7 47c-2.3-6.3-3.2-12.5-2-18.2" class="fetch"/><path d="M89.5 29.5c.3 6-.4 12-4 18" class="fetch"/><path d="M75.4 30.3c0 4-1 6 2 17.2" class="fetch"/><path d="M86.6 31C88 37 86 42 84 47.4" class="fetch"/><g class="refresh-rotator"><use xlink:href="#diagram-refresh" class="diagram-refresh"/></g><use xlink:href="#diagram-close" class="diagram-close"/></svg>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var el = document.querySelector('.lifecycle-diagram.update');
    var timeline = new TimelineLite({paused: true, onComplete: function() {
      timeline.play(0);
    }});

    var cogRotate = TweenLite.fromTo(el.querySelector('.cog-new use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      cogRotate.play(0);
    }});

    var oldCogRotate = TweenLite.fromTo(el.querySelector('.cog-old use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      oldCogRotate.play(0);
    }});

    function createFetchingAnim() {
      var fetching = new TimelineLite();
      Array.prototype.slice.call(el.querySelectorAll('.fetch')).forEach(function(el, i) {
        fetching.fromTo(el, 0.5,
          {strokeDashoffset: 8},
          {strokeDashoffset: -19, ease: Linear.easeNone},
          i * 0.15
        );
      });
      return fetching;
    }

    timeline.add(createFetchingAnim());
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,34.411905,12.407711)', ease: Quint.easeInOut});
    timeline.addLabel('cog-waiting');

    var subTimeline = new TimelineLite();
    subTimeline.set({}, {}, "+=0.7");
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut});
    subTimeline.set({}, {}, "+=0.5");
    subTimeline.addLabel('page-load')
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    subTimeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut, delay: 0.25}, 'page-load');

    var refresh = new TimelineLite();
    refresh.set({}, {}, "+=0.5");
    refresh.addLabel('refresh-appearing');
    refresh.fromTo(el.querySelector('.diagram-refresh'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    refresh.set({}, {}, "+=1.3");
    refresh.to(el.querySelector('.diagram-refresh'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut});
    refresh.to(el.querySelector('.refresh-rotator'), 2, {rotation: 360, ease: Linear.easeNone}, 'refresh-appearing');

    timeline.add(subTimeline, 'cog-waiting');
    timeline.add(refresh, 'cog-waiting');
    timeline.add(createFetchingAnim());
    timeline.set({}, {}, "+=1");
    timeline.fromTo(el.querySelector('.diagram-close'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('page-close');
    timeline.to(el.querySelector('.controlled'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.to(el.querySelector('.diagram-close'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('takeover');
    timeline.to(el.querySelector('.cog-old'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'takeover');
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,67.745203,12.407711)', ease: Quint.easeInOut}, 'takeover');
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('page-open');
    timeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut}, 'page-open+=0.25');
    timeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut}, 'page-open');

    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function(changes) {
        changes.forEach(function(change) {
          if (change.intersectionRatio) {
            timeline.play(0);
            cogRotate.play(0);
            oldCogRotate.play(0);
            return;
          }
          timeline.pause();
          cogRotate.pause();
          oldCogRotate.pause(0);
        });
      }, {});

      observer.observe(document.documentElement);
    }
    else {
      timeline.play(0);
      cogRotate.play(0);
      oldCogRotate.play(0);
    }
  });
</script>
{% endframebox %}
</div>
</div>

猫ではなく馬の画像をレスポンスとして返すように Service Worker スクリプトを変更したとします。


    const expectedCaches = ['static-v2'];

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

注: 馬についてはっきりした意見はありません。

[前述のデモを参照してください](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}。
まだ猫の画像が表示されるはずです。その理由を次に説明します。

###  インストール

キャッシュ名を `static-v1` から `static-v2` に変更したことに注意してください。つまり、古い Service Worker でまだ使用されている現行のキャッシュ内のものを上書きせずに、新しいキャッシュをセットアップできます。



このパターンでは、バージョン固有のキャッシュが作成されます。これは、ネイティブ アプリがその実行可能ファイルにバンドルするアセットに似ています。
`avatars` などのバージョン固有でないキャッシュを使用することもできます。


###  待機

インストールに成功すると、アップデートされた Service Worker は、既存の Service Worker がクライアントを制御しなくなるまでアクティベートを遅らせます。
この状態は「待機中」と呼ばれ、これにより、ブラウザでは同時に 1 つのバージョンの Service Worker のみが実行されます。



[アップデートされたデモ](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}を実行した場合、V2 Worker がまだアクティベートされていないため、まだ猫の画像が表示されるはずです。DevTools の [Application] タブで、新しい Service Worker が待機中であることを確認できます。


<figure>
  <img src="images/waiting.png" class="browser-screenshot" alt="新しい Service Worker が待機中であることを示す DevTools">
</figure>

デモで 1 つのタブのみを開いている場合でも、ページを更新しただけでは新しいバージョンに引き継がれません。
これは、ブラウザ ナビゲーションの動作によるものです。ナビゲートすると、現在のページはレスポンス ヘッダーを受信するまで消えません。さらに、レスポンスに `Content-Disposition` ヘッダーが含まれている場合、現在のページは消えないことがあります。このような重複があると、現行の Service Worker は、更新中は常にクライアントを制御していることになります。


アップデートを取得するには、現行の Service Worker を使用しているすべてのタブを閉じるか、それらのタブから移動します。
次に、[再びデモに移動](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}すると、馬が表示されるはずです。


このパターンは、Chrome のアップデート方法に似ています。Chrome のアップデートはバックグラウンドでダウンロードされますが、Chrome が再起動するまで適用されません。
とりあえずは、引き続き混乱なしに現行バージョンを使用できます。
これは開発中は問題となりますが、DevTools にはこれを簡単にする方法があります。これについては[後で](#devtools)説明します。



###  アクティベート

アクティベートにより、古い Service Worker はなくなり、新しい Service Worker でクライアントを制御できるようになります。
これは、データベースの移行やキャッシュの消去など、古い Worker の使用中に実行できなかったことを実行するのに最適な時間です。



前述のデモでは、必要なキャッシュのリストを保持し、`activate` イベントで他のキャッシュを消去して、古い `static-v1` キャッシュを削除しています。



Warning: 前のバージョンからアップデートしていない場合があります。その場合は、Service Worker の古いバージョンが多数存在する可能性があります。

Promise を `event.waitUntil()` に渡すと、Promise が解決されるまで機能イベント（`fetch`、`push`、`sync` など）がバッファされます。
そのため、`fetch` イベントが発生すると、アクティベーションは完了します。


Warning: Cache Storage API は、（localStorage や IndexedDB のように）「オリジン ストレージ」です。同じオリジンで多くのサイト（`yourname.github.io/myapp` など）を実行する場合は、他のサイトのキャッシュを削除しないように注意してください。これを回避するには、`myapp-static-v1` のようにキャッシュ名に現在のサイトに固有の接頭辞を付け、`myapp-` で始まらないキャッシュには触れないようにします。


###  待機段階のスキップ

待機段階とは、一度に 1 つのバージョンのサイトのみを実行していることを意味しますが、その機能が不要になった場合には、`self.skipWaiting()` を呼び出して新しい Service Worker をすぐにアクティベートできます。



これにより、Service Worker は現在アクティブな Worker を追い出し、待機段階に入るとすぐに（または、既に待機段階に入っている場合は即座に）自身をアクティベートします。Worker はインストールをスキップせず、待機するだけです。

待機中または待機前は、`skipWaiting()` をいつ呼び出しても実際には問題にはなりません。
通常は `install` イベントで呼び出します。

    self.addEventListener('install', event => {
      self.skipWaiting();

      event.waitUntil(
        // caching etc
      );
    });

ただし、Service Worker への `postMessage()` の結果として呼び出すことが必要になる場合があります。
ユーザー インタラクションの後で `skipWaiting()` が必要になります。

[`skipWaiting()` を使用するデモをご覧ください](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v3.html){:
.external}。
移動しなくても牛の画像が表示されるはずです。`clients.claim()` と同様にレースであるため、ページが画像を読み込もうとする前に新しい Service Woker がフェッチ、インストール、アクティベートを行うと、牛のみが表示されます。



Warning: `skipWaiting()` は、古いバージョンで読み込まれたページを新しい Service Worker で制御することを意味します。つまり、ページのフェッチの一部は古い Service Worker で処理され、その後のフェッチは新しい Service Worker で処理されます。これで問題になる可能性がある場合は、`skipWaiting()` を使用しないでください。


###  手動アップデート

前述したとおり、ブラウザはナビゲーションや機能イベントの後、自動的にアップデートを確認しますが、手動でトリガーすることもできます。


    navigator.serviceWorker.register('/sw.js').then(reg => {
      // sometime later…
      reg.update();
    });

ユーザーがサイトを再読み込みすることなく長時間使用できるようにするには、`update()` を定期的に呼び出す必要があります（1 時間ごとなど）。


###  Service Worker スクリプトの URL の変更の回避

[キャッシュのベスト プラクティスに関する私の投稿](https://jakearchibald.com/2016/caching-best-practices/){: .external}をご覧になったことがある場合は、Service Worker の各バージョンに一意の URL を指定することを検討するかもしれません。**その必要はありません。


**通常、これは Service Worker に対してはベスト プラクティスどころかまったくお勧めできないので、現在の場所にあるスクリプトのみアップデートしてください。


次のような問題が発生する可能性があるからです。

1. `index.html` は `sw-v1.js` を Service Worker として登録します。
1. `sw-v1.js` は、オフライン ファーストで動作するように `index.html` をキャッシュし、表示します。
1. `index.html` をアップデートすると、新しい `sw-v2.js` が登録されます。

このようにすると、ユーザーは `sw-v2.js` を取得しません。`sw-v1.js` はキャッシュから古いバージョンの `index.html` を表示するからです。
Service Worker をアップデートするために、Service Worker をアップデートすることが必要になるという状況になってしまいました。これはいけません。

ただし、[上記のデモ](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}では、Service Worker の URL を変更しています。
デモ目的で、バージョンを切り替えることができるようにしています。
本番環境でこのようにすることはありません。


##  開発の簡素化{: #devtools}

Service Worker のライフサイクルは、ユーザーを考慮して構築されていますが、開発時は少し問題があります。
幸いなことに、この問題に役立つツールがあります。

###  再読み込み時のアップデート

これは私のお気に入りです。

<figure>
  <img src="images/update-on-reload.png" class="browser-screenshot" alt="DevTools の [Update on reload]">
</figure>

これにより、ライフサイクルはデベロッパーにとって使いやすくなります。各ナビゲーションにより次が行われます。

1. Service Worker を再取得します。
1. バイト数が同じでもそれを新しいバージョンとしてインストールします。つまり、`install` イベントが実行され、キャッシュがアップデートされます。
1. 新しい Service Worker がアクティベートされるように、待機段階をスキップします。
1. ページをナビゲートします。


つまり、2 回再読み込みしたりタブを閉じたりすることなく、ナビゲーション（更新など）ごとにアップデートを取得します。


###  待機のスキップ

<figure>
  <img src="images/skip-waiting.png" class="browser-screenshot" alt="DevTools の [skipWaiting]">
</figure>

待機中の Worker がある場合は、DevTools で [skipWaiting] を選択すると、すぐに「アクティブ」になります。


###  シフト再読み込み

ページを強制的に再読み込み（シフト再読み込み）すると、Service Worker 全体がスキップされます。
これは制御されません。この機能は仕様どおりであり、他の Service Worker 対応ブラウザで動作します。


##  アップデートの処理

Service Worker は、[拡張可能ウェブ](https://extensiblewebmanifesto.org/){: .external }の一部としてデザインされました。我々ブラウザ デベロッパーは、ウェブ デベロッパーよりもウェブ開発が得意ではないと認識しています。したがって、ブラウザ デベロッパーの好きなパターンを使用して特定の問題を解決する、限られた高レベルの API を提供すべきではありません。代わりに、ブラウザの中心部へのアクセス権を付与し、ユーザーに最適な方法で好きなように実行してもらいます。




できるだけ多くのパターンを有効にするために、アップデート サイクル全体は監視可能になっています。

    navigator.serviceWorker.register('/sw.js').then(reg => {
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

##  乗り切りました！

すばらしいですね！技術的な理論をたくさん説明しました。今後の数週間で上記の実用的なアプリケーションのいくつかに踏み込みますのでご期待ください。



{# wf_devsite_translation #}
