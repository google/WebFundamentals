project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Two servers are involved in sending a message: your server and a third-party messaging server. You keep track of who to send messages to. The third-party server handles the routing.


{# wf_updated_on: 2016-06-30 #}
{# wf_published_on: 2016-06-30 #}

# Sending Messages {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

It's easy to assume that sending messages involves building a complex messaging system on the server. That's not quite right. There are actually two servers involved in sending a message: your server and a third-party messaging server. You keep track of two things: recipients and recipient-specific endpoints on the messaging server. The messaging server handles the routing. 


## Anatomy of a subscription object {: #subscription-anatomy }

In [the last section](permissions-subscriptions#passing-subscription) we said
that a subscription object must be stringified and passed to the server. The
data that the server receives looks like this:


    {
      "endpoint": "https://example.com/push-service/send/dbDqU8xX10w:APA91b...",
      "keys": {
        "auth": "qLAYRzG9TnUwbprns6H2Ew==",
        "p256dh": "BILXd-c1-zuEQYXH\_tc3qmLq52cggfqqTr\_ZclwqYl6A7-RX2J0NG3icsw..."
      }
    }
    

What's in this?

**endpoint**—Contains two parts: the URL of the messaging service you're using
followed by a unique identifier for the user. This is called a subscription ID or
a registration ID. This tells your server how to identify the messaging
server.

**keys**—Encryption keys that encrypt the data that is passed to the service worker
messages.

## Encrypting a message {: #encrypting }

You must encrypt all messages before sending them. Encryption is enough of a
specialty, even within software development, that we don't recommend writing
your own encryption system. Fortunately, there are [a range of push
libraries](https://github.com/web-push-libs) including our own [Push Encryption
Library](https://github.com/GoogleChrome/web-push-encryption).

## Two ways to send a push message {: #ways-to-send }

When implementing server code, there are two methods of sending messages:

* Messages with a data payload.
* Messages without a data payload; this kind of message is often called a tickle.

In the case of a tickle, the service worker uses the message as a signal to
fetch data from an endpoint. The [Handling Messages](handling-messages) section
contains sample code that shows how a service worker does this.

Why would you ever send a message without a payload? There are two reasons.

* You need to send something larger than the 4k payload limit set by the spec.
* The clients needs fresher data than what would be in the push.

Technically, there's another reason which is that browser capabilities may vary
for a while yet, but the two main reasons will likely always apply. If the
browser doesn't support payloads, the subscription object won't contain keys.

## Sending messages {: #sending-messages }

To send a push to a client, send a PUT request to the push service endpoint.

    POST /push-service/send/dbDqU8xX10w:APA91b... HTTP/1.1
    HOST: example.com
    TTL: 120
    Content-Type: application/octet-stream
    Content-Encoding: aesgcm128
    Encryption: keyid=p256dh;salt=xxxxxxx
    Crypto-Key: keyid=p256dh;dh=xxxxxxxx

    BIXzEKOFquzVlr/1tS1bhmobZ...

`TTL` is the time in seconds before the message expires. This means that the
server spends the specified number of seconds trying to send the message to
the recipient. For example, let's say TTL is 60 seconds, but the recipient's
phone is in airplane mode. If the recipient's phone comes out of airplane mode
during those 60 seconds, the message is sent. Otherwise the message is dropped.
