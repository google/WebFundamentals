project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Console API 可以向控制檯寫入信息、創建 JavaScript 配置文件，以及啓動調試會話。

{# wf_updated_on: 2016-03-21 #}
{# wf_published_on: 2016-03-21 #}

# Console API 參考 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

使用 Console API 可以向控制檯寫入信息、創建 JavaScript 配置文件，以及啓動調試會話。



## console.assert(expression, object) {:#assert}

在被評估的表達式爲 `false` 時向控制檯寫入一個[錯誤](#error)。
 


    function greaterThan(a,b) {
      console.assert(a > b, {"message":"a is not greater than b","a":a,"b":b});
    }
    greaterThan(5,6);
    

![console.assert() 示例](images/assert.png)

## console.clear() {:#clear}

清除控制檯。


    console.clear();
    

如果已啓用 [**Preserve log**](index#preserve-log) 複選框，`console.clear()` 將停用。
不過，在控制檯處於聚焦狀態時，按 **clear console** 按鈕 (![clear console 按鈕](images/clear-console-button.png){:.inline}) 或者輸入 <kbd>Ctrl</kbd>+<kbd>L</kbd> 快捷鍵仍然有效。


 

如需瞭解詳細信息，請參閱[清除控制檯](index#clearing)。

## console.count(label) {:#count}

寫入在同一行使用相同標籤調用 `count()` 的次數。



    function login(name) {
      console.count(name + ' logged in');
    }
    

![console.count() example](images/count.png)

請參閱[對語句執行進行計數][cse]，查看更多示例。

[cse]: track-executions#counting-statement-executions

## console.debug(object [, object, ...])

與 [`console.log()`](#log) 作用相同。

## console.dir(object) {:#dir}

輸出以 JavaScript 形式表示的指定對象。如果正在記錄的對象是 HTML 元素，將輸出其以 DOM 形式表示的屬性，如下所示：




    console.dir(document.body);
    

![`console.dir()` example](images/dir.png)

請參閱[字符串替代和格式設置][of]，瞭解功能相同的對象格式化程序 (`%O`) 和其他信息。


[of]: console-write#string-substitution-and-formatting

## console.dirxml(object)

如果可以，輸出 `object` 子級元素的 XML 表示形式，否則輸出其 JavaScript 表示形式。
在 HTML 和 XML 元素上調用 `console.dirxml()` 等同於調用 [`console.log()`](#log)。



    console.dirxml(document);
    

![console.dirxml() example](images/dirxml.png)

## console.error(object [, object, ...]) {:#error}

輸出一條類似於 [`console.log()`](#log) 的消息，將消息設置成錯誤樣式，並在調用此方法的地方包含一個堆疊追蹤。




    console.error('error: name is undefined');
    

![console.error() example](images/error.png)

## console.group(object[, object, ...])

啓動一個帶有可選標題的新日誌組。以可視化方式將在 `console.group()` 後、`console.groupEnd()` 前發生的所有控制檯輸出組合在一起。

 


    function name(obj) {
      console.group('name');
      console.log('first: ', obj.first);
      console.log('middle: ', obj.middle);
      console.log('last: ', obj.last);
      console.groupEnd();
    }
    
    name({"first":"Wile","middle":"E","last":"Coyote"});
    

![console.group() example](images/group.png)

您還可以嵌套組：


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

創建一個初始處於摺疊狀態而不是打開狀態的新日誌組。 


    console.groupCollapsed('status');
    console.log("peekaboo, you can't see me");
    console.groupEnd();
    

## console.groupEnd() {:#groupend}

關閉日誌組。相關示例請參閱 [`console.group`](#group)。

## console.info(object [, object, ...])

輸出一條類似 [`console.log()`](#log) 的消息，但同時在輸出旁顯示一個圖標（帶白色“i”的藍色圓圈）。
 

## console.log(object [, object, ...]) {:#log}

在控制檯中顯示一條消息。將一個或多個對象傳遞到此方法。每個對象都會進行評估並級聯到一個由空格分隔的字符串中。



    console.log('Hello, Logs!');
    

### 格式說明符{:#format-specifiers}

您傳遞的第一個對象可以包含一個或多個**格式說明符**。格式說明符由百分號 (`%`) 與緊跟其後面的一個字母組成，字母指示要應用的格式。

 

相關指南：

* [組織控制檯輸出](console-write)

## console.profile([label]) {:#profile}

啓動一個帶有可選標籤的 JavaScript CPU 配置文件。要完成配置文件，請調用 `console.profileEnd()`。
每一個配置文件都會添加到 **Profiles** 面板中。



    function processPixels() {
      console.profile("processPixels()");
      // later, after processing pixels
      console.profileEnd();
    }
    

## console.profileEnd() {:#profileend}

停止當前的 JavaScript CPU 分析會話（如果正在進行此會話），並將報告輸出到 **Profiles** 面板中。


相關示例請參閱 [`console.profile()`](#profile)。

## console.time(label) {:#time}

啓動一個具有關聯標籤的新計時器。使用相同標籤調用 `console.timeEnd()` 時，定時器將停止，經過的時間將顯示在控制檯中。計時器值精確到亞毫秒。傳遞到 `time()` 和 `timeEnd()` 的字符串必須匹配，否則計時器不會結束。




    console.time("Array initialize");
    var array = new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
      array[i] = new Object();
    }
    console.timeEnd("Array initialize");
    

![console.time() example](images/time.png)

## console.timeEnd(label) {:#timeend}

停止當前的計時器（如果正在運行一個計時器），並將計時器標籤和經過的時間輸出到控制檯。
 

相關示例請參閱 [`console.time()`](#time)。 

## console.timeStamp([label]) {:#timestamp}

在錄製會話期間向 **Timeline** 添加一個事件。 


    console.timeStamp('check out this custom timestamp thanks to console.timeStamp()!');
    

![console.timeStamp() example](images/timestamp.png)

相關指南：

* [使用 Timeline 工具](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)


## console.trace(object) {:#trace}

從調用此方法的位置輸出一個堆疊追蹤。 

    console.trace();

![console.trace() 示例](images/trace.png)

## console.warn(object [, object, ...]) {:#warn}

輸出一條類似 [`console.log()`](#log) 的消息，但同時在記錄的消息旁顯示一個黃色警告圖標。


    console.warn('user limit reached!');

![console.warn() example](images/warn.png)


{# wf_devsite_translation #}
