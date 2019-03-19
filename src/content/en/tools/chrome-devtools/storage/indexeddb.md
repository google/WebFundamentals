project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: How to view and edit IndexedDB data with Chrome DevTools.

{# wf_updated_on: 2019-03-18 #}
{# wf_published_on: 2019-03-18 #}
{# wf_blink_components: Platform>DevTools #}

# View And Edit IndexedDB Data With Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

[MDN]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

This guide shows you how to use [Chrome DevTools](/web/tools/chrome-devtools/) to view, edit,
and delete [IndexedDB][MDN]{: .external } data.

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
     * **title** and **body** are indexes.

1. Click a database to see its origin and version number.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbdatabase.png"
            alt="The IndexedDB key-value pairs for the notes database"/>
       <figcaption>
         <b>Figure 3</b>. The key-value pairs for the <b>notes</b> database
       </figcaption>
     </figure>

1. Click an object store to see its key-value pairs.

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

1. Click a cell in the **Value** column to expand a value.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbvalue.png"
            alt="Viewing an IndexedDB value"/>
       <figcaption>
         <b>Figure 4</b>. Viewing an IndexedDB value
       </figcaption>
     </figure>

1. Click an index to sort the object store according to that index's values.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbindex.png"
            alt="Sorting an object store by an index"/>
       <figcaption>
         <b>Figure 4</b>. An object store that is sorted alphabetically according to its <b>title</b> key
       </figcaption>
     </figure>

## Edit IndexedDB values {: #edit }

Note that only IndexedDB values are editable. Keys are not editable.

1. [View an IndexedDB object store](#view).
1. Double-click a cell in the **Key** or **Value** column to edit that key or value.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbedit.png"
            alt="Editing a IndexedDB key"/>
       <figcaption>
         <b>Figure 6</b>. Editing a <code>IndexedDB</code> key
       </figcaption>
     </figure>

## Delete IndexedDB data 

### Delete an IndexedDB database {: #database }

1. [View the IndexedDB database](#view) that you want to delete.
1. Click **Delete database**.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbdatabase.png"
            alt="The 'Delete database' button"/>
       <figcaption>
         <b>Figure 6</b>. The <b>Delete database</b> button
       </figcaption>
     </figure>

## Delete an IndexedDB key-value pair {: #kvp }

1. [View an IndexedDB object store](#view).
1. Click the key-value pair that you want to delete. DevTools highlights it blue to indicate
   that it's selected.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbkvp.png"
            alt="Selecting a key-value pair in order to delete it"/>
       <figcaption>
         <b>Figure 6</b>. Selecting a key-value pair in order to delete it
       </figcaption>
     </figure>

[delete]: /web/tools/chrome-devtools/images/shared/delete.png

1. Press the <kbd>Delete</kbd> key or click **Delete Selected**
   ![Delete Selected][delete]{: .inline-icon }.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbkvpdeleted.png"
            alt="How the object store looks after the key-value pair has been deleted"/>
       <figcaption>
         <b>Figure 6</b>. How the object store looks after the key-value pair has been deleted
       </figcaption>
     </figure>

## Delete all IndexedDB key-value pairs for a domain {: #deleteall }

1. [View an IndexedDB object store](#view).

[clear]: /web/tools/chrome-devtools/images/shared/clear.png

1. Click **Clear All** ![Clear All][clear]{: .inline-icon }.

## Interact with IndexedDB from the Console {: #console }

Since you can run JavaScript in the **Console**, and since the **Console** has access to the
page's JavaScript contexts, it's possible to interact with IndexedDB from the **Console**.

1. Use the **JavaScript contexts** menu to change the JavaScript context of the **Console** if
   you want to access the IndexedDB key-value pairs of a domain other than the page
   you're on.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/jscontext.png"
            alt="Changing the JavaScript context of the Console"/>
       <figcaption>
         <b>Figure 7</b>. Changing the JavaScript context of the <b>Console</b>
       </figcaption>
     </figure>

1. Run your IndexedDB expressions in the Console, the same as you would in your
   JavaScript.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/idbconsole.png"
            alt="Interacting with IndexedDB from the Console"/>
       <figcaption>
         <b>Figure 8</b>. Interacting with <code>IndexedDB</code> from the <b>Console</b>
       </figcaption>
     </figure>

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
