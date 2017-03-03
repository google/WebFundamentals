project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-11-08 #}
{# wf_published_on: 2016-11-08 #}

# Credential Management API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

[Credential Management API](https://www.w3.org/TR/credential-management/)는
여러 기기 간에 원활한 로그인을
위해 사이트와 브라우저 사이에서 프로그래밍 방식의 인터페이스를 제공하고 로그인 흐름이 막히지 않도록 해주는
표준 기반 브라우저 API입니다.

<div class="attempt-right">
  <figure>
    <video src="animations/credential-management-smaller.mov" style="max-height: 400px;" autoplay muted loop controls></video>
    <figcaption>사용자 로그인 흐름</figcaption>
  </figure>
</div>

Credential Management API:

* **로그인 흐름을 단순하게** - 세션이 만료되었더라도 사용자를 사이트에 
  다시 자동으로 로그인 상태로 전환할 수 있습니다.
* **계정 선택기를 사용해 한 번의 탭으로 로그인 가능** - 로그인 양식을 제거한
  기본 계정 선택기가 표시됩니다.
* **인증 정보 저장** - 사용자 이름과 비밀번호 조합 또는 페더레이션된 계정
  세부정보를 저장할 수 있습니다.

실제 사례를 보고 싶으세요? [Credential
Management API 데모](https://credential-management-sample.appspot.com)를
사용해보고
[코드](https://github.com/GoogleChrome/credential-management-sample)도 살펴보세요.

<div class="clearfix"></div>


## Credential Management 구현 절차

Credential Management
API를 성공적으로 통합하는 방법이 많이 있고
통합의 구체적인 사항은 사이트의 구조와 사용자 환경에 따라 다르지만, 이 흐름을 사용하는 사이트에는 다음과 같은 사용자 환경 관련 장점이
있습니다.

* 브라우저에 사용자 인증 정보를 하나만 저장한 기존 서비스 사용자를 즉시
  로그인시켜 인증이 완료되자마자 로그인된 페이지로
  리디렉션합니다.
* 여러 사용자 인증 정보를 저장했거나 자동 로그인을 비활성화한
  사용자는 한 대화상자에 답해야 웹사이트의 로그인된
  페이지로 이동할 수 있습니다.
* 사용자가 로그아웃하면 웹사이트에서는 그 사용자를 자동으로 다시 로그인시키지
  않습니다.

핵심 사항: Credential Management API를 사용하려면 안전한 출처에서 페이지를
제공해야 합니다.

### 사용자 인증 정보 검색과 로그인

사용자를 로그인시키려면 브라우저의 비밀번호 관리자에서
검색한 인증 정보를 사용하여 사용자 로그인을 수행합니다.

예:

1. 사용자가 사이트를 방문할 때 로그인된 상태가 아니라면 
   `navigator.credential.get()`을 호출합니다.
2. 검색한 사용자 인증 정보를 사용하여 사용자 로그인을 진행합니다.
3. 사용자가 로그인되었음을 나타내도록 UI를 업데이트합니다.

[인증 정보 검색](/web/fundamentals/security/credential-management/retrieve-credentials)에서
자세한 내용을 확인할 수 있습니다.

### 사용자 인증 정보 저장 또는 업데이트

사용자가 사용자 이름과 비밀번호로 로그인한 경우:

1. 사용자가 올바르게 로그인하거나 계정을 만들거나 비밀번호를 변경한 후,
   사용자 ID와 비밀번호로 `PasswordCredential`을
   생성합니다.
2. `navigator.credentials.store()`를 사용하여 인증 정보 객체를 저장합니다.


사용자가 Google
Sign-In, Facebook, GitHub 등과 같이 페더레이션된 ID 제공자를 이용해 로그인한 경우:

1. 사용자가 올바르게 로그인하거나 계정을 만들거나 비밀번호를 변경한 후,
   사용자의 이메일 주소를 ID로 삼아 `FederatedCredential`을
   생성하고 `.provider`로 ID 제공자를 지정합니다. 
2. `navigator.credentials.store()`를 사용하여 인증 정보 객체를 저장합니다.

[인증 정보 저장](/web/fundamentals/security/credential-management/store-credentials)에서
자세한 내용을 확인할 수 있습니다.

### 로그아웃

사용자가 로그아웃하면 `navigator.credentials.requireUserMediation()`을
호출하여 사용자가 자동으로 다시 로그인되지 않도록 합니다.

또한, 자동 로그인을 비활성화하면 사용자가 로그인 정보를 다시 입력할 필요 없이
예컨대 업무용 계정과 개인용 계정 사이, 또는 공유 기기의
계정들 사이에서 손쉽게 전환할 수 있습니다.

[로그아웃](/web/fundamentals/security/credential-management/retrieve-credentials#sign-out)에서
자세한 내용을 확인할 수 있습니다.


## 추가 자료

[MDN의 Credential Management API](https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API)


{# wf_devsite_translation #}
