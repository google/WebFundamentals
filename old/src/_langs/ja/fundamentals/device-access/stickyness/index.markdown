---
layout: section
title: "ホームスクリーンに追加"
description: "ほぼすべての主要なブラウザ ベンダーで、ユーザーはウェブ アプリを PIN またはインストールすることができます。 いわゆる「スティッキーネス」とは、ネイティブ アプリのための共通の引数ですが、マークアップにわずかの調整を施すだけで達成することができます。"
introduction: "ほぼすべての主要なブラウザ ベンダーで、ユーザーはウェブ アプリを PIN またはインストールすることができます。 いわゆる「スティッキーネス」とは、ネイティブ アプリのための共通の引数ですが、マークアップにわずかの調整を施すだけで達成することができます。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 1
id: stickyness
collection: device-access
authors:
  - pbakaus
priority: 1
---
{% wrap content%}

ユーザーには、“add to homescreen” 機能は過給ブックマークと
同じように動作します。ただし、アプリを表示
する方法についてブラウザに指示を与えません。また、モバイル ブラウザはブックマークする
ページのファビコンやスクリーンショットを撮ります。さらに、ユーザーがホーム画面からウェブ アプリを起動すると、
ブラウザのデフォルトの UI を表示します。 組み込みの動作を改善できる
方法を見てみましょう。

Chrome および Safari は、ページの `<head>` の `<meta>` タグおよび `<link>`
タグを使用して、非常に似た構文をサポートし、全体的な機能を比較的軽量
に維持します。

Internet Explorer 10 は「固定サイト」を導入しました。
これは、アイコンと通知の表示を変更するなどの追加機能を提供する概念です。
おなじみの `<meta>` タグのスタイルをサポートする一方で、構成機能として役立つリンクされた
 XML ファイルに有利に働きます。

注意:Firefox OS 独自の Firefox の API と機能は、ここでは言及しません。
公式の [Firefox OS documentation](https://developer.mozilla.org/en-US/Apps/Quickstart) を参照してください。

{% include modules/nextarticle.liquid %}

{% endwrap %}
