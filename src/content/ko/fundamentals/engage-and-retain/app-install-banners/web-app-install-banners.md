project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 당신의 앱이 요건을 모두 충족하면 크롬이 배너를 자동으로 표시할 것입니다.

{# wf_review_required #}
{# wf_updated_on: 2016-02-29 #}
{# wf_published_on: 2000-01-01 #}

# 인스톨 배너를 표시하기 위한 조건은 무엇인가요? {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}


Translated By: 

{% include "web/_shared/contributors/captainpangyo.html" %}



아래 조건을 만족하면 크롬 브라우저가 자동으로 배너를 표시해줍니다.

* [web app manifest](.)에 아래와 같은 설정이 들어가야 합니다:
  - 홈 스크린에서 사용될 `short_name`
  - 배너에서 사용될 `name`
  - 144x144 png 형식의 아이콘 (아이콘 정의에 mime type의 `image/png`를 꼭 지정)
  - 로드할 `start_url`
* 사이트 정보가 등록된 [service worker](/web/fundamentals/primers/service-worker/)
* [HTTPS](/web/fundamentals/security/encrypt-in-transit/) 통신으로 사이트가 제공되어야 합니다. (서비스워커 사용하려면 필요)
* 최소 두번 방문해야 하고, 방문 간에 최소 5분의 간격이 있어야 합니다.

## 앱 인스톨 배너 설치하기

앱 인스톨 배너는 사용자가 오분 안에 최소 2번은 방문해야만 화면에 표시됩니다.
방문 빈도를 없애려면 크롬 flag `#bypass-app-banner-engagement-checks` 을 활성화 합니다.
또 다른 크롬 flag `#enable-add-to-shelf` 값을 활성화 하여 데스크탑 크롬에서 테스트가 가능합니다.

그리고 나서, 매니페스트 파일을 제대로 구성하였고, HTTPS 통신을 이용하고, 서비스워커 까지 제대로 등록이 되었다면 아래에 인스톨 배너가 표시될 것입니다.
