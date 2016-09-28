project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-09-28 #}
{# wf_published_on: 2016-09-28 #}

# Web Storage Overiew {: .page-title }

{% include "web/_shared/contributors/mco.html" %}

A good storage engine makes sure your information is saved reliably, reduces bandwidth, and improves responsiveness. The right storage caching strategy is a core building block for enabling offline mobile web experiences. It’s important to choose the right storage mechanisms, both for local device storage and for cloud based server storage. 

This article provides a brief foundation for evaluating storage APIs and services, after which we’ll provide a comparison table and some general guidance. In the near future, we plan to add resources for understanding selected storage topics in greater depth.

# Storage Taxonomy

Let’s start by understanding some of the dimensions by which we can analyze data storage for web apps. Later, we’ll use this framework to enumerate and evaluate the many storage options available to web developers.

## Data Model

The model for storing units of data determines how data is organized internally, which impacts ease of use, cost and performance of storage and retrieval requests. 

* **Structured: **Data stored in tables with predefined fields, as is typical of SQL based Database Management Systems, lends itself well to flexible and dynamic queries, where the full range of query types may not be be known a priori. A prominent example of a structured datastore is IndexedDB in the browser.

* **Key/Value:** Key/Value datastores, and related NoSQL databases, offer the ability to store and retrieve unstructured data indexed by a unique key. Key/Value datastores are like hash tables in that they allow constant time access to indexed, opaque data. Prominent examples of key/value datastores are the Cache API in the browser and Apache Cassandra on the server.

* **Byte Streams:** This simple model stores data as a variable length, opaque string of bytes, leaving any form of internal organization to the application layer. This model is particularly good for file systems and other hierarchically organized blobs of data. Prominent examples of byte stream datastores include file systems and cloud storage services.

## Scope of Persistence

Storage methods for web apps can be analyzed according to the scope over which data is made persistent.

* **Session Persistence: **Data in this category is retained only as long as a single web session or browser tab remains active. An example of a storage mechanism with session persistence is the Session Storage API.

* **Device Persistence:** Data in this category is retained across sessions and browser tabs/windows, within a particular device. An example of a storage mechanism with device persistence is the Cache API.

* **Global Persistence:** Data in this category is retained across sessions and devices. As such, it is the most robust form of data persistence. An example of a storage mechanism with global persistence is Google Cloud Storage.

## Browser Support

Developers should choose an API best suited to their problem domain, however, they should also take into account the fact that standardized and well established APIs are preferable over custom or proprietary interfaces, because they tend to be longer lived and more widely supported. They may also enjoy a broader knowledge base and a richer developer ecosystem.

## Transactions

Oftentime, it is important for a collection of related storage operations to succeed or fail atomically. Database Management Systems have traditionally supported this feature using the transaction model, where related updates may be grouped into arbitrary units. While not always necessary, this is a convenient, and sometimes essential, feature in some problem domains.

## Sync/Async

Some storage APIs are synchronous in the sense that storage or retrieval requests block the currently active thread until the request is completed. This is particularly onerous in web browsers, where the storage request is sharing the main thread with the UI. For efficiency and performance reasons, asynchronous storage APIs are to be preferred.

# Comparison

In this section we take a look at the current APIs available for web developers and compare them across the dimensions described above.

<table>
  <tr>
    <td>API</td>
    <td>Data 
Model</td>
    <td>Scope of Persistence</td>
    <td>Browser
Support</td>
    <td>Transactions</td>
    <td>Sync/Async</td>
  </tr>
  <tr>
    <td>File system</td>
    <td>Byte stream</td>
    <td>device</td>
    <td>52%</td>
    <td>No</td>
    <td>Async</td>
  </tr>
  <tr>
    <td>Local Storage</td>
    <td>key/value</td>
    <td>device</td>
    <td>93%</td>
    <td>No</td>
    <td>Sync</td>
  </tr>
  <tr>
    <td>Session Storage</td>
    <td>key/value</td>
    <td>session</td>
    <td></td>
    <td>No</td>
    <td>Sync</td>
  </tr>
  <tr>
    <td>Cookies</td>
    <td>structured</td>
    <td>device</td>
    <td>100%</td>
    <td>No</td>
    <td>Sync</td>
  </tr>
  <tr>
    <td>WebSQL</td>
    <td>structured</td>
    <td>device</td>
    <td>77%</td>
    <td>Yes</td>
    <td>Async</td>
  </tr>
  <tr>
    <td>Cache</td>
    <td>key/value</td>
    <td>device</td>
    <td>92%</td>
    <td>No</td>
    <td>Async</td>
  </tr>
  <tr>
    <td>IndexedDB</td>
    <td>hybrid</td>
    <td>device</td>
    <td>83%</td>
    <td>Yes</td>
    <td>Async</td>
  </tr>
  <tr>
    <td>Cloud storage service</td>
    <td>byte stream</td>
    <td>global</td>
    <td>100%</td>
    <td>No</td>
    <td>Both</td>
  </tr>
</table>


As noted above, it’s wise to choose APIs that are widely supported across as many browsers as possible and which offer asynchronous call models, to maximize interoperability with the UI. These criteria lead naturally to the following technology choices:

* For device local key/value storage use the Cache API.

* For device local structured storage: use IndexedDB.

* For global byte stream storage: use a Cloud Storage service.

This combination satisfies the basic storage needs for many mobile web apps. Look for a coming article in which we’ll cover how to address common storage patterns in detail, with accompanying code examples.

# Where to go next…

Now that we’ve reviewed some of the relevant ways to think about storage mechanisms and compared the most popular APIs and services available today, we'll be adadding more content soon to dive more deeply into one or more topics of interest:

* Offline Storage Recommendations for Progressive Web Apps

* Common Storage Patterns

* Recommended Back End Storage Methods

* Deep Dive: IndexedDB

* Deep Dive: Cache API

* Analysis of Popular Storage Frameworks

