project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2011-11-10 #}
{# wf_published_on: 2011-11-10 #}
{# wf_tags: news,offline,quota,filesystem #}

# Quota Management API : Fast Facts {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
November 2011

HTML5 introduced various offline-related features to modern browsers. While offline is convenient, its concept of quota has been left untouched for a long time. The latest version of Chrome supports the first implementation of the *Quota Management API*. The API handles quota for AppCache, IndexedDB, WebSQL and the File System API combined. Here’s a list of things you should keep in mind when working with the Quota Management API in Chrome.

(The specific numbers and details noted below are not a part of HTML5 but the facts in the current Chrome implementation.  The API and Quota management in Chrome are still evolving and the details may change over the time.)

* HTML5 has two notions of storage: `TEMPORARY`, and `PERSISTENT`:
    * `TEMPORARY` storage can be used without requesting quota, but may be deleted at the browser’s discretion.
    * `PERSISTENT` storage is never deleted without the user’s instruction, but usually requires an upfront quota request to use.

* `TEMPORARY` storage is shared between all applications and websites run in the browser.
    * `TEMPORARY` storage has a default quota of 50% of the available disk as a shared pool (e.g. 50GB => 25GB). This is no longer restricted to 1GB.<br>(To be more specific, TEMP quota is calculated according to the formula (<i>remaining disk space + TEMP storage space) * 50%</i>.  Therefore if apps are using 25GB of TEMP storage in total and the current remaining disk space is 25GB, that means the quota has already been exceeded.)
    * Each application is limited to 20% of the available `TEMPORARY` storage pool (i.e. 20% of 50% of available disk). (Not restricted to 5Mb anymore.)
    * When the `TEMPORARY` storage quota is exceeded, _all the data (incl. AppCache, IndexedDB, WebSQL, File System API) stored for oldest used origin gets deleted_.<br>[Note: since each app can only use up to 20% of the pool, this won’t happen very frequently unless the user has more than 5 active offline apps.]
    * If an app tries to make a modification which will result in exceeding the `TEMPORARY` storage quota (20% of pool), an error will be thrown.
    * Each application can query how much data is stored or how much more space is available for the app by calling the `queryUsageAndQuota()` method of the Quota API.

          webkitStorageInfo.queryUsageAndQuota(
              webkitStorageInfo.TEMPORARY,   // or PERSISTENT
              usageCallback,
              errorCallback);

    * Requesting more quota against `TEMPORARY` storage doesn’t do anything.
    * Requesting quota for `TEMPORARY` storage using `webkitRequestFileSystem()` doesn’t actually allocate / change quota.

* For `PERSISTENT` storage, its default quota is 0 and it needs to be explicitly requested per application using the `requestQuota()` method of the Quota API.
    * The allocated space can be used only by the File System API (for `PERSISTENT` type filesystem) and there’s no such thing like `PERSISTENT` storage on _IndexedDB_, _WebSQL DB_ or _AppCache_ (yet).

          webkitStorageInfo.requestQuota(
              webkitStorageInfo.PERSISTENT
              newQuotaInBytes,
              quotaCallback,
              errorCallback);


* Setting `unlimitedStorage` in the `manifest.json` of Chrome Web Apps has been suggested as a temporary solution for apps to work without the Quota API. There is no guarantee that Chrome will continue supporting this feature.

The API is described in detail on W3C's site: [Quota Management API](https://www.w3.org/TR/quota-api/).


{% include "comment-widget.html" %}
