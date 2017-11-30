project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on:2016-11-08 #}
{# wf_published_on:2016-11-08 #}

# 存儲憑據 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

通過 `navigator.credentials.store()` API 存儲和更新用戶憑據很簡單。



## 存儲用戶憑據

在用戶成功註冊、登錄或更改密碼後，存儲或更新用戶的憑據。


### 存儲用戶名和密碼詳情

要點：創建一個新的 `PasswordCredential` 對象並使用 `navigator.credentials.store()` 保存它。


在用戶登錄後，並且您已驗證他們的憑據後，創建一個新的 [`PasswordCredential`](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential) 對象並將其傳遞到 `navigator.credentials.store()` 以保存它。



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
  <figcaption>針對自動登錄的用戶的通知</figcaption>
</figure>

當 Chrome 瀏覽器獲取憑據信息時，系統會彈出一個通知，詢問是否存儲憑據（或聯合提供程序）



<div class="clearfix"></div>

### 存儲表單中的用戶名和密碼

要點：使用一個標註明確的表單可輕鬆地創建一個新的 `PasswordCredential` 對象，並使用 `navigator.credentials.store()` 保存它。


除手動創建 `PasswordCredential` 外，您可以只將一個[標註明確的](https://html.spec.whatwg.org/multipage/forms.html#autofill)`form` 元素傳遞到 `PasswordCredential`。



例如：

    <form id="form" method="post">
      <input type="text" name="id" autocomplete="username" />
      <input type="password" name="password" autocomplete="current-password" />
      <input type="hidden" name="csrf_token" value="*****" />
    </form>

然後通過將一個引用傳遞到表單元素創建一個新的 `PasswordCredential` 對象：


    var form = document.querySelector('#form');
    var cred = new PasswordCredential(form);
    // Store it
    navigator.credentials.store(cred)
    .then(function() {
      // continuation
    });

任何附加表單字段都將作爲 `.additionalData` 參數的一部分自動添加到 `PasswordCredential`。



## 存儲聯合帳戶的憑據

要點：創建一個新的 `FederatedCredential` 對象並使用 `navigator.credentials.store()` 保存它。



要存儲聯合帳戶詳情，請實例化一個新的 [`FederatedCredential`](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential)（一個包含用戶標識符和提供程序標識符的對象）。

然後，調用 `navigator.credentials.store()` 以存儲此憑據。


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
      <th colspan=2>參數</th>
    </tr>
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        <code>string</code><br>
        調用身份提供程序特定的身份驗證流程時使用的用戶標識符，通常作爲 OAuth 中  <code>login_hint</code>
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
        用於登錄的提供程序來源的 ASCII 串行化形式。
        例如，Facebook 由  <code>https://www.facebook.com</code> 表示，Google 由  <code>https://accounts.google.com</code> 表示。</td>



    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>string</code>（可選）<br>
        通過身份提供程序獲取。
</td>
    </tr>
    <tr>
      <td>
        <code>iconURL</code>
      </td>
      <td>
        <code>string</code>（可選）<br>
        通過身份提供程序獲取。
</td>
    </tr>
  </tbody>
</table>



{# wf_devsite_translation #}
