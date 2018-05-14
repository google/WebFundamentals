project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“页面在加载时不会自动请求通知权限”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-12-05 #}
{# wf_published_on:2016-12-05 #}

# 页面在加载时不会自动请求通知权限 {: .page-title }

## 为什么说此审查非常重要{: #why }

如[怎样才算好的通知][good]中所述，好的通知需要做到及时、相关且精确。
如果您的页面在加载时要求权限以发送通知，则这些通知可能与您的用户无关或者不是他们的精准需求。为提高用户体验，最好是向用户发送特定类型的通知，并在他们选择加入后显示权限请求。



[good]: /web/fundamentals/push-notifications/

## 如何通过此审查{: #how }

在 **URLs** 下，Lighthouse 报告您的代码在其中请求权限以发送通知的行号和列号。
移除这些调用，将此请求与用户手势进行关联。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

如果在 Lighthouse 审查前，已向页面授予或拒绝授予通知权限，则 Lighthouse 无法确定此页面在加载时是否请求通知权限。重置权限并再次运行 Lighthouse。
请参阅[更改网站权限][help]以获取更多帮助。

Lighthouse 收集在页面加载时执行的 JavaScript。如果此代码包含对 `notification.requestPermission()` 的调用，且尚未授予通知权限，则会请求通知权限。



[help]: https://support.google.com/chrome/answer/6148059


{# wf_devsite_translation #}
