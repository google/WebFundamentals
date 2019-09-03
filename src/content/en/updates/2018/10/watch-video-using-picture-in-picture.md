project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Control Picture-in-Picture for video elements on your website.

{# wf_updated_on: 2019-05-08 #}
{# wf_published_on: 2018-10-19 #}
{# wf_tags: news,media #}
{# wf_featured_image: /web/updates/images/2018/10/watch-video-using-picture-in-picture/hero.png #}
{# wf_featured_snippet: Control Picture-in-Picture for video elements on your website. #}
{# wf_blink_components: Blink>Media>PictureInPicture #}

# Watch video using Picture-in-Picture {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="t2QAzHZH-5s"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Picture-in-Picture (PiP) allows users to watch videos in a floating window
(always on top of other windows) so they can keep an eye on what they’re
watching while interacting with other sites, or applications.

With the new [Picture-in-Picture Web API], you can initiate and control
Picture-in-Picture for video elements on your website. Try it out on our
official [Picture-in-Picture sample].

## Background {: #background }

In September 2016, Safari added Picture-in-Picture support through a [WebKit API]
in macOS Sierra. Six months later, Chrome automatically played
Picture-in-Picture video on mobile with the release of Android O using a
[native Android API]. Six months later, we [announced our intent] to build and
standardize a Web API, feature compatible with Safari’s, that would allow web
developers to create and control the full experience around Picture-in-Picture.
And here we are!

## Get into the code {: #code }

### Enter Picture-in-Picture {: enter-pip }

Let’s start simply with a video element and a way for the user to interact
with it, such as a button element.

    <video id="videoElement" src="https://example.com/file.mp4"></video>
    <button id="pipButtonElement"></button>

Only request Picture-in-Picture in response to a user gesture, and never in the
[promise] returned by `videoElement.play()`. This is because promises do not
[yet] propagate user gestures. Instead, call `requestPictureInPicture()` in a
click handler on `pipButtonElement` as shown below. It is your responsibility
to handle what happens if a users clicks twice.

    pipButtonElement.addEventListener('click', async function() {
      pipButtonElement.disabled = true;

      await videoElement.requestPictureInPicture();

      pipButtonElement.disabled = false;
    });

When the promise resolves, Chrome shrinks the video into a small window that
the user can move around and position over other windows.

You’re done. Great job! You can stop reading and go take your well-deserved
vacation. Sadly, that is not always the case. The promise [may reject] for any
of the following reasons:

- Picture-in-Picture is not supported by the system.
- Document is not allowed to use Picture-in-Picture due to a restrictive
  [feature policy].
- Video metadata have not been loaded yet (`videoElement.readyState === 0`).
- Video file is audio-only.
- The new `disablePictureInPicture` attribute is present on the video element.
- The call was not made in a user gesture event handler (e.g. a button click).
  Starting in Chrome 74, this is [applicable only] if there's not an element in
  Picture-in-Picture already.

The [Feature support] section below shows how to enable/disable a button based on
these restrictions.

Let’s add a `try...catch` block to capture these potential errors and let the
user know what’s going on.

<pre class="prettyprint lang-js">
pipButtonElement.addEventListener('click', async function() {
  pipButtonElement.disabled = true;

  <strong>try {</strong>
    await videoElement.requestPictureInPicture();
  <strong>}
  catch(error) {
    // TODO: Show error message to user.
  }
  finally {</strong>
    pipButtonElement.disabled = false;
  <strong>}</strong>
})
</pre>

The video element behaves the same whether it is in Picture-in-Picture or
not: events are fired and calling methods work. It reflects changes of state in
the Picture-in-Picture window (such as play, pause, seek, etc.) and it is also
possible to change state programmatically in JavaScript.

### Exit Picture-in-Picture {: #exit-pip }

Now, let's make our button toggle entering and exiting Picture-in-Picture. We
first have to check if the read-only object `document.pictureInPictureElement`
is our video element. If it isn’t, we send a request to enter
Picture-in-Picture as above. Otherwise, we ask to leave by calling
`document.exitPictureInPicture()`, which means the video will appear back in
the original tab. Note that this method also returns a promise.

    ...
    try {
      if (videoElement !== document.pictureInPictureElement) {
        await videoElement.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    }
    ...

Note: I'd recommend the video leaves Picture-in-Picture automatically when 
[video enters fullscreen].

### Listen to Picture-in-Picture events {: #listen-pip-events }

Operating systems usually restrict Picture-in-Picture to one window, so
Chrome's implementation follows this pattern. This means users can only play
one Picture-in-Picture video at a time. You should expect users to exit
Picture-in-Picture even when you didn't ask for it.

Warning: Listen to Picture-in-Picture events instead of waiting for promises
to update your media player controls. It's possible for the video to enter and
exit Picture-in-Picture at any time (e.g. user clicks some browser context menu
or Picture-in-Picture is triggered automatically).

The new `enterpictureinpicture` and `leavepictureinpicture` event handlers let
us tailor the experience for users. It could be anything from browsing a
catalog of videos, to surfacing a livestream chat.

    videoElement.addEventListener('enterpictureinpicture', function(event) {
      // Video entered Picture-in-Picture.
    });

    videoElement.addEventListener('leavepictureinpicture', function(event) {
      // Video left Picture-in-Picture.
      // User may have played a Picture-in-Picture video from a different page.
    });

### Customize the Picture-in-Picture window

Chrome 74 supports play/pause, previous track and next track buttons in the
Picture-in-Picture window you can control by using the [Media Session API].

<figure>
  <img src="/web/updates/images/2018/10/media-playback-controls.png"
       alt="Media playback controls in a Picture-in-Picture window">
  <figcaption>
    <b>Figure 1.</b>
    Media playback controls in a Picture-in-Picture window
  </figcaption>
</figure>

By default, a play/pause button is always shown in the Picture-in-Picture
window unless the video is playing MediaStream objects (e.g. `getUserMedia()`,
`getDisplayMedia()`, `canvas.captureStream()`) or the video has a MediaSource
duration set to `+Infinity` (e.g. live feed). To make  sure a play/pause button
is always visible, set somesee Media Session action handlers for both "Play" and
"Pause" media events as below.

      // Show a play/pause button in the Picture-in-Picture window
      navigator.mediaSession.setActionHandler('play', function() {
        // User clicked "Play" button.
      });
      navigator.mediaSession.setActionHandler('pause', function() {
        // User clicked "Pause" button.
      });

Showing "Previous Track" and "Next track" window controls is similar. Setting
Media Session action handlers for those will show them in the Picture-in-Picture
window and you'll be able to handle these actions.

      navigator.mediaSession.setActionHandler('previoustrack', function() {
        // User clicked "Previous Track" button.
      });

      navigator.mediaSession.setActionHandler('nexttrack', function() {
        // User clicked "Next Track" button.
      });

To see this in action, try out the official [Media Session sample].

### Get the Picture-in-Picture window size

If you want to adjust the video quality when the video enters and leaves
Picture-in-Picture, you need to know the Picture-in-Picture window size and be
notified if a user manually resizes the window.

The example below shows how to get the width and height of the
Picture-in-Picture window when it is created or resized.

    let pipWindow;

    videoElement.addEventListener('enterpictureinpicture', function(event) {
      pipWindow = event.pictureInPictureWindow;
      console.log(`> Window size is ${pipWindow.width}x${pipWindow.height}`);
      pipWindow.addEventListener('resize', onPipWindowResize);
    });

    videoElement.addEventListener('leavepictureinpicture', function(event) {
      pipWindow.removeEventListener('resize', onPipWindowResize);
    });

    function onPipWindowResize(event) {
      console.log(`> Window size changed to ${pipWindow.width}x${pipWindow.height}`);
      // TODO: Change video quality based on Picture-in-Picture window size.
    }

I’d suggest not hooking directly to the resize event as each small change made
to the Picture-in-Picture window size will fire a separate event that may cause
performance issues if you’re doing an expensive operation at each resize. In
other words, the resize operation will fire the events over and over again very
rapidly. I’d recommend using common techniques such as [throttling and
debouncing] to address this problem.

### Feature support {: #feature-support }

The Picture-in-Picture Web API may not be supported, so you have to detect this
to provide progressive enhancement. Even when it is supported, it may be
turned off by the user or [disabled by a feature policy]. Luckily, you can use
the new boolean `document.pictureInPictureEnabled` to determine this.

    if (!('pictureInPictureEnabled' in document)) {
      console.log('The Picture-in-Picture Web API is not available.');
    }
    else if (!document.pictureInPictureEnabled) {
      console.log('The Picture-in-Picture Web API is disabled.');
    }

Applied to a specific button element for a video, this is how you may want to
handle your Picture-in-Picture button visibility.

    if ('pictureInPictureEnabled' in document) {
      // Set button ability depending on whether Picture-in-Picture can be used.
      setPipButton();
      videoElement.addEventListener('loadedmetadata', setPipButton);
      videoElement.addEventListener('emptied', setPipButton);
    } else {
      // Hide button if Picture-in-Picture is not supported.
      pipButtonElement.hidden = true;
    }

    function setPipButton() {
      pipButtonElement.disabled = (videoElement.readyState === 0) ||
                                  !document.pictureInPictureEnabled ||
                                  videoElement.disablePictureInPicture;
    }

## MediaStream video support

Video playing MediaStream objects (e.g. `getUserMedia()`, `getDisplayMedia()`,
`canvas.captureStream()`) also support Picture-in-Picture in Chrome 71. This
means you can show a Picture-in-Picture window that contains user's webcam
video stream, display video stream, or even a canvas element. Note that the
video element doesn't have to be attached to the DOM to enter
Picture-in-Picture as shown below.

### Show user's webcam in Picture-in-Picture window

```js
const video = document.createElement('video');
video.muted = true;
video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
video.play()

// Later on, video.requestPictureInPicture();
```

### Show display in Picture-in-Picture window

```js
const video = document.createElement('video');
video.muted = true;
video.srcObject = await navigator.mediaDevices.getDisplayMedia({ video: true });
video.play();

// Later on, video.requestPictureInPicture();
```

### Show canvas element in Picture-in-Picture window

```js
const canvas = document.createElement('canvas');
// Draw something to canvas.
canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);

const video = document.createElement('video');
video.muted = true;
video.srcObject = canvas.captureStream();
video.play();

// Later on, video.requestPictureInPicture();
```

Combining `canvas.captureStream()` with the [Media Session API], you can for
instance create an audio playlist window in Chrome 74. Check out the official
[Audio playlist sample].

<figure>
  <img src="/web/updates/images/2018/10/audio-playlist.jpg"
       alt="Audio playlist in a Picture-in-Picture window">
  <figcaption>
    <b>Figure 2.</b>
    Audio playlist in a Picture-in-Picture window
  </figcaption>
</figure>

## Samples, demos, and codelabs {: #samples-demos-codelabs }

Check out our official [Picture-in-Picture sample] to try the Picture-in-Picture
Web API.

Demos and codelabs will follow.

## What’s next {: #next }

First, check out the [implementation status page] to know which parts of the
API are currently implemented in Chrome and other browsers.

Here's what you can expect to see in the near future:

- Picture-in-Picture will be supported in Android O.
- Web developers will be able to [add custom Picture-in-Picture controls].

## Resources {: #resources }

- Chrome Feature Status: [https://www.chromestatus.com/feature/5729206566649856]
- Chrome Implementation Bugs: [https://crbug.com/?q=component:Blink>Media>PictureInPicture]
- Picture-in-Picture Web API Spec: [https://wicg.github.io/picture-in-picture]
- Spec Issues: [https://github.com/WICG/picture-in-picture/issues]
- Sample: [https://googlechrome.github.io/samples/picture-in-picture/]
- Unofficial Picture-in-Picture polyfill: [https://github.com/gbentaieb/pip-polyfill/]

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iTC3mfe0DwE"
          data-start="80" data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Many thanks to Mounir Lamouri and [Jennifer Apacible] for their work on
Picture-in-Picture, and help with this article. And a huge thanks to everyone
involved in the [standardization effort].

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}

[Picture-in-Picture Web API]: https://wicg.github.io/picture-in-picture/
[Picture-in-Picture sample]: https://googlechrome.github.io/samples/picture-in-picture/
[WebKit API]: https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_9_0.html
[native Android API]: https://developer.android.com/about/versions/oreo/android-8.0#opip
[announced our intent]: https://developers.google.com/web/updates/2017/09/picture-in-picture
[yet]: https://bugs.chromium.org/p/chromium/issues/detail?id=789591
[promise]: https://developers.google.com/web/fundamentals/primers/promises
[may reject]: https://wicg.github.io/picture-in-picture/#request-pip
[applicable only]: https://github.com/WICG/picture-in-picture/issues/116
[Feature support]: #feature-support
[feature policy]: /web/updates/2018/06/feature-policy
[video enters fullscreen]: https://developer.mozilla.org/en-US/docs/Web/API/Document/fullscreenchange_event
[Media Session sample]: https://googlechrome.github.io/samples/media-session/video.html
[throttling and debouncing]: https://css-tricks.com/debouncing-throttling-explained-examples/
[user may have turned it off]: https://support.google.com/youtube/answer/7552722
[disabled by a feature policy]: https://github.com/WICG/feature-policy/blob/master/features.md#picture-in-picture
[implementation status page]: https://github.com/WICG/picture-in-picture/blob/master/implementation-status.md
[add custom Picture-in-Picture controls]: https://github.com/WICG/picture-in-picture/pull/69
[https://www.chromestatus.com/feature/5729206566649856]: https://www.chromestatus.com/feature/5729206566649856
[https://crbug.com/?q=component:Blink>Media>PictureInPicture]: https://crbug.com/?q=component:Blink>Media>PictureInPicture
[https://wicg.github.io/picture-in-picture]: https://wicg.github.io/picture-in-picture
[https://github.com/WICG/picture-in-picture/issues]: https://github.com/WICG/picture-in-picture/issues
[https://googlechrome.github.io/samples/picture-in-picture/]: https://googlechrome.github.io/samples/picture-in-picture/
[https://github.com/gbentaieb/pip-polyfill/]: https://github.com/gbentaieb/pip-polyfill/
[standardization effort]: https://github.com/WICG/picture-in-picture/issues?utf8=%E2%9C%93&q=
[Jennifer Apacible]: https://twitter.com/japacible
[Media Session API]: /web/updates/2017/02/media-session
[Audio playlist sample]: https://googlechrome.github.io/samples/picture-in-picture/audio-playlist

