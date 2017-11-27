project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Console API 可以向控制台写入信息、创建 JavaScript 配置文件，以及启动调试会话。

{# wf_updated_on: 2016-03-21 #}
{# wf_published_on: 2016-03-21 #}

# Console API 参考 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

使用 Console API 可以向控制台写入信息、创建 JavaScript 配置文件，以及启动调试会话。



## console.assert(expression, object) {:#assert}

在被评估的表达式为 `false` 时向控制台写入一个[错误](#error)。
 


    function greaterThan(a,b) {
      console.assert(a > b, {"message":"a is not greater than b","a":a,"b":b});
    }
    greaterThan(5,6);
    

![console.assert() 示例](images/assert.png)

## console.clear() {:#clear}

清除控制台。


    console.clear();
    

如果已启用 [**Preserve log**](index#preserve-log) 复选框，`console.clear()` 将停用。
不过，在控制台处于聚焦状态时，按 **clear console** 按钮 (![clear console 按钮](images/clear-console-button.png){:.inline}) 或者输入 <kbd>Ctrl</kbd>+<kbd>L</kbd> 快捷键仍然有效。


 

如需了解详细信息，请参阅[清除控制台](index#clearing)。

## console.count(label) {:#count}

写入在同一行使用相同标签调用 `count()` 的次数。



    function login(name) {
      console.count(name + ' logged in');
    }
    

![console.count() example](images/count.png)

请参阅[对语句执行进行计数][cse]，查看更多示例。

[cse]: track-executions#counting-statement-executions

## console.debug(object [, object, ...])

与 [`console.log()`](#log) 作用相同。

## console.dir(object) {:#dir}

输出以 JavaScript 形式表示的指定对象。如果正在记录的对象是 HTML 元素，将输出其以 DOM 形式表示的属性，如下所示：




    console.dir(document.body);
    

![`console.dir()` example](images/dir.png)

请参阅[字符串替代和格式设置][of]，了解功能相同的对象格式化程序 (`%O`) 和其他信息。


[of]: console-write#string-substitution-and-formatting

## console.dirxml(object)

如果可以，输出 `object` 子级元素的 XML 表示形式，否则输出其 JavaScript 表示形式。
在 HTML 和 XML 元素上调用 `console.dirxml()` 等同于调用 [`console.log()`](#log)。



    console.dirxml(document);
    

![console.dirxml() example](images/dirxml.png)

## console.error(object [, object, ...]) {:#error}

输出一条类似于 [`console.log()`](#log) 的消息，将消息设置成错误样式，并在调用此方法的地方包含一个堆叠追踪。




    console.error('error: name is undefined');
    

![console.error() example](images/error.png)

## console.group(object[, object, ...])

启动一个带有可选标题的新日志组。以可视化方式将在 `console.group()` 后、`console.groupEnd()` 前发生的所有控制台输出组合在一起。

 


    function name(obj) {
      console.group('name');
      console.log('first: ', obj.first);
      console.log('middle: ', obj.middle);
      console.log('last: ', obj.last);
      console.groupEnd();
    }
    
    name({"first":"Wile","middle":"E","last":"Coyote"});
    

![console.group() example](images/group.png)

您还可以嵌套组：


    function name(obj) {
      console.group('name');
      console.log('first: ', obj.first);
      console.log('middle: ', obj.middle);
      console.log('last: ', obj.last);
      console.groupEnd();
    }
    
    function doStuff() {
      console.group('doStuff()');
      name({"first":"Wile","middle":"E","last":"coyote"});
      console.groupEnd();
    }
    
    doStuff();
    

![nested console.group() example](images/nested-group.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.organizing #}

## console.groupCollapsed(object[, object, ...])

创建一个初始处于折叠状态而不是打开状态的新日志组。 


    console.groupCollapsed('status');
    console.log("peekaboo, you can't see me");
    console.groupEnd();
    

## console.groupEnd() {:#groupend}

关闭日志组。相关示例请参阅 [`console.group`](#group)。

## console.info(object [, object, ...])

输出一条类似 [`console.log()`](#log) 的消息，但同时在输出旁显示一个图标（带白色“i”的蓝色圆圈）。
 

## console.log(object [, object, ...]) {:#log}

在控制台中显示一条消息。将一个或多个对象传递到此方法。每个对象都会进行评估并级联到一个由空格分隔的字符串中。



    console.log('Hello, Logs!');
    

### 格式说明符{:#format-specifiers}

您传递的第一个对象可以包含一个或多个**格式说明符**。格式说明符由百分号 (`%`) 与紧跟其后面的一个字母组成，字母指示要应用的格式。

 

相关指南：

* [组织控制台输出](console-write)

## console.profile([label]) {:#profile}

启动一个带有可选标签的 JavaScript CPU 配置文件。要完成配置文件，请调用 `console.profileEnd()`。
每一个配置文件都会添加到 **Profiles** 面板中。



    function processPixels() {
      console.profile("processPixels()");
      // later, after processing pixels
      console.profileEnd();
    }
    

## console.profileEnd() {:#profileend}

停止当前的 JavaScript CPU 分析会话（如果正在进行此会话），并将报告输出到 **Profiles** 面板中。


相关示例请参阅 [`console.profile()`](#profile)。

## console.time(label) {:#time}

启动一个具有关联标签的新计时器。使用相同标签调用 `console.timeEnd()` 时，定时器将停止，经过的时间将显示在控制台中。计时器值精确到亚毫秒。传递到 `time()` 和 `timeEnd()` 的字符串必须匹配，否则计时器不会结束。




    console.time("Array initialize");
    var array = new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
      array[i] = new Object();
    }
    console.timeEnd("Array initialize");
    

![console.time() example](images/time.png)

## console.timeEnd(label) {:#timeend}

停止当前的计时器（如果正在运行一个计时器），并将计时器标签和经过的时间输出到控制台。
 

相关示例请参阅 [`console.time()`](#time)。 

## console.timeStamp([label]) {:#timestamp}

在录制会话期间向 **Timeline** 添加一个事件。 


    console.timeStamp('check out this custom timestamp thanks to console.timeStamp()!');
    

![console.timeStamp() example](images/timestamp.png)

相关指南：

* [使用 Timeline 工具](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)


## console.trace(object) {:#trace}

从调用此方法的位置输出一个堆叠追踪。 

    console.trace();

![console.trace() 示例](images/trace.png)

## console.warn(object [, object, ...]) {:#warn}

输出一条类似 [`console.log()`](#log) 的消息，但同时在记录的消息旁显示一个黄色警告图标。


    console.warn('user limit reached!');

![console.warn() example](images/warn.png)


{# wf_devsite_translation #}
