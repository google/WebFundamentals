project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2013-02-05 #}
{# wf_published_on: 2013-02-05 #}
{# wf_tags: news,webrtc,webaudio #}

# WebRTC: RTCDataChannel demo, API changes... and Chrome talks to Firefox! {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}


<p>More good news from our old friend <a href="http://www.webrtc.org" title="webrtc.org website">WebRTC</a>...</p>

<p><a href="http://en.wikipedia.org/wiki/File:Thomson_and_Thompson_in_Asterix.png" title="Thomson and Thompson in Asterix in Belgium">To be precise</a>: three pieces of good news and a couple of minor API changes.</p>

## RTCDataChannel for Chrome

<p>RTCDataChannel has been implemented in Chrome, and there's a great little demo at <a href="https://simpl.info/rtcdatachannel" title="Data Channel">simpl.info/dc</a>.</p>

<p>This demo shows peer-to-peer communication of arbitrary data &ndash; in less than a hundred lines of code. You'll need Chrome 25 or above for this, which at this point means <a href="https://www.google.com/intl/en/chrome/browser/beta.html" title="Download Chrome Beta">Beta</a> or <a href="https://www.google.com/intl/en/chrome/browser/canary.html" title="Download Chrome Canary">Canary</a>.</p>

<p>RTCDataChannel makes the most of features built into RTCPeerConnection &ndash; not least, the use if the ICE framework to get through firewalls and NATs &ndash; and has lots of potential applications where low latency is paramount: for gaming, remote desktop applications, real-time text chat and file transfer.</p>

<p>For more information about RTCDataChannel, take a look at <a href="http://www.html5rocks.com/en/tutorials/webrtc/basics/#toc-rtcdatachannel" title="Information about RTCDataChannel on HTML5 Rocks">Getting Started with WebRTC</a>.</p>

## API changes

<p>Less exciting, but still important: from Chrome 26, some RTCPeerConnection and MediaStream API properties have become <em>getter</em> methods:</p>

<ol>
	<li>MediaStream now has the <code>getAudioTracks()</code> method instead of the audioTracks property, and <code>getVideoTracks()</code> instead of <code>videoTracks</code>.</li>
	<li>RTCPeerConnection now has <code>getLocalStreams()</code> instead of <code>localStreams</code>, and <code>getRemoteStreams()</code> instead of <code>remoteStreams</code>.</li>
</ol>

<p>To get a glimpse of MediaStream in action, take a look at the <a href="https://simpl.info/getusermedia/" title="Simple getUserMedia demo">simpl.info/gum</a> <code>getUserMedia</code> demo. The <code>stream</code> variable is in global scope: examine it from the console. Likewise for RTCPeerConnection at <a href="https://simpl.info/pc" title="RTCPeerConnection demo">simpl.info/pc</a>: the RTCPeerConnection objects <code>pc1</code> and <code>pc2</code> are in global scope.</p>

## Chrome &lt;=&gt; Firefox

<p><a href="https://twitter.com/search?q=webrtc+chrome+firefox" title="Tweets about Chrome/Firefox WebRTC interop">And</a> <a href="http://www.webrtc.org/demo" title="webrtc.org demo page">in</a> <a href="https://hacks.mozilla.org/2013/02/hello-chrome-its-firefox-calling/" title="hacks.mozilla.org blog post">case</a> <a href="http://blog.chromium.org/2013/02/hello-firefox-this-is-chrome-calling.html" title="Chromium blog post">you</a> <a href="https://www.google.com/news?q=chrome+firefox+webrtc" title="News stories about Chrome/Firefox WebRTC interop">missed</a> <a href="https://news.ycombinator.com/item?id=5166239" title="Hacker News comments on Chrome Firefox WebRTC interop">it</a>, Chrome can now 'talk' to Firefox.</p>

<p>You can try this out now at <a href="http://www.webrtc.org/demo" title="webrtc.org instructions for using the apprtc video chat demo on Firefox and Chrome">webrtc.org/demo</a>, which has full instructions, links to source code, and information about API differences.</p>

<p>Tip of the hat to those at Mozilla and Google who made it all happen.</p>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="MsAWR_rJ5n8"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

<p>Happy coding! And please let us know of any bugs, either by commenting on this post, or at <a href="http://crbug.com/new" title="File a Chrome bug">crbug.com/new</a>.</p>

<p>...and don't forget, you can always get up-to-date implementation information from the excellent <a href="http://www.chromestatus.com" title="chromestatus.com: implementation information for APIs in Chrome">chromestatus.com</a>.</p>


{% include "comment-widget.html" %}
