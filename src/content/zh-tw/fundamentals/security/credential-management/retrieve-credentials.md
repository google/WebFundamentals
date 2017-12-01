project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on:2016-11-08 #}
{# wf_published_on:2016-11-08 #}

# 檢索憑據 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

要使用戶登錄，請從瀏覽器的密碼管理器檢索憑據，並使用這些憑據讓用戶登錄。


要檢索用戶的憑據，請使用 `navigator.credentials.get()`，其返回一個使用憑據對象作爲參數進行解析的 promise。獲取的憑據對象可以是 [`PasswordCredential`](#authenticate_with_a_server) 或 [`FederatedCredential`](#authenticate_with_an_identity_provider)。如果憑據信息不存在，則會返回 `null`。


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


### `navigator.credentials.get` 參數 {: .hide-from-toc }

<table class="responsive properties">
  <tbody>
    <tr>
      <th colspan=2>參數</th>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>Boolean</code><br>
        設置爲  <code>true</code> 以檢索 <code>PasswordCredentials</code>。
        默認設置爲  <code>false</code>。
</td>
    </tr>
    <tr>
      <td>
        <code>federated</code>
      </td>
      <td>
        <code>Object</code><br>
        接受  <code>provider</code> 或  <code>protocol</code> 作爲鍵的對象，它有一個參數數組。
Object <code>provider</code>
        接受一個可識別提供程序的字符串數組。目前，沒有瀏覽器實現  <code>protocol</code>。
</td>

    </tr>
    <tr>
      <td>
        <code>unmediated</code>
      </td>
      <td>
        <code>Boolean</code><br>
        設置爲  <code>true</code> 以避免顯示帳戶選擇器 UI。
</td>
    </tr>
  </tbody>
</table>

## 獲取憑據

### 自動獲取憑據

要讓用戶自動登錄，請在用戶訪問您的網站時使用 `unmediated: true` 請求一個憑據對象，例如：


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
  <figcaption>針對自動登錄的用戶的通知</figcaption>
</figure>

此請求將立即使用一個憑據對象進行解析，並且不會顯示帳戶選擇器。
當瀏覽器獲取憑據信息時，系統將彈出一個通知：


<div class="clearfix"></div>


### 通過帳戶選擇器獲取憑據

<figure class="attempt-right">
  <img src="imgs/account-chooser.png">
  <figcaption>帳戶選擇器 UI</figcaption>
</figure>

如果用戶需要調節，或具有多個帳戶，則使用帳戶選擇器讓用戶登錄，從而跳過普通的登錄表單。


當用戶點按“Sign-In”按鈕時，通常會調用帳戶選擇器。
用戶可以選擇一個帳戶進行登錄，例如：

<div class="clearfix"></div>


要啓用帳戶選擇器，請將 `unmediated` 屬性設置爲 `false`：


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

在用戶選擇了他們要使用的帳戶後，promise 將基於他們的選擇使用 `PasswordCredential` 或 `FederatedCredential` 進行解析。然後，[確定憑據類型](#determine-credential-type)並使用提供的憑據對用戶進行身份驗證。


如果用戶取消帳戶選擇器或沒有存儲憑據，則 promise 使用一個 `undefined` 值進行解析。
在此情況下，回退到登錄表單體驗。





## 確定憑據類型{: #determine-credential-type }

當 `navigator.credentials.get()` 進行解析時，它將返回 `undefined` 或 Credential 對象。
要確定它是 `PasswordCredential` 還是 `FederatedCredential`，只需查看此對象的 `.type` 屬性，即 `password` 或 `federated`。


 

如果 `.type` 是 `federated`，則 `.provider` 屬性是一個表示身份提供程序的字符串。


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


如果是一個 `undefined` 值，則用戶繼續處於退出狀態。

當出現以下情況時傳遞一個 `undefined` 值：

* 用戶尚未確認自動登錄功能（每個瀏覽器實例確認一次）。
* 用戶沒有憑據，或在源中存儲了兩個以上的憑據對象。
* 用戶已請求用戶對源進行調節。




## 對用戶進行身份驗證


### 使用用戶名和密碼進行身份驗證

要向服務器驗證用戶的身份，請使用 `fetch()` 將提供的 `PasswordCredential` POST 到服務器。


完成 POST 後，`fetch` 自動將 `PasswordCredential` 對象轉換爲使用 `multipart/form-data` 編碼的 `FormData` 對象：


    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="id"

    chromedemojp@gmail.com
    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="password"

    testtest
    ------WebKitFormBoundaryOkstjzGAv8zab97W--

注：您不能使用 `XMLHttpRequest` 將 `PasswordCredential` POST 到您的服務器。


#### `PasswordCredential` 參數

獲取的 `PasswordCredential` 對象包括以下參數：

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
        <code>String</code><br>
        用戶標識符字符串。
</td>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>String</code><br>
        不透明的密碼，您無法使用 JavaScript 獲取。
</td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>String</code><br>
        用戶名字符串。
</td>
    </tr>
    <tr>
      <td>
        <code>iconURL</code>
      </td>
      <td>
        <code>String</code><br>
        用戶圖標圖像網址字符串。
</td>
    </tr>
  </tbody>
</table>

#### 更改參數

在某些情況下，可能必須將附加數據添加到身份驗證 POST。


通過向 `.idName` 或 `.passwordName` 分配一個字符串來更改參數鍵。

您也可以通過向 `FormData` 分配一個 `.additionalData` 來添加額外參數（如跨站點請求僞造 (CSRF) 令牌），並向該參數追加鍵值。



獲取憑據對象後：

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

您可以通過向 `.additionalData` 分配一個 `URLSearchParams` 對象（而非 `FormData`）來執行相似操作。
在此情況下，使用 `application/x-www-form-urlencoded` 對整個憑據對象進行編碼。


### 使用身份提供程序進行身份驗證

要通過身份提供程序對用戶進行身份驗證，使用具有 `FederatedCredential` 的特定身份驗證流程即可。


例如，如果提供程序爲 Google，則使用 [Google Sign-In JavaScript 內容庫](/identity/sign-in/web/)：


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


Google Sign-In 會生成一個 id 令牌作爲身份驗證的證明，您將該令牌發送到服務器以創建一個會話。


有關其他身份提供程序，請參閱相應的文檔：

* [Facebook](https://developers.facebook.com/docs/facebook-login)
* [Twitter](https://dev.twitter.com/web/sign-in/implementing)
* [GitHub](https://developer.github.com/v3/oauth/)



## 退出{: #sign-out }

當用戶退出您的網站時，您需要確保此用戶在下次訪問時不會自動登錄。
要關閉自動登錄，請調用 [`navigator.credentials.requireUserMediation()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/requireUserMediation)：



    // After a user signing out...
    navigator.credentials.requireUserMediation();

然後，如果使用 `unmediated: true` 調用`navigator.credentials.get()`，它將返回 `undefined` 並且用戶不會登錄。
系統僅針對此源的當前瀏覽器實例記住這個值。


要繼續使用自動登錄，用戶可以選擇主動登錄，只需從帳戶選擇器中選擇他們在登錄時要使用的帳戶。
於是，用戶在明確退出前始終可以重新登錄。




{# wf_devsite_translation #}
