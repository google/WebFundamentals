project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What is really happening with "DOMException: The play() request was interrupted"?

{# wf_updated_on: 2018-01-24 #}
{# wf_published_on: 2017-06-14 #}
{# wf_tags: media,devtools #}
{# wf_featured_image: /web/updates/images/generic/play-outline.png #}
{# wf_featured_snippet: What is really happening with "DOMException: The play() request was interrupted"? #}
{# wf_blink_components: Blink>Media #}

# DOMException: The play() request was interrupted {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

Did you just stumble upon this unexpected media error in the Chrome DevTools
JavaScript Console?

> _Uncaught (in promise) DOMException: The play() request was interrupted by a
> call to pause()._

or

> _Uncaught (in promise) DOMException: The play() request was interrupted by a
> new load request._

You're in the right place then. Have no fear. I'll explain [what is causing
this](#error) and [how to fix it](#fix).

## What is causing this {: #error }

Here's some JavaScript code below that reproduces the "Uncaught (in promise)"
error you're seeing:

<span class="compare-worse">DON'T</span>
```html
<video id="video" preload="none" src="https://example.com/file.mp4"></video>

<script>
  video.play(); // <-- This is asynchronous!
  video.pause();
</script>
```

The code above results in this error message in Chrome DevTools: 

> _Uncaught (in promise) DOMException: The play() request was interrupted by a
> call to pause()._

As the video is not loaded due to `preload="none"`, video playback doesn't
necessarily start immediately after `video.play()` is executed.

Moreover since [Chrome 50], a `play()` call on an a `<video>` or `<audio>`
element returns a [Promise], a function that returns a single result
asynchronously. If playback succeeds, the Promise is fulfilled and the
`playing` event is fired at the same time. If playback fails, the Promise is
rejected along with an error message explaining the failure.

Now here's what happening:

1. `video.play()` starts loading video content asynchronously.
2. `video.pause()` interrupts video loading because it is not ready yet. 
3. `video.play()` rejects asynchronously loudly.

Since we're not handling the video play Promise in our code, an error message
appears in Chrome DevTools.

Note: Calling `video.pause()` isn't the only way to interrupt a video. You can
entirely reset the video playback state, including the buffer, with
`video.load()` and `video.src = ''`.

## How to fix it {: #fix }

Now that we understand the root cause, let's see what we can do to fix this.

First, don't ever assume a media element (video or audio) will play. Look at
the Promise returned by the `play` function to see if it was rejected. It is
worth noting that the Promise won't fulfill until playback has actually
started, meaning the code inside the `then()` will not execute until the media
is playing.

<span class="compare-better">Example: Autoplay</span>
```html
<video id="video" preload="none" src="https://example.com/file.mp4"></video>

<script>
  // Show loading animation.
  var playPromise = video.play();

  if (playPromise !== undefined) {
    playPromise.then(_ => {
      // Automatic playback started!
      // Show playing UI.
    })
    .catch(error => {
      // Auto-play was prevented
      // Show paused UI.
    });
  }
</script>
```

<span class="compare-better">Example: Play & Pause</span>
<pre class="prettyprint lang-html">
&lt;video id="video" preload="none" src="https://example.com/file.mp4">&lt;/video>
&nbsp;
&lt;script>
  // Show loading animation.
  var playPromise = video.play();
&nbsp;
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      // Automatic playback started!
      // Show playing UI.
      <strong>// We can now safely pause video...
      video.pause();</strong>
    })
    .catch(error => {
      // Auto-play was prevented
      // Show paused UI.
    });
  }
&lt;/script>
</pre>

That's great for this simple example but what if you use `video.play()` to be
able to play a video later?

I'll tell you a secret. You don't have to use `video.play()`, you can use
`video.load()` and here's how:

<span class="compare-better">Example: Fetch & Play</span>
```html
<video id="video"></video>
<button id="button"></button>

<script>
  button.addEventListener('click', onButtonClick);

  function onButtonClick() {
    // This will allow us to play video later...
    video.load();
    fetchVideoAndPlay();
  }

  function fetchVideoAndPlay() {
    fetch('https://example.com/file.mp4')
    .then(response => response.blob())
    .then(blob => {
      video.srcObject = blob;
      return video.play();
    })
    .then(_ => {
      // Video playback started ;)
    })
    .catch(e => {
      // Video playback failed ;(
    })
  }
</script>
```

Warning: Don't make your `onButtonClick` function asynchronous with the `async`
keyword. You'll lose the "user gesture token" required to allow
your video to play later.

## Play promise support {: #support }

At the time of writing, `HTMLMediaElement.play()` returns a promise in
[Chrome], Firefox, Opera, and [Safari]. [Edge] is still working on it.

## Danger zone {: #danger-zone }

### `<source>` within `<video>` makes `play()` promise never rejects

For `<video src="not-existing-video.mp4"\>`, the `play()` promise rejects as
expected as the video doesn't exist. For `<video><source
src="not-existing-video.mp4" type='video/mp4'></video>`, the `play()` promise
never rejects. It only happens if there are no valid sources.

[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=718647)

{% include "comment-widget.html" %}

[Promise]: /web/fundamentals/getting-started/primers/promises
[Chrome 50]: /web/updates/2016/03/play-returns-promise
[Chrome]: https://www.chromestatus.com/feature/5920584248590336
[Safari]: https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/
[Edge]: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11998448/
