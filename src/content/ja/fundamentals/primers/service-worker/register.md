project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Service Worker をインストールするには、ページから Service Worker を**登録**しなければいけません。

{# wf_review_required #}
{# wf_published_on: 2000-01-01 #}

# Service Worker の登録 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Translated By: 

{% include "_shared/contributors/myakura.html" %}



<p class="intro">Service Worker をインストールするには、ページから Service Worker を<strong>登録</strong>しなければいけません。登録によって、ブラウザに Service Worker の JavaScript ファイルの場所を知らせられます。


    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // 登録成功
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch(function(err) {
        // 登録失敗 :(
        console.log('ServiceWorker registration failed: ', err);
      });
    }
    

このコードはまず、Service Worker API が存在しているかをチェックし、あればさらに `/sw.js` にある Service Worker が登録されてるかをチェックします。

ページが読み込まれるたびに `register()` メソッドが呼ばれますが、心配はいりません。ブラウザは Service Worker が登録されているかを調べてから登録処理をするかしないか判断してくれます。

`register()` メソッドについて気にかけておきたいところが、Service Worker ファイルの場所です。この例の場合、Service Worker のファイルはドメインのルートにあります。これはこの Service Worker のスコープが origin 全体ということです。つまり、この Service Worker はこのドメイン下ですべての `fetch` イベントを受け取ります。もし `/example/sw.js` という Service Worker ファイルを登録した場合、その Service Worker はページのパスが `/example/` から始まるもの（例：`/example/page1/`, `/example/page2`）のみの `fetch` イベントを受け取ります。

Service Worker が有効になっているかは、`chrome://inspect/#service-workers` にある自分のサイトからわかります。

![Service Worker の調査](images/sw-chrome-inspect.png)

Service Worker が Chrome で実装された当初は、`chrome://serviceworker-internals` からその詳細を確認できました。これも Service Worker のライフサイクルを知りたいというだけの場合には有用かもしれません。ただもし今後 `chrome://inspect/#service-workers` に置き換わってもびっくりしないでくださいね。

Service Worker のテストはシークレットウインドウで行うと便利です。というのもウインドウを閉じてまた新しいウインドウにすれば、古い Service Worker に影響されることがないからです。シークレットウインドウへの登録やキャッシュは、そのウインドウが閉じられたらすべて消去されます。
