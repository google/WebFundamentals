---
layout: shared/narrow
title: "はじめる前に"
description: "はじめる前に、まずちゃんとした環境を整えているかを確かめましょう。"
translators:
  - myakura
---

<p class="intro">はじめる前に、まずちゃんとした環境を整えているかを確かめましょう。</p>

## サポートしているブラウザを使う

Service Worker をサポートするブラウザは増えています。現在は Firefox と Opera でサポートされています。Microsoft Edge も[支持を表明](https://dev.windows.com/en-us/microsoft-edge/platform/status/serviceworker)しています。Safariも[将来の展開を示唆](https://trac.webkit.org/wiki/FiveYearPlanFall2015)しています。ブラウザの実装状況は、Jake Archibald による [is Serviceworker ready](https://jakearchibald.github.io/isserviceworkerready/) で確認できます。

### Chrome のバージョンは？

もし Chrome 46 以降のバージョンを使っていない場合は、[アップグレードしてください](https://support.google.com/chrome/answer/95414)。Chrome 46 より前のバージョンでは、Service Worker で必要になるだろう機能、たとえば `Cache.addAll()` などが使えません。

もし古いバージョンの Chrome に固定されている場合、足りない機能を補う [polyfill](https://github.com/coonsta/cache-polyfill) があります。`dist/serviceworker-cache-polyfill.js` をサイトのどこかにコピーし、Service Worker のスクリプトから `importScripts()` メソッドで呼び出します。インポートされたすべてのスクリプトは Service Worker によってキャッシュされます。

{% highlight javascript %}
importScripts('serviceworker-cache-polyfill.js');
{% endhighlight %}

## HTTPS が必要

Service Worker は `localhost` では動作しますが、デプロイ時にはサーバに HTTPS を設定しなければいけません。

Service Worker を使うと接続へのハイジャック、改ざん、フィルタリングができてしまいます。とても強力です。良いことに使えばそれでよいのですが、中間者（man-in-the-middle）はそうではないかもしれません。これを防ぐため、Service Worker は HTTPS で提供されるページのみに登録できるようになっています。こうすることでブラウザが受け取る Service Worker は、ネットワークの旅の途中で改ざんされていないことを保証できます。

[Github Pages](https://pages.github.com/) は HTTPS で提供されるので、デモをホストするには絶好の環境です。

サーバに HTTPS を設定したい場合は、TLS 証明書を取得しサーバにセットアップしなければなりません。セットアップ方法は環境によるので、サーバのドキュメントを読み、そして [Mozilla の SSL コンフィグジェネレータ](https://mozilla.github.io/server-side-tls/ssl-config-generator/)を使ってベストプラクティスを得てください。
