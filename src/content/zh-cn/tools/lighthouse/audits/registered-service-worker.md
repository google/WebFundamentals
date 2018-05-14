project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“具有已注册的服务工作线程”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-07-25 #}
{# wf_published_on:2016-07-25 #}

# 具有已注册的服务工作线程 {: .page-title }

## 为什么说此审查非常重要{: #why }

注册服务工作线程是启用以下 Progressive Web App 功能的第一步：


* 离线
* 推送通知
* 添加到主屏幕

## 如何通过此审查{: #how }

注册服务工作线程仅涉及几行代码，但您使用服务工作线程的唯一原因是实现上面列出的某一个 Progressive Web App 功能。实现上述功能需要执行更多工作。


有关缓存文件以供离线使用的更多帮助，请参阅以下 Lighthouse 文档的“如何通过此审查”部分：[处于离线状态时访问网址返回 200](http-200-when-offline#how)。



对于启用推送通知或“添加到主屏幕”，请完成以下分步教程，然后运用您学到的知识在您自己的应用中实现这些功能：



* [为网络应用启用推送通知](https://codelabs.developers.google.com/codelabs/push-notifications)。
* [将网络应用添加到用户的主屏幕](https://codelabs.developers.google.com/codelabs/add-to-home-screen)。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

检查 Chrome Debugger 是否返回一个服务工作线程版本。


{# wf_devsite_translation #}
