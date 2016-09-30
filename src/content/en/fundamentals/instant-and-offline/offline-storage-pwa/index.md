project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-09-29 #}
{# wf_published_on: 2016-09-29 #}

# **Offline Storage for Progressive Web Apps** {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

![image alt text](images/image_0.jpg)

The Pokedex.org Progressive Web App uses IndexedDB for application state and
the Pokemon data set while the Cache API is used for URL addressable resources.

Internet connections can be flakey or non-existent on the go, which is why
offline support and reliable performance are common features in [Progressive
Web Apps](https://developers.google.com/web/progressive-web-apps/). Even in
perfect wireless environments, judicious use of caching and other storage
techniques can substantially improve the user experience. In this post, we’ll
summarize some ideas around offline data storage* *for PWAs — think JSON
payloads, images and general static data required to provide a *meaningful*
experience offline.

Let’s get right to the point with a general recommendation for storing data
offline:

For URL addressable resources, use the [Cache
API](https://davidwalsh.name/cache) (part of [Service
Worker](https://developers.google.com/web/fundamentals/primers/service-worker/)).
For all other data, use
[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
(with a [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)
wrapper).

Here’s the rationale:

* Both APIs are asynchronous (IDB is event based and the Cache API is Promise
based). They also work with [Web Workers, Window and Service
Workers](https://nolanlawson.github.io/html5workertest/).

* IDB is available [everywhere](http://caniuse.com/#feat=indexeddb). Service
Workers (and the Cache API) are [now
available](https://jakearchibald.github.io/isserviceworkerready/) in Chrome,
Firefox, Opera and are in development for Edge.

* Promise wrappers for IDB hide some of the powerful but also complex
machinery (e.g. transactions, schema versioning) that comes the IDB library.

* IDB will support [observers](https://github.com/WICG/indexed-db-observers),
which allow easy synchronization between tabs.

* Safari 10 has [fixed many long-standing IDB
bugs](https://gist.github.com/nolanlawson/08eb857c6b17a30c1b26) in their latest
Tech Previews. (NOTE:  Some folks have run into stability issues with Safari
10’s IDB and PouchDB have found it to be a little slow. Until more research has
been done here, YMMV. Please do test and file browser bugs so the folks @webkit
and related OSS library authors can take a look. LocalForage, PouchDB, YDN and
Lovefield use WebSQL in Safari by default due to UA sniffing (there wasn’t an
efficient way to feature-test for broken IDB at the time). This means these
libraries will work in Safari 10 without extra effort (just not using IDB
directly).)

* For PWAs, you can cache static resources composing your application shell
(JS/CSS/HTML files) using the Cache API and fill in the offline page data from
IndexedDB.

* Debugging support for IndexedDB is now available in
[Chrome](https://developers.google.com/web/tools/chrome-devtools/iterate/manage-data/local-storage)
(Application tab), Opera,
[Firefox](https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector)
(Storage Inspector) and Safari (see the Storage tab).

## **What about other storage mechanisms?**

* Web Storage (e.g LocalStorage and SessionStorage) is synchronous, has no Web
Worker support and is size-limited (only strings).

* Cookies [have their
uses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) but are
synchronous, lack Web Worker support and are also size-limited.

* WebSQL does not have broad browser support and its use is not recommended.

* File System API is not supported on any browser besides Chrome.

* The [File API](https://developer.mozilla.org/en-US/docs/Web/API/File) is
being improved in the [File and Directory Entries
API](https://wicg.github.io/entries-api/) and [File
API](https://w3c.github.io/FileAPI/) specs but neither is sufficiently mature
or standardized to encourage widespread adoption yet.

## **Some helpful resources**

### **IndexedDB Libraries worth checking out:**

* [localForage](https://mozilla.github.io/localForage/)(~8KB, Promises, good
legacy browser support)

* [Dexie](http://dexie.org/) (~16KB, Promises, complex queries, secondary
indices)

* [PouchDB](https://pouchdb.com/) (~45KB (supports [custom
builds](https://pouchdb.com/2016/06/06/introducing-pouchdb-custom-builds.html)),
synchronization)

* [Lovefield](https://github.com/google/lovefield)(relational)

* [LokiJS](http://lokijs.org/#/) (in-memory)

* [ydn-db](https://github.com/yathit/ydn-db)(dexie-like, works with WebSQL)

### **Service Worker Libraries worth checking out:**

* [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) (offline caching
for dynamic/runtime requests)

* [sw-precache](https://github.com/GoogleChrome/sw-precache) (offline
precaching for static assets/application shells)

* Webpack users can directly use the above or
[offline-plugin](https://github.com/NekR/offline-plugin)

## **How much can I store?**

In Chrome and Opera, your storage is per origin (rather than per API). Both
storage mechanisms will store data until the browser
[quota](http://www.html5rocks.com/en/tutorials/offline/quota-research/) is
reached. Apps can check how much quota they’re using with the [Quota Management
API](https://www.w3.org/TR/quota-api/). In Firefox, apps can use up to 10% of
free disk space, but will prompt after 50MB data stored. In mobile Safari, apps
can use up to 50MB max, whereas desktop Safari allows unlimited storage (and
prompts after 5MB). IE10+ maxes out at 250MB and prompts at 10MB. PouchDB
[tracks](https://pouchdb.com/faq.html#data_limits) IDB storage behavior.

## **How can I tell how much storage space my app is using?**

The [Quota Management API](https://www.w3.org/TR/quota-api/) lets you query for
the size of storage space currently used and how much is available to the
application. It also enables requesting for more storage if needed.  A newer
[Storage Quota Estimate
API](https://www.chromestatus.com/features/5630353511284736) tries to make it
even easier to discover how much quota an origin is using with support for
Promises.

## **How does cache eviction work?**

An origin is given an amount of space to do with as it pleases. This free space
is shared across all forms of origin storage (IndexedDB, Cache API,
localStorage etc). The amount given isn’t specified and will vary depending on
device and storage conditions.

When web storage is low, a UA will clear storage to make space available. This
can harm offline responsiveness so the recently updated
[Storage](https://storage.spec.whatwg.org/) spec defines "persistent", and
“best effort” strategies, with “best effort” being the default. “best effort”
means the storage can be cleared without interrupting the user, but is less
durable for long-term and/or critical data. IndexedDB and the Cache API both
fall into the “best effort” category today.

"persistent" storage is not automatically cleared when storage is low - the
user needs to manually clear this storage (via browser settings). Chrome has
been experimenting with support for [Persistent
Storage](https://developers.google.com/web/updates/2016/06/persistent-storage?hl=en)
under an origin trial, and the latest news suggests it will be shipping in
[Chrome
55](https://groups.google.com/a/chromium.org/d/msg/blink-dev/5Sihi1iAXYc/wnvNDFIPAQAJ).

## **Current and future offline storage work**

If offline storage interests you, the below efforts are worth keeping an eye
on. One particularly exciting development in progress is native Promises
support in IndexedDB without the need for a separate library.

![image alt text](images/image_1.jpg)

IDB with some await goodness.

Other developments to keep an eye on:

* [Durable Storage](https://storage.spec.whatwg.org/): protect storage from
the user agent’s clearing policies

* [Indexed Database API 2.0](https://w3c.github.io/IndexedDB/): advanced
key-value data management

* [Promisified
IndexedDB](https://github.com/inexorabletash/indexeddb-promises): native
support for a Promise-friendly version of IDB

* [IndexedDB Observers](https://github.com/WICG/indexed-db-observers): native
IDB observation without needing wrapper around the database

* [Async Cookies API](https://github.com/bsittler/async-cookies-api): async
JavaScript cookies API for documents and workers

* [Quota Management API](https://www.w3.org/TR/quota-api/): check how much
quota an app/origin is using

* [writable-files](https://github.com/WICG/writable-files): allow sites to
interact with local files more seamlessly

* [Directory downloads](https://github.com/drufball/directory-download): allow
sites to download directories without .zip files

* [File and Directory Entries API](https://wicg.github.io/entries-api/):
support for file and directory upload by drag-and-drop.

* Support for an [Async Cookies
API](https://github.com/WICG/async-cookies-api) is being sketched out right now
with a polyfill in the works.

* Debugging IDB is not currently supported in Edge (however, it is possible to
debug the underlying JetDB) — vote
[here](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6517763-indexeddb-explorer-in-dev-tools)
for built in support.

* Although [ideas](https://github.com/slightlyoff/async-local-storage) for
async LS have been kicked around in the past, current focus is on getting
[IndexedDB 2.0](https://w3c.github.io/IndexedDB/) in a good state.

* The [writable-files](https://github.com/WICG/writable-files) proposal may
eventually give us a better standards-track solution for seamless local file
interaction.

* For apps requiring more persistent storage, see the on-going work on
[Durable Storage](https://storage.spec.whatwg.org/).

Offline storage isn’t quite magical and an understanding of the underlying APIs
will go far in helping you make the most out of what we now have available.
Whether you prefer to directly use these APIs or work with an abstraction
library, take some time to get familiar with your options.

Hopefully this guidance will help craft an offline experience that makes your
PWA shine! ✨

## **Background Reading**

* [State of offline storage
APIs](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit)
by Joshua Bell

* [Browser Database
Comparison](http://nolanlawson.github.io/database-comparison/) by Nolan Lawson

* [IndexedDB, WebSQL, LocalStorage — what blocks the
DOM?](https://nolanlawson.com/2015/09/29/indexeddb-websql-localstorage-what-blocks-the-dom/)

* [How to think about databases (Pokedex
research)](https://nolanlawson.com/2016/02/08/how-to-think-about-databases/)

* [Which APIs are supported in Web Workers and Service
Workers?](https://nolanlawson.github.io/html5workertest/)

*T**hanks to Nolan Lawson, Joshua Bell (whose work on Open Web Storage and
**[BlinkOn
tal*k](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit)*
heavily inspired this article), Jake Archibald, Dru Knox and others for their
previous work in the web storage space.*

