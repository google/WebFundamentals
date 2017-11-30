project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on:2016-11-08 #}
{# wf_published_on:2016-11-08 #}

# 憑據管理 API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

[憑據管理 API](https://www.w3.org/TR/credential-management/) 是一個基於標準的瀏覽器 API，它在網站和瀏覽器之間提供一個編程接口以支持無縫登錄各個設備，同時簡化登錄流程。




<div class="attempt-right">
  <figure>
    <video src="animations/credential-management-smaller.mov" style="max-height: 400px;" autoplay muted loop controls></video>
    <figcaption>用戶登錄流程</figcaption>
  </figure>
</div>

憑據管理 API：

* **簡化登錄流程** - 用戶可以自動重新登錄某個網站，即使其會話已過期。
* **支持使用帳戶選擇器一鍵登錄** - 系統顯示原生帳戶選擇器，無需使用登錄表單。
* **存儲憑據** - 可以存儲用戶名和密碼的組合，甚至聯合帳戶詳情。


想了解其實用效果？試用[憑據管理 API 演示](https://credential-management-sample.appspot.com)並查看[代碼](https://github.com/GoogleChrome/credential-management-sample)。




<div class="clearfix"></div>


## 實現憑據管理的步驟

成功集成憑據管理 API 的方法有很多，集成的具體做法取決於網站的結構和用戶體驗，使用此流程的網站具有以下用戶體驗優勢：




* 將一個服務憑據保存到瀏覽器的現有用戶可立即登錄，在完成身份驗證後系統將他們重定向到登錄頁面。
* 保存多個憑據或已停用自動登錄的用戶在轉到網站的登錄頁面之前需要回復一個對話框。
* 當用戶退出時，網站確保他們不會自動重新登錄。


要點：使用憑據管理 API 需要通過安全來源提供的頁面。


### 檢索用戶憑據並登錄

要使用戶登錄，請從瀏覽器的密碼管理器檢索憑據，並使用這些憑據讓用戶登錄。


例如：

1. 當用戶訪問您的網站並尚未登錄時，調用 `navigator.credential.get()`
2. 使用檢索的憑據讓用戶登錄。
3. 更新 UI 以表明用戶已登錄。


[檢索憑據](/web/fundamentals/security/credential-management/retrieve-credentials)中提供了更多詳情。


### 保存或更新用戶憑據

如果用戶使用用戶名和密碼登錄：

1. 在用戶成功登錄後，創建一個帳號或更改密碼，使用用戶 ID 和密碼創建 `PasswordCredential`。
2. 使用 `navigator.credentials.store()` 保存憑據對象。




如果用戶通過 Google Sign-In、Facebook、GitHub 等聯合身份提供程序登錄：


1. 在用戶成功登錄後，創建帳號或更改密碼，使用用戶的電子郵件地址作爲 ID 創建 `FederatedCredential`，並通過 `.provider` 指定身份提供程序
2. 使用 `navigator.credentials.store()` 保存憑據對象。



[存儲憑據](/web/fundamentals/security/credential-management/store-credentials)中提供了更多詳情。


### 退出

當用戶退出時，調用 `navigator.credentials.requireUserMediation()` 以阻止用戶自動重新登錄。


通過停用自動登錄，用戶還可以輕鬆地在帳號之間切換，例如，在工作帳號和個人帳號之間切換，或在共享設備上的帳號之間切換，無需重新輸入他們的登錄信息。



[退出](/web/fundamentals/security/credential-management/retrieve-credentials#sign-out)中提供了更多詳情。



## 其他參考

[MDN 上的憑據管理 API](https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API)


{# wf_devsite_translation #}
