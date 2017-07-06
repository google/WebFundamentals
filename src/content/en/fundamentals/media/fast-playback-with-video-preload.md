project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Preload video and audio for faster playback.

{# wf_published_on: 2017-07-05 #}
{# wf_updated_on: 2017-07-05 #}

# Fast Playback with Video Preload {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

<video controls controlsList="nodownload" muted playsinline style="width: 100%">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/video-preload-hero.webm#t=0.7"
          type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/video-preload-hero.mp4#t=1"
          type="video/mp4">
</video>

Faster playback means more people watching your video. That's a known fact.
I'll explore in this article different techniques you can use to accelerate
your media playback by actively preloading resources depending on your use
case.

Note: Unless specified otherwise, this article also applies to the audio element.

### TL;DR {: .hide-from-toc }

<table>
  <tbody>
    <tr>
      <th></th>
      <th>
It's great...
      </th>
      <th>
But...
      </th>
    </tr>
    <tr>
      <td rowspan=3 style="white-space: nowrap">
<a href="#video_preload_attribute">Video preload attribute</a>
      </td>
      <td rowspan=3>
Simple to use for an unique file hosted on a web server
      </td>
      <td>
Browser may completely ignore the attribute
      </td>
    <tr>
      <td>
Resource fetching starts when HTML document has been completely loaded and
parsed
      </td>
    </tr>
    <tr>
      <td>
MSE is not compatible
      </td>
    </tr>
    <tr>
      <td rowspan=2 style="white-space: nowrap">
<a href="#link_preload">Link preload</a>
      </td>
      <td>
Forces the browser to make a request for a video resource without blocking
the document's <code>onload</code> event
      </td>
      <td>
HTTP Range requests are not compatible
      </td>
    <tr>
      <td>
Compatible with MSE and segment files
      </td>
      <td>
Should be used only for audio files or short video clips when fetching full
resource
      </td>
    </tr>
    <tr>
      <td>
<a href="#manual_buffering">Manual buffering</a>
      </td>
      <td>
Full control
      </td>
      <td>
Complex error handling is website responsibility
      </td>
    </tr>
  </tbody>
</table>

## Video preload attribute

If the video source is an unique file hosted on a web server, you may want to
use the video `preload` attribute to provide a hint to the browser as to [how
much information or content to preload]. This means [Media Source Extensions
(MSE)] is not compatible with `preload`.

Resource fetching will start only when initial HTML document has been
completely loaded and parsed (eg. `DOMContentLoaded` event) while the very
different `load` event will be fired when resource has actually been fetched.

<figure class="TODO">
  <img src="/web/fundamentals/media/images/video-preload/video-preload.svg">
</figure>

Setting `preload` value to `metadata` indicates that the user is not expected
to need the video, but that fetching its metadata (dimensions, track list,
duration, and so on) is desirable.

```
<video id="video" preload="metadata" src="file.mp4" controls></video>

<script>
  video.addEventListener('progress', function() {
    if (video.buffered.length === 0) return;

    var bufferedSeconds = video.buffered.end(0) - video.buffered.start(0);
    console.log(bufferedSeconds + ' seconds of video are ready to play!');
  });
</script>
```

Setting `preload` value to `auto` indicates that the browser should cache
enough such that the playback to end would be possible without requiring a stop
for further buffering.

```
<video id="video" preload="auto" src="file.mp4" controls></video>

<script>
  video.addEventListener('progress', function() {
    if (video.buffered.length === 0) return;

    var bufferedSeconds = video.buffered.end(0) - video.buffered.start(0);
    console.log(bufferedSeconds + ' seconds of video are ready to play!');
  });
</script>
```

There are some caveats though. As this is just a hint, browser may completely
ignore the `preload` attribute. At the time of writing, here are some rules
applied in Chrome:

- When [Data Saver] is enabled, Chrome forces `preload` value to `none`.
- In Android 4.3, Chrome forces `preload` value to `none`.
- On a cellular connection (2G, 3G, and 4G), Chrome forces `preload` value to
  `metadata`.

### Tips

If your website contains plenty of video resources on the same domain, I would
recommend you set the `preload` value to `metadata` or define the `poster`
attribute and set `preload` value to `none`. That way, you would avoid hitting
the maxmium number of HTTP connections per host (6 in Chrome at the time of
writing) which can hang loading of resources. Note that this may also improve
page speed if video aren't part of your core user experience.

## Link preload

As [covered] in other [articles], [link preload] is a declarative fetch that
allows you to force the browser to make a request for a resource without
blocking the document's `onload` event. Resources loaded via `<link
rel="preload">` are stored locally in the browser, and are effectively inert
until they're explicitely referenced in the DOM, JavaScript, or CSS.

Preload is different from prefetch in that it focuses on current navigation and
fetches resources with priority based on their type (script, style, font,
video, audio, etc.). It should be used to warm up the browser cache for current
sessions.

<figure class="TODO">
  <img src="/web/fundamentals/media/images/video-preload/link-preload.svg">
</figure>

### Preload full video

Here's how to preload a full video  on your website so that when your
JavaScript asks to fetch video content, it is read from disk cache as the
resource may have already been cached by the browser. If preload request hasn't
finished yet, a regular network fetch will happen.

```
<link rel="preload" as="video" href="https://cdn.com/small-file.mp4">

<video id="video" controls></video>

<script>
  // Later on, after some condition has been met, set video source to the
  // preloaded video URL.
  video.src = 'https://cdn.com/file.mp4';
  video.play().then(_ => {
    // If preloaded video URL was already cached, playback started immediately.
  });
</script>
```

Note: I would recommend using this only for audio files or short video clips.

Because the preloaded resource is going to be consumed by a video element in
the example, the `as` preload link value is `video`. If it were an audio
element, it would be `as="audio"`.

### Preload first segment

The example below shows how to preload the first segment of a video with `<link
rel="preload">` and use it with Media Source Extensions. If you're not familiar
with the MSE Javascript API, please read [MSE basics].

For the sake of simplicity, let's assume the entire video has been split into
smaller files like "file_1.webm", "file_2.webm", "file_3.webm", etc. We'll use
MSE to feed the video element with those once the `onload` event from `<link
rel="preload">` has been fired.

```
<link rel="preload" as="video" href="https://cdn.com/file_1.webm"
    onload="preloadFinished()" onerror="preloadFailed()">

<video id="video" controls></video>

<script>
  // This function is automatically executed when the first segment of video is
  // preloaded successfully. We may call it explicitely as well later on.
  function preloadFinished() {
    const mediaSource = new MediaSource();
    video.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', sourceOpen);
  }

  function sourceOpen(event) {
    URL.revokeObjectURL(video.src);
    const mediaSource = event.target;
    const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp9"');

    // If video is preloaded already, fetch will return immediately a response
    // from the browser cache (memory cache). Otherwise, it will perform a
    // regular network fetch.
    fetch('https://cdn.com/file_1.webm')
    .then(response => response.arrayBuffer())
    .then(data => {
      // Append the data into the new sourceBuffer.
      sourceBuffer.appendBuffer(data);
      // TODO: Fetch file_2.webm when user starts playing video.
    })
    .catch(error => {
      // TODO: Show "Video is not available" message to user.
    });
  }

  // This function is called if the first segment of video is not available.
  function preloadFailed() {
    // TODO: Show "Video is not available" message to user.
  }
</script>
```

Warning: For cross-origin resources, make sure your CORS headers are set
properly as opaque responses retrieved with `fetch(videoFileUrl, { mode:
'no-cors' })` are not allowed to feed any video or audio element.

### Support

As it is not supported in every browser yet, you may want to detect its
availability with the snippet below.

```
<link rel="preload" as="video" href="https://cdn.com/file_1.webm"
    onload="preloadFinished()" onerror="preloadFailed()">

<video id="video" controls></video>

<script>
  if (!preloadVideoSupported()) {
    // TODO: Fetch video from the network and load it.
  }

  function preloadFinished() {
    // TODO: Load video.
  }

  function preloadFailed() {
    // TODO: Show "Video is not available" message to user.
  }

  function preloadVideoSupported() {
    const link = document.createElement('link');
    link.as = 'video';
    return (link.as === 'video');
  }
</script>
```

## Manual Buffering

Before we dive into the [Cache API] and service workers, let's see how to
manually buffer a video with MSE. The example below assumes that your web
server supports HTTP Range requests. Note that this would be pretty similar to
segment files. It exists some middleware libraries such as [Google's Shaka
Player], [JW Player], and [Video.js] dedicated to this.

```
<video id="video" controls></video>

<script>
  const mediaSource = new MediaSource();
  video.src = URL.createObjectURL(mediaSource);
  mediaSource.addEventListener('sourceopen', sourceOpen);

  function sourceOpen() {
    URL.revokeObjectURL(video.src);
    const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp9"');

    // Fetch beginning of the video by setting the Range HTTP request header.
    fetch('file.webm', { headers: { range: 'bytes=0-567139' } })
    .then(response => response.arrayBuffer())
    .then(data => {
      sourceBuffer.appendBuffer(data);
      sourceBuffer.addEventListener('updateend', updateEnd, { once: true });
    });
  }

  function updateEnd() {
    // Video is now ready to play!
    var bufferedSeconds = video.buffered.end(0) - video.buffered.start(0);
    console.log(bufferedSeconds + ' seconds of video are ready to play!');

    // Fetch the rest of the video when user starts playing video.
    video.addEventListener('playing', fetchNextSegment, { once: true });
  }

  function fetchNextSegment() {
    fetch('file.webm', { headers: { range: 'bytes=567140-1196488' } })
    .then(response => response.arrayBuffer())
    .then(data => {
      const sourceBuffer = mediaSource.sourceBuffers[0];
      sourceBuffer.appendBuffer(data);
    });
  }
</script>
```

### Battery awareness

I would suggest you take into account the battery level of user's device before
thinking about preloading a video in order to preserve battery life when the
power level is low.

Please disable preload or at least preload a lower resolution video when the
device is running out of battery.


```
if ('getBattery' in navigator) {
  navigator.getBattery()
  .then(battery => {
    // If battery is charging or battery level is high enough
    if (battery.charging || battery.level > 0.15) {
      // TODO: Preload the first segment of a video.
    } else {
      // TODO: Enable some kind of Power Saving mode.
    }
  });
} else {
  // Battery Status API is not supported.
  // TODO: Preload the first segment of a video.
}
```


### Pre-cache multiple first segments

Now, what if I want to speculatively pre-load some media content without
knowing which piece of media user will eventually pick. If user is on a web
page that contains 10 videos, we probably have enough memory to fetch one
segment file from each but we should definitely not create 10 hidden video
elements and 10 `MediaSource` objects and start feeding that data.

The 2-parts example below shows you how to pre-cache multiple first segments of
video using the powerful and easy-to-use Cache API. Note that something similar
can be achieved with IndexedDB as well. We're not using service workers yet as
the Cache API is also accessible from the Window object.

#### Fetch and cache

```
const videoFileUrls = [
  'bat_video_file_1.webm',
  'cow_video_file_1.webm',
  'dog_video_file_1.webm',
  'fox_video_file_1.webm',
];

// Let's create a video pre-cache and store all first segments of videos inside.
caches.open('video-pre-cache')
.then(cache => Promise.all(videoFileUrls.map(videoFileUrl => fetchAndCache(videoFileUrl, cache))));

function fetchAndCache(videoFileUrl, cache) {
  // Check first if video is in the cache.
  return cache.match(videoFileUrl)
  .then(cacheResponse => {
    // Let's return cached response if video is already in the cache.
    if (cacheResponse) {
      return cacheResponse;
    }
    // Otherwise, fetch the video from the network.
    return fetch(videoFileUrl)
    .then(networkResponse => {
      // Add the response to the cache and return network response in parallel.
      cache.put(videoFileUrl, networkResponse.clone());
      return networkResponse;
    });
  });
}
```

Note that if were to use HTTP Range request, I would have to recreate manually
a `Response` object as the Cache API doesn't support Range responses [yet]. Be
mindful that calling `networkResponse.arrayBuffer()` fetches the whole content
of the response at once into renderer memory, hence why you may want to use
small ranges.

For reference, here's the modified part of the code above to save HTTP Range
requests to the video pre-cache.

```
    ...
    return fetch(videoFileUrl, { headers: { range: 'bytes=0-567139' } })
    .then(networkResponse => networkResponse.arrayBuffer())
    .then(data => {
      const response = new Response(data);
      // Add the response to the cache and return network response in parallel.
      cache.put(videoFileUrl, response.clone());
      return response;
    });
```

#### Play video

When user clicks a play button, we'll fetch first segment of video available in
the Cache API so that playback starts immediately if available. Otherwise,
we'll simply fetch it from the network. Keep in mind that browser and users may
decide to clear the [Cache].

As seen before, we use MSE to feed that first segment of video to the video
element.

```
function onPlayButtonClick(videoFileUrl) {
  video.load(); // Used to be able to play video later.

  caches.open('video-pre-cache')
  .then(cache => fetchAndCache(videoFileUrl, cache)) // Defined above.
  .then(response => response.arrayBuffer())
  .then(data => {
    const mediaSource = new MediaSource();
    video.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', sourceOpen);

    function sourceOpen() {
      URL.revokeObjectURL(video.src);

      const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp9"');
      sourceBuffer.appendBuffer(data);
      sourceBuffer.addEventListener('updateend', updateEnd, { once: true });
    }

    function updateEnd() {
      video.play()
      .then(_ => {
        // TODO: Fetch the rest of the video when user starts playing video.
      });
    }
  });
}
```

Warning: For cross-origin resources, make sure your CORS headers are set
properly as opaque responses retrieved with `fetch(videoFileUrl, { mode:
'no-cors' })` are not allowed to feed any video or audio element.

### Create Range responses with a Service Worker

Now what if you fetched an entire video file and saved it in the Cache API. When
browser sends a HTTP Range request, you certainly don't want to bring the entire
video into renderer memory as the Cache API doesn't support Range responses yet.

So let me show how to intercept these requests and return a customized Range
response from a service worker.

```
addEventListener('fetch', event => {
  event.respondWith(loadFromCacheOrFetch(event.request));
});

function loadFromCacheOrFetch(request) {
  // Search through all available caches for this request.
  return caches.match(request)
  .then(response => {

    // Fetch from network if it's not already in the cache.
    if (!response) {
      return fetch(request);
    }

    // Browser sends a HTTP Range request. Let's provide one reconstructed
    // manually from the cache.
    if (request.headers.has('range')) {
      return response.blob()
      .then(data => {

        // Get start position from Range request header.
        const pos = Number(/^bytes\=(\d+)\-$/g.exec(request.headers.get('range'))[1]);
        const options = {
          status: 206,
          statusText: 'Partial Content',
          headers: response.headers
        }
        const slicedResponse = new Response(data.slice(pos), options);
        slicedResponse.setHeaders('Content-Range': 'bytes ' + pos + '-' +
            (data.size - 1) + '/' + data.size);
        slicedResponse.setHeaders('X-From-Cache': 'true');

        return slicedResponse;
      });
    }

    return response;
  }
}
```

It is important to note that I used `response.blob()` to recreate this sliced
response as this simply gives me a handle to the file while
`response.arrayBuffer()` brings the entire file into renderer memory.

My custom `X-From-Cache` HTTP header can be used to know whether this request
came from the cache or from the network. It can be used by a player such as
[ShakaPlayer] to ignore the response time as an indicator of network speed.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="f8EGZa32Mts"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Have a look at the official [Sample Media App] and in particular its
[ranged-response.js] file for a complete solution in how to handle Range
requests.


<div class="clearfix"></div>

[how much information or content to preload]: /web/fundamentals/media/video#preload
[video preload attribute]: /web/fundamentals/media/video#preload
[Data Saver]: https://support.google.com/chrome/answer/2392284
[Media Source Extensions (MSE)]: /web/fundamentals/media/mse/basics
[covered]: /web/updates/2016/03/link-rel-preload
[articles]: https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/
[link preload]: https://w3c.github.io/preload/
[MSE Basics]: /web/fundamentals/media/mse/basics
[Cache]: /web/fundamentals/instant-and-offline/web-storage/offline-for-pwa
[ShakaPlayer]: https://github.com/google/shaka-player/blob/master/docs/tutorials/service-worker.md
[Sample Media App]: https://github.com/GoogleChrome/sample-media-pwa
[ranged-response.js]: https://github.com/GoogleChrome/sample-media-pwa/blob/master/src/client/scripts/ranged-response.js
[Cache API]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[yet]: https://github.com/whatwg/fetch/issues/144
[Google's Shaka Player]: https://github.com/google/shaka-player
[JW Player]: https://developer.jwplayer.com/
[Video.js]: http://videojs.com/
