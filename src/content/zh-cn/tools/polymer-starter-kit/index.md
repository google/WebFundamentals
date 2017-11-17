project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:Polymer Starter Kit。

{# wf_published_on:2015-01-01 #}
{# wf_updated_on:2016-09-12 #}

# Polymer Starter Kit {: .page-title }

[下载 Polymer Starter Kit](https://github.com/polymerelements/polymer-starter-kit/releases){: .button .button-primary }

## 什么是 Polymer Starter Kit？

[Polymer Starter Kit](https://github.com/PolymerElements/polymer-starter-kit){: .external } 是使用抽屉式导航栏布局进行构建应用的开始点。
布局由 `app-layout` 元素提供。


此模板，以及 `polymer-cli` 工具链，也说明了“PRPL 模式”的使用。此模式允许快先交付和与用户请求的初始路由中的内容进行交互，还有快速后续的通过预先缓存此应用所需的剩余组件的导航，并当用户在应用中导航时，按需逐步地加载它们。





PRPL 模式概括：

* **推送**初始路由需要的组件
* 尽快**呈现**初始路由
* 为其余路由**预缓存**组件
* **延迟加载**并逐步按需升级下一批路由

### 从 Polymer Starter Kit v1 迁移？

[请查看我们关于 PSK2 中的更改以及如何迁移的博文！](https://www.polymer-project.org/1.0/blog/2016-08-18-polymer-starter-kit-or-polymer-cli.html){: .external }

## 设置

### 先决条件

安装 [polymer-cli](https://github.com/Polymer/polymer-cli){: .external }:

    npm install -g polymer-cli

### 在模板中初始化项目

    mkdir my-app
    cd my-app
    polymer init starter-kit

### 启动开发服务器

此命令在 `http://localhost:8080` 中服务于此应用，并为此应用提供基本的网址路由：


    polymer serve --open


### 版本号

此命令在应用依赖关系中执行 HTML、CSS 和 JS 缩减，并在 `polymer.json` 中指定的进入点和片段的基础上生成一个带有预缓存依赖关系代码的 service-worker.js 文件。缩减的文件将输出到 `build/unbundled` 文件夹，且适用于从 HTTP/2+Push 兼容性服务器中提供服务。





此外，此命令还创建了一个后备 `build/bundled` 文件夹，使用片段捆绑生成，适用于从非 H2/push 兼容性服务器提供服务或适用于不支持 H2/Push 的客户端。



    polymer build

### 预览此版本

此命令在 `http://localhost:8080` 中提供了此应用未捆绑状态的缩减版本，因为其由兼容的 push 服务器提供服务：


    polymer serve build/unbundled

此命令在 `http://localhost:8080` 中提供了此应用缩减版本，使用片段捆绑生成：


    polymer serve build/bundled

### 运行测试

此命令将针对机器上当前安装的浏览器运行[网络组件测试程序](https://github.com/Polymer/web-component-tester){: .external }。



    polymer test

### 添加新视图

您可以通过添加更多按需加载的视图来扩展应用，例如，以路由为基础，或逐步呈现此应用程序的非关键部分。每一个新的按需加载的片段都应添加到所包含 `polymer.json` 文件中的 `fragments` 列表。
这将确保那些组件及其依赖关系会被添加到预缓存的组件列表内（也将会在后备 `bundled` 版本中创建捆绑）。



## 后续步骤

查看[入门指南](https://www.polymer-project.org/1.0/start/toolbox/set-up){: .external }

## 了解详情

如需了解详细信息、查看代码，提交问题或参与其中，请查看我们在 [https://github.com/polymerelements/polymer-starter-kit](https://github.com/polymerelements/polymer-starter-kit){: .external } 上提供的 Git 存储区



{# wf_devsite_translation #}
