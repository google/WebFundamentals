---
title: "从命令行发送GCM请求以发送推送通知"
description: "Chrome的推送通知是使用谷歌云端推送(GCM). 为了让GCM发送推送通知到你的Web客户端, 你可以从命令行发送GCM请求"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-15
translators:
 - henrylim
---

{% include shared/toc.liquid %}
在上个步骤，我们说到Chrome的推送通知是使用谷歌云端推送(GCM).

为了让GCM发送推送通知到Web客户端，你需要发送一个GCM请求。请求的内容包括:

* 在前个步骤创建的 **public API key** 这看起来像下面这样:<br>
  <br>
  _AIzaSyAc2e8MeZHA5NfhPANea01wnyeQD7uVY0c_<br>
  <br>
  GCM将匹配这与你从Google Developer Console里获取到的Project Number。
  这将会和manifest里的`gcm_sender_id`一起使用。

* 一个适当的 **Content-Type header**, 例如 `application/json`.

* 一个 **subscription IDs** 的数组。每个数组中的值就是代表每个客户端应用程序,
  也就是订阅 endpoint URL的最后一部分:<br>
  <br>
  _APA91bHMaA-R0eZrPisZCGfwwd7z1EzL7P7Q7cyocVkxBU3nXWed1cQYCYvF
  glMHIJ40kn-jZENQ62UFgg5QnEcqwB5dFZ-AmNZjATO8QObGp0p1S6Rq2tcCu
  UibjnyaS0UF1gIM1mPeM25MdZdNVLG3dM6ZSfxV8itpihroEN5ANj9A26RU2Uw_

至于已经发布或待发布的网页或web应用程序，你应该在服务器设置GCM，并从服务器发送GCM请求。
(代码样本请见 [Push Notifications on the Open Web](/web/updates/2015/03/push-notifications-on-the-open-web).) 但是在这个codelab,你可以使用命令提示符来发送GCM请求。

你可以使用cURL实用程来发送GCM请求。

如果你没用过cURL, 以下的网站可能对你有帮助:

* [Getting Started guide](http://ethanmick.com/getting-started-with-curl)
* [Reference documentation](http://curl.haxx.se/docs/manpage.html)

你需要像以下的cURL命令以发送GCM请求:
_curl --header "Authorization: key=**&lt;PUBLIC\_API\_KEY&gt;**" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration\_ids\":[\"**&lt;SUBSCRIPTION\_ID&gt;**\"]}"_

 让我们开始吧!

## 1. 对GCM发出请求

在你的命令提示符, 运行以下的cURL命令 - 但确保你使用你在前个步骤获取的API key和订阅ID:

{% highlight bash %}
curl --header "Authorization: key=XXXXXXXXXXXX" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"fs...Tw:APA...SzXha\"]}"
{% endhighlight %}

## 2. 检查响应

如果没有问题，你将会在你的命令提示符看到以下的情况:

<img src="images/image16.png" width="890" height="551" alt="BASH terminal screenshot: successful response to cURL request to GCM to send a push message" />

如果出现授权错误，确保你的授权号是对的。如果响应出现注册无效的错误，确保你的订阅ID是对的。

## 3. 检查诊断

看一下 _chrome://serviceworker-internals_. 你应该看到一样或类是的情况:

<img src="images/image17.png" width="1547" height="492" alt="Chrome DevTools screenshot:  Push message received" />

开启你的Chrome Canary和Chrome，然后尝试向GCM请求推送通知。

确保你把每个订阅ID放上引号。

## 4. 尝试改变窗口焦点

尝试关闭或改变你的应用程序的游览器的窗口焦点。你应该会看到像这样的推送通知:

<img src="images/image18.png" width="373" height="109" alt="Push notification screenshot: 'This site has been updated in the background'" />

**重要**: 每个客户端都会有不一样的订阅ID. 当你在向GCM发送请求时，确保你全部要接受推送通知的用户的订阅ID包括在内！
 当你在建构这codelab的代码时，这codelab每个步骤的订阅ID都会不一样。
