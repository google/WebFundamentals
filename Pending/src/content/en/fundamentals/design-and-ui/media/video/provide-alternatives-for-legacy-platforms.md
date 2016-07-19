project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Not all video formats are supported on all platforms. Check which formats are supported on the major platforms and make sure your video works in each of these.

<p class="intro">
  Not all video formats are supported on all platforms. Check which formats are supported on the major platforms and make sure your video works in each of these.
</p>



## Check which formats are supported

Use `canPlayType()` to find out which video formats are supported. The method
takes a string argument consistent of a `mime-type` and optional codecs and
returns one of the following values:

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Return value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Return value">(empty string)</td>
      <td data-th="Description">The container and/or codec isn't supported.</td>
    </tr>
    <tr>
      <td data-th="Return value"><code>maybe</code></td>
      <td data-th="Description">
        The container and codec(s) might be supported, but the browser
        will need to download some video to check.
      </td>
    </tr>
    <tr>
      <td data-th="Return value"><code>probably</code></td>
      <td data-th="Description">The format appears to be supported.
      </td>
    </tr>
  </tbody>
</table>

Here are some examples of `canPlayType()` arguments and return values when
run in Chrome:


<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Type</th>
      <th>Response</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type"><code>video/xyz</code></td>
      <td data-th="Response">(empty string)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response">(empty string)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Response">(empty string)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm</code></td>
      <td data-th="Response"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
  </tbody>
</table>


## Produce video in multiple formats

There are lots of tools to help save the same video in different formats:

* Desktop tools: [FFmpeg](//ffmpeg.org/)
* GUI applications: [Miro](//www.mirovideoconverter.com/),
  [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Online encoding/transcoding services:
  [Zencoder](//en.wikipedia.org/wiki/Zencoder),
  [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## Check which format was used

Want to know which video format was actually chosen by the browser?

In JavaScript, use the video's `currentSrc` property to return the source used.

To see this in action, check out <a href="/web/resources/samples/fundamentals/design-and-ui/media/video/video-main.html">this demo</a>: Chrome and Firefox choose `chrome.webm`
(because that's the first in the list of potential sources these browsers
support) whereas Safari chooses `chrome.mp4`.



