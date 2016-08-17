---
title: "실행 유형 설정하기"
description: "웹 앱 매니페스트 파일을 사용하여 화면 유형과 페이지 오리엔테이션을 제어합니다."
updated_on: 2016-02-12
translators:
  - captainpangyo
---

웹 앱 매니페스트 파일을 사용하여 화면 유형과 페이지 오리엔테이션을 제어합니다.

{% include shared/toc.liquid %}

## 화면 유형 개인화 하기

`display` 타입을 `standalone`으로 설정하면 웹앱에서 브라우저 UI를 숨길 수 있습니다.

{% highlight json %}
"display": "standalone"
{% endhighlight %}

사용자가 만약 당신의 페이지를 브라우저의 일반 사이트로 보고 싶다는 생각이 든다면,
`display` 를 `browser` 로 지정하면 됩니다.

{% highlight json %}
"display": "browser"
{% endhighlight %}

<figure>
  <img src="images/manifest-display-options.png" alt="web-app-capable">
  <figcaption>Manifest Display Options</figcaption>
</figure>

## 페이지의 초기 오리엔테이션 지정하기

게임과 같은 앱 처럼 특정 오리엔테이션에서 혜택이 더 많을 경우, 그 오리엔테이션을 지정할 수 있습니다.
오리엔테이션을 선택적으로 적용해보세요. 사용자는 오리엔테이션을 선택하는 것을 선호합니다.

{% highlight json %}
"orientation": "landscape"
{% endhighlight %}

<figure>
  <img src="images/manifest-orientation-options.png" alt="Web App Manifest Orientation Options">
  <figcaption>Web App Manifest Orientation Options</figcaption>
</figure>
