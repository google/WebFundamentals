---
title: "스플래쉬 스크린 추가하기"
description: "To provide a better user experience you can replace the white launch screen with a title, color, and images."
updated_on: 2016-02-12
translators:
  - captainpangyo
---

{% include shared/toc.liquid %}

홈 화면에서 웹 앱을 실행할 때 화면 뒤쪽에서 몇가지 일들이 발생합니다:

1. 크롬이 실행됩니다.
2. 페이지 시작을 표시하는 renderer가 실행됩니다.
3. 네트워크로 사이트를 로드하거나 서비스워커가 있으면 캐쉬로 로딩합니다.

상기 작업들이 일어나는 동안 화면은 하얗게 보여서 아마 지연되는 것으로 보일 것입니다.
만약 이 웹 앱을 홈페이지에 보일 페이지당 1초에서 2초가 걸리는 네트워크 환경에서 로딩하는 경우 더 그렇게 보입니다.

더 나은 사용자 경험을 제공하기 위해서 이 하얀색 화면을 제목, 색깔, 이미지 등으로 대체할 수 있습니다.

## 이미지와 제목 설정하기

만약 이 튜토리얼을 처음부터 보셨다면, 이미 이미지와 제목을 설정하셨을 겁니다. 크롬은 매니페스트 파일의 지정된 멤버들로 이미지와 제목을 추론합니다.
여기서 중요한 점은 구체적으로 아는 것입니다.

스플래쉬 스크린 이미지는 `icons` 배열에서 도출됩니다. 크롬은 디바이스를 위해 128dp 에 근접한 이미지를 선택합니다. 제목은 `name` 멤버에서 지정한 값으로 생성됩니다.

## 배경 색 지정하기

`background_color` 속성을 이용하여 배경색을 설정합니다.
웹 앱이 실행되는 즉시 크롬에서 이 색으로 정하여, 첫 렌더링이 될 때 까지 화면에 남아있습니다.

배경색을 설정하기 위해서는 아래와 같이 매니페스트 파일을 설정합니다.

{% highlight json %}
"background_color": "#2196F3",
{% endhighlight %}

이제는 홈 화면에서 사이트를 실행해도 더이상 하얀 화면이 존재하지 않습니다.

이 속성에 권고되는 값은 로딩 페이지의 배경 색입니다. 로딩 페이지와 같은 색을 사용함으로써 스플래쉬 스크린과 홈페이지 사이의 화면을 부드럽게 전환할 수 있습니다.

<figure>
  <img src="images/background-color.gif" alt="backgroud color" style="max-height: 550px;">
  <figcaption>Background color for launch screen</figcaption>
</figure>

## 테마 색 지정하기

`theme_color` 속성을 이용하여 테마 색을 지정합니다. 이 속성은 툴바의 색깔을 지정합니다.
기존의 `<meta>` 값을 `theme-color` 에 중복하여 사용하기를 추천합니다.
