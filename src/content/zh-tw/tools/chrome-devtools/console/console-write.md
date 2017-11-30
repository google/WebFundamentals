project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:控制檯日誌是一種可以檢查您的頁面或應用所進行操作的強大方式。我們將先了解 console.log()，然後再探索其他高級用途。

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# 診斷並記錄到控制檯中 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
控制檯日誌是一種可以檢查您的頁面或應用所進行操作的強大方式。我們將先了解 console.log()，然後再探索其他高級用途。


### TL;DR {: .hide-from-toc }
- 使用 <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-''>console.log()</a> 進行基本記錄
- 使用 <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consoleerrorobject--object-''>console.error()</a> 和 <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolewarnobject--object-''>console.warn()</a> 顯示引入注目的消息
- 使用 <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolegroupobject-object-''>console.group()</a> 和 <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolegroupend''>console.groupEnd()</a> 對相關消息進行分組，避免混亂
- 使用 <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consoleassertexpression-object''>console.assert()</a> 顯示條件性錯誤消息


## 寫入控制檯

使用 <a href="/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-">console.log()</a> 方法可以向控制檯進行任何基本記錄。此方法採用一個或多個表達式作爲參數，並將其當前值寫入控制檯，從而將多個參數級聯到一個由空格分隔的行中。

在您的 JavaScript 中執行下面一行代碼：


    console.log("Node count:", a.childNodes.length, "and the current time is:", Date.now());
    

將在控制檯中輸出以下內容：
![記錄多個](images/console-write-log-multiple.png)

## 自動填充命令 {:#autocomplete}

在控制檯中鍵入內容時，控制檯將自動顯示與您已鍵入文字匹配的相關方法的自動填充下拉菜單。其中包括您已經執行的前幾個命令。

![自動填充的示例](images/autocomplete.png)

## 組織控制檯輸出 {:#organizing}

### 將消息組織到一起

您可以使用組命令將相關輸出組織到一起。[`console.group()`](./console-reference#consolegroupobject-object-) 命令採用一個字符串參數設置組名稱。在您的 JavaScript 中調用此命令後，控制檯會開始將所有後續輸出都組織到一起。

要結束分組，您只需要在完成後調用 [`console.groupEnd()`](./console-reference#consolegroupend)。

示例輸入：


    var user = "jsmith", authenticated = false;
    console.group("Authentication phase");
    console.log("Authenticating user '%s'", user);
    // authentication code here...
    if (!authenticated) {
        console.log("User '%s' not authenticated.", user)
    }
    console.groupEnd();
    

示例輸出：
![簡單的控制檯組輸出](images/console-write-group.png)

#### 嵌套組

日誌組也可以彼此嵌套。同時以小片段查看較大的組時，嵌套組非常有用。

下面的示例顯示了登錄流程身份驗證階段的日誌組：


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
    

下面是控制檯中的嵌套組輸出：
![簡單的控制檯組輸出](images/console-write-nestedgroup.png)

#### 自動摺疊組

大量使用組時，即時查看所有信息可能不是非常有用。這些情況下，您可以通過調用 [`console.groupCollapsed()`](./console-reference#consolegroupcollapsedobject-object-) 而不是 `console.group()` 的方式自動摺疊組：


    console.groupCollapsed("Authenticating user '%s'", user);
    if (authenticated) {
        ...
    }
    console.groupEnd();
    

groupCollapsed() 輸出：
![初始處於摺疊狀態的組](images/console-write-groupcollapsed.png)

## 錯誤和警告

錯誤和警告的作用與正常日誌的作用相同。唯一的區別是 `error()` 和 `warn()` 的樣式引人注目。

### console.error()

[`console.error()`](./console-reference#consoleerrorobject--object-) 方法會顯示紅色圖標和紅色消息文本：


    function connectToServer() {
        console.error("Error: %s (%i)", "Server is  not responding",500);
    }
    connectToServer();
    

轉變爲

![錯誤示例輸出](images/console-write-error-server-not-resp.png)

### console.warn()

[`console.warn()`](./console-reference#consolewarnobject--object-) 方法會顯示一個黃色警告圖標和相應的消息文本：


    if(a.childNodes.length < 3 ) {
        console.warn('Warning! Too few nodes (%d)', a.childNodes.length);
    }
    

轉變爲

![警告示例](images/console-write-warning-too-few-nodes.png)

## 斷言

[`console.assert()`](./console-reference#consoleassertexpression-object) 方法可以僅在其第一個參數爲 `false` 時有條件地顯示錯誤字符串（其第二個參數）。

### 簡單的斷言及其顯示方式

下面的代碼僅會在屬於 `list` 元素的子節點數大於 500 時在控制檯中顯示一條錯誤消息。


    console.assert(list.childNodes.length < 500, "Node count is > 500");
    

斷言失敗在控制檯中的顯示方式：
![斷言失敗](images/console-write-assert-failed.png)

## 字符串替代和格式設置

傳遞到任何記錄方法的第一個參數可能包含一個或多個格式說明符。格式說明符由一個 `%` 符號與後面緊跟的一個字母組成，字母指示應用到值的格式。字符串後面的參數會按順序應用到佔位符。

下面的示例使用字符串和數字格式說明符來將值插入到輸出字符串中。您將在控制檯中看到“Sam has 100 points”。

    console.log("%s has %d points", "Sam", 100);

格式說明符的完整列表爲：

| 說明符 | 輸出                                                                            |
|-----------|:----------------------------------------------------------------------------------|
| %s        | 將值格式化爲字符串                                                     |
| %i 或 %d  | 將值格式化爲整型                                                   |
| %f        | 將值格式化爲浮點值                                       |
| %o        | 將值格式化爲可擴展 DOM 元素。如同在 Elements 面板中顯示的一樣     |
| %O        | 將值格式化爲可擴展 JavaScript 對象                              |
| %c        | 將 CSS 樣式規則應用到第二個參數指定的輸出字符串 |

本示例使用數字說明符設置 `document.childNodes.length` 的值的格式。同時使用浮點說明符設置 `Date.now()` 的值的格式。

代碼：


    console.log("Node count: %d, and the time is %f.", document.childNodes.length, Date.now());
    

上一個代碼示例的輸出：
![示例替代輸出](images/console-write-log-multiple.png)

### 使用 CSS 設置控制檯輸出的樣式

利用 CSS 格式說明符，您可以自定義控制檯中的顯示。使用說明符啓動字符串，並設置爲您希望的樣式，作爲第二個參數。


嘗試使用下面的代碼：


    console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");
    

..將您的日誌輸出設置爲藍色的大字體：

![設置了格式的字符串](images/console-write-format-string.png)

### 將 DOM 元素格式化爲 JavaScript 對象

默認情況下，DOM 元素將以其 HTML 的表示的形式記錄到控制檯中，不過有時，您希望以 JavaScript 對象的形式訪問 DOM 元素並檢查其屬性。爲此，您可以使用 `%o` 字符串說明符（參見上文），也可以使用 `console.dir` 達到同樣的效果： 

![使用 dir() 記錄元素](images/dir-element.png)




{# wf_devsite_translation #}
