project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Chrome 开发者工具在您的原生 Android 应用中调试 WebView。

{# wf_updated_on:2015-07-29 #}
{# wf_published_on:2015-04-13 #}

# 远程调试 WebView {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

使用 Chrome 开发者工具在您的原生 Android 应用中调试 WebView。

在 Android 4.4 (KitKat) 或更高版本中，使用 DevTools 可以在原生 Android 应用中调试 WebView 内容。



### TL;DR {: .hide-from-toc }
- 在您的原生 Android 应用中启用 WebView 调试；在 Chrome DevTools 中调试 WebView。
- 通过 <strong>chrome://inspect</strong> 访问已启用调试的 WebView 列表。
- 调试 WebView 与通过<a href='/web/tools/chrome-devtools/debug/remote-debugging'>远程调试</a>调试网页相同。


## 配置 WebViews 进行调试

必须从您的应用中启用 WebView 调试。要启用 WebView 调试，请在 WebView 类上调用静态方法 [setWebContentsDebuggingEnabled](https://developer.android.com/reference/android/webkit/WebView.html#setWebContentsDebuggingEnabled(boolean))。


    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        WebView.setWebContentsDebuggingEnabled(true);
    }
    

此设置适用于应用的所有 WebView。

**提示**：WebView 调试**不会**受应用清单中 `debuggable` 标志的状态的影响。如果您希望仅在 `debuggable` 为 `true` 时启用 WebView 调试，请在运行时测试标志。


    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        if (0 != (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE))
        { WebView.setWebContentsDebuggingEnabled(true); }
    }
    

## 在 DevTools 中打开 WebView

**chrome://inspect** 页面将显示您的设备上已启用调试的 WebView 列表。

要开始调试，请点击您想要调试的 WebView 下方的 **inspect**。像使用远程浏览器标签一样使用 DevTools。

![在 WebView 中检查元素](imgs/webview-debugging.png)

与 WebView 一起列示的灰色图形表示 WebView 的大小和相对于设备屏幕的位置。如果您的 WebView 已设置标题，标题也会一起显示。

## 故障排除

在 **chrome://inspect page** 上无法看到您的 WebView？

* 验证已为您的应用启用 WebView 调试。
* 在设备上，打开应用以及您想要调试的 WebView。然后，刷新 **chrome://inspect** 页面。


{# wf_devsite_translation #}
