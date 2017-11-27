project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 非同期関数を使用して、あたかも同期コードのように Promise ベースのコードを記述できます。

{# wf_published_on: 2016-10-20 #}
{# wf_updated_on: 2016-10-20 #}

# 非同期関数 - Promise をわかりやすくする {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

非同期関数は Chrome 55 でデフォルトで有効になっており、率直に言ってすばらしいものです。
この関数を使用すると、あたかも同期コードのように Promise ベースのコードを記述でき、しかもメインスレッドをブロックすることがありません。
この関数は、非同期コードから「巧妙さ」を減らして読みやすくします。


非同期関数は次のように機能します。

    async function myFirstAsyncFunction() {
      try {
        const fulfilledValue = await promise;
      }
      catch (rejectedValue) {
        // …
      }
    }

関数定義の前に `async` キーワードを使用すると、その関数内に `await` を使用できます。
Promise を `await` する場合、この関数は、ブロックすることなく Promise が完了状態になるまで一時停止します。
Promise が解決されると、値が返されます。
Promise が棄却すると、棄却された値がスローされます。

注: Promise をよくご存知ない場合は、[Promise のガイド](/web/fundamentals/getting-started/primers/promises)をご覧ください。


## 例:フェッチのログ記録

URL をフェッチしてレスポンスをテキストとしてログ記録するとします。Promise を使用した場合、次のようになります。


    function logFetch(url) {
      return fetch(url)
        .then(response => response.text())
        .then(text => {
          console.log(text);
        }).catch(err => {
          console.error('fetch failed', err);
        });
    }

非同期関数を使用した場合、次のようになります。

    async function logFetch(url) {
      try {
        const response = await fetch(url);
        console.log(await response.text());
      }
      catch (err) {
        console.log('fetch failed', err);
      }
    }

行数に変わりはありませんが、コールバックがすべてなくなっています。はるかに読みやすくなっています。特に、Promise に詳しくない場合はなおさらです。


注: `await` するものはすべて `Promise.resolve()` を介して渡されるため、非ネイティブな Promise を安全に `await` できます。


##  非同期は値を返す

非同期関数は、`await` を使用するかどうかに関係なく常に Promise を返します。この Promise は、非同期関数によって返されるものが何であれ、これを使用して解決または棄却されます。

次の例を見てみましょう。

    // wait ms milliseconds
    function wait(ms) {
      return new Promise(r => setTimeout(r, ms));
    }

    async function hello() {
      await wait(500);
      return 'world';
    }

`hello()` を呼び出すと、`"world"` で解決される Promise が返されます。

    async function foo() {
      await wait(500);
      throw Error('bar');
    }

`foo()` を呼び出すと、`Error('bar')` で棄却される Promise が返されます。

## 例: レスポンスのストリーミング

非同期関数は、より複雑な例の場合にその利点を実感できます。チャンクのログ出力時にレスポンスをストリーミングし、最終的なサイズを返したいとします。


注: 「チャンクのログ出力」というフレーズは好きではありません。

Promise では次のとおりです。

    function getResponseSize(url) {
      return fetch(url).then(response => {
        const reader = response.body.getReader();
        let total = 0;

        return reader.read().then(function processResult(result) {
          if (result.done) return total;

          const value = result.value;
          total += value.length;
          console.log('Received chunk', value);

          return reader.read().then(processResult);
        })
      });
    }

見てください、Jake Archibald は Promise の使い手です。`processResult` をこれ自体の中で呼び出して非同期ループを作成しているのがわかるでしょう？
とてもスマートなコードを記述できたという実感があります。
しかし、たいていの「スマートな」コードと同じように、長時間見つめないとコードが何を実行しているのか把握できません。まるで 90 年代に流行った立体視画像のようです。



非同期関数を使用して再度試してみましょう。

    async function getResponseSize(url) {
      const response = await fetch(url);
      const reader = response.body.getReader();
      let result = await reader.read();
      let total = 0;

      while (!result.done) {
        const value = result.value;
        total += value.length;
        console.log('Received chunk', value);
        // get the next result
        result = await reader.read();
      }

      return total;
    }

「スマートな部分」がすべてなくなっています。自己満足していた非同期ループが、信頼できるがつまらない while ループに置き換わっています。
はるかに優れています。将来的には、[非同期イテレータ](https://github.com/tc39/proposal-async-iteration){: .external}を使用して、[`while` ループを for-of ループに置き換えて](https://gist.github.com/jakearchibald/0b37865637daf884943cf88c2cba1376){: .external}、さらにすっきりとさせられるでしょう。




注: 私はストリームが大好きです。ストリーミングをよくご存知ない場合は、[このガイドをご覧ください](https://jakearchibald.com/2016/streams-ftw/#streams-the-fetch-api){: .external}。


##  その他の非同期関数構文

`async function() {}` は既に確認しましたが、`async` キーワードは他の関数構文でも使用できます。


###  アロー関数

    // map some URLs to json-promises
    const jsonPromises = urls.map(async url => {
      const response = await fetch(url);
      return response.json();
    });

注: `array.map(func)` は非同期関数が含まれていても構いません。Promise を返す関数としてのみ見なされます。
これは、最初の関数の完了を待機せずに 2 番目の関数を呼び出します。


###  オブジェクトのメソッド

    const storage = {
      async getAvatar(name) {
        const cache = await caches.open('avatars');
        return cache.match(`/avatars/${name}.jpg`);
      }
    };

    storage.getAvatar('jaffathecake').then(…);

###  クラスのメソッド

    class Storage {
      constructor() {
        this.cachePromise = caches.open('avatars');
      }

      async getAvatar(name) {
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
      }
    }

    const storage = new Storage();
    storage.getAvatar('jaffathecake').then(…);

注: クラス コンストラクタとゲッター/設定は非同期にできません。

##  注意: 過度な順次処理を避けます

同期的に見えるコードを記述している場合でも、並列で実行するチャンスを見逃さないようにしてください。


    async function series() {
      await wait(500);
      await wait(500);
      return "done!";
    }

上記は完了するのに 1000 ミリ秒かかります。

    async function parallel() {
      const wait1 = wait(500);
      const wait2 = wait(500);
      await wait1;
      await wait2;
      return "done!";
    }

一方、上記は両方の待機が同時に発生するため、完了までにかかる時間は 500 ミリ秒です。実用的な例を見てみましょう。


### 例: フェッチを順番に出力

一連の URL をフェッチして、これらをできるだけ早く正しい順序で出力するとします。


しっかりと見てください。Promise では次のようになります。

    function logInOrder(urls) {
      // fetch all the URLs
      const textPromises = urls.map(url => {
        return fetch(url).then(response => response.text());
      });

      // log them in order
      textPromises.reduce((chain, textPromise) => {
        return chain.then(() => textPromise)
          .then(text => console.log(text));
      }, Promise.resolve());
    }

`reduce` を使用して一連の Promise を連結しています。とてもスマートでしょう。
しかしこれは、使用しない方がよい「非常にスマートな」コーディングなのです。

上記を非同期関数に変える場合はしかしながら、つい順次的にしたくなります。


<span class="compare-worse">非推奨</span> - 過度に順次処理を使用する

    async function logInOrder(urls) {
      for (const url of urls) {
        const response = await fetch(url);
        console.log(await response.text());
      }
    }

すっきりとしましたが、2 番目のフェッチは最初のフェッチが完全に読み込まれるまで開始されません。
これは、フェッチを並行で実行する Promise の例より時間がかかります。
幸いなことに、理想的な解決策があります。

<span class="compare-better">推奨</span> - すっきりとして並行処理する

    async function logInOrder(urls) {
      // fetch all the URLs in parallel
      const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
      });

      // log them in sequence
      for (const textPromise of textPromises) {
        console.log(await textPromise);
      }
    }

この例では、URL は並行でフェッチされて読み込まれていますが、「スマート」な
`reduce` 部分は、つまらなくて読み取りやすい標準的な for-loop で置き換えられています。

##  対応ブラウザと回避策

執筆時点では、非同期関数は Chrome 55 ではデフォルトで有効ですが、主要なすべてのブラウザではまだ開発中です。


* Edge - [ビルド 14342+、試験運用](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/asyncfunctions/)
* Firefox - [開発中](https://bugzilla.mozilla.org/show_bug.cgi?id=1185106)
* Safari - [開発中](https://bugs.webkit.org/show_bug.cgi?id=156147)

###  回避策 - ジェネレータ

ジェネレータ（[主要なブラウザすべての最新バージョン](http://kangax.github.io/compat-table/es6/#test-generators){:.external}を含む）をサポートするブラウザが対象の場合は、ある程度非同期関数の polyfill が利用できます。



[Babel](https://babeljs.io/){: .external} がこれに該当します。[Babel REPL を使用した例はこちらをご覧ください](https://goo.gl/0Cg1Sq){: .external}。トランスパイルされたコードがどの程度類似しているかに注意してください。この変換は [Babel の es2017 preset](http://babeljs.io/docs/plugins/preset-es2017/){: .external} の一部です。


注: Babel REPL とは声に出して読むと面白い言葉です。試してみてください。

お勧めするのはトランスパイルする方法です。対象ブラウザで非同期関数がサポートされるようになったら無効にするだけで済むからです。ただし、本当はトランスパイラを使用したくない場合は、[Babel の polyfill](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25){: .external} を取得してこれを自分自身で使用できます。次の例を見てください。

    async function slowEcho(val) {
      await wait(1000);
      return val;
    }

このようにする代わりに、[polyfill](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25){: .external} を追加して次のように記述します。


    const slowEcho = createAsyncFunction(function*(val) {
      yield wait(1000);
      return val;
    });

`createAsyncFunction` にジェネレータ（`function*`）を渡して、`await` ではなく `yield` を使用する必要があります。
これ以外は、同様に機能します。

###  回避策 - リジェネレータ

古いブラウザが対象の場合は、Babel によりジェネレータをトランスパイルすることもできます。これにより、IE8 まで非同期関数を使用できます。
このためには、[Babel の es2017 preset](http://babeljs.io/docs/plugins/preset-es2017/){: .external} と [es2015 preset](http://babeljs.io/docs/plugins/preset-es2015/){: .external} の両方が必要です。



[出力はほれほど洗練されていない](https://goo.gl/jlXboV)ため、長いコードに注意してください。


##  すべてを非同期にする

すべてのブラウザで非同期関数が有効になれば、Promise を返すすべての関数でこの関数を使用します。
コードを使用するだけでなく、関数が常に Promise を返すようにします。


[2014 年](https://jakearchibald.com/2014/es7-async-functions/){: .external}、非同期関数には本当にわくわくしました。この関数が実際にブラウザで使用できるようになるとは、本当に素晴らしいことです。


{# wf_devsite_translation #}
