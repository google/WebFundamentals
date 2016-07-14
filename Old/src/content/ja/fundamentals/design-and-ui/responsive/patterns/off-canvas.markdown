---
title: "Off canvas"
description: "レスポンシブ ウェブ デザイン パターンは急速に進化していますが、 デスクトップとモバイル端末間でうまく動作する 確立されたパターンは限られています。"
updated_on: 2014-10-21
---

<p class="intro">
  縦にコンテンツをスタックするよりも、オフキャンバス パターンは、使用頻度の低いコンテンツを配置します。おそらくナビゲーションやアプリ メニューでオフキャンバスになり、画面サイズが十分に大きい場合にのみ表示され、小さい画面ではコンテンツはクリックでが離れます。
</p>

{% link_sample _code/off-canvas.html %}
  <img src="imgs/off-canvas.svg">
  お試しください
{% endlink_sample %}

縦にコンテンツをスタックするよりも、このサンプルでは `transform: translate(-250px, 0)` を使用して、コンテンツ
`div` の 2 つを非表示にします。  JavaScript を使用して、
オープンクラスを追加することで  div を表示し、要素を可視化します。  画面の幅が大きくなるにつれて、
オフスクリーンの位置は要素から除去され
可視ビューポート内に表示されます。

このサンプルでは、Safari for iOS 6 および Android Browser は `flexbox` の
`flex-flow: row nowrap` 機能をサポートしないことに注意してください。
このため、絶対位置にフォールバックしなければなりませんでした。

このパターンを使用するサイトには以下が含まれます。

 * [HTML5Rocks
  Articles](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](http://www.google.com/nexus/)
 * [Facebook's Mobile Site](https://m.facebook.com/)

{% include_code src=_code/off-canvas.html snippet=ocanvas lang=css %}


