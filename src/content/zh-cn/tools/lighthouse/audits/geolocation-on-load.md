project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“页面在加载时不会自动请求地理定位”Lighthouse 审查的参考文档。

{# wf_updated_on: 2016-11-30 #}
{# wf_published_on: 2016-11-30 #}

# 页面在加载时不会自动请求地理定位 {: .page-title }

## 为什么说此审查非常重要{: #why }

页面在加载时自动请求用户位置会使用户不信任页面或感到困惑。
应将此请求与用户的手势（如点按一个“Find Stores Near Me”按钮）进行关联，而不是在页面加载时自动请求用户的位置。

确保手势清楚明确地表达了对用户位置的需求。


## 如何通过此审查{: #how }

在 **URLs** 下，Lighthouse 报告您的代码在其中请求用户位置的行号和列号。
删除这些调用，将此请求与用户手势进行关联。
 

有关请求用户位置时的最佳做法列表，请参阅[以负责任的方式请求权限][ask]。


[ask]: /web/fundamentals/native-hardware/user-location/#ask_permission_responsibly

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

如果在 Lighthouse 审查前已向页面授予地理定位权限，则 Lighthouse 无法确定此页面在加载时是否请求用户的位置。重置权限并再次运行 Lighthouse。请参阅[更改网站权限][help]以获取更多帮助。


Lighthouse 收集在页面加载时执行的 JavaScript。如果此代码包含对 `geolocation.getCurrentPosition()` 或 `geolocation.watchPosition()` 的调用，且未授予地理定位权限，则会请求用户的位置。




[help]: https://support.google.com/chrome/answer/6148059


{# wf_devsite_translation #}
