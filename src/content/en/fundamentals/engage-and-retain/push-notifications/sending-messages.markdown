---
layout: shared/narrow
title: "Sending messages"
description: "There are two servers involved in sending a message: your server and a third party messaging server. You keep track of who to send messages to. The third party server handles the routing."
published_on: 2016-07-01
updated_on: 2016-07-01
order: 30
translation_priority: 0
authors:
  - josephmedley
---

<p class="intro"> It's easy to assume that sending messages must involve
building a complex messaging system on the server. That's not quite right. There
are actually two servers involved in sending a message: your server and a third
party messaging server. You keep track of two things: recipients and recipient-
specific endpoints on the messaging server. The messaging server handles the
routing. </p>

{% include shared/toc.liquid %}

## Anatomy of a subscription object {#subscription-anatomy}

In [the last section](permissions-subscriptions#passing-subscription) we said that a subscription object must be stringified and
passed to the server. The data the server gets looks like this:

{% highlight json %}
{
  "endpoint": "https://example.com/push-service/send/dbDqU8xX10w:APA91b...",
  "keys": {
    "auth": "qLAYRzG9TnUwbprns6H2Ew==",
    "p256dh": "BILXd-c1-zuEQYXH\_tc3qmLq52cggfqqTr\_ZclwqYl6A7-RX2J0NG3icsw..."
  }
}
{% endhighlight %}

What's in this?

_endpoint_—Contains two parts: the URL of the messaging service you're using
followed by unique identifier for the user. This is called a subscription ID or
a registration ID.

_keys_—Encryption keys used for encrypting data passed to the service worker
messages.

## Encrypting a message {#encrypting}

You must encrypt all messages before sending them. Encryption is enough of a
specialty, even within software development, that we don't recommend writing
your own encryption system. Fortunately, there are [a range of push
libraries](https://github.com/web-push-libs) including our own [Push Encryption
Library](https://github.com/GoogleChrome/web-push-encryption).

## Two ways to send a push message {#ways-to-send}

When implementing server code there are two methods of sending messages to
consider.

* Messages with a data payload.
* Messages without a data payload, often called a tickle.

In the case of the tickle, the service worker uses the message as a signal to
fetch data from an endpoint. The [Handling Messages](handling-messages) section
contains sample code for showing how a service worker does this.

Why would you ever send a message without a payload? There are two reasons.

* You need to send something larger than the 4k payload limit set by the spec
* The clients needs fresher data than what would be in the push.

Technically, there's another reason which is that browser capabilities may vary
for a while yet, but the two main reasons will likely always apply. If the
browser doesn't support payloads, the subscription object won't contain keys.

## Sending messages {#sending-messages}

To send a push to a client, send a PUT request to the push service endpoint.

<pre>PUT /push-service/send/dbDqU8xX10w:APA91b... HTTP/1.1
HOST: example.com
TTL: 120
Content-Type: application/octet-stream
Content-Encoding: aesgcm128
Encryption: keyid=p256dh;salt=xxxxxxx
Crypto-Key: keyid=p256dh;dh=xxxxxxxx

BIXzEKOFquzVlr/1tS1bhmobZ...</pre>

TTL is the time in seconds before the message expires. This means that the
server will spend the specified number of seconds trying to send the message to
the recipient. For example, let's say TTL is 60 seconds, but the recipient's
phone is in airplane mode. If the recipient's phone comes out of airplane mode
during those 60 seconds, the message is sent. Otherwise the message will be
dropped.
