---
layout: shared/narrow
title: "Send a request from the command line for GCM to push a message"
description: "Chrome uses Google Cloud Messaging (GCM) for push
messaging. To get GCM to push a notification to your web client, you can send GCM a request from the command line."
notes:
  styling:
    - Styling will come later
published_on: 2015-09-28
updated_on: 2015-09-28
translation_priority: 1
order: 7
authors:
  - samdutton
---

{% include shared/toc.liquid %}

As you saw earlier, Chrome uses Google Cloud Messaging (GCM) for push
messaging.

To get GCM to push a notification to your web client, you need to send GCM a
request that includes the following:

* The **public API key** that you created earlier, which looks like this:<br>
  <br>
  _AIzaSyAc2e8MeZHA5NfhPANea01wnyeQD7uVY0c_<br>
  <br>
  GCM will match this with the Project Number you got from the Google Developer
  Console to use as the `gcm_sender_id` value in the manifest.

* An appropriate **Content-Type header**, such as `application/json`.

* An array of **subscription IDs**, each of which corresponds to an individual
  client app. That's the last part of the subscription endpoint URL, and looks
  like this: <br>
  <br>
  _APA91bHMaA-R0eZrPisZCGfwwd7z1EzL7P7Q7cyocVkxBU3nXWed1cQYCYvF
  glMHIJ40kn-jZENQ62UFgg5QnEcqwB5dFZ-AmNZjATO8QObGp0p1S6Rq2tcCu
  UibjnyaS0UF1gIM1mPeM25MdZdNVLG3dM6ZSfxV8itpihroEN5ANj9A26RU2Uw_

For a production site or app, you would normally set up a service to interact
with GCM from your server. (There is some sample code for doing just that in
[Push Notifications on the Open
Web](/web/updates/2015/03/push-notifications-on-the-open-web).) For this codelab, you can send requests from your terminal or from an app running in the browser.

You can send a request to GCM using the cURL utility.

If you haven't used cURL before, you may find the following helpful:

* [Getting Started guide](http://ethanmick.com/getting-started-with-curl)
* [Reference documentation](http://curl.haxx.se/docs/manpage.html)

The cURL command to send a request to GCM to issue a push message looks like
this:
_curl --header "Authorization: key=**&lt;PUBLIC\_API\_KEY&gt;**" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration\_ids\":[\"**&lt;SUBSCRIPTION\_ID&gt;**\"]}"_

 Let's see that in action...

## 1. Make a request to GCM

From your terminal, run the cURL command below — but make sure to use your
own API key and subscription ID, which you created earlier:

{% highlight bash %}
curl --header "Authorization: key=XXXXXXXXXXXX" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"fs...Tw:APA...SzXha\"]}"
{% endhighlight %}

## 2. Check the response

If it all worked out, you will see a response like this in your terminal:

<img src="images/image16.png" width="890" height="551" alt="BASH terminal screenshot: successful response to cURL request to GCM to send a push message" />

If there are authorization errors, check the Authorization key value. If the response shows an invalid registration error, check the subscription ID you used.

## 3. Check diagnostics

Take a look at _chrome://serviceworker-internals_. You should see something
like this:

<img src="images/image17.png" width="1547" height="492" alt="Chrome DevTools screenshot:  Push message received" />

Try requesting a notification for two different endpoints by opening your app in Chrome Canary as well as Chrome.

Make sure to put escaped quotes around each subscription ID.

## 4. Try changing window focus

Try closing or moving focus away from the browser tab that's running your
app. You should see a notification like this:

<img src="images/image18.png" width="373" height="109" alt="Push notification screenshot: 'This site has been updated in the background'" />

**Important**: Each client that subscribes to push messaging will have its own subscription ID. If you're sending requests to GCM for notifications, remember to include subscription IDs for all the clients you want to send messages to! If you build each step of this codelab separately, each step will represent a different endpoint and therefore have a different subscription ID.
