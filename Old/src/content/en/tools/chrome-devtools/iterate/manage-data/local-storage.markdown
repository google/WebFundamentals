---
layout: shared/narrow
title: "Inspect and Manage Your Local Storage APIs"
description: "Inspect and edit local storage APIs including local and session storage, IndexedDB and Web SQL databases, and the Application Cache in the Chrome DevTools Resources panel."
published_on: 2015-04-14
updated_on: 2015-05-18
order: 1
authors:
  - megginkearney
translation_priority: 0
key-takeaways:
  local-storage:
    - "View and edit local and session storage."
    - "Inspect IndexedDB databases and object stores."
    - "View resources cached according to the Application Cache manifest file."
notes:
  note-tbd:
    - "TBD note."
---
<p class="intro">
  Inspect and manage local storage APIs including local and session storage, IndexedDB and Web SQL databases, and the Application Cache in the Chrome DevTools Resources panel.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.local-storage %}

## Local and session storage

View and edit local and session storage key/value pairs created using the [Web Storage APIs](http://www.w3.org/TR/webstorage/).

### Add key/value pair

To add a new key/value pair:

1. Double-click inside an empty Key table cell and enter the key name.
2. Double-click inside the corresponding Value table cell and enter the key's value.

### Edit key/value pair

To edit an existing key/value pair, do one of the following:

* Double-click in the cell you want to edit.
* Right-click or Control-click the cell you want to edit and choose Edit from the context menu.

### Refresh table

To refresh the table with new storage data, click the Refresh button ![Refresh](imgs/refresh.png){:.inline} at the bottom of the panel.

### Delete key/value pair

To delete a key/value pair,

1. Select the item in the data table and click the Delete button, or press the Delete key on your keyboard.
2. Right-click or Control-click on the data item and choose Delete from the context menu.

## IndexedDB

Inspect IndexedDB databases and object stores, page through an object store's records, and clear an object store of its records.

### View IndexedDB databases and object stores

* To view a list of available database, expand the IndexedDB category.
* To view a database's object stores, select it from the list of available databases.

![IndexedDB](imgs/indexeddb.png)

To view properties of a database, select it from the list of databases.

![Database properties](imgs/database-properties.png)

### Page through records

To page through records in the object store, click the Previous and Next page buttons. You can also specify the record where paging starts by specifying the record's key.

![Next-previous page](imgs/next-previous-page.png)

### Clear object store

To clear the object store, do one of the following:

* Click the **Clear object store** button ![Clear](imgs/clear.png){:.inline} at the bottom of the panel.
* Right-click or Control-click the object store and select **Clear** from the context menu.

## Web SQL

Inspect the content of Web SQL databases, and run SQL commands against 
their contents.

### Inspect content

* To view the available Web SQL databases, expand the Web SQL item in the tree control.
* To view available tables in a database, expand the database tree item.
* To view a table's records, select the table. Its properties appear in the right-hand pane.
* To refresh the view of the database, click the Refresh button ![Refresh button](imgs/refresh.png){:.inline} at the bottom of the panel. 

### Query content

Query a Web SQL database's tables with SQL commands and view 
query results in a tabular format. As you type out a command or table name, code hints are provided for the names of supported SQL commands and clauses, and the names of tables that the database contains.

To run a SQL command against a database:

1. Select the database containing the table you want to query.
2. At the prompt that appears in the right-hand panel, enter the SQL statement you want to execute.

![SQL](imgs/sql.png)

## Application Cache

The Resources panel shows the resources Chrome has cached according to the Application Cache manifest file specified by the current document. You can view the current status of the Application Cache (idle or downloading, for 
example), and the browser's connection status (online or offline).<br/>

![Application Cache](imgs/app-cache.png) 

The table of cached resources includes the following properties for each resource:

* **Resource** — The URL of the resource.
* **Type** — The type of cached resource, which can have one of the following 
  values:
    * **Master** — The resource was added to the cache because its 
      [manifest](https://www.whatwg.org/specs/web-apps/current-work/multipage/semantics.html#attr-html-manifest) 
      attribute indicated that this was its cache.
    * **Explicit** — The resource was explicitly listed in the application's 
      cache manifest file.
    * **Network** — The resources was listed in the application's cache manifest 
      file as a network entry. 
    * **Fallback** — The resource was specified as a fallback if a resource is inaccessible.
* **Size** — Size of the cached resource.

The Resources panel displays the current [status](https://www.whatwg.org/specs/web-apps/current-work/#dom-appcache-status) 
of the application cache along with a colored status icon (green, yellow, or red). The following are the possible status values and their descriptions:

<table class="mdl-data-table">
  <thead>
    <tr>
      <th>Status</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Status"><img src="imgs/green.png" class="inline"/>IDLE </td>
      <td data-th="Description">The application cache is idle.</td>
    </tr>
    <tr>
      <td data-th="Status"><img src="imgs/yellow.png" class="inline"/>CHECKING </td>
      <td data-th="Description">The manifest is being fetched and checked for updates.</td>
    </tr>
    <tr>
      <td data-th="Status"><img src="imgs/yellow.png" class="inline"/>DOWNLOADING </td>
      <td data-th="Description">Resources are being downloaded to be added to the cache, due to a changed resource manifest.</td>
    </tr>
    <tr>
      <td data-th="Status"><img src="imgs/green.png" class="inline"/>UPDATEREADY </td>
      <td data-th="Description">There is a new version of the application cache available. </td>
    </tr>
    <tr>
      <td data-th="Status"><img src="imgs/red.png" class="inline"/>OBSOLETE </td>
      <td data-th="Description">The application cache group is obsolete.</td>
    </tr>
  </tbody>
</table>


