project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description:了解在 Chrome DevTools 中暂停代码的所有方式。

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2017-02-03 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# 使用断点暂停代码 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

使用断点暂停 JavaScript 代码。 本指南介绍
DevTools 中可用的各类断点，以及何时使用和如何设置各种类型。
 如需了解调试流程的实践教程，请参阅[在 Chrome
DevTools 中调试 JavaScript 入门](/web/tools/chrome-devtools/javascript/)。


## 各类断点使用时间概览 {: #overview }

最广为人知的断点类型是代码行断点。 但是，如果您不知道在何处查找，或者您处理的是大型代码库，则无法高效设置代码行断点。
 了解如何使用及何时使用其他类型的断点后，即可在调试时节省时间。



<table>
  <tr><th>断点类型</th><th>您想要在以下情况下暂停时可使用此断点类型...</th></tr>
  <tr>
    <td><a href="#loc">代码行</a></td>
    <td>
      在确切的代码区域中。
    </td>
  </tr>
  <tr>
    <td><a href="#conditional-loc">条件代码行</a></td>
    <td>
      在确切的代码区域中，且仅当其他一些条件成立时。
    </td>
  </tr>
  <tr>
    <td><a href="#dom">DOM</a></td>
    <td>
      在更改或移除特定 DOM
节点或其子级的代码中。
    </td>
  </tr>
  <tr>
    <td><a href="#xhr">XHR</a></td>
    <td>
      当 XHR 网址包含字符串模式时。
    </td>
  </tr>
  <tr>
    <td><a href="#event-listeners">事件侦听器</a></td>
    <td>
      在触发
<code>click</code> 等事件后运行的代码中。
    </td>
  </tr>
  <tr>
    <td><a href="#exceptions">异常</a></td>
    <td>
      在引发已捕获或未捕获异常的代码行中。

    </td>
  </tr>
  <tr>
    <td><a href="#function">函数</a></td>
    <td>
      任何时候调用特定函数时。
    </td>
  </tr>
</table>

## 代码行断点 {: #loc }

在知道需要调查的确切代码区域时，可以使用代码行断点。
 DevTools *始终*会在执行此代码行之前暂停。


在 DevTools 中设置代码行断点：

1. 点击 **Sources** 标签。
1. 打开包含您想要中断的代码行的文件。
1. 转至代码行。
1. 代码行的左侧是行号列。 点击行号列。 行号列顶部将显示一个蓝色图标。


<figure>
  <img src="imgs/loc-breakpoint.png"
       alt="代码行断点。"
  <figcaption>
    <b>图 1</b>：第 <b>29</b> 行设置的代码行断点
  </figcaption>
</figure>

### 代码中的代码行断点 {: #debugger }

在代码中调用 `debugger` 可在该行暂停。 此操作相当于使用[代码行断点](#loc)，只是此断点是在代码中设置，而不是在 DevTools 界面中设置。



    console.log('a');
    console.log('b');
    debugger;
    console.log('c');

### 条件代码行断点 {: #conditional-loc }

如果知道需要调查的确切代码区域，但只想在其他一些条件成立时进行暂停，则可使用条件代码行断点。



若要设置条件代码行断点：

1. 点击 **Sources** 标签。
1. 打开包含您想要中断的代码行的文件。
1. 转至代码行。
1. 代码行的左侧是行号列。 右键点击行号列。
1. 选择 **Add conditional breakpoint**。 代码行下方将显示一个对话框。
1. 在对话框中输入条件。
1. 按 <kbd>Enter</kbd> 键激活断点。 行号列顶部将显示一个橙色图标。


<figure>
  <img src="imgs/conditional-loc-breakpoint.png"
       alt="条件代码行断点。"
  <figcaption>
    <b>图 2</b>：第 <b>32</b> 行设置的条件代码行断点

  </figcaption>
</figure>

### 管理代码行断点 {: #manage-loc }

使用 **Breakpoints** 窗格可以从单个位置停用或移除代码行断点。


<figure>
  <img src="imgs/breakpoints-pane.png"
       alt="Breakpoints 窗格。"
  <figcaption>
    <b>图 3</b>：显示两个代码行断点的 <b>Breakpoints</b> 窗格：一个代码行断点位于 <code>get-started.js</code> 第 15 行，另一个位于
    第 32 行
  </figcaption>

</figure>

* 勾选条目旁的复选框可以停用相应的断点。
* 右键点击条目可以移除相应的断点。
* 右键点击 **Breakpoints** 窗格中的任意位置可以取消激活所有断点、停用所有断点，或移除所有断点。
 停用所有断点相当于取消选中每个断点。
 取消激活所有断点可让 DevTools 忽略所有代码行断点，但同时会继续保持其启用状态，以使这些断点的状态与取消激活之前相同。




<figure>
  <img src="imgs/deactivated-breakpoints.png"
       alt="Breakpoints 窗格中取消激活的断点。"
  <figcaption>
    <b>图 4</b>：<b>Breakpoints</b> 窗格中取消激活的断点已停用且处于透明状态
  </figcaption>

</figure>

## DOM 更改断点 {: #dom }

如果想要暂停更改 DOM
节点或其子级的代码，可以使用 DOM 更改断点。

若要设置 DOM 更改断点：

1. 点击 **Elements** 标签。
1. 转至要设置断点的元素。
1. 右键点击此元素。
1. 将鼠标指针悬停在 **Break on** 上，然后选择 **Subtree modifications**、**Attribute
  modifications** 或 **Node removal**。

<figure>
  <img src="imgs/dom-change-breakpoint.png"
       alt="用于创建 DOM 更改断点的上下文菜单。"
  <figcaption>
    <b>图 5</b>：用于创建 DOM 更改断点的上下文菜单
  </figcaption>
</figure>

### DOM 更改断点的类型 {: #dom-types }

* **Subtree modifications**： 在移除或添加当前所选节点的子级，或更改子级内容时触发这类断点。
 在子级节点属性发生变化或对当前所选节点进行任何更改时不会触发这类断点。



* **Attributes modifications**：在当前所选节点上添加或移除属性，或属性值发生变化时触发这类断点。


* **Node Removal**：在移除当前选定的节点时会触发。

## XHR/Fetch 断点 {: #xhr }

如果想在 XHR
的请求网址包含指定字符串时中断，可以使用 XHR 断点。 DevTools 会在
XHR 调用 `send()` 的代码行暂停。

注：此功能还可用于 [Fetch][Fetch] 请求。

例如，在您发现您的页面请求的是错误网址，并且您想要快速找到导致错误请求的 AJAX
或
Fetch 源代码时，这类断点很有用。

若要设置 XHR 断点：

1. 点击 **Sources** 标签。
1. 展开 **XHR Breakpoints** 窗格。
1. 点击 **Add breakpoint**。
1. 输入要对其设置断点的字符串。 DevTools 会在 XHR 的请求网址的任意位置显示此字符串时暂停。
1. 按 <kbd>Enter</kbd> 键以确认。

<figure>
  <img src="imgs/xhr-breakpoint.png"
       alt="创建 XHR 断点。"
  <figcaption>
    <b>图 6</b>：在 <b>XHR Breakpoints</b> 中
    对网址中包含 <code>org</code> 的所有请求创建 XHR 断点
  </figcaption>
</figure>

[Fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

## 事件侦听器断点 {: #event-listeners }

如果想要暂停触发事件后运行的事件侦听器代码，可以使用事件侦听器断点。
 您可以选择 `click` 等特定事件或所有鼠标事件等事件类别。


1. 点击 **Sources** 标签。
1. 展开 **Event Listener Breakpoints** 窗格。 DevTools 会显示 **Animation** 等事件类别列表。
1. 勾选这些类别之一以在触发该类别的任何事件时暂停，或者展开类别并勾选特定事件。


<figure>
  <img src="imgs/event-listener-breakpoint.png"
       alt="创建事件侦听器断点。"
  <figcaption>
    <b>图 7</b>：为
    <code>deviceorientation</code> 创建事件侦听器断点
  </figcaption>
</figure>

## 异常断点 {: #exceptions }

如果想要在引发已捕获或未捕获异常的代码行暂停，可以使用异常断点。


1. 点击 **Sources** 标签。
1. 点击 **Pause on exceptions** ![引发异常时暂停](imgs/pause-on-exceptions.png)
{:.devtools-inline}。 启用后，此按钮变为蓝色。
1. （可选）如果除未捕获异常以外，还想在引发已捕获异常时暂停，则勾选 **Pause On Caught Exceptions** 复选框。


<figure>
  <img src="imgs/uncaught-exception.png"
       alt="引发未捕获异常时暂停。"
  <figcaption>
    <b>图 7</b>：引发未捕获异常时暂停
  </figcaption>
</figure>

## 函数断点 {: #function }

如果想要在调用特定函数时暂停，可以调用 `debug(functionName)`，其中 `functionName` 是要调试的函数。
 您可以将 `debug()` 插入您的代码（如 `console.log()` 语句），也可以从 DevTools 控制台中进行调用。
 `debug()` 相当于在第一行函数中设置[代码行断点](#loc)。


    function sum(a, b) {
      let result = a + b; // DevTools pauses on this line.
      return result;
    }
    debug(sum); // Pass the function object, not a string.
    sum();


### 确保目标函数在范围内 {: #scope }

如果想要调试的函数不在范围内，DevTools 会引发 `ReferenceError`。


    (function () {
      function hey() {
        console.log('hey');
      }
      function yo() {
        console.log('yo');
      }
      debug(yo); // This works.
      yo();
    })();
    debug(hey); // This doesn't work. hey() is out of scope.

如果是从 DevTools 控制台中调用 `debug()`，则很难确保目标函数在范围内。
 下面介绍一个策略：

1. 在函数在范围内时设置[代码行断点](#loc)。
1. 触发此断点。
1. 当代码仍在代码行断点位置暂停时，即于 DevTools 控制台中调用 `debug()`。


## 反馈 {: #feedback }

{% include "web/_shared/helpful.html" %}
