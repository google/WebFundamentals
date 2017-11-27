project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:按框架、网域、类型或其他条件组织资源。

{# wf_updated_on:2016-07-28 #}
{# wf_published_on:2015-04-13 #}

# 检查资源 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

按框架、网域、类型或其他条件组织资源。



### TL;DR {: .hide-from-toc }
- 使用 <strong>Application</strong> 面板的 <strong>Frames</strong> 窗格可以按框架组织资源。
- 您也可以在 <strong>Sources</strong> 面板中停用 <strong>Group by folder</strong> 选项，按框架查看资源。
- 要按网域和文件夹查看资源，请使用 <strong>Sources</strong> 面板。
- 在 <strong>Network</strong> 面板中按名称或其他条件过滤资源。


## 按框架组织资源 {:#frames}

使用 **Application** 面板的 **Frames** 窗格可以按框架组织页面的资源。


![框架详情][frames]

* 顶层（上面屏幕截图中的 `top`）是主文档。
* 在这下方（例如上面屏幕截图中的 `widget2`）是主文档的子框架。
展开一个子框架可以查看源自该框架的资源。

* 子框架下方是图像、脚本，以及主文档的其他资源。

* 最后是主文档本身。

点击资源可以查看其预览。

右键点击资源可以在 **Network** 面板中查看、将其在新标签中打开、复制其网址或将其保存。


![查看资源][resource]

通过在 **Sources** 面板中点击导航器中的溢出菜单并停用 **Group by folder** 选项以停止按文件夹分组资源，您也可以按框架查看资源。



![Group by folder 分组](imgs/group-by-folder.png)

资源将仅按框架列示。

![无文件夹](imgs/no-folders.png)

[frames-pane]: /web/tools/chrome-devtools/manage-data/imgs/frames-pane.png
[frames]: /web/tools/chrome-devtools/manage-data/imgs/frames.png
[resource]: /web/tools/chrome-devtools/manage-data/imgs/resource.png

## 按网域和文件夹组织资源 {:#sources}

要查看按网域和目录组织的资源，请使用 **Sources** 面板。


![Sources 面板](imgs/sources.png)

## 按名称、类型或其他条件过滤资源 {:#filter}

使用 **Network** 面板可以按名称、类型和一系列其他条件过滤资源。
参阅下面的指南了解详情。

{# include shared/related_guides.liquid inline=true list=page.related-guides.filter #}


{# wf_devsite_translation #}
