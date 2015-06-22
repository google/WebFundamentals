---
layout: article
title: "アイコンの指定"
description: "あなたのサイトを目立たせるためには、きれいなフルサイズのアイコンを提供するようにしてください。そうしないと、ファビコンや低品質のスクリーンショットが使用されることになります。"
introduction: "あなたのサイトを目立たせるためには、きれいなフルサイズのアイコンを提供するようにしてください。そうしないと、ファビコンや低品質のスクリーンショットが使用されることになります。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 3
id: specify-an-icon
authors:
  - pbakaus
collection: stickyness
---

{% wrap content %}

<figure>
  <img src="images/icons.png" alt="プラットフォームごとのアイコンのカスタマイズ" />
  <figcaption>カスタム アイコンの追加は、目立たせるための簡単な方法です。</figcaption>
</figure>


`<head>` に次のコードを追加して、Safari、Opera、および Internet Explorer 
にカスタムアイコンを追加します。

{% highlight html %}
<!-- icon in the highest resolution we need it for -->
<link rel="icon" sizes="228x228" href="icon.png">
<!-- reuse same icon for Safari -->
<link rel="apple-touch-icon" href="ios-icon.png">
<!-- multiple icons for IE -->
<meta name="msapplication-square70x70logo" content="icon\_smalltile.png">
<meta name="msapplication-square150x150logo" content="icon\_mediumtile.png">
<meta name="msapplication-wide310x150logo" content="icon\_widetile.png">
<meta name="msapplication-square310x310logo" content="icon\_largetile.png">
{% endhighlight %}

この例では、Opera は icon.png を使用しており、端末に
よって必要なサイズに拡大されます。 Safari は `rel` 属性 `apple-touch-icon` を持つ 
`<link>` タグを使用します。

Windows 8 の新しいホームスクリーンでは、固定サイトの 4 種類のレイアウトを
サポートするために、4 つのアイコンが必要です。 特定のサイズをサポートしない場合は、関連する
メタタグを省くことができます。

個々のアイコンの個別のリンクタグを提供することによって、[explicit sizes](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27) を
指定することができ、OS でアイコンのサイズが変更されることを防止します。

{% highlight html %}
<link rel="apple-touch-icon" href="touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
{% endhighlight %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
