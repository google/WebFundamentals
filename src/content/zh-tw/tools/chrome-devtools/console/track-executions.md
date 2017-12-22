project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:利用 Console API 測量執行時間和對語句執行進行計數。

{# wf_updated_on:2015-05-11 #}
{# wf_published_on:2015-04-13 #}

# 測量執行時間和對執行進行計數 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

利用 Console API 測量執行時間和對語句執行進行計數。


### TL;DR {: .hide-from-toc }
- 使用  <code>console.time()</code> 和  <code>console.timeEnd()</code> 跟蹤代碼執行點之間經過的時間。
- 使用  <code>console.count()</code> 對相同字符串傳遞到函數的次數進行計數。


## 測量執行時間

[`time()`](./console-reference#consoletimelabel) 方法可以啓動一個新計時器，並且對測量某個事項花費的時間非常有用。將一個字符串傳遞到方法，以便爲標記命名。

如果您想要停止計時器，請調用 [`timeEnd()`](./console-reference#consoletimeendlabel) 並向其傳遞已傳遞到初始值設定項的相同字符串。

控制檯隨後會在 `timeEnd()` 方法觸發時記錄標籤和經過的時間。

### 基本示例

在這裏，我們將測量 100 萬個新 Array 的初始化：


    console.time("Array initialize");
    var array= new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
        array[i] = new Object();
    };
    console.timeEnd("Array initialize");
    

將在控制檯中輸出下列結果：
![經過的時間](images/track-executions-time-duration.png)

### Timeline 上的計時器

當 [Timeline](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool) 記錄在 `time()` 操作期間發生時，它也會對 Timeline 進行標註。如果您想要跟蹤應用的操作和操作來自何處，請使此記錄。

執行 `time()` 時 Timeline 上的標註如下所示：

![timeline 上的時間標註](images/track-executions-time-annotation-on-timeline.png)

### 標記 Timeline

*注：`timeStamp()` 方法只能在某個 Timeline 記錄正在進行時發揮作用。*

[Timeline 面板](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool)可以提供引擎時間消耗的完整概覽。您可以使用 [`timeStamp()`](./console-reference#consoletimestamplabel) 從控制檯向 Timeline 添加一個標記。
這是一種將您應用中的事件與其他事件進行關聯的簡單方式。

`timeStamp()` 會在以下地方對 Timeline 進行標註：

- Timeline 彙總和詳細信息視圖中的黃色垂直線。
- 會向事件列表添加一條記錄。

以下示例代碼：


    function AddResult(name, result) {
        console.timeStamp("Adding result");
        var text = name + ': ' + result;
        var results = document.getElementById("results");
        results.innerHTML += (text + "<br>");
    }
    

將生成下面的 Timeline 時間戳：

![Timeline 中的時間戳](images/track-executions-timestamp2.png)

## 對語句執行進行計數

使用 `count()` 方法記錄提供的字符串，以及相同字符串已被提供的次數。當完全相同的語句被提供給同一行上的 `count()` 時，此數字將增大。

將 `count()` 與某些動態內容結合使用的示例代碼：


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
    

代碼示例的輸出：

![console.count() example output](images/track-executions-console-count.png)




{# wf_devsite_translation #}
