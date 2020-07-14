project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: 使用 Chrome Device Mode 下的虚拟设备打造移动设备优先的网站。

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

[capture]: /web/tools/chrome-devtools/images/shared/capture-settings.png
[customize]: /web/tools/chrome-devtools/images/shared/customize-and-control-devtools.png

# 使用 Chrome DevTools 中的 Device Mode 模拟移动设备 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

使用 Device Mode 可以大致了解您的页面在移动设备上呈现的外观和效果。

Device Mode 是 Chrome DevTools 中未绑定功能集的名称，有助于您模拟移动设备。
 这些功能包括：

* [模拟移动设备视口](#viewport)
* [限制网络流量](#network)
* [限制 CPU 占用率](#cpu)
* [模拟地理定位](#geolocation)
* [设置屏幕方向](#orientation)

## 限制 {: #limitations }

Device Mode 被视为对您的页面在移动设备上的外观取[一阶近似][approximation]{:.external} 。
 使用 Device Mode 时，实际不是在移动设备上运行您的代码，
 而是在笔记本电脑或桌面设备上模拟移动用户体验。

[approximation]: https://en.wikipedia.org/wiki/Order_of_approximation#First-order

不过，移动设备的某些方面是 DevTools 永远无法模拟的。 例如，移动设备 CPU 的架构与笔记本电脑或桌面设备 CPU 的架构大不一样。
 如果心存疑虑，最好可以在移动设备上运行您的页面。 
在移动设备上实际运行某页面代码时，可通过[远程调试](/web/tools/chrome-devtools/remote-debugging/)在笔记本电脑或桌面设备上查看、更改、调试和分析页面代码。


## 模拟移动设备视口 {: #viewport }

点击 **Toggle Device Toolbar** ![切换设备工具栏][TDB]{: .inline-icon } 可以打开用于模拟移动设备视口的界面。


[TDB]: /web/tools/chrome-devtools/images/shared/toggle-device-toolbar.png

<figure>
  <img src="imgs/device-toolbar.png"
       alt="设备工具栏。"/>
  <figcaption>
    <b>图 1</b>. 设备工具栏
  </figcaption>
</figure>

默认情况下，设备工具栏在打开时处于自适应视口模式。 

### 自适应视口模式 {: #responsive }

拖动手柄可以将视口大小调整为所需的任何尺寸。 或者，您也可以在宽度和高度框中输入特定值。
 在**图 2** 中，宽度设置为 `628`，高度设置为 `662`。


<figure>
  <img src="imgs/responsive-handles.png"
       alt="在自适应视口模式下更改视口尺寸的手柄。"/>
  <figcaption>
    <b>图 2</b>. 在自适应视口模式下更改视口尺寸的手柄
  </figcaption>
</figure>

#### 显示媒体查询 {: #queries }

要在视口上方显示媒体查询断点，请点击 **More options**，然后选择 **Show media
queries**。

<figure>
  <img src="imgs/show-media-queries.png"
       alt="显示媒体查询。"/>
  <figcaption>
    <b>图 3</b>. 显示媒体查询
  </figcaption>
</figure>

点击更改视口宽度的断点，以触发此断点。

<figure>
  <img src="imgs/breakpoint.png"
       alt="点击更改视口宽度的断点。"/>
  <figcaption>
    <b>图 4</b>. 点击更改视口宽度的断点
  </figcaption>
</figure>

### 移动设备视口模式 {: #device }

要模拟特定移动设备的尺寸，请从 **Device** 列表中选择设备。

<figure>
  <img src="imgs/device-list.png"
       alt="Device 列表。"/>
  <figcaption>
    <b>图 5</b>. Device 列表
  </figcaption>
</figure>

#### 将视口旋转为横向 {: #landscape }

点击 **Rotate** ![旋转](imgs/rotate.png){: .inline-icon } 可以将视口旋转为横向。

<figure>
  <img src="imgs/landscape.png"
       alt="横向。"/>
  <figcaption>
    <b>图 6</b>. 横向
  </figcaption>
</figure>

请注意，如果 **Device Toolbar** 布局较窄，则 **Rotate** 按钮会消失。

<figure>
  <img src="imgs/device-toolbar.png"
       alt="设备工具栏。"/>
  <figcaption>
    <b>图 7</b>. 设备工具栏
  </figcaption>
</figure>

另请参阅[设置屏幕方向](#orientation)。

#### 显示设备框架 {: #frame }

在模拟 iPhone 6 等特定移动设备的尺寸时，可打开 **More options**，然后选择 **Show device frame** 以显示设备视口物理框架。


注：如果看不到特定设备的设备框架，则可能意味着 DevTools
没有该特定选项的效果图。

<figure>
  <img src="imgs/show-device-frame.png"
       alt="显示设备框架。"/>
  <figcaption>
    <b>图 8</b>. 显示设备框架
  </figcaption>
</figure>

<figure>
  <img src="imgs/iphone-frame.png"
       alt="iPhone 6 的设备框架。"/>
  <figcaption>
    <b>图 9</b>. iPhone 6 的设备框架
  </figcaption>
</figure>

### 显示标尺 {: #rulers }

点击 **More options**，然后选择 **Show rulers** 可以看到视口上方和左侧的标尺。
 标尺的尺寸调整单位是像素。

<figure>
  <img src="imgs/show-rulers.png"
       alt="显示标尺。"/>
  <figcaption>
    <b>图 10</b>. 显示标尺
  </figcaption>
</figure>

<figure>
  <img src="imgs/rulers.png"
       alt="视口上方和左侧的标尺。"/>
  <figcaption>
    <b>图 11</b>. 视口上方和左侧的标尺
  </figcaption>
</figure>

### 缩放视口 {: #zoom }

使用 **Zoom** 列表可以放大或缩小视口。

<figure>
  <img src="imgs/zoom-viewport.png"
       alt="缩放。"/>
  <figcaption>
    <b>图 11</b>. 缩放
  </figcaption>
</figure>

## 限制网络流量和 CPU 占用率 {: #throttle }

要限制网络流量和 CPU 占用率，请从 **Throttle** 列表中选择 **Mid-tier mobile**
或 **Low-end mobile**。

<figure>
  <img src="imgs/throttling.png"
       alt="Throttle 列表。"/>
  <figcaption>
    <b>图 12</b>. Throttle 列表
  </figcaption>
</figure>

**Mid-tier mobile** 可模拟快速 3G 网络，并限制 CPU 占用率，以使模拟性能比普通性能低 4 倍。
 **Low-end mobile** 可模拟慢速 3G 网络，并限制 CPU 占用率，以使模拟性能比普通性能低 6 倍。
请记住，限制是相对于笔记本电脑或桌面设备的普通性能而言。 

请注意，如果 **Device Toolbar** 布局较窄，则会隐藏 **Throttle** 列表。

<figure>
  <img src="imgs/device-toolbar.png"
       alt="设备工具栏。"/>
  <figcaption>
    <b>图 13</b>. 设备工具栏
  </figcaption>
</figure>

### 只限制 CPU 占用率 {: #cpu }

如果只限制 CPU 占用率而不限制网络流量，请转至 **Performance** 面板，点击 **Capture Settings** ![捕获设置][capture]
{:.inline-icon}，然后从 **CPU** 列表中选择 **4x slowdown** 或 **6x slowdown**。


<figure>
  <img src="imgs/cpu.png"
       alt="CPU 列表。"/>
  <figcaption>
    <b>图 14</b>. CPU 列表
  </figcaption>
</figure>

### 只限制网络流量 {: #network }

如果只限制网络流量而不限制 CPU 占用率，请转至 **Network** 面板，然后从 **Throttle** 列表中选择 **Fast 3G** 或 **Slow 3G**。


<figure>
  <img src="imgs/network.png"
       alt="Throttle 列表。"/>
  <figcaption>
    <b>图 14</b>. Throttle 列表
  </figcaption>
</figure>

或者按 <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) 或 <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（Windows、Linux、Chrome 操作系统），以打开命令菜单，输入 `3G`，然后选择 **Enable fast 3G throttling** 或 **Enable slow 3G throttling**。




<figure>
  <img src="imgs/commandmenu.png"
       alt="命令菜单。"/>
  <figcaption>
    <b>图 15</b>. 命令菜单
  </figcaption>
</figure>

您还可以在 **Performance** 面板中设置网络节流。 点击
**Capture Settings** ![捕获设置][capture]，{: .inline-icon } 然后从 **Network** 列表中选择 **Fast 3G** 或 **Slow 3G**。


<figure>
  <img src="imgs/network2.png"
       alt="在 Performance 面板中设置网络节流。"/>
  <figcaption>
    <b>图 16</b>. 在 Performance 面板中设置网络节流
  </figcaption>
</figure>

## 替换地理定位 {: #geolocation }

要打开地理定位替换界面，请点击 **Customize and control DevTools**
![自定义和控制 DevTools][customize]，{: .inline-icon } 然后选择
**More tools** > **Sensors**。

<figure>
  <img src="imgs/sensors.png"
       alt="传感器"/>
  <figcaption>
    <b>图 17</b>. 传感器
  </figcaption>
</figure>

或者按 <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) 或
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（Windows、Linux、Chrome 操作系统），以打开命令菜单，输入 `Sensors`，然后选择 **Show Sensors**。


<figure>
  <img src="imgs/show-sensors.png"
       alt="显示传感器"/>
  <figcaption>
    <b>图 18</b>. 显示传感器
  </figcaption>
</figure>

从 **Geolocation** 列表中选择其中一个预设，或选择 **Custom location**
以输入自己的坐标，或选择 **Location unavailable** 以测试您的页面在地理定位处于错误状态时的表现。


<figure>
  <img src="imgs/geolocation.png"
       alt="地理定位"/>
  <figcaption>
    <b>图 19</b>. 地理定位
  </figcaption>
</figure>

## 设置屏幕方向 {: #orientation }

要打开屏幕方向界面，请点击 **Customize and control DevTools**
![自定义和控制 DevTools][customize]，{: .inline-icon } 然后选择
**More tools** > **Sensors**。


<figure>
  <img src="imgs/sensors.png"
       alt="传感器"/>
  <figcaption>
    <b>图 20</b>. 传感器
  </figcaption>
</figure>

或者按 <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) 或
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（Windows、Linux、Chrome 操作系统），以打开命令菜单，输入 `Sensors`，然后选择 **Show Sensors**。


<figure>
  <img src="imgs/show-sensors.png"
       alt="显示传感器"/>
  <figcaption>
    <b>图 21</b>. 显示传感器
  </figcaption>
</figure>

从 **Orientation** 列表中选择其中一个预设，或选择 **Custom orientation**
以设置自己的 alpha、beta 和 gamma 值。

<figure>
  <img src="imgs/orientation.png"
       alt="屏幕方向"/>
  <figcaption>
    <b>图 22</b>. 屏幕方向
  </figcaption>
</figure>

## 反馈 {: #feedback }

{% include "web/_shared/helpful.html" %}

如需了解提供反馈的其他方式，请参阅[加入 DevTools 社区](/web/tools/chrome-devtools/#community)。

