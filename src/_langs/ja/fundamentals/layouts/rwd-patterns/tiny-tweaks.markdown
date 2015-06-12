---
layout: article
title: "Tiny tweaks"
description: "レスポンシブ ウェブ デザイン パターンは急速に進化していますが、 デスクトップとモバイル端末間でうまく動作する 確立されたパターンは限られています。"
introduction: "Tiny tweaks はレイアウトのための小さな変更を行います。非常にマイナーなフォント サイズの調整、
画像サイズの変更、コンテンツの移動などです。"
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-10-21
  order: 4
priority: 1
collection: rwd-patterns
---

{% wrap content%}

これは、1 ページの線形ウェブ サイト、テキストの多い記事のような、
単一列のレイアウトに適しています。

{% link_sample _code/tiny-tweaks.html %}
  <img src="imgs/tiny-tweaks.svg">
  お試しください
{% endlink_sample %}

名前からわかるように、このサンプルでは、画面サイズの変化など少しだけの変更です。
画面の幅が大きくなるにつれて、フォントサイズやパディングを行います。

このパターンを使用するサイトには以下が含まれます。

 * [Opera's Shiny Demos](http://shinydemos.com/)
 * [Ginger Whale](http://gingerwhale.com/)
 * [Future Friendly](http://futurefriendlyweb.com/)

{% include_code _code/tiny-tweaks.html ttweaks css %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
