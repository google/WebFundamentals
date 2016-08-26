project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 웹 앱 매니페스트 파일은 네이티브 앱에서 볼법한 당신이 어떻게 웹 앱을 제어하고 사용자에게 사이트를 어떻게 표현하는지의 기능들을 제공하는 JSON 파일입니다. 예를 들어, 모바일 홈스크린을 어떻게 실행하고 어떤 것을 나타낼지 정의가 가능합니다.

{# wf_review_required #}
{# wf_updated_on: 2016-02-11 #}
{# wf_published_on: 2016-02-11 #}

# 웹 앱 매니페스트 파일로 사용자 경험 향상시키기 {: .page-title }

{% include "_shared/contributors/mattgaunt.html" %}
{% include "_shared/contributors/paulkinlan.html" %}


Translated By: 

{% include "_shared/contributors/captainpangyo.html" %}



[웹 앱 매니페스트 파일](https://developer.mozilla.org/en-US/docs/Web/Manifest)은 네이티브 앱에서 볼법한 당신이 어떻게 웹 앱을 제어하고 사용자에게 사이트를 어떻게 표현하는지의 기능들을 제공하는 JSON 파일입니다. 예를 들어, 모바일 홈스크린을 어떻게 실행하고 어떤 것을 나타낼지 정의가 가능합니다.

웹 앱 매니페스트 파일은 사이트의 즐겨찾기 기능으로 모바일의 홈 스크린에 아이콘을 추가할 수 있는 기능을 제공합니다. 아래와 같은 환경에서 사이트가 실행되는 경우에 사용할 수 있습니다:

* 독자적인 아이콘과 이름으로 사용자가 다른 사이트와 구분할 수 있어야 합니다
* 리소스가 다운로드 되거나 캐쉬가 되는 동안 사용자에게 무언가를 보여줄 수 있어야 합니다
* 사이트의 리소스가 준비가 되었을 때, 브라우저에 매우 급작스러운 변화를 피할 수 있는 기본 디스플레이 속성 값들을 제공해야 합니다.

위 목록은 텍스트 파일 안의 메타데이터의 간단한 메커니즘을 통해 가능합니다. 이게 바로 웹 앱 매니페스트 파일입니다.

<!-- TODO: Verify note type! -->
Note: Though you can use a web app manifest on any site, they are required for <a href='/web/progressive-web-apps'>progressive web apps</a>.
