project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on:2016-11-08 #}
{# wf_published_on:2016-11-08 #}

# 認証情報を保存する {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

`navigator.credentials.store()` API を使用すると、ユーザーの認証情報を簡単に保存およびアップデートできます。



##  ユーザーの認証情報を保存する

ユーザーが適切にサインアップ、ログイン、またはパスワードを変更したあとに、ユーザーの認証情報を保存またはアップデートできます。


###  ユーザー名とパスワードの詳細を保存する

重要なポイント: 新しい `PasswordCredential` オブジェクトを作成し、`navigator.credentials.store()` を使って保存します。


ユーザーがログインしたあと、ユーザーの認証情報を確認したら、新しい [`PasswordCredential`](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential) オブジェクトを作成し、そのオブジェクトを `navigator.credentials.store()` に渡して保存します。



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
  <figcaption>ユーザーへの自動ログインの確認通知</figcaption>
</figure>

Chrome ブラウザで認証情報を取得すると、認証情報（またはフェデレーション プロバイダ）を保存するか確認する通知がポップアップ表示されます。



<div class="clearfix"></div>

###  フォームからユーザー名とパスワードを保存する

重要なポイント: 適切なアノテーションが付けられたフォームを使用すると、簡単に新しい `PasswordCredential` オブジェクトを作成し、`navigator.credentials.store()` で保存できます。


`PasswordCredential` を手動で作成するほか、[適切なアノテーションが付けられた](https://html.spec.whatwg.org/multipage/forms.html#autofill) `form` 要素を `PasswordCredential` に渡すことができます。



次に例を示します。

    <form id="form" method="post">
      <input type="text" name="id" autocomplete="username" />
      <input type="password" name="password" autocomplete="current-password" />
      <input type="hidden" name="csrf_token" value="*****" />
    </form>

その後、参照を form 要素に渡して、新しい `PasswordCredential` オブジェクトを作成します。


    var form = document.querySelector('#form');
    var cred = new PasswordCredential(form);
    // Store it
    navigator.credentials.store(cred)
    .then(function() {
      // continuation
    });

フォームの追加フィールドは、`.additionalData` パラメータの一部として `PasswordCredential` に自動的に追加されます。



##  フェデレーション アカウントの認証情報を保存する

重要なポイント: 新しい `FederatedCredential` オブジェクトを作成し、`navigator.credentials.store()` を使って保存します。



フェデレーション アカウントの詳細を保存するには、ユーザーの ID とプロバイダの ID を使って [`FederatedCredential`](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential) オブジェクトのインスタンスを作成します。
その後、`navigator.credentials.store()` を呼び出して認証情報を保存します。


次に例を示します。

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
      <th colspan=2>パラメータ</th>
    </tr>
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        <code>string</code><br>
        ID プロバイダ固有の認証フローを呼び出すためのユーザー ID。通常は OAuth の  <code>login_hint</code> の値です。</td>
    </tr>
    <tr>
      <td>
        <code>provider</code>
      </td>
      <td>
        <code>string</code><br>
        プロバイダでログインに使用するオリジンの ASCII 直列化。
        たとえば、Facebook は  <code>https://www.facebook.com</code>、Google は  <code>https://accounts.google.com</code> で表されます。</td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>string</code>（任意）<br>
        ID プロバイダから取得されます。</td>
    </tr>
    <tr>
      <td>
        <code>iconURL</code>
      </td>
      <td>
        <code>string</code>（任意）<br>
        ID プロバイダから取得されます。</td>
    </tr>
  </tbody>
</table>



{# wf_devsite_translation #}
