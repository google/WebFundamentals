project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 很多网页都没有针对这些跨设备体验进行优化。学习相关基础知识，创建在移动设备、桌面设备或带有屏幕的任意设备上均可运行的网站。

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# 自适应网页设计基础知识 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


使用移动设备上网的用户数量激增，遗憾的是，很多网页并未针对移动设备进行优化。移动设备通常会受到显示屏大小限制，因此需要通过不同的方式将内容呈现在屏幕上。


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




手机、"超大屏智能手机"、平板电脑、桌面设备、游戏机、电视和穿戴式设备的屏幕尺寸各异。屏幕尺寸将会不断变化，因此您的网站应能够适应当今或未来的所有屏幕尺寸，这一点很重要。

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

自适应网页设计（这一概念最初是由 [Ethan Marcotte 在'A List Apart'中](http://alistapart.com/article/responsive-web-design/)提出的）回应了用户及其所用设备的需求。版式会因根据设备的大小和功能而变化。例如，手机可能会以单列视图的形式呈现内容，而同样的内容可能会以双列的形式呈现在平板电脑上。



