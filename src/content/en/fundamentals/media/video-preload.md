project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Preload all video for faster playback.

{# wf_published_on: 2017-06-21 #}
{# wf_updated_on: 2017-06-21 #}

# Video Preload = Faster Playback {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque suscipit
nibh nec feugiat ornare. Nam tristique, magna non pharetra mollis, diam elit
faucibus nibh, ut condimentum diam metus vel dolor. Integer facilisis magna at
ex bibendum luctus. In eu tincidunt ipsum. Duis scelerisque, tortor quis
condimentum finibus, est neque mollis leo, at imperdiet justo elit dapibus
nisl. Integer gravida dapibus turpis, vel scelerisque dolor scelerisque eget.
Sed dolor lectus, tempor vulputate bibendum eget, accumsan lobortis ex.

Unless specified otherwise, this article also applies to the audio element.

## Video preload attribute

If the video source is an unique file hosted on a web server, you may want to
use the video `preload` attribute to provide a hint to the browser as to [how
much information or content to preload]. In other words, [Media Source
Extensions (MSE)] is not compatible with `preload`.

Setting `preload` value to `metadata` indicates that the user is not expected
to need the video, but that fetching its metadata (dimensions, first frame,
track list, duration, and so on) is desirable.

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

With `preload` value set to `auto`, we're saying that downloading the entire
video right away is considered desirable.

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

- When [Data Saver]{: .external} is enabled, Chrome forces `preload` value to
  `none` if video URL starts with "http" or "https".
- In Android 4.3, Chrome forces `preload` value to `none`.
- On a cellular connection (2G, 3G, and 4G), Chrome forces `preload` value to
  `metadata`.

## Link preload

As [covered] in other [articles]{: .external }, [link preload]{: .external} is
a declarative fetch that allows you to force the browser to make a request for
a resource without blocking the document's `onload` event. Resources loaded via
`<link rel="preload">` are stored locally in the browser, and are effectively
inert until they're explicitely referenced in the DOM, JavaScript, or CSS. 

Preload is different from prefetch in that it focuses on current navigation and
fetches resources with priority based on their type (script, style, font,
video, audio, etc.). It should be used to warm up the browser cache for current
sessions.

<figure class="TODO">
  <img src="/web/fundamentals/media/images/video-preload/link-preload.png">
</figure>

### Preload full video

Here's how to use it to preload a full video  on your website so that
when your JavaScript asks to fetch video content, it is read from disk cache as
the resource may have already been cached by the browser. If preload request
didn't finish yet, a regular network fetch will happen. I'd recommend using
this only for audio songs or short video clips.

```
<link rel="preload" as="video" href="https://cdn.com/file.mp4" crossorigin>

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

As the preloaded resource is going to be consumed by a video element in the
example, the `as` preload link value is `video`. If it were an audio element,
it would be `as="audio"`.

If you are preloading links with CORS enabled resources you must also include
the `crossorigin` attribute in order for the resource to be properly used.

### Preload first segment

Here's another example below of how to preload the first segment of a video
with `<link rel="preload">` and use it with Media Source Extensions. If you're
not familiar with the MSE Javascript API, please read [MSE basics].

For the sake of simplicity, let's assume the entire video has been split into
smaller files like "file_1.webm", "file_2.webm", "file_3.webm", etc. We'll use
MSE to feed the video element with those once the `onload` event from `<link
rel="preload">` has been fired.

```
<link rel="preload" as="video" href="https://cdn.com/file_1.webm" crossorigin onload="loadVideo()">

<video id="video" controls></video>

<script>
  // This function is automatically executed when the first segment of video is
  // preloaded successfully. We may call it explicitely as well later on.
  function loadVideo() {
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
    });
  }
</script>
```

### Support

As it is not supported in every browser yet, you may want to detect its
availability with the snippet below.

```
function preloadSupported() {
  const relList = document.createElement('link').relList;
  if (!relList || !relList.supports)
    return false;
  return relList.supports('preload');
}
```

## Manual Buffering

Before we dive into the Cache API and Service Workers, let's see how to
manually buffer a video with MSE. The example below assumes that your web
server supports HTTP range requests. Note that this would be pretty similar
with segment files.

```
<video controls id="video"></video>

<script>
  const mediaSource = new MediaSource();
  video.src = URL.createObjectURL(mediaSource);
  mediaSource.addEventListener('sourceopen', sourceOpen);
   
  function sourceOpen() {
    URL.revokeObjectURL(video.src);
    const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp9"');
   
    // Fetch the beginning of the video.
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
  }

  // Fetch the rest of the video when user starts playing video.
  video.addEventListener('play', fetchSecondSegment, { once: true });
 
  function fetchSecondSegment() {
    fetch('file.webm', { headers: { range: 'bytes=567140-1196488' } })
    .then(response => response.arrayBuffer())
    .then(data => {
      mediaSource.sourceBuffers[0].appendBuffer(data);
    });
  }
</script>
```

### Pre-cache multiple first segments

Now, what if I want to speculatively pre-load some media content without
knowing which piece of media user will eventually pick. If user is on a web
page that contains 10 videos, we probably have enough memory to fetch 1 segment
file from each but we should definitely not create 10 hidden video elements and
10 `MediaSource` objects and start feeding that data.

The 2-parts example below shows you how to pre-cache multiple first segments of
video using the powerful and easy-to-use Cache API. Note that something similar
can be achieved with IndexedDB as well.

#### Part 1: Fetch and cache

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

Note that if were to use HTTP Range request, I'd have to recreate manually a
`Response` object as the Cache API doesn't support range responses yet. Be
mindful that calling `networkResponse.arrayBuffer()` fetches the
whole content of the response at once into renderer memory, hence why you may
want to use small ranges. 

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

#### Part 2: Play video

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
  .then(cache => fetchAndCache(videoFileUrl, cache))
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
        // TODO: Fetch the next chunk of the video when video starts to play...
      });
    }
  });
}
```

Warning: For cross-origin resources, make sure your CORS headers are set
properly as opaque responses retrieved with `fetch(videoFileUrl, { mode:
'no-cors' })` are not allowed to feed any video or audio element.

### Create your range responses with a Service Worker

What if you fetched an entire video file and saved it in the Cache API. When
browser asks for a Range request, you certainly don't want to bring the entire
video into renderer memory.

Let me show how to intercept these requests and return a customized range
request from a Service Worker. Note that this snippet uses [Async functions]
for readability.

```
addEventListener('fetch', event => {
  event.respondWith(loadFromCacheOrFetch(event.request));
});
 
async function loadFromCacheOrFetch(request) {
  // Search through all available caches for this request.
  return caches.match(request)
  .then(response => {
 
    // Fetch from network if it's not already in the cache.
    if (!response) {
      return fetch(request);
    }
 
    // Browser asks for a range request. Let's provide one reconstructed
    // manually from the cache.
    if (request.headers.has('range')) {
      const pos = Number(/^bytes\=(\d+)\-$/g.exec(request.headers.get('range'))[1]);
      const options = {
        status: 206,
        statusText: 'Partial Content',
        headers: response.headers
      }
      const data = await response.blob();

      const slicedResponse = new Response(data.slice(pos), options);
      slicedResponse.setHeaders('Content-Range': 'bytes ' + pos + '-' +
          (data.size - 1) + '/' + data.size);
      slicedResponse.setHeaders('X-From-Cache': 'true');

      return slicedResponse;
    }
 
    return response;
  }
}
```

It is important to note that I used `response.blob()` to recreate this sliced
response as this simply gives me a handle to the file.

My custom `X-From-Cache` HTTP header can be used to know whether this request
came from the cache or from the network. It can be used by a player such as
ShakaPlayer to ignore the response time as an indicator of network speed.


[how much information or content to preload]: /web/fundamentals/media/video#preload
[video preload attribute]: /web/fundamentals/media/video#preload
[Data Saver]: https://support.google.com/chrome/answer/2392284
[Media Source Extensions (MSE)]: /web/fundamentals/media/mse/basics
[covered]: /web/updates/2016/03/link-rel-preload
[articles]: https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/
[link preload]: https://w3c.github.io/preload/
[MSE Basics]: /web/fundamentals/media/mse/basics
[Cache]: /web/fundamentals/instant-and-offline/web-storage/offline-for-pwa

