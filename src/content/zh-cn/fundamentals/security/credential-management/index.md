project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on:2016-11-08 #}
{# wf_published_on:2016-11-08 #}

# 凭据管理 API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

[凭据管理 API](https://www.w3.org/TR/credential-management/) 是一个基于标准的浏览器 API，它在网站和浏览器之间提供一个编程接口以支持无缝登录各个设备，同时简化登录流程。




<div class="attempt-right">
  <figure>
    <video src="animations/credential-management-smaller.mov" style="max-height: 400px;" autoplay muted loop controls></video>
    <figcaption>用户登录流程</figcaption>
  </figure>
</div>

凭据管理 API：

* **简化登录流程** - 用户可以自动重新登录某个网站，即使其会话已过期。
* **支持使用帐户选择器一键登录** - 系统显示原生帐户选择器，无需使用登录表单。
* **存储凭据** - 可以存储用户名和密码的组合，甚至联合帐户详情。


想了解其实用效果？试用[凭据管理 API 演示](https://credential-management-sample.appspot.com)并查看[代码](https://github.com/GoogleChrome/credential-management-sample)。




<div class="clearfix"></div>


## 实现凭据管理的步骤

成功集成凭据管理 API 的方法有很多，集成的具体做法取决于网站的结构和用户体验，使用此流程的网站具有以下用户体验优势：




* 将一个服务凭据保存到浏览器的现有用户可立即登录，在完成身份验证后系统将他们重定向到登录页面。
* 保存多个凭据或已停用自动登录的用户在转到网站的登录页面之前需要回复一个对话框。
* 当用户退出时，网站确保他们不会自动重新登录。


要点：使用凭据管理 API 需要通过安全来源提供的页面。


### 检索用户凭据并登录

要使用户登录，请从浏览器的密码管理器检索凭据，并使用这些凭据让用户登录。


例如：

1. 当用户访问您的网站并尚未登录时，调用 `navigator.credential.get()`
2. 使用检索的凭据让用户登录。
3. 更新 UI 以表明用户已登录。


[检索凭据](/web/fundamentals/security/credential-management/retrieve-credentials)中提供了更多详情。


### 保存或更新用户凭据

如果用户使用用户名和密码登录：

1. 在用户成功登录后，创建一个帐号或更改密码，使用用户 ID 和密码创建 `PasswordCredential`。
2. 使用 `navigator.credentials.store()` 保存凭据对象。




如果用户通过 Google Sign-In、Facebook、GitHub 等联合身份提供程序登录：


1. 在用户成功登录后，创建帐号或更改密码，使用用户的电子邮件地址作为 ID 创建 `FederatedCredential`，并通过 `.provider` 指定身份提供程序
2. 使用 `navigator.credentials.store()` 保存凭据对象。



[存储凭据](/web/fundamentals/security/credential-management/store-credentials)中提供了更多详情。


### 退出

当用户退出时，调用 `navigator.credentials.requireUserMediation()` 以阻止用户自动重新登录。


通过停用自动登录，用户还可以轻松地在帐号之间切换，例如，在工作帐号和个人帐号之间切换，或在共享设备上的帐号之间切换，无需重新输入他们的登录信息。



[退出](/web/fundamentals/security/credential-management/retrieve-credentials#sign-out)中提供了更多详情。



## 其他参考

[MDN 上的凭据管理 API](https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API)


{# wf_devsite_translation #}
