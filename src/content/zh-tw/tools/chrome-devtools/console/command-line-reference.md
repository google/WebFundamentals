project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:TODO

{# wf_updated_on: 2015-08-02 #}
{# wf_published_on: 2015-04-13 #}

# Command Line API 參考 {: .page-title }

{% include "web/_shared/contributors/andismith.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Command Line API 包含一個用於執行以下常見任務的便捷函數集合：選擇和檢查 DOM 元素，以可讀格式顯示數據，停止和啓動分析器，以及監控 DOM 事件。

注：此 API 僅能通過控制檯本身獲取。您無法通過網頁上的腳本訪問 Command Line API。


## $_

`$_` 返回最近評估的表達式的值。

在以下示例中，對一個簡單的表達式 (`2 + 2`) 進行評估。然後評估 `$_` 屬性，其包含相同的值：




![$_ 爲最近評估的表達式](images/recently-evaluated-expression-1.png)

在下一個示例中，已評估的表達式最初包含一個名稱數組。評估 `$_.length` 以發現數組的長度，`$_` 中存儲的值變爲最新評估的表達式，即 4：





![$_ 在評估新命令時更改](images/recently-evaluated-expression-2.png)

## $0 - $4

`$0`、`$1`、`$2`、`$3` 和 `$4` 命令用作在 Elements 面板中檢查的最後五個 DOM 元素或在 Profiles 面板中選擇的最後五個 JavaScript 堆對象的歷史參考。`$0` 返回最近一次選擇的元素或 JavaScript 對象，`$1` 返回僅在最近一次之前選擇的元素或對象，依此類推。




在以下示例中，在 Elements 面板中選擇一個具有類 `medium` 的元素。在 Console 抽屜式導航欄中，`$0` 已評估，並顯示相同的元素：




![$0 的示例](images/element-0.png)

下圖顯示的是在同一個頁面中選擇的一個不同的元素。`$0` 現在指的是新選擇的元素，而 `$1` 返回以前選擇的元素：



![$1 的示例](images/element-1.png)

## $(selector)

`$(selector)` 返回帶有指定的 CSS 選擇器的第一個 DOM 元素的引用。此函數等同於 [document.querySelector()](https://docs.webplatform.org/wiki/css/selectors_api/querySelector) 函數。




以下示例在文檔中返回第一個 `<img>` 元素的引用：


![$('img') 的示例](images/selector-img.png)

右鍵點擊返回的結果並選擇“Reveal in Elements Panel”以在 DOM 中查找它，或選擇“Scroll in to View”以在頁面上顯示它。



以下示例返回當前選擇的元素的引用，並顯示它的 src 屬性：

![$('img').src 的示例](images/selector-img-src.png)

注：如果您在使用庫，例如，使用  <code>$</code> 的 jQuery，則此功能將被覆蓋， <code>$</code> 將與該庫的實現對應。

## $$(selector)

`$$(selector)` 返回與給定 CSS 選擇器匹配的元素數組。此命令等同於調用 [document.querySelectorAll()](https://docs.webplatform.org/wiki/css/selectors_api/querySelectorAll)。




以下示例使用 `$$()` 在當前文檔中創建一個所有 `<img>` 元素的數組，並顯示每個元素的 `src` 屬性值：



		var images = $$('img');
		for (each in images) {
			console.log(images[each].src);
		}

![使用 $$() 選擇文檔中的所有圖像並顯示其來源的示例。](images/all-selector.png)

注：在控制檯中按 <kbd class='kbd'>Shift</kbd> + <kbd class='kbd'>Enter</kbd> 以開始一個新行，無需執行腳本。

## $x(path)

`$x(path)` 返回一個與給定 XPath 表達式匹配的 DOM 元素數組。


例如，以下命令返回頁面上的所有 `<p>` 元素：


		$x("//p")

![使用 XPath 選擇器的示例](images/xpath-p-example.png)

以下示例返回包含 `<a>` 元素的所有 `<p>` 元素：


		$x("//p[a]")

![示例較複雜的 XPath 選擇器的示例](images/xpath-p-a-example.png)

## clear()

`clear()` 清除其歷史記錄的控制檯。

		clear();

## copy(object)

`copy(object)` 將指定對象的字符串表示形式複製到剪貼板。


		copy($0);

## debug(function)

調用指定的函數時，將觸發調試程序，並在 Sources 面板上使函數內部中斷，從而允許逐行執行代碼並進行調試。



		debug(getData);

![使用 debug() 在函數內部中斷](images/debug.png)

使用 `undebug(fn)` 停止函數中斷，或使用 UI 停用所有斷點。


如需瞭解有關斷點的詳細信息，請參閱[使用斷點進行調試](/web/tools/chrome-devtools/javascript/add-breakpoints)。


## dir(object)

`dir(object)` 顯示所有指定對象的屬性的對象樣式列表。此方法等同於 Console API 的 `console.dir()` 方法。



以下示例顯示在命令行中直接評估 `document.body` 和使用 `dir()` 顯示相同元素之間的差異：



		document.body;
		dir(document.body);

![包含/不含 dir() 函數的日誌記錄 document.body](images/dir.png)

如需瞭解詳細信息，請參閱 Console API 中的 [`console.dir()`](/web/tools/chrome-devtools/debug/console/console-reference#console.dir(object)) 條目。


## dirxml(object)

`dirxml(object)` 輸出以 XML 形式表示的指定對象，如 Elements 標籤中所示。此方法等同於 [console.dirxml()](https://developer.mozilla.org/en-US/docs/Web/API/Console) 方法。



## inspect(object/function) {:#inspect}

`inspect(object/function)` 在相應的面板中打開並選擇指定的元素或對象：針對 DOM 元素使用 Elements 面板，或針對 JavaScript 堆對象使用 Profiles 面板。


以下是在“Elements”面板中打開 `document.body` 的示例：

		inspect(document.body);

![使用 inspect() 檢查文檔](images/inspect.png)

當傳遞要檢查的函數時，此函數在 Sources 面板中打開文檔以供您檢查。



## getEventListeners(object)

`getEventListeners(object)` 返回在指定對象上註冊的事件偵聽器。返回值是一個對象，其包含每個註冊的事件類型（例如，“click”或“keydown”）數組。每個數組的成員是描述爲每個類型註冊的偵聽器的對象。例如，下面列出了在文檔對象上註冊的所有事件偵聽器：









		getEventListeners(document);

![使用 getEventListeners() 時的輸出](images/get-event-listeners.png)

如果在指定對象上註冊了多個偵聽器，則數組包含每個偵聽器的成員。以下示例中，在 #scrollingList 元素上爲“mousedown”事件註冊了兩個事件偵聽器：





![多個偵聽器](images/scrolling-list.png)

您可以進一步展開每個對象以查看他們的屬性：

![展開的 listener 對象的視圖](images/scrolling-list-expanded.png)

## keys(object)

`keys(object)` 返回一個包含屬於指定對象的屬性名稱的數組。如需獲取相同屬性的關聯值，請使用 `values()`。




例如，假設您的應用定義了以下對象：


		var player1 = { "name": "Ted", "level": 42 }

假設在全局命名空間中定義了 `player1`（爲簡單起見），那麼，在控制檯輸入 `keys(player1)` 和 `values(player1)` 會生成以下內容：


![keys() 和 values() 方法的示例](images/keys-values.png)

## monitor(function)

調用指定函數時，系統會向控制檯記錄一條消息，其中指明函數名稱及在調用時傳遞到該函數的參數。




		function sum(x, y) {
			return x + y;
		}
		monitor(sum);

![monitor() 方法的示例](images/monitor.png)

使用 `unmonitor(function)` 停止監控。

## monitorEvents(object[, events])

當在指定對象上發生一個指定事件時，將 Event 對象記錄到控制檯。您可以指定一個要監控的單獨事件、一個事件數組或一個映射到預定義事件集合的常規事件“類型”。請參閱以下示例。

以下命令監控 window 對象上的所有 resize 事件。

		monitorEvents(window, "resize");

![監控窗口大小調整事件](images/monitor-events.png)

下面定義一個在 window 對象上同時監控“resize”和“scroll”事件的數組：

		monitorEvents(window, ["resize", "scroll"])

您還可以指定一個可用的事件“類型”、映射到預定義事件集的字符串。下表列出了可用的事件類型及其相關的事件映射：




<table class="responsive">
	<thead>
		<tr>
			<th colspan="2">事件類型和對應的已映射事件</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>mouse</td>
			<td>"mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", "mouseout", "mousewheel"</td>
		</tr>
		<tr>
			<td>key</td>
			<td>"keydown", "keyup", "keypress", "textInput"</td>
		</tr>
		<tr>
			<td>touch</td>
			<td>"touchstart", "touchmove", "touchend", "touchcancel"</td>
		</tr>
		<tr>
			<td>control</td>
			<td>"resize", "scroll", "zoom", "focus", "blur", "select", "change", "submit", "reset"</td>
		</tr>
	</tbody>
</table>

例如，以下示例爲 Elements 面板上當前選擇的輸入文本字段上的所有對應 key 事件使用使用“key”事件類型。



		monitorEvents($0, "key");

下面是在文本字段中輸入字符後的一個輸出示例：

![監控關鍵事件](images/monitor-key.png)

## profile([name]) and profileEnd([name])

`profile()` 使用可選的名稱啓動一個 JavaScript CPU 分析會話。`profileEnd()` 在 Profile 面板中完成分析，並顯示結果。（另請參閱[加速 JavaScript 執行](/web/tools/chrome-devtools/rendering-tools/js-execution)。）





開始分析：

		profile("My profile")

在“Profiles”面板中停止分析並顯示結果：

		profileEnd("My profile")

也可以嵌入配置文件。例如，這在任意順序下都起作用：

		profile('A');
		profile('B');
		profileEnd('A');
		profileEnd('B');

“profiles”面板中的結果

![分組的個人資料](images/grouped-profiles.png)


注：一次可運行多個 CPU 配置文件，不需要您按創建順序結束它們。

## table(data[, columns])

通過傳入含可選列標題的數據對象記錄具有表格格式的對象數據。例如，要在控制檯中顯示使用 table 的名稱列表，您需要執行：





		var names = {
			0: { firstName: "John", lastName: "Smith" },
			1: { firstName: "Jane", lastName: "Doe" }
		};
		table(names);

![table() 方法的示例](images/table.png)

## undebug(function)

`undebug(function)` 可停止調試指定函數，以便在調用函數時，不再調用調試程序。



		undebug(getData);

## unmonitor(function)

`unmonitor(function)` 可停止監控指定函數。它可與 `monitor(fn)` 結合使用。


		unmonitor(getData);

## unmonitorEvents(object[, events])

`unmonitorEvents(object[, events])` 可停止針對指定對象和事件的事件監控。例如，以下命令可停止 window 對象上的所有事件監控：




		unmonitorEvents(window);

您也可以有選擇性地停止監控某個對象上的特定事件。例如，以下代碼可開始對當前所選元素上所有鼠標事件的監控，然後停止監控“mousemove”事件（可能會減少控制檯輸出的噪音）：





		monitorEvents($0, "mouse");
		unmonitorEvents($0, "mousemove");

## values(object)

`values(object)` 返回一個包含屬於指定對象的所有屬性值的數組。


		values(object);




{# wf_devsite_translation #}
