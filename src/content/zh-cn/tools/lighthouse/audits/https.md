project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“网站在 HTTPS 上”Lighthouse 审查的参考文档。

{# wf_updated_on: 2016-09-19 #}
{# wf_published_on: 2016-09-19 #}

# 网站在 HTTPS 上 {: .page-title }

## 为什么说此审查非常重要{: #why }

所有网站均应使用 HTTPS 进行保护，即使是不处理敏感数据的网站也应如此。
HTTPS 可防止入侵者篡改或被动地侦听您的网站和您的用户之间的通信。


HTTPS 也是许多强大的新网络平台功能（如拍照或录制音频）的前提条件。


根据定义，一个应用如果不在 HTTPS 上运行，那么它就不符合成为 Progressive Web App 的条件。
这是因为许多核心的 Progressive Web App 技术（如服务工作线程）都需要使用 HTTPS。


有关为什么所有网站都应使用 HTTPS 进行保护的详细信息，请参阅[为什么应始终使用 HTTPS](/web/fundamentals/security/encrypt-in-transit/why-https)。


## 如何通过此审查{: #how }

将您的网站迁移到 HTTPS。

默认情况下，[Firebase](https://firebase.google.com/docs/hosting/){: .external } 或 [GitHub Pages](https://pages.github.com/){: .external } 等许多托管平台都是安全的。



如果您运行自己的服务器并且需要一个成本低廉且简单的方式来生成证书，请访问 [Let's Encrypt](https://letsencrypt.org/){: .external }。
有关在您的服务器上启用 HTTPS 的更多帮助，请参阅以下文档集：[对传输中的数据进行加密](/web/fundamentals/security/encrypt-in-transit/enable-https)。



如果您的页面已经在 HTTPS 上运行，但您没有通过此审查，那么，您可能存在混合内容问题。
当安全的网站请求不受保护的 (HTTP) 资源时将出现混合内容。
请在 Chrome DevTools Security 面板上查阅以下文档以了解如何处理这些情况：[了解安全问题](/web/tools/chrome-devtools/debug/security)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 等待来自 Chrome Debugger Protocol 的一个事件，其可表明页面正在安全的连接上运行。
如果在 10 秒内未侦听到此事件，则表示审查失败。



{# wf_devsite_translation #}
