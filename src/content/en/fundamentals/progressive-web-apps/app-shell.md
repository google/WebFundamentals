project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-09-26 #}
{# wf_published_on: 2016-09-27 #}

# Architecting a PWA with the App Shell Model {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

Using the application shell architecture is one way to build PWAs that reliably
and instantly load on your users’ screens, similar to what you see in native
applications. An app shell is the recommended approach to migrating existing
single-page apps (SPAs) and structuring your PWA. This architecture provides
connectivity resilience and it is what makes a PWA feel like a native app to the
user, giving it application-like interaction and navigation, and reliable
performance.

An **application shell (or app shell)** refers to the local resources that your
web app needs to load the skeleton of your user interface (UI). Think of your
app’s shell like the bundle of code you would publish to a native app store when
building a native app. It is the load needed to get off the ground but might not
be the whole story. For example, if you have a native news application, you
upload all of the views and fonts and images necessary to render the basic
skeleton of the app but not the actual news stories. The news is the dynamic
content that is not  uploaded to the native app store but is fetched at runtime
when the app is opened.

For SPAs with JavaScript-heavy architectures, an application shell is the go-to
approach. This approach relies on aggressively caching the "shell" of your web
application (typically the basic HTML, JavaScript, and CSS) needed to display
your layout and to get the application running. Next, the dynamic content loads
for each page using JavaScript. An app shell is useful for getting some initial
HTML to the screen fast without a network.

An app shell always includes HTML, usually includes JavaScript and CSS, and
might include any other static resources that provide the structure for your
page. However, it does not include the actual content specific to the page. In
other words, the app shell contains the parts of the page that change
infrequently and can be cached so that they can be loaded instantly from the
cache on repeat visits. Generally, this includes the pieces of your UI commonly
across a few different pages of your site—headers, toolbars, footers and so
on—that compose everything other than the primary content of the page. Some
static web apps, where the page content does not change at all, consist entirely
of an app shell.

The app shell should:

* Load fast
* Use as little data as possible
* Use static assets from a local cache
* Separate content from navigation
* Retrieve and display page-specific content (HTML, JSON, etc.)
* Optionally, cache dynamic content

All resources that are precached are fetched by a service worker that runs in a
separate thread. It is important to be judicious in what you retrieve because
fetching files that are nonessential (large images that are not shown on every
page, for instance) result in browsers downloading more data than is strictly
necessary when the service worker is first installed. This can result in delayed
loading and consume valuable data, and that often leads to user frustration and
abandonment.

The app shell keeps your UI local and pulls in content dynamically through an
API but does not sacrifice the linkability and discoverability of the web. The
next time the user accesses your app, the latest version displays automatically.
There is no need to download new versions before using it.

<img src="images/architecture/appshell.png" 
alt="Application Shell architecture" class="screenshot"/>

Building a PWA does not mean starting from scratch. If you are building a modern
[single-page app (SPA)](https://en.wikipedia.org/wiki/Single-page_application),
then you are probably using something similar to an app shell already whether
you call it that or not. The details might vary a bit depending upon which
libraries or frameworks you are using, but the concept itself is framework
agnostic.

To see how Google built an app shell architecture, take a look at [Building the
Google I/O 2016 Progressive Web App](/web/showcase/2016/iowa2016). This real-
world app started with a SPA to create a PWA that pre caches content using a
service worker, dynamically loads new pages, gracefully transitions between
views, and reuses content after the first load.

### When should you use the app shell architecture

When should you use the app shell architecture?  It makes the most sense for
apps and sites with relatively unchanging navigation but changing content. A
number of modern JavaScript frameworks and libraries already encourage splitting
your application logic from the content, making this architecture more
straightforward to apply. For a certain class of websites that only have static
content you can still follow the same model but the site is 100% app shell.

### App Shell Features {: #app-shell-features }

PWAs use a service worker to cache the app shell and data content so that it
always loads fast regardless of the network conditions, even when fully offline,
retrieving from cache when appropriate and making live calls when appropriate.
For instance, a service worker can redirect HTTP/HTTPS requests to a cache and
serve dynamic data from a local database. But, unlike [the older AppCache
standard](http://www.w3schools.com/html/html5_app_cache.asp) with its fixed
rules, all of these decisions happen in the code that you write. Developers get
to decide how network requests from apps are handled.

### Benefits {: #app-shell-benefits }

The benefits of an app shell architecture with a service worker include:

* Reliable performance that is consistently fast. Repeat visits are extremely
quick.  Static assets (e.g. HTML, JavaScript, images and CSS) are immediately
cached locally so there is no need to re-fetch the shell (and optionally the
content if that is cached too). The UI is cached locally and content is
updated dynamically as required. 

* Application-like interactions. By adopting the *app shell**-plus-content*
application model, you can create experiences  with application-like
navigation and interactions, complete with offline support.

* Economical use of data. Design for minimal data usage and be judicious in
what you cache because listing files that are non-essential (large images
that are not shown on every page, for instance) result in browsers
downloading more data than is strictly necessary. Even though data is
relatively cheap in western countries, this is not the case in emerging
markets where connectivity is expensive and data is costly.

### Example HTML for an App Shell {: #example-html-for-appshell }

The example separates the core application infrastructure and UI from the data. It is important to keep the initial load as simple as possible to display just the page’s layout as soon as the web app is opened. Some of it comes from your application’s index file (inline DOM, styles) and the rest is loaded from external scripts and stylesheets. 

All of the UI and infrastructure is cached locally using a service worker so that on subsequent loads, only new or changed data is retrieved, instead of having to load everything.

Assume you are building a simple blog reader. The components of a simple app shell include:

* A link to the manifest file
* Navigation UI and logic
* The code to display posts after they are retrieved from the server (and store them in a local database)
* The code to display comments (also storing them in the database)
* Optionally, the code for posting comments

Your `index.html` file in your work directory should look something like the following code. This is a subset of the actual contents and is not a complete index file. See [https://app-shell.appspot.com/](https://app-shell.appspot.com/) for a real-life look at a very simple app shell.

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>App Shell</title>
      <link rel="manifest" href="/manifest.json">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>App Shell</title>
      <link rel="stylesheet" type="text/css" href="styles/inline.css">
    </head>

    <body>
      <header class="header">
        <h1 class="header__title">App Shell</h1>
      </header>
      <main class="main">
      ...
      </main>

      <div class="dialog-container">
      . . .
      </div>

      <div class="loader">
        <svg viewBox="0 0 32 32" width="32" height="32">
          <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
        </svg>
      </div>

      <script src="app.js" async></script>
    </body>
    </html>

In this example, the key change is to add the link to the manifest file as shown in the bold text. The rest of this file is standard HTML.


## Building Your App Shell {: #building-your-app-shell }

Structure your app for a clear distinction between the page shell and the dynamic content. In general, your app should load the simplest shell possible but include enough meaningful page content with the initial download. By now you have analyzed your app and the [architectural styles](), [APIs](), and [caching strategies](#sw-toolbox-caching-strategies) and determined the right balance between speed and data freshness for each of your data sources. 

### Prerequisites

* Make sure your site is served using HTTPS. Service Worker functionality is [only available](https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features) on pages that are accessed via HTTPS. (http://localhost also works well to facilitate testing.)

* Create a web app manifest
* Edit the index.html to tell the browser where to find the manifest
* Register the service worker 
* Incorporate sw-precache into your node-based build script


### Caching the Application Shell

You can manually hand code an app shell or use the sw-precache service worker library to automatically generate it and minimize the amount of boilerplate code you must write.

Note: The examples are provided for general information and illustrative purposes only. The actual resources used, such as jQuery, may be different for your application.

#### Caching the App Shell Manually

    var cacheName = 'shell-content';
    var filesToCache = [
      '/css/bootstrap.css',
      '/css/main.css',
      '/js/bootstrap.min.js',
      '/js/jquery.min.js',

      '/offline.html’,

      '/’,
    ];

    self.addEventListener('install', function(e) {
      console.log('[ServiceWorker] Install');
      e.waitUntil(
        caches.open(cacheName).then(function(cache) {
          console.log('[ServiceWorker] Caching app shell');
          return cache.addAll(filesToCache);
        })
      );
    });

#### Using sw-precache to Cache the App Shell

The [sw-precache](#sw-precache-intro) section earlier in this document describes this API in detail. This section describes how you can run the [sw-precache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) API as a command-line tool or as part of your build process. 

Caution: Every time you make changes to local files and are ready to deploy a new version of your site, re-run this step. To ensure this is done, include the task that generates your service worker code in your list of tasks that are automatically run as part of your deployment process. 

## Conclusion {: #conclusion }

Using the architectures and technologies in this document means you now have a
key to unlock faster performance, push notifications, and offline operation. The
*app shell + service worker* model is the one of the best ways to structure your
web apps if you want reliable and instant load times. This model also allows you
to progressively enhance your web app to support additional offline experiences,
background synchronization, and push notifications..


