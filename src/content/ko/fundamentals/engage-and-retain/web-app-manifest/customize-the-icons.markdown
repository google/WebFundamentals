---
title: "아이콘 개인화"
description: "사용자가 당신의 사이트를 홈스크린에 추가할 때, 브라우저에서 사용할 아이콘을 정의할 수 있습니다."
updated_on: 2016-02-12
translators:
  - captainpangyo
notes:
  icons: "홈 스크린에 아이콘을 저장할 때, 크롬은 화면 밀도에 맞는 아이콘을 먼저 찾습니다. 그리고 나서 48dp * 화면 밀도로 조정합니다. 만약 아무것도 찾지 못하면, 디바이스 특성과 가장 근접한 아이콘을 찾습니다. 어떤 이유에서든지 만약 특정 픽셀 밀도에 해당하는 아이콘을 설정하고 싶다면, 숫자 값을 갖는 <code>density</code> 멤버를 사용할 수 있습니다. 만약 밀도를 지정하지 않으면, 디폴트 값으로 1.0 을 갖습니다. 이는 “화면 밀도를 1.0 이상으로 갖는 아이콘을 사용합니다” 라는 일반적인 의미를 갖습니다."
---

사용자가 당신의 사이트를 홈스크린에 추가할 때, 브라우저에서 사용할 아이콘을 정의할 수 있습니다.
웹앱 아이콘의 타입, 크기, 추가적인 밀도를 아래와 같이 정의할 수 있습니다.

{% highlight json %}
"icons": [{
    "src": "images/touch/icon-128x128.png",
    "type": "image/png",
    "sizes": "128x128"
  }, {
    "src": "images/touch/apple-touch-icon.png",
    "type": "image/png",
    "sizes": "152x152"
  }, {
    "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
    "type": "image/png",
    "sizes": "144x144"
  }, {
    "src": "images/touch/chrome-touch-icon-192x192.png",
    "type": "image/png",
    "sizes": "192x192"
  }],
{% endhighlight %}

{% include shared/note.liquid list=page.notes.icons %}

<figure>
  <img src="images/homescreen-icon.png" alt="Add to Home Screen Icon">
  <figcaption>Add to Home Screen Icon</figcaption>
</figure>
