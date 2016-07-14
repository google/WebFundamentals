---
title: "添加manifest档案"
description: "添加manifest档案以提供推送通知的配置"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-15
translators:
 - henrylim
---

{% include shared/toc.liquid %}

你可以在completed/step5目录找到这步骤的完整代码。

Manifest是个JSON档案，它提供Web app各种的资讯，包括了推送通知的配置。

## 1. 创建一个Manifest档案

在 _app_ 目录里，创建一个名为 _manifest.json_ 的文件。

添加以下的代码至 _manifest.json_ 。在 _gcm\_sender\_id_ 填入你在上个步骤获取的Project Number:

{% highlight json %}
{
  "name": "Push Notifications codelab",
  "gcm_sender_id": "593836075156"
}
{% endhighlight %}

除此之外, web manifests也带来许多其他的功能，包括了设置App图示以及添加至主屏幕。

更多关于Web Manifest的资料，请见网页基础的文章[Installable Web Apps](/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android).

## 2. 告诉游览器你的web app的manifest的路径

将以下的代码添加进 _index.html_ 里的head标题：

{% highlight html %}
<link rel="manifest" href="manifest.json">
{% endhighlight %}
