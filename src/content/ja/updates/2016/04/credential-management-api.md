project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: 洗練されたユーザ体験を提供するために、あなたのウェブサイトでユーザの認証を手助けすることは重要なことです。しかし、特にモバイル環境においては、パスワードの作成、記憶、そして打ち込みは、エンドユーザにとって面倒に感じる傾向があります。

{# wf_updated_on: 2016-11-08 #}
{# wf_published_on: 2016-05-07 #}

# Credential Management API を使ったサインインフローの効率化 {: .page-title }<br><br>Translated By:
{% include "web/_shared/contributors/yoichiro.html" %}

{% include "web/_shared/contributors/agektmr.html" %}

洗練されたユーザ体験を提供するために、ウェブサイト上でユーザ認証を手助けすることは非常に重要なことです。
認証されたユーザは、専用のプロフィール、デバイス間やオフライン状態で処理された情報の同期など
（リストアップしていたらキリがありません）を互いにやり取りすることができるようになります。
しかし、パスワードの作成、記憶、そして打ち込みは、エンドユーザにとって面倒に感じる傾向があります。
これは、モバイルの画面上では、そのユーザが異なるサイトで同じパスワードを使い回すことを助長します。
これはセキュリティリスクの原因となります。

Chrome の最新バージョン(51)は、**[Credential Management API](http://w3c.github.io/webappsec-credential-management/)**
をサポートします。これは、W3C による標準化過程の提案であり、開発者にブラウザのクレデンシャルマネージャに
プログラムからアクセスすることを可能にし、そしてユーザがサインインをより簡単にできるように助けます。

## Credential Management API とは

Credential Management API は、パスワードクレデンシャルやフェデレーティッドクレデンシャルの
格納や取得を開発者に可能にさせます。そして、3つの関数を提供します。

- `navigator.credentials.get()`
- `navigator.credentials.store()`
- `navigator.credentials.requireUserMediation()`

これらのシンプルな API を使うことで、開発者は以下のような強力なことをすることができます。

- たった1回のタップでユーザがサインインすることを可能にします。
- ユーザがサインインする時に使ったフェデレーティッドアカウントを記憶します。
- セッションが失効した際にユーザを再度サインインします。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="O3mBdKYMsMY" data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Chrome の実装では、クレデンシャルは Chrome のパスワードマネージャの中に格納されます。もしユーザが
Chrome にサインインした場合、それらはデバイスを横断してユーザのパスワードを同期できます。
それらの同期されたパスワードは、
[シームレスなクロスプラットフォーム体験のために](/identity/smartlock-passwords/android/)
[Smart Lock for Passwords API for Android](/identity/smartlock-passwords/android/)
を統合した Android アプリで共有もされることが可能です。

## あなたのサイトへの Credential Management API の組み込み

あなたのウェブサイトで Credential Management API を使うための方法は、そのアーキテクチャに依存して
異なる可能性があります。それはシングルページアプリですか？それはページ遷移を伴うレガシーなアーキテクチャですか？
サインインフォームはトップページにのみ配置されていますか？サインインボタンはどこでもありますか？
ユーザはサインインすることなしにあなたのウェブサイトをわかりやすく閲覧できますか？フェデレーションはポップアップ
ウィンドウ内で機能しますか？または、複数のページを横断してインタラクションを要求しますか？

それらのすべてのケースをカバーすることはほとんど無理ですが、典型的なシングルページアプリを見ていきましょう。

- トップページは登録フォームである。
- "サインイン"ボタンをタップすることで、ユーザはサインインフォームに移動される。
- 登録とサインインフォームの両方は、ID /パスワードクレデンシャルとフェデレーション（例: Google サインインや Facebook サインイン）の2つの典型的な選択肢を持つ。

Credential Management API を使うことで、サイトに以下の例のような機能を追加することができるでしょう。

- **サインインの際にアカウントチューザーを見せる:** ユーザが"サインイン"をタップした時に、ネイティブのアカウントチューザー UI を表示する。
- **クレデンシャルの格納:** サインインが_成功_した時に、後で使うために、ブラウザのパスワードマネージャにクレデンシャル情報を格納することを提案する。
- **自動的にユーザを再度サインインさせる** もしセッションが失効した場合にユーザを再度サインインさせる。
- **自動的なサインインの仲介** ユーザがサインアウトした際に、そのユーザが次に訪問した際に自動的なサインインを無効にする。

[デモサイト](https://credential-management-sample.appspot.com)（
[そのサンプルコード](https://github.com/GoogleChrome/credential-management-sample)）
にて、実装された機能を体験することができます。

**この API は、HTTPS ドメインまたは localhost のようなセキュアなオリジンで利用される必要があることに
注意してください。**

### サインインの際にアカウントチューザーを表示する

"サインイン"ボタンのユーザタップと、サインインフォームへの移動の間に、クレデンシャル情報を取得するために
[`navigator.credentials.get()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/get)
を使うことができます。Chrome は、ユーザがアカウントを選択することを可能にするアカウントチューザー UI を表示
します。

アカウントチューザー UI は、サインインするためのアカウントを選択するために、ユーザに対してポップアップされます

#### パスワードクレデンシャルオブジェクトの取得:

アカウントオプションとしてパスワードクレデンシャルを表示するためには、`password: true` を使用します。

```
navigator.credentials.get({
  password: true, // `true` to obtain password credentials
}).then(function(cred) {
  // continuation
  ...
```

#### サインインのためのパスワードクレデンシャルの利用

ユーザがアカウント選択をした時、解決する関数はパスワードクレデンシャルを受け取ります。`fetch()` を
使うことで、それをサーバに送ることができます:

```
  // continued from previous example
}).then(function(cred) {
  if (cred) {
    if (cred.type == 'password') {
      // Construct FormData object
      var form = new FormData();

      // Append CSRF Token
      var csrf_token = document.querySelector('csrf_token').value;
      form.append('csrf_token', csrf_token);

      // You can append additional credential data to `.additionalData`
      cred.additionalData = form;

      // `POST` the credential object as `credentials`.
      // id, password and the additional data will be encoded and
      // sent to the url as the HTTP body.
      fetch(url, {           // Make sure the URL is HTTPS
        method: 'POST',      // Use POST
        credentials: cred    // Add the password credential object
      }).then(function() {
        // continuation
      });
    } else if (cred.type == 'federated') {
      // continuation
```

#### サインインのためのフェデレーションクレデンシャルの利用

ユーザにフェデレーティッドアカウントを表示するために、アイデンティティプロバイダの配列を取る
`federated` を `get()` に追加します。

複数のアカウントがパスワードマネージャに登録されている時

```
navigator.credentials.get({
  password: true, // `true` to obtain password credentials
  federated: {
    providers: [  // Specify an array of IdP strings
      'https://accounts.google.com',
      'https://www.facebook.com'
    ]
  }
}).then(function(cred) {
  // continuation
  ...
```

`PasswordCredential`(`type == 'password'`) または `FederatedCredential` (`type == 'federrated'`)
かどうかを、クレデンシャルオブジェクトの `type` プロパティで調べることができます。
もしクレデンシャルが
<a href="https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential" data-md-type="link">`FederatedCredential`</a> の場合は、
それが持つ情報を使って適切な API を呼び出すことが可能です。

```
      });
    } else if (cred.type == 'federated') {
      // `provider` contains the identity provider string
      switch (cred.provider) {
        case 'https://accounts.google.com':
          // Federated login using Google Sign-In
          var auth2 = gapi.auth2.getAuthInstance();

          // In Google Sign-In library, you can specify an account.
          // Attempt to sign in with by using `login_hint`.
          return auth2.signIn({
            login_hint: cred.id || ''
          }).then(function(profile) {
            // continuation
          });
          break;

        case 'https://www.facebook.com':
          // Federated login using Facebook Login
          // continuation
          break;

        default:
          // show form
          break;
      }
    }
  // if the credential is `undefined`
  } else {
    // show form
```

<img src="/web/updates/images/2016/04/credential-management-api/image02.png">

### クレデンシャルの保存

ユーザがあなたのウェブザイトにフォームを使ってサインインする際に、クレデンシャルを保存するために
[`navigator.credentials.store()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/store)
を使うことができます。ユーザは、それを保存するかしないかの選択を聞かれることになります。クレデンシャルの種類に
依存して、保存したいクレデンシャルオブジェクトを作成するために、
[`new PasswordCredential()`](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential)
または [`new FederatedCredential()`](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential)
を使います。

Chrome にはユーザにクレデンシャル（またはフェデレーションプロバイダ）を保存したいかどうかを尋ねます。

#### フォーム要素からのパスワードクレデンシャルの作成及び保存

以下のコードは、フォームの要素を [PasswordCredential](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential)
オブジェクトパラメータに自動的に [マップ](http://w3c.github.io/webappsec-credential-management/#passwordcredential-form-constructor)
するために、`autocomplete` 属性を使っています。

HTML

```
<form id="form" method="post">
  <input type="text" name="id" autocomplete="username" />
  <input type="password" name="password" autocomplete="current-password" />
  <input type="hidden" name="csrf_token" value="******" />
</form>
```

JavaScript

```
var form = document.querySelector('\#form');
var cred = new PasswordCredential(form);
// Store it
navigator.credentials.store(cred)
.then(function() {
  // continuation
});
```

#### フェデレーティッドクレデンシャルの作成及び保存

```
// After a federation, create a FederatedCredential object using
// information you have obtained
var cred = new FederatedCredential({
  id: id,                                  // The id for the user
  name: name,                              // Optional user name
  provider: 'https://accounts.google.com',  // A string that represents the identity provider
  iconURL: iconUrl                         // Optional user avatar image url
});
// Store it
navigator.credentials.store(cred)
.then(function() {
  // continuation
});
```

<img src="/web/updates/images/2016/04/credential-management-api/image04.png">

### ユーザを自動的にサインイン状態に戻す

ユーザがあなたのウェブサイトを離れ、後で戻ってきた際に、セッションが失効している可能性があります。
ユーザが戻ってくるたびにパスワードを毎回打たせることでユーザを困らせてはなりません。自動的に
ユーザをサインインさせましょう。

ユーザが自動的にサインインする際に、通知がポップアップされる。

#### クレデンシャルオブジェクトの取得

```
navigator.credentials.get({
  password: true, // Obtain password credentials or not
  federated: {    // Obtain federation credentials or not
    providers: [  // Specify an array of IdP strings
      'https://accounts.google.com',
      'https://www.facebook.com'
    ]
  },
  unmediated: true // `unmediated: true` lets the user automatically sign in
}).then(function(cred) {
  if (cred) {
    // auto sign-in possible
    ...
  } else {
    // auto sign-in not possible
    ...
  }
});
```

コードは、"サインイン時にアカウントチューザーを表示する"セクションの時に見たものと似ているはずです。
違いは、`unmediated: true` がセットされていることのみです。

これは、即座に関数を解決し、ユーザを自動的にサインインさせるためのクレデンシャルをあなたに与えます。
幾つかの条件があります:

- ユーザがワームウェルカム（温かい歓迎）において自動サインイン機能を承認している。
- ユーザが前に Credential Management API を使ってウェブサイトにサインインしている。
- ユーザがあなたのオリジンに対してクレデンシャルを一つだけ保存している。
- ユーザが前回のセッションを明示的にサインアウトしていない。

もし条件のどれかが満たされなかった場合は、関数は拒否されます。

<img src="/web/updates/images/2016/04/credential-management-api/image06.png">

### 自動サインインを仲介する

ユーザがあなたのウェブサイトからサインアウトする際に、**ユーザが自動的にサインイン状態に戻らないように
保証するのは、あなたの責任です**。これを保証するために、Credential Management API は**mediation（仲介）**
と呼ばれる機構を提供します。
あなたは、[`navigator.credentials.requireUserMediation()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/requireUserMediation) を呼び出すことで、
mediation モードを有効にすることができます。
そのオリジンのユーザの mediation ステータスが ON になっている間、`navigator.credentials.get()` が持つ
`unmediated: true` を使って、その関数は `undefined` で解決します。

#### 自動サインインの仲介

```
navigator.credentials.requireUserMediation();
```

<img src="/web/updates/images/2016/04/credential-management-api/image07.png">

## FAQ

**ウェブサイト上で生のパスワードを取得することは JavaScript で可能ですか？**
いいえ。`PasswordCredential` の一部としてパスワードを取得することができるだけで、
決してさらされることはありません。

**Credential Management API を使って ID に対して3組の桁を保存することは可能ですか？**
現在はできません。あなたからの[仕様へのフィードバック](https://github.com/w3c/webappsec-credential-management)
は大きく歓迎されるでしょう。

**iframe の内部で Credential Management API を利用することは可能ですか？**
このAPIはトップレベルコンテキストに制限されます。iframe 内で `.get()` または `.store()` を
呼び出すことは、何も起きずに直ちに解決するでしょう。

**Credential Management API を使って、自分のパスワード管理 Chrome 拡張機能を統合することができますか？**
`navigator.credentials` をオーバーライドして、クレデンシャルの `get()` または `store()` をするために、
それをあなたの Chrome 拡張機能にフックすることはできるかもしれません。

## リソース

より深く Credential Management API を学ぶには、[Integration Guide](/web/fundamentals/security/credential-management/) をご覧下さい。

- [API 仕様](https://www.w3.org/TR/credential-management/)
- [仕様のディスカッションとフィードバック](https://github.com/w3c/webappsec-credential-management)
- [MDN API リファレンス](https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API)
- [Credential Management API インテグレーションガイド](/web/fundamentals/security/credential-management/)
- [デモ](https://credential-management-sample.appspot.com)
- [デモのソースコード](https://github.com/GoogleChrome/credential-management-sample)
- [コードラボ "Enabling auto sign-in with Credential Management API"](https://g.co/codelabs/cmapi)

{% include "comment-widget.html" %}
