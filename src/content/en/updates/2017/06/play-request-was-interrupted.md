project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What is really happening with "DOMException: The play() request was interrupted"?

{# wf_updated_on: 2017-06-13 #}
{# wf_published_on: 2017-06-13 #}
{# wf_tags: media,devtools #}
{# wf_featured_image: /web/updates/images/generic/play-outline.png #}
{# wf_featured_snippet: What is really happening with "DOMException: The play() request was interrupted"? #}

# DOMException: The play() request was interrupted {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

Did you just stumble upon this unexpected media error in the Chrome DevTools
JavaScript Console?

<blockquote class="warning">
Uncaught (in promise) DOMException: The play() request was interrupted by a new
load request.
</blockquote>

<blockquote class="warning">
Uncaught (in promise) DOMException: The play() request was interrupted by a
call to pause().
</blockquote>

You're in the right place then. Have no fear. I'll explain [what is causing
this](#error) and [how to fix it](#fix).

## What is causing this {: #error }

Here's some JavaScript code below that reproduces the "uncaught (in promise)"
error you're seeing:

<span class="compare-worse">DON'T</span>
```html
<video id="video" preload="none" src="https://example.com/file.mp4"></video>

<script>
  video.play(); // <-- WRONG! This is NOT synchronous.
  video.pause();
</script>
```

The code above results in this error message in Chrome DevTools: 

> _Uncaught (in promise) DOMException: The play() request was interrupted by a
> call to pause()._

This is due to the fact that the `play()` call is NOT synchronous, like it used
to be. Since Chrome 50 - [March 2016], a `play()` call on an a `<video>` or
`<audio>` element returns a [Promise], a function that returns a single result
**asynchronously**. If playback succeeds, the Promise is fulfilled, and if
playback fails, the Promise is rejected along with an error message explaining
the failure.

As `video.play()` is asynchronous, `video.pause()` is executed before
video playback actually starts. This causes `video.play()` to return a rejected
Promise as user just asked to pause video. Think about it this way:
`video.play()` fails eventually.

Note: Calling `video.pause()` isn't the only way to reset video playback state.
It also occurs with `video.src = ''`, `video.removeAttribute('src')`, and
`video.load()` for instance.

Since we're not handling the video play Promise in our code, an error message
appears in Chrome DevTools. This is what is really happening...

## How to fix it {: #fix }

Now that we understand the root cause, let's see what we can do to fix this
properly.

First, don't ever assume a media element (video or audio) will play. Look at
the Promise returned by the `play` function to see if it was rejected. It is
worth noting that the Promise won't fulfill until playback has actually
started, meaning the code inside the `then()` will not execute until the media
is playing.

<span class="compare-better">Example: Play & Pause</span>
```html
<video id="video" preload="none" src="https://example.com/file.mp4"></video>

<script>
  var playPromise = video.play();

  playPromise.then(_ => {
    // Automatic playback started!
    // We can now pause video...
    video.pause();
  })
  .catch(error => {
    // Automatic playback failed.
    // This can be due to an autoplay policy on mobile for instance...
  });
</script>
```

That's great for this simple example but what if you use `video.play()` to be
able to play a video later when user interacts with the website you may think?

I'll tell you a secret... you don't have to use `video.play()`, you should use
`video.load()`. And here's how:

<span class="compare-better">Example: Fetch & Play</span>
```html
<video id="video"></video>
<button id="button"></button>

<script>
  button.addEventListener('click', function() {
    // This will allow us to play video later...
    video.load();
    fetchVideoAndPlay();
  });

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

## Play promise support {: #support }

At the time of writing, `HTMLMediaElement.play()` returns a promise in
[Chrome], Firefox, Opera, and [Safari]. [Edge] is still working on it.

{% include "comment-widget.html" %}

[Promise]: /web/fundamentals/getting-started/primers/promises
[March 2016]: /web/updates/2016/03/play-returns-promise
[Chrome]: https://www.chromestatus.com/feature/5920584248590336
[Safari]: https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/
[Edge]: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11998448/
