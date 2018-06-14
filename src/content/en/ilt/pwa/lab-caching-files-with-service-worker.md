project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2018-03-08 #}
{# wf_published_on: 2016-01-01 #}


# Lab: Caching Files with Service Worker {: .page-title }




Concepts:  [Caching Files with Service Worker](caching-files-with-service-worker)

<div id="overview"></div>


## Overview




This lab covers the basics of caching files with the service worker. The technologies involved are the  [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) and the  [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API). See the  [Caching files with the service worker](caching-files-with-service-worker) doc for a full tutorial on the Cache API. See  [Introduction to Service Worker](introduction-to-service-worker) and  [Lab: Scripting the service worker](lab-scripting-the-service-worker) for more information on service workers.

#### What you will learn

* How to use the Cache API to access and manipulate data in the cache
* How to cache the application shell and offline pages
* How to intercept network requests and respond with resources in the cache
* How to remove unused caches on service worker activation

#### What you should know

* Basic JavaScript and HTML
* Familiarity with the concept and basic syntax of ES2015  [Promises](/web/fundamentals/getting-started/primers/promises)

#### What you will need

* Computer with terminal/shell access
* Connection to the internet
* A  [browser that supports `caches`](https://jakearchibald.github.io/isserviceworkerready/)
* A text editor

<div id="1"></div>


## 1. Get set up




If you have not downloaded the repository, installed Node, and started a local server, follow the instructions in [Setting up the labs](setting-up-the-labs).

Open your browser and navigate to __localhost:8080/cache-api-lab/app__.



Note: <a href="tools-for-pwa-developers#unregister">Unregister</a> any service workers and <a href="tools-for-pwa-developers#clearcache">clear all service worker caches</a> for localhost so that they do not interfere with the lab.



If you have a text editor that lets you open a project, open the __cache-api-lab/app__ folder. This will make it easier to stay organized. Otherwise, open the folder in your computer's file system. The __app__ folder is where you will be building the lab.

This folder contains:

* __images__ folder contains sample images, each with several versions at different resolutions
* __pages__ folder contains sample pages and a custom offline page
* __style__ folder contains the app's cascading stylesheet
* __test__ folder contains QUnit tests
* __index.html__ is the main HTML page for our sample site/application
* __service-worker.js__ is the service worker file where we set up the interactions with the cache

<div id="2"></div>


## 2. Cache the application shell




Cache the application shell in the "install" event handler in the service worker.

Replace TODO 2 in __serviceworker.js__ with the following code:

#### service-worker.js

```
var filesToCache = [
  '.',
  'style/main.css',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
  'images/still_life-1600_large_2x.jpg',
  'images/still_life-800_large_1x.jpg',
  'images/still_life_small.jpg',
  'images/still_life_medium.jpg',
  'index.html',
  'pages/offline.html',
  'pages/404.html'

];

var staticCacheName = 'pages-cache-v1';

self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});
```

Save the code and reload the page in the browser. [Update the service worker](tools-for-pwa-developers#update) and then [open the cache storage](tools-for-pwa-developers#storage) in the browser. You should see the files appear in the table. You may need to refresh the page again for the changes to appear.

Open the first QUnit test page, __app/test/test1.html__, in another browser tab.



Note: Be sure to open the test page using the localhost address so that it opens from the server and not directly from the file system.



This page contains several tests for testing our app at each stage of the codelab. Passed tests are blue and failed tests are red. At this point, your app should pass the first two tests. These check that the cache exists and that it contains the app shell.



__Caution:__ Close the test page when you're finished with it, otherwise you won't be able to activate the updated service worker in the next sections. See the  [Introduction to service worker](introduction-to-service-worker#activation) text for an explanation.





Note: In Chrome, you can <a href="tools-for-pwa-developers#clearcache">delete the cache</a> in <strong>DevTools</strong>.



#### Explanation

We first define the files to cache and assign them the to the `filesToCache` variable. These files make up the "application shell" (the static HTML,CSS, and image files that give your app a unified look and feel). We also assign a cache name to a variable so that updating the cache name (and by extension the cache version) happens in one place.

In the install event handler we create the cache with  [`caches.open`](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/open) and use the  [`addAll` method](https://developer.mozilla.org/en-US/docs/Web/API/Cache/addAll) to add the files to the cache. We wrap this in  [`event.waitUntil`](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil) to extend the lifetime of the event until all of the files are added to the cache and `addAll` resolves successfully.

#### For more information

*  [The Application Shell](introduction-to-progressive-web-app-architectures)
*  [The install event - MDN](https://developer.mozilla.org/en-US/docs/Web/API/InstallEvent)

<div id="3"></div>


## 3. Serve files from the cache




Now that we have the files cached, we can intercept requests for those files from the network and respond with the files from the cache.

Replace TODO 3 in <strong>service-worker.js</strong> with the following:

#### service-worker.js

```
self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      // TODO 4 - Add fetched files to the cache

    }).catch(function(error) {

      // TODO 6 - Respond with custom offline page

    })
  );
});
```

Save the code and [update the service worker](tools-for-pwa-developers#update) in the browser (make sure you have closed the __test.html__ page). Refresh the page to see the network requests being logged to the console. Now [take the app offline](tools-for-pwa-developers#offline) and refresh the page. The page should load normally!

#### Explanation

The `fetch` event listener intercepts all requests. We use  [`event.respondWith`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith) to create a custom response to the request. Here we are using the  [Cache falling back to network](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) strategy: we first check the cache for the requested resource (with  [`caches.match`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)) and then, if that fails, we send the request to the network.

#### For more information

*  [caches.match - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
*  [The Fetch API](working-with-the-fetch-api)
*  [The fetch event - MDN](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent)

<div id="4"></div>


## 4. Add network responses to the cache




We can add files to the cache as they are requested.

Replace TODO 4 in the `fetch` event handler with the code to add the files returned from the fetch to the cache:

#### service-worker.js

```
.then(function(response) {

  // TODO 5 - Respond with custom 404 page

  return caches.open(staticCacheName).then(function(cache) {
    if (event.request.url.indexOf('test') < 0) {
      cache.put(event.request.url, response.clone());
    }
    return response;
  });
});
```

Save the code. Take the app back online and [update the service worker](tools-for-pwa-developers#update). Visit at least one of the links on the homepage, then take the app offline again. Now if you revisit the pages they should load normally! Try navigating to some pages you haven't visited before.

Take the app back online and open __app/test/test1.html__ in a new tab. Your app should now pass the third test that checks whether network responses are being added to the cache. Remember to close the test page when you're done.

#### Explanation

Here we are taking the responses returned from the network requests and putting them into the cache.

We need to pass a clone of the response to `cache.put`, because the response can only be read once. See Jake Archibald's <a href="https://jakearchibald.com/2014/reading-responses/">What happens when you read a response</a> article for an explanation.

We have wrapped the code to cache the response in an `if` statement to ensure we are not caching our test page.

#### For more information

*  [Cache.put - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Cache/put)

<div id="5"></div>


## 5. Respond with custom 404 page




Below TODO 5 in __service-worker.js__, write the code to respond with the <strong>404.html</strong> page from the cache if the response status is <code>404</code>. You can check the response status with <code>response.status</code>.

To test your code, save what you've written and then [update the service worker](tools-for-pwa-developers#update) in the browser. Click the __Non-existent file__ link to request a resource that doesn't exist.

#### Explanation

Network response errors do not throw an error in the `fetch` promise. Instead, `fetch` returns the response object containing the error code of the network error. This means we handle network errors in a `.then` instead of a `.catch`. However, if the `fetch` cannot reach the network (user is offline) an error is thrown in the promise and the `.catch` executes.



Note: When intercepting a network request and serving a custom response, the service worker does not redirect the user to the address of the new response. The response is served at the address of the original request. For example, if the user requests a nonexistent file at __www.example.com/non-existent.html__ and the service worker responds with a custom 404 page, __404.html__, the custom page will display at __www.example.com/non-existent.html__, not __www.example.com/404.html__.



#### For more information

*  [Response.status - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Response/status)
*  [Response status codes - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
*  [Response.ok - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)

#### Solution code

The solution code can be found in the __05-404-page__ directory.

<div id="6"></div>


## 6. Respond with custom offline page




Below TODO 6 in the `.catch` in <strong>service-worker.js</strong>, write the code to respond with the <strong>offline.html</strong> page from the cache. The catch will trigger if the fetch to the network fails.

To test your code, save what you've written and then update the service worker in the browser. [Take the app offline](tools-for-pwa-developers#offline) and navigate to a page you haven't visited before to see the custom offline page.

#### Explanation

If `fetch` cannot reach the network, it throws an error and sends it to a `.catch`.

#### Solution code

The solution code can be found in the __06-offline-page__ directory.

<div id="7"></div>


## 7. Delete outdated caches




We can get rid of unused caches in the service worker "activate" event.

Replace TODO 7 in <strong>service-worker.js</strong> with the following code:

#### service-worker.js

```
self.addEventListener('activate', function(event) {
  console.log('Activating new service worker...');

  var cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

Try changing the name of the cache to "pages-cache-v2":

#### service-worker.js

```
var staticCacheName = 'pages-cache-v2';
```

Save the code and [update the service worker](tools-for-pwa-developers#update) in the browser. [Inspect the cache storage](tools-for-pwa-developers#storage) in your browser. You should see just the new cache. The old cache, `pages-cache-v1`, has been removed.

Open __app/test/test2.html__ in a new browser tab. The test checks whether `pages-cache-v1` has been deleted and that `pages-cache-v2` has been created.

#### Explanation

We delete old caches in the `activate` event to make sure that we aren't deleting caches before the new service worker has taken over the page. We create an array of caches that are currently in use and delete all other caches.

#### For more information

*  [Promise.all - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
*  [Array.map - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

#### Solution code

The solution code can be found in the __solution__ directory.

<div id="8"></div>


## Congratulations!




You have learned how to use the Cache API in the service worker.

### What we've covered

You have learned the basics of using the Cache API in the service worker. We have covered caching the application shell, intercepting network requests and responding with items from the cache, adding resources to the cache as they are requested, responding to network errors with a custom offline page, and deleting unused caches.

### Resources

#### Learn more about caching and the Cache API

*  [Cache - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
*  [The Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/)

#### Learn more about using service workers

*  [Using Service Workers - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)


