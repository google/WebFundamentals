project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Inspect and manage storage, databases, and caches from the Application panel.

{# wf_updated_on: 2017-07-24 #}
{# wf_published_on: 2015-04-13 #}

# Inspect and Manage Storage, Databases, and Caches {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
Inspect and manage storage, databases, and caches from the
<strong>Application</strong> panel.


### TL;DR {: .hide-from-toc }
- View and edit local and session storage.
- Inspect and modify IndexedDB databases.
- Execute statements on a Web SQL database.
- View Application and Service Worker Caches.
- Clear all storage, databases, caches, and service workers with a single button click.


## Local storage {:#local-storage}

If you're using [local storage][ls] to store key-value pairs (KVPs), you can
inspect, modify, and delete these KVPs from the **Local Storage** pane.

![local storage pane][ls-pane]

* Double-click on a key or value to edit that value.
* Double-click on an empty cell to add a new KVP.
* Click on a KVP and then press the **delete** button
  (![delete button][delete]{:.inline}) to delete that KVP. You can
  wipe all of your local storage data with a single button click from the
  [**Clear storage** pane](#clear-storage).
* If you're interacting with a page in a way that creates, deletes, or modifies
  KVPs, you won't see those changes get updated in realtime. Click the
  **refresh** button (![refresh button][refresh]{:.inline}) to see your changes.

[ls]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[ls-pane]: /web/tools/chrome-devtools/manage-data/imgs/local-storage.png
[refresh]: /web/tools/chrome-devtools/manage-data/imgs/refresh.png
[delete]: /web/tools/chrome-devtools/manage-data/imgs/delete.png

## Session storage {:#session-storage}

The **Session Storage** pane works the same as the **Local Storage**
pane. Check out the [Local storage](#local-storage) section above to learn how
to view and edit [session storage][ss].

[ss]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

## IndexedDB {:#indexeddb}

Use the **IndexedDB** pane to inspect, modify, and delete IndexedDB data.

When you expand the **IndexedDB** pane, the first level below that are
databases. If there are multiple databases active, then you'll see multiple
entries. In the screenshot below there's only one database active for the page.

![indexeddb tab][idb-tab]

Click on the name of a database to view the security origin, name, and version
of that database.

![indexeddb database][idb-db]

Expand a database to view its key-value pairs (KVPs).

![indexeddb key-value pairs][idb-kvps]

Use the arrow buttons next to the **Start from key** textfield to move between
pages of KVPs.

Expand a value and double-click to edit that value.
When you add, modify, or delete values, those changes won't get updated in
realtime. Click the **refresh** button to update a database.
![editing an indexeddb kvp][idb-edit]

Enter a key in the **Start from key** textfield to filter out all keys with
a value smaller than that one.

![filtered kvps][idb-filter]

When you add, modify, or delete values, those changes won't get updated in
realtime. Click the **refresh** button (![refresh button][refresh]{:.inline})
to update a database.

Click the **clear object store** button (![clear object store][cos]{:.inline})
to delete all data from your database. You can also accomplish this as well
as unregistering service workers and removing other storage and caches with
a single click from the [**Clear storage** pane](#clear-storage).

[idb-tab]: /web/tools/chrome-devtools/manage-data/imgs/idb-tab.png
[idb-db]: /web/tools/chrome-devtools/manage-data/imgs/idb-db.png
[idb-kvps]: /web/tools/chrome-devtools/manage-data/imgs/idb-kvps.png
[idb-edit]: /web/tools/chrome-devtools/manage-data/imgs/idb-edit.png
[idb-filter]: /web/tools/chrome-devtools/manage-data/imgs/idb-filter.png
[cos]: /web/tools/chrome-devtools/manage-data/imgs/clear-object-store.png

## Web SQL {:#web-sql}

Use the **Web SQL** pane to query and modify Web SQL databases.

Click on a database name to open a console for that database. From here you
can execute statements on the database.

![web sql console][wsc]

Click on a database table to view that table's data.

![web sql table][wst]

* You can't update values from here, but you can do so via the database
  console (see above).
* Click on a column's header to sort the table by that column.
* Changes that you make to a table won't update in realtime. Click the
  **refresh** button (![refresh button][refresh]{:.inline}) to view your
  updates.
* Enter a space-separated or comma-separated list of column names in the
  **Visible columns** textfield to only display those columns.

[wsc]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-console.png
[wst]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-table.png

## Application Cache {:#application-cache}

Use the **Application Cache** pane to inspect resources and rules that have
been created via the [Application Cache API][appcache-api].

![application cache pane][appcache]

Each row represents a resource.

The **Type** column will have one of the following values:

* **Master**. The `manifest` attribute on the resource indicated that this
  cache is its master.
* **Explicit**. This resource was explicitly listed in the manifest.
* **Network**. The manifest specified that this resource must come from the
  network.
* **Fallback**. The URL in the **Resource** column was listed as a fallback
  for another URL (not shown in DevTools).

At the bottom of the table there are status icons indicating your network
connection and the status of the application cache. The application cache
can have the following statuses:

* **IDLE**. The cache has no new changes.
* **CHECKING**. The manifest is being fetched and checked for updates.
* **DOWNLOADING**. Resources are being added to the cache.
* **UPDATEREADY**. A new version of the cache is available.
* **OBSOLETE**. The cache is being deleted.

[appcache-api]: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
[appcache]: /web/tools/chrome-devtools/manage-data/imgs/appcache.png

## Service Worker Caches {:#service-worker-caches}

The **Cache Storage** pane on the **Application** panel lets you inspect,
modify, and debug caches created with the (service worker) Cache API. Check
out the guide below for more help.

{# include shared/related_guides.liquid inline=true list=page.related-guides.pwa #}

## Clear service workers, storage, databases, and caches {:#clear-storage}

Sometimes you just need to wipe all of the data for a given origin. The **Clear
Storage** pane on the **Application** panel lets you selectively unregister
service workers, storage, and caches. To clear data, just enable the checkboxes
next to the components that you want to wipe, and then click **Clear site
data**. The action wipes all of the data for the origin listed under the
**Clear storage** label.

![clear storage][clear]

[clear]: /web/tools/chrome-devtools/manage-data/imgs/clear-storage.png
