---
title: "Create the Manifest"
description: "웹 앱 매니페스트 파일을 자세히 알아보기 전에 기본적인 매니페스트 파일을 생성하고 웹 페이지에 추가해봅니다."
updated_on: 2015-02-12
translators:
  - captainpangyo
---

웹 앱 매니페스트 파일을 자세히 알아보기 전에 기본적인 매니페스트 파일을 생성하고 웹 페이지에 추가해봅니다.

{% include shared/toc.liquid %}

## 매니페스트 파일 생성하기

매니페스트 파일은 원하면 언제든지 호출이 가능합니다. 대부분의 사람들은 보통 아래와 같은 `manifest.json` 파일을 사용합니다.

{% highlight json %}
{
  "short_name": "AirHorner",
  "name": "Kinlan's AirHorner of Infamy",
  "icons": [
    {
      "src": "launcher-icon-1x.png",
      "type": "image/png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-2x.png",
      "type": "image/png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-4x.png",
      "type": "image/png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html?launcher=true"
}
{% endhighlight %}

매니페스트 파일의 속성 중 `short_name`는 사용자의 홈스크린에 표시될 텍스트를 의미합니다. 그리고 `name` 는 웹 앱 설치 배너에 사용됩니다.

## 시작 URL 설정하기

`start_url` 속성을 추가하지 않으면 현재 페이지가 사용됩니다. 이 방식은 사용자가 원하지 않는 방향이죠.
하지만 이게 추가해야 할 유일한 이유는 아닙니다. 이 방법으로 당신은 앱이 어떻게 실행되는 지 정의할 수 있기 때문에,
어떻게 시작되었는지 알 수 있는 쿼리 스트링 파라미터를 `start_url` 에 추가할 수 있습니다. 예를 들면:

{% highlight json %}
"start_url": "/index.html?homescreen=1"
{% endhighlight %}

## 매니페스트 파일 정보를 브라우저에 등록하기

일단 매니페스트 파일을 생성하고 사이트에 등록하면, `link` 태그를 이용해서 앱의 모든 페이지에 다음과 같이 추가합니다:

{% highlight html %}
<link rel="manifest" href="/manifest.json">
{% endhighlight %}
