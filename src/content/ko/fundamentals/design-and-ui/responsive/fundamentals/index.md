project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 상당히 많은 웹들이 여러 디바이스 사용성을 고려하여 최적화 되어 있지 않다. 당신의 사이트를 모바일, 데스크탑 또는 어떠한 스크린에서도 동작할 수 있도록 기본을 배워보자

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# 반응형 웹 디자인 기본 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Translated By: 

{% include "_shared/contributors/captainpangyo.html" %}



웹 서핑을 위한 모바일 기기의 사용은 천문학 적인 속도로 증가하고 있지만, 안타깝게도 많은 웹 사이트들이 모바일 기기를 위한 최적화가 되어 있지 않다. 모바일 기기들은 보통 화면 크기에 제약이 있고, 화면에 어떤식으로 내용들을 나타낼지에 대한 접근방식이 다르다.

패블릿, 태블릿, 데스크탑, 게임콘솔, 티비, 웨어러블 기기 등등 정말 다양한 화면 크기가 있습니다. 화면 크기는 언제나 변하기 때문에 당신의 사이트는 어떤 화면 크기에도 언제나 적응 가능하도록 설계되어야 합니다.

{% comment %}
{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}
{% endcomment %}

원래 [Ethan Marcotte in A List
Apart](http://alistapart.com/article/responsive-web-design/) 에 정의된 반응형 웹 디자인은 그들이 사용하는 기기와 사용자의 니즈에 맞춰졌습니다. 레이아웃은 기기의 특징과 크기에 따라 변합니다. 예를 들어, 핸드폰에서 사용자들이 컨텐츠를 1줄 뷰로 본다면, 태블릿에서는 2줄 뷰로 컨텐츠를 보는 것처럼 말이죠.
