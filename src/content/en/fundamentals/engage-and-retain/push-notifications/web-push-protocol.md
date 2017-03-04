project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-03-03 #}
{# wf_published_on: 2016-06-30 #}

# The Web Push Protocol {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}



We've seen how a library can be used to trigger push messages, but what
exactly are these libraries doing?

Well, it's primarily making a network request, making sure it's the right format and sent the
 right way. The spec that defines this network request is the [Web Push
 Protocol](https://tools.ietf.org/html/draft-ietf-webpush-protocol).

![Diagram of sending a push message from your server to a push
 service.](./images/svgs/server-to-push-service.svg)

This section outlines how the server can identify itself with application
server keys and how the encrypted payload and associated data is sent.

This isn't a pretty side of web push and I'm no expert at encryption, but let's look through
 each piece since it's handy to know what these libraries are doing under the hood.

## Application Server Keys

When we subscribe a user, we pass in an `applicationServerKey`. This key is
passed to the push service and used to check the application that subscribed
the user is also the same application that is trigger push messages.

When we trigger a push message, there are a set of headers that we send that
allows the push service to authenticate the application (This is defined
by the [VAPID spec](https://tools.ietf.org/html/draft-thomson-webpush-vapid)).

What does all this actually mean and what exactly happens? Well these are the steps taken for
 application server authentication:

1. The application signs some information with it's **private application key**.
1. This signed information is sent to the push service as a header in the POST request.
1. The push service uses the stored public key is received from `subscribe()` to check that the
 signed information is signed by the private key relating to the public key. *Remember*: The
 public key is the `applicationServerKey` passed into the subscribe call.
1. If the signed information is valid the push service sends the push
message to the user.

An example of this flow of information is below (Not the legend in the bottom left to indicate
 public and private keys):

![Illustration of how the private application server key is used when sending a
 message.](./images/svgs/application-server-key-send.svg)

The "signed information" added to a header in the request is a JSON Web Token.

### JSON Web Token

A [JSON web token](https://jwt.io/) (or JWT for short) is a way of sending a message to a third
 party such that if the third party has an applications public key, they can validate the
 signature of the JWT using the public key and check that it's from the expected application
 because it has to have been signed by the matching private key.

There are a host of libraries on [https://jwt.io/](https://jwt.io/) that can
do the signing for you and I'd recommend you do that where you can, but let's
look at how we create a signed JWT.

### Web Push and Signed JWT

A signed JWT is just a string, but it can be thought of as three strings joined
by dots.

![A illustration of the strings in a JSON Web
 Token](./images/svgs/authorization-jwt-diagram-header.svg)

The first and second strings (The JWT info and JWT data) are pieces of JSON
that have been base 64 encoded, meaning it's publicly readable.

The first string is information about the JWT itself, indicating what algorithm
was used to create the signature.

The JWT info for web push must be be JSON containing the following information, encoded as a
 URL safe base64 string.

```json
{  
  "typ": "JWT",  
  "alg": "ES256"  
}
```

The second string is the JWT Data. This provides information about the sender of the JWT, who
 it's intended for and how long it's valid.

For web push, the data would look something like this:

```json
{  
  "aud": "https://some-push-service.org",
  "exp": "1469618703",
  "sub": "mailto:example@web-push-book.org"  
}
```

The 'aud' value is the "audience", i.e. who the JWT is for. For web push the
audience is the push service, so we set it to the **origin of the push
service**.

The 'exp' value is the expiration of the JWT, this prevent snoopers from being
able to re-use a JWT if they intercept it. The expiration is a timestamp in
seconds and must be no longer 24 hours.

In the Node.js library the expiration is set to
`Math.floor(Date.now() / 1000) + (12 * 60 * 60)`. It's 12 hours rather than 24 hours to avoid
 any issues with time differences between the sending application and the push service.

Finally, the 'sub' value needs to be either a URL or a "mailto" email address. This is so that
 if a push service needed to reach out to sender, it can find contact info from the JWT. (This
 is why the web-push library needed an email address).

Just like the JWT Info, the JWT Data is encoded as a URL safe base64
string.

The third string, the signature, is the result of taking the first two strings
(the JWT Info and JWT Data), joining them with a dot character, which we'll
call the "unsigned token", and signing it.

The signing process requires encrypting the "unsigned token" using ES256. According to the [JWT
 spec](https://tools.ietf.org/html/rfc7519), ES256 is short for "ECDSA using the P-256 curve
 and the SHA-256 hash algorithm". Using web crypto you can create the signature like so:

    // Utility function for UTF-8 encoding a string to an ArrayBuffer.
    const utf8Encoder = new TextEncoder('utf-8');

    // The unsigned token is the concatenation of the URL-safe base64 encoded
    // header and body.
    const unsignedToken = .....;

    // Sign the |unsignedToken| using ES256 (SHA-256 over ECDSA).
    const key = {
      kty: 'EC',
      crv: 'P-256',
      x: window.uint8ArrayToBase64Url(
        applicationServerKeys.publicKey.subarray(1, 33)),
      y: window.uint8ArrayToBase64Url(
        applicationServerKeys.publicKey.subarray(33, 65)),
      d: window.uint8ArrayToBase64Url(applicationServerKeys.privateKey),
    };

    // Sign the |unsignedToken| with the server's private key to generate
    // the signature.
    return crypto.subtle.importKey('jwk', key, {
      name: 'ECDSA', namedCurve: 'P-256',
    }, true, ['sign'])
    .then((key) => {
      return crypto.subtle.sign({
        name: 'ECDSA',
        hash: {
          name: 'SHA-256',
        },
      }, key, utf8Encoder.encode(unsignedToken));
    })
    .then((signature) => {
      console.log('Signature: ', signature);
    });

For the push service receiving our JWT, they can check the application sending the JWT by using
 the public key to decrypt the signature and make sure the decrypted string is the same as the
 "unsigned token" (i.e. the first two strings in the JWT).

The signed JWT (i.e. all three strings joined by dots), is sent to the web
push service as the *Authorization* header with 'WebPush ' prepended, like so:

    Authorization: 'WebPush <JWT Info>.<JWT Payload>.<Signature>'

The Web Push Protocol also states the public application server key must be
sent in the 'Crypto-Key' header as a URL safe base64 encoded string with
'p256ecdsa=' prepended to it.

    Crypto-Key: p256ecdsa=<URL Safe Base64 Public Application Server Key>

## The Payload Encryption

Next let's look at how we can send a payload with a push message so that our when our web app
 receives a push message, it can access the data it receives.

A common question that arises from any who's used other push services is why does the web push
 payload need to be encrypted? With native apps, push messages can send data as plain text.

Part of the beauty of web push is that because all push services use the same API (the web push
 protocol), developers don't have to care who the push service is. We can make a request in the
 right format and expect a push message to be sent. The downside of this is that developers
 could conceivably send messages to a push service that isn't trustworthy. By encrypting the
 payload, push service can't read the data thats sent, only the browser can decrypt the
 information. This protects the users data.

The encryption of the payload is defined in the [Message Encryption
spec](https://tools.ietf.org/html/draft-ietf-webpush-encryption).

Before we look at the specific steps to encrypt our payload for a PushSubscription, we should
 cover some techniques that'll be used during the encryption process (Massive H/T to Mat Scales
 for his excellent article on push encryption).

### ECDH and HKDF

Both ECDH and HKDF are used throughout the encryption process and offer benefits for the
 purpose of encrypting information.

#### ECDH: Elliptic Curve Diffie-Hellman Key Exchange

Imagine you have two people who want to share information, Alice and Bob. Both
Alice and Bob have their own public and private keys. With ECDH, Alice and Bob
share their public keys with each other. The useful property of ECDH is that
Alice can use her private key and Bob's public key to create secret value 'X'.
Bob can then do the same, taking his private key and Alice's public key to
create the same secret value 'X'.

Now Bob and Alice can use 'X' to encrypt and decrypt messages between them.

ECDH, to the best of my knowledge, defines the properties of curves which allow this "feature"
 of making a shared secret 'X'.

This is a high level explanation of ECDH, if you want to learn more [I recommend checking out
 this video](https://www.youtube.com/watch?v=F3zzNa42-tQ).

In terms of code; most languages / platforms come with libraries to make it
easy to generate these keys.

In node we'd do the following:

    const keyCurve = crypto.createECDH('prime256v1');
    keyCurve.generateKeys();

    const publicKey = keyCurve.getPublicKey();
    const privateKey = keyCurve.getPrivateKey();

#### HKDF: HMAC Based Key Deriviation Function

Wikipedia has a succinct description of [HKDF](https://tools.ietf.org/html/rfc5869):

> HKDF is an HMAC based key derivation function that transforms any weak key
> material into cryptographically strong key material. It can be used, for
> example, to convert Diffie Hellman exchanged shared secrets into key material
> suitable for use in encryption, integrity checking or authentication.
>
> -- [Wikipedia](https://en.wikipedia.org/wiki/HKDF)

Essentially, HKDF will take input that is not particular secure and make it more secure.

The spec defining this encryption requires use of SHA-256 as our hash algorithm
and the resulting keys for HKDF in web push should be no longer than 256 bits
(32 bytes).

In node this could be implemented like so:

    // Simplified HKDF, returning keys up to 32 bytes long
    function hkdf(salt, ikm, info, length) {
      // Extract
      const keyHmac = crypto.createHmac('sha256', salt);
      keyHmac.update(ikm);
      const key = keyHmac.digest();

      // Expand
      const infoHmac = crypto.createHmac('sha256', key);
      infoHmac.update(info);

      // A one byte long buffer containing only 0x01
      const ONE_BUFFER = new Buffer(1).fill(1);
      infoHmac.update(ONE_BUFFER);

      return infoHmac.digest().slice(0, length);
    }

H/T to [Mat Scale's article for this example code](/web/updates/2016/03/web-push-encryption).

This loosely covers [ECDH](https://en.wikipedia.org/wiki/Elliptic_curve_Diffie%E2%80%93Hellman)
 and [HKDF](https://tools.ietf.org/html/rfc5869).

ECDH a secure way to share public keys and generate a shared secret. HKDF is a way to take
 insecure material and make it secure.

This will be used during the encryption of our payload, so next let's look at what we take as
 input and how that's encrypted.

### Inputs

When we want to send a push message to a user with a payload, there are three inputs we need:

1. The payload itself.
1. The 'auth' secret from the PushSubscription.
1. The 'p256dh' key from the PushSubscription.

We've seen the auth and p256dh values being retreieved from a `PushSubscription` but for a
 quick reminder, given a subscription we'd need these values:

    subscription.joJSON().keys.auth
    subscription.joJSON().keys.p256dh

    subscription.getKey('auth')
    subscription.getKey('p256dh')

The 'auth' value should be treated as a secret and not shared outside of your application.

The 'p256dh' key is a public key, this is sometimes referred to as the client public key. Here
 we'll refer to p256dh as the subscription public key. The subscription public key is generated
 by the browser. The browser will keep the private key secret and use it for decrypting the
 payload.

These three values, auth, p256dh and payload are needed as inputs and the result of the
 encryption process will be the encrypted payload, a salt value and a public key used just for
 encrypting the data.

**Salt**

The salt needs to be 16 bytes of random data. In NodeJS, we'd do the following to create a salt:

    const salt = crypto.randomBytes(16);

**Public / Private Keys**

The public and private keys should be generated using a P-256 elliptic curve,
which we'd do in Node like so:

    const localKeysCurve = crypto.createECDH('prime256v1');
    localKeysCurve.generateKeys();

    const localPublicKey = localKeysCurve.getPublicKey();
    const localPrivateKey = localKeysCurve.getPrivateKey();

We'll refer these keys as "local keys". They are used *just* for encryption and have
 **nothing** to do with application server keys.

With the payload, auth secret and subscription public key as inputs and with a newly generated
 salt and set of local keys, we are ready to actually do some encryption.

### Shared Secret

The first step is to create a shared secret using the subscription public key and our new
 private key (remember the ECDH explanation with Alice and Bob? Just like that).

    const sharedSecret = localKeysCurve.computeSecret(
      subscription.keys.p256dh, 'base64');

This is used in the next step to calculate the Pseudo Random Key (PRK).

### Pseudo Random Key

The Pseudo Random Key (PRK) is the combination of the push subscription's auth
secret, the shared secret we just created.

    const authEncBuff = new Buffer('Content-Encoding: auth\0', 'utf8');
    const prk = hkdf(subscription.keys.auth, sharedSecret, authEncBuff, 32);

What is up with the create this 'Content-Encoding: auth' buffer?

This piece of information is included in the final output of the HKDF and I imagine is largely
 there to help browsers identify that the decryption was successful / what the decrypted
 information is. *Note* the '\0' is just to add a byte with value of 0 to end of the Buffer.

So our Pseudo Random Key is simply running the auth, shared secret and a piece of encoding info
 through HKDF (i.e. making it cryptographically stronger).

### Context

The "context" is a set of bytes that is used to calculate two values later on in the encryption
 browser. It's essentially an array of bytes containing the subscription public key and the
 local public key.

    const keyLabel = new Buffer('P-256\0', 'utf8');

    // Convert subscription public key into a buffer.
    const subscriptionPubKey = new Buffer(subscription.keys.p256dh, 'base64');

    const subscriptionPubKeyLength = new Uint8Array(2);
    subscriptionPubKeyLength[0] = 0;
    subscriptionPubKeyLength[1] = subscriptionPubKey.length;

    const localPublicKeyLength = new Uint8Array(2);
    subscriptionPubKeyLength[0] = 0;
    subscriptionPubKeyLength[1] = localPublicKey.length;

    const contextBuffer = Buffer.concat([
      keyLabel,
      subscriptionPubKeyLength.buffer,
      subscriptionPubKey,
      localPublicKeyLength.buffer,
      localPublicKey,
    ]);

The final context buffer is a label, the number of bytes in the subscription public key,
 followed by the key itself, then the number of bytes local public key, followed by the key
 itself.

With this context value we can use it in the creation of a nonce and a content encryption key
 (CEK).

### Content Encryption Key and Nonce

A [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) is a value that prevents replay
 attacks as it should only be used once.

The content encryption key (CEK) is the key that will ultimately be used to encrypt our payload.

First we need to create the bytes of data for the nonce and CEK, which is simply a content
 encoding string followed by the context buffer we just calculated:

    const nonceEncBuffer = new Buffer('Content-Encoding: nonce\0', 'utf8');
    const nonceInfo = Buffer.concat([nonceEncBuffer, contextBuffer]);

    const cekEncBuffer = new Buffer('Content-Encoding: aesgcm\0');
    const cekInfo = Buffer.concat([cekEncBuffer, contextBuffer]);

This information is run through HKDF combining the salt and PRK with the nonceInfo and cekInfo:

    // The nonce should be 12 bytes long
    const nonce = hkdf(salt, prk, nonceInfo, 12);

    // The CEK should be 16 bytes long
    const contentEncryptionKey = hkdf(salt, prk, cekInfo, 16);

This gives us our nonce and content encryption key.

### Perform the Encryption

Now that we have our content encryption key, we can encrypt the payload.

We create an AES128 Cipher using the content encryption key
as the key and the nonce is as an initialization vector.

In Node this is done like so:

    const cipher = crypto.createCipheriv(
      'id-aes128-GCM', contentEncryptionKey, nonce);

Before we encrypt our payload, we need to define how much padding we wish to
add to the front of the payload. The reason you'd want to add padding is that
it further hides what the content of the payload *could* be.

The padding needs to be at least 2 bytes and these first two bytes should indicate the length
 of the padding. If you do add padding, create enough bytes of data to add the two bytes used
 to include the padding length.

    const padding = new Buffer(2 + paddingLength);
    // The buffer must be only zeros, except the length
    padding.fill(0);
    padding.writeUInt16BE(paddingLength, 0);

We then run our padding and payload through this cipher.

    const result = cipher.update(Buffer.concat(padding, payload));
    cipher.final();

    // Append the auth tag to the result -
 https://nodejs.org/api/crypto.html#crypto_cipher_getauthtag
    const encryptedPayload = Buffer.concat([result, cipher.getAuthTag()]);

We now have our encrypted payload - Yay.

The remaining piece of work is to determine how this payload is sent to the push service.

### Encrypted Payload Headers & Body

To send this encrypted payload to the Push Service we need to define a few
different headers in our POST request.

#### Encryption Header

The 'Encryption' header must contain the *salt* used for encrypting the payload.

The 16 byte salt should be base64 URL safe encoded and added to the Encryption header, like so:

    Encryption: salt=<URL Safe Base64 Encoded Salt>

#### Crypto-Key Header

We saw that the 'Crypto-Key' header is used under the 'Application Server Keys'
section to contain the public application server key.

This header is also used to share the local public key used to encrypt
the payload.

The resulting header looks like this:

    Crypto-Key: dh=<URL Safe Base64 Encoded Local Public Key String>; p256ecdsa=<URL Safe
 Base64 Encoded Public Application Server Key>

#### Content Type, Length & Encoding Headers

The 'Content-Length' header is the number of bytes in the encrypted payload and 'Content-Type'
 and 'Content-Encoding' headers are fixed values, as shown below:

    Content-Length: <Number of Bytes in Encrypted Payload>
    Content-Type: 'application/octet-stream'
    Content-Encoding: 'aesgcm'

With these headers set, we need to send the encrypted payload as the body of
our request. Notice that the Content-Type is set to
'application/octet-stream'. This is because the encrypted payload must be sent as a stream of
 bytes.

In NodeJS we would do this like so:

    const pushRequest = https.request(httpsOptions, function(pushResponse) {
    pushRequest.write(encryptedPayload);
    pushRequest.end();

## More Headers?

We've covered the headers used for JWT / Application Server Keys (i.e. how to identify the
 application with the push service) and we've covered the headers used to send an encrypted
 payload.

There are some additional headers that can be used by Push Services to alter the behavior of
 the send messages. Some of these headers are required, while others are optional.

### TTL Header

This is a **required header**.

TTL (or time to live) should be an integer for the number of seconds you
want your push message to live on the push service before it's delivered. If
the TTL is expired, the message will be removed from the Push Service queue
and it won't be delivered.

    TTL: <Time to live in seconds>

If you set a TTL of zero, the push service will attempt to deliver the message
immediately **but** if the device can't be reached, your message will be
immediately dropped from the push service queue.

Technically a push service can reduce the TTL of a push message if it wants. You can tell if
 this has happened by examining the TTL header in the response from a push service.

##### Topic

This is an **optional header**.

Topics are strings that can be used to replace any pending notifications with
new notifications if they have matching topic names.

This is useful in scenarios where the user's device might have been offline during which you
 might have sent three messages and you may want the user to receive only the latest message
 when their device is eventually turned back on.

##### Urgency

This is an **optional header**.

This can be used to indicate to the push service how important a message is to the user. This
 could be used by the push service to help conserve the battery life of a users device by only
 waking up for important messages when battery is low.

The header value should a string value of "very-low" | "low" | "normal" | "high". The default
 value is "normal".

    Urgency: <very-low | low | normal | high>

### Everything Together

If you have further questions about how this all works you can always see how libraries trigger
 push messages on [the web-push-libs org](https://github.com/web-push-libs).

Once you have an encrypted payload, and the headers above, you just need to make a POST request
 to the `endpoint` in a `PushSubscription`.

So what do we do with the response to this POST request?

### Response from Push Service

Once you've made a request to a Push Service, you need to check the status code
of the response as that'll inform you as to whether the request was successful
or not.

<table>
  <tr>
    <th>Status Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>201</td>
    <td>Created. The request to send a push message was received and accepted.
    </td>
  </tr>
  <tr>
    <td>429</td>
    <td>Too many requests. Meaning your application server has reached a rate
    limit with a push service. The push service should include a 'Retry-After'
    header to indicate how long before another request can be made.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Invalid request. This generally means one of your headers is invalid
    or poorly formatted.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Not Found. This is an indication that the subscription is expired
    and can't be used. In this case you should delete the PushSubscription
    and wait for the client to resubscribe the user.</td>
  </tr>
  <tr>
    <td>410</td>
    <td>Gone. The subscription is no longer valid and should be removed
    from back end. This can be reproduced by calling `unsubscribe()` on a
    PushSubscription.</td>
  </tr>
  <tr>
    <td>413</td>
    <td>Payload size too large. The minimum size payload a push service must
    support is <a
 href="https://tools.ietf.org/html/draft-ietf-webpush-protocol-10#section-7.2">4096 bytes</a>
 (or 4kb).</td>
  </tr>
</table>
