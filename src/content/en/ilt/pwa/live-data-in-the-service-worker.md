project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-06-14T20:48:36Z #}
{# wf_published_on: 2016-01-01 #}


# Live Data in the Service Worker {: .page-title }




<div id="introduction"></div>


## Introduction




Offline support and reliable performance are key features of Progressive Web Apps. This text describes some recommendations for storing different kinds of data in a PWA.

<div id="where"></div>


## Where should offline data be stored?




A general guideline for data storage is that URL addressable resources should be stored with the  [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) interface, and other data should be stored with  [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API). For example HTML, CSS, and JS files should be stored in the cache, while JSON data should be stored in IndexedDB. Note that this is only a guideline, not a firm rule. 

### Why IndexedDB and the Cache interface?

There are a  [variety of reasons](https://medium.com/dev-channel/offline-storage-for-progressive-web-apps-70d52695513c#.lm82vlyt8) to use IndexedDB and the Cache interface. Both are asynchronous and accessible in service workers, web workers, and the window interface. IndexedDB is  [widely supported](http://caniuse.com/#feat=indexeddb), and the Cache interface  [is supported](https://jakearchibald.github.io/isserviceworkerready/) in Chrome, Firefox, Opera, and Samsung Internet.

In this text we use Jake Archibald's  [IndexedDB Promised](https://github.com/jakearchibald/indexeddb-promised) library, which enables promise syntax for IndexedDB. There are also  [other IndexedDB libraries](https://medium.com/dev-channel/offline-storage-for-progressive-web-apps-70d52695513c#.lm82vlyt8) that can be used to abstract some of the less convenient aspects of the API. 

Debugging support for IndexedDB is available in Chrome, Opera, Firefox and Safari. Debugging support for Cache Storage is available in Chrome, Opera, and Firefox. These are covered in [Tools for PWA Developers](tools-for-pwa-developers).



Note: Some developers have run into issues with Safari 10's IndexedDB implementation. Test your app to make sure it works on your target browser. File browser bugs with your browser's vendor so that browser implementors and library maintainers can investigate. 



### How Much Can You Store

Different browsers allow different amounts of offline storage. This table summarizes storage limits for major browsers:

<table markdown="1">
<tr><td colspan="1" rowspan="1">
<p><strong>Browser </strong></p>
</td><td colspan="1" rowspan="1">
<p><strong>Limitation</strong></p>
</td><td colspan="1" rowspan="1">
<p><strong>Notes</strong></p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>Chrome, Opera, and Samsung Internet</p>
</td><td colspan="1" rowspan="1">
<p>Up to a  <a href="https://www.html5rocks.com/en/tutorials/offline/quota-research/">quota</a>. Check usage with the  <a href="https://www.w3.org/TR/quota-api/">Quota API</a></p>
</td><td colspan="1" rowspan="1">
<p>Storage is per origin not per API (local storage, session storage, service worker cache and IndexedDB all share the same space)</p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>Firefox</p>
</td><td colspan="1" rowspan="1">
<p>No limit</p>
</td><td colspan="1" rowspan="1">
<p>Prompts after 50 MB of data is stored</p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>Mobile Safari</p>
</td><td colspan="1" rowspan="1">
<p>50MB</p>
</td><td colspan="1" rowspan="1">
<p> </p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>Desktop Safari</p>
</td><td colspan="1" rowspan="1">
<p>No limit</p>
</td><td colspan="1" rowspan="1">
<p>Prompts after 5MB of data is stored</p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>Internet Explorer (10+)</p>
</td><td colspan="1" rowspan="1">
<p>250MB</p>
</td><td colspan="1" rowspan="1">
<p>Prompts after 10MB of data is stored</p>
</td>
</tr></table>


<div id="examples"></div>


## Using IndexedDB and the Cache interface




### Storing data with IndexedDB

IndexedDB is a noSQL database. IndexedDB data is stored as key-value pairs in __object stores__. The table below shows an example of an object store, in this case containing beverage items:

<table markdown="1">
<tr><td colspan="1" rowspan="1">
<p><strong>#</strong></p>
</td><td colspan="1" rowspan="1">
<p><strong>Key (keypath 'id')</strong></p>
</td><td colspan="1" rowspan="1">
<p><strong>Value</strong></p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>0</p>
</td><td colspan="1" rowspan="1">
<p>1234</p>
</td><td colspan="1" rowspan="1">
<p>{id: 123, name: 'coke', price: 10.99, quantity: 200}</p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>1</p>
</td><td colspan="1" rowspan="1">
<p>9876</p>
</td><td colspan="1" rowspan="1">
<p>{id: 321, name: 'pepsi', price: 8.99, quantity: 100}</p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>2</p>
</td><td colspan="1" rowspan="1">
<p>4567</p>
</td><td colspan="1" rowspan="1">
<p>{id: 222, name: 'water', price: 11.99, quantity: 300}</p>
</td>
</tr></table>


The data is organized by a __`keypath`__, which in this case is the item's __`id`__ property. You can learn more about IndexedDB in the corresponding  [text](working-with-indexeddb), or in the  [code lab](lab-indexeddb).

The following function could be used to create an IndexedDB object store like the example above:

#### service-worker.js

```
function createDB() {
  idb.open('products', 1, function(upgradeDB) {
    var store = upgradeDB.createObjectStore('beverages', {
      keyPath: 'id'
    });
    store.put({id: 123, name: 'coke', price: 10.99, quantity: 200});
    store.put({id: 321, name: 'pepsi', price: 8.99, quantity: 100});
    store.put({id: 222, name: 'water', price: 11.99, quantity: 300});
  });
}
```



Note: All IndexedDB code in this text uses Jake Archibald's  [IndexedDB Promised](https://github.com/jakearchibald/indexeddb-promised) library, which enables promise syntax for IndexedDB.



Here we create a  'products' database, version 1. Inside the 'products' database, we create a 'beverages' object store. This holds all of the beverage objects. The `beverages` object store has a keypath of `id`. This means that the objects in this store will be organized and accessed by the `id` property of the `beverage` objects. Finally, we add some example beverages to the object store.



Note: If you're familiar with IndexedDB, you may be asking why we didn't use a transaction when creating and populating the database. In IndexedDB, a transaction is built into the database creation operation. 



The service worker activation event is a good time to create a database. Creating a database during the activation event means that it will only be created (or opened, if it already exists) when a new service worker takes over, rather than each time the app runs (which is inefficient). It's also likely better than using the service worker's installation event, since the old service worker will still be in control at that point, and there could be conflicts if a new database is mixed with an old service worker. The following code (in the service worker file) could be used to create the database shown earlier on service worker activation:

#### service-worker.js

```
self.addEventListener('activate', function(event) {
  event.waitUntil(
    createDB()
  );
});
```



Note: `event.waitUntil` ensures that a service worker does not terminate during asynchronous operations.



Once an IndexedDB database is created, data can then be read locally from IndexedDB rather than making network requests to a backend database. The following code could be used to retrieve data from the example database above:

#### service-worker.js

```
function readDB() {
  idb.open('products', 1).then(function(db) {
    var tx = db.transaction(['beverages'], 'readonly');
    var store = tx.objectStore('beverages');
    return store.getAll();
  }).then(function(items) {
    // Use beverage data
  });
}
```

Here we open the `products` database and create a new transaction on the `beverages` store of type `readonly` (we don't need to write data). We then access the store, and retrieve all of the items. These items can then be used to update the UI or perform whatever action is needed.



Note: A transaction is wrapper around an operation, or group of operations, that ensures database integrity. If one of the actions within a transaction fail, none of them are applied and the database returns to the state it was in before the transaction began. All read or write operations in IndexedDB must be part of a transaction. This allows for atomic read-modify-write operations without worrying about other threads acting on the database at the same time.



### Storing assets in the Cache interface

URL addressable resources are comparatively simple to store with the Cache interface. The following code shows an example of caching multiple resources:

#### service-worker.js

```
function cacheAssets() {
  return caches.open('cache-v1')
  .then(function(cache) {
    return cache.addAll([
      '.',
      'index.html',
      'styles/main.css',
      'js/offline.js',
      'img/coke.jpg'
    ]);
  });
}
```

This code opens a `cache-v1` cache, and stores __index.html__, __main.css__, __offline.js__, and __coke.jpg__.

The service worker installation event is a good time to cache static assets like these. This ensures that all the resources a service worker is expected to have are cached when the service worker is installed. The following code (in the service worker file) could be used to cache these types of files during the service worker install event:

#### service-worker.js

```
self.addEventListener('install', function(event) {
  event.waitUntil(
    cacheAssets()
  );
});
```

Once assets are cached, they can be retrieved during fetch events. The following code (in the service worker file) allows resources to be fetched from the cache instead of the network:

#### service-worker.js

```
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Check cache but fall back to network
      return response || fetch(event.request);
    })
  );
});
```

This code adds a `fetch` listener on the service worker that attempts to get resources from the cache before going to the network. If the resource isn't found in the cache, a regular network request is still made. 

<div id="resources"></div>


## Further reading




*  [Offline Storage for Progressive Web Apps](https://medium.com/dev-channel/offline-storage-for-progressive-web-apps-70d52695513c#.lm82vlyt8)
*  [IndexedDB Promised](https://github.com/jakearchibald/indexeddb-promised)
*  [Support for the Cache interface](https://jakearchibald.github.io/isserviceworkerready/#caches)
*  [Support for IndexedDB](http://caniuse.com/#feat=indexeddb)


