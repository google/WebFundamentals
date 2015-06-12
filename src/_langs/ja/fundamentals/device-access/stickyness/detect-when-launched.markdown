---
layout: article
title: "ホームスクリーンから起動時に検出"
description: "アプリがホームスクリーンから起動されるか、 ウェブ ブラウザから起動されるかを知っておくと便利な場合があります。"
introduction: "アプリがホームスクリーンから起動されるか、 ウェブ ブラウザから起動されるかを知っておくと便利な場合があります。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 5
id: detect-when-launched
authors:
  - pbakaus
collection: stickyness
---

{% wrap content %}

アプリがホームスクリーンから起動されるか、ウェブ ブラウザから起動されるかを
知っておくと 便利な場合があります。 1 つのユースケースとして、ブラウザから起動したときに、
ユーザーのホームスクリーンにアプリをインストールすることを示唆するバナーを表示し、
インストールが終わると非表示にしたい場合があります。

Mobile Safari では、`window.navigator.standalone` にクエリを送ると、アプリがホームスクリーンのアイコンから実行されているか、
単にブラウザで実行されているかがわかります。 Internet
Explorer では、
[`window.external.msIsSiteMode()`](http://msdn.microsoft.com/en-us/library/ie/gg491733(v=vs.85).aspx) にクエリを送ると、同じ結果が得られます。 両方の確認結果です。

{% highlight js %}
var fromHomescreen = window.navigator.standalone || window.external.msIsSiteMode();
if(!fromHomescreen) {
    // show them a guide on how to install the web app
    ...
}
{% endhighlight %}

残念ながら、Chrome for Android で同様の検出はできません。

{% include modules/nextarticle.liquid %}

{% endwrap %}
