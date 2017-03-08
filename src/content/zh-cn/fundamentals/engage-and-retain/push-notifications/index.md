project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:推送通知是本机应用最具价值的功能之一，并且此功能现已在网站上提供。要想加以充分利用，通知必须及时、精确并且相关。

{# wf_updated_on:2016-06-30 #}
{# wf_published_on:2016-06-30 #}

# 网络推送通知：及时、相关且精确 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}


<img src="images/cc-good.png" alt="示例通知" class="attempt-right">

如果您询问开发者网络中缺少什么移动设备功能，推送通知始终位居答案前列。


使用网络推送通知，用户可以选择从他们喜欢的网站加入最新更新，您还可以使用自定义的相关内容重新吸引用户。

 

Push API 和 Notification API 为您重新吸引用户打开了一系列全新的可能性。


## 是否涉及服务工作线程？ {: #service-worker-involved }

是的。推送基于服务工作线程，因为服务工作线程在后台操作。
这就是说，针对推送通知运行代码的唯一时间（换言之，使用电池的唯一时间）是用户通过点击或关闭通知来与其进行交互之时。如果您对它们不熟悉，请参阅[服务工作线程简介][service-worker-primer]。
不过，我们将在稍后部分在向您展示如何实现推送和通知时使用服务工作线程代码。



## 两项技术 {: #two-technologies }

推送和通知使用不同但互补的 API：[**推送**](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)是指服务器向服务工作线程提供信息的操作；[**通知**](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)是指服务工作线程或网页脚本向用户显示信息的操作。






## 通知初步详解 {: #anatomy }

在下文中，我们将扔给您一堆图片，但我们承诺会提供代码。
以下就是这段代码。代码内容是，通过服务工作线程注册对注册对象调用 `showNotification`。



    serviceWorkerRegistration.showNotification(title, options);
    

`title` 参数在通知中以标题形式出现。`options` 参数是一个用于设置其他通知属性的对象字面量。典型的 options 对象类似于如下：




    {
      "body":"Did you make a $1,000,000 purchase at Dr. Evil...",
      "icon": "images/ccard.png",
      "vibrate": [200, 100, 200, 100, 200, 100, 400],
      "tag": "request",
      "actions": [
        { "action": "yes", "title": "Yes", "icon": "images/yes.png" },
        { "action": "no", "title": "No", "icon": "images/no.png" }
      ]
    }
    
<img src="images/cc-good.png" alt="Example Notification" class="attempt-right">

此代码会生成一个类似于图片中的通知。它通常与本机应用的功能相同。
在深入了解实现这些功能的详细信息之前，我会为您介绍如何高效地使用这些功能。我们将继续介绍推送通知的实现技术，包括处理权限和订阅、发送消息以及响应消息。



## 如何试用？

在您完全理解这些功能如何运作或实现它们之前，有几种方法可以体验这些功能。首先，请参阅[我们的示例](https://github.com/GoogleChrome/samples/tree/gh-pages/push-messaging-and-notifications)。还可以利用 Peter Beverloo 的[通知生成器](https://tests.peter.sh/notification-generator/)和 Chris Mills 的 [push-api-demo](https://github.com/chrisdavidmills/push-api-demo)。

注：除非您使用本地主机，否则 Push API 将要求采用 HTTPS。

<<../../../_common-links.md>>


{# wf_devsite_translation #}
