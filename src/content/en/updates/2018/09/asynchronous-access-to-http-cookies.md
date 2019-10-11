project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Cookie Store API offers asynchronous access to HTTP cookies, and opens up the cookie jar to service workers.

{# wf_updated_on: 2019-10-02 #}
{# wf_published_on: 2018-09-06 #}
{# wf_tags: cookie,storage #}
{# wf_featured_image: /web/updates/images/generic/styles.png #}
{# wf_featured_snippet: The Cookie Store API offers asynchronous access to HTTP cookies, and opens up the cookie jar to service workers. #}
{# wf_blink_components: Blink>WebVR #}

# Asynchronous Access to HTTP Cookies {: .page-title }

{% include "web/_shared/contributors/victorcostan.html" %}

<div class="clearfix"></div>

## What is the Cookie Store API? {: #explainer }

The [Cookie Store API][cr-status] exposes HTTP cookies to service workers and
offers an asynchronous alternative to `document.cookie`. The API makes it
easier to:

* Avoid jank on the main thread, by accessing cookies asynchronously.
* Avoid polling for cookies, because changes to cookies can be observed.
* Access cookies from service workers.

[Read explainer][explainer]{: .button .button-primary }

## Current status {: #status }

| Step                                       | Status                       |
| ------------------------------------------ | ---------------------------- |
| 1. Create explainer                        | [Complete][explainer]        |
| 2. Create initial draft of specification   | [Complete][spec]             |
| **3. Gather feedback & iterate on spec**   | [**In progress**](#feedback) |
| 4. Origin trial                            | [Paused](#origin-trial)      |
| 5. Launch                                  | Not started                  |


## How do I use the async cookie store? {: #how-do-i-use }

### Enable the origin trial {: #origin-trial }

Note: We've temporarily ended the origin trial while we review your feedback
and use it to improve the API. Keep an eye out here for updates and
announcements about when we plan to re-open the origin trial.

<!--
To get access to this new API on your site, please [sign
up](http://bit.ly/OriginTrialSignup){: .external} for the "Cookie Store API"
Origin Trial.
-->

To try it out locally, the API can be enabled on the command line:

<pre class="devsite-terminal devsite-click-to-copy">
chrome --enable-blink-features=CookieStore
</pre>

Passing this flag on the command line enables the API globally in Chrome for
the current session.

Alternatively, you can enable the `#enable-experimental-web-platform-features`
flag in `chrome://flags`.

### You (probably) don't need cookies

Before diving into the new API, I'd like to state that cookies are still the Web
platform's worst client-side storage primitive, and should still be used as a
last resort. This isn't an accident - cookies were the Web's first client-side
storage mechanism, and we've learned a lot since then.

The main reasons for avoiding cookies are:

* Cookies bring your storage schema into your back-end API.
  Each HTTP request carries a snapshot of the cookie jar. This makes it easy for
  back-end engineers to introduce dependencies on the current cookie format. Once
  this happens, your front-end can't change its storage schema without deploying
  a matching change to the back-end.

* Cookies have a complex security model.
  Modern Web platform features follow the same origin policy, meaning that
  each application gets its own sandbox, and is completely independent from
  other applications that the user might be running.
  [Cookie scopes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Scope_of_cookies)
  make for a significantly more complex security story, and merely attempting to
  summarize that would double the size of this article.

* Cookies have high performance costs. Browsers need to include a snapshot of
  your cookies in every HTTP request, so every change to cookies must be
  propagated across the storage and network stacks. Modern browsers have highly
  optimized cookie store implementations, but we'll never be able to make
  cookies as efficient as the other storage mechanisms, which don't need to talk
  to the network stack.

For all the reasons above, modern Web applications should avoid cookies and
instead store a session identifier into
[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), and
explicitly add the identifier to the header or body of specific HTTP requests,
via the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API.

That being said, you're still reading this article because you have a good
reason to use cookies...

### Reading a cookie, and eliminating jank

The venerable
[document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
API is a fairly guaranteed source of jank for your application. For example,
whenever you use the `document.cookie` getter, the browser has to stop executing
JavaScript until it has the cookie information you requested. This can take a
process hop or a disk read, and will cause your UI to jank.

A straightforward fix for this problem is switching from the `document.cookie`
getter to the asynchronous Cookie Store API.

    await cookieStore.get('session_id')

    // {
    //   domain: "example.com",
    //   expires: 1593745721000,
    //   name: "session_id",
    //   path: "/",
    //   sameSite: "unrestricted",
    //   secure: true,
    //   value: "yxlgco2xtqb.ly25tv3tkb8"
    // }

The `document.cookie` setter can be replaced in a similar manner. Keep in mind
that the change is only guaranteed to be applied after the Promise returned by
`cookieStore.set` resolves.

    await cookieStore.set({ name: 'opt_out', value: '1' });

    // undefined

### Observe, don't poll

A popular application for accessing cookies from JavaScript is detecting when
the user logs out, and updating the UI. This is currently done by polling
`document.cookie`, which introduces jank and has a negative impact on battery
life.

The Cookie Store API brings an alternative method for observing cookie
changes, which does not require polling.

    cookieStore.addEventListener('change', (event) => {
      for (const cookie of event.changed) {
        if (cookie.name === 'session_id')
          sessionCookieChanged(cookie.value);
      }
      for (const cookie of event.deleted) {
        if (cookie.name === 'session_id')
          sessionCookieChanged(null);
      }
    });

### Welcome service workers

Because of synchronous design, the `document.cookie` API has not been made
available to
[service workers](/web/fundamentals/primers/service-workers/).
The Cookie Store API is asynchronous, and therefore is allowed in service
workers.

Interacting with the cookies works the same way in document contexts and in
service workers.

    // Works in documents and service workers.
    async function logOut() {
      await cookieStore.delete('session_id');
    }

However, observing cookie changes is a bit different in service workers. Waking
up a service worker can be pretty expensive, so we have to explicitly describe
the cookie changes that the worker is interested in.

In the example below, an application that uses IndexedDB to cache user data
monitors changes to the session cookie, and discards the cached data when the
user logs off.

    // Specify the cookie changes we're interested in during the install event.
    self.addEventListener('install', (event) => {
      event.waitUntil(
        cookieStore.subscribeToChanges([{ name: 'session_id' }])
      );
    });

    // Delete cached data when the user logs out.
    self.addEventListener('cookiechange', (event) => {
      for (const cookie of event.deleted) {
        if (cookie.name === 'session_id') {
          indexedDB.deleteDatabase('user_cache');
          break;
        }
      }
    });

## Best practices {: #best-practices }

Coming soon.

## Feedback {: #feedback }

If you give this API a try, please let us know what you think! Please direct
feedback on the API shape to the
[specification repository](https://github.com/WICG/cookie-store/issues),
and report implementation bugs to the
[`Blink>Storage>CookiesAPI`](https://bugs.chromium.org/p/chromium/issues/entry?template=Defect+report+from+developer&components=Blink%3EStorage%3ECookiesAPI)
Blink component.

We are especially interested to learn about performance measurements and use
cases beyond the ones outlined in the [explainer][explainer].

## Additional resources

* [Public explainer][explainer]
* [Specification][spec]
* [Tracking bug][cr-bug]
* [chromestatus.com entry][cr-status]
* [WICG Discourse Thread][wicg-discourse]
* Blink Component: `Blink>Storage>CookiesAPI`

{% include "web/_shared/rss-widget-updates.html" %}



[spec]: https://wicg.github.io/cookie-store/
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=729800
[cr-status]: https://www.chromestatus.com/feature/5658847691669504
[explainer]: https://wicg.github.io/cookie-store/explainer.html
[wicg-discourse]: https://discourse.wicg.io/t/rfc-proposal-for-an-asynchronous-cookies-api/1652
