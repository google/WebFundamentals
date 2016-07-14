---
title: "Responsive Web Design Patterns"
description: "レスポンシブ ウェブ デザイン パターンは急速に進化していますが、 デスクトップとモバイル端末間でうまく動作する 確立されたパターンは限られています。"
updated_on: 2014-10-21
---

<p class="intro">
  レスポンシブ ウェブ デザイン パターンは急速に進化していますが、 デスクトップとモバイル端末間でうまく動作する 確立されたパターンは限られています。
</p>


レスポンシブ ウェブ ページで使用されるほとんどのレイアウトは、5 つのパターンのいずれかに分類することができます。
主にfluid、column drop、layout shifter、tiny tweaks、および off canvas です。
いくつかのケースでは、ページはパターンの組み合わせを使用します。たとえば、
column drop と off canvas の組み合わせです。  これらのパターンは本来 [Luke
Wroblewski](http://www.lukew.com/ff/entry.asp?1514)によって認識され、
レスポンシブ ページの起点を提供します。

## パターン

シンプルで分かりやすいサンプルを作成するために、
以下の各サンプルは、
[`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)を使用して、実際のマークアップで作成されました。
一般的に 3 つのコンテンツ `div` はプライマリ コンテナの中に含まれています。
 各サンプルは、最初に最小のビューで書き始められ、ブレークポイント
が必要に応じて追加されました。  最新のブラウザ向けに [flexbox レウアウトは適切に
サポートされていますが](http://caniuse.com/#search=flexbox)最適なサポートのためには
ベンダーのプレフィックスがまだ必要です。


