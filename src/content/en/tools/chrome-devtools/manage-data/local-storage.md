project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Inspect and manage storage, databases, and caches from the Application panel.
robots: noindex

{# wf_updated_on: 2019-03-25 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

# Inspect and Manage Storage, Databases, and Caches {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<aside class="caution">This page is deprecated.</aside>

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

See [View And Change IndexedDB Data With Chrome DevTools][IDB].

## Web SQL {:#web-sql}

See [View And Edit Web SQL Data](/web/tools/chrome-devtools/storage/websql).

## Application Cache {: #application-cache }

See [View Application Cache Data](/web/tools/chrome-devtools/storage/applicationcache).

## Service Worker Caches {:#service-worker-caches}

See [View Cache Data](/web/tools/chrome-devtools/storage/cache).

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
