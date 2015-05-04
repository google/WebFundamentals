---
rss: false
layout: article
title: "Access WebView Content in Your Development Workspace"
seotitle: "Access WebView Content in Native Android App in Your Development Workspace"
description: "Debug WebViews in your native Android apps using Chrome Developer Tools."
introduction: "Debug WebViews in your native Android apps using Chrome Developer Tools."
authors:
  - megginkearney
article:
  written_on: 2015-04-14
  updated_on: 2015-04-22
  order: 3
collection: device-testing
key-takeaways:
  webview: 
    - Debug WebViews in native Android apps.
---
{% wrap content%}

On Android 4.4 (KitKat) or later, you can use DevTools to debug WebView content in native Android applications.

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.webview %}

## Configure WebViews for debugging

WebView debugging must be enabled from within your application. To enable WebView debugging, call the static method [setWebContentsDebuggingEnabled](http://developer.android.com/reference/android/webkit/WebView.html#setWebContentsDebuggingEnabled(boolean)) on the WebView class.

`if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
    WebView.setWebContentsDebuggingEnabled(true);
}`

This setting applies to all of the application's WebViews.

**Tip**: WebView debugging is **not** affected by the state of the `debuggable` flag in the application's manifest. If you want to enable WebView debugging only when `debuggable` is `true`, test the flag at runtime.

`if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
    if (0 != (getApplicationInfo().flags &= ApplicationInfo.FLAG_DEBUGGABLE))
    { WebView.setWebContentsDebuggingEnabled(true); }
}`

## Open a WebView in DevTools

The **chrome://inspect** page displays a list of debug-enabled WebViews on your device.

To start debugging, click **inspect** below the WebView you want to debug. Use DevTools as you would for a [remote browser tab](#debugging-tabs).

![Inspecting elements in a WebView](imgs/webview-debugging.png)

The gray graphics listed with the WebView represent its size and position relative to the device's screen. If your WebViews have titles set, the titles are listed as well.

## Troubleshooting 

Can't see your WebViews on the **chrome://inspect page**?

* Verify that WebView debugging is [enabled](#debugging-webviews) for your app.
* On your device, open the app with the WebView you want to debug. Then, refresh the **chrome://inspect** page.

{% include modules/nextarticle.liquid %}

{% endwrap %}
