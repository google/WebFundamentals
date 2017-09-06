project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:利用断点暂停 JavaScript 代码，并调查该特定时刻的变量值和调用堆栈。

{# wf_updated_on: 2016-07-17 #}
{# wf_published_on: 2015-04-13 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

# 如何设置断点 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

利用断点暂停 JavaScript 代码，并调查该特定时刻的变量值和调用堆栈。



断点设置完成后，您就可以了解如何逐步执行代码并在[如何单步调试代码](step-code)中调查您的变量和调用堆栈。




### TL;DR {: .hide-from-toc }
- 设置断点的最基本方法是在特定代码行中手动添加一个断点。您可以将这些断点设置为仅在符合特定条件时才触发。
- 您还可以设置在符合一般条件时触发的断点，如事件、DOM 更改、或未捕获的异常。


## 在特定代码行中设置断点{:#line-number}

当您知道自己想要调查的语句时，在特定代码行中设置断点就大有用处。
例如，如果您的登录工作流没有如期工作，并且在您的代码中只有一个处理此登录的函数，则假设错误可能位于该函数中是正确的。此情形下，在该函数的第一行添加断点是行得通的。


当您在代码行中设置断点时，代码始终会在该代码行处暂停，直至您删除、停用此断点或将其设置为有条件的断点为止。



要在特定代码行中设置断点，首先请打开 **Sources** 面板，然后从左侧的 **File Navigator** 窗格中选择脚本。

如果您看不到 **File Navigator**，请按 **Toggle file navigator** 按钮（![隐藏/显示 file navigator 按钮][fn]{:.devtools-inline}）。




**提示**：如果您在处理压缩过的代码，请按 **pretty print** 按钮(![pretty print 按钮][pp]{:.devtools-inline})使代码可读。


 

沿着源代码的左侧，您可以看到行号。此区域称为**行号边线**。
在行号边线中点击可在该行代码上添加一个断点。


![行号断点][lnb]

如果一个表达式由多个行隔开，且您在此表达式的中间放置了一个行断点，则 DevTools 将在下一个表达式中设置此断点。例如，如果您尝试在以下屏幕截图中的第 4 行中设置断点，则 DevTools 会将此断点放置到第 6 行。


![表达式中间的断点](imgs/mid-expression-breakpoint.png)

[pp]: imgs/pretty-print.png
[fn]: imgs/file-navigator.png
[lnb]: imgs/line-number-breakpoint.png

### 创建一个有条件的行号断点

有条件的断点仅在满足您指定的条件时触发。


右键单击一个还没有断点的行号，并按 **Add conditional breakpoint** 可创建一个有条件的断点。
如果您已在行代码中添加了一个断点，并想为该断点设置条件，则右键点击并按 **Edit breakpoint**。


在文本字段中输入您的条件并按 <kbd>Enter</kbd>。

![添加条件][ac]

有条件的断点呈金色。 

![有条件的断点][cb]

[ac]: imgs/adding-condition.png
[cb]: imgs/conditional-breakpoint.png

### 删除或停用行号断点

如果您要暂时忽略一个断点，则停用它。
在**行号边线**中右键点击并选择 **Disable breakpoint**。


![disable breakpoint][db]

如果您不再需要断点，则删除它。在**行号边线**中右键点击并选择 **Remove breakpoint**。


您也可以从一个位置管理跨所有脚本的所有行号断点。
此位置就是 **Sources** 面板上的 **Breakpoints** 窗格。


若要从 **Breakpoints** 窗格 UI 中删除断点，请右键点击它并选择 **Remove breakpoint**。


![Breakpoints 窗格][bp]

如需从此窗格停用断点，则停用它的复选框。

如需停用所有断点，则中此窗格中右键点击，并选择 **Deactivate breakpoints**。
这可与 **Disable All Breakpoints** 选项产生相同的效果。


您也可以通过按同样位于 **Sources** 面板上的 **deactivate breakpoints** 按钮(![deactivate breakpoints 按钮][dbb]{:.devtools-inline})停用所有断点。




[db]: imgs/disable-breakpoint.png
[bp]: imgs/breakpoints-pane.png
[dbb]: imgs/deactivate-breakpoints-button.png

## 在 DOM 更改上设置一个断点{:#dom}

如果代码中的错误会不正确地更改、删除或添加 DOM 节点，请使用 DOM 更改断点。


DevTools 能使您在节点中设置断点，而不必手动搜索造成更改的代码。
无论何时添加、删除或更改节点（某些时候是子节点之一），DevTools 都将暂停当前页面，并将您引导至造成更改的确切代码行。




以下是用于学习如何设置 DOM 更改断点的实时演示。点击 **Increment** 会使 **Count** 加 1。
立即试用。

在此交互式教程中，您的目标是设置一个当 **Count** 增加时就会触发的 DOM 更改断点，因此您可以检查修改 **Count** 的代码。



{% framebox height="auto" %}
<p><b>DOM 更改断点演示</b></p>
<button>Increment</button>
<p>Count：<span>0</span></p>
<script>
var buttons = document.querySelectorAll('button');
var increment = buttons[0];
var toggle = buttons[1];
var count = document.querySelector('span');
increment.addEventListener('click', function() {
  count.textContent = parseInt(count.textContent) + 1;
});
</script>
{% endframebox %}

**添加 DOM 更改断点的步骤**：

1. 右键点击 **Count** 并选择 **Inspect**。DevTools 将以蓝色突出显示节点。
它应该是一个 `<p>` 节点。可通过双击验证所在的节点是否正确，此操作会将节点展开，让您看到它的内容。



1. 右键点击突出显示的节点，然后选择 **Break on** > **Subtree Modifications**。
节点左侧的蓝色图标 ![DOM 断点图标][icon]{:.devtools-inline} 指示此节点中已设置 DOM 断点。当突出显示节点时，不太容易看到此图标，因为它是蓝色图标，且是蓝色背景。



1. 返回至演示页面，点击 **Increment**。DevTools 将暂停此页面，转至 **Sources**，并突出显示脚本中造成更改的代码行。



1. 按 **Resume script execution** ![恢复脚本执行按钮][resume]{:.devtools-inline} 两次，恢复脚本执行。您需要按两次是因为此断点会在删除数值文本时触发一次，然后会在文本更新数值时再触发一次。



[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png

选定节点的属性发生更改时，或删除选定节点时，要中断此操作只需选择 **Attributes modifications** 或 **Node Removal**，而非上方步骤 2 中的 **Subtree Modifications**。



提示：这些断点并非是排外的。您可以同时在一个节点中启用这些断点中的两个或全部三个断点。

**暂时关闭断点的步骤**：

1. 在 DevTools 中返回至 **Elements**。
1. 点击 **DOM Breakpoints**。
如果您的 DevTools 窗口很小，**DOM 断点**或许会隐藏在溢出菜单之后 ![溢出菜单][overflow]{:.devtools-inline}。
您应会看到一个复选框，旁边带有文本 `p`，`p` 下方显示 **Subtree Modified**。
1. 停用 **Subtree Modified** 旁的复选框。
1. 尝试再次点击 **Increment**。计数器将递增，并且 DevTools 将不再会暂停页面。


提示：将鼠标指针悬停在 `p` 上以突出显示视口中的节点。点击 `p` 以在 **Elements** 中选择节点。


**删除断点的步骤**：

1. 转至 **DOM Breakpoints**。
1. 右键点击您想要删除的断点，并选择 **Remove breakpoint**。


[icon]: imgs/dom-breakpoint-icon.png
[overflow]: imgs/overflow.png

### 关于 DOM 更改断点类型的详细信息

下面是关于每一种 DOM 更改断点类型的准确触发时间和方法的较详细信息：


* **子树修改**：在移除、添加当前所选节点的子项或更改子项内容时触发。
在子项节点属性发生变化或对当前所选节点进行任何更改时不会触发。



* **属性修改**：在当前所选节点上添加或移除属性时，或属性值发生变化时触发。


* **节点移除**：在移除当前选定的节点时会触发。

## 在 XHR 上中断

在 XHR 上可通过两种方法触发断点：当*任意* XHR 达到 XHR 生命周期的特定阶段（`readystatechange`、`load` 等）时或 XHR 的网址与特定字符串匹配时。

 

如果您要在 XHR 生命周期的特定阶段中断，请在 [event listener breakpoints 窗格](#events)中查看 **XHR** 类别。


若要在 XHR 的网址与特定字符串匹配时中断，请使用 **Sources** 面板上的 **XHR Breakpoints** 窗格。
 

![XHR breakpoints 窗格][xbp]

[xbp]: imgs/xhr-breakpoints-pane.png

点击加号按钮可添加新的断点模式。在文本字段中输入您的字符串，并按 <kbd>Enter</kbd> 以保存它。


**提示**：点击加号，然后立即按 <kbd>Enter</kbd> 以便在发送任意 XHR 之前触发一个断点。


## 在触发事件时中断{:#events}

使用 **Sources** 面板上的 **Event Listener Breakpoints** 窗格可在触发特定事件（例如，`click`）或事件类别（例如，任意 `mouse` 事件）时中断。



![event listener breakpoints 窗格][elbp]

顶层代表事件的类别。当触发该类别的任意事件时，启用其中一个复选框即可暂停。
展开顶层类别可查看其包括哪些事件。


如果您需要监控特定事件，查找该事件所属的顶层类别，然后启用目标事件旁的复选框。


![展开的 event listener breakpoints 窗格][eelbp]

[elbp]: imgs/event-listener-breakpoints-pane.png

[eelbp]: imgs/expanded-event-listener-breakpoints-pane.png

## 异常断点 {:#exceptions}

使用异常断点在异常引发时暂停脚本，然后跳至引发异常的代码行。



以下演示包含一个错误。请按照以下说明了解如何利用异常断点修正该错误。


{% framebox height="auto" width="auto" %}
<button>Print Random Number</button>
<p>Random Number: <span></span></p>
<script type="text/javascript">
  var nodes = {};
  nodes.button = document.querySelector('button');
  nodes.num = document.querySelector('span');
  nodes.button.addEventListener('click', function onClick() {
    nodes.number.textContent = Math.random();
  });
</script>
{% endframebox %}

1. 点击 **Print Random Number**。按钮下方的 **Random Number** 标签本应显示一个随机编号，实际却并未显示。这就是您要修正的错误。
1. 按 <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac)  或 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>（Windows、Linux）打开 DevTools。
1. 点击 **Sources** 标签。
1. 点击 **Pause on exceptions** ![引发异常时暂停][pause on exception]{:.devtools-inline}。
1. 再次点击 **Print Random Number** 触发断点。DevTools 应该会在执行到包含 `nodes.number.textContent = Math.random();` 的代码行时暂停。
至此您已了解使用异常断点需要掌握的一切信息。
说明的其余内容将介绍解决这个具体错误的方法。
1. 在 DevTools 当前暂停的代码行上，将光标悬停在 `nodes` 上，以确保对象得到正确引用。您应该会发现，它包含 `button`、`num` 和 `__proto__` 这三个属性。此处的所有内容看起来都正常，并非错误的来源。
1. 将光标悬停在 `number` 上。您应该会发现，其求值结果为 `undefined`。这就是错误的原因。属性的名称应为 `num` 而不是 `number`。
1. 在 DevTools 中，将 `nodes.number.textContent` 更改为 `nodes.num.textContent`。
1. 按 <kbd>Command</kbd>+<kbd>S</kbd> (Mac) 或 <kbd>Ctrl</kbd>+<kbd>S</kbd>（Windows、Linux）保存更改。保存后 DevTools 会立即自动继续执行脚本。
1. 再次按 **Print Random Number**，确保您的修正解决了错误。
点击该按钮后 DevTools 应该不再暂停，这意味着脚本不再引发异常。


[pause on exception]: /web/tools/chrome-devtools/images/pause-on-exception.png


{# wf_devsite_translation #}
