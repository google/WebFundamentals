project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:从 Windows、Mac 或 Linux 计算机远程调试 Android 设备上的实时内容。

{# wf_updated_on:2016-12-09 #}
{# wf_published_on:2015-04-13 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

# 远程调试 Android 设备使用入门 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

从 Windows、Mac 或 Linux 计算机远程调试 Android 设备上的实时内容。
本教程将向您展示如何：

* 设置您的 Android 设备进行远程调试，并从开发计算机上发现设备。
* 从您的开发计算机检查和调试 Android 设备上的实时内容。
* 将 Android 设备上的内容抓屏到您的开发计算机上的 DevTools 实例中。


![远程调试图示](imgs/remote-debugging.png)

## 要求{: #requirements }

* 开发计算机上已安装 Chrome 32 或更高版本。
* 开发计算机上已安装 [USB 驱动程序][drivers]（如果您使用 Windows）。
确保设备管理器报告正确的 USB 驱动程序
* 拥有一根可以将您的 Android 设备连接至开发计算机的 USB 电缆。
* Android 4.0 或更高版本。
* 您的 Android 设备上已安装 Chrome（Android 版）。

[drivers]: https://developer.android.com/tools/extras/oem-usb.html

## 第 1 步：发现您的 Android 设备{: #discover }

1. 在您的 Android 设备上，选择 **Settings** > **Developer Options** > **Enable USB Debugging**。
在运行 Android 4.2 及更新版本的设备上，**Developer options** 默认情况下处于隐藏状态。
请参阅[启用设备上的开发者选项][android]以了解如何启用它。


[android]: https://developer.android.com/studio/run/device.html#developer-device-options

1. 在您的开发计算机上打开 Chrome。您应使用您的一个 Google 帐户登录到 Chrome。
远程调试在[隐身模式][incognito]或[访客模式][guest]下无法运行。


[guest]: https://support.google.com/chrome/answer/6130773
[incognito]: https://support.google.com/chrome/answer/95464

1. [打开 DevTools](/web/tools/chrome-devtools/#open)。

1. 在 DevTools 中，点击 **Main Menu** ![主菜单][main]{:.devtools-inline}，然后选择 **More tools** > **Remote devices**。
 

     ![打开远程设备抽屉式导航栏][open]

[main]: /web/tools/chrome-devtools/images/three-dot.png
[open]: /web/tools/chrome-devtools/remote-debugging/imgs/open-remote-devices.png

1. 在 DevTools 中，点击 **Settings** 标签（如果正在显示另一个标签）。

1. 确保已启用 **Discover USB devices**。

     ![已启用 Discover USB devices][discover]

[discover]: /web/tools/chrome-devtools/remote-debugging/imgs/discover-usb-devices.png

1. 使用一根 USB 电缆将 Android 设备直接连接到您的开发计算机。
请勿使用任何中间 USB 集线器。如果这是您首次将您的 Android 设备连接到此开发计算机，您的设备将显示在 **Unknown** 中，其下面具有文本 **Pending Authorization**。




       ![未知的设备，待授权][unknown]

[unknown]: /web/tools/chrome-devtools/remote-debugging/imgs/unknown-device.png

1. 如果您的设备显示为 **Unknown**，则在 Android 设备上接受 **Allow USB Debugging** 权限提示。
**Unknown** 被替换为您的 Android 设备的型号名称。
绿色圆圈和 **Connected** 文本表示您已大功告成，可以从开发计算机远程调试您的 Android 设备。


注：如果您在发现流程中遇到任何问题，您可以通过在 Android 设备上选择 **Settings** > **Developer Options** > **Revoke USB Debugging Authorizations** 重启该流程。



## 第 2 步：从您的开发计算机调试 Android 设备上的内容。{: #debug }

1. 如果您尚未在 Android 设备上打开 Chrome，则现在打开它。

1. 返回 DevTools，点击与设备的型号名称匹配的标签。
在此页面的顶部，您会看到 Android 设备的型号名称，后面紧跟着其序列号。
在型号名称下面，您可以看到在设备上运行的 Chrome 的版本，版本号在括号里。每个打开的 Chrome 标签都会有自己的区域。您可以从此区域与该标签交互。
如果有任何使用 WebView 的应用，您也会看到针对每个应用的区域。
下面的屏幕截图没有任何打开的标签或 WebViews。


       ![连接的远程设备][connected]

[connected]: /web/tools/chrome-devtools/remote-debugging/imgs/connected-remote-device.png

1. 在 **New tab** 旁输入一个网址，然后点击 **Open**。此页面将在 Android 设备上的新标签中打开。


1. 点击您刚刚打开的网址旁的 **Inspect**。这将打开一个新的 DevTools 实例。
您的 Android 设备上运行的 Chrome 的版本决定在开发计算机上打开的 DevTools 的版本。因此，如果您的 Android 设备正在运行一个非常旧的 Chrome 版本，则 DevTools 实例看上去可能与您常用的实例有很大的差别。


### 更多操作：重新加载、聚焦或关闭一个标签 {: #more-actions }

点击您要重新加载、聚焦或关闭的标签旁的 **More Options** ![更多选项][more]{:.devtools-inline}。


[more]: /web/tools/chrome-devtools/images/three-dot.png

![重新加载、聚焦或关闭一个标签](imgs/reload.png)

### 检查元素{: #inspect }

转到您的 DevTools 实例的 **Elements** 面板，将鼠标悬停在一个元素上以在 Android 设备的视口中突出显示它。


您还可以在 Android 设备屏幕上点按一个元素，以在 **Elements** 面板中选中它。
点击您的 DevTools 实例上的 **Select Element** ![Select
Element][select]{:.devtools-inline}，然后在您的 Android 设备屏幕上点按此元素。
请注意，**Select Element** 将在第一次触摸后停用，因此，每次想要使用此功能时您都需要重新启用它。



[select]: imgs/select-element.png

### Android 设备到开发计算机的抓屏 {: #screencast }

点按 **Toggle Screencast** ![Toggle Screencast][screencast]{:.devtools-inline} 以在您的 DevTools 实例中查看 Android 设备的内容。


[抓屏]: imgs/toggle-screencast.png

您可以通过多种方式与抓屏互动：

* 将点击转变为点按，在设备上触发适当的触摸事件。 
* 将计算机上的按键发送至设备。 
* 要模拟双指张合手势，请按住 <kbd>Shift</kbd> 拖动。 
* 要滚动，请使用您的触控板或鼠标滚轮，或者使用您的鼠标指针抛式滚动。


关于抓屏的一些注意事项：

* 抓屏仅显示页面内容。抓屏的透明部分表示设备界面，如 Chrome 多功能框、Android 状态栏或 Android 键盘。
* 抓屏会对帧率产生负面影响。在测量滚动或动画时停用抓屏，以更准确地了解页面的性能。
* 如果您的 Android 设备屏幕锁定，您的抓屏内容将消失。
将您的 Android 设备屏幕解锁可自动恢复抓屏。


## 反馈{: #feedback }

如果您想帮助我们改进此教程，请回答下面的问题！


{% framebox width="auto" height="auto" %}
<p>您是否已成功完成此教程？</p>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Completed / Yes">是</button>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Completed / No">否</button>
<p>此教程是否包含您在寻找的信息？</p>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Relevant / Yes">是</button>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Relevant / No">否</button>
{% endframebox %}


{# wf_devsite_translation #}
