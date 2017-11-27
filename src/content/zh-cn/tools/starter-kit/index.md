project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:Web Starter Kit 是多设备开发的样板文件和工具

{# wf_published_on:2015-01-01 #}
{# wf_updated_on:2016-09-12 #}

# Web Starter Kit {: .page-title }

[下载 Web Starter Kit（测试版）](https://github.com/google/web-starter-kit/releases/latest){: .button .button-primary }

## 什么是 Web Starter Kit？

[Web Starter Kit](https://github.com/google/web-starter-kit) 是用于 Web 开发的样板文件。在多台设备上构建卓越体验并且[以性能为导向](#web-performance)的工具。帮助您遵循 Google 的[网页基础知识](/web/fundamentals/)中介绍的最佳做法，以便保持工作效率。为行业的专业人士和新来者提供一个坚实的起点。

### 功能

| 功能                                | 摘要                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|自适应样板文本 | 针对跨屏网页优化的自适应样板文本。由 [Material Design Lite](http://getmdl.io) 提供技术支持。您可以使用这个工具或者 [basic.html](https://github.com/google/web-starter-kit/blob/master/app/basic.html) 从头开始。                          |
| Sass 支持                           | 轻松将 [Sass](http://sass-lang.com/) 汇编到 CSS 中，可以支持变量、混合类以及更多。（生产时运行 `gulp serve` 或 `gulp`）                                                                                                      |
| 性能优化               | 缩小并连接 JavaScript、CSS、HTML 和图像来帮您精简页面。（运行 `gulp` 以便向 `/dist` 中创建经过优化的项目版本）                                                                                                |
| 代码错误分析               | JavaScript 代码错误分析是通过 [ESLint](http://eslint.org)（用于识别和报告 JavaScript 中的模式的可插拔代码分析工具）完成的。Web Starter Kit 使用的 ESLint 具有 [eslint-config-google](https://github.com/google/eslint-config-google)，视图遵循 Google JavaScript 风格指南。                                                                                                |
| 通过 Babel 6.0 支持 ES2015                    | 可选的 ES2015 支持（使用 [Babel](https://babeljs.io/){: .external }）。为了启用 ES2015 支持，请删除 (https://github.com/google/web-starter-kit/blob/master/.babelrc) 文件中的 `"only": "gulpfile.babel.js",` 这一行。ES2015 源代码将自动转译为 ES5，以提供广泛的浏览器支持。  |
| 内置的 HTTP 服务器                   | 内置的服务器可在您开发和迭代时在本地预览网站                                                                                                                                                                            |
| 实时浏览器重新加载                 | 在进行任何编辑后实时重新加载浏览器，无需扩展程序。（运行 `gulp serve` 并编辑您的文件）                                                                                                                           |
| 跨设备同步           | 当您编辑项目时在多台设备上同步点击、滚动、形成和实时重新加载。由 [BrowserSync](http://browsersync.io) 提供技术支持。（运行 `gulp serve` 并打开网络中其他设备上提供的 IP）                       |
| 离线支持                     | 由于我们已经完成了[服务工作线程](/web/fundamentals/getting-started/primers/service-workers)[预先缓存](https://github.com/google/web-starter-kit/blob/master/gulpfile.babel.js#L226)，将 `dist` 部署到 HTTPS 域中的网站可以获得离线支持。这一步可以通过 [sw-precache](https://github.com/GoogleChrome/sw-precache/) 实现。                                                                                                                                              |
| PageSpeed Insights                     | 显示您的网站在移动设备和台式机上运行性能的网页性能指标（运行 `gulp pagespeed`）                                                                                                                                                    |

## 快速入门

[下载](https://github.com/google/web-starter-kit/releases/latest)工具包或者克隆[这个](https://github.com/google/web-starter-kit)存储区并根据 `app` 目录中包含的内容进行构建。



您有两个 HTML 起点可以选择：

- `index.html` - 默认起点，包含 Material Design 布局。
- `basic.html` - 无布局，但仍包含我们最低限度的移动最佳做法

请务必参阅[安装文档](https://github.com/google/web-starter-kit/blob/master/docs/install.md)，验证您的环境是否已准备好运行 WSK。验证您的系统可以运行 WSK 后，请检查可用的[命令](https://github.com/google/web-starter-kit/blob/master/docs/commands.md)以便开始使用。


## 网页性能

Web Starter Kit 努力为您提供开箱即用的高性能起点。我们的默认模板的中值网页测试[得分](http://www.webpagetest.org/result/151201_VW_XYC/){: .external }[速度指数](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index) 为 ~1100（1000 为理想值），重复访问速度指数为 ~550，这一切都得益于服务工作线程预先缓存。 

## 浏览器支持

目前，我们致力于为以下浏览器的两个最新版本提供官方支持：

* Chrome
* Edge
* Firefox
* Safari
* Opera
* Internet Explorer 9+

这并不是说 Web Starter Kit 不能在比上述版本旧的浏览器中使用，仅仅表示我们关注的重点是确保上述浏览器中的布局卓越。

## 故障排除

如果您在安装或运行这些工具时遇到问题，请查看我们的[问题排查](https://github.com/google/web-starter-kit/wiki/Troubleshooting)指南，然后提出[问题](https://github.com/google/web-starter-kit/issues)。我们非常乐意与您讨论问题的解决办法。

## 仅限样板文本选项

如果您不愿意使用我们的任何工具，请从项目中删除以下文件：`package.json`、`gulpfile.babel.js`、`.jshintrc` 和 `.travis.yml`。您现在可以安全地选择使用具有备用构建系统或不具备任何构建系统的样板文本了。

## 文档和诀窍

* [文件附录](https://github.com/google/web-starter-kit/blob/master/docs/file-appendix.md) - 这里的不同文件是干什么用的？
* [使用 Material Design Lite 的 Sass](https://github.com/google/web-starter-kit/blob/master/docs/mdl-sass.md) - 如何使 MDL 的 Sass 与 WSK 结合使用。
* [部署指南](https://github.com/google/web-starter-kit/blob/master/docs/deploy.md) - 可供 Firebase、Google App Engine 和其他服务使用。
* [Gulp 诀窍](https://github.com/gulpjs/gulp/tree/master/docs/recipes) - 官方的 Gulp 诀窍目录包括您可以添加到项目中的不同工作流程的综合指南。

## 灵感

Web Starter Kit 的灵感来源于[移动设备 HTML5 样板文件](https://html5boilerplate.com/mobile/){: .external }以及 Yeoman 的 [generator-gulp-webapp](https://github.com/yeoman/generator-webapp)，并且在开发的过程中采用了这两个项目的贡献者的意见。我们的[常见问题解答](https://github.com/google/web-starter-kit/wiki/FAQ)试图回答有关项目的常见问题。


## 了解详情

如需了解详细信息、查看代码，提交问题或参与其中，请查看我们在 [https://github.com/google/web-starter-kit](https://github.com/google/web-starter-kit) 上提供的 Git 存储区



{# wf_devsite_translation #}
