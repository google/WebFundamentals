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
translation_priority: 0
authors:
  - samdutton
---

{% include shared/toc.liquid %}

As you saw in Step 2, Chrome uses Google Cloud Messaging (GCM) for push
messaging.

To get GCM to push a notification to your web client, you need to send GCM a
request that includes the following:

* The **public API key** that you created in Step 2, which looks like this:<br>
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
  _APA91bHMaA-R0eZrPisZCGfwwd7z1EzL7P7Q7cyocVkxBU3nXWed1cQYCYvFglMHIJ40kn-jZENQ62UFgg5QnEcqwB5dFZ-AmNZjATO8QObGp0p1S6Rq2tcCuUibjnyaS0UF1gIM1mPeM25MdZdNVLG3dM6ZSfxV8itpihroEN5ANj9A26RU2Uw_

For a production site or app, you would normally set up a service to interact
with GCM from your server. (There is some sample code for doing just that in
[Push Notifications on the Open
Web](https://developers.google.com/web/updates/2015/03/push-notificatons-on-the-open-web?hl=en).) For this codelab, you can send requests from your terminal or from an app running in the browser.

You can send a request to GCM using the cURL utility.

If you haven't used cURL before, you may find the following helpful:

* [Getting Started guide](http://ethanmick.com/getting-started-with-curl)
* [Reference documentation](http://curl.haxx.se/docs/manpage.html)

The cURL command to send a request to GCM to issue a push message looks like
this:

_curl --header "Authorization: key=**&lt;PUBLIC\_API\_KEY&gt;**" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration\_ids\":[\"**&lt;SUBSCRIPTION\_ID&gt;**\"]}"

 Let's see that in action...

 1. From your terminal, run the cURL command below — but make sure to use your
   own API key from Step 2 and the subscription ID from step 4: <br>
   <br>
   {% highlight bash %}
   curl --header "Authorization: key=AIzaSyAc2e8MeZHA5NfhPANea01wnyeQD7uVY0c" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration\_ids\":[\"APA91bE9DAy6\_p9bZ9I58rixOv-ya6PsNMi9Nh5VfV4lpXGw1wS6kxrkQbowwBu17ryjGO0ExDlp-S-mCiwKc5HmVNbyVfylhgwITXBYsmSszpK0LpCxr9Cc3RgxqZD7614SqDokwsc3vIEXkaT8OPIM-mnGMRYG1-hsarEU4coJWNjdFP16gWs\"]}"
   {% endhighlight %}

2. If it all worked out, you will see a response like this in your terminal:<br>
   <br>
   <img src="images/image16.png" width="890" height="551" alt="BASH terminal screenshot: successful response to cURL request to GCM to send a push message" /><br>
   <br>
   If there are authorisation errors, check the Authorization key value. If the response shows an invalid registration error, check the subscription ID you used.

3. Take a look at _chrome://serviceworker-internals_. You should see something
   like this:<br>
   <br>
   <img src="images/image17.png" width="1547" height="492" alt="Chrome DevTools screenshot:  Push message received" /><br>
   <br>
   (If you want, you can try opening your app in Chrome Canary as well as Chrome and requesting a notification for two different endpoints. Make sure to put escaped quotes around each subscription ID.)

4. Try closing or moving focus away from the browser tab that's running your
   app. You should see a notification like this:<br>
   <br>
   <img src="images/image18.png" width="373" height="109" alt="Push notification screenshot: 'This site has been updated in the background'" />

**Important**: Each client that subscribes to push messaging will have its own subscription ID. If you're sending requests to GCM for notifications, remember to include subscription IDs for all the clients you want to send messages to! If you build each step of this codelab separately, each step will represent a different endpoint and therefore have a different subscription ID.

