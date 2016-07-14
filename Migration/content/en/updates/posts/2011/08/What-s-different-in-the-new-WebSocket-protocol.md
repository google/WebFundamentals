---
layout: updates/post
title: "What's different in the new WebSocket protocol"
published_on: 2011-08-31
updated_on: 2011-08-31
authors:
  - agektmr
tags:
  - news
  - websockets
  - connectivity
---
The WebSocket protocol specification has recently been updated to solve previous security concerns and is largely stable. Below is a summary of the changes involved, along with some notes on current implementations.

### What has been changed since WebSocket HyBi 00?

* The protocol frame format has been changed. HyBi 00 used to use <code>"0x00"</code> for head and <code>"0xff"</code> for tail for each frame. HyBi 10 now uses new format like following:
<pre><code>
      0                   1                   2                   3
      0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
     +-+-+-+-+-------+-+-------------+-------------------------------+
     |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
     |I|S|S|S|  (4)  |A|     (7)     |             (16/63)           |
     |N|V|V|V|       |S|             |   (if payload len==126/127)   |
     | |1|2|3|       |K|             |                               |
     +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
     |     Extended payload length continued, if payload len == 127  |
     + - - - - - - - - - - - - - - - +-------------------------------+
     |                               |Masking-key, if MASK set to 1  |
     +-------------------------------+-------------------------------+
     | Masking-key (continued)       |          Payload Data         |
     +-------------------------------- - - - - - - - - - - - - - - - +
     :                     Payload Data continued ...                :
     + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
     |                     Payload Data continued ...                |
     +---------------------------------------------------------------+
</code></pre>

* Security issues have been addressed.
** <code>Sec-WebSocket-Key</code> and <code>Sec-WebSocket-Accept</code> are added in place of HyBi 00's three keys. The browser gives randomly generated number to <code>Sec-WebSocket-Key</code>. Then, the server uses it with WebSocket protocol's specific GUID (<code>258EAFA5-E914-47DA-95CA-C5AB0DC85B11</code>) and SHA1 / BASE64, etc to return <code>Sec-WebSocket-Accept</code> so that browser can confirm that it understands WebSocket. This prevents a cross-protocol attack.
** On each frame, *frame masking* is now required. This prevents cache poisoning on proxy. <code>Sec-WebSocket-Origin</code> is added to prevent access from scripts that the service provider isn't aware of.
** <code>Sec-WebSocket-Origin</code> is added in place of HyBi 00's Origin key to prevent access from scripts that the service provider doesn't aware of. Note that this will be just "<code>Origin</code>" on HyBi 11.
* JS API changes
** <code>subprotocol</code> can now be array, allowing a method signature of <code>new WebSocket(String url, Array subprotocol)</code>
** <code>.protocol</code> attribute [String]
** <code>.binaryType</code> attribute [Blob|ArrayBuffer]
** <code>.extension</code> [String]
** Status code and reason (why the connection is closed) have been added to <code>CloseEvent</code>.  The <code>close()</code> function has also been changed to accept these two arguments accordingly.
* Extensions
** <code>Sec-WebSocket-Extensions</code> is added. Proposed extensions are:
*** <code>deflate-frame</code> makes frames compressed at source and extracted at destination.
*** <code>x-google-mux</code> to support multiplexing but is in early stage.

### Is there compatibility between HyBi 00 and HyBi 10 on both server and browser implementation?

* Server implementations can support both HyBi 00 and HyBi 10 by looking at the handshake HTTP header. However, it is not recommended to support HyBi 00 since it's known to be vulnerable.
* The WebSocket JavaScript API is largely similar between old and new versions. But as noted above, we don't recommend supporting HyBi 00 since it's known to be vulnerable.

### Which browser support HyBi 10?

* Chrome 14 supports HyBi 10 protocol although the WebSocket JavaScript API changes mentioned above are still on the way. Firefox 7 is also planned to support HyBi 10.
