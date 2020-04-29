project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-09-20 #}
{# wf_published_on: 2016-09-28 #}
{# wf_blink_components: Blink>Storage #}

# Web Storage Overview {: .page-title }

{% include "web/_shared/contributors/mco.html" %}

It’s important to choose the right storage mechanisms, both for local device
storage and for cloud based server storage. A good storage engine makes sure
your information is saved reliably, reduces bandwidth, and improves
responsiveness. The right storage caching strategy is a core building block for
enabling offline mobile web experiences.

This article provides a brief foundation for evaluating storage APIs and
services, after which we’ll provide a comparison table and some general
guidance. In the near future, we plan to add resources for understanding
selected storage topics in greater depth.

## Storage Taxonomy

Let’s start by understanding some of the dimensions by which we can analyze data
storage for web apps. Later, we’ll use this framework to enumerate and evaluate
the many storage options available to web developers.

### Data Model

The model for storing units of data determines how data is organized internally,
which impacts ease of use, cost and performance of storage and retrieval
requests.

* **Structured:** Data stored in tables with predefined fields, as is typical
of SQL based database management systems, lends itself well to flexible and
dynamic queries, where the full range of query types may not be be known a
priori. A prominent example of a structured datastore in the
browser is IndexedDB.

* **Key/Value:** Key/Value datastores, and related NoSQL databases, offer the
ability to store and retrieve unstructured data indexed by a unique key.
Key/Value datastores are like hash tables in that they allow constant-time
access to indexed, opaque data. Prominent examples of key/value datastores are
the Cache API in the browser and Apache Cassandra on the server.

* **Byte Streams:** This simple model stores data as a variable length, opaque
string of bytes, leaving any form of internal organization to the application
layer. This model is particularly good for file systems and other hierarchically
organized blobs of data. Prominent examples of byte stream datastores include
file systems and cloud storage services.

### Persistence

Storage methods for web apps can be analyzed according to the scope over which
data is made persistent.

* **Session Persistence:** Data in this category is retained only as long as a
single web session or browser tab remains active. An example of a storage
mechanism with session persistence is the Session Storage API.

* **Device Persistence:** Data in this category is retained across sessions and
browser tabs/windows, within a particular device. An example of a storage
mechanism with device persistence is the Cache API.

* **Global Persistence:** Data in this category is retained across sessions and
devices. As such, it is the most robust form of data persistence. An example of
a storage mechanism with global persistence is Google Cloud Storage.

### Browser Support

Developers should choose an API best suited to their problem domain; however,
they should also take into account the fact that standardized and well
established APIs are preferable to custom or proprietary interfaces, because
they tend to be longer lived and more widely supported. They may also enjoy a
broader knowledge base and a richer developer ecosystem.

### Transactions

Often, it is important for a collection of related storage operations to
succeed or fail atomically. Database management systems have traditionally
supported this feature using the transaction model, where related updates may be
grouped into arbitrary units. While not always necessary, this is a convenient,
and sometimes essential, feature in some problem domains.

### Sync/Async

Some storage APIs are synchronous in the sense that storage or retrieval
requests block the currently active thread until the request is completed. This
is particularly onerous in web browsers, where the storage request is sharing
the main thread with the UI. For efficiency and performance reasons,
asynchronous storage APIs are to be preferred.

## Debugging storage in Chrome DevTools {: #devtools }

Check out the following docs to learn more about using Chrome DevTools to
inspect and debug your web storage API of choice. APIs not mentioned
here are either not supported in DevTools or are not applicable.

* [Local Storage](/web/tools/chrome-devtools/manage-data/local-storage#local-storage)
* [Session Storage](/web/tools/chrome-devtools/manage-data/local-storage#session-storage)
* [Cookies](/web/tools/chrome-devtools/manage-data/cookies)
* [Web SQL](/web/tools/chrome-devtools/manage-data/local-storage#web-sql)
* [Cache](/web/tools/chrome-devtools/progressive-web-apps#caches)
* [IndexedDB](/web/tools/chrome-devtools/manage-data/local-storage#indexeddb)

If you're using multiple storage APIs, check out the Clear Storage feature of
DevTools. This feature lets you clear multiple stores with a single button
click. See [Clear service workers, storage, databases, and
caches](/web/tools/chrome-devtools/manage-data/local-storage#clear-storage) for
more information.

## Where to go next…

Now that we’ve reviewed some of the relevant ways to think about storage
mechanisms and compared the most popular APIs and services available today,
we'll be adding more content soon to dive more deeply into one or more topics
of interest:

* [Storage for the web](https://web.dev/storage-for-the-web/){: .external }
* [Cache API: An introduction](https://web.dev/cache-api-quick-guide/){: .external }

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
