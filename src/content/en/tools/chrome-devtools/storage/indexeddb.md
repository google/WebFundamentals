project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: How to view and change IndexedDB data with the Application panel and Snippets.

{# wf_updated_on: 2019-03-19 #}
{# wf_published_on: 2019-03-18 #}
{# wf_blink_components: Platform>DevTools #}

# View And Change IndexedDB Data With Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

[API]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[IDB]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

This guide shows you how to use [Chrome DevTools](/web/tools/chrome-devtools/) to view
and change [IndexedDB][API]{: .external } data. It assumes you're familiar with DevTools. If not,
see [Get started](/web/tools/chrome-devtools/#start). It also assumes you're familiar with
IndexedDB. If not, see [Using IndexedDB][IDB]{: .external }.

## View IndexedDB data {: #view }

1. Click the **Application** tab to open the **Application** panel. The **Manifest** pane
   usually opens by default.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/manifest.png"
            alt="The Manifest pane"/>
       <figcaption>
         <b>Figure 1</b>. The Manifest pane
       </figcaption>
     </figure>

1. Expand the **IndexedDB** menu to see which databases are available.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbmenu.png"
            alt="The IndexedDB menu"/>
       <figcaption>
         <b>Figure 2</b>. The <b>IndexedDB</b> menu
       </figcaption>
     </figure>

[db]: /web/tools/chrome-devtools/images/shared/database.png
[os]: /web/tools/chrome-devtools/images/shared/objectstore.png

     * ![Database icon][db]{: .inline-icon } **notes - https://mdn.github.io** represents a database,
       where **notes** is the name of the database and **https://mdn.github.io** is the origin that
       can access the database.
     * ![Object Store icon][os]{: .inline-icon } **notes** is an object store.

[index]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#Using_an_index

     * **title** and **body** are [indexes][index]{: .external }.

     <aside class="note">
       <b>Known Limitation</b> Third-party databases are not visible. For example, if you use an
       <code>&lt;iframe&gt;</code> to embed an ad on your page, and your ad network uses IndexedDB, your ad network's
       IndexedDB data won't be visible. See <a href="https://crbug.com/943770">issue #943770</a>.
     </aside>

1. Click a database to see its origin and version number.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbdatabase.png"
            alt="The 'notes' database"/>
       <figcaption>
         <b>Figure 3</b>. The <b>notes</b> database
       </figcaption>
     </figure>

1. Click an object store to see its key-value pairs.

     <aside class="caution">
       IndexedDB data does not update in real-time. See <a href="refresh">Refresh
       IndexedDB data</a>.
     </aside>

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbobjectstore.png"
            alt="The 'notes' object store"/>
       <figcaption>
         <b>Figure 4</b>. The <b>notes</b> object store
       </figcaption>
     </figure>

     * **Total entries** is the total number of key-value pairs in the object store.

[KG]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB#gloss_keygenerator

     * **Key generator value** is the next available key. This field is only shown when using [key generators][KG]{: .external }.

1. Click a cell in the **Value** column to expand that value.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbvalue.png"
            alt="Viewing an IndexedDB value"/>
       <figcaption>
         <b>Figure 5</b>. Viewing an IndexedDB value
       </figcaption>
     </figure>

1. Click an index, such as **title** or **body** in **Figure 6** below, to sort the object store according
   to the values of that index.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbindex.png"
            alt="Sorting an object store by an index"/>
       <figcaption>
         <b>Figure 6</b>. An object store that is sorted alphabetically according to its <b>title</b> key
       </figcaption>
     </figure>

## Refresh IndexedDB data {: #refresh }

IndexedDB values in the **Application** panel do not update in real-time. Click **Refresh**
![Refresh](/web/tools/chrome-devtools/images/shared/reload.png){: .inline-icon } when viewing an
object store to refresh its data, or view a database and click **Refresh database** to refresh all data.

<figure>
  <img src="/web/tools/chrome-devtools/storage/imgs/idbdatabase.png"
       alt="Viewing a database"/>
  <figcaption>
    <b>Figure 7</b>. Viewing a database
  </figcaption>
</figure>

## Edit IndexedDB data {: #edit }

IndexedDB keys and values are not editable from the **Application** panel. Since DevTools has
access to page context, however, you can run JavaScript code within DevTools that edits
IndexedDB data.

### Edit IndexedDB data with Snippets {: #snippets }

[Snippets](/web/tools/chrome-devtools/snippets) are a way to store and run blocks of JavaScript code
within DevTools. When you run a Snippet, the result is logged to the **Console**. You can use a
Snippet to run JavaScript code that edits an IndexedDB database.

<figure>
  <img src="/web/tools/chrome-devtools/storage/imgs/idbsnippet.png"
       alt="Using a Snippet to interact with IndexedDB"/>
  <figcaption>
    <b>Figure 8</b>. Using a Snippet to interact with IndexedDB
  </figcaption>
</figure>

## Delete IndexedDB data {: #delete }

### Delete an IndexedDB key-value pair {: #deletekvp }

1. [View an IndexedDB object store](#view).
1. Click the key-value pair that you want to delete. DevTools highlights it blue to indicate
   that it's selected.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbkvp1.png"
            alt="Selecting a key-value pair in order to delete it"/>
       <figcaption>
         <b>Figure 9</b>. Selecting a key-value pair in order to delete it
       </figcaption>
     </figure>

[delete]: /web/tools/chrome-devtools/images/shared/delete.png

1. Press the <kbd>Delete</kbd> key or click **Delete Selected**
   ![Delete Selected][delete]{: .inline-icon }.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbkvp2.png"
            alt="How the object store looks after the key-value pair has been deleted"/>
       <figcaption>
         <b>Figure 10</b>. How the object store looks after the key-value pair has been deleted
       </figcaption>
     </figure>

### Delete all key-value pairs in an object store {: #deleteobjectstore }

1. [View an IndexedDB object store](#view).

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbobjectstore.png"
            alt="Viewing an object store"/>
       <figcaption>
         <b>Figure 11</b>. Viewing an object store
       </figcaption>
     </figure>

[clear]: /web/tools/chrome-devtools/images/shared/clear.png

1. Click **Clear object store** ![Clear object store][clear]{: .inline-icon }.

### Delete an IndexedDB database {: #deletedatabase }

1. [View the IndexedDB database](#view) that you want to delete.
1. Click **Delete database**.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbdatabase.png"
            alt="The 'Delete database' button"/>
       <figcaption>
         <b>Figure 12</b>. The <b>Delete database</b> button
       </figcaption>
     </figure>

### Delete all IndexedDB storage {: #deleteall }

1. Open the **Clear storage** pane.

1. Make sure that the **IndexedDB** checkbox is enabled.

1. Click **Clear site data**.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbclearstorage.png"
            alt="The 'Clear storage' pane"/>
       <figcaption>
         <b>Figure 13</b>. The <b>Clear storage</b> pane
       </figcaption>
     </figure>

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
