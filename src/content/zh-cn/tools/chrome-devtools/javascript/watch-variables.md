project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:利用 Chrome DevTools，您可以轻松地查看整个应用中的多个变量。

{# wf_published_on:2016-02-11 #}
{# wf_updated_on:2016-02-11 #}

# 在 Sources 中观察变量 {: .page-title }

{% include "web/_shared/contributors/jonathangarbee.html" %}

利用 Chrome DevTools，您可以轻松地查看整个应用中的多个变量。在 Sources 中观察变量让您可以不必使用控制台，并将精力放在改进代码上。


Sources 面板让您可以观察应用中的变量。此功能位于调试程序边栏的 Watch 部分。利用此功能，您无需将对象重复记录到控制台中。



![调试程序的 Watch 部分](imgs/sources-watch-variables-location.png)

## 添加变量

要将变量添加至观察列表，请使用此部分标题右侧的 Add 图标。这将打开内嵌输入窗口，您在这里提供要观察的变量名称。填好后，按 <kbd>Enter</kbd> 键将其添加到列表中。



![添加到观察列表按钮](imgs/add-variable-to-watch.png)

观察窗口将显示变量在添加时的当前值。如果变量未设置或无法找到，值将显示为 <samp>&lt;Not Available&gt;</samp>。


![观察列表中的未定义变量](imgs/undefined-variable-in-watch.png)

## 更新变量

应用继续操作时，变量值会更改。观察列表不是变量的实时视图，除非您正在单步执行。当您使用[断点](add-breakpoints)单步执行时，观察值会自动更新。要手动重新检查列表中的值，请按这一部分标题右侧的 Refresh 按钮。




![刷新观察变量按钮](imgs/refresh-variables-being-watched.png)

请求刷新时，将重新检查当前应用状态。每个观察项目都会更新为当前值。


![所观察的已更新变量](imgs/updated-variable-being-watched.png)

## 移除变量

为了确保您观察的内容尽可能少以加快工作速度，您需要从观察列表中移除变量。可以将鼠标悬停在变量上，然后点击右侧的移除图标。


![将鼠标悬停在变量上以从观察列表中移除](imgs/hover-to-delete-watched-variable.png)


{# wf_devsite_translation #}
