---
rss: false
layout: article
title: "Inspect and Manage Your Local Storage APIs"
seotitle: "Inspect and Manage Local Storage APIs in the Chrome DevTools Resources Panel"
description: "Inspect and edit local storage APIs including local and session storage, IndexedDB and Web SQL databases, and the Application Cache in the Chrome DevTools Resources panel."
introduction: "Inspect and manage local storage APIs including local and session storage, IndexedDB and Web SQL databases, and the Application Cache in the Chrome DevTools Resources panel."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-18
  order: 1
authors:
  - megginkearney
priority: 0
collection: manage-data
key-takeaways:
  tldr-tbd:
    - TBD tldr.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

{% include modules/toc.liquid %}

## Local and session storage

You can view and edit local and session storage key/value pairs you've created using the [Web Storage APIs](http://www.w3.org/TR/webstorage/). You can edit, delete, and create both local and session storage data.

**To delete a key/value pair**, do one of the following:

* Select the item in the data table and do one of the following:
    2. Click the Delete button.
    3. Press the Delete key on your keyboard.
* Right-click or Control-click on the data item and choose Delete from the context menu.

**To add a new key/value pair:**

1. Double-click inside an empty Key table cell and enter the key name.
2. Double-click inside the corresponding Value table cell and enter the key's value.

**To edit an existing key/value pair**, do one of the following:

* Double-click in the cell you want to edit.
* Right-click or Control-click the cell you want to edit and choose Edit from the context menu.

**To refresh the table with new storage data**, click the Refresh button at the bottom of the panel.

![Refresh](imgs/refresh.png)

## IndexedDB

You can inspect IndexedDB databases and object stores, page through an object store's records, and clear an object store of its records.

* **To view a list of available database**, expand the IndexedDB category.
* **To view a database's object stores**, select it from the list of available databases.

![IndexedDB](imgs/indexeddb.png) 

**To page through records in the object store**, click the Previous and Next page buttons. You can also specify the record where paging starts by specifying the record's key.

![Next-previous page](imgs/next-previous-page.png)

**To clear the object store**, do one of the following:

* Click the **Clear object store** button <img src="../images/clear.png" /> at the bottom of the panel.
* Right-click or Control-click the object store and select **Clear** from the context menu.

**To view properties of a database**, select it from the list of databases.

![Database properties](imgs/database-properties.png)

## Web SQL

You can inspect the content of Web SQL databases, and run SQL commands against 
their contents.

* **To view the available Web SQL databases**, expand the Web SQL item in the tree control.
* **To view available tables in a database**, expand the database tree item.
* **To view a table's records**, select the table. It's properties appear in the right-hand pane.
* **To refresh the view of the database**, click the Refresh button ![Refresh button](refresh.png) at the bottom of the panel. 

You can query a Web SQL database's tables with SQL commands and view 
query results in a tabular format. As you type out a command or table name, code hints are provided for the names of supported SQL commands and clauses, and the names of tables that the database contains.

**To run a SQL command against a database**:

1. Select the database containing the table you want to query.
2. At the prompt that appears in the right-hand panel, enter the SQL statement you want to execute.

![SQL](imgs/sql.png)

## Application Cache

You can examine resources that Chrome has cached according to the Application Cache manifest file specified by the current document. You can view the current status of the Application Cache (idle or downloading, for 
example), and the browser's connection status (online or offline).<br/>

![Application Cache](imgs/app-cache.png) 

The table of cached resources includes the following properties for each resource:

* **Resource** — The URL of the resource.
* **Type** — The type of cached resource, which can have one of the following 
  values:
    * **Master** — The resource was added to the cache because it's 
      [manifest](http://www.whatwg.org/specs/web-apps/current-work/multipage/semantics.html#attr-html-manifest) 
      attribute indicated that this was its cache.
    * **Explicit** — The resource was explicitly listed in the application's 
      cache manifest file.
    * **Network** — The resources was listed in the application's cache manifest 
      file as a network entry. 
    * **Fallback** — The resource was specified as a fallback if a resource is inaccessible.
* **Size** — Size of the cached resource.

The Resources panel displays the current [status](http://www.whatwg.org/specs/web-apps/current-work/#dom-appcache-status) 
of the application cache along with a colored status icon (green, yellow, or red). The following are the possible status values and their descriptions:

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Status</td>
<td>Description</td>
</tr>
<tr>
<td><img src="imgs/green.png"/> IDLE </td>
<td>The application cache is idle.</td>
</tr>
<tr>
<td><img src="imgs/yellow.png"/>CHECKING </td>
<td>The manifest is being fetched and checked for updates.</td>
</tr>
<tr>
<td><img src="imgs/yellow.png"/>DOWNLOADING </td>
<td>Resources are being downloaded to be added to the cache, due to a changed resource manifest.</td>
</tr>
<tr>
<td><img src="imgs/green.png"/>UPDATEREADY </td>
<td>There is a new version of the application cache available. </td>
</tr>
<tr>
<td><img src="imgs/red.png"/>OBSOLETE </td>
<td>The application cache group is obsolete.</td>
</tr>
</table>

{% include modules/nextarticle.liquid %}

{% endwrap %}
