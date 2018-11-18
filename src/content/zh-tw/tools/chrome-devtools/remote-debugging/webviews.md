project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Chrome 開發者工具在您的原生 Android 應用中調試 WebView。

{# wf_updated_on:2015-07-29 #}
{# wf_published_on:2015-04-13 #}

# 遠程調試 WebView {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

使用 Chrome 開發者工具在您的原生 Android 應用中調試 WebView。

在 Android 4.4 (KitKat) 或更高版本中，使用 DevTools 可以在原生 Android 應用中調試 WebView 內容。



### TL;DR {: .hide-from-toc }
- 在您的原生 Android 應用中啓用 WebView 調試；在 Chrome DevTools 中調試 WebView。
- 通過 <strong>chrome://inspect</strong> 訪問已啓用調試的 WebView 列表。
- 調試 WebView 與通過<a href='/web/tools/chrome-devtools/debug/remote-debugging'>遠程調試</a>調試網頁相同。


## 配置 WebViews 進行調試

必須從您的應用中啓用 WebView 調試。要啓用 WebView 調試，請在 WebView 類上調用靜態方法 [setWebContentsDebuggingEnabled](https://developer.android.com/reference/android/webkit/WebView.html#setWebContentsDebuggingEnabled(boolean))。


    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        WebView.setWebContentsDebuggingEnabled(true);
    }
    

此設置適用於應用的所有 WebView。

**提示**：WebView 調試**不會**受應用清單中 `debuggable` 標誌的狀態的影響。如果您希望僅在 `debuggable` 爲 `true` 時啓用 WebView 調試，請在運行時測試標誌。


    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        if (0 != (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE))
        { WebView.setWebContentsDebuggingEnabled(true); }
    }
    

## 在 DevTools 中打開 WebView

**chrome://inspect** 頁面將顯示您的設備上已啓用調試的 WebView 列表。

要開始調試，請點擊您想要調試的 WebView 下方的 **inspect**。像使用遠程瀏覽器標籤一樣使用 DevTools。

![在 WebView 中檢查元素](imgs/webview-debugging.png)

與 WebView 一起列示的灰色圖形表示 WebView 的大小和相對於設備屏幕的位置。如果您的 WebView 已設置標題，標題也會一起顯示。

## 故障排除

在 **chrome://inspect page** 上無法看到您的 WebView？

* 驗證已爲您的應用啓用 WebView 調試。
* 在設備上，打開應用以及您想要調試的 WebView。然後，刷新 **chrome://inspect** 頁面。


{# wf_devsite_translation #}
