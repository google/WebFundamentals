project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Background fetch lets you handle large downloads, even if the browser closes.

{# wf_updated_on: 2018-12-07 #}
{# wf_published_on: 2018-12-03 #}
{# wf_tags: serviceworker #}
{# wf_featured_image: /web/updates/images/generic/timeline.png #}
{# wf_featured_snippet: Background Fetch lets you handle large downloads, even if the browser closes. #}
{# wf_blink_components: Blink>BackgroundFetch #}

# Introducing Background Fetch {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

In 2015 we [introduced Background Sync](/web/updates/2015/12/background-sync) which allows the
service worker to defer work until the user has connectivity. This means the user could type a
message, hit send, and leave the site knowing that the message will be sent either now, or when they
have connectivity.

It's a useful feature, but it requires the service worker to be alive for the duration of the
fetch. That isn't a problem for short bits of work like sending a message, but if the task takes
too long the browser will kill the service worker, otherwise it's a risk to the user's privacy and
battery.

So, what if you need to download something that might take a long time, like a movie, podcasts, or
levels of a game. That's what Background Fetch is for. Background Fetch is a [web
standard](https://wicg.github.io/background-fetch/) implemented behind the *Experimental Web
Platform features* flag in Chrome 71.

Here's a quick two minute demo showing the traditional state of things, vs using Background Fetch:

<div class="video-wrapper-full-width" style="padding-bottom: 100%">
  <iframe class="devsite-embedded-youtube-video" data-video-id="eLfgf2ZvFpo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

[Try the demo yourself](https://bgfetch-http203.glitch.me/) and [browse the
code](https://glitch.com/edit/#!/bgfetch-http203?path=public/client.js). It requires Chrome 71, and
the *Experimental Web Platform features* flag to be enabled.

This is also being run as an Origin Trial. If you're interested in testing this API with real users
without a flag, [see below](#origin-trial).

## How it works

A background fetch works like this:

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

If the user starts the download while offline, or goes offline during the download, the background
fetch will be paused and resumed later.

## The API

### Feature detect

As with any new feature, you want to detect if the browser supports it. For Background Fetch, it's
as simple as:

    if ('BackgroundFetchManager' in self) {
      // This browser supports Background Fetch!
    }

### Starting a background fetch

The main API hangs off a [service worker](/web/fundamentals/primers/service-workers/) registration,
so make sure you've registered a service worker first. Then:

    navigator.serviceWorker.ready.then(async (swReg) => {
      const bgFetch = await swReg.backgroundFetch.fetch('my-fetch', ['/ep-5.mp3', 'ep-5-artwork.jpg'], {
        title: 'Episode 5: Interesting things.',
        icons: [{
          sizes: '300x300',
          src: '/ep-5-icon.png',
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
      <p><code>backgroundFetch.fetch</code> will reject if the ID matches an existing background
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
      <p class="note"><strong>Note:</strong> Chrome doesn't currently support requests that would
      require a CORS preflight.</p>
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

`backgroundFetch.fetch` returns a promise that resolves with a `BackgroundFetchRegistration`. I'll
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

A background fetch is considered "active" from the moment it's registered, until it either succeeds,
fails, or is aborted.

You can get a list of all the active background fetches using `getIds`:

    navigator.serviceWorker.ready.then(async (swReg) => {
      const ids = await swReg.backgroundFetch.getIds();
    });

### Background fetch registrations

A `BackgroundFetchRegistration` (`bgFetch` in the above examples) has the following:

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
    <tr>
      <td><code>downloadTotal</code></td>
      <td><code>number</code><br>The value provided when the background fetch was registered, or
      zero.</td>
    </tr>
    <tr>
      <td><code>downloaded</code></td>
      <td><code>number</code><br>The number of bytes successfully received.
      <p>This value may decrease. For example, if the connection drops and the download cannot be
      resumed, in which case the browser restarts the fetch for that resource from scratch.</p></td>
    </tr>
    <tr>
      <td><code>result</code></td>
      <td><p>One of the following:</p>
        <ul>
          <li><code>""</code> - The background fetch is active, so there's no result yet.</li>
          <li><code>"success"</code> - The background fetch was successful.</li>
          <li><code>"failure"</code> -  The background fetch failed. This value only appears when
          the background fetch totally fails, as in the browser cannot retry/resume.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>failureReason</code></td>
      <td><p>One of the following:</p>
        <ul>
          <li><code>""</code> - The background fetch hasn't failed.</li>
          <li><code>"aborted"</code> – The background fetch was aborted by the user, or
          <code>abort()</code> was called.</li>
          <li><code>"bad-status"</code> - One of the responses had a not-ok status, e.g. 404.</li>
          <li><code>"fetch-error"</code> - One of the fetches failed for some other reason, e.g.
          CORS, MIX, an invalid partial response, or a general network failure for a fetch that
          cannot be retried.</li>
          <li><code>"quota-exceeded"</code> - Storage quota was reached during the background
          fetch.</li>
          <li><code>"download-total-exceeded"</code> - The provided `downloadTotal` was
          exceeded.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>recordsAvailable</code></td>
      <td><code>boolean</code><br>Can the underlying requests/responses can be accessed?
      <p>Once this is false <code>match</code> and <code>matchAll</code> cannot be used.</p></td>
    </tr>
    <tr><th colspan=2>Methods</th></tr>
    <tr>
      <td><code>abort()</code></td>
      <td>Returns <code>Promise&lt;boolean&gt;</code><br>Abort the background fetch.
      <p>The returned promise resolves with true if the fetch was successfully aborted.</p></td>
    </tr>
    <tr>
      <td><code>matchAll(request, opts)</code></td>
      <td>Returns <code>Promise&lt;Array&lt;BackgroundFetchRecord&gt;&gt;</code><br>Get the requests
      and responses.
      <p>The arguments here are the same as
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/Cache/match#Parameters">the cache
      API</a>. Calling without arguments returns a promise for all records.</p>
      <p>See below for more details.</p></td>
    </tr>
    <tr>
      <td><code>match(request, opts)</code></td>
      <td>Returns <code>Promise&lt;BackgroundFetchRecord&gt;</code><br>As above, but resolves with
      the first match.</td>
    </tr>
    <tr><th colspan=2>Events</th></tr>
    <tr>
      <td><code>progress</code></td>
      <td>Fired when any of <code>uploaded</code>, <code>downloaded</code>, <code>result</code>, or
      <code>failureReason</code> change.</td>
    </tr>
  </tbody>
</table>

### Tracking progress

This can be done via the `progress` event. Remember that `downloadTotal` is whatever value you
provided, or `0` if you didn't provide a value.

    bgFetch.addEventListener('progress', () => {
      // If we didn't provide a total, we can't provide a %.
      if (!bgFetch.downloadTotal) return;

      const percent = Math.round(bgFetch.downloaded / bgFetch.downloadTotal * 100);
      console.log(`Download progress: ${percent}%`);
    });

### Getting the requests and responses

Caution: In Chrome's current implementation you can only get the requests and responses during
`backgroundfetchsuccess`, `backgroundfetchfailure`, and `backgroundfetchabort` service worker events
(see below). In future you'll be able to get in-progress fetches.

    bgFetch.match('/ep-5.mp3').then(async (record) => {
      if (!record) {
        console.log('No record found');
        return;
      }

      console.log(`Here's the request`, record.request);
      const response = await record.responseReady;
      console.log(`And here's the response`, response);
    });

`record` is a `BackgroundFetchRecord`, and it looks like this:

<table class="responsive">
  <tbody>
    <tr><th colspan=2>Properties</th></tr>
    <tr>
      <td><code>request</code></td>
      <td><code>Request</code><br>The request that was provided.</td>
    </tr>
    <tr>
      <td><code>responseReady</code></td>
      <td><code>Promise&lt;Response&gt;</code><br>The fetched response.
      <p>The response is behind a promise because it may not have been received yet. The promise
      will reject if the fetch fails.</p></td>
    </tr>
  </tbody>
</table>

### Service worker events

<table class="responsive">
  <tbody>
    <tr><th colspan=2>Events</th></tr>
    <tr>
      <td><code>backgroundfetchsuccess</code></td>
      <td>Everything was fetched successfully.</td>
    </tr>
    <tr>
      <td><code>backgroundfetchfailure</code></td>
      <td>One or more of the fetches failed.</td>
    </tr>
    <tr>
      <td><code>backgroundfetchabort</code></td>
      <td>One or more fetches failed.
      <p>This is only really useful if you want to perform clean-up of related data.</p></td>
    </tr>
    <tr>
      <td><code>backgroundfetchclick</code></td>
      <td>The user clicked on the download progress UI.</td>
    </tr>
  </tbody>
</table>

The event objects have the following:

<table class="responsive">
  <tbody>
    <tr><th colspan=2>Properties</th></tr>
    <tr>
      <td><code>registration</code></td>
      <td><code>BackgroundFetchRegistration</code></td>
    </tr>
    <tr><th colspan=2>Methods</th></tr>
    <tr>
      <td><code>updateUI({ title, icons })</code></td>
      <td>Lets you change the title/icons you initially set. This is optional, but it lets you
      provide more context if necessary. You can only do this *once* during
      <code>backgroundfetchsuccess</code> and <code>backgroundfetchfailure</code> events.</td>
    </tr>
  </tbody>
</table>

### Reacting to success/failure

We've already seen the `progress` event, but that's only useful while the user has a page open to
your site. The main benefit of background fetch is things continue to work after the user leaves the
page, or even closes the browser.

If the background fetch successfully completes, your service worker will receive the
`backgroundfetchsuccess` event, and `event.registration` will be the background fetch registration.

After this event, the fetched requests and responses are no longer accessible, so if you want to
keep them, move them somewhere like the [cache
API](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage).

As with most service worker events, use `event.waitUntil` so the service worker knows when the event
is complete.

Note: You can't hold the service worker open indefinitely here, so avoid doing things that would
keep the service worker open a long time here, such as additional fetching.

For example, in your service worker:

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

        // Update the progress notification.
        event.updateUI({ title: 'Episode 5 ready to listen!' });
      }());
    });

Failure may have come down to a single 404, which may not have been important to you, so it might
still be worth copying some responses into a cache as above.

### Reacting to click

The UI displaying the download progress and result is clickable. The `backgroundfetchclick` event in
the service worker lets you react to this. As above `event.registration` will be the background
fetch registration.

The common thing to do with this event is open a window:

    addEventListener('backgroundfetchclick', (event) => {
      const bgFetch = event.registration;

      if (bgFetch.result === 'success') {
        clients.openWindow('/latest-podcasts');
      } else {
        clients.openWindow('/download-progress');
      }
    });

## Origin trial {: #origin-trial}

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

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

