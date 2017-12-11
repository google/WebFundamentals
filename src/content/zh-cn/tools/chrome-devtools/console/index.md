project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:了解如何导航 Chrome DevTools JavaScript 控制台。

{# wf_updated_on:2016-02-01 #}
{# wf_published_on:2015-05-10 #}

# 使用控制台 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/andismith.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

了解如何：打开 DevTools 控制台；堆叠冗余消息或将其显示在各自的行上；清除或保留输出，或者将其保存到文件中；过滤输出，以及访问其他控制台设置。




### TL;DR {: .hide-from-toc }
- 以专用面板或任何其他面板旁的抽屉式导航栏的形式打开控制台。
- 堆叠冗余消息，或者将其显示在各自的行上。
- 清除或保留页面之间的输出，或者将其保存到文件中。
- 按严重性等级、通过隐藏网络消息或者按正则表达式模式对输出进行过滤。

## 打开控制台

以全屏模式的专用面板形式访问控制台：

![Console 面板](images/console-panel.png)

或以任何其他面板旁的抽屉式导航栏的形式：

![Console 抽屉式导航栏](images/console-drawer.png)

### 以面板形式打开

要打开专用的 **Console** 面板，请执行以下操作之一：

* 按 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows / Linux) 或者 <kbd>Cmd</kbd>+<kbd>Opt</kbd>+<kbd class="kbd">J</kbd> (Mac)。
* 如果 DevTools 已打开，则按 **Console** 按钮。

打开 Console 面板时，Console 抽屉式导航栏将自动折叠。

### 以抽屉式导航栏形式打开

要以任何其他面板旁的抽屉式导航栏的形式打开控制台，请执行以下操作之一：

* 在 DevTools 处于聚焦状态时按 <kbd>Esc</kbd>。
* 按 **Customize and control DevTools** 按钮，然后按 **Show console**。


![显示控制台](images/show-console.png)

## 消息堆叠

如果一条消息连续重复，而不是在新行上输出每一个消息实例，控制台将“堆叠”消息并在左侧外边距显示一个数字。此数字表示该消息已重复的次数。


![消息堆叠](images/message-stacking.png)

如果您倾向于为每一个日志使用一个独特的行条目，请在 DevTools 设置中启用 **Show timestamps**。


![显示时间戳](images/show-timestamps.png)

由于每一条消息的时间戳均不同，因此，每一条消息都将显示在各自的行上。


![带时间戳的控制台](images/timestamped-console.png)

## 处理控制台历史记录

### 清除历史记录{: #clearing}

您可以通过以下方式清除控制台历史记录：

* 在控制台中点击右键，然后按 **Clear console**。
* 在控制台中键入 `clear()`。
* 从您的 JavaScript 代码内调用 `console.clear()`。
* 按 <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">L</kbd> （Mac、Windows、Linux）。


### 保留历史记录{: #preserve-log}

启用控制台顶部的 **Preserve log** 复选框可以在页面刷新或更改之间保留控制台历史记录。
消息将一直存储，直至您清除控制台或者关闭标签。


### 保存历史记录

在控制台中点击右键，然后选择 **Save as**，将控制台的输出保存到日志文件中。


![将控制台的输出保存到日志文件](images/console-save-as.png)

## 选择执行环境{: #execution-context }

以下屏幕截图中以蓝色突出显示的下拉菜单称为 **Execution Context Selector**。


![Execution Context Selector](images/execution-context-selector.png)

通常，您会看到此环境设置为 `top`（页面的顶部框架）。

其他框架和扩展程序在其自身的环境中运行。要使用这些其他环境，您需要从下拉菜单中选中它们。
例如，如果您要查看 `<iframe>` 元素的日志输出，并修改该环境中存在的某个变量，您需要从 Execution Context Selector 下拉菜单中选中该元素。




控制台默认设置为 `top` 环境，除非您通过检查其他环境中的某个元素来访问 DevTools。
例如，如果您检查 `<iframe>` 中的一个 `<p>` 元素，那么，DevTools 将 Execution Context Selector 设置为该 `<iframe>` 的环境。



当您在 `top` 以外的环境中操作时，DevTools 将 Execution Context Selector 突出显示为红色，如下面的屏幕截图中所示。
这是因为开发者很少需要在 `top` 以外的任意环境中操作。
输入一个变量，期待返回一个值，只是为了查看该变量是否为 `undefined`（因为该变量是在不同环境中定义的），这会非常令人困惑。



![Execution Context Selector 突出显示为红色](images/non-top-context.png)

## 过滤控制台输出

点击 **Filter** 按钮 
(![filter 按钮](images/filter-button.png){:.inline})
可以过滤控制台输出。您可以按严重性等级、按正则表达式模式或者通过隐藏网络消息的方式进行过滤。


![过滤的控制台输出](images/filtered-console.png)

按严重性等级进行过滤的说明如下所示：

<table class="responsive">
  <thead>
     <tr>
      <th colspan="2">选项及显示的内容</th>
    </tr>   
  </thead>
  <tbody>
  <tr>
    <td>All</td>
    <td>显示所有控制台输出</td>
  </tr>
  <tr>
    <td>Errors</td>
    <td>仅显示 <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoleerrorobject--object-">console.error()</a> 的输出。</td>
  </tr>
  <tr>
    <td>Warnings</td>
    <td>仅显示 <a href="/web/tools/chrome-devtools/debug/console/console-reference#consolewarnobject--object-">console.warn()</a> 的输出。</td>
  </tr>
  <tr>
    <td>Info</td>
    <td>仅显示 <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoleinfoobject--object-">console.info()</a> 的输出。</td>
  </tr>
  <tr>
    <td>Logs</td>
    <td>仅显示 <a href="/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-">console.log()</a> 的输出。</td>
  </tr>
  <tr>
    <td>Debug</td>
    <td>仅显示 <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoletimeendlabel">console.timeEnd()</a> 和<a href="/web/tools/chrome-devtools/debug/console/console-reference#consoledebugobject--object-">console.debug()</a> 的输出。</td>
  </tr>
  </tbody>
</table>

## 其他设置

打开 DevTools 设置，转至 **General** 标签，然后向下滚动到 **Console** 部分，查看更多控制台设置。


![控制台设置](images/console-settings.png)

<table class="responsive">
  <thead>
     <tr>
      <th colspan="2">设置及说明</th>
    </tr>   
  </thead>
  <tbody>
  <tr>
    <td>Hide network messages</td>
    <td>默认情况下，控制台将报告网络问题。启用此设置将指示控制台不显示这些错误的日志。例如，将不会记录 404 和 500 系列错误。</td>
  </tr>
  <tr>
    <td>Log XMLHttpRequests</td>
    <td>确定控制台是否记录每一个 XMLHttpRequest。</td>
  </tr>
  <tr>
    <td>Preserve log upon navigation</td>
    <td>在页面刷新或导航时保留控制台历史记录。</td>
  </tr>
  <tr>
    <td>Show timestamps</td>
    <td>在调用时向显示的每条控制台消息追加一个时间戳。对于发生特定事件时的调试非常实用。这会停用消息堆叠。</td>
  </tr>
  <tr>
    <td>Enable custom formatters</td>
    <td>控制 JavaScript 对象的<a href="https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview">格式设置</a>。</td>
  </tr>
  </tbody>
</table>


{# wf_devsite_translation #}
