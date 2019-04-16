project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Wake Lock API provides a way to prevent the device from dimming or locking the screen or prevent the device from going to sleep when an application needs to keep running.

{# wf_published_on: 2018-12-18 #}
{# wf_updated_on: 2019-03-07 #}
{# wf_featured_image: /web/updates/images/2018/12/wake-logo-featured.png #}
{# wf_tags: capabilities,wake-lock #}
{# wf_featured_snippet: To avoid draining the battery, most devices will quickly fall asleep when left idle. While this is fine for most of the time, there are some applications that need to keep the screen or the device awake in order to complete some work. The Wake Lock API provides a way to prevent the device from dimming or locking the screen or prevent the device from going to sleep when an application needs to keep running.  #}
{# wf_blink_components: Blink>WakeLock #}

{# When updating this post, don't forget to update /updates/capabilities.md #}

# I’m Awake! Stay Awake with the WakeLock API {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

{% include "web/updates/_shared/capabilities.html" %}

## What is the Wake Lock API? {: #what }

To avoid draining the battery, most devices quickly go to sleep when left
idle. While this is fine most of the time, some applications need to keep the
screen or the device awake in order to complete their work. For example, a
run-tracking app (turns the screen off, but keeps the system awake), or a game,
like [Ball Puzzle](https://ball-puzzle.appspot.com/), that uses the device
motion APIs for input.

The Wake Lock API provides a way to prevent the device from dimming and
locking the screen or prevent the device from going to sleep. This capability
enables new experiences that, until now, required a native app.

The Wake Lock API aims to reduce the need for hacky and potentially
power-hungry workarounds. It addresses the shortcomings of an older API
which was limited to simply keeping the screen on, and had a number of
security and privacy issues.

### Suggested use cases for the Wake Lock API {: #use-cases }

[RioRun](https://www.theguardian.com/sport/2016/aug/06/rio-running-app-marathon-course-riorun) a web app developed by
[The Guardian](https://www.theguardian.com/)
that takes you on a virtual audio tour of Rio, following the route of the 2016
Olympic marathon would be a perfect use case. Without wake locks, your screen
will turn off frequently, making it hard to use.

Of course, there are plenty of others:

* Kiosk-style apps where it’s important to prevent the screen from turning off.
* Web based presentation apps where it’s essential to prevent the screen
  from going to sleep while in the middle of a presentation.


## Current status {: #status }

| Step                                       | Status                       |
| ------------------------------------------ | ---------------------------- |
| 1. Create explainer                        | Complete                     |
| 2. Create initial draft of specification   | [Complete][spec-ed]          |
| **3. Gather feedback & iterate on design** | [**In Progress**](#feedback) |
| 4. Origin trial                            | Not Started                  |
| 5. Launch                                  | Not Started                  |


Note: Big thanks to the folks at Intel, specifically Mrunal Kapade for doing
the work to implement this. We depend on a community of committers working
together to move the Chromium project forward. Not every Chromium committer
is a Googler, and they deserve special recognition!


## How to use the Wake Lock API {: #use }

Dogfood: We’re still working on the Wake Lock API, and it’s only available
behind a flag (`#enable-experimental-web-platform-features`). While in
development, bugs are expected, or it may fail to work completely.

Check out the [Wake Lock demo][demo] and [source][demo-source] for the demo.


### Wake lock types {: #wake-lock-types }

The Wake Lock API provides two types of wake locks, `screen` and `system`.
While they are treated independently, one may imply the effects of the other.
For example, a screen wake lock implies that the app should continue running.


<div class="attempt-left" id="wake-lock-screen">
  <b><code>screen</code> wake lock</b>
  <p>
    A <code>screen</code> wake lock prevents the device’s screen from turning
    off so that the user can see the information that’s displayed on screen.
  </p>
</div>
<div class="attempt-right" id="wake-lock-system">
  <b><code>system</code> wake lock</b>
  <p>
    A <code>system</code> wake lock prevents the device’s CPU from entering
    standby mode so that your app can continue running.
  </p>
</div>


### Get a wake lock object {: #get-wake-lock }

In order to use the Wake Lock API, we need to create and initialize a
`wakelock` object for the type of wake lock we want. Once created, the promise
resolves with a `wakelock` object, but note, the wake lock isn’t active yet,
it’ll need to be activated first.


```js
let wakeLockObj;
if ('getWakeLock' in navigator) {
  try {
    // Create a wake lock for the type we want.
    wakeLockObj = await navigator.getWakeLock('screen');
    console.log('👍', 'getWakeLock', wakeLockObj);
  } catch (ex) {
    console.error('👎', 'getWakeLock', err);
  }
}
```

In some instances, the browser may fail to create the wake lock object, and
instead throws an error, for example if the batteries on the device are low.


### Use the wake lock object {: #use-wake-lock-obj }

We can use the newly created `wakeLockObj` to activate a lock, or determine
the current wake lock state and to receive notifications when the wake lock
state is changed.

To acquire a wake lock, we simply need to call `wakeLockObj.createRequest()`,
which creates a new `WakeLockRequest` object. The `WakeLockRequest` object
allows multiple components on the same page to request their own locks. The
`WakeLock` object automatically handles the requests. The wake lock is
released when all of the requests have been cancelled.


```js
let wakeLockRequest;
function toggleWakeLock() {
  if (wakeLockRequest) {
    // Stop the existing wake lock request.
    wakeLockRequest.cancel();
    wakeLockRequest = null;
    return;
  }
  wakeLockRequest = wakeLockObj.createRequest();
  // New wake lock request created.
}
```

Caution: It’s **critical** to keep a reference to `wakeLockRequest`
created by  `wakeLockObj.createRequest()`  in order to release the wake lock
later. If the reference to the `wakeLockRequest` is lost, **you won’t be able to
cancel the wake lock until the page is closed**.

You can track if a wake lock is active by listening for the `activechange`
event on the `WakeLock` object.

```js
wakeLockObj.addEventListener('activechange', () => {
  console.log('⏰', 'wakeLock active:', wakeLockObj.active);
});
```


## Best Practices {: #best-practices }

The approach you take depends on the needs of your app. However, you should use
the most lightweight approach possible for your app, to minimize your app's
impact on system resources.

Before adding wake lock to your app, consider whether your use cases could
be solved with one of the following alternative solutions:

* If your app is performing long-running downloads, consider using
  [background fetch](/web/updates/2018/12/background-fetch).
* If your app is synchronizing data from an external server, consider using
  [background sync](/web/updates/2015/12/background-sync).

Note: Like most other powerful web APIs, the Wake Lock API is only available
when served over **HTTPS**.


## Feedback {: #feedback }

We need your help to ensure that the Wake Lock API works in a way that meets
your needs and that we’re not missing any key scenarios.

**What should the permission model look like?** When should the browser
notify the user that there’s a wake lock active? Add your thoughts to
[how should UAs infer consent to take a wakelock](https://github.com/w3c/wake-lock/issues/140)
GitHub issue.

If there are any features we’re missing, or there are scenarios that are either
difficult or impossible to implement with the current design, please file an
issue in the [w3c/wake-lock repo][issues] and provide as much detail as you can.

We’re also interested to hear how you plan to use the Wake Lock API:

* Have an idea for a use case or an idea where you'd use it?
* Do you plan to use this?
* Like it and want to show your support?

Share your thoughts on the [Wake Lock API WICG Discourse][wicg-discourse]
discussion.

{% include "web/_shared/helpful.html" %}

## Helpful Links {: #helpful }

* Specification [Candidate Recommendation][spec-cr] | [Editor’s Draft][spec-ed]
* [Wake Lock Demo][demo] | [Wake Lock Demo source][demo-source]
* [Tracking bug][cr-bug]
* [ChromeStatus.com entry][cr-status]
* [Experimenting with the Wake Lock API](https://medium.com/dev-channel/experimenting-with-the-wake-lock-api-b6f42e0a089f)
* Blink Component: `Blink>WakeLock`


{% include "web/_shared/rss-widget-updates.html" %}

[spec-ed]: https://w3c.github.io/wake-lock/
[spec-cr]: https://www.w3.org/TR/wake-lock/
[demo]: https://wake-lock.glitch.me/
[demo-source]: https://glitch.com/edit/#!/wake-lock?path=wakelock.js
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=257511
[cr-status]: https://www.chromestatus.com/features/4636879949398016
[issues]: https://github.com/w3c/wake-lock/issues
[wicg-discourse]: https://discourse.wicg.io/t/wake-lock-api-suppressing-power-management-screensavers/769
