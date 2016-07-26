---
layout: shared/narrow
title: "Sending messages"
description: "There are two servers involved in sending a message: your server and a third party messaging server. You keep track of who to send messages to. The third party server handles the routing."
published_on: 2016-07-01
updated_on: 2016-07-29
order: 30
translation_priority: 0
authors:
  - josephmedley
---

<p class="intro">
It's easy to assume that sending messages must involve
building a complex messaging system on the server. That's not quite right. There
are actually two servers involved in sending a message: your server and a third
party messaging server. You keep track of two things: recipients and recipient-
specific endpoints on the messaging server. The messaging server handles the
routing. 
</p>

{% include shared/toc.liquid %}

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

<pre>POST /push-service/send/dbDqU8xX10w:APA91b... HTTP/1.1
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
