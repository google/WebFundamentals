project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:利用 Chrome DevTools 提供的工具，您可以修复引发异常的网页和在 JavaScript 中调试错误。

{# wf_updated_on:2015-05-12 #}
{# wf_published_on:2015-04-13 #}

# 异常和错误处理 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
利用 Chrome DevTools 提供的工具，您可以修复引发异常的网页和在 JavaScript 中调试错误。

如果您可以了解背后的详细信息，页面异常和 JavaScript 错误会非常有用。在页面引发异常或脚本产生错误时，Console 可以提供具体、可靠的信息来帮助您定位和纠正问题。 

在控制台中，您可以跟踪异常和引发异常的执行路径，显式或隐式捕捉异常（或忽略它们），甚至设置错误处理程序来自动收集和处理异常数据。


### TL;DR {: .hide-from-toc }
- 触发异常时启用 Pause on Exceptions 来调试代码上下文。
- 使用  <code>console.trace</code> 打印当前的 JavaScript 调用堆栈。
- 使用  <code>console.assert()</code> 在您的代码中放置断言和引发异常。
- 使用  <code>window.onerror</code> 记录浏览器中发生的错误。


## 跟踪异常

发生错误时，请打开 DevTools 控制台 (`Ctrl+Shift+J` / `Cmd+Option+J`) 查看 JavaScript 错误消息。每一条消息都有一个指向文件名的链接，文件名带有您可以导航到文件的行号。


异常示例：
![异常示例](images/track-exceptions-tracking-exceptions.jpg)

### 视图异常堆叠追踪

导致错误的执行路径并不总是非常明显。完整的 JavaScript 调用堆栈在控制台中会伴随着异常。展开这些控制台消息可以查看堆栈框架和导航到代码中的相应位置：



![异常堆叠追踪](images/track-exceptions-exception-stack-trace.jpg)

### 出现 JavaScript 异常时暂停

下一次引发异常时，请暂停 JavaScript 执行并检查其调用堆栈、范围变量以及您应用的状态。利用 Scripts 面板底部的三态停止按钮，您可以在不同的异常处理模式之间切换：![暂停按钮](images/track-exceptions-pause-gray.png){:.inline}




选择暂停所有异常或仅暂停未捕捉的异常，您也可以集中忽略异常。

![暂停执行](images/track-exceptions-pause-execution.jpg)

## 打印堆叠追踪

通过将日志消息输出到控制台可更好地了解网页的行为。通过包含关联的堆叠追踪让日志条目的信息更丰富。有多种方式可以实现此目标。

### Error.stack
每个 Error 对象都有一个包含堆叠追踪的字符串属性命名的堆栈：

![Error.stack 示例](images/track-exceptions-error-stack.jpg)

### console.trace()

使用可以打印当前 JavaScript 调用跟踪的 [`console.trace()`](./console-reference#consoletraceobject) 调用设置您的代码：

![console.trace() 示例](images/track-exceptions-console-trace.jpg)

### console.assert()

通过将带有错误条件的 [`console.assert()`](./console-reference#consoleassertexpression-object) 作为第一个参数调用，在您的 JavaScript 代码中放置断言。当此表达式评估为 false 时，您将看到一条相应的 Console 记录：




![console.assert() 示例](images/track-exceptions-console-assert.jpg)

## 如何检查堆叠追踪来查找触发器

我们来看一下如何使用刚刚学习的工具，并找出错误的真正原因。下面是一个包含两个脚本的简单 HTML 页面：



![示例代码](images/track-exceptions-example-code.png)

当用户点击页面时，段落将更改其内部文本，将调用 `lib.js` 提供的 `callLibMethod()` 函数。



此函数会输出一个 `console.log`，然后调用 `console.slog`，后者不是一种由 Console API 提供的方法。调用应触发一个错误。




在页面运行的时候点击页面时，将触发下面的错误：


![触发的错误](images/track-exceptions-example-error-triggered.png)

点击箭头可以展开错误消息：

![展开的错误消息](images/track-exceptions-example-error-message-expanded.png)

控制台会告诉您错误在 `lib.js` 的第 4 行触发，此脚本在 `addEventListener` 回调（匿名函数）的 `script.js` 中的第 3 行调用。



这是一个非常简单的示例，不过，即使最复杂的日志跟踪调试也遵循相同的流程。


## 使用 window.onerror 处理运行时异常

Chrome 会公开 `window.onerror` 处理程序函数，每当 JavaScript 代码执行中发生错误时都会调用此函数。当 JavaScript 异常每次在窗口上下文中引发并且未被 try/catch 块捕捉时，调用此函数时还会调用异常的消息、引发异常的文件的网址、该文件中的行号，三者按照此顺序作为三个参数传递。








举例来说，使用 AJAX POST 调用设置一个错误处理程序，用于收集未捕捉异常的相关信息并将其报告回服务器，您会发现这样非常实用。这样，您可以记录用户浏览器中发生的所有错误并获得相关通知。

使用 `window.onerror` 的示例：

![window.onerror 处理程序的示例](images/runtime-exceptions-window-onerror.jpg)




{# wf_devsite_translation #}
