project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on:2016-11-08 #}
{# wf_published_on:2016-11-08 #}

# 检索凭据 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

要使用户登录，请从浏览器的密码管理器检索凭据，并使用这些凭据让用户登录。


要检索用户的凭据，请使用 `navigator.credentials.get()`，其返回一个使用凭据对象作为参数进行解析的 promise。获取的凭据对象可以是 [`PasswordCredential`](#authenticate_with_a_server) 或 [`FederatedCredential`](#authenticate_with_an_identity_provider)。如果凭据信息不存在，则会返回 `null`。


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


### `navigator.credentials.get` 参数 {: .hide-from-toc }

<table class="responsive properties">
  <tbody>
    <tr>
      <th colspan=2>参数</th>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>Boolean</code><br>
        设置为  <code>true</code> 以检索 <code>PasswordCredentials</code>。
        默认设置为  <code>false</code>。
</td>
    </tr>
    <tr>
      <td>
        <code>federated</code>
      </td>
      <td>
        <code>Object</code><br>
        接受  <code>provider</code> 或  <code>protocol</code> 作为键的对象，它有一个参数数组。
Object <code>provider</code>
        接受一个可识别提供程序的字符串数组。目前，没有浏览器实现  <code>protocol</code>。
</td>

    </tr>
    <tr>
      <td>
        <code>unmediated</code>
      </td>
      <td>
        <code>Boolean</code><br>
        设置为  <code>true</code> 以避免显示帐户选择器 UI。
</td>
    </tr>
  </tbody>
</table>

## 获取凭据

### 自动获取凭据

要让用户自动登录，请在用户访问您的网站时使用 `unmediated: true` 请求一个凭据对象，例如：


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
  <figcaption>针对自动登录的用户的通知</figcaption>
</figure>

此请求将立即使用一个凭据对象进行解析，并且不会显示帐户选择器。
当浏览器获取凭据信息时，系统将弹出一个通知：


<div class="clearfix"></div>


### 通过帐户选择器获取凭据

<figure class="attempt-right">
  <img src="imgs/account-chooser.png">
  <figcaption>帐户选择器 UI</figcaption>
</figure>

如果用户需要调节，或具有多个帐户，则使用帐户选择器让用户登录，从而跳过普通的登录表单。


当用户点按“Sign-In”按钮时，通常会调用帐户选择器。
用户可以选择一个帐户进行登录，例如：

<div class="clearfix"></div>


要启用帐户选择器，请将 `unmediated` 属性设置为 `false`：


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

在用户选择了他们要使用的帐户后，promise 将基于他们的选择使用 `PasswordCredential` 或 `FederatedCredential` 进行解析。然后，[确定凭据类型](#determine-credential-type)并使用提供的凭据对用户进行身份验证。


如果用户取消帐户选择器或没有存储凭据，则 promise 使用一个 `undefined` 值进行解析。
在此情况下，回退到登录表单体验。





## 确定凭据类型{: #determine-credential-type }

当 `navigator.credentials.get()` 进行解析时，它将返回 `undefined` 或 Credential 对象。
要确定它是 `PasswordCredential` 还是 `FederatedCredential`，只需查看此对象的 `.type` 属性，即 `password` 或 `federated`。




如果 `.type` 是 `federated`，则 `.provider` 属性是一个表示身份提供程序的字符串。


例如：

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


如果是一个 `undefined` 值，则用户继续处于退出状态。

当出现以下情况时传递一个 `undefined` 值：

* 用户尚未确认自动登录功能（每个浏览器实例确认一次）。
* 用户没有凭据，或在源中存储了两个以上的凭据对象。
* 用户已请求用户对源进行调节。




## 对用户进行身份验证


### 使用用户名和密码进行身份验证

要向服务器验证用户的身份，请使用 `fetch()` 将提供的 `PasswordCredential` POST 到服务器。


完成 POST 后，`fetch` 自动将 `PasswordCredential` 对象转换为使用 `multipart/form-data` 编码的 `FormData` 对象：


    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="id"

    chromedemojp@gmail.com
    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="password"

    testtest
    ------WebKitFormBoundaryOkstjzGAv8zab97W--

Note: 您不能使用 `XMLHttpRequest` 将 `PasswordCredential` POST 到您的服务器。


#### `PasswordCredential` 参数

获取的 `PasswordCredential` 对象包括以下参数：

<table class="responsive properties">
  <tbody>
    <tr>
      <th colspan=2>参数</th>
    </tr>
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        <code>String</code><br>
        用户标识符字符串。
</td>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>String</code><br>
        不透明的密码，您无法使用 JavaScript 获取。
</td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>String</code><br>
        用户名字符串。
</td>
    </tr>
    <tr>
      <td>
        <code>iconURL</code>
      </td>
      <td>
        <code>String</code><br>
        用户图标图像网址字符串。
</td>
    </tr>
  </tbody>
</table>

#### 更改参数

在某些情况下，可能必须将附加数据添加到身份验证 POST。


通过向 `.idName` 或 `.passwordName` 分配一个字符串来更改参数键。

您也可以通过向 `FormData` 分配一个 `.additionalData` 来添加额外参数（如跨站点请求伪造 (CSRF) 令牌），并向该参数追加键值。



获取凭据对象后：

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

您可以通过向 `.additionalData` 分配一个 `URLSearchParams` 对象（而非 `FormData`）来执行相似操作。
在此情况下，使用 `application/x-www-form-urlencoded` 对整个凭据对象进行编码。


### 使用身份提供程序进行身份验证

要通过身份提供程序对用户进行身份验证，使用具有 `FederatedCredential` 的特定身份验证流程即可。


例如，如果提供程序为 Google，则使用 [Google Sign-In JavaScript 内容库](/identity/sign-in/web/)：


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


Google Sign-In 会生成一个 id 令牌作为身份验证的证明，您将该令牌发送到服务器以创建一个会话。


有关其他身份提供程序，请参阅相应的文档：

* [Facebook](https://developers.facebook.com/docs/facebook-login)
* [Twitter](https://dev.twitter.com/web/sign-in/implementing)
* [GitHub](https://developer.github.com/v3/oauth/)



## 退出{: #sign-out }

当用户退出您的网站时，您需要确保此用户在下次访问时不会自动登录。
要关闭自动登录，请调用 [`navigator.credentials.requireUserMediation()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/requireUserMediation)：



    // After a user signing out...
    navigator.credentials.requireUserMediation();

然后，如果使用 `unmediated: true` 调用`navigator.credentials.get()`，它将返回 `undefined` 并且用户不会登录。
系统仅针对此源的当前浏览器实例记住这个值。


要继续使用自动登录，用户可以选择主动登录，只需从帐户选择器中选择他们在登录时要使用的帐户。
于是，用户在明确退出前始终可以重新登录。




{# wf_devsite_translation #}
