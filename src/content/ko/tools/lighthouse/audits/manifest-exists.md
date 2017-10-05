project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '매니페스트의 존재' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

# 매니페스트의 존재  {: .page-title }

## 감사가 중요한 이유 {: #why }

웹 앱 매니페스트는 웹 앱을 사용자의 홈 화면에 추가해주는
웹 기술입니다. 이 기능은 일반적으로 'Add to Homescreen(A2HS)'이라고 부릅니다.


## 감사를 통과하는 방법 {: #how }

기존 애플리케이션에 A2HS 지원을 추가하는 단계별 실습 가이드는
코드랩: [웹 앱을
사용자 홈 화면에 추가](https://codelabs.developers.google.com/codelabs/add-to-home-screen)를 참조하세요.

웹 앱 매니페스트에 대해 심층적으로 다루는, 좀 더 느슨한 구조의 가이드는
[웹 앱 매니페스트로 사용자 환경
개선](/web/fundamentals/engage-and-retain/web-app-manifest)을 참조하세요.

이 가이드에서 배운 내용을 활용하여 웹 앱에서 A2HS 지원을 추가해보세요.


Chrome DevTools에서 A2HS 이벤트를 테스트할 수 있습니다. 자세한 내용은
[웹 앱
매니페스트](/web/tools/chrome-devtools/debug/progressive-web-apps/#manifest) 섹션을 참조하세요.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 매니페스트를 가져와서 데이터가 있는지 확인합니다. Lighthouse가 가져오는 매니페스트는
Chrome이 페이지에서 사용하는 것과 별개로, 부정확한 결과가 나올 수 있습니다.



{# wf_devsite_translation #}
