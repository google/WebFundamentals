project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-07-11T21:27:12Z #}
{# wf_published_on: 2016-01-01 #}


# Lab: Offline Quickstart {: .page-title }




Concepts:  [Offline Quickstart](offline-quickstart)

<div id="overview"></div>


## Overview




This lab shows you how to add offline capabilities to an application using service workers. 

#### What you will learn

* How to add offline capabilities to an application

#### What you should know

* Basic HTML, CSS, and JavaScript
* Familiarity with ES2015  [Promises](/web/fundamentals/getting-started/primers/promises)

#### What you will need

* Computer with terminal/shell access
* Connection to the internet 
* A browser that supports  [service workers](https://jakearchibald.github.io/isserviceworkerready/)
* A text editor

<div id="1"></div>


## 1. Get set up




If you have not downloaded the repository, installed Node, and started a local server, follow the instructions in [Setting up the labs](setting-up-the-labs).

Open your browser and navigate to __localhost:8080/offline-quickstart-lab/app__.



Note: <a href="tools-for-pwa-developers#unregister">Unregister</a> any service workers and <a href="tools-for-pwa-developers#clearcache">clear all service worker caches</a> for localhost so that they do not interfere with the lab.



If you have a text editor that lets you open a project, open the __offline-quickstart-lab/app__ folder. This will make it easier to stay organized. Otherwise, open the folder in your computer's file system. The __app__ folder is where you will be building the lab.

This folder contains:

* __images__ folder contains sample images
* __styles/main.css__ is the main cascading stylesheet for the app
* __index.html__ is the main HTML page for our sample site/application
* __service-worker.js__ is the service worker file (currently empty)

<div id="2"></div>


## 2. Taking the app offline




Let's create a service worker to add offline functionality to the app. 

### 2.1 Cache static assets on install

Replace the TODO 2.1 comment in <strong>service-worker.js</strong> with the following code:

#### service-worker.js

```
var CACHE_NAME = 'static-cache';

var urlsToCache = [
  '.',
  'index.html',
  'styles/main.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
```

Save the file.

#### Explanation

This code starts by defining a cache name, and a list of URLs to be cached. An install event listener is then added to the service worker. When the service worker installs, it opens a cache and stores the app's static assets. Now these assets are available for quick loading from the cache, without a network request.

Note that `.` is also cached. This represents the current directory, in this case, __app/__. We do this because the browser attempts to fetch __app/__ first before fetching __index.html__. When the app is offline, this results in a 404 error if we have not cached __app/__. They should both be cached to be safe.  



Note: Don't worry if you don't understand all of this code; this lab is meant as an overview. The <code>event.waitUntil</code> code can be particularly confusing. This operation simply tells the browser not to preemptively terminate the service worker before the asynchronous operations inside of it have completed.



### 2.2 Fetch from the cache

Replace TODO 2.2 in <strong>service-worker.js</strong> with the following code:

#### service-worker.js

```
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetchAndCache(event.request);
    })
  );
});

function fetchAndCache(url) {
  return fetch(url)
  .then(function(response) {
    // Check if we received a valid response
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return caches.open(CACHE_NAME)
    .then(function(cache) {
      cache.put(url, response.clone());
      return response;
    });
  })
  .catch(function(error) {
    console.log('Request failed:', error);
    // You could return a custom offline 404 page here
  });
}
```

Save the script.

#### Explanation

This code adds a fetch event listener to the service worker. When a resource is requested, the service worker intercepts the request and a fetch event is fired. The code then does the following:

* Tries to match the request with the content of the cache, and if the resource is in the cache, then returns it.
* If the resource is not in the cache, attempts to get the resource from the network using fetch.
* If the response is invalid, throws an error and logs a message to the console (`catch`).
* If the response is valid, creates a copy of the response (`clone`), stores it in the cache, and then returns the original response.



Note: We <code>clone</code> the response because the request is a stream that can only be consumed once. Because we want to put it in the cache and serve it to the user, we need to clone a copy. See Jake Archibald's <a href="https://jakearchibald.com/2014/reading-responses/">What happens when you read a response</a> article for a more in-depth explanation.



### 2.3 Register the service worker

Replace TODO 2.3 in <strong>index.html</strong> with the following code:

#### index.html

```
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
  .then(function(registration) {
    console.log('Registered:', registration);
  })
  .catch(function(error) {
    console.log('Registration failed: ', error);
  });
}
```

Save the file.

#### Explanation

This code first checks that service worker is supported by the browser. If it is, the service worker that we just wrote is registered, beginning the installation process.

### 2.4 Test the app offline

Now our app has offline functionality. Save all files and refresh the __app/__ in the browser. You can [check the cache](tools-for-pwa-developers#cache) and see that the HTML and CSS are cached from the service worker installation event.

Refresh the page again. This fetches all of the page's assets, and the fetch listener caches any asset that isn't already cached.

Stop the server (use `Ctrl+c` if your server is running from the command line) or [switch the browser to offline mode](tools-for-pwa-developers#offline) to simulate going offline. Then refresh the page. The page should load normally!



Note: You may see an error when the page tries to fetch the service worker script. This is because the browser attempts to re-fetch the service worker file for every navigation request. If offline, the attempt fails (causing an error log). However, the browser should default to the installed service worker and work as expected.



#### Explanation

When our app opens for the first time, the service worker is registered, installed, and activated. During installation, the app caches the most critical static assets (the main HTML and CSS). On future loads, each time a resource is requested the service worker intercepts the request, and checks the cache for the resource before going to the network. If the resource isn't in the cache, the service worker fetches it from the network and caches a copy of the response. Since we refreshed the page and fetched all of its assets, everything needed for the app is in the cache and it can now open without the network.



Note: You might be thinking, why didn't we just cache everything on install? Or, why did we cache anything on install, if all fetched resources are cached? This lab is intended as an overview of how you can bring offline functionality to an app. In practice, there are a variety of caching strategies and tools that let you customize your app's offline experience. Check out the <a href="/web/fundamentals/instant-and-offline/offline-cookbook/">Offline Cookbook</a> for more info.



#### Solution code

To get a copy of the working code, navigate to the __solution__ folder.

<div id="3"></div>


## Congratulations!




You now know the basics of adding offline functionality to an app.


