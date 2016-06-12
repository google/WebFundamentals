---
title: "從命令行發送GCM請求以發送推送通知"
description: "Chrome的推送通知是使用谷歌雲端推送(GCM)。為了讓GCM發送推送通知到你的Web客戶端, 你可以從命令行發送GCM請求。"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-15
translators:
 - henrylim
---

{% include shared/toc.liquid %}
在上個步驟，我們說到Chrome的推送通知是使用谷歌雲端推送(GCM).

為了讓GCM發送推送通知到Web客戶端，你需要發送一個GCM請求。請求的內容包括:

* 在前個步驟創建的 **public API key** 這看起來像下面這樣:<br>
  <br>
  _AIzaSyAc2e8MeZHA5NfhPANea01wnyeQD7uVY0c_<br>
  <br>
  GCM將匹配這與你從Google Developer Console裏獲取到的Project Number。
  這將會和manifest裏的`gcm_sender_id`一起使用。

* 一個適當的 **Content-Type header**, 例如 `application/json`.

* 一個 **subscription IDs** 的數組。每個數組中的值就是代表每個客戶端應用程序,
  也就是訂閱 endpoint URL的最後一部分:<br>
  <br>
  _APA91bHMaA-R0eZrPisZCGfwwd7z1EzL7P7Q7cyocVkxBU3nXWed1cQYCYvF
  glMHIJ40kn-jZENQ62UFgg5QnEcqwB5dFZ-AmNZjATO8QObGp0p1S6Rq2tcCu
  UibjnyaS0UF1gIM1mPeM25MdZdNVLG3dM6ZSfxV8itpihroEN5ANj9A26RU2Uw_

至於已經發布或待發布的網頁或web應用程序，你應該在服務器設置GCM，並從服務器發送GCM請求。
(代碼樣本請見 [Push Notifications on the Open Web](/web/updates/2015/03/push-notifications-on-the-open-web).) 但是在這個codelab,你可以使用命令提示符來發送GCM請求。

你可以使用cURL實用程來發送GCM請求。

如果你沒用過cURL, 以下的網站可能對你有幫助:

* [Getting Started guide](http://ethanmick.com/getting-started-with-curl)
* [Reference documentation](http://curl.haxx.se/docs/manpage.html)

你需要像以下的cURL命令以發送GCM請求:
_curl --header "Authorization: key=**&lt;PUBLIC\_API\_KEY&gt;**" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration\_ids\":[\"**&lt;SUBSCRIPTION\_ID&gt;**\"]}"_

 讓我們開始吧!

## 1. 對GCM發出請求

在你的命令提示符, 運行以下的cURL命令 - 但確保你使用你在前個步驟獲取的API key和訂閱ID:

{% highlight bash %}
curl --header "Authorization: key=XXXXXXXXXXXX" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"fs...Tw:APA...SzXha\"]}"
{% endhighlight %}

## 2. 檢查響應

如果沒有問題，你將會在你的命令提示符看到以下的情況:

<img src="images/image16.png" width="890" height="551" alt="BASH terminal screenshot: successful response to cURL request to GCM to send a push message" />

如果出現授權錯誤，確保你的授權號是對的。如果響應出現註冊無效的錯誤，確保你的訂閱ID是對的。

## 3. 檢查診斷

看一下 _chrome://serviceworker-internals_. 你應該看到一樣或類是的情況:

<img src="images/image17.png" width="1547" height="492" alt="Chrome DevTools screenshot:  Push message received" />

開啟你的Chrome Canary和Chrome，然後嘗試向GCM請求推送通知。

確保你把每個訂閱ID放上引號。

## 4. 嘗試改變窗口焦點

嘗試關閉或改變你的應用程序的遊覽器的窗口焦點。你應該會看到像這樣的推送通知:

<img src="images/image18.png" width="373" height="109" alt="Push notification screenshot: 'This site has been updated in the background'" />

**重要**: 每個客戶端都會有不一樣的訂閱ID. 當你在向GCM發送請求時，確保你全部要接受推送通知的用戶的訂閱ID包括在內！
 當你在建構這codelab的代碼時，這codelab每個步驟的訂閱ID都會不一樣。
