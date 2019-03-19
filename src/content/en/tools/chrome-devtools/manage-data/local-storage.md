project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Inspect and manage storage, databases, and caches from the Application panel.

{# wf_updated_on: 2019-03-19 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

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

[LS]: /web/tools/chrome-devtools/storage/localstorage

See [View And Edit Local Storage With Chrome DevTools][LS].

## Session storage {:#session-storage}

[SS]: /web/tools/chrome-devtools/storage/sessionstorage

See [View And Edit Session Storage With Chrome DevTools][SS].

## IndexedDB {:#indexeddb}

[IDB]: /web/tools/chrome-devtools/storage/indexeddb

See [View, Edit, And Delete IndexedDB Data With Chrome DevTools][IDB].

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

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
