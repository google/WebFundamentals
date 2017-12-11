project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:很容易忽视您的用户在使用移动设备时遇到的网络条件。使用 DevTools 可以模拟不同的网络条件。解决全部的加载时间问题，您的用户会感谢您。

{# wf_updated_on:2015-07-20 #}
{# wf_published_on:2015-04-13 #}

# 在不断变化的网络条件下优化性能 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/jonathangarbee.html" %}

很容易忽视您的用户在使用移动设备时遇到的网络条件。使用 DevTools 可以模拟不同的网络条件。解决全部的加载时间问题，您的用户会感谢您。


### TL;DR {: .hide-from-toc }
- 使用 Chrome DevTools 网络模拟器，在不影响其他标签流量的情况下模拟您网站的性能。
- 使用特定于您的受众网络条件的自定义配置文件。


## 模拟网络连接

利用网络调节，您可以在不同的网络连接（包括 Edge、3G，甚至离线）下测试网站。这样可以限制出现最大的下载和上传吞吐量（数据传输速率）。延迟时间操控会强制连接往返时间 (RTT) 出现最小延迟。



可以通过 Network 面板开启网络调节。从下拉菜单中选择要应用网络节流和延迟时间操控的连接。


![选择网络节流](imgs/throttle-selection.png)

**提示**：您还可以通过 [Network conditions](#network-conditions) 抽屉式导航栏设置网络节流。


启用节流后，面板指示器会显示一个警告图标，在您位于其他面板时提醒您已启用节流。


![Network 面板选择器，带警告指示器](imgs/throttling-enabled.png)

## 自定义节流

DevTools 提供了许多默认条件。您可能需要添加自定义条件，以便覆盖受众的主要条件。


要添加条件，请打开下拉菜单应用条件。在 **custom** 标题下，找到并选择 **Add...** 选项。这将打开 DevTools 的 Settings 对话框，“Throttling”标签也会处于打开状态。



![节流设置索引](imgs/throttle-index.png)

首先，请点击 **Add custom profile** 按钮。这将打开一个内联表单，用于提供配置文件条件。准确地填写表单，满足您的需求后按 **Add** 按钮。



![节流设置，添加自定义节流](imgs/add-custom-throttle.png)

您可以将鼠标悬停在条目上修改现有的自定义配置文件。悬停时，**Edit** 和 **Delete** 图标会显示在条目的右侧。


![节流设置，修改自定义条目](imgs/hover-to-modify-custom-throttle.png)

现在您可以关闭 Settings 对话框。您的新自定义配置文件会显示在 **custom** 标题下，用于条件选择。


## 打开 Network conditions 抽屉式导航栏{:#network-conditions}

其他 DevTools 面板会随 **Network conditions** 抽屉式导航栏一起打开，您可以借此访问诸多网络功能。
 

![Network conditions 抽屉式导航栏](imgs/network-drawer.png)

从 DevTools 主菜单访问抽屉式导航栏（**Main Menu** > **More Tools** >
**Network Conditions**）。

![打开 Network conditions 抽屉式导航栏](imgs/open-network-drawer.png)


{# wf_devsite_translation #}
