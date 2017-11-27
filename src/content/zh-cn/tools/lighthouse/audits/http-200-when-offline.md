project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“处于离线状态时访问网址返回 200”Lighthouse 审查的参考文档。

{# wf_updated_on: 2016-09-15 #}
{# wf_published_on: 2016-09-15 #}

# 处于离线状态时访问网址返回 200 {: .page-title }

## 为什么说此审查非常重要{: #why }

Progressive Web App 可在离线状态下运行。如果在离线状态下访问页面时 Lighthouse 没有收到 HTTP 200 响应，则此页面在离线状态下无法访问。



## 如何通过此审查{: #how }

1. 向您的应用添加一个服务工作线程。
2. 使用此服务器工作线程在本地缓存文件。
3. 处于离线状态时，使用服务工作线程作为网络代理以返回本地缓存的文件版本。


要了解如何将服务工作线程添加到现有应用，请参阅[将服务工作线程和离线支持添加到您的网络应用](https://codelabs.developers.google.com/codelabs/offline)。运用您在这个实用的分步操作的代码实验室中学到的知识，了解如何将服务工作线程添加到您自己的应用中。这包括上述第 1 步和第 3 步。

上面的代码实验室向您展示了有关如何使用 Chrome DevTools 调试工作线程的一些基本知识。
如需更具体的帮助，请参阅本主题专用的代码实验室[调试服务工作线程](https://codelabs.developers.google.com/codelabs/debugging-service-workers)。



使用[离线手册](https://jakearchibald.com/2014/offline-cookbook/)确定哪个缓存策略最适合您的应用。
这包括上述第 2 步。

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 使用 Chrome Debugging Protocol 模拟一个离线连接，然后尝试通过 `XMLHttpRequest` 检索此页面。



{# wf_devsite_translation #}
