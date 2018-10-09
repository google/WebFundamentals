project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Background fetch lets you handle large downloads, even if the browser closes.

{# wf_updated_on: 2018-10-09 #}
{# wf_published_on: 2018-10-05 #}
{# wf_tags: serviceworker #}
{# wf_featured_image: /web/updates/images/generic/timeline.png #}
{# wf_featured_snippet: Background fetch lets you handle large downloads, even if the browser closes. #}
{# wf_blink_components: Blink>BackgroundFetch #}

# Introducing background fetch {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

In 2015 we [introduced background sync](/web/updates/2015/12/background-sync) which allows the
service worker to defer work until the user has connectivity. This means the user could type a
message, hit send, and leave the site knowing that the message will be sent either now, or when they
have connectivity.

It's a useful feature, but it requires the service worker to be alive for the duration of the
"work". That isn't a problem for short bits of work like sending a message, but if the task takes
too long the browser will kill the service worker, otherwise it's a risk to the user's privacy and
battery.

So, what if you need to download something that might take a long time, like a movie, podcasts, or
levels of a game. That's what background fetch is for. Background fetch is a [web
standard](https://wicg.github.io/background-fetch/) implemented behind the *Experimental Web
Platform features* flag in Chrome 71.

This is also being run as an Origin Trial. If you're interested in testing this API with real users
(without a flag), [see below](#origin-trial)

## The model

A background fetch goes like this:

1. You tell the browser to perform a group of fetches in the background.
1. The browser fetches those things, displaying progress to the user.
1. Once the fetch has completed or failed, the browser opens your service worker and fires an event
   to tell you what happened. This is where you decide what to do with the responses, if anything.

If the user closes pages to your site after step 1, that's ok, the download will continue. Because
the fetch is highly visible and easily abortable, there isn't the privacy concern of a way-too-long
background sync task. Because the service worker isn't constantly running, there isn't the concern
that it could abuse the system, such as mining bitcoin in the background.

On some platforms (such as Android) it's possible for the browser to close after step 1, as the
browser can hand off the fetching to the operating system.

If the user goes offline, the background fetch will be paused and resumed later.

Here's what it looks like for the user:

TODO: video demo

[Try the demo yourself](https://bgfetch-http203.glitch.me/) and [browse the
code](https://glitch.com/edit/#!/bgfetch-http203?path=public/client.js). It requires Chrome 71, and
the *Experimental Web Platform features* flag.

## The API

### Feature detect

As with any new feature, you want to detect if the browser supports it. For background fetch, it's
as simple as:

    if ('BackgroundFetchManager' in self) {
      // This browser supports background fetch!
    }

### Starting a background fetch

The main API hangs off a [service worker](/web/fundamentals/primers/service-workers/) registration,
so make sure you've registered a service worker first. Then:

    navigator.serviceWorker.ready.then(async (swReg) => {
      const bgFetch = await swReg.backgroundFetch.fetch('my-fetch', ['/podcast.mp3'], {
        title: 'Downloading podcast',
        icons: [{
          sizes: '300x300',
          src: '/podcast-icon.png',
          type: 'image/png',
        }],
        downloadTotal: 60 * 1024 * 1024,
      });
    });

Note: Many examples in this article use async functions. If you aren't familiar with them, [check
out the guide](/web/fundamentals/primers/async-functions).

`backgroundFetch.fetch` takes three arguments:

<table class="responsive">
  <tbody>
    <tr><th colspan=2>Parameters</th></tr>
    <tr>
      <td><code>id</code></td>
      <td><code>string</code><br>uniquely identifies this background fetch.
      <p><code>backgroundFetch.fetch</code> will reject the ID matches an existing background
      fetch.</p></td>
    </tr>
    <tr>
      <td><code>requests</code></td>
      <td><code>Array&lt;<a
      href="https://developer.mozilla.org/en-US/docs/Web/API/Request">Request</a>|string&gt;</code>
      <br>The things to fetch. Strings will be treated as URLs, and turned into
      <code>Request</code>s via <code>new Request(theString)</code>.
      <p>You can fetch things from other origins as long as the resources allow it via
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">CORS</a>.</p>
      </td>
    </tr>
    <tr>
      <td><code>options</code></td>
      <td>An object which may include the following:</td>
    </tr>
    <tr>
      <td><code>options.title</code></td>
      <td><code>string</code><br>A title for the browser to display along with progress.</td>
    </tr>
    <tr>
      <td><code>options.icons</code></td>
      <td><code>Array&lt;<a
      href="https://developer.mozilla.org/en-US/docs/Web/Manifest">IconDefinition</a>&gt;</code><br>
      An array of objects with a `src`, `size`, and `type`.</td>
    </tr>
    <tr>
      <td><code>options.downloadTotal</code></td>
      <td><code>number</code><br>The total size of the response bodies (after being un-gzipped).
      <p>Although this is optional, it's strongly recommended that you provide it. It's used to tell
      the user how big the download is, and to provide progress information. If you don't provide
      this, the browser will tell the user the size is unknown, and as a result the user may be more
      likely to abort the download.</p>
      <p>If the background fetch downloads exceeds the number given here, it will be aborted. It's
      totally fine if the download is smaller than the <code>downloadTotal</code>, so if you aren't
      sure what the download total will be, it's best to err on the side of caution.
      </td>
    </tr>
  </tbody>
</table>

`backgroundFetch.fetch` returns a promise that resolves with a "background fetch registration". I'll
cover the details of that later. The promise rejects if the user has opted out of downloads, or one
of the provided parameters is invalid.

Providing many requests for a single background fetch lets you combine things that are logically a
single thing to the user. For example, a movie may be split into 1000s of resources (typical with
[MPEG-DASH](https://developer.mozilla.org/en-US/docs/Web/Apps/Fundamentals/Audio_and_video_delivery/Live_streaming_web_audio_and_video#MPEG-DASH)),
and come with additional resources like images. A level of a game could be spread across many
JavaScript, image, and audio resources. But to the user, it's just "the movie", or "the level".

Caution: Chrome's implementation currently only accepts requests without a body. In future, bodies
will be allowed, meaning you can use background fetch for large uploads, such as photos and video.

### Getting an existing background fetch

You can get an existing background fetch like this:

    navigator.serviceWorker.ready.then(async (swReg) => {
      const bgFetch = await swReg.backgroundFetch.get('my-fetch');
    });

…by passing the **id** of the background fetch you want. `get` returns `undefined` if there's no
active background fetch with that ID.

A background fetch is considered "active" from the moment it's registered, until it either succeeds
or totally fails.

You can get a list of all the active background fetches using `getIds`:

    navigator.serviceWorker.ready.then(async (swReg) => {
      const ids = await swReg.backgroundFetch.getIds();
    });

### A background fetch registration

A background fetch registration (`bgFetch` in the above examples) has the following:

<table class="responsive">
  <tbody>
    <tr><th colspan=2>Properties</th></tr>
    <tr>
      <td><code>id</code></td>
      <td><code>string</code><br>The background fetch's ID.</td>
    </tr>
    <tr>
      <td><code>uploadTotal</code></td>
      <td><code>number</code><br>The number of bytes to be sent to the server.</td>
    </tr>
    <tr>
      <td><code>uploaded</code></td>
      <td><code>number</code><br>The number of bytes successfully sent.</td>
    </tr>
  </tbody>
</table>

* **downloadTotal** - The value provided when the background fetch was registered, or zero.
* **downloaded** - The number of bytes successfully received. This value may decrease if the
  connection drops and the download cannot be resumed, in which case the browser restarts the fetch
  for that resource.
* **result** - One of:
  * `""` - The background fetch is active, so there's no result yet.
  * `"success"` - The background fetch was successful.
  * `"failure"` - The background fetch failed. This value only appears when the background fetch
    totally fails, as in the browser cannot retry/resume.
* **failureReason** - One of:
  * `""` - The background fetch hasn't failed.
  * `"aborted"` – The background fetch was aborted by the user, or `abort()` was called.
  * `"bad-status"` - One of the responses had a not-ok status, e.g. 404.
  * `"fetch-error"` - One of the fetches failed for some other reason, e.g. CORS, MIX, an invalid
    partial response, or a general network failure for a fetch that cannot be retried.
  * `"quota-exceeded"` - Storage quota was reached during the background fetch.
  * `"download-total-exceeded"` - The provided `downloadTotal` was exceeded.
* **recordsAvailable** - A boolean determining if the underlying requests/responses can be accessed.

The following methods:

* `abort()` - Cancel the background fetch.
* `match(request, opts)` and `matchAll(request, opts)` - These let you get at the requests &
  responses. I'll dig into these below.

And an event, `progress`. This fires when any of `uploaded`, `downloaded`, `result`, or
`failurereason` change. E.g:

<pre class="prettyprint">
bgFetch.addEventListener('progress', () => {
  // If we didn't provide a total, we can't provide a %.
  if (!bgFetch.downloadTotal) return;

  const percent = Math.round(bgFetch.downloaded / bgFetch.downloadTotal * 100);
  console.log(`Download progress: ${percent}%`);
});
</pre>

### Getting the requests and responses

Caution: In Chrome's current implementation you can only get the requests and responses during
`backgroundfetchsuccess` and `backgroundfetchfailure` service worker events (see below). In future
you'll be able to get in-progress fetches.

<pre class="prettyprint">
bgFetch.match('/podcast.mp3').then(async (record) => {
  if (!record) {
    console.log('No record found');
    return;
  }

  console.log(`Here's the request`, record.request);
  const response = await record.responseReady;
  console.log(`And here's the response`, response);
});
</pre>

The response is behind a promise because it may not have been received yet. The promise will reject
if the fetch fails.

Along with `match` there's `matchAll`, which can return multiple records. Calling
`bgFetch.matchAll()` without arguments returns a promise for all records.

Both methods can take additional query parameters, [the same as the cache
API](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match#Parameters).

### Reacting to success

We've already seen the `progress` event, but that's only useful while the user still has a page open
to your site. The main benefit of background fetch is things continue to work after the user leaves
the page, or even closes the browser.

If the background fetch successfully completes, your service worker will receive the
`backgroundfetchsuccess` event, and `event.registration` will be the background fetch registration.

After this event, the fetched requests and responses are no longer accessible, so if you want to
keep them, move them somewhere like the [cache
API](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage).

As with most service worker events, use `event.waitUntil` so the service worker knows when the event
is complete.

For example, in your service worker:

<pre class="prettyprint">
addEventListener('backgroundfetchsuccess', (event) => {
  const bgFetch = event.registration;

  event.waitUntil(async function() {
    // Create/open a cache.
    const cache = await caches.open('downloads');
    // Get all the records.
    const records = await bgFetch.matchAll();
    // Copy each request/response across.
    const promises = records.map(async (record) => {
      const response = await record.responseReady;
      await cache.put(record.request, response);
    });

    // Wait for the copying to complete.
    await Promise.all(promises);

    // Update the progress notification
    event.updateUI({ title: 'Podcast ready to listen' });
  }());
});
</pre>

`updateUI` lets you change the title/icons you initially set. This is optional, but it lets you
provide more context if necessary.

### Reacting to failure

Same as above, but the event is `backgroundfetchfailure`. Failure may have come down to a single
404, which may not have been important to you, so it might still be worth copying some responses
into a cache.

### Reacting to abort

You might want to perform some clean-up if the background fetch is aborted. In which case, listen
for the `backgroundfetchabort` event in your service worker.

### Reacting to click

The UI displaying the download progress and result is clickable. The `backgroundfetchclick` event in
the service worker lets you react to this. As above `event.registration` will be the background
fetch registration.

The common thing to do with this event is open a window:

<pre class="prettyprint">
addEventListener('backgroundfetchclick', (event) => {
  const bgFetch = event.registration;

  if (bgFetch.result === 'success') {
    clients.openWindow('/latest-podcasts');
  } else {
    clients.openWindow('/download-progress');
  }
});
</pre>

## Origin trial ## {#origin-trial}

To get access to this new API on your site, please [sign up](http://bit.ly/OriginTrialSignup) for
the "Background Fetch API" Origin Trial. If you just want to try it out locally, the API can be
enabled on the command line:

    chrome --enable-blink-features=BackgroundFetch

Passing this flag on the command line enables the API globally in Chrome for the current session.

If you give this API a try, please let us know what you think! Please direct feedback on the API
shape to [the specification repository](https://github.com/WICG/background-fetch/issues), and report
implementation bugs to [the BackgroundFetch Blink
component](https://bugs.chromium.org/p/chromium/issues/entry?template=Defect+report+from+developer&components=Blink%3EBackgroundFetch).

## Additional resources

* [Explainer](https://github.com/WICG/background-fetch/blob/master/README.md)
* [Specification](https://wicg.github.io/background-fetch/)
* [chromestatus.com entry](https://www.chromestatus.com/features/5712608971718656)

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}
