project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Experimenting with periodic background sync.

{# wf_updated_on: 2019-08-29 #}
{# wf_published_on: 2019-08-15 #}
{# wf_tags: serviceworker,progressive-web-apps,install #}
{# wf_blink_components: Blink>BackgroundSync #}
{# wf_featured_image: /web/updates/images/generic/baseline-sync.png #}
{# wf_featured_snippet: Periodic background sync is available as an origin trial starting in Chrome 77. Learn more about what the feature offers, as well as how to start experimenting with it today. #}

# Experimenting with Periodic Background Sync {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}
{% include "web/_shared/contributors/kenjibaheux.html" %}

<style>
  .browser-screenshot {
    margin: 1em;
    filter: drop-shadow(0 6px 4px rgba(0,0,0,0.2));
  }
</style>

<div class="clearfix"></div>

## What's periodic background sync?

Have you ever been in any of the following situations? Riding a fast train or
the subway with flaky or no connectivity, being throttled by your carrier after
watching too many videos on the go, or living in a country where bandwidth is
struggling to keep up with the demand? If you have, then you’ve surely
experienced the frustration of getting certain things done on the web, and
wondered why native apps tend to do better in these scenarios.

Native apps can fetch fresh content, such as timely news articles or up-to-date
weather information, ahead of time. Even if there’s no network in the subway,
you can still read the news. Periodic background sync (PBS) is an
[experimental feature](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
that gives people the same feature on the web. You can enjoy instant page loads
with the latest news from your favorite newspaper, have enough music or videos
to entertain yourself during an otherwise boring no-connectivity commute, and
more.

## Why add periodic background sync to your web app?

Consider a web app that uses a service worker to offer a rich offline experience:

- When a person launches the app, it may only have stale content loaded.
- Without periodic background sync, the app can only refresh itself when
  launched. As a result, people will see a flash of old content being slowly
  replaced by new content, or just a loading spinner.
- With PBS, the app can update itself in the background, giving people a
  smoother and reliably fresh experience.
- Now people can read the latest news, even in the subway!

Let’s now look at two types of updates that would be beneficial if done ahead of time.

### Updating an application

This is the data required for your web app to work correctly.

**Examples:**

- Updated search index for a search app.
- A critical application update.
- Updated icons or user interface.

### Updating content

If your web app regularly publishes updates, you can fetch the newest content to
give folks using your site a better experience.

**Examples:**

- Fresh articles from news sites.
- New songs from a favorite artist.
- Badges and achievements in a fitness app.

### Non-goals

Triggering events at a _specific_ time is outside the scope of this API. PBS
can't be used for time-based "alarm clock" scenarios.

There is no guaranteed cadence of the periodic sync tasks. When registering for
PBS, you provide a `minInterval` value that acts as a lower bound for the sync
interval, but there is no way to guarantee an upper bound. The browser decides
this cadence for each web app.

A web app can register multiple periodic tasks, and the frequency determined by
the browser for the tasks may or may not end up being the same.

### Getting this right

We are putting periodic background sync through a [trial period](#origin_trial)
so that you can help us make sure that we got it right. This section explains
some of the design decisions we took to make this feature as helpful as
possible.

The first design decision we made is that a web app can only use PBS once a
person has [installed](/web/fundamentals/app-install-banners/) it on their
device, and has launched it as a distinct application. PBS is not available in
the context of a regular tab in Chrome.

Furthermore, since we don’t want unused or seldom used web apps to gratuitously
consume battery or data, we designed PBS such that developers will have to earn
it by providing value to their users. Concretely, we are using a
[site engagement score](https://www.chromium.org/developers/design-documents/site-engagement)
to determine if and how often periodic background syncs can happen for a given
web app. In other words, a `periodicsync` event won't be fired _at all_ unless
the engagement score is greater than zero, and its value will affect the
frequency at which the `periodicsync` event will fire. This ensures that the
only apps syncing in the background are the ones you are actively using.

PBS shares some similarities with existing APIs and practices on popular
platforms. For instance, [one-off background sync](/web/updates/2015/12/background-sync)
as well as push notifications allow a web app's logic to live a little longer
(via its service worker) after a person has closed the page. On most platforms,
it’s common for people to have installed apps that periodically access the
network in the background to provide a better user experience—for critical
updates, prefetching content, syncing data, etc. Similarly, periodic background
sync also extends the lifetime of a web app's logic to run at regular periods,
for what might be a few minutes at a time.

If the browser allowed this to occur frequently and without restrictions, it
could result in some privacy concerns. Here's how Chrome has addressed this risk
for PBS:

- The background sync activity only occurs on a network that the device has
  previously connected to. We recommend to only connect to networks operated by
  trustworthy parties.
- As with all internet communications, PBS reveals the IP addresses of the
  client and the server it's talking to, and the name of the server. To reduce
  this exposure to roughly what it would be if the app only synced when it was
  in the foreground, the browser limits the frequency of an app's background
  syncs to align with how often the person uses that app. If the person stops
  frequently interacting with the app, PBS will stop triggering. This is a net
  improvement over the status quo in native apps.

### Alternatives

Before PBS, web apps had to jump through hoops to keep content fresh—like
triggering a [push notification](/web/fundamentals/push-notifications/) to wake
up their [service worker](/web/fundamentals/primers/service-workers/) and update
content as a side effect. But the timing of those notifications is decided by
the developer. PBS leaves it to the browser to work with the operating system to
figure out when an update should happen, allowing it to optimize for things like
power and connectivity state, and prevent resource abuse in the background.

Using PBS instead of push notifications also means that these updates will
happen without the fear of interrupting users, which might be the case with a
regular notification. Developers still have the option of using push
notifications for truly important updates, such as significant breaking news.
Users can uninstall the web app, or disable the "Background Sync" [site setting](https://support.google.com/chrome/answer/114662)
for specific web apps if needed.

Note: _Periodic_ background sync should not be confused with a different web
platform feature: "one-off" [background sync](/web/updates/2015/12/background-sync).
While their names are similar, their use cases are different. One-off background
sync allows your web app's service worker to respond to network availability on
a non-repeated basis. It's most commonly used to automatically retry sending a
request that failed because the network was temporarily unavailable.

## Origin trial

The current experimental implementation of periodic background sync is available
in Chrome 77 and higher. It's implemented as an "origin trial," and you must
[join the origin trial](https://developers.chrome.com/origintrials/#/view_trial/4048736065006075905)
before it can be enabled for your web app's users.

Note: Origin trials allow you to try new features and give feedback on their
usability, practicality, and effectiveness to the web standards community. For
more information, see the
[Origin Trials Guide for Web Developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md).

We anticipate that the trial will end around March 2020, at which point the web
platform community can use the feedback collected during the trial to inform a
decision about the future of the feature.

During the origin trial, PBS can be tested on all platforms on which Chrome
supports installing web apps, including macOS, Windows, Linux, Chrome OS, and
Android. On macOS, Windows, and Linux, PBS events will only be fired if an
instance of Chrome is actively running. This restriction is similar to how
[push notifications work on those platforms](/web/fundamentals/push-notifications/faq#why_doesnt_push_work_when_the_browser_is_closed).
If Chrome is quit and then re-launched after multiple background sync intervals
have elapsed, a single `periodicsync` event will be fired soon after Chrome
starts up, assuming all other conditions are met.

Note: For local testing purposes, developers can also try out PBS functionality
by visiting `chrome://flags/#periodic-background-sync` in Chrome 77 and above,
and enabling the feature there. This setting only applies to your local copy of
Chrome, and is not a scalable substitute for the origin trial.

As part of the origin trial process, the Chrome team welcomes your input.
Feedback on the experimental specification can be provided [via GitHub](https://github.com/beverloo/periodic-background-sync/issues),
and comments or bug reports on Chrome's implementation can be provided by [filing a bug](http://crbug.com/new)
with the Component field set to
"[Blink>BackgroundSync](https://bugs.chromium.org/p/chromium/issues/list?q=component%3ABlink>BackgroundSync%20&can=2)".

## Example code

The following snippets cover common scenarios for interacting with periodic
background sync. Some of them are meant to run within the context of your web
app, possibly in response to someone clicking a UI element that opts-in to
periodic background sync. Other snippets are meant to be run in your service
worker's code.

You can see these snippets in context by reading the source code for the [live demo](#live_demo).

### Checking whether periodic sync can be used

The
[Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)
tells you whether PBS can be enabled. You can query for
`'periodic-background-sync'` permission from either your web app's `window`
context, or from within a service worker.

If the `status` is `'granted'`, then your web app meets the requirements to register for PBS.

If the status is anything other than `'granted'` (most likely `'denied'`), then
your web app can't use PBS. This might be because the current browser doesn't
support it, or because one of the other requirements outlined above hasn't been
met.

```javascript
const status = await navigator.permissions.query({
  name: 'periodic-background-sync',
});
if (status.state === 'granted') {
  // PBS can be used.
} else {
  // PBS cannot be used.
}
```

### Registering a periodic sync

You can register for PBS within your web app's `window` context, but it must be
after the service worker is registered. Both a `tag` (`'content-sync'` in the
below example) and a minimum sync interval (in milliseconds) are required. You
can use whatever string you'd like for the `tag`, and it will be passed in as a
parameter to the corresponding `periodicsync` event in your service worker. This
allows you to distinguish between multiple types of sync activity that you might
register.

If you attempt to register when PBS is not supported, the call will throw an exception.

```javascript
const registration = await navigator.serviceWorker.ready;
if ('periodicSync' in registration) {
  try {
    registration.periodicSync.register('content-sync', {
      // An interval of one day.
      minInterval: 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    // PBS cannot be used.
  }
}
```

### Responding to a periodic sync event

To respond to PBS syncs, add a `periodicsync` event listener to your service
worker. The callback parameter contains the `tag` matching the string you used
during registration. This allows you to customize the callback's behavior—like
updating one set of cached data as opposed to another—based on different `tag`
values.

```javascript
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    // See the "Think before you sync" section for
    // checks you could perform before syncing.  
    event.waitUntil(syncContent());
  }
  // Other logic for different tags as needed.
});
```

### Checking if a sync with a given tag is registered

You can use the `getTags()` method to retrieve an array of `tag` strings,
corresponding to active PBS registrations.

One use case is to check whether or not a PBS registration used to update cached
data is already active, and if it is, avoid updating the cached data again.

You might also use this method to show a list of active registrations in your
web app's settings page, and allow people to enable or disable specific types of
syncs based on their preferences.

```javascript
const registration = await navigator.serviceWorker.ready;
if ('periodicSync' in registration) {
  const tags = await registration.periodicSync.getTags();
  // Only update content if sync isn't set up.
  if (!tags.includes('content-sync')) {
    updateContentOnPageLoad();
  }
} else {
  // If PSB isn't supported, always update.
  updateContentOnPageLoad();
}
```

### Unregistering a previously registered sync

You can stop future `periodicsync` events from firing by calling `unregister()`
and passing in a `tag` string that was previously registered.

```javascript
const registration = await navigator.serviceWorker.ready;
if ('periodicSync' in registration) {
  registration.periodicSync.unregister('content-sync');
}
```

## Think before you sync

When your service worker wakes up to handle a `periodicsync` event, you have the
_opportunity_ to request data, but not the _obligation_ to do so. While handling
the event, you may want to take the current network, data saver status, and
available storage quota into account before refreshing cached data. You also
might structure your code so that there are "lightweight" and "heavyweight"
network payloads, depending on those criteria.

The following features can be used inside of a service worker to help make the
decision about _how much_ (if anything) to refresh inside your `periodicsync`
handler:

- [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)
- [Detecting data saver mode](/web/fundamentals/performance/optimizing-content-efficiency/save-data/#detecting_the_save-data_setting)
- [Estimating available storage space](/web/updates/2017/08/estimating-available-storage-space)

## Debugging

It can be a challenge to get the "big picture" view of periodic background sync
while testing things locally. Information about active registrations,
approximate sync intervals, and logs of past sync events can provide valuable
context while debugging your web app's behavior. Fortunately, all of that
information can be found as an experimental feature in Chrome's DevTools.

Note: PBS debugging is currently disabled by default. Please read "[Enabling the DevTools interface](#enabling_the_devtools_interface)"
for the steps needed to enable it during the origin trial.

### Recording local activity

The "Periodic Background Sync" panel's interface is organized around key events
in the PBS lifecycle: registering for sync, performing a background sync, and
unregistering. In order to obtain information about these events, you need to
"start recording" from within DevTools first.

<figure>
  <img
    src="/web/updates/images/2019/08/periodic-background-sync/1-record.png"
    class="browser-screenshot"
    alt="The record button in DevTools">
</figure>

While recording, entries will appear in DevTools corresponding to events, with
context and metadata logged for each.

<figure>
  <img
    src="/web/updates/images/2019/08/periodic-background-sync/2-record-result.png"
    class="browser-screenshot"s
    alt="Recorded PBS activity in DevTools">
</figure>

After enabling recording once, it will stay enabled for up to three days,
allowing DevTools to capture local debugging information about background syncs
that might take place, e.g., hours in the future.

### Simulating events

While recording background activity can be helpful, there are times when you'd
want to test your `periodicsync` handler _immediately_, without waiting for the
event to fire on its normal cadence.

You can do this via the "Service Workers" panel within the Applications tab in
Chrome DevTools. The "Periodic Sync" field allows you to provide a `tag` for the
event to use, and trigger it as many times as you'd like.

<figure>
  <img
    src="/web/updates/images/2019/08/periodic-background-sync/3-sw-panel.png"
    class="browser-screenshot"
    alt="The service workers panel in DevTools">
</figure>

Manually triggering a `periodicsync` event did not make it into Chrome 77, so
the best way to test it out is to use Chrome 78 (currently in[ Canary](https://www.google.com/chrome/canary/))
or later. You'll need to follow the same "[Enabling the DevTools interface](#enabling_the_devtools_interface)"
steps to turn it on.

## Live demo

You can try out this
[live demo app](https://webplatformapis.com/periodic_sync/periodicSync_improved.html)
that uses periodic background sync. Make sure that:

- You're using Chrome 77 or later.
- You "[install](/web/fundamentals/app-install-banners/)" the web app before
  trying to enable periodic background sync.

(The demo app's author already took the step of signing up for the origin trial.)

## References and acknowledgements

This article is adapted from Mugdha Lakhani & Peter Beverloo's original
[write-up](https://github.com/beverloo/periodic-background-sync/blob/master/README.md),
with contributions from Chris Palmer. Mughda also wrote the code samples, live
demo, and the code for the Chrome implementation of this feature.

## Enabling the DevTools interface

The following steps are required while periodic background sync remains an
origin trial. If and when it progresses out of the origin trial phase, the
DevTools interface will be enabled by default.

- Visit `chrome://flags/#enable-devtools-experiments` and change the "Developer
  Tools experiments" setting to "Enabled".

<figure>
  <img
    src="/web/updates/images/2019/08/periodic-background-sync/4-experiments.png"
    class="browser-screenshot"
    alt="The Developer Tools Experiments flag setting">
</figure>

- Restart Chrome.
- [Open Chrome's DevTools](/web/tools/chrome-devtools/open), and choose
  "Settings" from the three-dot menu in the upper-right.

<figure>
  <img
    src="/web/updates/images/2019/08/periodic-background-sync/5-settings.png"
    class="browser-screenshot"
    alt="The settings panel in DevTools">
</figure>

- In the Experiments section of the Settings panel, enable "Background services
  section for Periodic Background Sync".

<figure>
  <img
    src="/web/updates/images/2019/08/periodic-background-sync/6-checkbox.png"
    class="browser-screenshot"
    alt="The background service section checkbox in DevTools">
</figure>

- Close, and then reopen DevTools.
- You should now see a "Periodic Background Sync" section within the
  "Application" panel in DevTools.

<figure>
  <img
    src="/web/updates/images/2019/08/periodic-background-sync/7-panel.png"
    class="browser-screenshot"
    alt="The periodic background sync panel in DevTools">
</figure>

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
