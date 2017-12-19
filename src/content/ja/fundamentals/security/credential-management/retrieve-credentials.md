project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on:2016-11-08 #}
{# wf_published_on:2016-11-08 #}

# 認証情報を取得する {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Warning: 本翻訳記事公開後仕様が大幅に変更されています。[英語版](?hl=en)をご確認頂くか、変更点を[こちらから](/web/updates/2017/06/credential-management-updates)ご確認ください。

ユーザーのログインを実行するには、ブラウザのパスワード マネージャーから認証情報を取得し、その情報を使用してログイン処理を行う必要があります。


ユーザーの認証情報を取得するには、認証オブジェクトを引数に指定して解決される Promise を返す `navigator.credentials.get()` を使用します。取得される認証オブジェクトは、[`PasswordCredential`](#authenticate_with_a_server) または [`FederatedCredential`](#authenticate_with_an_identity_provider) のいずれかです。
認証情報が存在しない場合は、`null` が返されます。


    navigator.credentials.get({
      password: true,
      unmediated: false,
      federated: {
        providers: [
          'https://account.google.com',
          'https://www.facebook.com'
        ]
      }
    }).then(function(cred) {
      if (cred) {
        // Use provided credential to sign user in  
      }
    });


###  `navigator.credentials.get` パラメータ{: .hide-from-toc }

<table class="responsive properties">
  <tbody>
    <tr>
      <th colspan=2>パラメータ</th>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>Boolean</code><br>
         <code>true</code> に設定すると  <code>PasswordCredentials</code> を取得します。
        既定値は  <code>false</code> です。</td>
    </tr>
    <tr>
      <td>
        <code>federated</code>
      </td>
      <td>
        <code>Object</code><br>
         <code>provider</code> または  <code>protocol</code> をキーとして受け取るオブジェクト。パラメータの配列が含まれます。
         <code>provider</code> オブジェクトには
        プロバイダを識別する文字列配列を指定します。現在、 <code>protocol</code> を実装しているブラウザはありません。</td>
    </tr>
    <tr>
      <td>
        <code>unmediated</code>
      </td>
      <td>
        <code>Boolean</code><br>
         <code>true</code> に設定すると Account Chooser UI を非表示にします。</td>
    </tr>
  </tbody>
</table>

##  認証情報を取得する

###  認証情報を自動的に取得する

ユーザーのログインを自動的に実行するには、ユーザーがウェブサイトにアクセスした直後に、次のように `unmediated: true` で認証オブジェクトをリクエストします。


<pre class="prettyprint">
navigator.credentials.get({
  password: true,
  <strong>unmediated: true,</strong> // request a credential without user mediation
  federated: {
    providers: [
      'https://account.google.com',
      'https://www.facebook.com'
    ]
  }
})
</pre>

<figure class="attempt-right">
  <img src="imgs/auto-sign-in.png">
  <figcaption>ユーザーへの自動ログインの確認通知</figcaption>
</figure>

このリクエストは認証オブジェクトで即座に解決され、Account Chooser は表示されません。
ブラウザが認証情報を取得すると、通知がポップアップ表示されます。


<div class="clearfix"></div>


###  Account Chooser で認証情報を取得する

<figure class="attempt-right">
  <img src="imgs/account-chooser.png">
  <figcaption>Account Chooser UI</figcaption>
</figure>

ユーザーがメディエーションを要求するか、複数のアカウントを持っている場合は、Account Chooser を使用してユーザーのログインを実行し、通常のログイン フォームをスキップします。


通常、Account Chooser は、ユーザーが [Sign-In] ボタンをタップしたときに表示されます。
図のように、ユーザーはアカウントを選択してログインできます。

<div class="clearfix"></div>


Account Chooser を有効にするには、`unmediated` プロパティを `false` に設定します。


<pre class="prettyprint">
navigator.credentials.get({
  password: true,
  <strong>unmediated: false,</strong> // request a credential with user mediation
  federated: {
    providers: [
      'https://account.google.com',
      'https://www.facebook.com'
    ]
  }
});
</pre>

ユーザーが使用するアカウントを選択したら、その選択に基づいて、`PasswordCredential` または `FederatedCredential` で Promise が解決されます。
その後、[認証情報のタイプを決定し](#determine-credential-type)、提供された認証情報でユーザーを認証します。


ユーザーが Account Chooser をキャンセルするか、保存されている認証情報がない場合は、`undefined` 値で Promise が解決されます。
この場合、ログイン フォームにフォールバックします。





##  認証情報のタイプを決定する{: #determine-credential-type }

`navigator.credentials.get()` が解決されると、`undefined` または認証オブジェクトが返されます。
`PasswordCredential` と `FederatedCredential` のどちらで解決するかを決定するには、オブジェクトの `.type` プロパティを確認します。このプロパティは、`password` または `federated` です。


 

`.type` が `federated` である場合、`.provider` プロパティは、ID プロバイダを表す文字列です。


次に例を示します。

    if (cred) {
      switch (cred.type) {
        case 'password':
          // authenticate with a server
          break;
        case 'federated':
          switch (cred.provider) {
            case 'https://accounts.google.com':
              // run google identity authentication flow
              break;
            case 'https://www.facebook.com':
              // run facebook identity authentication flow
              break;
          }
          break;
      }
    } else {
      // auto sign-in not possible
    }


`undefined` 値の場合は、ユーザーをログアウトした状態として扱います。

`undefined` 値は、次の場合に返されます。

* ユーザーが自動ログイン機能を認識しなかった（ブラウザ インスタンスごとに一度）。
* ユーザーの認証情報がオリジンに保存されていない、または 3 つ以上の認証オブジェクトが保存されている。
* ユーザーがオリジンにユーザー メディエーションが必要であることをリクエストしている。




##  ユーザーを認証する


###  ユーザー名とパスワードで認証する

サーバーでユーザーを認証するには、`fetch()` を使用して、提供された `PasswordCredential` をサーバーに POST 送信します。


POST 送信すると、`fetch` によって、`PasswordCredential` オブジェクトが、`multipart/form-data` としてエンコードされた `FormData` オブジェクトに自動的に変換されます。


    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="id"

    chromedemojp@gmail.com
    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="password"

    testtest
    ------WebKitFormBoundaryOkstjzGAv8zab97W--

注: `XMLHttpRequest` を使用して、`PasswordCredential` をサーバーに POST 送信することはできません。


####  `PasswordCredential` パラメータ

取得した `PasswordCredential` オブジェクトには、次のパラメータが含まれます。

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
        <code>String</code><br>
        ユーザー ID の文字列。</td>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>String</code><br>
        JavaScript を使用して取得できない不透明型のパスワード。</td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>String</code><br>
        ユーザー名の文字列。</td>
    </tr>
    <tr>
      <td>
        <code>iconURL</code>
      </td>
      <td>
        <code>String</code><br>
        ユーザー アイコン画像の URL 文字列。</td>
    </tr>
  </tbody>
</table>

####  パラメータを変更する

POST 認証にデータを追加する必要がある場合があります。


パラメータキーを変更するには、文字列を `.idName` または `.passwordName` に指定します。

`.additionalData` を `FormData` に指定して、それにキー値を付加することにより、クロスサイト リクエスト フォージェリ（CSRF）トークンなどのパラメータを追加することもできます。



認証オブジェクトを取得したら、次のコードを実行できます。

    if (cred) {
      if (cred.type == 'password') {
        // Use `email` instead of `id` for the id
        cred.idName = 'email';

        // Append CSRF Token
        var csrf_token = document.querySelector('#csrf_token').value;
        var form = new FormData();
        form.append('csrf_token', csrf_token);

        // Append additional credential data to `.additionalData`
        cred.additionalData = form;

        // `POST` the credential object.
        // id, password and the additional data will be encoded and
        // sent to the url as the HTTP body.
        fetch(url, {           // Make sure the URL is HTTPS
          method: 'POST',      // Use POST
          credentials: cred    // Add the password credential object
        }).then(function() {
          // continuation
        });
      }
    }

`FormData` の代わりに、`URLSearchParams` オブジェクトを `.additionalData` に指定して、同じような処理を実行できます。
この場合、`application/x-www-form-urlencoded` を使用して、認証オブジェクト全体がエンコードされます。


###  ID プロバイダによって認証する

ID プロバイダによってユーザーを認証するには、`FederatedCredential` を使用した特定の認証フローを実行します。


たとえば、プロバイダが Google の場合は、[Google Sign-In JavaScript ライブラリ](/identity/sign-in/web/)を使用します。


    // Instantiate an auth object
    var auth2 = gapi.auth2.getAuthInstance();

    // Is this user already signed in?
    if (auth2.isSignedIn.get()) {
      var googleUser = auth2.currentUser.get();
      
      // Same user as in the credential object?
      if (googleUser.getBasicProfile().getEmail() === id) {
        // Continue with the signed-in user.
        return Promise.resolve(googleUser);
      }
    }
    
    // Otherwise, run a new authentication flow.
    return auth2.signIn({
      login_hint: id || ''
    });


Google Sign-In では、ID トークンが認証の証明になり、この ID をサーバーに送信してセッションを作成します。


その他の ID プロバイダについては、対応するドキュメントをご覧ください。

* [Facebook](https://developers.facebook.com/docs/facebook-login)
* [Twitter](https://dev.twitter.com/web/sign-in/implementing)
* [GitHub](https://developer.github.com/v3/oauth/)



##  ログアウト {: #sign-out }

ユーザーがウェブサイトからログアウトした場合、ユーザーが次にウェブサイトにアクセスしたときに、自動的にログインしないようにする必要があります。
自動ログオンをオフにするには、[`navigator.credentials.requireUserMediation()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/requireUserMediation) を呼び出します。



    // After a user signing out...
    navigator.credentials.requireUserMediation();

その後、`unmediated: true` を指定して `navigator.credentials.get()` を呼び出すと、`undefined` が返され、ユーザーはログインしないようになります。
自動ログインのオフは、このオリジンの現在のブラウザ インスタンスに対してのみ記憶されます。


再び自動ログインを有効にするには、ユーザー側で Account Chooser からログインするアカウントを選択して、意図的にログインする必要があります。
その後、ユーザーは明示的にログアウトするまで、常に再ログインするようになります。




{# wf_devsite_translation #}
