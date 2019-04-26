project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:关于 Chrome DevTools Network 面板功能的综合参考。

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

<style>
figcaption {
  text-align: center;
}
</style>

[ui]: #ui-overview
[requests]: #requests
[overview]: #overview

# 网络分析参考 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

在此关于 Chrome DevTools 网络分析功能的综合参考中，探索分析页面加载方式的新方法。


注：本参考是以 Chrome 58 为基础。如果您使用其他版本的 Chrome，DevTools 的界面和功能可能有所不同。
 请访问
`chrome://help` 以了解您运行的 Chrome 版本。

## 记录网络请求 {: #record }

默认情况下，只要 DevTools 处于打开状态，DevTools 就会在 Network 面板中记录所有网络请求。


<figure>
  <img src="imgs/network.png" alt="Network 面板。">
  <figcaption>
    <b>图 1</b>. Network 面板
</figcaption>
</figure>

### 停止记录网络请求 {: #stop-recording }

若要停止记录请求：

* 在 Network 面板上点击 **Stop recording network log** ![停止记录网络日志](imgs/record-on.png)
{: .devtools-inline } 。 随后此图标变为灰色，表示 DevTools 不再记录请求。
* 在 Network 面板处于焦点状态时，按 <kbd>Command</kbd>+<kbd>E</kbd> (Mac) 或
  <kbd>Control</kbd>+<kbd>E</kbd>（Windows、Linux）。


### 清除请求 {: #clear }

在 Network 面板上点击 **Clear** ![清除][clear]，{:.devtools-inline} 以清除 Requests 表格中的所有请求。


<figure>
  <img src="imgs/clear.svg" alt="Clear 按钮。">
  <figcaption>
    <b>图 2</b>. 添加蓝色边框的 Clear 按钮
</figcaption>
</figure>

[clear]: imgs/clear-requests.png

### 跨页面加载保存请求 {: #preserve-log }

要跨页面加载保存请求，请勾选 Network 面板上的 **Preserve log** 复选框。
 在您停用
**Preserve log** 之前，DevTools 会保存所有请求。

<figure>
  <img src="imgs/preserve-log.svg" alt="Preserve Log 复选框。">
  <figcaption>
    <b>图 3</b>. 添加蓝色边框的 Preserve Log 复选框
</figcaption>
</figure>

### 在页面加载期间捕获屏幕截图 {: #screenshots }

捕获屏幕截图以分析用户在等待页面加载时看到的内容。


要启用屏幕截图，请点击 Network 面板上的 **Capture screenshots** ![捕获屏幕截图][capture]
{: .devtools-inline } 。 此图标启用后即变为蓝色。


在 Network 面板处于焦点状态时重新加载页面以捕获屏幕截图。

捕获后，您可以通过以下方式与屏幕截图进行交互：

* 将鼠标指针悬停在屏幕截图上以查看捕获屏幕截图的时间点。
 Overview 窗格中将显示一条黄线。
* 点击屏幕截图的缩略图以过滤捕获屏幕截图后出现的任何请求。
* 双击缩略图进行放大。

<figure>
  <img src="imgs/screenshot-hover.png"
       alt="将鼠标指针悬停在屏幕截图上。">
  <figcaption>
    <b>图 4</b>. 将鼠标指针悬停在屏幕截图上。 Overview 窗格和 Waterfall 中的黄色垂直线表示捕获屏幕截图的时间。


  </figcaption>
</figure>

[capture]: imgs/capture-screenshots.png

### 重播 XHR 请求 {: #replay-xhr }

若要重播 XHR 请求，请右键点击 Requests 表格中的请求，然后选择 **Replay XHR**。


<figure>
  <img src="imgs/replay-xhr.png" alt="选择 Replay XHR。">
  <figcaption>
    <b>图 5</b>. 选择 Replay XHR
</figcaption>
</figure>

## 更改加载行为

### 通过停用浏览器缓存来模拟首次访问者 {: #disable-cache}

若要模拟新用户访问您网站的体验，请勾选 **Disable
cache** 复选框。 DevTools 会停用浏览器缓存。 这样可以更准确地模拟新用户的体验，因为之前在重复访问时请求是通过浏览器缓存提供。



<figure>
  <img src="imgs/disable-cache.svg" alt="Disable Cache 复选框。">
  <figcaption>
    <b>图 6</b>. 添加蓝色边框的 Disable Cache 复选框
</figcaption>
</figure>

#### 在 Network Conditions 抽屉式导航栏中停用浏览器缓存 {: #disable-cache-network-conditions }

如果在使用其他 DevTools 面板时想要停用缓存，请使用 Network Conditions 抽屉式导航栏。


1. 打开 [Network Conditions 抽屉式导航栏](#network-conditions)。
1. 勾选或取消选中 **Disable cache** 复选框。

### 手动清除浏览器缓存 {: #clear-cache}

若要随时手动清除浏览器缓存，请右键点击 Requests 表格中的任意位置，然后选择 **Clear Browser Cache**。


<figure>
  <img src="imgs/clear-browser-cache.png"
       alt="选择 Clear Browser Cache。">
  <figcaption>
    <b>图 7</b>. 选择 Clear Browser Cache
</figcaption>
</figure>

### 离线模拟 {: #offline }

有一类名为[渐进式网页应用][pwa]的新网页应用可以借助 [Service Worker][sw] 离线运行。
 构建此类应用后，它能够快速模拟无数据连接的设备，非常有用。



勾选 **Offline** 复选框以模拟完全离线的网络体验。


<figure>
  <img src="imgs/offline.svg"
       alt="Offline 复选框">
  <figcaption>
    <b>图 8</b>. 添加蓝色边框的 Offline 复选框
</figcaption>
</figure>

[pwa]: /web/progressive-web-apps/
[sw]: /web/fundamentals/getting-started/primers/service-workers

### 模拟慢速网络连接 {: #throttling }

在 **Network Throttling** 菜单中模拟 2G、3G 和其他连接速度。


<figure>
  <img src="imgs/network-panel-throttling-menu.svg"
       alt="Network Throttling 菜单。">
  <figcaption>
    <b>图 9</b>. 添加蓝色边框的 Network Throttling 菜单
</figcaption>
</figure>

您可以从各种预设中进行选择，例如 Regular 2G 或 Good 2G。 您还可以通过打开 Network Throttling 菜单并选择 **Custom** > **Add** 来添加自己的自定义预设。



DevTools 会在 **Network** 标签旁显示一个警告图标，以提醒您已启用限制。


#### 在 Network Conditions 抽屉式导航栏中模拟慢速网络连接 {: #throttling-network-conditions }

如果在使用其他 DevTools
面板时想要限制网络连接速度，请使用 Network Conditions 抽屉式导航栏。

1. 打开 [Network Conditions 抽屉式导航栏](#network-conditions)。
1. 在 **Network Throttling** 菜单中选择所需连接速度。

### 手动清除浏览器 Cookie {: #clear-cookies }

若要随时手动清除浏览器 Cookie，请右键点击
Requests 表格中的任意位置，然后选择 **Clear Browser Cookies**。

<figure>
  <img src="imgs/clear-browser-cookies.png"
       alt="选择 Clear Browser Cookies。">
  <figcaption>
    <b>图 10</b>. 选择 Clear Browser Cookies
</figcaption>
</figure>

### 替换用户代理 {: #user-agent }

若要手动替换用户代理：

1. 打开 [Network Conditions 抽屉式导航栏](#network-conditions)。
1. 取消选中 **Select automatically**。
1. 从菜单中选择用户代理选项，或在文本框中输入自定义选项。


## 过滤请求 {: #filter }

### 按属性过滤请求 {: #filter-by-property }

使用 **Filter** 文本框，以按请求的域或大小等属性过滤请求。


如果看不到文本框，则表明 Filters 窗格可能已隐藏。
请参阅[隐藏 Filters 窗格](#hide-filters)。

<figure>
  <img src="imgs/filter-text-box.svg" alt="Filters 文本框。">
  <figcaption>
    <b>图 11</b>. 添加蓝色边框的 Filters 文本框
</figcaption>
</figure>

您可以通过空格分隔每个属性，以同时使用多个属性。
 例如，`mime-type:image/gif larger-than:1K` 显示大于一千字节的所有 GIF。
 这些多属性过滤器等同于 AND 操作。
 目前不支持 OR 操作。


下面是支持的属性的完整列表。

* `domain`。 仅显示来自指定域的资源。 您可以使用通配符字符 (`*`) 纳入多个域。
 例如，`*.com`
将显示来自以 `.com` 结尾的所有域名的资源。 DevTools
会使用其遇到的所有域填充自动填充下拉菜单。
* `has-response-header`。 显示包含指定
HTTP 响应标头的资源。 DevTools 会使用其遇到的所有响应标头填充自动填充下拉菜单。
* `is`。 使用 `is:running` 可以查找 `WebSocket` 资源。
* `larger-than`。 显示大于指定大小的资源（以字节为单位）。
 将值设为 `1000` 等同于设置为 `1k`。
* `method`。 显示通过指定 HTTP 方法类型检索的资源。
 DevTools 会使用其遇到的所有 HTTP 方法填充下拉菜单。
* `mime-type`。 显示指定 MIME 类型的资源。 DevTools 会使用其遇到的所有 MIME 类型填充下拉菜单。
* `mixed-content`。 显示所有混合内容资源 (`mixed-content:all`)，或者仅显示当前显示的资源 (`mixed-content:displayed`)。
* `scheme`。 显示通过未保护 HTTP (`scheme:http`) 或受保护 HTTPS (`scheme:https`) 检索的资源。
* `set-cookie-domain`。 显示具有 `Set-Cookie` 标头并且 `Domain` 属性与指定值匹配的资源。
 DevTools 会使用其遇到的所有 Cookie 域填充自动填充下拉菜单。
* `set-cookie-name`。 显示具有 `Set-Cookie` 标头并且名称与指定值匹配的资源。
 DevTools 会使用其遇到的所有 Cookie 名称填充自动填充下拉菜单。
* `set-cookie-value`。 显示具有 `Set-Cookie` 标头并且值与指定值匹配的资源。
 DevTools 会使用其遇到的所有 Cookie 值填充自动填充下拉菜单。
* `status-code`。 仅显示 HTTP 状态代码与指定代码匹配的资源。
 DevTools 会使用其遇到的所有状态代码填充自动填充下拉菜单。


### 按类型过滤请求 {: #filter-by-type }

若要按请求类型过滤请求，请在 Network 面板上点击 **XHR**、**JS**、**CSS**、**Img**、**Media**、**Font**、**Doc**、**WS** (WebSocket)、**Manifest** 或 **Other**（此处未列出的任何其他类型）按钮。



如果您看不到这些按钮，则表明 Filters 窗格可能已隐藏。
请参阅[隐藏 Filters 窗格](#hide-filters)。

若要同时启用多个类型的过滤器，请按住 <kbd>Command</kbd>
(Mac) 或 <kbd>Control</kbd>（Windows、Linux），然后点击相应的过滤器。

<figure>
  <img src="imgs/multi-type-filter.png"
       alt="使用 Type 过滤器显示 JS、CSS 和 Doc[ument] 资源。">

  <figcaption>
    <b>图 12</b>. 使用 Type 过滤器显示 JS、CSS 和 Doc[ument] 资源。

  </figcaption>
</figure>

### 按时间过滤请求 {: #filter-by-time }

在 Overview 窗格中点击并向左或向右拖动，可以仅显示在指定时间范围内处于活动状态的请求。
 过滤器是包含在其中。 在突出显示的时间内处于活动状态的任何请求都将显示。


<figure>
  <img src="imgs/overview-filter.png"
       alt="过滤掉在 2500 毫秒左右处于非活动状态的所有请求。">
  <figcaption>
    <b>图 13</b>. 过滤掉在 2500 毫秒左右处于非活动状态的所有请求
</figcaption>

</figure>

### 隐藏数据网址

[数据网址][data-uris]是嵌入到其他文档中的小文件。 您在 Requests 表格中看到的以
`data:` 开头的所有请求都是数据网址。


勾选 **Hide data URLs** 复选框可以隐藏这些请求。

<figure>
  <img src="imgs/hide-data-urls.svg" alt="Hide Data URLs 复选框。">
  <figcaption>
    <b>图 14</b>. Hide Data URLs 复选框
</figcaption>
</figure>

[data-uris]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs

## 对请求排序

默认情况下，Requests 表格中的请求按开始时间进行排序，但您可以使用其他标准对此表格排序。


### 按列排序 {: #sort-by-column }

点击 Requests 表格中任何列的标题，可以按该列对请求排序。


### 按活动阶段排序 {: #sort-by-activity }

若要更改按瀑布图对请求排序的方式，请右键点击
Requests 表格的表头，将鼠标指针悬停在 **Waterfall** 上，然后选择以下选项之一：


* **Start Time**。 发出的第一个请求位于顶部。
* **Response Time**。 开始下载的第一个请求位于顶部。
* **End Time**。 完成的第一个请求位于顶部。
* **Total Duration**。 连接设置时间和请求/响应时间最短的请求位于顶部。
* **Latency**。 等待最短响应时间的请求位于顶部。


上述描述假设各自选项是按照从最短时间到最长时间的顺序排列。
 点击 **Waterfall** 列标题会反转次序。

<figure>
  <img src="imgs/waterfall-total-duration.png"
       alt="按总持续时间对瀑布图排序。">
  <figcaption>
    <b>图 15</b>. 按总持续时间对瀑布图排序。 各条形图的浅色部分表示等待的时间。
 深色部分表示下载以字节为单位的内容所花费的时间。

  </figcaption>
</figure>

## 分析请求 {: #analyze }

只要 DevTools 处于打开状态，便会在 Network 面板中记录所有请求。
使用 Network 面板分析请求。

### 查看请求日志 {: #requests }

使用 Requests 表格可以查看 DevTools 打开时发出的所有请求的日志。
 点击请求或将鼠标指针悬停在请求上将显示这些请求的更多信息。


<figure>
  <img src="imgs/requests-table.svg"
       alt="Requests 表格。">
  <figcaption>
    <b>图 16</b>. 添加蓝色边框的 Requests 表格
</figcaption>
</figure>

默认情况下，Requests 表格会显示以下列：

* **Name**。 资源的文件名或标识符。
* **Status**。 HTTP 状态代码。
* **Type**。 已请求资源的 MIME 类型。
* **Initiator**。 以下对象或进程可以发起请求：
    * **Parser**。 Chrome 的 HTML 解析器。
    * **Redirect**。 HTTP 重定向。
    * **Script**。 JavaScript 函数。
    * **Other**。 某些其他进程或操作，比如通过链接或者在地址栏中输入网址导航到某页面。
* **Size**。 响应标头及响应正文（由服务器提供）的组合大小。
* **Time**。 从请求开始至在响应中接收到最终字节的总持续时间。
* [**Waterfall**](#waterfall)。 各请求相关活动的直观分析图。

#### 添加或移除列 {: #columns }

右键点击 Requests 表格的表头，然后选择一个选项以便隐藏或显示此选项。
 当前显示的选项旁有复选标记。

<figure>
  <img src="imgs/add-column.png"
       alt="在 Requests 表格中添加列。">
  <figcaption>
    <b>图 17</b>. 在 Requests 表格中添加列。
  </figcaption>
</figure>

#### 添加自定义列 {: #custom-columns }

若要在 Requests 表格中添加自定义列，请右键点击 Requests 表格的表头，然后选择 **Response Headers** > **Manage Header Columns**。


<figure>
  <img src="imgs/custom-column.png"
       alt="在 Requests 表格中添加自定义列。">
  <figcaption>
    <b>图 18</b>. 在 Requests 表格中添加自定义列。
  </figcaption>
</figure>

### 查看彼此相关的请求时间 {: #waterfall }

使用瀑布图可以查看彼此相关的请求时间。
默认情况下，瀑布图按请求的开始时间进行排列。
因此，左侧请求的开始时间比右侧请求早。


如需了解对瀑布图排序的不同方式，请参阅[按活动阶段排序](#sort-by-activity)。


<figure>
  <img src="imgs/waterfall.png"
       alt="Requests 窗格的 Waterfal 列。">
  <figcaption>
    <b>图 19</b>. Requests 窗格的 Waterfal 列。
  </figcaption>
</figure>

### 分析 WebSocket 连接的帧 {: #frames }

若要查看 WebSocket 连接的帧：

1. 在 Requests 表格的 **Name** 列下，点击 WebSocket 连接的网址。
1. 点击 **Frames** 标签。 表格中将显示最后 100 帧。

若要刷新表格，请在 Requests 表格的 **Name** 列下重新点击 WebSocket 连接名称。


<figure>
  <img src="imgs/frames.svg"
       alt="Frames 标签。">
  <figcaption>
    <b>图 20</b>. 添加蓝色边框的 Frames 标签
</figcaption>
</figure>

表格中包含以下三列：

* **Data**。 消息负载。 如果消息为纯文本，则在此处显示。
 对于二进制操作码，此列将显示操作码的名称和代码。
 支持以下操作码：Continuation Frame、Binary Frame、Connection Close Frame、Ping Frame 和 Pong Frame。
* **Length**。 消息负载的长度（以字节为单位）。
* **Time**。 收到或发送消息的时间。

消息根据其类型进行彩色编码：

* 传出的文本消息为浅绿色。
* 传入的文本消息为白色。
* WebSocket 操作码为浅黄色。
* 错误为浅红色。

### 预览响应正文 {: #preview }

若要预览响应正文：

1. 在 Requests 表格的 **Name** 列下，点击请求的网址。
1. 点击 **Preview** 标签。

此标签主要用于查看图像。

<figure>
  <img src="imgs/preview.svg"
       alt="Preview 标签。">
  <figcaption>
    <b>图 21</b>. 添加蓝色边框的 Preview 标签
</figcaption>
</figure>

### 查看响应正文 {: #response }

若要查看请求的响应正文：

1. 在 Requests 表格的 **Name** 列下，点击请求的网址。
1. 点击 **Response** 标签。

<figure>
  <img src="imgs/response.svg"
       alt="Response 标签。">
  <figcaption>
    <b>图 22</b>. 添加蓝色边框的 Response 标签
</figcaption>
</figure>

### 查看 HTTP 标头 {: #headers }

若要查看有关请求的 HTTP 标头数据：

1. 在 Requests 表格的 **Name** 列下，点击请求的网址。
1. 点击 **Headers** 标签。

<figure>
  <img src="/web/tools/chrome-devtools/images/headers.svg"
       alt="Headers 标签。">
  <figcaption>
    <b>图 23</b>. 添加蓝色边框的 Headers 标签
</figcaption>
</figure>

#### 查看 HTTP 标头源 {: #header-source }

默认情况下，Headers 标签按字母顺序显示标头名称。 按收到的顺序查看 HTTP 标头名称：


1. 打开您感兴趣的请求的 **Headers** 标签。 请参阅[查看 HTTP 标头](#headers)。
1. 点击 **Request Header** 或 **Response Header** 部分旁的 **view source**。


### 查看查询字符串参数 {: #query-string }

若要以用户可读的格式查看网址的查询字符串参数：

1. 打开您感兴趣的请求的 **Headers** 标签。 请参阅[查看 HTTP 标头](#headers)。
1. 转至 **Query String Parameters** 部分。

<figure>
  <img src="imgs/query-string.svg" alt="Query String Parameters 部分。">
  <figcaption>
    <b>图 24</b>. 添加蓝色边框的 Query String Parameters 部分
  </figcaption>
</figure>

#### 查看查询字符串参数源 {: #query-string-source }

若要查看请求的查询字符串参数源：

1. 转至 Query String Parameters 部分。 请参阅[查看查询字符串参数](#query-string)。
1. 点击 **view source**。

#### 查看网址编码的查询字符串参数 {: #query-string-encodings }

若要以用户可读的格式查看保留编码的查询字符串参数：


1. 转至 Query String Parameters 部分。 请参阅[查看查询字符串参数](#query-string)。
1. 点击 **view URL encoded**。

### 查看 Cookie {: #cookies }

若要查看在请求的 HTTP 标头中发送的 Cookie：

1. 在 Requests 表格的 **Name** 列下，点击请求的网址。
1. 点击 **Cookies** 标签。

查看[字段](/web/tools/chrome-devtools/manage-data/cookies#fields)，了解各列的说明。


<figure>
  <img src="imgs/cookies.svg"
       alt="Cookies 标签。">
  <figcaption>
    <b>图 25</b>. 添加蓝色边框的 Cookies 标签
</figcaption>
</figure>

### 查看请求的时间细分数据 {: #timing }

若要查看请求的时间细分数据：

1. 在 Requests 表格的 **Name** 列下，点击请求的网址。
1. 点击 **Timing** 标签。

如需了解快速访问此数据的方法，请参阅[预览时间细分数据](#timing-preview)。


如需了解在 Timing 标签中可能看到的各阶段的更多信息，请参阅[时间细分阶段说明](#timing-explanation)。


<figure>
  <img src="imgs/timing.svg" alt="Timing 标签。">
  <figcaption>
    <b>图 26</b>. 添加蓝色边框的 Timing 标签
</figcaption>
</figure>

下面是有关每个阶段的更多信息。

如需了解访问此视图的其他方法，请参阅[查看时间细分数据](#timing-breakdown)。


#### 预览时间细分数据 {: #timing-preview }

若要预览请求的时间细分数据，请将鼠标指针悬停在 Requests 表格 **Waterfall** 列中的请求条目上。


如需了解不需要通过悬停访问此数据的方法，请参阅[查看请求的时间细分数据](#timing)。


<figure>
  <img src="imgs/waterfall-hover.png"
       alt="预览请求的时间细分数据。">
  <figcaption>
    <b>图 27</b>. 预览请求的时间细分数据
</figcaption>
</figure>

#### 时间细分阶段说明 {: #timing-explanation }

以下是有关在 Timing
标签中可能看到的各阶段的更多信息：

* **Queueing**。 浏览器在以下情况下对请求排队：
    * 存在更高优先级的请求。
    * 此源已打开六个 TCP 连接，达到限值。
 仅适用于 HTTP/1.0 和 HTTP/1.1。
    * 浏览器正在短暂分配磁盘缓存中的空间
* **Stalled**。 请求可能会因 **Queueing** 中描述的任何原因而停止。
* **DNS Lookup**。 浏览器正在解析请求的 IP 地址。
* **Proxy negotiation**。 浏览器正在与[代理服务器](https://en.wikipedia.org/wiki/Proxy_server)协商请求。
* **Request sent**。 正在发送请求。
* **ServiceWorker Preparation**。 浏览器正在启动 Service Worker。
* **Request to ServiceWorker**。 正在将请求发送到 Service
Worker。
* **Waiting (TTFB)**。 浏览器正在等待响应的第一个字节。
  TTFB 表示 Time To First Byte（至第一字节的时间）。 此时间包括 1 次往返延迟时间及服务器准备响应所用的时间。
* **Content Download**。 浏览器正在接收响应。
* **Receiving Push**。 浏览器正在通过 HTTP/2
服务器推送接收此响应的数据。
* **Reading Push**。 浏览器正在读取之前收到的本地数据。

### 查看发起者和依赖项 {: #initiators-dependencies }

若要查看请求的发起者和依赖项，请按住 <kbd>Shift</kbd> 键
并将鼠标指针悬停在 Requests 表格中的请求上。 DevTools
将发起者的颜色设置为绿色，将依赖项设置为红色。

<figure>
  <img src="imgs/initiators-dependencies.png"
       alt="查看请求的发起者和依赖项。">
  <figcaption>
    <b>图 28</b>. 查看请求的发起者和依赖项
</figcaption>
</figure>

当 Requests 表格按时间顺序排序时，鼠标指针悬停位置请求上方的第一个绿色请求是依赖项的发起者。
 如果该请求上方还有另一个绿色请求，则更高的请求是发起者的发起者。
 依此类推。

### 查看加载事件 {: #load }

DevTools 将在 Network 面板的多个位置显示 `DOMContentLoaded` 和 `load` 事件的时间。
 `DOMContentLoaded` 事件的颜色设置为蓝色，而 `load` 事件设置为红色。


<figure>
  <img src="imgs/load-events.svg"
       alt="Network 面板上 DOMContentLoaded 和 load 事件的位置。">
  <figcaption>
    <b>图 29</b>. “Network”面板上 <code>DOMContentLoaded</code> 和 <code>load</code> 事件的位置
</figcaption>

</figure>

### 查看请求总数 {: #total-number }

Network 面板底部的 Summary 窗格中列出请求总数。


Note: 此数字仅跟踪自 DevTools 打开后记录的请求。
 如果在 DevTools 打开之前出现其他请求，则这些请求不计算在内。


<figure>
  <img src="imgs/total-requests.svg"
       alt="自 DevTools 打开后的请求总数">
  <figcaption>
    <b>图 30</b>. 自 DevTools 打开后的请求总数
</figcaption>
</figure>

### 查看总下载大小 {: #total-size }

Network 面板底部的 Summary 窗格中列出请求的总下载大小。


Note: 此数字仅跟踪自 DevTools 打开后记录的请求。
 如果在 DevTools 打开之前出现其他请求，则这些请求不计算在内。


<figure>
  <img src="imgs/total-size.svg"
       alt="请求的总下载大小">
  <figcaption>
    <b>图 31</b>. 请求的总下载大小
</figcaption>
</figure>

如需了解浏览器解压缩后的资源大小，请参阅[查看未压缩的资源大小](#uncompressed)。


### 查看导致请求的堆栈轨迹 {: #initiator-stack-trace }

当 JavaScript 语句导致资源请求时，将鼠标指针悬停在 **Initiator** 列上，以查看导致请求的堆栈轨迹。


<figure>
  <img src="imgs/initiator-stack.png"
       alt="导致资源请求的堆栈轨迹">
  <figcaption>
    <b>图 32</b>. 导致资源请求的堆栈轨迹
</figcaption>
</figure>

### 查看未压缩的资源大小 {: #uncompressed }

点击 **Use Large Request Rows** ![使用大请求行](imgs/large-resource-rows-button.png)，
{:.inline-icon} 然后查看 **Size** 列底部的值。


<figure>
  <img src="imgs/large-request-rows.png"
       alt="未压缩资源示例。">
  <figcaption>
    <b>图 33</b>. 通过网络发送的 <code>jquery-bundle.js</code> 文件的压缩大小是 <code>30.9 KB</code>，而未压缩大小是 <code>86.3 KB</code>


  </figcaption>
</figure>

## 导出请求数据 {: #export }

### 将所有网络请求保存到 HAR 文件中 {: #save-as-har }

若要将所有网络请求保存到 HAR 文件中：

1. 右键点击 Requests 表格中的任意请求。
1. 选择 **Save as HAR with Content**。 DevTools
会将自打开 DevTools 后出现的所有请求保存到 HAR 文件中。 无法过滤请求或仅保存单个请求。


获得 HAR 文件后，可以将其导回 DevTools 进行分析。 只需将 HAR 文件拖放到 Requests 表格即可。
 另请参阅 [HAR Analyzer][HAR
Analyzer]{: .external }。

[HAR Analyzer]: https://toolbox.googleapps.com/apps/har_analyzer/

<figure>
  <img src="imgs/save-as-har.png"
       alt="选择 Save as HAR with Content。">
  <figcaption>
    <b>图 34</b>. 选择 <b>Save as HAR with Content</b>
  </figcaption>
</figure>

### 将一个或多个请求复制到剪贴板 {: #copy }

在 Requests 表格的 **Name** 列下，右键点击某请求，将鼠标指针悬停在 **Copy** 上，然后选择以下选项之一：


* **Copy Link Address**。 将请求的网址复制到剪贴板。
* **Copy Response**。 将响应正文复制到剪贴板。
* **Copy as cURL**。 以 cURL 命令形式复制请求。
* **Copy All as cURL**。 以一系列 cURL 命令形式复制所有请求。
* **Copy All as HAR**。 以 HAR 数据形式复制所有请求。

<figure>
  <img src="imgs/copy.png" alt="选择 Copy Response。">
  <figcaption>
    <b>图 35</b>. 选择 Copy Response
</figcaption>
</figure>

## 更改 Network 面板的布局

展开或折叠 Network 面板界面的各个部分以关注您注重的内容。


### 隐藏 Filters 窗格 {: #hide-filters }

默认情况下，DevTools 会显示 [Filters 窗格](#filters)。
点击 **Filter** ![过滤][filter]{: .devtools-inline } 可以隐藏此窗格。

<figure>
  <img src="imgs/hide-filters.svg" alt="Hide Filters 按钮">
  <figcaption>
    <b>图 36</b>. 添加蓝色边框的 Hide Filters
</figcaption>
</figure>

[filter]: imgs/filters.png

### 使用大请求行 {: #request-rows }

想要在网络请求表格中添加更多空格时，可以使用大行。
 使用大行时，某些列还会提供更多信息。
 例如，**Size**
列底部的值是未压缩的请求大小。

<figure>
  <img src="imgs/large-request-rows.png"
       alt="Requests 窗格的大请求行示例。">
  <figcaption>
    <b>图 37</b>. Requests 窗格的大请求行示例
</figcaption>
</figure>

点击 **Use large request rows** ![使用大请求行][large]
{:.devtools-inline} 可以启用大行。

[large]: imgs/large-resource-rows-button.png

<figure>
  <img src="imgs/large-request-rows.svg" alt="Large Request Rows 按钮">
  <figcaption>
    <b>图 38</b>. 添加蓝色边框的 Large Request Rows
</figcaption>
</figure>

### 隐藏 Overview 窗格 {: #hide-overview }

默认情况下，DevTools 会显示 [Overview 窗格](#overview)。
点击 **Hide overview** ![隐藏概览][hide]{:.devtools-inline} 可以隐藏此窗格。

<figure>
  <img src="imgs/hide-overview.svg" alt="Hide Overview 按钮">
  <figcaption>
    <b>图 39</b>. 添加蓝色边框的 Hide Overview
</figcaption>
</figure>

[hide]: imgs/hide-overview.png

## 反馈 {: #feedback }

{% include "web/_shared/helpful.html" %}
