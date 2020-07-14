project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description:从 Windows、Mac 或 Linux 计算机远程调试 Android 设备上的实时内容。

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

# Android 设备的远程调试入门 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

从 Windows、Mac 或 Linux 计算机远程调试 Android 设备上的实时内容。
 本教程将向您展示如何：

* 设置您的 Android 设备进行远程调试，并从开发计算机上发现设备。
* 从您的开发计算机检查和调试 Android 设备上的实时内容。
* 将 Android 设备上的内容抓屏到您的开发计算机上的 DevTools 实例中。


<figure>
  <img src="imgs/remote-debugging.png"
       alt="远程调试可以让您从自己的开发计算机上检查 Android 设备上运行的页面。"/>

  <figcaption>
    <b>图 1</b>. 远程调试可以让您从自己的开发计算机上检查 Android 设备上运行的页面。

  </figcaption>
</figure>

## 第 1 步：发现您的 Android 设备 {: #discover }

下面的工作流程适用于大多数用户。 如需更多帮助，请参阅[问题排查：DevTools 检测不到 Android 设备](#troubleshooting)。


1. 在您的 Android 设备上打开 **Developer Options** 屏幕。 请参阅[配置设备上的开发者选项](https://developer.android.com/studio/debug/dev-options.html)
{:.external}。
1. 选择 **Enable USB Debugging**。
1. 在您的开发计算机上打开 Chrome。
1. [打开 DevTools](/web/tools/chrome-devtools/#open)。
1. 在 DevTools 中，点击 **主菜单** ![主菜单][main]，{:.devtools-inline} 
   然后选择 **More tools** > **Remote devices**。 

     <figure>
       <img src="imgs/open-remote-devices.png"
            alt="通过主菜单打开 Remote Devices 标签。"/>
       <figcaption>
         <b>图 2</b>. 通过<b>主菜单</b>打开 <b>Remote Devices</b> 标签
       </figcaption>
     </figure>

[main]: /web/tools/chrome-devtools/images/three-dot.png
[open]: /web/tools/chrome-devtools/remote-debugging/imgs/open-remote-devices.png

1. 在 DevTools 中，打开 **Settings** 标签。

1. 确保启用 **Discover USB devices** 复选框。

     <figure>
       <img src="imgs/discover-usb-devices.png" alt="启用 Discover USB Devices 复选框。"/>

       <figcaption>
         <b>图 3</b>. 启用 <b>Discover USB Devices</b> 复选框
       </figcaption>
     </figure>

[discover]: /web/tools/chrome-devtools/remote-debugging/imgs/discover-usb-devices.png

1. 使用 USB 电缆将 Android 设备直接连接到您的开发计算机。
 首次连接时，通常会看到 DevTools 检测到未知设备。
 如果您 Android 设备的型号名称下显示绿色圆点和 **Connected** 文本，则表示 DevTools 已与您的设备成功建立连接。
 继续执行[第 2 步](#debug)。

     <figure>
       <img src="imgs/unknown-device.png" alt="Remote Devices 标签显示成功检测到待授权的未知设备。"/>

       <figcaption>
         <b>图 4</b>. <b>Remote Devices</b> 标签显示成功检测到待授权的未知设备
</figcaption>

     </figure>


[unknown]: /web/tools/chrome-devtools/remote-debugging/imgs/unknown-device.png

1. 如果设备显示 **Unknown**，则根据 Android 设备上的权限提示接受 **Allow USB
Debugging**。 

### 问题排查：DevTools 检测不到 Android 设备 {: #troubleshooting }

请确保正确安装硬件：

* 如果是使用 USB 集线器，请尝试将您的 Android 设备直接连接到开发计算机上。
* 尝试拔出 Android 设备与开发计算机之间的 USB 电缆，然后再将其插回原位
。 在 Android 设备与开发计算机的屏幕未锁定时，执行此操作。
* 确保您的 USB 电缆正常工作。 您应该能够从自己的开发计算机上检查 Android 设备上的文件。


请确保正确安装您的软件：

* 如果开发计算机运行的是 Windows 系统，请尝试为 Android 设备手动安装 USB 驱动程序。
 请参阅[安装原始设备制造商 (OEM) USB 驱动程序][drivers]{:.external}。
* 某些 Windows 和 Android 设备（特别是 Samsung）组合需要额外的设置。
 请参阅 [Chrome DevTools 设备插入时未检测到设备][SO]{:.external}。

如果您的 Android 设备上未显示 **Allow USB Debugging** 提示，请尝试：

* 当 DevTools 在开发计算机上处于焦点状态时，断开并重新连接 USB 电缆，此时将会显示 Android 主屏幕。
 换言之，有时如果 Android 设备或开发计算机的屏幕锁定，则不会显示此提示。
* 更新您的 Android 设备和开发计算机的显示设置，以免其进入休眠状态。
* 将 Android 的 USB 模式设置为 PTP。 请参阅 [Galaxy S4 未显示 Authorize USB debugging 对话框](https://android.stackexchange.com/questions/101933){: .external }。
* 在 Android 设备的 **Developer Options** 屏幕上选择 **Revoke USB Debugging Authorizations**，以将其重置为新状态。


如果您发现本节或 [Chrome DevTools 设备插入时未检测到设备][SO]{: .external}中未提及的解决方案，
请在 Stack Overflow 问题下添加答案，或者[在 webfundamentals 存储库中提出问题][issue]{:.external}！

[drivers]: https://developer.android.com/tools/extras/oem-usb.html
[SO]: https://stackoverflow.com/questions/21925992
[issue]: https://github.com/google/webfundamentals/issues/new?title=[Remote%20Debugging]

## 第 2 步：从您的开发计算机调试 Android 设备上的内容 {: #debug }

1. 在 Android 设备上打开 Chrome。
1. 在 **Remote Devices** 标签中，点击与您的 Android 设备型号名称匹配的标签。
   在此页面的顶部，您会看到您 Android 设备的型号名称，然后是序列号。
 再往下，您可以看到设备上运行的 Chrome 的版本，版本号附在括号内。
 每个打开的 Chrome 标签都有自己的区域。 您可以从区域与标签交互。
 如果有任何使用 WebView 的应用，您也会看到针对每个应用的区域。
 在<b>图 5</b> 中，没有打开任何标签或 WebView。

     <figure>
       <img src="imgs/connected-remote-device.png" alt="连接的远程设备。"/>
       <figcaption>
         <b>图 5</b>. 连接的远程设备
</figcaption>
     </figure>

1. 在 **New tab** 文本框中，输入一个网址，然后点击 **Open**。 此页面将在 Android 设备上的新标签中打开。


1. 点击您刚刚打开的网址旁的 **Inspect**。 新的 DevTools 实例随即打开。
 您的 Android 设备上运行的 Chrome 的版本决定在开发计算机上打开的 DevTools 的版本。
   因此，如果您的 Android 设备正在运行一个非常旧的 Chrome 版本，则 DevTools 实例看上去可能与您常用的实例有很大的差别。


### 更多操作：重新加载、聚焦或关闭一个标签 {: #more-actions }

点击您要重新加载、聚焦或关闭的标签旁的 **More Options** ![更多选项][more]{:.devtools-inline} 。


[more]: /web/tools/chrome-devtools/images/three-dot.png

<figure>
  <img src="imgs/reload.png" alt="重新加载、聚焦或关闭标签的菜单。"/>
  <figcaption>
    <b>图 6</b>. 重新加载、聚焦或关闭标签的菜单
  </figcaption>
</figure>

### 检查元素 {: #inspect }

转到您的 DevTools 实例的 **Elements** 面板，将鼠标指针悬停在一个元素上以在 Android 设备的视口中突出显示该元素。


您还可以在 Android 设备屏幕上点按一个元素，以在 **Elements** 面板中选择该元素。
 点击您的 DevTools 实例上的 **Select Element** ![选择元素][select]，
{:.devtools-inline} 然后在您的 Android 设备屏幕上点按此元素。
 请注意，**Select Element** 将在第一次轻触后停用，因此，每次想要使用此功能时您都需要重新启用。



[select]: imgs/select-element.png

### 将 Android 屏幕抓屏到您的开发计算机上 {: #screencast }

点击 **Toggle Screencast** ![切换抓屏][screencast]，{:.devtools-inline}
以在您的 DevTools 实例中查看 Android 设备的内容。

[screencast]: imgs/toggle-screencast.png

您可以通过多种方式与抓屏互动：

* 将点击转变为点按，在设备上触发适当的轻触事件。 
* 将计算机上的按键发送至设备。 
* 要模拟双指张合手势，请按住 <kbd>Shift</kbd> 并拖动。 
* 要滚动，请使用您的触控板或鼠标滚轮，或者使用您的鼠标指针抛式滚动。


关于抓屏的一些注意事项：

* 抓屏仅显示页面内容。 抓屏的透明部分表示设备界面，如 Chrome 地址栏、Android 状态栏或 Android 键盘。
* 抓屏会对帧率产生负面影响。 在测量滚动或动画时停用抓屏，以更准确地了解页面的性能。
* 如果您的 Android 设备屏幕锁定，您的抓屏内容将消失。
 将您的 Android 设备屏幕解锁可自动恢复抓屏。


## 反馈 {: #feedback }

{% include "web/_shared/helpful.html" %}
