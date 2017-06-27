project*path: /web/*project.yaml
book*path: /web/updates/*book.yaml
description: Latest Updates to the Credential Management API

{# wf*updated*on: 2017-06-22 #}
{# wf*published*on: 2017-06-12 #}
{# wf*tags: performance #}
{# wf*featured*image: /web/updates/images/generic/security.png #}
{# wf*featured_snippet: Chrome 60 で変更される Credential Management API について。Chrome 57 での変更点についても触れています。 #}

# Credential Management API の仕様が変更されました {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

このポストで説明している変更点のいくつかは Google I/O のセッション **Secure and Seamless Sign-In: Keeping Users Engaged** でも触れています ：


<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="DBBFK7bvEQo" data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


## Chrome 57

Chrome 57 における [Credential Management API](/web/fundamentals/security/credential-management) の重要な変更点は以下のとおりです。

### クレデンシャルが異なるサブドメイン間で共有できるようになりました

Chrome は [Credential Management API](/web/fundamentals/security/credential-management) を使って、異なるサブドメインに保存されたクレデンシャルを取得できるようになりました。
例えば、パスワードが `login.example.com` に保存されている場合、`www.example.com` にあるスクリプトは、アカウントチューザーダイアログで表示するアカウントの一つとして利用することができます。

ユーザーがダイアログをタップしてクレデンシャルを選択した際、現在のオリジンに渡してコピーするためには、パスワードを明示的に `navigator.credentials.store()` で保存する必要があります。

一度保存してしまえば、以後そのパスワードは同じオリジン `www.example.com` に保存されたクレデンシャルとして扱われるようになります。

以下のスクリーンショットでは、`login.aliexpress.com` に保存されたクレデンシャルが `m.aliexpress.com` から見えており、ユーザーにより選択可能である状態を示しています。


<figure>
  <img src="/web/updates/images/2017/06/credentials.png" alt="Account chooser showing selected subdomain login details">
</figure>



<aside class="note">
  <strong>Coming soon:</strong>
  全く違うドメイン間におけるクレデンシャルの共有も現在開発中です。</aside>


## Chrome 60

Chrome 60 の [Credential Management API](/web/fundamentals/security/credential-management) では重要な変更点がいくつかあります：

- [`PasswordCredential` オブジェクトがパスワードを含むようになります。](#password)
-  パスワードの特別な扱いが必要なくなるため、カスタマイズされた `fetch()` 関数が[まもなく廃止されます](#fetchdeprecation)。
- `navigator.credentials.get()` は boolean の `unmediated` ではなく、[enum の `mediation` を受け取る](#mediation)ようになります。

- [`requireUserMediation()` は `preventSilentAccess()` に変更されます](#preventsilentaccess)。
- [新しいメソッド `navigator.credentials.create()`](#credentialscreate) を使って、非同期にクレデンシャルオブジェクトを作成できるようになります。

### 機能検知に注意が必要です


<aside class="warning">
  <strong>Warning:</strong>
Chrome 60 から利用可能になる Credential Management API の変更点が後方互換のない変更を含むため、新しい実装では古いバージョンの API を使わないように注意が必要です（意図的にそうしたい場合は、<a href="https://docs.google.com/document/d/154cO-0d5paDFfhN79GNdet1VeMUmELKhNv3YHvVSOh8/edit">こちらのマイグレーションガイド</a>をご覧ください）。</aside>


新しい Credential Management API が利用可能かどうかを調べるには、`preventSilentAccess` が存在するかどうかをチェックします。

```js
if (navigator.credentials && navigator.credentials.preventSilentAccess) {
  // 新しい Credential Management API が利用可能
}
```

### `PasswordCredential` オブジェクトがパスワードを含むようになります {: #password}

Credential Management API はこれまでパスワードの扱いについて保守的なアプローチを取っていました。JavaScript からパスワードを隠蔽していたため、開発者は若干カスタマイズされた `fetch()` API を使って、直接 `PasswordCredential` オブジェクトをサーバーに送って、認証を行う必要がありました。 

しかしこのアプローチでは、いくつもの制約がありました。
API を採用できない理由として頂いたフィードバックには下記のようなものがあります：

- JSON オブジェクトの一部としてパスワードを送らなければならない。
- サーバーにパスワードのハッシュ値を送らなければならない。

慎重なセキュリティ分析を行った結果、JavaScript からパスワードを隠蔽しても、すべてのアタックベクターに対して期待したほど成果を挙げられないということが判明しました。そして、我々は今回の変更を行うという結論に至ったのです。

新しい Credential Management API では、取得したクレデンシャルオブジェクトに生のパスワードが含まれるため、プレーンテキストとして扱うことができます。そのため開発者は、従来と同様の方法を使ってクレデンシャルをサーバーに送ることができます。

```
navigator.credentials.get({
  password: true,
  federated: {
    provider: [ 'https://accounts.google.com' ]
  },
  mediation: 'silent'
}).then(c => {
  if (c) {
    let form = new FormData();
    form.append('email', c.id);
    form.append('password', c.password);
    form.append('csrf_token', csrf_token);
    return fetch('/signin', {
      method: 'POST',
      credentials: 'include',
      body: form
    });
  } else {
    // ログインフォームにフォールバック
  }
}).then(res => {
  if (res.status === 200) {
    return res.json();
  } else {
    throw 'Auth failed';
  }
}).then(profile => {
  console.log('Auth succeeded', profile);
});
```

### カスタマイズされた fetch 関数はまもなく使えなくなります {: #fetchdeprecation}


<aside class="warning">
  <strong>Warning:</strong>
  パスワードが <code>PasswordCredential</code> オブジェクトに隠されることがなくなったため、カスタマイズされた <code>fetch()</code> 関数は不要となり、Chrome 62 で利用できなくなります。利用者の方はコードを<stromg>更新しなければなりません</stromg>。</aside>


カスタマイズされた `fetch()` 関数を使っているかを検証するには、`PasswordCredential` オブジェクト、もしくは `FederatedCredential` オブジェクトを `credentials` プロパティの値として使っているかをご確認ください。例えば：

```
fetch('/signin', {
  method: 'POST',
  credentials: c
})
```

ひとつ前のサンプルコードのように、通常の `fetch()` 関数、もしくは `XMLHttpRequest` を使うことが推奨されます。

### `navigator.credentials.get()` が enum の mediation を受け取るようになります {: #mediation}

Chrome 60 まで `navigator.credentials.get()` はオプショナルな `unmediated` プロパティとして Boolean を受け取っていました。
例えば：

```
navigator.credentials.get({
  password: true,
  federated: {
    provider: [ 'https://accounts.google.com' ]
  },
  unmediated: true
}).then(c => {
  // Sign-in
});
```

`unmediated: true` とすることで、クレデンシャルを取得する際にブラウザがアカウントチューザーを表示するのを防ぐことができます。

このフラグは mediation に変更され、ユーザーの仲介は下記のような状況で発生するようになります：

- ユーザーがログインするアカウントを選択する必要がある場合。
- `navigator.credentials.requireUseMediation()` を呼び出した後にユーザーが明示的にログインしたい場合。

`mediation` の値として下記のいずれかを選びます：


<table>
  <tr>
    <th>
<code>mediation</code> 値</th>
    <th>
<code>unmediated</code> の等値</th>
    <th>振る舞い</th>
  </tr>
  <tr>
    <td><code>silent</code></td>
    <td> <code>unmediated: true</code>
</td>
    <td>アカウントチューザーを表示せずにクレデンシャルを返す。</td>
  </tr>
  <tr>
    <td><code>optional</code></td>
    <td> <code>unmediated: false</code>
</td>
    <td>前回 <code>preventSilentAccess()</code> が呼ばれている場合、アカウントチューザーを表示する。</td>
    <td></td>
  </tr>
  <tr>
    <td><code>required</code></td>
    <td>新しい値</td>
    <td>毎回アカウントチューザーを表示する。アカウントの切り替えに便利。</td>
  </tr>
</table>


この例では、先程のフラグ `unmediated: true` の等値を使うことで、アカウントチューザーを表示することなくクレデンシャルを返します：

```
navigator.credentials.get({
  password: true,
  federated: {
    provider: [ 'https://accounts.google.com' ]
  },
  mediation: 'silent'
}).then(c => {
  // Sign-in
});
```

### `requireUserMediation()` は `preventSilentAccess()` に変更されます {: #preventsilentaccess}

`get()` の新しいオプション `mediation` に合わせ、`navigator.credentials.requireUserMediation()` は `navigator.credentials.preventSilentAccess()` に変更されます。

このメソッドはアカウントチューザーを表示せずに（「ユーザーの仲介」とも呼ばれます）クレデンシャルを渡すことを防ぎます。
これを使うことで、ユーザーがログアウト後に戻ってきた時、自動ログインしないようにすることができます。

```
signoutUser();
if (navigator.credentials) {
  navigator.credentials.preventSilentAccess();
}
```

### 新しいメソッド `navigator.credentials.create()` を使って非同期にクレデンシャルオブジェクトを生成できるようになります {: #credentialscreate}

新しいメソッド `navigator.credentials.create()` を使って非同期にクレデンシャルオブジェクトを生成できるようになります。同期・非同期両方のアプローチを比較してみましょう。

#### `PasswordCredential` オブジェクトを生成する

##### 同期的アプローチ

```
let c = new PasswordCredential(form);
```

##### 非同期的アプローチ (new)

```
let c = await navigator.credentials.create({
  password: form
});
```

もしくは：

```
let c = await navigator.credentials.create({
  password: {
    id: id,
    password: password
  }
});
```

#### `FederatedCredential` オブジェクトを生成する

##### 同期的アプローチ

```
let c = new FederatedCredential({
  id:       'agektmr',
  name:     'Eiji Kitamura',
  provider: 'https://accounts.google.com',
  iconURL:  'https://*****'
});
```

##### 非同期的アプローチ (new)

```
let c = await navigator.credentials.create({
  federated: {
    id:       'agektmr',
    name:     'Eiji Kitamura',
    provider: 'https://accounts.google.com',
    iconURL:  'https://*****'
  }
});
```

## マイグレーションガイド

既存の Credential Management API の実装をお持ちですか？こちらの[マイグレーションガイド](https://docs.google.com/document/d/154cO-0d5paDFfhN79GNdet1VeMUmELKhNv3YHvVSOh8/edit)

を参考にして下さい。新しい API への対応方法をステップ・バイ・ステップでご紹介します。

{% include "comment-widget.html" %}
