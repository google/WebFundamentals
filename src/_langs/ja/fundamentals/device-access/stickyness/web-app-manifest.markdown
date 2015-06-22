---
layout: article
title: "WebApp マニフェストの追加"
description: "ウェブ アプリケーションのマニフェストは単純な JSON ファイルです。これにより、開発者は、ユーザーが希望する領域にアプリが表示される方法を制御することができます (モバイルのホーム画面など)。また、ユーザーが起動できるアプリや、更に重要事項としてその起動方法を示します。 マニフェストは将来的に、アプリでさらに多くの制御を可能にしますが、現時点では、アプリの起動方法に焦点を当てています。"
introduction: "ウェブ アプリケーションのマニフェストは単純な JSON ファイルです。これにより、開発者は、ユーザーが希望する領域にアプリが表示される方法を制御することができます (モバイルのホーム画面など)。また、ユーザーが起動できるアプリや、更に重要事項としてその起動方法を示します。 マニフェストは将来的に、アプリでさらに多くの制御を可能にしますが、現時点では、アプリの起動方法に焦点を当てています。"
article:
  written_on: 2014-12-17
  updated_on: 2014-12-17
  order: 1
id: wapp-app-manifest
collection: stickyness
authors:
  - mattgaunt
  - paulkinlan
collection: stickyness
priority: 1
key-takeaways:
  manifest:
    - すべての端末のフォーム ファクタにまたがって機能するように、アイコンの範囲を定義します
    - ユーザーの目に触れるものなので、良い `short_name` を選択してください 
    - 起動 URL とクエリ文字列パラメータを追加して、アプリを起動するユーザー数を追跡できるようにします
---

{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.manifest %}

WebApp のマニフェストを追加することは本当に簡単です。 WebApp の設定とリソースが
含まれている manifest.json ファイルを作成し、
HTML ページから*リンク*を追加します。

## マニフェストの作成

マニフェストには任意の名前を付けることができます。 ほとんどの人はおそらく manifest.json を使用します。 例を以下に示します。

{% highlight json %}
{
  "short_name": "Kinlan's Amaze App",
  "name": "Kinlan's Amazing Application ++",
  "icons": [
    {
      "src": "launcher-icon-0-75x.png",
      "sizes": "36x36"
    },
    {
      "src": "launcher-icon-1x.png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-1-5x.png",
      "sizes": "72x72"
    },
    {
      "src": "launcher-icon-2x.png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-3x.png",
      "sizes": "144x144"
    },
    {
      "src": "launcher-icon-4x.png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html",
  "display": "standalone"
}
{% endhighlight %}

ランチャー テキストで使用するため、*short_name* を含める必要があります。

*start_url* を提供しない場合、現在のページが使用されますが、これはユーザーが望んでいることではないはずです。

## マニフェストについてのブラウザに伝える

マニフェストサイト上でを作成したら、次のようにウェブ アプリを包含するすべてのページへのリンク タグを追加するだけです。

{% highlight html %}
<link rel="manifest" href="/manifest.json">
{% endhighlight %}

## 端末向けに素敵なアプリのアイコンを作成する

ユーザーが自分のホーム画面にサイトを追加すると、ブラウザが使用するアイコンのセットを定義することができます。

ウェブ アプリのアイコンは、上記のようにタイプ、サイズ、および密度で定義することができますが、これらのすべてを定義する必要はなく、サイズと画像 src の定義が必要なだけです。

{% highlight json %}
"icons": [{
    "src": "images/touch/icon-128x128.png",
    "sizes": "128x128"
  }, {
    "src": "images/touch/apple-touch-icon.png",
    "sizes": "152x152"
  }, {
    "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
    "sizes": "144x144"
  }, {
    "src": "images/touch/chrome-touch-icon-192x192.png",
    "sizes": "192x192"
  }],
{% endhighlight %}

<div class="clear g-wide--full">
    <figure>
        <img src="images/homescreen-icon.png" alt="ホーム画面アイコンに追加">

        <figcaption>ホーム画面アイコンに追加</figcaption>
    </figure>
</div>

<div class="clear"></div>

## サイトの起動方法を設定

WebApp のブラウザで UI を非表示にするには、*display* タイプを *standalone* に設定します。

{% highlight json %}
"display": "standalone"
{% endhighlight %}

心配は不要です。ユーザーがブラウザで正常なサイトとしてページを表示することを望む場合は、ブラウザの表示タイプを使用することができます。

{% highlight json %}
"display": "browser"
{% endhighlight %}

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/manifest-display-options.png" alt="web-app-capable">

        <figcaption>マニフェスト表示オプション</figcaption>
    </figure>
</div>

<div class="clear"></div>

## ページの最初の方向を定義

特定の画面の向きを強制することができ、これは横表示のみで使用するゲームのようなユースケースでは非常に便利です。 しかし、これは注意して使用する必要があります。 ユーザーは両方の画面の向きでアプリを表示できることを好みます。

{% highlight json %}
"orientation": "landscape"
{% endhighlight %}

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/manifest-orientation-options.png" alt="WebApp のマニフェストの画面の向きオプション">

        <figcaption>WebApp のマニフェストの画面の向きオプション</figcaption>
    </figure>
</div>

<div class="clear"></div>

## 現在は安全に使用できます。 A.K.A ブラウザ対応

はい。  これは先進的な機能で、サポートがあれば、
ブラウザのユーザーの使い勝手がより向上します。  ブラウザがマニフェストをサポートしていない場合は、
ユーザーがサイトの使用を停止されません。

2014 年 11 月現在では、Chrome はマニフェストをj実装しています。 Mozilla は実装中で、[IE はエリアを拡大中です](https://status.modern.ie/webapplicationmanifest?term=manifest)。

{% include modules/nextarticle.liquid %}

{% endwrap %}
