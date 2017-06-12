project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on:2016-11-08 #}
{# wf_published_on:2016-11-08 #}

# 存储凭据 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

通过 `navigator.credentials.store()` API 存储和更新用户凭据很简单。



## 存储用户凭据

在用户成功注册、登录或更改密码后，存储或更新用户的凭据。


### 存储用户名和密码详情

要点：创建一个新的 `PasswordCredential` 对象并使用 `navigator.credentials.store()` 保存它。


在用户登录后，并且您已验证他们的凭据后，创建一个新的 [`PasswordCredential`](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential) 对象并将其传递到 `navigator.credentials.store()` 以保存它。



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
  <figcaption>针对自动登录的用户的通知</figcaption>
</figure>

当 Chrome 浏览器获取凭据信息时，系统会弹出一个通知，询问是否存储凭据（或联合提供程序）



<div class="clearfix"></div>

### 存储表单中的用户名和密码

要点：使用一个标注明确的表单可轻松地创建一个新的 `PasswordCredential` 对象，并使用 `navigator.credentials.store()` 保存它。


除手动创建 `PasswordCredential` 外，您可以只将一个[标注明确的](https://html.spec.whatwg.org/multipage/forms.html#autofill)`form` 元素传递到 `PasswordCredential`。



例如：

    <form id="form" method="post">
      <input type="text" name="id" autocomplete="username" />
      <input type="password" name="password" autocomplete="current-password" />
      <input type="hidden" name="csrf_token" value="*****" />
    </form>

然后通过将一个引用传递到表单元素创建一个新的 `PasswordCredential` 对象：


    var form = document.querySelector('#form');
    var cred = new PasswordCredential(form);
    // Store it
    navigator.credentials.store(cred)
    .then(function() {
      // continuation
    });

任何附加表单字段都将作为 `.additionalData` 参数的一部分自动添加到 `PasswordCredential`。



## 存储联合帐户的凭据

要点：创建一个新的 `FederatedCredential` 对象并使用 `navigator.credentials.store()` 保存它。



要存储联合帐户详情，请实例化一个新的 [`FederatedCredential`](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential)（一个包含用户标识符和提供程序标识符的对象）。

然后，调用 `navigator.credentials.store()` 以存储此凭据。


例如：

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
      <th colspan=2>参数</th>
    </tr>
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        <code>string</code><br>
        调用身份提供程序特定的身份验证流程时使用的用户标识符，通常作为 OAuth 中  <code>login_hint</code>
的
        值。
</td>
    </tr>
    <tr>
      <td>
        <code>provider</code>
      </td>
      <td>
        <code>string</code><br>
        用于登录的提供程序来源的 ASCII 串行化形式。
        例如，Facebook 由  <code>https://www.facebook.com</code> 表示，Google 由  <code>https://accounts.google.com</code> 表示。</td>



    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>string</code>（可选）<br>
        通过身份提供程序获取。
</td>
    </tr>
    <tr>
      <td>
        <code>iconURL</code>
      </td>
      <td>
        <code>string</code>（可选）<br>
        通过身份提供程序获取。
</td>
    </tr>
  </tbody>
</table>



{# wf_devsite_translation #}
