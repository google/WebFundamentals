---
layout: shared/narrow
title: "Preparing messages"
description: ""
published_on: 2016-07-29
updated_on: 2016-07-29
order: 25
translation_priority: 0
authors:
  - josephmedley
---

<p class="intro"> </p>

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
a registration ID. This tells your server how to identify you the messaging
server.

_keys_—Encryption keys used for encrypting data passed to the service worker
messages.

## Constructiong the Authorization header {#authorization-header}

The Authorization header consists of four parts.

`Bearer <JWTHeader>.<Payload>.<Signature>`

The word `Bearer` is a litteral that must be followed by a space. The remaining portions are encrypted and concatenated using a period. Let's look at each in detail.

### JWT Header {#jwtheader}

The JWT Header contains two standard pieces of information: a `typ` property to indicate that this is a JWT message, and an `alg` header to indicate the algorithm used for encrypting the rest of the message. For VAPID, the later must be base64 url encoded.

{% highlight json %}
{
	typ: "JWT",
	alg: "ES256"
}
{% endhighlight %}

### Payload {#payload}

The payload is another JSON object with the following members:

**`aud`**

This contains the push service endpoint, which you should extract from the subscription object. This is **not** the origin of your site.

**`exp`**

Specifies the time the request expires in miliseconds. It must be within twenty-four hours. This can be calculated by converting the current date to milliseconds and adding the duration. For example, in Node.js you could do this:

Math.floor((Date.now() / 1000) + 12 * 60 * 60)

**`sub`**

Specifices a subject, which the VAPID spec defines as a way for the push service to contact a message sender. This can be a URL or a mail to URL.

{% highlight json %}
{
	“aud”: "http://push-service.example.com",
	“exp”: 1469618703,
	“sub”: “mailto: my-email@some-url.com”
}
{% endhighlight %}

### Signature {#signature}

`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL2ZjbS5nb29nbGVhcGlzLmNvbSIsImV4cCI6MTQ2NjY2ODU5NCwic3ViIjoibWFpbHRvOnNpbXBsZS1wdXNoLWRlbW9AZ2F1bnRmYWNlLmNvLnVrIn0.Ec0VR8dtf5qb8Fb5Wk91br-evfho9sZT6jBRuQwxVMFyK5S8bhOjk8kuxvilLqTBmDXJM5l3uVrVOQirSsjq0A`

## Encrypting a message {#encrypting}

You must encrypt all messages before sending them. Encryption is enough of a
specialty, even within software development, that we don't recommend writing
your own encryption system. Fortunately, there are [a range of push
libraries](https://github.com/web-push-libs) including our own [Push Encryption
Library](https://github.com/GoogleChrome/web-push-encryption).