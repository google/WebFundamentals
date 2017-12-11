project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-11-08 #}
{# wf_published_on: 2016-11-08 #}

# 인증 정보 저장 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

`navigator.credentials.store()` API를 사용하면 사용자 인증 정보를 
손쉽게 저장하고 업데이트할 수 있습니다.


## 사용자 인증 정보 저장

사용자가 등록, 로그인 또는 비밀번호 변경에 성공한 후,
사용자의 인증 정보를 저장하거나 업데이트하세요.

### 사용자 이름 및 비밀번호 세부정보 저장

핵심 사항: 새로운 `PasswordCredential` 객체를 생성하고 
`navigator.credentials.store()`로 저장합니다.

사용자가 로그인하고 개발자 쪽에서 해당 사용자 인증 정보를 확인했으면, 새로운
[`PasswordCredential`](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential)
객체를 생성하고 `navigator.credentials.store()`로 전달하여 저장합니다.

    // After a successful sign-in, sign-up or password change,
    // Instantiate a `PasswordCredential` object
    var c = new PasswordCredential({
      id:       id,
      password: password,
      name:     name,
      iconrURL: iconUrl
    });

    // Store the credential
    navigator.credentials.store(c)
    .then(function() {
      // done
    });


<figure class="attempt-right">
  <img src="imgs/store-credential.png">
  <figcaption>자동으로 로그인된 사용자에 대한 알림</figcaption>
</figure>

Chrome 브라우저에서 인증 정보를 입력하면
그 정보나 페더레이션 제공자를 저장할지 묻는
알림 메시지가 나타납니다.

<div class="clearfix"></div>

### 양식에서 사용자 이름과 비밀번호 저장

핵심 사항: 충실하게 주석이 달린 양식을 사용하여 쉽게 `PasswordCredential`
객체를 생성하고 `navigator.credentials.store()`를 사용해 저장합니다.

`PasswordCredential`의 수동 생성 외에,
[충실하게 주석이 달린](https://html.spec.whatwg.org/multipage/forms.html#autofill)
`form` 요소를 단순히 `PasswordCredential`로 전달할 수도 있습니다.

예:

    <form id="form" method="post">
      <input type="text" name="id" autocomplete="username" />
      <input type="password" name="password" autocomplete="current-password" />
      <input type="hidden" name="csrf_token" value="*****" />
    </form>

그런 다음, 양식 요소로 참조를 전달하여 새로운 `PasswordCredential` 객체를
생성합니다.

    var form = document.querySelector('#form');
    var cred = new PasswordCredential(form);
    // Store it
    navigator.credentials.store(cred)
    .then(function() {
      // continuation
    });

모든 추가 양식 필드는 `.additionalData` 매개변수의 일부로
`PasswordCredential`에 자동으로 추가됩니다.


## 페더레이션된 계정에 대한 사용자 인증 정보 저장

핵심 사항: 새로운 `FederatedCredential` 객체를 생성하고 
`navigator.credentials.store()`로 저장합니다.


페더레이션된 계정 세부정보를 저장하려면
사용자의 ID와 제공자의 ID로 새로운 [`FederatedCredential`](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential)
객체를 인스턴스화하세요. 그런 다음,
`navigator.credentials.store()`를 호출하여 사용자 인증 정보를 저장하세요.

예:

    // After a successful federation, instantiate a FederatedCredential
    var cred = new FederatedCredential({
      id:       id,                           // id in IdP
      provider: 'https://account.google.com', // A string representing IdP
      name:     name,                         // name in IdP
      iconURL:  iconUrl                       // Profile image url
    });

    // Store it
    navigator.credentials.store(cred)
    .then(function() {
      // continuation
    });

<table class="responsive properties">
  <tbody>
    <tr>
      <th colspan=2>매개변수</th>
    </tr>
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        <code>string</code><br>
        ID 제공자에 따른 특정한 인증 흐름을 호출할 때의
        사용자 ID(보통은 OAuth에서  <code>login_hint</code>에
        대한 값)입니다.
      </td>
    </tr>
    <tr>
      <td>
        <code>제공자</code>
      </td>
      <td>
        <code>string</code><br>
        제공자가 로그인을 위해 사용하는 출처를 일련의 ASCII 문자로 나타낸 것입니다.
        예를 들어, Facebook은 
        <code>https://www.facebook.com</code>으로, Google은 
        <code>https://accounts.google.com</code>으로 표시됩니다.
      </td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>string</code>(선택 항목)<br>
        ID 제공자로부터 가져옵니다.
      </td>
    </tr>
    <tr>
      <td>
        <code>iconURL</code>
      </td>
      <td>
        <code>string</code>(선택 항목)<br>
        ID 제공자로부터 가져옵니다.
      </td>
    </tr>
  </tbody>
</table>



{# wf_devsite_translation #}
