project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on:2016-11-08 #}
{# wf_published_on:2016-11-08 #}

#  Credential Management API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Warning: 本翻訳記事公開後仕様が大幅に変更されています。[英語版](?hl=en)をご確認頂くか、変更点を[こちらから](https://developers.google.com/web/updates/2017/06/credential-management-updates)ご確認ください。

[Credential Management API](https://www.w3.org/TR/credential-management/) は標準ベースのブラウザ API であり、複数の端末でのシームレスなログインを実現するためにサイトとブラウザ間にプログラム インターフェースを提供し、ログインフローを簡潔にします。




<div class="attempt-right">
  <figure>
    <video src="animations/credential-management-smaller.mov" style="max-height: 400px;" autoplay muted loop controls></video>
    <figcaption>ユーザーのログインフロー</figcaption>
  </figure>
</div>

Credential Management API:

* **ログインフローをシンプルにします** - ユーザーは、セッションの期限が切れている場合でも、サイトに自動的に再度ログインできます。
* **Account Chooser を使用してワンタップでログインできます** - ネイティブの Account Chooser が表示されるため、ログイン フォームは不要です。
* **認証情報を保存します** - ユーザー名とパスワードの組み合わせ、またはフェデレーション アカウントの詳細を保存できます。


実例を見るには、[Credential Management API のデモ](https://credential-management-sample.appspot.com)を試して、[コード](https://github.com/GoogleChrome/credential-management-sample)を確認してください。




<div class="clearfix"></div>


##  Credential Management を実装する手順

Credential Management API を適切に統合する方法は多数あり、統合の詳細はサイトの構造とユーザー エクスペリエンスによって異なりますが、このフローをサイトに使用することで、ユーザー エクスペリエンスに次のメリットがあります。




* サービスの既存のユーザーがブラウザに単一の認証情報を保存している場合は、即座にログインでき、認証が完了するとすぐにログイン済みのページにリダイレクトされます。
* 複数の認証情報を保存しているユーザーまたは自動ログインを無効にしているユーザーは、ウェブサイトのログインページに進む前に、1 つのダイアログに応答する必要があります。
* ユーザーがログアウトすると、ウェブサイトに自動的に再ログインできなくなります。


重要なポイント: Credential Management API を使用する場合は、安全なオリジンからページを提供する必要があります。


###  ユーザーの認証情報を取得してログインする

ユーザーのログインを実行するには、ブラウザのパスワード マネージャーから認証情報を取得し、その情報を使用してログイン処理を行う必要があります。


次に例を示します。

1. ユーザーがサイトにアクセスして、まだログインしていない場合は、`navigator.credential.get()` を呼び出します。
2. 取得した認証情報を使用して、ユーザーのログインを実行します。
3. UI をアップデートして、ユーザーがログインしたことを示します。


詳細については、[認証情報を取得する](/web/fundamentals/security/credential-management/retrieve-credentials)をご覧ください。


###  ユーザーの認証情報を保存またはアップデートする

ユーザーがユーザー名とパスワードを使用してログインした場合、次の手順を実行します。

1. ユーザーが正常にログインして、アカウントの作成またはパスワードの変更を行ったあとに、ユーザー ID とパスワードを使用して `PasswordCredential` を作成します。
2. `navigator.credentials.store()` を使用して認証オブジェクトを保存します。




ユーザーが Google Sign-In、Facebook、GitHub などのフェデレーション ID プロバイダを通じてログインした場合は、次の手順を実行します。


1. ユーザーが正常にログインして、アカウントの作成またはパスワードの変更を行ったあとに、ユーザーのメールアドレスを ID として使用して `FederatedCredential` を作成し、`.provider` で ID プロバイダを指定します。
2. `navigator.credentials.store()` を使用して認証オブジェクトを保存します。



詳細については、[認証情報を保存する](/web/fundamentals/security/credential-management/store-credentials)をご覧ください。


###  ログアウト

ユーザーがログアウトしたら、`navigator.credentials.requireUserMediation()` を呼び出し、ユーザーが自動的に再ログインしないようにします。


自動ログインを無効すると、ユーザーは簡単にアカウントを切り替えることができます。たとえば、ログイン情報を再入力することなく、仕事用のアカウントと個人用のアカウント、または共有端末上のアカウントを切り替えることができます。



詳細については、[ログアウト](/web/fundamentals/security/credential-management/retrieve-credentials#sign-out)をご覧ください。



##  追加リファレンス

[MDN の Credential Management API](https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API)


{# wf_devsite_translation #}
