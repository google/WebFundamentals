project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:利用 Console API 测量执行时间和对语句执行进行计数。

{# wf_updated_on:2015-05-11 #}
{# wf_published_on:2015-04-13 #}

# 测量执行时间和对执行进行计数 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

利用 Console API 测量执行时间和对语句执行进行计数。


### TL;DR {: .hide-from-toc }
- 使用  <code>console.time()</code> 和  <code>console.timeEnd()</code> 跟踪代码执行点之间经过的时间。
- 使用  <code>console.count()</code> 对相同字符串传递到函数的次数进行计数。


## 测量执行时间

[`time()`](./console-reference#consoletimelabel) 方法可以启动一个新计时器，并且对测量某个事项花费的时间非常有用。将一个字符串传递到方法，以便为标记命名。

如果您想要停止计时器，请调用 [`timeEnd()`](./console-reference#consoletimeendlabel) 并向其传递已传递到初始值设定项的相同字符串。

控制台随后会在 `timeEnd()` 方法触发时记录标签和经过的时间。

### 基本示例

在这里，我们将测量 100 万个新 Array 的初始化：


    console.time("Array initialize");
    var array= new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
        array[i] = new Object();
    };
    console.timeEnd("Array initialize");
    

将在控制台中输出下列结果：
![经过的时间](images/track-executions-time-duration.png)

### Timeline 上的计时器

当 [Timeline](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool) 记录在 `time()` 操作期间发生时，它也会对 Timeline 进行标注。如果您想要跟踪应用的操作和操作来自何处，请使此记录。

执行 `time()` 时 Timeline 上的标注如下所示：

![timeline 上的时间标注](images/track-executions-time-annotation-on-timeline.png)

### 标记 Timeline

*注：`timeStamp()` 方法只能在某个 Timeline 记录正在进行时发挥作用。*

[Timeline 面板](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool)可以提供引擎时间消耗的完整概览。您可以使用 [`timeStamp()`](./console-reference#consoletimestamplabel) 从控制台向 Timeline 添加一个标记。
这是一种将您应用中的事件与其他事件进行关联的简单方式。

`timeStamp()` 会在以下地方对 Timeline 进行标注：

- Timeline 汇总和详细信息视图中的黄色垂直线。
- 会向事件列表添加一条记录。

以下示例代码：


    function AddResult(name, result) {
        console.timeStamp("Adding result");
        var text = name + ': ' + result;
        var results = document.getElementById("results");
        results.innerHTML += (text + "<br>");
    }
    

将生成下面的 Timeline 时间戳：

![Timeline 中的时间戳](images/track-executions-timestamp2.png)

## 对语句执行进行计数

使用 `count()` 方法记录提供的字符串，以及相同字符串已被提供的次数。当完全相同的语句被提供给同一行上的 `count()` 时，此数字将增大。

将 `count()` 与某些动态内容结合使用的示例代码：


    function login(user) {
        console.count("Login called for user " + user);
    }
    
    users = [ // by last name since we have too many Pauls.
        'Irish',
        'Bakaus',
        'Kinlan'
    ];
    
    users.forEach(function(element, index, array) {
        login(element);
    });
    
    login(users[0]);
    

代码示例的输出：

![console.count() example output](images/track-executions-console-count.png)




{# wf_devsite_translation #}
