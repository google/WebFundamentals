project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 네이티브 앱 설치 배너는 웹 앱 설치 배너와 비슷하지만, 홈 스크린에 추가하는 대신에 사용자가 사이트를 떠나지 않고도 네이티브 앱을 설치하도록 지원합니다.


{# wf_updated_on: 2015-09-29 #}
{# wf_published_on: 2014-12-16 #}

# 네이티브 앱 설치 배너 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

<figure class="attempt-right">
  <img src="images/native-app-install-banner.gif" alt="Native app install banner">
  <figcaption>네이티브 앱 설치 배너 흐름</figcaption>
</figure>


네이티브 앱 설치 배너는 웹 앱 설치 배너와 비슷하지만, 홈 스크린에 추가하는 대신에 사용자가 사이트를 떠나지 않고도 네이티브 앱을 설치하도록 지원합니다.

<div class="clearfix"></div>


## 배너를 표시하기 위한 조건

서비스워커가 필요한 부분을 제외하고는 네이티브 앱 설치 배너는 웹 앱 설치 배너와 비슷합니다.
사이트에서 아래의 항목을 포함해야 합니다:

* [web app manifest](/web/fundamentals/engage-and-retain/web-app-manifest/) 파일에 아래 속성이 포함되야 합니다:
  - `short_name`
  - 배너 실행창에서 사용될 `name`
  - 144x144 png 형식의 아이콘 (아이콘 정의에 mime type의 `image/png`를 꼭 지정)
  - 앱 정보를 포함하는 `related_applications`
* [HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https) 통신
* 이틀 동안 이주 동안 두 번 방문

## 매니페스트 요건 Manifest Requirements

매니페스트에서 플랫폼 항목에 `play`(Google Play) 와 App Id를 포함한 `related_applications` 을 추가합니다.


    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]
    

만약 앱을 안드로이드 앱으로 설치하는 기능만 제공하고 웹 앱 인스톨 배너는 표시하지 않으려면,
`"prefer_related_applications": true` 를 아래와 같이 추가합니다:


    "prefer_related_applications": true,
    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]
    
Translated By:
{% include "web/_shared/contributors/captainpangyo.html" %}
