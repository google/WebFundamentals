project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: How to view Web SQL data from the Application panel of Chrome DevTools.

{# wf_updated_on: 2019-03-25 #}
{# wf_published_on: 2019-03-25 #}
{# wf_blink_components: Platform>DevTools #}

# View Web SQL Data With Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<aside class="warning">
  The Web SQL specification is
  <a href="https://www.w3.org/TR/webdatabase/#status-of-this-document">
    not being maintained
  </a>.
</aside>

This guide shows you how to use [Chrome DevTools](/web/tools/chrome-devtools) to inspect
Web SQL data.

## View Web SQL Data {: #view }

1. Click the **Sources** tab to open the **Sources** panel. The **Manifest** pane usually opens
   by default.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/manifest.png"
            alt="The Manifest pane."/>
       <figcaption>
         <b>Figure 1</b>. The Manifest pane.
       </figcaption>
     </figure>

1. Expand the **Web SQL** section to view databases and tables. In **Figure 2** below **html5meetup** is
   a database and **rooms** is a table.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/websql.png"
            alt="The Web SQL pane."/>
       <figcaption>
         <b>Figure 2</b>. The Web SQL pane.
       </figcaption>
     </figure>

1. Click a table to view that table's data.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/websqltable.png"
            alt="Viewing the data of a Web SQL table."/>
       <figcaption>
         <b>Figure 3</b>. Viewing the data of the <b>rooms</b> Web SQL table.
       </figcaption>
     </figure>

## Edit Web SQL data {: #edit }

You can't edit Web SQL data when viewing a Web SQL table, such as in **Figure 3** above. But you can
run statements from the Web SQL Console that edit or delete tables. See [Run Web SQL queries](#run).

## Run Web SQL queries {: #run }

1. Click a database to open a console for that database.

1. Type a Web SQL statement, then press <kbd>Enter</kbd> to run it.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/websqledit.png"
            alt="Using the Web SQL Console to delete a row from a table."/>
       <figcaption>
         <b>Figure 4</b>. Using the Web SQL Console to delete a row from the <b>rooms</b> table.
       </figcaption>
     </figure>

## Refresh a Web SQL table {: #refresh }

DevTools does not update tables in real-time. To update the data in a table:

1. [View a Web SQL table's data](#view).
1. Click **Refresh** ![Refresh](/web/tools/chrome-devtools/images/shared/reload.png){: .inline-icon }.

## Filter out columns in a Web SQL table {: #filter }

1. [View a Web SQL table's data](#view).
1. Use the **Visible columns** text box to specify what columns you want to show. Provide the column names
   as a CSV list.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/websqlfilter.png"
            alt="Using the Visible Columns text box to reduce the number of columns shown."/>
       <figcaption>
         <b>Figure 5</b>. Using the <b>Visible Columns</b> text box to only show the <code>room_name</code>
         and <code>last_updated</code> columns.
       </figcaption>
     </figure>

## Delete all Web SQL data {: #delete }

1. Open the **Clear Storage** pane.
1. Make sure that the **Web SQL** checkbox is enabled.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/websqlcheckbox.png"
            alt="The Web SQL checkbox."/>
       <figcaption>
         <b>Figure 6</b>. The <b>Web SQL</b> checkbox.
       </figcaption>
     </figure>

1. Click **Clear site data**.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/clearwebsql.png"
            alt="The Clear Site Data button."/>
       <figcaption>
         <b>Figure 7</b>. The <b>Clear Site Data</b> button.
       </figcaption>
     </figure>



## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
