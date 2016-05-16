---
title: "添加manifest檔案"
description: "添加manifest檔案以提供推送通知的配置"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-15
translators:
 - henrylim
---

{% include shared/toc.liquid %}

你可以在completed/step5目錄找到這步驟的完整代碼。

Manifest是個JSON檔案，它提供Web app各種的資訊，包括了推送通知的配置。

## 1. 創建一個Manifest檔案

在 _app_ 目錄裏，創建一個名為 _manifest.json_ 的文件。

添加以下的代碼至 _manifest.json_ 。在 _gcm\_sender\_id_ 填入你在上個步驟獲取的Project Number:

{% highlight json %}
{
  "name": "Push Notifications codelab",
  "gcm_sender_id": "593836075156"
}
{% endhighlight %}

除此之外, web manifests也帶來許多其他的功能，包括了設置App圖示以及添加至主屏幕。

更多關於Web Manifest的資料，請見網頁基礎的文章[Installable Web Apps](/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android).

## 2. 告訴遊覽器你的web app的manifest的路徑

將以下的代碼添加進 _index.html_ 裏的head標題：

{% highlight html %}
<link rel="manifest" href="manifest.json">
{% endhighlight %}
