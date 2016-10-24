project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 앱 인스톨 배너에는 web과 native 두가지 종류가 있습니다. 이 두가지 배너를 이용하면 웹이나 네이티브 앱에서 브라우저를 떠나지 않고도 홈 화면에 추가가 가능합니다.

{# wf_updated_on: 2016-02-11 #}
{# wf_published_on: 2014-12-16 #}

# 앱 인스톨 배너 이용하기 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

<figure class="attempt-right">
  <img src="images/add-to-home-screen.gif" alt="Web app install banner">
  <figcaption>웹 앱 설치 배너 플로우</figcaption>
</figure>


앱 인스톨 배너에는 <i>web</i>과 <i>native</i> 두가지 종류가 있습니다. 이 두가지 배너를 이용하면 웹이나 네이티브 앱에서 브라우저를 떠나지 않고도 홈 화면에 추가가 가능합니다.


"이거 정말 보기 좋네요! 제 사이트에 추가하고 싶어요."

"제발 어떻게 추가하는 지 알려주세요!"

앱 설치 배너를 추가하는 것은 쉽고, 크롬이 대부분의 일을 처리해줍니다. 당신이 해야 할 일은 앱의 상세 정보를 담고 있는 웹앱 메니페스트 파일을 포함시키는 것입니다.

크롬은 몇 가지 기준과 방문 빈도 발견법을 이용하여 언제 배너를 보일지 결정합니다. 더 자세한 사항이 안내되어 있습니다.

아래 조건을 만족하면 크롬 브라우저가 자동으로 배너를 표시해줍니다.

* [web app manifest](.)에 아래와 같은 설정이 들어가야 합니다:
  - 홈 스크린에서 사용될 `short_name`
  - 배너에서 사용될 `name`
  - 144x144 png 형식의 아이콘 (아이콘 정의에 mime type의 `image/png`를 꼭 지정)
  - 로드할 `start_url`
* 사이트 정보가 등록된 [service worker](/web/fundamentals/primers/service-worker/)
* [HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https) 통신으로 사이트가 제공되어야 합니다. (서비스워커 사용하려면 필요)
* 최소 두번 방문해야 하고, 방문 간에 최소 5분의 간격이 있어야 합니다.

## 앱 인스톨 배너 설치하기

앱 인스톨 배너는 사용자가 오분 안에 최소 2번은 방문해야만 화면에 표시됩니다.
방문 빈도를 없애려면 크롬 flag `#bypass-app-banner-engagement-checks` 을 활성화 합니다.
또 다른 크롬 flag `#enable-add-to-shelf` 값을 활성화 하여 데스크탑 크롬에서 테스트가 가능합니다.

그리고 나서, 매니페스트 파일을 제대로 구성하였고, HTTPS 통신을 이용하고, 서비스워커 까지 제대로 등록이 되었다면 아래에 인스톨 배너가 표시될 것입니다.


Translated By:
{% include "web/_shared/contributors/captainpangyo.html" %}
