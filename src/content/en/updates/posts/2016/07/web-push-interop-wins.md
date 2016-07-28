---
layout: updates/post
title: "Web Push Interoperability Wins"
description: "Web push has had a few updates in recent versions of Chrome. GCM now supports the web push protocol and if you use VAPID you won't need to sign up for a Google Developer Project and you'll be given an FCM endpoint."
published_on: 2016-07-28
updated_on: 2016-07-28
authors:
  - mattgaunt
  - josephmedley
tags:
  - web
  - push
  - notifications
featured_image: /web/updates/images/2016/07/web-push-interop-wins/featured-image.png
---

When Chrome first supported the Web Push API, it relied on the non-standard
Google Cloud Messaging (GCM) sender ID and it's protocol. Although it was
proprietary it allowed the  Web Push API to be made available to developers at a
time when the Web Push Protocol spec was still being written and later provided
authentication (meaning the message sender is who they say they are) at a time
when the Web Push Protocol lacked it. Good news: neither of these are true
anymore.

GCM and Chrome now support the standard [Web Push
Protocol](https://tools.ietf.org/html/draft-ietf-webpush-protocol), while sender
authentication can be achieved by implementing
[VAPID](https://tools.ietf.org/html/draft-thomson-webpush-vapid-02), meaning
your web app no longer needs a gcm_sender_id.

In this article, I'm going to first describe how to convert your existing server
code to use the Web Push Protocol with GCM. Next, I'll show you how to implement
VAPID in both your client and server code.

## GCM Supports Web Push Protocol

Let's start with a little context. When your web application registers for a
push subscription it's  given the URL of a push service. Your server will use
this endpoint to send data to your user via your web app. In Chrome you'll be
given a GCM endpoint if you subscribe a user without VAPID. (We'll cover VAPID
later). Before GCM supported Web Push Protocol you had to extract the GCM
registration ID from the end of the URL and and put it in the header before
making  a GCM API request. For example, a GCM endpoint of
`https://android.googleapis.com/gcm/send/ABCD1234`, would have a registration
ID of 'ABCD1234'.

Now that GCM supports Web Push Protocol you can leave the endpoint intact and
use the URL as a Web Push Protocol endpoint. (This brings it in line with
Firefox and hopefully every other future browser.)

Before we dive into VAPID, we need to make sure our server code correctly
handles the GCM endpoint. Below is an example of making a request to a push
service in Node. Notice that for GCM we're adding the API key to the request
headers. For other push service endpoints this won't be needed. For Chrome prior
to version 52, Opera Android and the Samsung Browser, you're also still required
to include a gcm_sender_id in your web app's manifest.json. The API key and
gcm_sender_id are used to check whether the server making the requests is
actually allowed to send messages to the receiving user.

{% highlight JS %}
const headers = new Headers();  
// 12-hour notification time to live.  
headers.append('TTL', 12 * 60 * 60);  
// Assuming no data is going to be sent  
headers.append(Content-Length, 0);

// Assuming you're not using VAPID (read on), this
// proprietary header is needed  
if(subscription.endpoint
  .indexOf('https://android.googleapits.com/gcm/send/') === 0) {  
  headers.append('Authorization', 'GCM_API_KEY');  
}

fetch(subscription.endpoint, {  
  method: 'POST',  
  headers: headers  
})  
.then(response => {  
  if (response.status !== 201) {  
    throw new Error('Unable to send push message'');  
  }  
});
{% endhighlight %}

Remember, this is a change to GCM's API, so you don't need to update your
subscriptions, just change your server code to define the headers as shown
above.

# Introducing VAPID for Server Identification

VAPID is the cool new short name for
"[Voluntary Application Server
Identification](https://tools.ietf.org/html/draft-thomson-webpush-vapid)". This
new spec essentially defines a handshake between your app server and the push
service and allows the push service to confirm which site is sending messages.
With VAPID you can avoid the GCM-specific steps for sending a push message. You
no longer need a Google Developer project, a `gcm_sender_id`, or an
`Authorization` header.

The process is pretty simple:

1. Your application server creates a public/private key pair. The public key is
   given to your web app.
1. When the user elects to receive pushes, add the public key to the subscribe()
   call's options object.
1. When your app server sends a push message, include a signed JSON Web Token
   along with the public key.

Let's look at these steps in detail.

## Create a Public/Private Key Pair

I'm terrible at encryption, so here's the relevant section from the spec
regarding the format of the VAPID public/private keys:

> Application servers SHOULD generate and maintain a signing
> key pair usable with elliptic curve digital signature (ECDSA)
> over the P-256 curve.

You can see how to do this in the [web-push node
library](https://github.com/web-push-libs/web-push/):

{% highlight JS %}
function generateVAPIDKeys() {  
  var curve = crypto.createECDH('prime256v1');  
  curve.generateKeys();

  return {  
    publicKey: curve.getPublicKey(),  
    privateKey: curve.getPrivateKey(),  
  };  
}
{% endhighlight %}

## Subscribing with the Public Key

To subscribe a Chrome user for push with the VAPID public key, you need to pass
the public key as a Uint8Array using the `applicationServerKey` parameter of
the subscribe() method.

{% highlight JS %}
const publicKey = new Uint8Array([0x4, 0x37, 0x77, 0xfe, …. ]);  
serviceWorkerRegistration.pushManager.subscribe(  
  {  
    userVisibleOnly: true,  
    applicationServerKey: publicKey  
  }  
);
{% endhighlight %}

You'll know if it has worked by examining the endpoint in the resulting
subscription object, if the origin is `fcm.googleapis.com`, it's working.

    https://fcm.googleapis.com/fcm/send/ABCD1234

**Note: Even though this is an FCM URL, use the [Web Push
Protocol](https://tools.ietf.org/html/draft-ietf-webpush-protocol-06)
not** the FCM protocol, this way your server side code will work for any
push service.

## Sending a Push Message

To send a message using VAPID, you need to make a normal Web Push Protocol
request with two additional HTTP headers: an Authorization header and a
Crypto-Key header.

### Authorization Header

The `Authorization` header is a signed [JSON Web Token
(JWT)](https://jwt.io/) with 'Bearer ' in front of it, to indicate
that the JWT is a bearer token.

A JWT is a way of sharing a JSON object with a second party in such a way that
the sending party can sign it and the receiving party can verify the signature
is from the expected sender. The structure of a JWT is three encrypted strings,
joined with a single dot between them.

    <JWTHeader>.<Payload>.<Signature>

### **JWT Header**

The JWT Header contains the algorithm name used for signing and the type of
token. For VAPID this must be:

    {  
      "typ": "JWT",  
      "alg": "ES256"  
    }  

This is then base64 url encoded and forms the first part of the JWT.

### **Payload**

The Payload is another JSON object containing the following:

* Audience ("aud")
    * This is the origin of the push service (**NOT **the origin of your site).
      In JavaScript, you could do the following to get the audience: `const
      audience = new URL(subscription.endpoint).origin`
* Expiration Time ("exp")
    * This is the number of seconds until the request should be regarded as
      expired. This **MUST** be within 24 hours of the request being made, in
      UTC.
* Subject ("sub")
    * The subject needs to be a URL or a `mailto:` URL. This provides a point
      of contact in case the push service needs to contact the message sender.

An example payload could look like the following:  

    {  
        "aud":
"http://push-service.example.com",  
        "exp": Math.floor((Date.now() / 1000) + (12 * 60 * 60)),  
        "sub": "mailto: my-email@some-url.com"  
    }  

This JSON object is base64 url encoded and forms the second part of the JWT.

### **Signature**

The Signature is the result of joining the encoded header and payload with a
dot then encrypting the result using the VAPID private key you created earlier.
The result itself should be appended to the header with a dot.

I'm not going to show a code sample for this as there are a [number of
libraries](https://jwt.io/#libraries-io) that will take the header and payload
JSON objects and generate this signature for you.

The signed JWT is used as the Authorization header with 'Bearer ' prepended to
it and will look something like the following:

    Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL2ZjbS5nb29nbGVhcGlzLmNvbSIsImV4cCI6MTQ2NjY2ODU5NCwic3ViIjoibWFpbHRvOnNpbXBsZS1wdXNoLWRlbW9AZ2F1bnRmYWNlLmNvLnVrIn0.Ec0VR8dtf5qb8Fb5Wk91br-evfho9sZT6jBRuQwxVMFyK5S8bhOjk8kuxvilLqTBmDXJM5l3uVrVOQirSsjq0A

Notice a few things about this. First, the Authorization header literally
contains the word 'Bearer' and should be followed by a space then the JWT. Also
notice the dots separating the JWT header, payload, and signature.

### Crypto-Key Header

As well as the Authorization header, you must add your VAPID public key to the
`Crypto-Key` header as a base64 url encoded string with `p256ecdsa=`
prepended to it.  

    p256ecdsa=BDd3_hVL9fZi9Ybo2UUzA284WG5FZR30_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6_LFTeZaNndIo

**When** you are sending a notification with encrypted data, you will
already be using the `Crypto-Key` header, so to add the application server
key, you just need to add a semicolon before adding the above content, resulting
in:  

**dh=**BGEw2wsHgLwzerjvnMTkbKrFRxdmwJ5S_k7zi7A1coR_sVjHmGrlvzYpAT1n4NPbioFlQkIrTNL8EH4V3ZZ4vJE**;**
**p256ecdsa=**BDd3_hVL9fZi9Ybo2UUzA284WG5FZR30_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6_LFTeZaN

**NOTE:** The separating semicolon should actually be a comma but there is a bug
in Chrome prior to version 52 which prevents push from working if a comma is
sent. This is fixed in Chrome version 53, so you should be able to change to a
comma once this hits stable.

# Reality of these Changes

With VAPID you no longer need to sign up for an account with GCM to use push in
Chrome and you can use the same code path for subscribing a user and sending a
message to a user in both Chrome and Firefox. Both are following the standards.

What you need to bear in mind is that in Chrome version 51 and before, Opera for
Android and Samsung browser you'll still need to define the `gcm_sender_id`
in your web app manifest and you'll need to add the Authorization header to the
GCM endpoint that will be returned.

VAPID provides an off ramp from these proprietary requirements. If you implement
VAPID it'll work in all browsers that support web push.  As more browsers
support VAPID you can decide when to drop the `gcm_sender_id` from your
manifest.
