project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-06-14T20:46:52Z #}
{# wf_published_on: 2016-01-01 #}


# Caching Files with Service Worker {: .page-title }




Codelab:  [Caching Files with Service Worker](lab-caching-files-with-service-worker)

<div id="cacheinsw"></div>


## Using the Cache API in the service worker




The Service Worker API comes with a  [Cache interface](https://developer.mozilla.org/en-US/docs/Web/API/Cache), that lets you create stores of responses keyed by request. While this interface was intended for service workers it is actually exposed on the window, and can be accessed from anywhere in your scripts. The entry point is `caches`.

You are responsible for implementing how your script (service worker) handles updates to the cache. All updates to items in the cache must be explicitly requested; items will not expire and must be deleted. 

<div id="whentostore"></div>

### Storing resources

In this section, we outline a few common patterns for caching resources:  *on service worker install* ,  *on user interaction* , and  *on network response* . There are a few patterns we don't cover here. See the  [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/) for a more complete list.

#### On install - caching the application shell

We can cache the HTML, CSS, JS, and any static files that make up the application shell in the `install` event of the service worker:

```
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          '/css/bootstrap.css',
          '/css/main.css',
          '/js/bootstrap.min.js',
          '/js/jquery.min.js',
          '/offline.html'
        ]
      );
    })
  );
});
```

This event listener triggers when the service worker is first installed.



Note: It is important to note that while this event is happening, any previous version of your service worker is still running and serving pages, so the things you do here must not disrupt that. For instance, this is not a good place to delete old caches, because the previous service worker may still be using them at this point.



[`event.waitUntil`](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil) extends the lifetime of the `install` event until the passed promise resolves successfully. If the promise rejects, the installation is considered a failure and this service worker is abandoned (if an older version is running, it stays active). 

`cache.addAll` will reject if any of the resources fail to cache. This means the service worker will only install if all of the resources in `cache.addAll` have been cached.

#### On user interaction

If the whole site can't be taken offline, you can let the user select the content they want available offline (for example, a video, article, or photo gallery).

One method is to give the user a "Read later" or "Save for offline" button. When it's clicked, fetch what you need from the network and put it in the cache:

```
document.querySelector('.cache-article').addEventListener('click', function(event) {
  event.preventDefault();
  var id = this.dataset.articleId;
  caches.open('mysite-article-' + id).then(function(cache) {
    fetch('/get-article-urls?id=' + id).then(function(response) {
      // /get-article-urls returns a JSON-encoded array of
      // resource URLs that a given article depends on
      return response.json();
    }).then(function(urls) {
      cache.addAll(urls);
    });
  });
});
```

In the above example, when the user clicks an element with the `cache-article` class, we are getting the article ID, fetching the article with that ID, and adding the article to the cache.



Note: The Cache API is available on the window object, meaning you don't need to involve the service worker to add things to the cache.



#### On network response

If a request doesn't match anything in the cache, get it from the network, send it to the page and add it to the cache at the same time.

```
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
```

This approach works best for resources that frequently update, such as a user's inbox or article contents. This is also useful for non-essential content such as avatars, but care is needed. If you do this for a range of URLs, be careful not to bloat the storage of your origin — if the user needs to reclaim disk space you don't want to be the prime candidate. Make sure you get rid of items in the cache you don't need any more.



Note: To allow for efficient memory usage, you can only read a response/request's body once. In the code above, <code>.clone()</code> is used to create a copy of the response that can be read separately. See  [What happens when you read a response?](https://jakearchibald.com/2014/reading-responses/) for more information.



<div id="servefiles"></div>

### Serving files from the cache

To serve content from the cache and make your app available offline you need to intercept network requests and respond with files stored in the cache. There are several approaches to this: 

* cache only
* network only 
* cache falling back to network 
* network falling back to cache
* cache then network

There are a few approaches we don't cover here. See Jake Archibald's  [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/) for a full list.

#### Cache only

You don't often need to handle this case specifically.  [Cache falling back to network](#cachefallback) is more often the appropriate approach.

This approach is good for any static assets that are part of your app's main code (part of that "version" of your app). You should have cached these in the install event, so you can depend on them being there.

```
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request));
});
```

If a match isn't found in the cache, the response will look like a connection error.

#### Network only

This is the correct approach for things that can't be performed offline, such as analytics pings and non-GET requests. Again, you don't often need to handle this case specifically and the  [cache falling back to network](#cachefallback) approach will often be more appropriate.

```
self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
});
```

Alternatively, simply don't call `event.respondWith`, which will result in default browser behaviour.

<div id="cachefallback"></div>

#### Cache falling back to the network

If you're making your app offline-first, this is how you'll handle the majority of requests. Other patterns will be exceptions based on the incoming request.

```
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
```

This gives you the "Cache only" behavior for things in the cache and the "Network only" behaviour for anything not cached (which includes all non-GET requests, as they cannot be cached).

#### Network falling back to the cache

This is a good approach for resources that update frequently, and are not part of the "version" of the site (for example, articles, avatars, social media timelines, game leader boards). Handling network requests this way means the online users get the most up-to-date content, and offline users get an older cached version.

However, this method has flaws. If the user has an intermittent or slow connection they'll have to wait for the network to fail before they get content from the cache. This can take an extremely long time and is a frustrating user experience. See the next approach,  [Cache then network](#cachethen), for a better solution.

```
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
```

Here we first send the request to the network using `fetch()`, and only if it fails do we look for a response in the cache. 

<div id="cachethen"></div>

#### Cache then network

This is also a good approach for resources that update frequently. This approach will get content on screen as fast as possible, but still display up-to-date content once it arrives.

This requires the page to make two requests: one to the cache, and one to the network. The idea is to show the cached data first, then update the page when/if the network data arrives.

Here is the code in the page:

```
var networkDataReceived = false;

startSpinner();

// fetch fresh data
var networkUpdate = fetch('/data.json').then(function(response) {
  return response.json();
}).then(function(data) {
  networkDataReceived = true;
  updatePage(data);
});

// fetch cached data
caches.match('/data.json').then(function(response) {
  if (!response) throw Error("No data");
  return response.json();
}).then(function(data) {
  // don't overwrite newer network data
  if (!networkDataReceived) {
    updatePage(data);
  }
}).catch(function() {
  // we didn't get cached data, the network is our last hope:
  return networkUpdate;
}).catch(showErrorMessage).then(stopSpinner());
```

We are sending a request to the network and the cache. The cache will most likely respond first and, if the network data has not already been received, we update the page with the data in the response. When the network responds we update the page again with the latest information.

Here is the code in the service worker:

```
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});
```

This caches the network responses as they are fetched.

Sometimes you can replace the current data when new data arrives (for example, game leaderboard), but be careful not to hide or replace something the user may be interacting with. For example, if you load a page of blog posts from the cache and then add new posts to the top of the page as they are fetched from the network, you might consider adjusting the scroll position so the user is uninterrupted. This can be a good solution if your app layout is fairly linear. 

<div id="generic-fallback"></div>

#### Generic fallback

If you fail to serve something from the cache and/or network you may want to provide a generic fallback. This technique is ideal for secondary imagery such as avatars, failed POST requests, "Unavailable while offline" page.

```
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(function(response) {
      // Fall back to network
      return response || fetch(event.request);
    }).catch(function() {
      // If both fail, show a generic fallback:
      return caches.match('/offline.html');
      // However, in reality you'd have many different
      // fallbacks, depending on URL & headers.
      // Eg, a fallback silhouette image for avatars.
    })
  );
});
```

The item you fallback to is likely to be an install dependency.

You can also provide different fallbacks based on the network error:

```
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request).then(function(response) {
        if (response.status === 404) {
          return caches.match('pages/404.html');
        }
        return response
      });
    }).catch(function() {
      // If both fail, show a generic fallback:
      return caches.match('/offline.html');
    })
  );
});
```

Network response errors do not throw an error in the `fetch` promise. Instead, `fetch` returns the response object containing the error code of the network error. This means we handle network errors in a `.then` instead of a `.catch`.

<div id="remove"></div>

### Removing outdated caches

Once a new service worker has installed and a previous version isn't being used, the new one activates, and you get an `activate` event. Because the old version is out of the way, it's a good time to delete unused caches.

```
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
```

During activation, other events such as `fetch` are put into a queue, so a long activation could potentially block page loads. Keep your activation as lean as possible, only using it for things you couldn't do while the old version was active.

<div id="cacheapi"></div>


## Using the Cache API




Here we cover the Cache API properties and methods.

<div id="checksupport"></div>

### Checking for support

We can check if the browser supports the Cache API like this:

```
if ('caches' in window) {
  // has support
}
```

<div id="createcache"></div>

### Creating the cache

An origin can have multiple named Cache objects. To create a cache or open a connection to an existing cache we use the  [`caches.open`](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/open) method. 

```
caches.open(cacheName)
```

This returns a promise that resolves to the cache object. `caches.open` accepts a string that will be the name of the cache.

<div id="workwithdata"></div>

### Working with data

The Cache API comes with several methods that let us create and manipulate data in the cache. These can be grouped into methods that either create, match, or delete data.

#### Create data

There are three methods we can use to add data to the cache. These are  [`add`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/add),  [`addAll`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/addAll), and  [`put`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/put). In practice, we will call these methods on the cache object returned from `caches.open()`. For example:

```
caches.open('example-cache').then(function(cache) {
        cache.add('/example-file.html');
});
```

`Caches.open` returns the `example-cache` Cache object, which is passed to the callback in `.then`. We call the `add` method on this object to add the file to that cache.

`cache.add(request)` - The add method takes a URL, retrieves it, and adds the resulting response object to the given cache. The key for that object will be the request, so we can retrieve this response object again later by this request.

`cache.addAll(requests)` - This method is the same as add except it takes an array of URLs and adds them to the cache. If any of the files fail to be added to the cache, the whole operation will fail and none of the files will be added.

`cache.put(request, response)` - This method takes both the request and response object and adds them to the cache. This lets you manually insert the response object. Often, you will just want to `fetch()` one or more requests and then add the result straight to your cache. In such cases you are better off just using `cache.add` or `cache.addAll`, as they are shorthand functions for one or more of these operations:

```
fetch(url).then(function (response) {
  return cache.put(url, response);
})
```

#### Match data

There are a couple of methods to search for specific content in the cache:  [`match`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match) and  [`matchAll`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/matchAll). These can be called on the `caches` object to search through all of the existing caches, or on a specific cache returned from `caches.open()`.

`caches.match(request, options)` -  This method returns a Promise that resolves to the response object associated with the first matching request in the cache or caches. It returns `undefined` if no match is found. The first parameter is the request, and the second is an optional list of options to refine the search. Here are the options as defined by MDN:

* `ignoreSearch`: A Boolean that specifies whether to ignore the query string in the URL.  For example, if set to `true` the `?value=bar` part of `http://foo.com/?value=bar` would be ignored when performing a match. It defaults to `false`.
* `ignoreMethod`: A Boolean that, when set to `true`, prevents matching operations from validating the Request HTTP method (normally only GET and HEAD are allowed.) It defaults to false.
* `ignoreVary`: A Boolean that when set to `true` tells the matching operation not to perform VARY header matching — that is, if the URL matches you will get a match regardless of whether the Response object has a VARY header. It defaults to `false`.
* `cacheName`: A DOMString that represents a specific cache to search within. Note that this option is ignored by `Cache.match()`.

`caches.matchAll(request, options)` -  This method is the same as `.match` except that it returns all of the matching responses from the cache instead of just the first. For example, if your app has cached some images contained in an image folder, we could return all images and perform some operation on them like this:

```
caches.open('example-cache').then(function(cache) {
  cache.matchAll('/images/').then(function(response) {
    response.forEach(function(element, index, array) {
      cache.delete(element);
    });
  });
})
```

#### Delete data

We can delete items in the cache with `cache.delete(request, options)`. This method finds the item in the cache matching the request, deletes it, and returns a Promise that resolves to `true`. If it doesn't find the item, it resolves to false. It also has the same optional options parameter available to it as the match method.

#### Retrieve keys

Finally, we can get a list of cache keys using `cache.keys(request, options)`. This returns a Promise that resolves to an array of cache keys. These will be returned in the same order they were inserted into the cache. Both parameters are optional. If nothing is passed, `cache.keys` returns all of the requests in the cache. If a request is passed, it returns all of the matching requests from the cache. The options are the same as those in the previous methods.

The keys method can also be called on the caches entry point to return the keys for the caches themselves. This lets you purge outdated caches in one go.

<div id="moreresources"></div>


## Further reading




#### Learn about the Cache API

*  [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) - MDN
*  [The Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/)

#### Learn about using service workers

*  [Using Service Workers](/web/fundamentals/getting-started/primers/service-workers)


