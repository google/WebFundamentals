---
title: "Tiny tweaks"
description: "レスポンシブ ウェブ デザイン パターンは急速に進化していますが、 デスクトップとモバイル端末間でうまく動作する 確立されたパターンは限られています。"
updated_on: 2014-10-21
---

<p class="intro">
  Tiny tweaks はレイアウトのための小さな変更を行います。非常にマイナーなフォント サイズの調整、画像サイズの変更、コンテンツの移動などです。
</p>

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

{% include_code src=_code/tiny-tweaks.html snippet=ttweaks lang=css %}


