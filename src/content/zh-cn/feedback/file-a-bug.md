project_path: /web/feedback/_project.yaml
book_path: /web/feedback/_book.yaml

{# wf_updated_on: 2016-10-24 #} {# wf_published_on: 2016-10-24 #}

# 如何提交一个好的 Bug {: .page-title }

提交一个好的 Bug 并不难，只需要一些工作。我们的目标是让您轻松找到损坏的东西及其根本原因，最重要的是找到解决问题的方法。快速进展的 Bug 往往很容易重现并具有明确的预期行为。

## 其他人是否遇到同样的问题？

其他开发人员很有可能遇到相同的问题。尝试在[Stack Overflow](http://stackoverflow.com/)上搜索 Bug。这可能有助于将抽象问题转换为特定的API损坏。您也可能会获得短期的解决方案。

一旦你知道了 Bug 是什么，请使用[浏览器 Bug 搜索](/web/feedback/)。如果这是个已知 Bug，您可用通过星标，收藏或评论该 Bug 来支持 Bug 解决。如果没有，是时候提交错误了。

## What's the correct behavior?

首先，了解“正确”行为应该是什么。

查看[MDN](https://developer.mozilla.org/)上的相关API文档或尝试查找相关规范。这些信息可以帮助您确定哪个API实际上已损坏，哪些API损坏，以及预期的行为应该是什么。

### 在其他浏览器上行为是否不同？

浏览器之间不同的行为通常被优先考虑作为互操作性问题，特别是当包含 Bug 的浏览器非常奇怪的时候。尝试使用[BrowserStack](https://www.browserstack.com/)等工具测试最新版本的Chrome，Firefox，Safari和Edge 。

如果可能，请检查是否由于用户代理嗅探而导致页面故意表现不同。尝试在 开发工具 > 菜单 > 更多工具 > 网络条件 中将用户代理字符串设置为另一个浏览器。注意：不要忘记将其设置回自动。

### 这是回归吗？

是否过去一直有效，但在最近的浏览器版本中出现了问题？这样的“回归”可以更快地起作用，特别是当你能提供它工作的版本号和失败的版本号时。[BrowserStack](https://www.browserstack.com/) 之类的工具 可以让您轻松查看旧的浏览器版本。

如果问题是回归并且能被重现，通常可以快速找到并修复根源。

## 创建最小化的测试用例

Mozilla 有一篇关于如何创建最小化测试用例的精彩文章。总而言之，虽然对问题的描述是一个很好的开始，但没有什么比在表明问题的 Bug 中提供链接（例如在 [jsbin.com](https://jsbin.com/)上）更棒的。为了加快进展，示例应包含演示问题所需的最少可能代码。缩小代码示例是您可以做的第一件事，以增加您的错误修复的几率。

以下是一些缩小测试用例的技巧：

- 下载网页，添加 `<base href="http://original.url">` 并验证在本地是否存在 Bug。如果URL使用HTTPS，则可能需要在线的HTTPS服务器。
- 在尽可能多的最新版本的浏览器上测试本地文件。
- 尝试将所有内容压缩为1个文件。
- 删除代码（从你所知不必要的东西开始），直到 Bug 消失。
- 使用版本控制，以便您可以保存您的工作并撤消出错的内容。

### 执行缩小的测试用例

如果您正在寻找一个助您缩小测试用例的好地方，那么有几个好地方可用：

- [JSBin](https://jsbin.com)
- [JSFiddle](https://jsfiddle.net)
- [CodePen](https://codepen.io)

### 包含详尽的环境信息

某些 Bug 仅可在特定操作系统或特定类型的显示器上重现（例如低dpi或高dpi）上重现。请务必提供您使用的测试环境的详细信息。

## 提交您的问题

一旦您获得了最小化的测试用例，您就可以准备提交 Bug 了。转到对应的 Bug 跟踪网站。

- [Chromium bugs](https://crbug.com)
- [Edge bugs](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/)
- [Mozilla bugs](https://bugzilla.mozilla.org/)
- [WebKit bugs](https://bugs.webkit.org/)
