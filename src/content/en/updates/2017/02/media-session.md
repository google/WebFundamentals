project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Customize media metadata (title, artist, album name, artwork) and respond to media related events (seek, track change) on the Web with the new Media Session API.

{# wf_updated_on: 2017-02-06 #}
{# wf_published_on: 2017-02-06 #}
{# wf_tags: news,chrome57,media,notifications,play #}
{# wf_featured_image: /web/updates/images/2017/02/tldr.png #}
{# wf_featured_snippet: Finally! We can customize web media notifications (title, artist, album name, artwork) and respond to media related events such as seeking or track changing with the new Media Session API. #}

# Customize Media Notifications & Handle Playlists {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

With the brand new [Media Session API], you can now **customize media
notifications** by providing metadata information such as the title, artist,
album name, and artwork of the media (audio or video) your web app is playing
in Chrome 57 (beta in February 2017, stable in March 2017). It also
allows you to **handle media related events** such as seeking or track
changing which may come from notifications or media keys.

<figure>
  <img src="/web/updates/images/2017/02/tldr.png"
    alt="Media Session TL;DR;"/>
</figure>

## Gimme What I Want

You already know all about the Media Session API and are simply coming back to
copy and paste with no shame some boilerplate code? So here it is.

    if ('mediaSession' in navigator) {

      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Never Gonna Give You Up',
        artist: 'Rick Astley',
        album: 'Whenever You Need Somebody',
        artwork: [
          { src: 'https://dummyimage.com/96x96',   sizes: '96x96',   type: 'image/png' },
          { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' },
          { src: 'https://dummyimage.com/192x192', sizes: '192x192', type: 'image/png' },
          { src: 'https://dummyimage.com/256x256', sizes: '256x256', type: 'image/png' },
          { src: 'https://dummyimage.com/384x384', sizes: '384x384', type: 'image/png' },
          { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' },
        ]
      });

      navigator.mediaSession.setActionHandler('play', function() {});
      navigator.mediaSession.setActionHandler('pause', function() {});
      navigator.mediaSession.setActionHandler('seekbackward', function() {});
      navigator.mediaSession.setActionHandler('seekforward', function() {});
      navigator.mediaSession.setActionHandler('previoustrack', function() {});
      navigator.mediaSession.setActionHandler('nexttrack', function() {});
    }

## Get into the code

### Let's play 🎷

Add a simple `<audio>` tag to your web page and assign several media sources so
that the browser can choose which one works best.

    <audio controls>
      <source src="audio.mp3" type="audio/mp3"/>
      <source src="audio.ogg" type="audio/ogg"/>
    </audio>

Note: I could have used a `<video>` tag as well there to showcase the Media
Session API.

As you may know, `autoplay` is disabled on Chrome for Android which
means we have to use the `play()` method of the audio element there. This
method must be triggered by [a user gesture] such as a touch or a mouse click.
We're talking about listening to
[`pointerup`](/web/updates/2016/10/pointer-events), `click`, and `touchend`
events. In other words, the user must click on a button before your web app can
actually make some noise.

    playButton.addEventListener('pointerup', function(event) {
      let audio = document.querySelector('audio');

      // User interacted with the page. Let's play audio...
      audio.play()
      .then(_ => { /* Set up Media Session... */ })
      .catch(error => { console.log(error) });
    });

If you don't want to play audio right after the first interaction, I recommend
you use the `load()` method of the audio element. This is one way for the
browser to keep track of whether the user interacted with the element. Note
that it may also help the playback to be smoother because the content will be
loaded.

<pre class="prettyprint">

let audio = document.querySelector('audio');

welcomeButton.addEventListener('pointerup', function(event) {
  // User interacted with the page. Let's load audio...
  <strong>audio.load()</strong>
  .then(_ => { /* Show play button for instance... */ })
  .catch(error => { console.log(error) });
});

// Later...
playButton.addEventListener('pointerup', function(event) {
  <strong>audio.play()</strong>
  .then(_ => { /* Set up Media Session... */ })
  .catch(error => { console.log(error) });
});

</pre>

### Customize the notification

When your web app is playing audio, you can already see a media notification
sitting in the notification tray. On Android, Chrome does its best there to show
appropriate information by using the document's title and the largest favicon
it can find.

<div class="clearfix"></div>
<div class="attempt-left">
  <figure>
    <img src="/web/updates/images/2017/02/without-media-session.png" alt="Without Media Session">
    <figcaption>With no Media Session</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="/web/updates/images/2017/02/with-media-session.png" alt="With Media Session">
    <figcaption>With Media Session</figcaption>
  </figure>
</div>

Let's see how to customize this media notification by setting some media
session metadata such as the title, artist, album name, and artwork with the
Media Session API.

    if ('mediaSession' in navigator) {

      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Never Gonna Give You Up',
        artist: 'Rick Astley',
        album: 'Whenever You Need Somebody',
        artwork: [
          { src: 'https://dummyimage.com/96x96',   sizes: '96x96',   type: 'image/png' },
          { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' },
          { src: 'https://dummyimage.com/192x192', sizes: '192x192', type: 'image/png' },
          { src: 'https://dummyimage.com/256x256', sizes: '256x256', type: 'image/png' },
          { src: 'https://dummyimage.com/384x384', sizes: '384x384', type: 'image/png' },
          { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' },
        ]
      });
    }

If your web app provides a playlist for instance, you may want to allow the
user to navigate through your playlist directly from the media notification
with some "Previous Track" and "Next Track" icons.

    let audio = document.createElement('audio');

    let playlist = ['audio1.mp3', 'audio2.mp3', 'audio3.mp3'];
    let index = 0;
    
    navigator.mediaSession.setActionHandler('previoustrack', function() {
      // User clicked "Previous Track" media notification icon.
      index = (index - 1 + playlist.length) % playlist.length;
      playAudio();
    });
    
    navigator.mediaSession.setActionHandler('nexttrack', function() {
      // User clicked "Next Track" media notification icon.
      index = (index + 1) % playlist.length;
      playAudio();
    });

    function playAudio() {
      audio.src = playlist[index];
      audio.play()
      .then(_ => { /* Set up Media Session... */ })
      .catch(error => { console.log(error); });
    }

    playButton.addEventListener('pointerup', function(event) {
      playAudio();
    });

The Media Session API allows you as well to show "Seek Backward" and "Seek
Forward" media notification icons if you want to control the amount of time
skipped.

    let skipTime= 10; /* Time to skip in seconds */

    navigator.mediaSession.setActionHandler('seekbackward', function() {
      // User clicked "Seek Backward" media notification icon.
      audio.currentTime = Math.max(audio.currentTime - skipTime, 0);
    });
    
    navigator.mediaSession.setActionHandler('seekforward', function() {
      // User clicked "Seek Forward" media notification icon.
      audio.currentTime = Math.min(audio.currentTime + skipTime, audio.duration);
    });

The "Play/Pause" icon is always shown in the media notification and the related
events are handled automatically by the browser. If for some reason the default
behaviour doesn't work out, you can still handle "Play" and "Pause" media events.

    navigator.mediaSession.setActionHandler('play', function() {
      // User clicked "Play" media notification icon.
      // Do something more than just playing current audio...
    });

    navigator.mediaSession.setActionHandler('pause', function() {
      // User clicked "Pause" media notification icon.
      // Do something more than just pausing current audio...
    });

Note: As the browser may consider the web app is not be playing when media
files are seeking or loading, you can override this behaviour by setting
`navigator.mediaSession.playbackState` to `"playing"` or `"paused"`.  This
comes handy when you want to make sure your web app UI stays in sync with the
media notification controls.

The cool thing about the Media Session API is that the notification tray is not
the only place where media metadata and controls are visible. The media
notification is synced automagically to any paired wearable device. And it also
shows up on lock screens.

<div class="clearfix"></div>
<div class="attempt-left">
  <figure>
    <img src="/web/updates/images/2017/02/lock-screen.png" alt="Lock Screen">
    <figcaption>Lock screen</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="/web/updates/images/2017/02/wear.png" alt="Wear Notification">
    <figcaption>Wear Notification</figcaption>
  </figure>
</div>
<div class="clearfix"></div>

## Make it play nice offline

I know what you're thinking now... *[Service Worker] to the rescue!*

True but first and foremost, you want to make sure **all items in this
checklist are checked**:

1. All media and artwork files are served with the appropriate `Cache-Control`
HTTP header. This will allow the browser to cache and reuse previously fetched
resources. See the [Caching checklist].
2. Make sure all media and artwork files are served with the
`Allow-Control-Allow-Origin: *` HTTP header. This will allow third-party web
apps to fetch and consume HTTP responses from your web server.

### The Service Worker caching strategy

Regarding media files, I would recommend a simple "[Cache, falling back to
network]" strategy as illustrated by Jake Archibald.

For artworks though, I'd be a little bit more specific and choose the approach
below:

- `If` artwork is already in cache, serve it from the cache
- `Else` fetch artwork from network
    - `If` fetch is successful, add network artwork to the cache and serve it
    - `Else` serve fallback artwork from the cache

That way, media notifications would always have a nice artwork icon even when
browser can't fetch it. Here's how you could implement this for instance:

    const FALLBACK_ARTWORK_URL = 'fallbackArtwork.png';
    
    self.addEventListener('install', event => {
      self.skipWaiting();
      event.waitUntil(initArtworksCache());
    });
    
    function initArtworksCache() {
      caches.open('artworks-cache-v1')
      .then(cache => cache.add(FALLBACK_ARTWORK_URL));
    }
    
    self.addEventListener('fetch', event => {
      if (/artwork-[0-9]+\.png$/.test(event.request.url)) {
        event.respondWith(handleFetchArtwork(event.request));
      }
    });
    
    function handleFetchArtwork(request) {
      // Return cache request if it's in the cache already, otherwise fetch
      // network artwork.
      return getCacheArtwork(request)
      .then(cacheResponse => cacheResponse || getNetworkArtwork(request));
    }
    
    function getCacheArtwork(request) {
      return caches.open('artworks-cache-v1')
      .then(cache => cache.match(request));
    }
    
    function getNetworkArtwork(request) {
      // Fetch network artwork.
      return fetch(request)
      .then(networkResponse => {
        if (networkResponse.status !== 200) {
          return Promise.reject('Network artwork response is not valid');
        }
        // Add artwork to the cache for later use and return network response.
        addArtworkToCache(request, networkResponse.clone())
        return networkResponse;
      })
      .catch(error => {
        // Return cached fallback artwork.
        return getCacheArtwork(new Request(FALLBACK_ARTWORK_URL))
      });
    }
    
    function addArtworkToCache(request, response) {
      return caches.open('artworks-cache-v1')
      .then(cache => cache.put(request, response));
    }

Caution: If you want your service worker to be able to intercept artwork
network requests on [the very first page load], you may want to call
`clients.claim()` within your service worker once it's activated.

### Let user control cache

As user will consume content from your web app, media files and artworks may
take a lot of space on user's device. It is **your responsibility to show how
much cache is used and give user the ability to clear it**. Thankfully for us,
doing so is pretty easy with the [Cache API].

    // Here's how I'd compute how much cache is used by artworks... 
    caches.open('artworks-cache-v1')
    .then(cache => cache.matchAll())
    .then(responses => Promise.all(responses.map(r => r.blob())))
    .then(blobs => blobs.map(blob => blob.size).reduce((acc, cur) => acc + cur, 0))
    .then(cacheSize => { console.log('Artworks cache is ' + cacheSize + ' bytes.'); })
    .catch(error => { console.log(error); });

    // And here's how to delete some artworks...
    const artworksToDelete = ['artwork1.png', 'artwork2.png', 'artwork3.png'];

    caches.open('artworks-cache-v1')
    .then(cache => Promise.all(artworksToDelete.map(artwork => cache.delete(artwork))))
    .catch(error => { console.log(error); });

## Implementation nits

- Chrome for Android requests "full" audio focus to show media notifications
  only when media files duration is [at least 5 seconds].
- If no artwork is defined and there is a favicon at a desirable size, media
  notifications will use it.
- Notification artwork size in Chrome for Android is `512x512`. For
  [low-end devices], it is `256x256`.
- Dismiss media notifications with `audio.src = ''`.
- As the [Web Audio API] doesn't request Android Audio Focus for historical
  reasons, the only way to make it work with the Media Session API is to hook
  up an `<audio>` element as the input source to the Web Audio API. Hopefully,
  the proposed [Web AudioFocus API] will help improving that situation in a
  near future.

## Support

At the time of writing, Chrome for Android is the only platform that supports
the Media Session API. More up-to-date information on browser implementation
status can be found on [chromestatus.com].

## Samples & Demos

Check out our official [Media Session Chrome samples].

## Resources

- Chrome Feature Status: [https://www.chromestatus.com/feature/5639924124483584](https://www.chromestatus.com/feature/5639924124483584)
- Media Session Spec: [https://wicg.github.io/mediasession](https://wicg.github.io/mediasession)
- Spec Issues: [https://github.com/WICG/mediasession/issues](https://github.com/WICG/mediasession/issues)
- Chrome Bugs: [https://crbug.com/?q=component:Internals>Media>Session](https://crbug.com/?q=component:Internals>Media>Session)

{% include "comment-widget.html" %}

[Media Session API]: https://wicg.github.io/mediasession/
[a user gesture]: https://html.spec.whatwg.org/multipage/interaction.html#activation
[low-end devices]: https://chromium.googlesource.com/chromium/src/+/a66fe8713400ed760cd5d78931e536f33c5828d5/chrome/android/java/src/org/chromium/chrome/browser/media/ui/MediaNotificationManager.java#514
[Service Worker]: /web/fundamentals/instant-and-offline/service-worker/lifecycle
[Caching checklist]: /web/fundamentals/performance/optimizing-content-efficiency/http-caching
[Cache, falling back to network]: https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
[the very first page load]: /web/fundamentals/instant-and-offline/service-worker/lifecycle#clientsclaim
[at least 5 seconds]: https://chromium.googlesource.com/chromium/src/+/5d8eab739eb23c4fd27ba6a18b0e1afc15182321/media/base/media_content_type.cc#10 
[Cache API]: /web/fundamentals/instant-and-offline/web-storage/offline-for-pwa
[Media Session Chrome Samples]: https://googlechrome.github.io/samples/media-session
[Web Audio API]: /web/updates/2012/02/HTML5-audio-and-the-Web-Audio-API-are-BFFs
[chromestatus.com]: https://www.chromestatus.com/feature/5639924124483584?embed
[Web AudioFocus API]: https://wicg.github.io/audio-focus/explainer.html
