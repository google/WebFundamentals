project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2012-12-09 #}
{# wf_published_on: 2012-12-09 #}
{# wf_tags: news,video,webrtc,getusermedia #}

# WebRTC hits Firefox, Android and iOS {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}


<p>A <strong>lot</strong> has happened with WebRTC over the last few weeks. Time for an update!</p>

<p>In particular, we're really excited to see WebRTC arriving on multiple browsers and platforms.</p>

<p><code>getUserMedia</code> is available now in Chrome with no flags, as well as Opera, and Firefox Nightly/Aurora (though for Firefox you'll need to <a href="https://hacks.mozilla.org/2012/11/progress-update-on-webrtc-for-firefox-on-desktop/comment-page-1/#comment-1851192" title="Progress update on WebRTC for Firefox on desktop">set preferences</a>). Take a look at the cross-browser demo of <code>getUserMedia</code> at <a href="https://simpl.info/gum" title="Simple cross-platform getUserMedia demo">simpl.info/gum</a>&mdash;and check out Chris Wilson's <a href="http://webaudiodemos.appspot.com/" title="">amazing examples</a> of using <code>getUserMedia</code> as input for Web Audio.</p>

<p><code>webkitRTCPeerConnection</code> is now in Chrome stable and it's flagless. TURN server support is available in Chrome 24 and above. There's an ultra-simple demo of Chrome's RTCPeerConnection implementation at <a href="https://simpl.info/rtcpeerconnection" title="Simple cross-platform getUserMedia demo">simpl.info/pc</a> and a great video chat application at <a href="//apprtc.appspot.com" title="Video chat demo">apprtc.appspot.com</a>. (A word of explanation about the name: after several iterations, it's currently known as <code>webkitRTCPeerConnection</code>. Other names and implementations have been deprecated. When the standards process has stabilised, the <code>webkit</code> prefix will be removed.)</p>

<p>WebRTC has also now been implemented for desktop in Firefox Nightly and Aurora, and for iOS and Android via the <a href="https://labs.ericsson.com/apps/bowser" title="Ericsson Bowser browser">Ericsson Bowser browser</a>.</p>

## DataChannel

<p><a href="http://www.html5rocks.com/en/tutorials/webrtc/basics/#toc-datachannel" title="DataChannel section of HTML5 Rocks article">DataChannel</a> is a WebRTC API for high performance, low latency, peer-to-peer communication of arbritary data. The API is simple&mdash;similar to WebSocket&mdash;but communication occurs directly between browsers, so DataChannel can be much faster than WebSocket even if a relay (TURN) server is required (when 'hole punching' to cope with firewalls and NATs fails).</p>

<p>DataChannel is planned for version 25 of Chrome, behind a flag – though it may miss this version. This will be for experimentation only, may not be fully functional, and communication won't be possible with the Firefox implementation. DataChannel in later versions should be more stable and will be implemented so as to enable interaction with DataChannel in Firefox.</p>

<p>Firefox Nightly/Aurora supports <code>mozGetUserMedia</code>, <code>mozRTCPeerConnection</code> and <code>DataChannel</code> (but don't forget to set your about:config preferences!)</p>

<p>Here's a screenshot of DataChannel running in Firefox:</p>

<img src="/web/updates/images/2012/12/webrtc-ff/Firefox_DataChannel_screenshot.png" title="Firefox DataChannel screenshot" />

<p>This demo is at <a href="http://mozilla.github.com/webrtc-landing/data_test.html" title="Mozilla DataChannel example">http://mozilla.github.com/webrtc-landing/data_test.html</a>. Here's a code snippet:</p>


    pc1.onconnection = function() {
      log("pc1 onConnection ");
      dc1 = pc1.createDataChannel("This is pc1",{}); // reliable (TCP-like)
      dc1 = pc1.createDataChannel("This is pc1",{outOfOrderAllowed: true, maxRetransmitNum: 0}); // unreliable (UDP-like)
      log("pc1 created channel " + dc1 + " binarytype = " + dc1.binaryType);
      channel = dc1;
      channel.binaryType = "blob";
      log("pc1 new binarytype = " + dc1.binaryType);

      // Since we create the datachannel, don't wait for onDataChannel!
      channel.onmessage = function(evt) {
        if (evt.data instanceof Blob) {
          fancy_log("*** pc2 sent Blob: " + evt.data + ", length=" + evt.data.size,"blue");
        } else {
          fancy_log('pc2 said: ' + evt.data, "blue");
        }
      }
      channel.onopen = function() {
        log("pc1 onopen fired for " + channel);
        channel.send("pc1 says Hello...");
        log("pc1 state: " + channel.state);
      }
      channel.onclose = function() {
        log("pc1 onclose fired");
      };
      log("pc1 state:" + channel.readyState);
          }


<p>More information and demos for the Firefox implementation are available from the <a href="https://hacks.mozilla.org/2012/11/progress-update-on-webrtc-for-firefox-on-desktop/comment-page-1/#comment-1851192" title="Progress update on WebRTC for Firefox on desktop">hacks.mozilla.org blog</a>. Basic WebRTC support is due for release in Firefox 18 at the beginning of 2013, and support is planned for additional features including <code>getUserMedia</code> and createOffer/Answer constraints, as well as TURN (to allow communication between browsers behind firewalls).</p>

<p>For more information about WebRTC, see <a href="http://www.html5rocks.com/en/tutorials/webrtc/basics/" title="Getting Started With WebRTC article on HTML5 Rocks">Getting Started With WebRTC</a>. There's even a <a href="http://webrtcbook.com/" title="WebRTC book site">WebRTC book</a>, available in print and several eBook formats.</p>

## Resolution Constraints

<p><a href="http://tools.ietf.org/html/draft-alvestrand-constraints-resolution-00#page-4" title="IETF Resolution Constraints draft specification">Constraints</a> have been implemented in Chrome 24 and above. These can be used to set values for video resolution for <code>getUserMedia()</code> and RTCPeerConnection <code>addStream()</code> calls.</p>

<p>There's an example at <a href="https://simpl.info/getusermedia/constraints/index.html" title="Resolution Constraints example on simpl.info">simpl.info/getusermedia/constraints</a>. Play around with different constraints by setting a breakpoint and tweaking values.</p>

<p>A couple of gotchas... <code>getUserMedia</code> constraints set in one browser tab affect constraints for all tabs opened subsequently. Setting a disallowed value for constraints gives a rather cryptic error message:<br />


    navigator.getUserMedia error:  NavigatorUserMediaError {code: 1, PERMISSION_DENIED: 1}


<p>Likewise the error if you try to use <code>getUserMedia</code> from the local file system, not on a server!</p>

## Streaming screen capture

<p>Tab Capture is now available <a href="https://developer.chrome.com/trunk/extensions/tabCapture.html" title="chrome.tabCapture reference">in the Chrome Dev channel</a>. This makes it possible to capture the visible area of the tab as a stream, which can then be used locally, or with RTCPeerConnection's <code>addStream()</code>. Very useful for sceencasting and web page sharing. For more information see the <a href="http://www.chromium.org/developers/design-documents/extensions/proposed-changes/apis-under-development/webrtc-tab-content-capture" title="WebRTC Tab Content Capture proposal">WebRTC Tab Content Capture proposal</a>.</p>

<p>Keep us posted by commenting on this update: we'd love to hear what you're doing with these APIs.</p>

<p>...and don't forget to file any bugs you encounter at <a href="http://new.crbug.com" title="Post Chrome bug">new.crbug.com</a>!</p>


{% include "comment-widget.html" %}
