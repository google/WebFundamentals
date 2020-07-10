project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description:了解如何使用 Chrome DevTools 查找和修正 JavaScript 错误。

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2017-01-04 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# 在 Chrome DevTools 中调试 JavaScript 入门 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

本教程介绍在 DevTools 中调试所有 JavaScript 问题的基本工作流程。
请继续阅读，或在下方观看本教程的视频版本。

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="H0XScE08hy8"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


## 第 1 步：重现错误 {: #reproduce }

找到一系列可一致重现错误的操作始终是调试的第一步。


1. 点击 **Open Demo**。 演示页面随即在新标签中打开。

     <a href="https://googlechrome.github.io/devtools-samples/debug-js/get-started"
       target="devtools"
       rel="noopener noreferrer">
       <button>Open Demo</button>
     </a>

1. 在 **Number 1** 文本框中输入 `5`。
1. 在 **Number 2** 文本框中输入 `1`。
1. 点击 **Add Number 1 and Number 2**。 按钮下方的标签显示 `5 + 1 = 51`。 结果应为 `6`。
 这就是您要修正的错误。

     <figure>
       <img src="imgs/bug.png"
         alt="5 + 1 的结果是 51。结果应为 6。"/>
       <figcaption>
         <b>图 1</b>. 5 + 1 的结果是 51。结果应为 6。
       </figcaption>
     </figure>

## 第 2 步：熟悉 Sources 面板界面 {: #sources-ui }

DevTools 可为更改 CSS、分析页面加载性能和监控网络请求等不同的任务提供许多不同的工具。
 您可在 **Sources** 面板中调试
JavaScript。

1. 通过按 <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac)
或 <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>（Windows、Linux），打开 DevTools。 此快捷方式可打开
   **Console** 面板。

     <figure>
       <img src="imgs/console.png" alt="Console 面板。"/>
       <figcaption>
         <b>图 2</b>. <b>Console</b> 面板
       </figcaption>
     </figure>

1. 点击 **Sources** 标签。

     <figure>
       <img src="imgs/sources.png" alt="Sources 面板。"/>
       <figcaption>
         <b>图 3</b>. <b>Sources</b> 面板
       </figcaption>
     </figure>

**Sources** 面板界面包含 3 个部分：

<figure>
  <img src="imgs/sources-annotated.png" alt="Sources 面板界面的 3 个部分。"/>
  <figcaption>
    <b>图 4</b>. <b>Sources</b> 面板界面的 3 个部分
  </figcaption>
</figure>

1. **File Navigator** 窗格。 此处列出页面请求的每个文件。
2. **Code Editor** 窗格。 在 **File Navigator** 窗格中选择文件后，此处会显示该文件的内容。
3. **JavaScript Debugging** 窗格。 检查页面 JavaScript 的各种工具。 如果 DevTools 窗口布局较宽，此窗格会显示在 **Code Editor** 窗格右侧。


## 第 3 步：使用断点暂停代码 {: #event-breakpoint }

调试这种问题的常用方法是将多个 `console.log()`
语句插入代码，以便在执行脚本时检查相关值。 例如：

<pre class="prettyprint">function updateLabel() {
  var addend1 = getNumber1();
  <strong>console.log('addend1:', addend1);</strong>
  var addend2 = getNumber2();
  <strong>console.log('addend2:', addend2);</strong>
  var sum = addend1 + addend2;
  <strong>console.log('sum:', sum);</strong>
  label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;
}</pre>

虽然 `console.log()` 方法可以完成任务，但**断点**可以更快完成此任务。
断点可让您在执行代码的过程中暂停代码，并在此时及时检查所有相关值。
 与 `console.log()` 方法相比，断点具有一些优势：

* 使用 `console.log()`，您需要手动打开源代码，查找相关代码，插入 `console.log()` 语句，然后重新加载此页面，才能在控制台中看到这些消息。
 使用断点，无需了解代码结构即可暂停相关代码。
* 在 `console.log()` 语句中，您需要明确指定要检查的每个值。
 使用断点，DevTools 会在暂停时及时显示所有变量值。
 有时在您不知道的情况下，有些变量会影响您的代码。

简言之，与 `console.log()` 方法相比，断点可帮助您更快地查找和修正错误。

如果退一步思考应用的运作方式，您可以根据经验推测出，使用与 **Add Number 1 and Number 2** 按钮关联的 `click` 事件侦听器时计算的和不正确 (`5 + 1 = 51`)。
 因此，您可能需要在 `click` 侦听器运行时暂停代码。
 **Event Listener Breakpoints**
可让您完成此任务：

1. 在 **JavaScript Debugging** 窗格中，点击 **Event Listener Breakpoints** 以展开该部分。
 DevTools 会显示 **Animation** 和 **Clipboard**
等可展开的事件类别列表。
1. 在 **Mouse** 事件类别旁，点击 **Expand** ![Expand
   图标](/web/tools/chrome-devtools/images/expand.png){: .devtools-inline}。
   DevTools 会显示 **click** 和 **mousedown** 等鼠标事件列表。 每个事件旁都有一个复选框。
1. 勾选 **click** 复选框。 DevTools 现在经过设置可以在*任何*
   `click` 事件侦听器运行时自动暂停。


     <figure>
       <img src="imgs/get-started-click-breakpoint.png"
         alt="已启用 click 复选框。"/>
       <figcaption>
         <b>图 5</b>. 已启用 <b>click</b> 复选框
       </figcaption>
     </figure>


1. 返回至演示页面，再次点击 **Add Number 1 and Number 2**。 DevTools 会暂停演示并在 **Sources** 面板中突出显示一行代码。
   DevTools 应在此代码行暂停：

     <pre class="prettyprint">function onClick() {</pre>

     如果是在其他代码行暂停，请按 **Resume Script Execution** ![继续执行脚本][resume]，
{:.cdt-inl} 直到在正确的代码行暂停为止。

     <aside class="note">
       **注**：如果是在其他代码行暂停，可使用浏览器扩展程序在您访问的每一页上注册一个 `click` 事件侦听器。
 使用扩展程序的 `click` 侦听器可执行暂停操作。
 如果是采用无痕模式进行[隐私浏览][incognito]，将会停用所有扩展程序，而且您会发现您每次都在正确的代码行暂停。


     </aside>

[incognito]: https://support.google.com/chrome/answer/95464

**Event Listener Breakpoints** 只是 DevTools 提供的多种断点类型之一。
您需要记住所有不同的类型，因为每种类型最终都可帮助您尽快调试不同情景的问题。
 如需了解使用每种类型的时机和方式，请参阅[使用断点暂停代码][breakpoints]。


[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png
[breakpoints]: /web/tools/chrome-devtools/javascript/breakpoints

## 第 4 步：单步调试代码 {: #code-stepping }

一个常见的错误原因是脚本执行顺序有误。
 可以通过单步调试代码一次一行地检查代码执行情况，准确找到执行顺序异常之处。
 立即尝试：

1. 在 DevTools 的 **Sources** 面板上，点击 **Step into next function
   call** ![单步执行时进入下一个函数调用][into]，{:.devtools-inline} 以便一次一行地单步调试 `onClick()` 函数的执行。
   DevTools 突出显示下面这行代码：

     <pre class="prettyprint">if (inputsAreEmpty()) {</pre>

1. 点击 **Step over next function call** ![单步执行时越过下一个函数调用][over]
{:.devtools-inline}。 DevTools 执行但不进入 `inputsAreEmpty()`。
 请注意 DevTools 是如何跳过几行代码的。
   这是因为 `inputsAreEmpty()` 求值结果为 false，所以 `if` 语句的代码块未执行。


这就是单步调试代码的基本思路。 如果看一下
`get-started.js` 中的代码，您会发现错误多半出在 `updateLabel()` 函数的某处。
 您可以使用另一种断点来暂停较接近极可能出错位置的代码，而不是单步调试每一行代码。



[into]: /web/tools/chrome-devtools/images/step-into.png
[over]: /web/tools/chrome-devtools/images/step-over.png

## 第 5 步：设置代码行断点 {: #line-breakpoint }

代码行断点是最常见的断点类型。 如果您想在执行到某一行代码时暂停，请使用代码行断点：



1. 看一下 `updateLabel()` 中的最后一行代码：

     <pre class="prettyprint">label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;</pre>

1. 在这行代码的左侧，您可以看到这行代码的行号是 **32**。
 点击 **32**。 DevTools 会在 **32** 上方放置一个蓝色图标。
 这意味着这行代码上有一个代码行断点。
   DevTools 现在始终会在执行此行代码之前暂停。
1. 点击 **Resume script execution** ![继续执行脚本][resume]
{:.devtools-inline}。 脚本将继续执行，直到第 32 行。
在第 29 行、第 30 行和第 31 行上，DevTools 会在各行分号右侧输出 `addend1`、`addend2` 和 `sum` 的值。


     <figure>
       <img src="imgs/line-of-code-breakpoint.png"
         alt="DevTools 在第 32 行代码行断点处暂停。"/>
       <figcaption>
         <b>图 6</b>. DevTools 在第 32 行代码行断点处暂停
       </figcaption>
     </figure>

## 第 6 步：检查变量值 {: #check-values }

`addend1`、`addend2` 和 `sum` 的值疑似有问题。 这些值位于引号中，这意味着它们是字符串。
 这个假设有助于说明错误的原因。
现在可以收集更多信息。 DevTools 可提供许多用于检查变量值的工具。


### 方法 1：Scope 窗格 {: #scope }

在某代码行暂停时，**Scope** 窗格会显示当前定义的局部和全局变量，以及各变量值。
 其中还会显示闭包变量（如果适用）。
 双击变量值可进行编辑。 如果不在任何代码行暂停，则 **Scope** 窗格为空。


<figure>
  <img src="imgs/scope-pane.png"
    alt="Scope 窗格。"/>
  <figcaption>
    <b>图 7</b>. <b>Scope</b> 窗格
  </figcaption>
</figure>

### 方法 2：监视表达式 {: #watch-expressions }

**Watch Expressions** 标签可让您监视变量值随时间变化的情况。
顾名思义，监视表达式不仅限于监视变量。 您可以将任何有效的 JavaScript 表达式存储在监视表达式中。
 立即尝试：

1. 点击 **Watch** 标签。
1. 点击 **Add Expression** ![添加表达式][add]{:.devtools-inline}。
1. 输入 `typeof sum`。
1. 按 <kbd>Enter</kbd> 键。 DevTools 会显示 `typeof sum: "string"`。 冒号右侧的值就是监视表达式的结果。

     <figure>
       <img src="imgs/get-started-watch-expression.png"
         alt="Watch Expression 窗格。"/>
       <figcaption>
         <b>图 8</b>. 创建 <code>typeof sum</code> 监视表达式后的 Watch Expression 窗格（右下方）。
         如果 DevTools 窗口较大，Watch Expression 窗格位于右侧 <b>Event Listener Breakpoints</b> 窗格的上方。
       </figcaption>
     </figure>

正如猜想，`sum` 的求值结果本应是数字，而实际结果却是字符串。
 现在已确定这就是错误的原因。

### 方法 3：控制台 {: #console }

除了查看 `console.log()` 消息以外，您还可以使用控制台对任意 JavaScript 语句求值。
 对于调试，您可以使用控制台测试错误的潜在解决方法。
 立即尝试：

1. 如果您尚未打开 Console 抽屉式导航栏，请按 <kbd>Escape</kbd> 将其打开。
 该导航栏将在 DevTools 窗口底部打开。
1. 在 Console 中，输入 `parseInt(addend1) + parseInt(addend2)`。 此语句有效，因为您会在特定代码行暂停，其中 `addend1` 和 `addend2` 在范围内。
1. 按 <kbd>Enter</kbd> 键。 DevTools 对语句求值并打印输出
   `6`，即您预计演示页面会产生的结果。

     <figure>
       <img src="imgs/get-started-console.png"
         alt="对 parseInt(addend1) + parseInt(addend2) 求值后的 Console 抽屉式导航栏。"/>
       <figcaption>
         <b>图 9</b>. 对
         <code>parseInt(addend1) + parseInt(addend2)</code> 求值后的 Console 抽屉式导航栏。
       </figcaption>
     </figure>

[add]: /web/tools/chrome-devtools/javascript/imgs/add-expression.png

## 第 7 步：应用修正方法 {: #apply-fix }

您已找到修正错误的方法。 接下来就是尝试通过编辑代码并重新运行演示来使用修正方法。
 您不必离开 DevTools 就能应用修正。
 您可以直接在 DevTools UI 内编辑 JavaScript 代码。
 立即尝试：

1. 点击 **Resume script execution** ![继续执行脚本][resume]
{:.devtools-inline}。
1. 在 **Code Editor** 中，将第 31 行 `var sum = addend1 + addend2` 替换为
   `var sum = parseInt(addend1) + parseInt(addend2)`。
1. 按 <kbd>Command</kbd>+<kbd>S</kbd> (Mac) 或 <kbd>Control</kbd>+<kbd>S</kbd>（Windows、Linux）以保存更改。
1. 点击 **Deactivate breakpoints** ![取消激活断点][deactivate]
{:.devtools-inline}。 其将变为蓝色，表示处于活动状态。
 在完成此设置后，DevTools 会忽略您已设置的任何断点。
1. 尝试使用不同的值运行演示。 现在演示可以正确计算。

Note: 此工作流程只能修正在浏览器中运行的代码，
不能为访问您页面的所有用户修正代码。 为此，您需要修正自己服务器上的代码。


[deactivate]: /web/tools/chrome-devtools/images/deactivate-breakpoints-button.png

## 后续步骤 {: #next-steps }

恭喜！现在您已了解如何在调试 JavaScript 时充分使用 Chrome DevTools。
 本教程介绍的工具和方法有助于您节省大量时间。

本教程仅介绍两种设置断点的方法。 DevTools 还提许多其他方法，其中包括：


* 仅在满足您指定的条件时触发的条件断点。
* 发生已捕获或未捕获异常时触发的断点。
* 当请求的网址与您提供的子字符串匹配时触发的 XHR 断点。


如需了解使用每种类型的时机和方式，请参阅[使用断点暂停代码](/web/tools/chrome-devtools/javascript/breakpoints)。


有几个代码单步执行控件未在本教程中予以说明。 如需了解详情，请参阅[单步执行时越过代码行](/web/tools/chrome-devtools/javascript/reference#stepping)。


## 反馈 {: #feedback }

{% include "web/_shared/helpful.html" %}
