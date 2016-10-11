project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: From version 52, Chrome uses ECDSA by default — a much more efficient and secure algorithm for WebRTC certificate key generation. In addition, RTCCertificates can now be stored with IndexedDB.

{# wf_updated_on: 2016-06-16 #}
{# wf_published_on: 2016-06-16 #}
{# wf_tags: chrome52,media,security,webrtc #}
{# wf_featured_image: /web/updates/images/generic/security.png #}

# ECDSA for WebRTC: Better Security, Better Privacy and Better Performance {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}



<style>
.screenshot-landscape {
 max-width: 60%;
}
.screenshot-portrait {
 max-width: 35%;
}
@media screen and (max-width: 500px) {
  img.screenshot {
    max-width: 100%;
  }
}
</style>

From Chrome 52, WebRTC uses a much more efficient and secure algorithm for certificate (RTCCertificate) generation: ECDSA. In addition, RTCCertificates can now be stored with IndexedDB.

RTCCertificates are the self-signed certificates used in the [DTLS](https://en.wikipedia.org/wiki/Datagram_Transport_Layer_Security) handshake when setting up a WebRTC peer connection. (DTLS is an implementation of the cryptographic protocol [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) for datagram protocols such as [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol), which is used by WebRTC.)

Until recently, WebRTC used RSA-1024 keys for certificates. There are several disadvantages with these keys:

* Generating RSA-1024 keys can add up to around 1000ms in call setup time.
* 1024-bit RSA keys do not provide adequate cryptographic strength.

Because certificate generation with RSA-1024 is slow, some mobile apps have resorted to preparing certificates in advance or reusing them.

The key strength issue could be resolved by going to 2048-bit RSA keys or more, but that would delay call setup by several additional seconds. Instead of changing the RSA key size, Chrome 52 implements ECDSA keys (Elliptic Curve Digital Signature Algorithm) for use in certificates. These are as strong as 3072-bit RSA keys‚ but several thousand times faster: call setup overhead with ECDSA is just a few milliseconds.

> Breaking an RSA key requires you to factor a large number. We are pretty good at factoring large numbers and [getting better all the time](http://bristolcrypto.blogspot.co.uk/2013/02/discrete-logarithms.html). Breaking an ECDSA key requires you to solve the Elliptic Curve Discrete Logarithm Problem (ECDLP). The mathematical community has not made any major progress in improving algorithms to solve this problem since is was independently introduced by Koblitz and Miller in 1985.

— [Nick Sullivan](https://blog.cloudflare.com/ecdsa-the-digital-signature-algorithm-of-a-better-internet/), CloudFlare

All in all, ECDSA keys mean better security, better privacy and better performance — especially on mobile. For these reasons, ECDSA has been mandated in the [WebRTC Security Architecture](https://www.ietf.org/mail-archive/web/rtcweb/current/msg14754.html) draft.

From Chrome 47 you can opt in to ECDSA:


    // or webkitRTCPeerConnection
    RTCPeerConnection.generateCertificate({
      name: "ECDSA",
      namedCurve: "P-256"
    }).then(function(certificate) {
      var pc = new RTCPeerConnection({..., certificates: [certificate]});
    });
    

From Chrome 52, though ECDSA is enabled by default, you can still choose to generate RSA certificates:


    pc.generateCertificate({
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256"
    })
    

(See the [W3C draft](http://w3c.github.io/webrtc-pc/#dom-rtcpeerconnection-generatecertificate) for more information about `generateCertificate()`.)

## Storing RTCCertificate in IndexedDB

Another improvement in Chrome 52: the RTCCertificates used by WebRTC can be saved and loaded from IndexedDB storage, avoiding the need to generate new certificates between sessions. This can be useful, for example, if you still need to use RSA and want to avoid the RSA generation overhead. With ECDSA, caching is not necessary since it is fast enough to generate a new certificate every time.

RTCCertificate IndexedDB storage has already shipped in Firefox and is in Opera 39.

## Find out more
* [ECDSA: The digital signature algorithm of a better internet](https://blog.cloudflare.com/ecdsa-the-digital-signature-algorithm-of-a-better-internet/)
* [WebRTC certificate management](https://w3c.github.io/webrtc-pc/#sec.cert-mgmt)
* [RTCCertificate interface](https://w3c.github.io/webrtc-pc/#rtccertificate-interface)
* [Discussion of RTCCertificates and storage](https://bugs.chromium.org/p/chromium/issues/detail?id=581354)
* [Getting started with WebRTC](http://www.html5rocks.com/en/tutorials/webrtc/basics/){: .external }


{% include "comment-widget.html" %}
