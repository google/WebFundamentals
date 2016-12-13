---
title: "매니페스트 추가하기"
description: "푸쉬 알람 구성정보를 제공하기 위한 매니페스트 파일을 추가합니다."
notes:
  styling:
    - Styling will come later
updated_on: 2015-09-28
translators:
  - captainpangyo
---

{% include shared/toc.liquid %}

이 단계의 완성된 버전은 completed/step5 디렉토리에 들어 있습니다.

메니페스트 파일은 푸쉬 알람 구성정보를 비롯한 웹 정보들이 포함된 JSON 파일입니다.

## 1. 메니페스트 파일 생성하기

_app_ 디렉토리의 가장 상위레벨에서, _manifest.json_ 이름의 파일을 생성하세요. (원하면 파일 이름을 변경해도 됩니다)

아래 코드들을 포함하세요. _gcm\_sender\_id_ 값은 이전 단계에서 저장한 Project Number 여야 합니다.

{% highlight json %}
{
  "name": "Push Notifications codelab",
  "gcm_sender_id": "593836075156"
}
{% endhighlight %}

웹 메니페스트 파일 옵션에는 *앱 아이콘 설정* 과 *모바일 홈 스크린에 추가* 등의 유용한 기능들이 있습니다.

더 자세한 정보는 다음의 Web Fundamental 기사를 참고하세요. [Installable Web Apps](/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android)

## 2. 브라우저에 웹 앱에서 사용할 매니페스트 파일 위치 알리기

이전 단계에서 생성한 _index.html_ 의 head 요소에 아래의 내용을 추가합니다:

{% highlight html %}
<link rel="manifest" href="manifest.json">
{% endhighlight %}
