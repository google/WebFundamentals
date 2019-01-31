project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The RTCQuicTransport is a new web platform API that allows exchanging arbitrary data with remote peers using the QUIC protocol.

{# wf_updated_on: 2019-01-31 #}
{# wf_published_on: 2019-01-31 #}
{# wf_tags: capabilities,rtcicetransport,rtcquictransport,progressive-web-apps,webrtc #}
{# wf_featured_image: /web/updates/images/generic/file.png #}
{# wf_featured_snippet: The RTCQuicTransport is a new web platform API that allows exchanging arbitrary data with remote peers using the QUIC protocol. #}
{# wf_blink_components: Blink #}

# RTCQuicTransport Coming to an Origin Trial Near You (M73) {: .page-title }

{% include "web/_shared/contributors/shampson.html" %}

## What?
The [RTCQuicTransport][quic-spec] is a new web platform
API that allows exchanging arbitrary data with remote peers using the QUIC
protocol. It’s intended for peer to peer use cases, and therefore is used with
a standalone [RTCIceTransport][ice-spec]
API to establish a peer-to-peer connection through
[ICE](https://en.wikipedia.org/wiki/Interactive_Connectivity_Establishment).
The data is transported reliably and in order (see [section](#unordered) below
for details on unordered & unreliable delivery). Since it is a generic,
bidirectional data transport, it can be used for gaming, file transfers,
media transport, messaging, etc.

## Why?
A powerful low level data transport API can enable applications (like real time
communications) to do new things on the web. You can build on top of the API,
creating your own solutions, pushing the limits of what can be done with peer to
peer connections, for example, unlocking custom bitrate allocation knobs. In the
future, further support for encoded media could even enable building your own
video communication application with low level controls. WebRTC’s NV effort
is to move towards lower level APIs, and experimenting early with this is
valuable.

### Why QUIC?
The QUIC protocol is desirable for real time communications. It is built on top
of UDP, has built in encryption, congestion control and is multiplexed without
head of line blocking. The RTCQuicTransport gives very similar abilities as the
RTCDataChannel API, but uses QUIC rather than SCTP as its transport protocol.
Because the RTCQuicTransport is a standalone API, it doesn’t have the overhead
of the RTCPeerConnection API, which includes the real time media stack.

## How?

### General API overview
The API has 3 main abstractions, the RTCIceTransport, RTCQuicTransport
and RTCQuicStream:

<img src="/web/updates/images/2019/01/rtcquictransport/rtcquictransport-overview.png"
alt="RTCQuicTransport diagram showing architecture of API">

### RTCIceTransport

ICE is a protocol to establish peer-to-peer connections over the internet and
is used in WebRTC today. This object provides a standalone API to establishes
an ICE connection. It is used as the packet transport for the QUIC connection,
and the RTCQuicTransport takes it in its constructor.

### RTCQuicTransport

Represents a QUIC connection. It is used to establish a QUIC connection and
create QUIC streams. It also exposes relevant stats for the QUIC connection
level.

### RTCQuicStream

Used for reading and writing data to/from the remote side. Streams transport
data reliably and in order. Multiple streams can be created from the same
RTCQuicTransport and once data is written to a stream it fires an “onquicstream”
event on the remote transport. Streams offer a way to distinguish different
data on the same QUIC connection. Common examples can be sending separate
files across separate streams, small chunks of data across different streams,
or different types of media across separate streams. RTCQuicStreams are
lightweight, are multiplexed over a QUIC connection and do not cause head of
line blocking to other RTCQuicStreams.

### Setting up a connection
The following is an example for setting up a peer-to-peer QUIC connection.
Like RTCPeerConnection, the RTCQuicTransport API requires the use of a secure
signaling channel to negotiate the parameters of the connection, including its
security parameters. The RTCIceTransport negotiates it’s ICE parameters
(ufrag and password), as well as RTCIceCandidates.

__Note__ that the RTCQuicTransport connection is setup with a pre shared key
API. We do not currently plan on keeping this API past the origin trial. It
will be replaced by signaling remote certificate fingerprints to validate
self-signed certificates used in the handshake, once this support has been
added to QUIC in Chromium.

<img src="/web/updates/images/2019/01/rtcquictransport/rtcquictransport-setup.png"
alt="RTCQuicTransport diagram showing architecture of API">

#### Client perspective:

```
const iceTransport = new RTCIceTransport();
const quicTransport = new RTCQuicTransport(iceTransport);
// Signal parameters, key and candidates.
signalingChannel.send({
  iceParams: iceTransport.getLocalParameters(),
  quicKey: quicTransport.getKey(),
});
iceTransport.onicecandidate = e => {
  if (e.candidate) {
    signalingChannel.send({candidate: e.candidate} );
  }
}

// When remote parameters are signaled, start connection.
signalingChannel.onMessage = async ({iceParams, candidate}) => {
  if (iceParams) {
    iceTransport.start(iceParams);
    quicTransport.connect();
  } else if (candidate) {
    iceTransport.addRemoteCandidate(candidate);
  }
};
```

#### Server perspective:

```
const iceTransport = new RTCIceTransport();
const quicTransport = new RTCQuicTransport(iceTransport);
// Signal parameters, key and candidates.
signalingChannel.send({
  iceParams: iceTransport.getLocalParameters(),
});
iceTransport.onicecandidate = e => {
  if (e.candidate) {
    signalingChannel.send({candidate: e.candidate});
  }
}

// When remote parameters are signaled, start connection.
signalingChannel.onMessage = async ({iceParams, quicKey, candidate}) => {
  if (iceParams && quicKey) {
    iceTransport.start(iceParams);
    quicTransport.listen(quicKey);
  } else if (candidate) {
    iceTransport.addRemoteCandidate(candidate);
  }
};
```

### Data Transfer

Data transfer can be achieved  using the RTCQuicStream APIs for reading and
writing:
```
RTCQuicStreamReadResult readInto(Uint8Array data);
void write(RTCQuicStreamWriteParameters data);
Promise<void> waitForWriteBufferedAmountBelow(unsigned long amount);
Promise<void> waitForReadable(unsigned long amount);
```

#### Buffering

The promises returned by the waitFor\* methods allow buffering data when
JavaScript is busy. Back pressure is applied to the send side when the
read buffer becomes full on the receive side. The send side has a write
buffer that can fill when back pressure has been applied, and therefore
the write side has a waitFor* method as well to allow waiting for room in
the buffer to write. More information on writing/reading data can be found
in the further developer documentation.

#### Unordered/Unreliable Delivery {: #unordered }

While an RTCQuicStream only supports sending data reliably and in order,
unreliable/unordered delivery can be achieved through other means. For
unordered delivery, one can send small chunks of data on separate streams
because data is not ordered between streams. For unreliable delivery, one
can send small chunks of data with finish set to true, followed by calling
reset() on the stream after a timeout. The timeout should be dependent on
how many retransmissions are desired before dropping the data.

## When?

The origin trial will start in the M73 version, and will be available
up to and including the M75 version. After this the origin trial will
end. Based upon feedback and interest we will make appropriate changes
and either ship the API, continue with a new origin trial of this API, or
discontinue the API.

## Where?

Chrome browser

## What else?

### Feedback {: #feedback }

One of the main goals of the origin trial is to get feedback from you,
the developers. We’re interested in:

- What does this API enable for you?
- How does this API improve upon other data transport APIs (WebSockets or WebRTC’s RTCDataChannel)? How could it improve?
- Performance
- API ergonomics

You can participate in the discussion via github issues:

- [RTCQuicTransport](https://github.com/w3c/webrtc-quic/issues)
- [RTCIceTransport](https://github.com/w3c/webrtc-ice/issues)

### Web Specification

The draft specification has moved ahead of the API in the origin trial including:

- Unidirectional streams that are more closely aligned with WHATWG streams
- Disabling retransmissions
- (Coming soon) datagrams

We are interested in implementing the full specification and beyond (including
WHATWG stream support), but want to hear your feedback first!

### Security

Security in the QUIC handshake is enforced through usage of a pre shared key to
establish an encrypted P2P QUIC connection. This key needs to be signaled over a
secure out of band channel with confidentiality and integrity guarantees. Note
that the key will be exposed to JavaScript.

#### Active Attack
Unlike DTLS-SRTP, which just requires integrity for signaling the certificate
fingerprint, signaling the pre shared key requires integrity and confidentiality.
If the PSK is compromised (say by the server in the signaling channel), an active
attacker could potentially mount a man-in-the-middle attack against the QUIC
handshake.

### Current status
 | Step                                       | Status                       |
| ------------------------------------------ | ---------------------------- |
| 1. Create explainer                        | [Complete][explainer]    	|
| **2a. RTCQuicTransport Specification ** 	 | [**In Progress**][quic-spec] |
| **2b. RTCIceTransport Specification ** 	 | [**In Progress**][ice-spec]  |
| **3. Gather feedback & iterate on design** | [**In Progress**](#feedback) |
| 4. Origin trial                            | Starts in M73!               |
| 5. Launch                                  | Not started                  |

[quic-spec]: https://github.com/w3c/webrtc-quic
[ice-spec]: https://github.com/w3c/webrtc-ice
[explainer]: https://docs.google.com/document/d/12oNEcgjAjQERMvATCVCWpoTxNU47NRUzxCK5g0FysTk/edit?usp=sharing
