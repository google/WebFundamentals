---
layout: article
title: "브라우저 UI 숨기기"
description: "사용자는 사이트를 특수 코드 없이 홈 화면에 추가할 수 있지만, 홈 화면에서 실행할 때 브라우저 UI 없이 웹 앱이 표시되도록 개발하는 것이 좋습니다(전체 화면으로 표시)."
introduction: "사용자는 사이트를 특수 코드 없이 홈 화면에 추가할 수 있지만, 홈 화면에서 실행할 때 브라우저 UI 없이 웹 앱이 표시되도록 개발하는 것이 좋습니다(전체 화면으로 표시)."
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 2
id: hide-browser-ui
collection: stickyness
authors:
  - pbakaus
  - mattgaunt
collection: stickyness
---

{% wrap content %}

다음 코드를 페이지의 `<head>`에 추가합니다.

{% highlight html %}
<meta name="apple-mobile-web-app-capable" content="yes">
{% endhighlight %}


이 코드는 웹 앱을 처리하고 있음을 Mobile Safari에 
알립니다.

Internet Explorer에서는 사이트가 기본적으로 전체 화면으로 
실행되므로 이에 대한 지시가 필요하지 않습니다.

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/web-app-capable.png" alt="web-app-capable">
        
        <figcaption>Web App Capable 메타 태그가 지정된 사이트 실행</figcaption>
    </figure>
</div>

<div class="clear"></div>

{% include modules/nextarticle.liquid %}

{% endwrap %}
