---
title: "レスポンシブ ウェブデザインの基礎"
description: "ほとんどのウェブサイトは、マルチデバイスのエクスペリエンスに最適化されていません。モバイルやパソコンのほか、画面を持つすべてのデバイスでサイトを正しく表示できるようにするための基礎を学びます。"
updated_on: 2014-04-30
key-takeaways:
  set-viewport:
    - meta viewport タグを使用して、ブラウザのビューポートの幅とスケーリングを制御する。
    - <code>width=device-width</code> を追加して、画面の幅をデバイス非依存ピクセルに合わせる。
    - <code>initial-scale=1</code> を追加して、CSS ピクセルとデバイス非依存ピクセルの間に 1:1 の関係を確立する。
    - ユーザーによるスケーリングを無効にせず、ページに確実にアクセスできるようにする。
  size-content-to-vp:
    - 大きな固定幅の要素を使用しない。
    - コンテンツを正しくレンダリングするうえで、特定のビューポートの幅に依存しないようにする。
    - CSS メディア クエリを使用して、小さい画面と大きい画面で異なるスタイルを適用する。
  media-queries:
    - メディア クエリを使用して、デバイスの特性に基づいてスタイルを適用できる。
    - <code>min-device-width</code> ではなく <code>min-width</code> を使用して、広範な環境を確実にサポートする。
    - レイアウトの崩れを防ぐため、要素に相対サイズを使用する。
  choose-breakpoints:
    - コンテンツに基づいたブレークポイントを作成する。特定のデバイス、製品、ブランドは基準にしない。
    - まず最初に最も小さい携帯端末向けにデザインし、そのうえで、画面上で利用できるスペースの増加に応じて段階的にエクスペリエンスを広げる。
    - テキスト行の最大文字数は 70～80 文字程度に収める。
notes:
  use-commas:
    - 属性の区切りにはカンマを使用して、古いブラウザでも属性を正確に解釈できるようにする。
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple19
udacity:
  id: ud893
  title: Responsive Web Design Fundamentals
  description: "Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more."
  image: imgs/udacity-rwd.png
---
<p class="intro">
  携帯端末からのウェブへのアクセスは急増し続けていますが、ウェブサイトのほとんどはそうした携帯端末向けに最適化されていません。多くの場合、携帯端末はディスプレイのサイズによる制約を受けるため、画面上でのコンテンツの配置の仕方には別のアプローチが必要です。
</p>


{% comment %}
{% ytvideo oK09n_PGhTo %}
{% endcomment %}

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}


携帯電話、「ファブレット」、タブレット、パソコン、ゲーム機、テレビ、そしてウェアラブルに至るまで、数多くの画面サイズが存在します。画面サイズは常に変わり続けているため、現在だけでなく将来のあらゆる画面サイズに対応できるウェブサイトを構築することが重要です。

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

レスポンシブ ウェブデザイン（[A List Apart の Ethan Marcotte](http://alistapart.com/article/responsive-web-design/)（リンク先は英語）が最初に定義）によって、ユーザーとその使用デバイスのニーズに対応することができます。デバイスのサイズと機能に基づいてレイアウトが変化します。たとえば、携帯電話ではコンテンツが 1 カラムのビューで表示され、タブレットでは同じコンテンツが 2 カラムで表示されます。



