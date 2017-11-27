project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“网站不使用应用缓存”Lighthouse 审查的参考文档。

{# wf_updated_on: 2017-01-04 #}
{# wf_published_on: 2017-01-04 #}

# 网站不使用应用缓存 {: .page-title }

## 为什么说此审查非常重要{: #why }

应用缓存（也称为 AppCache）已[弃用][deprecated]。

[deprecated]: https://html.spec.whatwg.org/multipage/browsers.html#offline

## 如何通过此审查{: #how }

考虑使用服务工作线程 [Cache API][API]。

为帮助您从 AppCache 迁移到服务工作线程，请考虑使用 [sw-appcache-behavior][sw-appcache-behavior] 内容库。
此内容库将针对 AppCache 清单中定义的行为生成一个基于服务工作线程的实现。



有关使用服务工作线程为网站提供离线支持的更多资源，请参阅[处于离线状态时访问网址返回 200](http-200-when-offline) 审查参考。



[API]: https://developer.mozilla.org/en-US/docs/Web/API/Cache

[sw-appcache-behavior]: https://github.com/GoogleChrome/sw-appcache-behavior

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

如果未检测到 AppCache 清单，则表示通过了审查。


{# wf_devsite_translation #}
