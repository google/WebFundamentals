project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 大多數的網站並未針對多裝置體驗進行最佳化。快來瞭解基礎知識，讓您的網站適用於行動裝置、桌上型電腦或任何附有螢幕的裝置。

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# 回應式網頁設計基礎 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


透過行動裝置上網的使用者數量正以難以想像的速度暴增，但是大多數的網站並未針對行動裝置進行最佳化。礙於行動裝置的螢幕大小，開發人員必須針對行動裝置螢幕上的內容另行編排。


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




手機、平板手機、平板電腦、桌上型電腦、遊戲機、電視，甚至是穿戴式裝置的螢幕大小五花八門，各有不同。螢幕大小總是日新月異，因此您的網站如何在今日或未來隨時因應調整，顯得更為重要。

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

回應式網頁設計最早是由 [A List Apart 的 Ethan Marcotte](http://alistapart.com/article/responsive-web-design/) 所定義，這項設計可針對使用者的需求和其所使用的裝置做出回應。版面配置會隨著裝置的螢幕大小和功能變動。舉例來說，使用者在手機上會看到以一欄顯示的內容；在平板電腦上則會看到以兩欄顯示的相同內容。



