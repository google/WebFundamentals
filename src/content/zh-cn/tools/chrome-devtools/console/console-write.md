project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:控制台日志是一种可以检查您的页面或应用所进行操作的强大方式。我们将先了解 console.log()，然后再探索其他高级用途。

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# 诊断并记录到控制台中 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
控制台日志是一种可以检查您的页面或应用所进行操作的强大方式。我们将先了解 console.log()，然后再探索其他高级用途。


### TL;DR {: .hide-from-toc }
- 使用 <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-''>console.log()</a> 进行基本记录
- 使用 <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consoleerrorobject--object-''>console.error()</a> 和 <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolewarnobject--object-''>console.warn()</a> 显示引入注目的消息
- 使用 <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolegroupobject-object-''>console.group()</a> 和 <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolegroupend''>console.groupEnd()</a> 对相关消息进行分组，避免混乱
- 使用 <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consoleassertexpression-object''>console.assert()</a> 显示条件性错误消息


## 写入控制台

使用 <a href="/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-">console.log()</a> 方法可以向控制台进行任何基本记录。此方法采用一个或多个表达式作为参数，并将其当前值写入控制台，从而将多个参数级联到一个由空格分隔的行中。

在您的 JavaScript 中执行下面一行代码：


    console.log("Node count:", a.childNodes.length, "and the current time is:", Date.now());
    

将在控制台中输出以下内容：
![记录多个](images/console-write-log-multiple.png)

## 自动填充命令 {:#autocomplete}

在控制台中键入内容时，控制台将自动显示与您已键入文字匹配的相关方法的自动填充下拉菜单。其中包括您已经执行的前几个命令。

![自动填充的示例](images/autocomplete.png)

## 组织控制台输出 {:#organizing}

### 将消息组织到一起

您可以使用组命令将相关输出组织到一起。[`console.group()`](./console-reference#consolegroupobject-object-) 命令采用一个字符串参数设置组名称。在您的 JavaScript 中调用此命令后，控制台会开始将所有后续输出都组织到一起。

要结束分组，您只需要在完成后调用 [`console.groupEnd()`](./console-reference#consolegroupend)。

示例输入：


    var user = "jsmith", authenticated = false;
    console.group("Authentication phase");
    console.log("Authenticating user '%s'", user);
    // authentication code here...
    if (!authenticated) {
        console.log("User '%s' not authenticated.", user)
    }
    console.groupEnd();
    

示例输出：
![简单的控制台组输出](images/console-write-group.png)

#### 嵌套组

日志组也可以彼此嵌套。同时以小片段查看较大的组时，嵌套组非常有用。

下面的示例显示了登录流程身份验证阶段的日志组：


    var user = "jsmith", authenticated = true, authorized = true;
    // Top-level group
    console.group("Authenticating user '%s'", user);
    if (authenticated) {
        console.log("User '%s' was authenticated", user);
        // Start nested group
        console.group("Authorizing user '%s'", user);
        if (authorized) {
            console.log("User '%s' was authorized.", user);
        }
        // End nested group
        console.groupEnd();
    }
    // End top-level group
    console.groupEnd();
    console.log("A group-less log trace.");
    

下面是控制台中的嵌套组输出：
![简单的控制台组输出](images/console-write-nestedgroup.png)

#### 自动折叠组

大量使用组时，即时查看所有信息可能不是非常有用。这些情况下，您可以通过调用 [`console.groupCollapsed()`](./console-reference#consolegroupcollapsedobject-object-) 而不是 `console.group()` 的方式自动折叠组：


    console.groupCollapsed("Authenticating user '%s'", user);
    if (authenticated) {
        ...
    }
    console.groupEnd();
    

groupCollapsed() 输出：
![初始处于折叠状态的组](images/console-write-groupcollapsed.png)

## 错误和警告

错误和警告的作用与正常日志的作用相同。唯一的区别是 `error()` 和 `warn()` 的样式引人注目。

### console.error()

[`console.error()`](./console-reference#consoleerrorobject--object-) 方法会显示红色图标和红色消息文本：


    function connectToServer() {
        console.error("Error: %s (%i)", "Server is  not responding",500);
    }
    connectToServer();
    

转变为

![错误示例输出](images/console-write-error-server-not-resp.png)

### console.warn()

[`console.warn()`](./console-reference#consolewarnobject--object-) 方法会显示一个黄色警告图标和相应的消息文本：


    if(a.childNodes.length < 3 ) {
        console.warn('Warning! Too few nodes (%d)', a.childNodes.length);
    }
    

转变为

![警告示例](images/console-write-warning-too-few-nodes.png)

## 断言

[`console.assert()`](./console-reference#consoleassertexpression-object) 方法可以仅在其第一个参数为 `false` 时有条件地显示错误字符串（其第二个参数）。

### 简单的断言及其显示方式

下面的代码仅会在属于 `list` 元素的子节点数大于 500 时在控制台中显示一条错误消息。


    console.assert(list.childNodes.length < 500, "Node count is > 500");
    

断言失败在控制台中的显示方式：
![断言失败](images/console-write-assert-failed.png)

## 字符串替代和格式设置

传递到任何记录方法的第一个参数可能包含一个或多个格式说明符。格式说明符由一个 `%` 符号与后面紧跟的一个字母组成，字母指示应用到值的格式。字符串后面的参数会按顺序应用到占位符。

下面的示例使用字符串和数字格式说明符来将值插入到输出字符串中。您将在控制台中看到“Sam has 100 points”。

    console.log("%s has %d points", "Sam", 100);

格式说明符的完整列表为：

| 说明符 | 输出                                                                            |
|-----------|:----------------------------------------------------------------------------------|
| %s        | 将值格式化为字符串                                                     |
| %i 或 %d  | 将值格式化为整型                                                   |
| %f        | 将值格式化为浮点值                                       |
| %o        | 将值格式化为可扩展 DOM 元素。如同在 Elements 面板中显示的一样     |
| %O        | 将值格式化为可扩展 JavaScript 对象                              |
| %c        | 将 CSS 样式规则应用到第二个参数指定的输出字符串 |

本示例使用数字说明符设置 `document.childNodes.length` 的值的格式。同时使用浮点说明符设置 `Date.now()` 的值的格式。

代码：


    console.log("Node count: %d, and the time is %f.", document.childNodes.length, Date.now());
    

上一个代码示例的输出：
![示例替代输出](images/console-write-log-multiple.png)

### 使用 CSS 设置控制台输出的样式

利用 CSS 格式说明符，您可以自定义控制台中的显示。使用说明符启动字符串，并设置为您希望的样式，作为第二个参数。


尝试使用下面的代码：


    console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");
    

..将您的日志输出设置为蓝色的大字体：

![设置了格式的字符串](images/console-write-format-string.png)

### 将 DOM 元素格式化为 JavaScript 对象

默认情况下，DOM 元素将以其 HTML 的表示的形式记录到控制台中，不过有时，您希望以 JavaScript 对象的形式访问 DOM 元素并检查其属性。为此，您可以使用 `%o` 字符串说明符（参见上文），也可以使用 `console.dir` 达到同样的效果： 

![使用 dir() 记录元素](images/dir-element.png)




{# wf_devsite_translation #}
