project_path: /web/_project.yaml
book_path: /web/showcase/_book.yaml
description: The Google I/O 2015 Web App

{# wf_published_on: 2015-10-01 #}
{# wf_updated_on: 2015-10-01 #}
{# wf_author: jeffreyposnick #}
{# wf_featured_image: /web/showcase/2015/images/service-workers-iowa/card.jpg #}
{# wf_tags: casestudy,serviceworker,offline #}

# Service Workers in Production {: .page-title }

<img src="images/service-workers-iowa/screenshot-portrait.png" class="attempt-right">

### TL;DR {: .hide-from-toc }

Learn how we used service worker libraries to make the Google I/O 2015 web app
fast, and offline-first.

## Overview

This year’s [Google I/O 2015 web app](https://events.google.com/io2015/){: .external } was
written by Google’s Developer Relations team, based on designs by our friends
at [Instrument](http://www.instrument.com/){: .external }, who wrote the nifty
[audio/visual experiment](http://www.instrument.com/news/google-io-2015). Our
team’s mission was to ensure that the I/O web app (which I’ll refer to by
its codename, IOWA) showcased everything the modern web could do. A full
offline-first experience was at the top of our list of must-have features.

If you’ve read any of the other articles on this site recently, you’ve
undoubtedly encountered [service workers](/web/fundamentals/getting-started/primers/service-workers),
and you won’t be surprised to hear that IOWA’s offline support is heavily
reliant on them. Motivated by the real-world needs of IOWA, we developed two
libraries to handle two different offline use cases:
[`sw-precache`](https://github.com/GoogleChrome/sw-precache) to automate
precaching of static resources, and
[`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox) to handle
runtime caching and fallback strategies.

The libraries complement each other nicely, and allowed us to implement a
performant strategy in which IOWA’s static content “shell” was always served
directly from the cache, and dynamic or remote resources were served from the
network, with fallbacks to cached or static responses when needed.

## Precaching with <code>sw-precache</code>

IOWA’s static resources—its HTML, JavaScript, CSS, and images—provide the core
shell for the web application. There were two specific requirements that were
important when thinking about caching these resources: we wanted to make sure
that most static resources were cached, and that they were kept up to date.
[`sw-precache`](https://github.com/GoogleChrome/sw-precache) was built with those
requirements in mind.

### Build-time Integration

`sw-precache` with IOWA’s [`gulp`](http://gulpjs.com/){: .external }-based build process,
and we rely on a series of [glob](https://github.com/isaacs/node-glob) patterns
to ensure that we generate a complete list of all the static resources IOWA uses.

    staticFileGlobs: [
      rootDir + '/bower_components/**/*.{html,js,css}',
      rootDir + '/elements/**',
      rootDir + '/fonts/**',
      rootDir + '/images/**',
      rootDir + '/scripts/**',
      rootDir + '/styles/**/*.css',
      rootDir + '/data-worker-scripts.js'
    ]

<figure>
<figcaption>Adapted from the <a href="https://github.com/GoogleChrome/ioweb2015/blob/master/gulp_scripts/service-worker.js">original source</a>.</figcaption>
</figure>

Alternative approaches, like hard coding a list of file names into an array,
and remembering to bump a cache version number each time any of those files
changes were far too error prone, especially given that we had
[multiple team members](https://events.google.com/io2015/humans.txt) checking
in code. No one wants to break offline support by leaving out a new file in a
manually maintained array! Build-time integration meant we could make
changes to existing files and add new files without having those worries.

### Updating Cached Resources

`sw-precache` generates a base [service worker script](https://events.google.com/io2015/service-worker.js)
that includes a unique [MD5 hash](https://en.wikipedia.org/wiki/MD5) for each
resource that gets precached. Each time an existing resource changes,
or a new resource is added, the service worker script is regenerated. This
automatically triggers the [service worker update flow](/web/fundamentals/getting-started/primers/service-workers#lifecycle),
in which the new resources are cached and out of date resources are purged.
Any existing resources that have identical MD5 hashes are left as-is. That
means users who have visited the site before only end up downloading the
minimal set of changed resources, leading to a much more efficient experience
than if the entire cache was expired *en masse*.

Each file that matches one of the glob patterns is downloaded and cached the
first time a user visits IOWA. We made an effort to ensure that only critical
resources needed to render the page were precached. Secondary content, like the
media used in the [audio/visual experiment](http://www.instrument.com/news/google-io-2015),
or the profile images of the sessions’ speakers, were deliberately not
precached, and we instead used the [`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox)
library to handle offline requests for those resources.


## <code>sw-toolbox</code>, for All Our Dynamic Needs

As mentioned, precaching every resource that a site needs to work offline isn’t
feasible. Some resources are too large or infrequently used to make it
worthwhile, and other resources are dynamic, like the responses from a remote
API or service. But just because a request isn’t precached doesn’t mean it has
to result in a [`NetworkError`](https://developer.mozilla.org/en-US/docs/Web/API/DOMException#exception-NetworkError).
[`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox) gave us the
flexibility to implement [request handlers](https://github.com/GoogleChrome/sw-toolbox#request-handlers)
that handle runtime caching for some resources and custom fallbacks for
others. We also used it to update our previously cached resources in response
to push notifications.

Here are a few examples of custom request handlers that we built on top of
sw-toolbox. It was easy to integrate them with the base service worker script
via `sw-precache`’s [`importScripts parameter`](https://github.com/GoogleChrome/sw-precache#importscripts-arraystring),
which pulls standalone JavaScript files into the scope of the service worker.

Note: The <a href='https://github.com/GoogleChrome/ioweb2015'>GitHub source code</a> for this app uses an previous version of <code>sw-toolbox</code> named <code>shed</code>; you can assume that the older <code>shed</code> interface and the newer <code>toolbox</code> interface can be used interchangeably.


### Audio/Visual Experiment

For the [audio/visual experiment](https://github.com/GoogleChrome/ioweb2015/blob/master/app/scripts/shed/experiment.js),
we used `sw-toolbox`’s [`networkFirst`](https://github.com/GoogleChrome/sw-toolbox#toolboxnetworkfirst)
cache strategy. All HTTP requests matching the URL pattern for the experiment
would first be made against the network, and if a successful response was
returned, that response would then be stashed away using the
[Cache Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Cache).
If a subsequent request was made when the network was unavailable, the
previously cached response would be used.

Because the cache was automatically updated each time a successful network
response came back, we didn’t have to specifically version resources or expire
entries.


    toolbox.router.get('/experiment/(.+)', toolbox.networkFirst);

<figure>
  <figcaption>
    Adapted from the <a href="https://github.com/GoogleChrome/ioweb2015/blob/master/app/scripts/shed/experiment.js">
    original source</a>.
  </figcaption>
</figure>

### Speaker Profile Images

For speaker profile images, our goal was to display a previously cached version of a
given speaker’s image if it was available, falling back to the network to retrieve the
image if it wasn’t. If that network request failed, as a final fallback, we used a
generic placeholder image that was precached (and therefore would always be
available). This is a common strategy to use when dealing with images that
could be replaced with a generic placeholder, and it was easy to implement by
chaining `sw-toolbox`’s
[`cacheFirst`](https://github.com/GoogleChrome/sw-toolbox#toolboxcachefirst) and
[`cacheOnly`](https://github.com/GoogleChrome/sw-toolbox#toolboxcacheonly) handlers.


    var DEFAULT_PROFILE_IMAGE = 'images/touch/homescreen96.png';

    function profileImageRequest(request) {
      return toolbox.cacheFirst(request).catch(function() {
        return toolbox.cacheOnly(new Request(DEFAULT_PROFILE_IMAGE));
      });
    }

    toolbox.precache([DEFAULT_PROFILE_IMAGE]);
    toolbox.router.get('/(.+)/images/speakers/(.*)',
                       profileImageRequest,
                       {origin: /.*\.googleapis\.com/});

<figure>
  <figcaption>
    Adapted from the
    <a href="https://github.com/GoogleChrome/ioweb2015/blob/master/app/scripts/shed/profile-images.js#L21">
    original source</a>.
  </figcaption>
</figure>

<figure>
  <img src="/web/showcase/2015/images/service-workers-iowa/profile-images.png">
  <figcaption>
    Profile images from a <a href="https://events.google.com/io2015/schedule?filters=Develop%20%26%20Design%2CChrome%20%2F%20Web&sid=1b718f8b-b6d4-e411-b87f-00155d5066d7#day1/1b718f8b-b6d4-e411-b87f-00155d5066d7">session page</a>.
  </figcaption>
</figure>

### Updates to Users’ Schedules

One of the key features of IOWA was allowing signed-in users to create and
maintain a schedule of sessions they planned on attending. Like you’d expect,
session updates were made via HTTP `POST` requests to a backend server, and we
spent some time working out the best way to handle those state-modifying
requests when the user is offline. We came up with a combination of a
that queued failed requests in IndexedDB, coupled with logic in the main web page
that checked IndexedDB for queued requests and retried any that it found.


    var DB_NAME = 'shed-offline-session-updates';

    function queueFailedSessionUpdateRequest(request) {
      simpleDB.open(DB_NAME).then(function(db) {
        db.set(request.url, request.method);
      });
    }

    function handleSessionUpdateRequest(request) {
      return global.fetch(request).then(function(response) {
        if (response.status >= 500) {
          return Response.error();
        }
        return response;
      }).catch(function() {
        queueFailedSessionUpdateRequest(request);
      });
    }

    toolbox.router.put('/(.+)api/v1/user/schedule/(.+)',
                       handleSessionUpdateRequest);
    toolbox.router.delete('/(.+)api/v1/user/schedule/(.+)',
                          handleSessionUpdateRequest);

<figure>
  <figcaption>
    Adapted from the <a href="https://github.com/GoogleChrome/ioweb2015/blob/master/app/scripts/shed/offline-session-updates.js">original source</a>.
  </figcaption>
</figure>

Because the retries were made from the context of the main page, we could be
sure that they included a fresh set of user credentials. Once the retries
succeeded, we displayed a message to let the user know that their previously
queued updates had been applied.


    simpleDB.open(QUEUED_SESSION_UPDATES_DB_NAME).then(function(db) {
      var replayPromises = [];
      return db.forEach(function(url, method) {
        var promise = IOWA.Request.xhrPromise(method, url, true).then(function() {
          return db.delete(url).then(function() {
            return true;
          });
        });
        replayPromises.push(promise);
      }).then(function() {
        if (replayPromises.length) {
          return Promise.all(replayPromises).then(function() {
            IOWA.Elements.Toast.showMessage(
              'My Schedule was updated with offline changes.');
          });
        }
      });
    }).catch(function() {
      IOWA.Elements.Toast.showMessage(
        'Offline changes could not be applied to My Schedule.');
    });

<figure>
  <figcaption>
    Adapted from the <a href="https://github.com/GoogleChrome/ioweb2015/blob/97c80df439a530eba09c10ff10c55d629afaba57/app/scripts/helper/schedule.js#L355">original source</a>.
  </figcaption>
</figure>

### Offline Google Analytics

In a similar vein, we implemented a handler to queue any failed Google
Analytics requests and attempt to replay them later, when the network was
hopefully available. With this approach, being offline doesn’t mean sacrificing
the insights Google Analytics offers. We added the [`qt`](/analytics/devguides/collection/protocol/v1/parameters#qt)
parameter to each queued request, set to the amount of time that had passed
since the request was first attempted, to ensure that a proper event
attribution time made it to the Google Analytics backend. Google Analytics
[officially supports](/analytics/devguides/collection/protocol/v1/parameters#qt)
values for `qt` of up to only 4 hours, so we made a best-effort attempt to replay those
requests as soon as possible, each time the service worker started up.


    var DB_NAME = 'offline-analytics';
    var EXPIRATION_TIME_DELTA = 86400000;
    var ORIGIN = /https?:\/\/((www|ssl)\.)?google-analytics\.com/;

    function replayQueuedAnalyticsRequests() {
      simpleDB.open(DB_NAME).then(function(db) {
        db.forEach(function(url, originalTimestamp) {
          var timeDelta = Date.now() - originalTimestamp;
          var replayUrl = url + '&qt=' + timeDelta;
          fetch(replayUrl).then(function(response) {
            if (response.status >= 500) {
              return Response.error();
            }
            db.delete(url);
          }).catch(function(error) {
            if (timeDelta > EXPIRATION_TIME_DELTA) {
              db.delete(url);
            }
          });
        });
      });
    }

    function queueFailedAnalyticsRequest(request) {
      simpleDB.open(DB_NAME).then(function(db) {
        db.set(request.url, Date.now());
      });
    }

    function handleAnalyticsCollectionRequest(request) {
      return global.fetch(request).then(function(response) {
        if (response.status >= 500) {
          return Response.error();
        }
        return response;
      }).catch(function() {
        queueFailedAnalyticsRequest(request);
      });
    }

    toolbox.router.get('/collect',
                       handleAnalyticsCollectionRequest,
                       {origin: ORIGIN});
    toolbox.router.get('/analytics.js',
                       toolbox.networkFirst,
                       {origin: ORIGIN});

    replayQueuedAnalyticsRequests();

<figure>
  <figcaption>
    Adapted from the <a href="https://github.com/GoogleChrome/ioweb2015/blob/master/app/scripts/shed/offline-analytics.js">original source</a>.
  </figcaption>
</figure>

### Push Notification Landing Pages

Service workers didn’t just handle IOWA’s offline functionality—they also
powered the [push notifications](/web/updates/2015/03/push-notifications-on-the-open-web)
that we used to notify users about updates to their bookmarked sessions. The
landing page associated with those notifications displayed the updated session
details. Those landing pages were already being cached as part of the overall
site, so they already worked offline, but we needed to make sure that the
session details on that page were up to date, even when viewed offline. To do
that, we modified previously cached session metadata with the updates that
triggered the push notification, and we stored the result in the cache. This
up-to-date info will be used the next time the session details page is opened,
whether that takes place online or offline.


    caches.open(toolbox.options.cacheName).then(function(cache) {
      cache.match('api/v1/schedule').then(function(response) {
        if (response) {
          parseResponseJSON(response).then(function(schedule) {
            sessions.forEach(function(session) {
              schedule.sessions[session.id] = session;
            });
            cache.put('api/v1/schedule',
                      new Response(JSON.stringify(schedule)));
          });
        } else {
          toolbox.cache('api/v1/schedule');
        }
      });
    });

<figure>
  <figcaption>
    Adapted from the <a href="https://github.com/GoogleChrome/ioweb2015/blob/28113917b88436dd569c39fd5eef184b6aefdd1c/app/scripts/shed/push-notifications.js#L129">original source</a>.
  </figcaption>
</figure>


## Gotchas & Considerations

Of course, no one works on a project of IOWA’s scale without running into a few
gotchas. Here are some of the ones we ran into, and how we worked around them.


### Stale Content

Whenever you’re planning a caching strategy, whether implemented via service
workers or with the standard browser cache, there’s a tradeoff between
delivering resources as quickly as possible versus delivering the freshest
resources. Via `sw-precache`, we implemented an aggressive cache-first
strategy for our application’s shell, meaning our service worker would not check the
network for updates before returning the HTML, JavaScript, and CSS on the page.

Fortunately, we were able to take advantage of [service worker lifecycle events](/web/fundamentals/getting-started/primers/service-workers#lifecycle)
to detect when new content was available after the page had already loaded.
When an updated service worker is detected, we display a
[toast message](https://www.google.com/design/spec/components/snackbars-toasts.html#snackbars-toasts-usage)
to the user letting them know that they should reload their page to see the
newest content.


    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.onstatechange = function(e) {
        if (e.target.state === 'redundant') {
          var tapHandler = function() {
            window.location.reload();
          };
          IOWA.Elements.Toast.showMessage(
            'Tap here or refresh the page for the latest content.',
            tapHandler);
        }
      };
    }

<figure>
  <figcaption>
    Adapted from the <a href="https://github.com/GoogleChrome/ioweb2015/blob/28113917b88436dd569c39fd5eef184b6aefdd1c/app/scripts/helper/service-worker-registration.js#L66">original source</a>.
  </figcaption>
</figure>

<figure>
  <img src="/web/showcase/2015/images/service-workers-iowa/update-toast.png">
  <figcaption>The "latest content" toast.</figcaption>
</figure>


### Make Sure Static Content is Static!

`sw-precache` uses an MD5 hash of local files’ contents, and only fetches
resources whose hash has changed. This means that resources are available on the page
almost immediately, but it also means that once something is cached, it’s going to
stay cached until it’s assigned a new hash in an updated service worker script.

We [ran into an issue](https://github.com/GoogleChrome/ioweb2015/issues/1504)
with this behavior during I/O due to our backend needing to dynamically update
the livestream YouTube video IDs for each day of the conference. Because the
[underlying template file](https://github.com/GoogleChrome/ioweb2015/blob/d2ec7f1a86123483acd1d07fb2c7f84f2413b195/app/templates/layout_full.html#L385)
was static and didn’t change, our service worker update flow wasn’t triggered,
and what was meant to be a dynamic response from the server with updating
YouTube videos ended up being the cached response for a number of users.

You can avoid this type of issue by making sure your web application is
structured so that the shell is always static and can be safely precached,
while any dynamic resources which modify the shell are loaded independently.

### Cache-bust Your Precaching Requests

When `sw-precache` makes requests for resources to precache, it uses those
responses indefinitely as long as it thinks that the MD5 hash for the file hasn’t
changed. This means that it’s particularly important to make sure that the response to
the precaching request is a fresh one, and not returned from the browser’s HTTP
cache. (Yes, `fetch()` requests made in a service worker can respond with
data from the browser’s HTTP cache.)

To ensure that responses we precache are straight from the network and not the
browser’s HTTP cache, `sw-precache` automatically
[appends a cache-busting query parameter](https://github.com/GoogleChrome/sw-precache/blob/16acd75940a83d97b1069b7be00522405bce0690/service-worker.tmpl#L67)
to each URL it requests. If you’re not using `sw-precache` and you are
making use of a cache-first response strategy, make sure that you
[do something similar](https://github.com/GoogleChrome/samples/blob/e4df12c8642381243b6c1710c41394d85b33d82f/service-worker/prefetch/service-worker.js#L56)
in your own code!

A cleaner solution to cache-busting would be to set the
[cache mode](https://fetch.spec.whatwg.org/#concept-request-cache-mode)
of each `Request` used for precaching to `reload`, which will ensure that the
response comes from the network. However, as of this writing, the cache mode
option [isn’t supported](https://code.google.com/p/chromium/issues/detail?id=453190#c10)
in Chrome.

### Support for Logging In & Out

IOWA allowed users to log in using their Google Accounts and update their
customized event schedules, but that also meant that users might later log out.
Caching personalized response data is obviously a tricky topic, and there’s not
always a single right approach.

Since viewing your personal schedule, even when offline, was core to the IOWA
experience, we decided that using cached data was appropriate. When a user signs out,
we made sure to clear previously cached session data.



    self.addEventListener('message', function(event) {
      if (event.data === 'clear-cached-user-data') {
        caches.open(toolbox.options.cacheName).then(function(cache) {
          cache.keys().then(function(requests) {
            return requests.filter(function(request) {
              return request.url.indexOf('api/v1/user/') !== -1;
            });
          }).then(function(userDataRequests) {
            userDataRequests.forEach(function(userDataRequest) {
              cache.delete(userDataRequest);
            });
          });
        });
      }
    });

<figure>
  <figcaption>
    Adapted from the <a href="https://github.com/GoogleChrome/ioweb2015/blob/fae39e1580a448ef31c05b612f2e3c96a77c57fe/app/scripts/shed/cache-then-network.js#L34">original source</a>.
  </figcaption>
</figure>

### Watch Out for Extra Query Parameters!

When a service worker checks for a cached response, it uses a request URL as the key.
By default, the request URL must exactly match the URL used to store the cached response, including
any query parameters in the [search](https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search)
portion of the URL.

This ended up causing an issue for us during development, when we started using
[URL parameters](https://support.google.com/analytics/answer/1033867) to keep track of where our
traffic was coming from. For example, we [added](https://github.com/GoogleChrome/ioweb2015/blob/28113917b88436dd569c39fd5eef184b6aefdd1c/app/scripts/shed/push-notifications.js#L32)
the `utm_source=notification` parameter to URLs that were opened when clicking on one of our
notifications, and used `utm_source=web_app_manifest` in the [`start_url`](https://github.com/GoogleChrome/ioweb2015/blob/0bab714dbb08927f901420fc05b43b9f97f7ddc3/app/templates/manifest.json#L4)
for our [web app manifest](/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android).
URLs which previously matched cached responses were coming up as misses when those parameters
were appended.

This is partially addressed by the [`ignoreSearch`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match#Parameters)
option which can be used when calling `Cache.match()`. Unfortunately, Chrome [doesn't yet](/web/updates/2015/09/updates-to-cache-api#cache-query-options-coming-to-chrome-soon)
support `ignoreSearch`, and even if it did, it's an all-or-nothing behavior. What we needed was a
way to ignore _some_ URL query parameters while taking others that were meaningful into account.

We ended up extending `sw-precache` to strip out some query parameters before checking for a cache
match, and allow developers to customize which parameters are ignored via the
[`ignoreUrlParametersMatching`](https://github.com/GoogleChrome/sw-precache#ignoreurlparametersmatching-arrayregex) option.
Here's the underlying implementation:



    function stripIgnoredUrlParameters(originalUrl, ignoredRegexes) {
      var url = new URL(originalUrl);

      url.search = url.search.slice(1)
        .split('&')
        .map(function(kv) {
          return kv.split('=');
        })
        .filter(function(kv) {
          return ignoredRegexes.every(function(ignoredRegex) {
            return !ignoredRegex.test(kv[0]);
          });
        })
        .map(function(kv) {
          return kv.join('=');
        })
        .join('&');

      return url.toString();
    }

<figure>
  <figcaption>
    Adapted from the <a href="https://github.com/GoogleChrome/sw-precache/blob/22e5b4c32b76e486b5df5954f98c9ff0727d1755/lib/functions.js#L23">original source</a>.
  </figcaption>
</figure>


## What This Means for You

The service worker integration in the Google I/O Web App is likely the most
complex, real-world usage that has been deployed to this point. We’re looking
forward to the web developer community using the tools we created
[`sw-precache`](https://github.com/GoogleChrome/sw-precache) and
[`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox) as well as the
techniques we’re describing to power your own web applications.
Service workers are a [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement)
that you can start using today, and when used as part of a properly structured
web app, the speed and offline benefits are significant for your users.

