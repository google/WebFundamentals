project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:您的任务不只局限于确保网站在 Chrome 和 Android 上出色运行。即使 Device Mode 可以模拟 iPhone 等多种其他设备，我们仍鼓励您查看其他浏览器模拟解决方案。

{# wf_updated_on:2015-04-13 #}
{# wf_published_on:2015-04-13 #}

# 模拟和测试其他浏览器 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

您的任务不只局限于确保网站在 Chrome 和 Android 上出色运行。即使 Device Mode 可以模拟 iPhone 等多种其他设备，我们仍鼓励您查看其他浏览器模拟解决方案。


### TL;DR {: .hide-from-toc }
- 如果您没有特定设备，或者想要执行抽检，最佳方式就是直接在浏览器中模拟设备。
- 利用设备模拟器，您可以从工作站在一系列设备上模拟开发网站。
- 基于云的模拟器让您可以在不同平台之间对网站进行自动化单元测试。"


## 浏览器模拟器

浏览器模拟器非常适合于测试网站的自适应能力，但它们无法模拟 API 差异、CSS 支持，以及您可以在移动设备浏览器中看到的某些行为。在真实设备运行的浏览器上测试您的网站，确保一切均按照预期运行。


### Firefox 的自适应设计视图

Firefox 拥有一个[自适应设计视图](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View)，让您可以探索您的设计在常见屏幕尺寸上的变化或者通过拖动边缘的方式确定自己的大小，而不用考虑具体设备。




### Edge 的 F12 模拟

要模拟 Windows Phones，请使用 Microsoft Edge 的[内置模拟](https://dev.modern.ie/platform/documentation/f12-devtools-guide/emulation/)。

由于 Edge 不具备旧版兼容性，请使用 [IE 11 的模拟](https://msdn.microsoft.com/en-us/library/dn255001(v=vs.85).aspx)模拟您的页面在较旧版本 Internet Explorer 中的外观。

## 设备模拟器

设备模拟器不仅可以模拟浏览器环境，也能模拟整个设备。它们可以用于测试需要 iOS 集成的内容，例如带虚拟键盘的表单输入。

### Android Emulator

<figure class="attempt-right">
  <img src="imgs/android-emulator-stock-browser.png" alt="Android Emulator Stock Browser">
  <figcaption>Android Emulator 中的 Stock Browser</figcaption>
</figure>

目前，无法在 Android Emulator 上安装 Chrome。不过，您可以使用 Android Browser、Chromium Content Shell 和 Firefox for Android，我们将在本指南的稍后部分进行介绍。Chromium Content Shell 与 Chrome 使用相同的渲染引擎，但没有任何浏览器特定的功能。

Android Emulator 标配 Android SDK，您需要从<a href="http://developer.android.com/sdk/installing/studio.html">此处</a>下载。
然后，按照说明<a href="http://developer.android.com/tools/devices/managing-avds.html">设置虚拟设备</a>和<a href="http://developer.android.com/tools/devices/emulator.html">启动模拟器</a>。

模拟器启动后，点击 Browser 图标，就可以在较旧的 Stock Browser for Android 上测试网站了。

#### Android 上的 Chromium Content Shell

<figure class="attempt-right">
  <img src="imgs/android-avd-contentshell.png" alt="Android Emulator Content Shell">
  <figcaption>Android Emulator Content Shell</figcaption>
</figure>

要安装 Chromium Content Shell for Android，请保持模拟器运行并在命令提示符处运行以下命令：


    git clone https://github.com/PaulKinlan/chromium-android-installer.git
    chmod u+x ./chromium-android-installer/\*.sh
    ./chromium-android-installer/install-chromeandroid.sh

现在，您可以使用 Chromium Content Shell 测试您的网站。


#### Android 上的 Firefox

<figure class="attempt-right">
  <img src="imgs/ff-on-android-emulator.png" alt="Android Emulator 上的 Firefox 图标">
  <figcaption>Android Emulator 上的 Firefox 图标</figcaption>
</figure>

与 Chromium 的 Content Shell 类似，您可以获取一个 APK 以将 Firefox 安装到模拟器上。

从 <a href="https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/">https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/</a> 下载合适的 .apk 文件。

从这里，您可以使用以下命令将文件安装到打开的模拟器或连接的 Android 设备上：

    adb install &lt;path to APK&gt;/fennec-XX.X.XX.android-arm.apk


### iOS 模拟器

适用于 Mac OS X 的 iOS 模拟器标配 Xcode，您可以[从 App Store 安装](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12)。


完成后，您可以通过 [Apple 的文档](https://developer.apple.com/library/prerelease/ios/documentation/IDEs/Conceptual/iOS_Simulator_Guide/Introduction/Introduction.html)学习如何使用模拟器。

注：为了避免在每次想要使用 iOS 模拟器时都要打开 Xcode，请打开 Xcode，然后右键点击停靠栏中的 iOS Simulator 图标并选择 `Keep in Dock`。现在，您可以在需要时随时点击此图标。

### Modern.IE

<figure class="attempt-right">
  <img src="imgs/modern-ie-simulator.png" alt="Modern IE VM">
  <figcaption>Modern IE VM</figcaption>
</figure>

利用 Modern.IE 虚拟机，您可以在自己的计算机上通过 VirtualBox（或 VMWare）访问不同版本的 IE。在<a href="https://modern.ie/en-us/virtualization-tools#downloads">此处的下载页面</a>上选择一款虚拟机。


## 基于云的模拟器

如果您无法使用模拟器并且没有真实设备，那么基于云的模拟器是您的最佳选择。基于云的模拟器相对于真实设备和本地模拟器的一大优势是，您可以在不同平台上对网站进行自动化单元测试。

* [BrowserStack（商用）](https://www.browserstack.com/automate)是最便于进行手动测试的云模拟器。您可以选择操作系统、浏览器版本与设备类型，以及要浏览的网址，模拟器将启动一个您可以与之交互的托管式虚拟机。您还可以在相同屏幕中启动多个模拟器，这样，您能够同时测试应用在多个设备上的外观。
* [SauceLabs（商用）](https://saucelabs.com/){: .external } 允许您在模拟器内部运行单元测试，这对于将网站流脚本化和稍后在各种设备上观看视频记录非常有用。您也可以对网站进行手动测试。
* [Device Anywhere（商用）](http://www.keynote.com/solutions/testing/mobile-testing)不使用模拟器，而是使用您可以远程控制的真实设备。
如果您需要在特定设备上重现问题并且在本指南之前的任何选项上都无法看到错误，远程控制真实设备将非常有用。





{# wf_devsite_translation #}
