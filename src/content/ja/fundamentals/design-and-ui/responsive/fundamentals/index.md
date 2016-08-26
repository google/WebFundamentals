project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ほとんどのウェブサイトは、マルチデバイスのエクスペリエンスに最適化されていません。モバイルやパソコンのほか、画面を持つすべてのデバイスでサイトを正しく表示できるようにするための基礎を学びます。

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# レスポンシブ ウェブデザインの基礎 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


携帯端末からのウェブへのアクセスは急増し続けていますが、ウェブサイトのほとんどはそうした携帯端末向けに最適化されていません。多くの場合、携帯端末はディスプレイのサイズによる制約を受けるため、画面上でのコンテンツの配置の仕方には別のアプローチが必要です。


{% comment %}
<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="oK09n_PGhTo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>
{% endcomment %}


## Responsive Web Design Fundamentals
<!-- TODO: Verify Udacity course fits here -->
<div class="attempt-right">
  <figure>
    <img src="imgs/udacity-rwd.png">
  </figure>
</div>

Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more.

[View Course](https://udacity.com/ud893){: .external }




携帯電話、「ファブレット」、タブレット、パソコン、ゲーム機、テレビ、そしてウェアラブルに至るまで、数多くの画面サイズが存在します。画面サイズは常に変わり続けているため、現在だけでなく将来のあらゆる画面サイズに対応できるウェブサイトを構築することが重要です。

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

レスポンシブ ウェブデザイン（[A List Apart の Ethan Marcotte](http://alistapart.com/article/responsive-web-design/)（リンク先は英語）が最初に定義）によって、ユーザーとその使用デバイスのニーズに対応することができます。デバイスのサイズと機能に基づいてレイアウトが変化します。たとえば、携帯電話ではコンテンツが 1 カラムのビューで表示され、タブレットでは同じコンテンツが 2 カラムで表示されます。



