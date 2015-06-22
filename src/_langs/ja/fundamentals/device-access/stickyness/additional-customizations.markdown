---
layout: article
title: "その他のカスタマイズ"
description: "以下は非常に有用なカスタマイズですが、ブラウザのサブセットでのみ動作します。 これらのすべては任意ですが、アプリの使い心地をさらに向上させるために、強くお勧めします。"
introduction: "以下は非常に有用なカスタマイズですが、ブラウザのサブセットでのみ動作します。 これらのすべては任意ですが、アプリの使い心地をさらに向上させるために、強くお勧めします。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 6
id: additional-customizations
authors:
  - pbakaus
  - mattgaunt
collection: stickyness
---

{% wrap content %}

{% include modules/toc.liquid %}

## ブラウザ エレメントの色

Chrome、Firefox OS、Safari、Internet Explorer、および Opera Coast では、メタタグを使用してブラウザやプラットフォームのエレメト色を定義することができます。

{% highlight html %}
<!-- Chrome & Firefox OS -->
<meta name="theme-color" content="#4285f4">
<!-- Windows Phone -->
<meta name="msapplication-navbutton-color" content="#4285f4">
<!-- iOS Safari -->
<meta name="apple-mobile-web-app-status-bar-style" content="#4285f4">
{% endhighlight %}


<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/theme-color.png" alt="テーマカラーのメタタグを使用したサイトの例">

        <figcaption>テーマカラーのメタタグを使用したサイトの例</figcaption>
    </figure>
</div>

## Safari:スタートアップ画像、ステータスバーの外観

Safari ではステータスバーのスタイルを設定し、スタートアップ画像を設定することができます。

### スタートアップ画像を設定

デフォルトでは、Safari は読み込み中に空白の画面を表示し、複数の
読み込み後に、アプリの前の状態のスクリーンショットを表示します。 これを防ぐには、
Safari が明示的な起動画像を表示するように、
`rel=apple-touch-startup-image` のリンクタグを追加することによって設定します。 次に例を示します。

{% highlight html %}
<link rel="apple-touch-startup-image" href="icon.png">
{% endhighlight %}

画像は、対象端末画面の特定のサイズにするか、または
使用しないでください。 
[Safari Web Content Guidelines](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)で
詳細をご確認ください。

Apple のドキュメントではこのトピックはほとんど取り上げられませんが、開発者コミュニティは
、高度なメディア クエリを使用して、すべての端末を対象にする方法を考え出しました。
これによって適切なデバイスを選択し、正しいイメージを指定することができます。 [tfausak's gist] の好意により
、ここに具体的な解決策を示します(//gist.github.com/tfausak/2222823):

{% highlight html %}
<!-- iOS 6 & 7 iPad (retina, portrait) -->
<link href="/static/images/apple-touch-startup-image-1536x2008.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: portrait)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPad (retina, landscape) -->
<link href="/static/images/apple-touch-startup-image-1496x2048.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: landscape)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPad (portrait) -->
<link href="/static/images/apple-touch-startup-image-768x1004.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: portrait)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPad (landscape) -->
<link href="/static/images/apple-touch-startup-image-748x1024.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: landscape)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPhone 5 -->
<link href="/static/images/apple-touch-startup-image-640x1096.png"
     media="(device-width: 320px) and (device-height: 568px)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPhone (retina) -->
<link href="/static/images/apple-touch-startup-image-640x920.png"
     media="(device-width: 320px) and (device-height: 480px)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPhone -->
<link href="/static/images/apple-touch-startup-image-320x460.png"
     media="(device-width: 320px) and (device-height: 480px)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">
{% endhighlight %}

### ステータスバーの外観を変更する

`black` または
`black-translucent`で、デフォルトのステータスバーの外観を変更することができます。 `black-translucent` では、ステータスバーは全画面コンテンツの上
にフローティング表示され、下に移動することはありません。 これによってレイアウトに高さが得られますが、
上部を妨げることになります。  必須コードは以下のとおりです。

{% highlight html %}
<meta name="apple-mobile-web-app-status-bar-style" content="black">
{% endhighlight %}

異なるモードでどのように見えるかのプレビューも以下に示します。

<div class="clear g-wide--pull-1">
  <div class="g--half">
    <figure class="fluid">
      <img src="images/status-bar-translucent.png" srcset="images/status-bar-translucent.png 1x, images/status-bar-translucent-2x.png 2x" alt="黒-半透明">
      <figcaption><code>black-translucent</code>を使用したスクリーンショット</figcaption>
    </figure>
  </div>
  <div class="g--half g--last">
    <figure class="fluid">
      <img src="images/status-bar-black.png" srcset="images/status-bar-black.png 1x, images/status-bar-black-2x.png 2x" alt="黒-黒">
      <figcaption><code>black</code>を使用したスクリーンショット</figcaption>
      </figure>
  </div>
</div>

## Internet Explorer:ライブタイル、通知、および固定サイト

Microsoft の「固定サイト」および回転する「ライブタイル」は、他の
実装をはるかに超えています。それらをここで取り上げることによって、このガイドの価値が高まります。 詳細については
以下をご覧ください
[learn how to create live tiles at MSDN](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx)。

{% include modules/nextarticle.liquid %}

{% endwrap %}
