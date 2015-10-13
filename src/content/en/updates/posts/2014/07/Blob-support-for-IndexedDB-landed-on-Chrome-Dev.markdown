---
layout: updates/post
title: "Blob support for IndexedDB landed on Chrome Dev"
description: "Long awaited feature for Chrome, Blob support on IndexedDB landed in Chrome Dev."
published_on: 2014-07-01
updated_on: 2014-07-01
authors:
  - agektmr
tags:
  - news
  - indexeddb
  - blob
---
Chrome Dev has landed support for Blob on IndexedDB.

This is a long awaited feature for Chrome that allows IndexedDB API to be able to store and retrieve a Blob without converting it to a Base64 string.


IndexedDB provides large scale key-value type persistent storage that is available on most of modern browsers (Safari apparently will land support in iOS8 and Mac OS X 10.10). Check out [its implementation status](http://caniuse.com/#search=indexeddb).


Blob is a file-like binary object modern JavaScript engines can handle. File objects inherits from Blob. You can also fetch images and files as Blob via XMLHttpRequest. Check out [its implementation status](http://caniuse.com/#search=blob).


## Storing a Blob on IndexedDB
There is no way to feature detect the Blob availability in IndexedDB. You basically have to try-catch then use string instead of Blob if it is not available. Here's some sample code:

{% highlight javascript %}
// Create an example Blob object
var blob = new Blob(['blob object'], {type: 'text/plain'});

try {
    var store = db.transaction(['entries'], 'readwrite').objectStore('entries');

    // Store the object  
    var req = store.put(blob, 'blob');
    req.onerror = function(e) {
        console.log(e);
    };
    req.onsuccess = function(event) {
        console.log('Successfully stored a blob as Blob.');
    };
} catch (e) {
    var reader = new FileReader();
    reader.onload = function(event) {
        // After exception, you have to start over from getting transaction.
        var store = db.transaction(['entries'], 'readwrite').objectStore('entries');

        // Obtain DataURL string
        var data = event.target.result;
        var req = store.put(data, 'blob');
        req.onerror = function(e) {
            console.log(e);
        };
        req.onsuccess = function(event) {
            console.log('Successfully stored a blob as String.');
        };
    };
    // Convert Blob into DataURL string
    reader.readAsDataURL(blob);
}
{% endhighlight %}

Blob support for IndexedDB is already available on Firefox and Internet Explorer as well. Safari support needs to be investigated.


Enjoy!
