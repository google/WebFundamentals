project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:了解如何设置 Lighthouse 以审查网络应用。

{# wf_updated_on:2016-09-27 #}
{# wf_published_on:2016-09-27 #}

# 使用 Lighthouse 审查网络应用 {: .page-title }

[Lighthouse](https://github.com/GoogleChrome/lighthouse) 是一个开源的自动化工具，用于改进网络应用的质量。
您可以将其作为一个 Chrome 扩展程序运行，或从命令行运行。
您为 Lighthouse 提供一个您要审查的网址，它将针对此页面运行一连串的测试，然后生成一个有关页面性能的报告。

从此处，您可以失败的测试为指示器，看看可以采取哪些措施来改进您的应用。


注：Lighthouse 目前非常关注 Progressive Web App 功能，如“添加到主屏幕”和离线支持。不过，此项目的首要目标是针对网络应用质量的各个方面提供端到端审查。

## 使用入门

运行 Lighthouse 的方式有两种：作为 Chrome 扩展程序运行，或作为命令行工具运行。
Chrome 扩展程序提供了一个对用户更友好的界面，方便读取报告。
命令行工具允许您将 Lighthouse 集成到持续集成系统。


###  Chrome 扩展程序

下载 Google Chrome 52 或更高版本。

安装 [Lighthouse Chrome 扩展程序](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)。

转到您要进行审查的页面。

点击位于 Chrome 工具栏上的 Lighthouse 图标 (![Lighthouse 图标](images/lighthouse-icon-16.png))。


![Chrome 工具栏上的 Lighthouse 图标](images/icon-on-toolbar.png)

如果您在工具栏上没有看到此图标，它可能隐藏在 Chrome 的主菜单中。


![Chrome 的菜单中的 Lighthouse 图标](images/icon-in-menu.png)

点击此图标后，您应看到一个菜单。

![Lighthouse 菜单](images/menu.png)

如果您想仅运行审查的子集，则点击 **Options** 按钮并停用您不关注的审查。
向下滚动并按 **OK** 以确认您的更改。


![Lighthouse 选项菜单](images/options.png)

点击 **Generate report** 按钮以针对当前打开的页面运行 Lighthouse 测试。


在完成审查后，Lighthouse 将打开一个新标签，并在页面的结果上显示一个报告。


![Lighthouse 报告](images/report.png)

### 命令行工具

安装 [Node](https://nodejs.org)，需要版本 5 或更高版本。

安装 Lighthouse 作为一个全局节点模块。

    npm install -g lighthouse

针对一个页面运行 Lighthouse 审查。

    lighthouse https://airhorner.com/

传递 `--help` 标志以查看可用的输入和输出选项。

    lighthouse --help

## 贡献

Lighthouse 是一个开放源代码项目，欢迎大家积极做贡献。请查看存储区的[问题跟踪器](https://github.com/GoogleChrome/lighthouse/issues)查找您可以修复的错误，以及您可以创建或改进的审查。此问题跟踪器也非常适合讨论审查指标、新的审查想法或与 Lighthouse 有关的任何其他内容。






{# wf_devsite_translation #}
