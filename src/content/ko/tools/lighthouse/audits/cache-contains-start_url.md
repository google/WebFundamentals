project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Cache contains start_url from manifest" Lighthouse audit.

{# wf_updated_on: 2017-02-04 #}
{# wf_published_on: 2016-09-15 #}

# Manifest의 start_url에서 캐시 포함 {: .page-title }

## 왜 이 검사가 중요한가 {: #why }

프로그레시브 웹 앱에서 오프라인 상태에서 모바일 기기 홈스크린에서 적절히 실행하게 합니다.

## 어떻게 이 검사를 통과하는가 {: #how }

1. `manifest.json` 파일에 `start_url` 속성을 정의합니다.
2. 서비스 워커가 적절히 캐시하는 리소스가 `start_url`의 값과 매치하는 지 확인합니다.

[웹 앱을 유저의 홈스크린에 추가하기](https://codelabs.developers.google.com/codelabs/add-to-home-screen)
를 보고 앱을 홈스크린에 추가하는 기본 방법을 익히세요.
이건 기존 앱에 "홈스크린에 추가" 기능을 추가하는 단계별 코드랩입니다.
이코드랩에서 배운 것을 사용하여 앱에 "홈스크린에 추가" 기능을 통합하십시오.

아래 Lighthouse 문서의"어떻게 이 검사를 통과하는가" 섹션을 보고,
오프라인에서 서비스 워커로 파일을 어떻게 캐시할 수 있는 지 자세한 도움말을 줍니다.
[URL responds with a 200 when offline](http-200-when-offline#how)

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

프로그레시브 웹 앱이 모바일 기기의 홈스크린에서 실행했을 때, 앱이 정의한 URL에서 열립니다.
이 URL은 앱의 `manifest.json` 파일의 `start_url` 속성에서 정의합니다.

이 검사는 `manifest.json`의 `start_url`의 값을 파싱하고
서비스 워커의 캐시에 캐시되는 것을 보장합니다.

**서비스 워커가 `start_url` 요청과 리디렉션 하는 경우, 이 검사는 정확하지 못한 결과가 발생할 수 있습니다.**

이 검사의 한가지 단점은 서비스 워커에서 `start_url`을 
해결하도록 요청하는 대신 캐시 내용을 직접 검사한다는 것입니다.
이는 서비스 워커가 캐시의 다른 리소스로 리디렉션하기 때문에
실제로는 성곡적으로 해결되는 시나이로에서도 `start_url`의 정확한 값과 일치하는 리소스가
캐시에 누락된 경우 false negative 결과를 낼 수 있습니다.
반대로 캐시에 `start_url`과 일치하는 리소스가 포함되어 있지만
서비스 워커가 요청을 존재하지 않는 리소스로 리디렉션하면
검사가 잘못된 결과를 생성할 수 있습니다.
