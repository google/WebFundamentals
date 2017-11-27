project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '192px 이상 아이콘이 포함된 매니페스트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# 192px 이상 아이콘이 포함된 매니페스트  {: .page-title }

## 감사가 중요한 이유 {: #why }

사용자가 홈 화면에 앱을 추가하면 휴대기기에서
표시할 아이콘이 필요합니다. 이 아이콘은 웹 앱 매니페스트의 `icons` 배열에서 지정됩니다.

192픽셀 아이콘은 대형 Android 기기에서도
아이콘이 표시될 수 있게 합니다. 작은 아이콘이 필요한 소형 기기의 경우, Android가
192픽셀 아이콘을 적절한 정확도로 축소합니다. 즉,
웹 앱 매니페스트에 더 작은 아이콘을 제공할 수 있지만
그렇게 할 필요는 없습니다.

## 감사를 통과하는 방법 {: #how }

192픽셀 아이콘을 웹 앱 매니페스트에 추가합니다.

    {
      ...
      "icons": [{
        "src": "images/homescreen192.png",
        "sizes": "192x192",
        "type": "image/png"
      }],
      ...
    }

앱에서 'Add to Homescreen'을 적절히 구현하고 테스트하는 방법을 안내하는 가이드 목록은 [매니페스트의 존재](manifest-exists#how)를
참조하세요.


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

이 감사는 아이콘이 Android 기기에 잘 표시되는지만 보장합니다.
다른 운영체제는 최적의 표현을 위해 다른 아이콘 크기가
필요할 수 있습니다.

Lighthouse는 매니페스트를 가져와서 `icons` 속성이
192픽셀 아이콘을 참조하는지 확인합니다. Lighthouse가 가져오는 매니페스트는
Chrome이 페이지에서 사용하는 것과 별개로,
부정확한 결과가 나올 수 있습니다. 또한, Lighthouse는
아이콘이 실제로 캐시에 존재하는지는 검사하지 않습니다. 웹 앱 매니페스트가
192픽셀 아이콘을 정의하는지만 확인합니다.


{# wf_devsite_translation #}
