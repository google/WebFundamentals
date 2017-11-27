project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Chrome DevTools 的 Network 面板测量您的网络应用的网络性能。

{# wf_updated_on:2016-02-21 #}
{# wf_published_on:2015-04-13 #}

# 测量资源加载时间 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

使用 <strong>Network</strong> 面板测量您的网站网络性能。


![Chrome DevTools 的 Network 面板](imgs/network-panel.png)

**Network** 面板记录页面上每个网络操作的相关信息，包括详细的耗时数据、HTTP 请求与响应标头和 Cookie，等等。




### TL;DR {: .hide-from-toc }
- 使用 Network 面板记录和分析网络活动。
- 整体或单独查看资源的加载信息。
- 过滤和排序资源的显示方式。
- 保存、复制和清除网络记录。
- 根据需求自定义 Network 面板。


## Network 面板概览

Network 面板由五个窗格组成：

1. **Controls**。使用这些选项可以控制 **Network** 面板的外观和功能。
2. **Filters**。
使用这些选项可以控制在 **Requests Table** 中显示哪些资源。提示：按住 <kbd>Cmd</kbd> (Mac) 或 <kbd>Ctrl</kbd> (Windows/Linux) 并点击过滤器可以同时选择多个过滤器。
3. **Overview**。
此图表显示了资源检索时间的时间线。如果您看到多条竖线堆叠在一起，则说明这些资源被同时检索。
4. **Requests Table**。
此表格列出了检索的每一个资源。
   默认情况下，此表格按时间顺序排序，最早的资源在顶部。点击资源的名称可以显示更多信息。
   提示：右键点击 **Timeline** 以外的任何一个表格标题可以添加或移除信息列。
5. **Summary**。
此窗格可以一目了然地告诉您请求总数、传输的数据量和加载时间。


![Network 面板的窗格](imgs/panes.png)

默认情况下，**Requests Table** 会显示以下列。您可以[添加和移除列](#add-and-remove-table-columns)。


* **Name**。资源的名称。
* **Status**。HTTP 状态代码。
* **Type**。已请求资源的 MIME 类型。
* **Initiator**。发起请求的对象或进程。值为以下选项之一：
  * **Parser**。Chrome 的 HTML 解析器发起请求。
  * **Redirect**。HTTP 重定向发起请求。
  * **Script**。脚本发起请求。
  * **Other**。某些其他进程或操作发起请求，例如用户通过链接或者在地址栏中输入网址导航到页面。
* **Size**。响应标头（通常为数百字节）加响应正文（由服务器提供）的组合大小。
* **Time**。从请求开始至在响应中接收到最终字节的总持续时间。
* **Timeline**。Timeline 列可以显示所有网络请求的可视瀑布。
点击此列的标题可以显示一个包含更多排序字段的菜单。


## 记录网络活动

在 **Network** 面板打开时，DevTools 在默认情况下会记录所有网络活动。
要记录活动，只需在面板打开时重新加载页面，或者等待当前加载页面上的网络活动。


您可以通过 **record** 按钮指示 DevTools 是否记录。
显示红色 (![记录按钮打开](imgs/record-on.png){:.inline}) 表明 DevTools 正在记录。
显示灰色 (![记录按钮关闭](imgs/record-off.png){:.inline}) 表明 DevTools 未在记录。
点击此按钮可以开始或停止记录，也可以按键盘快捷键 <kbd>Cmd/Ctrl</kbd>+<kbd>e</kbd>。


## 在记录期间捕捉屏幕截图{:#filmstrip}

**Network** 面板可以在页面加载期间捕捉屏幕截图。此功能称为**幻灯片**。
 

点击**摄影机**图标可以启用幻灯片。图标为灰色时，幻灯片处于停用状态 (![已停用幻灯片](imgs/filmstrip-disabled.png){:.inline})。如果图标为蓝色，则说明已启用 (![已启用幻灯片](imgs/filmstrip-enabled.png){:.inline})。


重新加载页面可以捕捉屏幕截图。屏幕截图显示在**概览**上方。
 

![带幻灯片的记录](imgs/filmstrip.png)

将鼠标悬停在一个屏幕截图上时，**Timeline** 将显示一条黄色竖线，指示帧的捕捉时间。


![Timeline 上的幻灯片叠加层](imgs/filmstrip-timeline-overlay.png)

双击屏幕截图可查看放大版本。在屏幕截图处于放大状态时，使用键盘的向左和向右箭头可以在屏幕截图之间导航。



![放大的幻灯片屏幕截图](imgs/filmstrip-zoom.png)

## 查看 DOMContentLoaded 和 load 事件信息

**Network** 面板突出显示两种事件：[`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) 和 [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load)。



解析页面的初始标记时会触发 `DOMContentLoaded`。
此事件将在 **Network** 面板上的两个地方显示：

1. **Overview** 窗格中的蓝色竖线表示事件。
2. 在 **Summary** 窗格中，您可以看到事件的确切时间。

![Network 面板上的 DOMContentLoaded 事件](imgs/domcontentloaded.png)

页面完全加载时将触发 `load`。此事件显示在三个地方：

1. **Overview** 窗格中的红色竖线表示事件。
2. **Requests Table** 中的红色竖线也表示事件。
3. 在 **Summary** 窗格中，您可以看到事件的确切时间。

![Network 面板上的 load 事件](imgs/load.png)

## 查看单个资源的详细信息

点击资源名称（位于 **Requests Table** 的 **Name** 列下）可以查看与该资源有关的更多信息。


可用标签会因您所选择资源类型的不同而不同，但下面四个标签最常见：


* **Headers**。与资源关联的 HTTP 标头。
* **Preview**。JSON、图像和文本资源的预览。
* **Response**。HTTP 响应数据（如果存在）。
* **Timing**。资源请求生命周期的精细分解。


![查看单一资源的详情](imgs/network-headers.png)

### 查看网络耗时

点击 **Timing** 标签可以查看单个资源请求生命周期的精细分解。
 

生命周期按照以下类别显示花费的时间：

<!-- the screenshot above and list below are redundant, but we include
     the text for SEO -->

* Queuing
* Stalled
* 如果适用：DNS lookup、initial connection、SSL handshake
* Request sent
* Waiting (TTFB)
* Content Download

![timing 标签](imgs/timing-tab.png)

将鼠标悬停到 **Timeline** 图表内的资源上时，您也可以看到相同的信息。
 

![Timeline 中一个资源的定时数据](imgs/timeline-view-hover.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.timing #}

相关指南：

* [了解 Resource Timing](understanding-resource-timing)

### 查看 HTTP 标头

点击 **Headers** 可以显示该资源的标头。

**Headers** 标签可以显示资源的请求网址、HTTP 方法以及响应状态代码。
此外，该标签还会列出 HTTP 响应和请求标头、它们的值以及任何查询字符串参数。
 

![单一资源的 HTTP 标头](imgs/network-headers.png)

点击每一部分旁边的 `view source` 或 `view parsed` 链接，您能够以源格式或者解析格式查看响应标头、请求标头或者查询字符串参数。



![查看标头源](imgs/view-header-source.png)

您也可以点击相应部分旁边的 `view URL encoded` 或 `view decoded` 链接，以网址编码或解码格式查看查询字符串参数。


![查看已编码网址](imgs/view-url-encoded.png)

### 预览资源

点击 **Preview** 标签可以查看该资源的预览。**Preview** 标签可能显示一些有用的信息，也可能不显示，具体取决于您所选择资源的类型。



![图像资源预览](imgs/preview-png.png)

### 查看 HTTP 响应内容

点击 **Response** 标签可以查看资源未格式化的 HTTP 响应内容。
**Preview** 标签可能包含一些有用的信息，也可能不包含，具体取决于您所选择资源的类型。


![JSON 资源响应数据](imgs/response-json.png)

### 查看 Cookie

点击 **Cookies** 标签可以查看在资源的 HTTP 请求和响应标头中传输的 Cookie 表。
只有传输 Cookie 时，此标签才可用。


下面是 Cookie 表中每一列的说明：

* **Name**。Cookie 的名称。
* **Value**。Cookie 的值。
* **Domain**。Cookie 所属的域。
* **Path**。Cookie 来源的网址路径。
* **Expires / Max-Age**。Cookie 的 expires 或 max-age 属性的值。
* **Size**。Cookie 的大小（以字节为单位）。
* **HTTP**。指示 Cookie 应仅由浏览器在 HTTP 请求中设置，而无法通过 JavaScript 访问。
* **Secure**。如果存在此属性，则指示 Cookie 应仅通过安全连接传输。


![资源 Cookie](imgs/cookies.png)

### 查看 WebSocket 框架

点击 **Frames** 标签可以查看 [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) 连接信息。

只有选定资源发起 `WebSocket` 连接时，此标签才会显示。


![WebSocket 框架标签](imgs/websocket-frames.png)

下表对 **Frames** 标签上表格中的每一列进行了说明：


* **Data**。消息负载。如果消息为纯文本，将在此处显示。
对于二进制操作码，此字段将显示操作码的名称和代码。
支持以下操作码：
  * 延续框架
  * 二进制框架
  * 连接关闭框架
  * Ping 框架
  * Pong 框架
* **Length**。消息负载的长度（以字节为单位）。
* **Time**。消息创建时的时间戳。

消息根据其类型进行彩色编码： 

* 传出文本消息为浅绿色。
* 传入文本消息为白色。 
* WebSocket 操作码为浅黄色。
* 错误为浅红色。

**有关当前实现的说明：**

* 要在每条新消息到达后刷新 **Frames** 表，请点击左侧的资源名称。

* **Frames** 表格仅保留最后 100 条 `WebSocket` 消息。

## 查看资源发起者和依赖项 {:#initiators-dependencies}

按住 <kbd>Shift</kbd> 并将鼠标悬停在资源上，可以查看其发起者和依赖项。
本部分将您悬停的资源称为**目标**。
 

目标上方的第一个绿色编码资源为目标的发起者。
如果上方存在第二个也是绿色编码的资源，那么该资源将是发起者的发起者。
目标下方红色编码的任何资源都是目标的依赖项。


下方的屏幕截图中，目标是 `dn/`。此目标的发起者为以 `rs=AA2Y` 开头的脚本。
发起者 (`rs=AA2Y`) 的发起者为 `google.com`。
最后，`dn.js` 是目标 (`dn/`) 的依赖项。


![查看资源发起者和依赖关系](imgs/initiators-dependencies.png)

请记住，对于具有大量资源的页面，您可能无法看到所有的发起者或依赖项。
 

## 排序请求

默认情况下，**Requests Table** 中的资源按照每个请求的开始时间排序，最早的请求位于顶部。


点击列标头可以按照该标头下每个资源的值对表格排序。
再次点击相同的标头可以将排序顺序更改为升序或降序。


**Timeline** 列与其他列不同。点击此列时，它将显示一个由多个排序字段组成的菜单：


* **Timeline**。按每个网络请求的开始时间排序。这是默认排序方式，与按 **Start Time** 选项排序相同。
* **Start Time**。按每个网络请求的开始时间排序（与按 **Timeline** 选项排序相同）。
* **Response Time**。按每个请求的响应时间排序。
* **End Time**。按每个请求完成的时间排序。
* **Duration**。按每个请求的总时间排序。选择此过滤器可以确定哪些资源的加载时间最长。
* **Latency**。按请求开始与响应开始之间的时间排序。
选择此过滤器可以确定哪些资源至第一字节 (TTFB) 的时间最长。


![Timeline 排序字段](imgs/timeline-sort-fields.png)

## 过滤请求 

**Network** 面板提供了多种方式来过滤要显示哪些资源。
点击 **Filter** 按钮 (![Filter 按钮](imgs/filters.png){:.inline}) 可以隐藏或显示 **Filters** 窗格。



使用内容类型按钮可以仅显示选定内容类型的资源。
 

注：按住 <kbd>Cmd</kbd> (Mac) 或 <kbd>Ctrl</kbd> (Windows/Linux) 并点击过滤器可以同时启用多个过滤器。

![同时选择了多个内容类型过滤器]
(imgs/multiple-content-type-filters.png)

**Filter** 文本字段看似非常强大。如果您在其中输入任意字符串，**Network** 面板仅会显示文件名与给定字符串匹配的资源。



![资源名称过滤](imgs/resource-name-filtering.png)

**Filter** 文本字段还支持各种关键词，这样，您可以按照各种属性对资源排序，例如使用 `larger-than` 关键字按文件大小进行排序。



下文列表说明了所有关键字。 

* `domain`。仅显示来自指定域的资源。您可以使用通配符字符 (`*`) 来包含多个域。
例如，`*.com` 将显示来自以 `.com` 结尾的所有域名的资源。
DevTools 会使用它遇到的所有域填充自动填充下拉菜单。
* `has-response-header`。显示包含指定 HTTP 响应标头的资源。
DevTools 会使用它遇到的所有响应标头填充自动填充下拉菜单。
* `is`。使用 `is:running` 可以查找 `WebSocket` 资源。
* `larger-than`。显示大于指定大小的资源（以字节为单位）。
将值设为 `1000` 等同于设置为 `1k`。
* `method`。显示通过指定 HTTP 方法类型检索的资源。
DevTools 会使用它遇到的所有 HTTP 方法填充下拉菜单。
* `mime-type`。显示指定 MIME 类型的资源。DevTools 会使用它遇到的所有 MIME 类型填充下拉菜单。
* `mixed-content`。显示所有混合内容资源 (`mixed-content:all`)，或者仅显示当前显示的资源 (`mixed-content:displayed`)。
* `scheme`。显示通过未保护 HTTP (`scheme:http`) 或受保护 HTTPS (`scheme:https`) 检索的资源。
* `set-cookie-domain`。显示具有 `Set-Cookie` 标头并带有与指定值匹配的 `Domain` 属性的资源。
DevTools 会使用它遇到的所有 Cookie 域填充自动填充下拉菜单。
* `set-cookie-name`。显示具有 `Set-Cookie` 标头并且名称与指定值匹配的资源。
DevTools 会使用它遇到的所有 Cookie 名称填充自动填充下拉菜单。
* `set-cookie-value`。显示具有 `Set-Cookie` 标头并且值与指定值匹配的资源。
DevTools 会使用它遇到的所有 Cookie 值填充自动填充下拉菜单。
* `status-code`。仅显示 HTTP 状态代码与指定代码匹配的资源。
DevTools 会使用它遇到的所有状态代码填充自动填充下拉菜单。


![按文件大小过滤](imgs/larger-than.png)

上面的一些关键字都提及自动填充下拉菜单。要触发自动填充菜单，请在键入关键字时后面加一个冒号。
例如，在下面的屏幕截图中，输入 `domain:` 触发了自动填充下拉菜单。


![过滤文本字段自动填充](imgs/filter-autocomplete.png)

## 复制、保存和清除网络信息

在 **Requests Table** 中点击右键可以复制、保存或删除网络信息。
某些选项取决于上下文，因此，如果您希望操作单个资源，则需要右键点击该资源所在的行。

下面的列表说明了每一个选项。

* **Copy Response**。将选定资源的 HTTP 响应复制到系统剪贴板。
* **Copy as cURL**。以 [cURL](http://curl.haxx.se/){: .external } 命令字符串的形式将选定资源的网络请求复制到系统剪贴板。请参阅[以 cURL 命令形式复制请求](#copy-requests-as-curl-commands)。
* **Copy All as HAR**。以 [HAR](https://en.wikipedia.org/wiki/.har){: .external } 数据形式将所有资源复制到系统剪贴板。HAR 文件包含用于说明网络“瀑布”的 JSON 数据结构。多款[第三方](https://ericduran.github.io/chromeHAR/){: .external } [工具](https://code.google.com/p/harviewer/){: .external } 可以依据 HAR 文件中的数据重建网络瀑布。请参阅[网页性能工具：
HTTP 归档 (HAR)](https://www.igvita.com/2012/08/28/web-performance-power-tool-http-archive-har/)，了解更多信息。
* **Save as HAR with Content**。将所有网络数据及每一个页面资源保存到 HAR 文件。
二进制资源（包括图像）以 Base64 编码文本的形式编码。
* **Clear Browser Cache**。清除浏览器缓存。**提示**：您也可以从 [**Network Conditions**][nc] 抽屉式导航栏中启用或停用浏览器缓存。
* **Clear Browser Cookies**。清除浏览器的 Cookie。
* **Open in Sources Panel**。在 **Sources** 面板中打开选定资源。
* **Open Link in New Tab**。在新标签中打开选定资源。您也可以在 Network 表中双击资源名称。
* **Copy Link Address**。将资源网址复制到系统剪贴板。
* **Save**。保存选定的文本资源。仅在文本资源上显示。
* **Replay XHR**。重新发送选定的 `XMLHTTPRequest`。仅在 XHR 资源上显示。


![复制并保存上下文菜单](imgs/copy-save-menu.png) 

[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions

### 以 cURL 命令形式复制一个或所有请求 {: #curl }

[cURL](http://curl.haxx.se/){: .external } 是一种用于进行 HTTP 事务的命令行工具。
 

在 Requests Table 中右键点击某个资源，将鼠标悬停在 **Copy** 上，然后选择 **Copy as cURL**，复制 Network 面板检测到的所有资源的 cURL 请求的字符串。



![以 cURL 命令形式复制单一请求](imgs/copy-as-curl.png)

选择 **Copy as cURL**，复制 Network 面板检测到的所有资源的 cURL 请求的字符串。


当您复制全部时，过滤将被忽略（例如，如果您过滤 Network 面板仅显示 CSS 资源，然后按 **Copy All as cURL**，您将获取所有检测到的资源，而不只是 CSS）。



## 自定义 Network 面板

默认情况下，**Requests Table** 会使用小行显示资源。点击 **Use large resource rows** 按钮 (![large resource rows 按钮](imgs/large-resource-rows-button.png){:.inline}) 可以增大每一行的大小。


 

大行可以让某些列显示两个文本字段：主要字段和次要字段。
列标头指示次要字段的含义。
 

![大资源行](imgs/large-resource-rows.png)

### 添加和移除表格列

右键点击 **Requests Table** 中的任一标题可以添加或移除列。


![添加或移除列](imgs/add-remove-columns.png)

### 导航时保留网络日志。

默认情况下，每当您重新加载当前页面或者加载不同的页面时，网络活动记录会被丢弃。启用 **Preserve log** 复选框可以在这些情况下保存网络日志。
新记录将附加到 **Requests Table** 的底部。

## 其他资源

要详细了解如何优化您的应用的网络性能，请参阅下面的资源：

* 使用 [PageSpeed Insights](/speed/pagespeed/insights) 确定可以应用到您网站的性能最佳做法，以及使用 [PageSpeed 优化工具](/speed/pagespeed/optimization)将应用这些最佳做法的流程自动化。
* [Google Chrome 中的高性能网络](https://www.igvita.com/posa/high-performance-networking-in-google-chrome/)讨论了 Chrome 网络内部机制，以及您如何充分利用它们让您的网站更快。
* [gzip 压缩的工作原理](/speed/articles/gzip)提供了 gzip 压缩的高级概览，并介绍了这种压缩为什么是一种不错的方法。
* [网页性能最佳做法](/speed/docs/best-practices/rules_intro)提供了更多用于优化您的网页或应用的网络性能的提示。







{# wf_devsite_translation #}
