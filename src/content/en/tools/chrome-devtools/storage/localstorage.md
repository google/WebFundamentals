project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: How to view and edit localStorage with the Local Storage pane and the Console.

{# wf_updated_on: 2019-03-14 #}
{# wf_published_on: 2019-03-14 #}
{# wf_blink_components: Platform>DevTools #}

# View And Edit Local Storage With Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

[MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

This guide shows you how to use [Chrome DevTools](/web/tools/chrome-devtools/) to view, edit,
and delete [`localStorage`][MDN]{: .external } key-value pairs.

## View localStorage keys and values {: #view }

1. Click the **Application** tab to open the **Application** panel. The **Manifest** pane
   is shown by default.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/manifest.png"
            alt="The Manifest pane"/>
       <figcaption>
         <b>Figure 1</b>. The Manifest pane
       </figcaption>
     </figure>

1. Expand the **Local Storage** menu.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/localstoragemenu.png"
            alt="The Local Storage Menu"/>
       <figcaption>
         <b>Figure 2</b>. The <b>Local Storage</b> menu shows two domains:
         <b>https://developers.google.com</b> and <b>https://www.youtube.com</b>
       </figcaption>
     </figure>

1. Click a domain to view its key-value pairs.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/localstorage.png"
            alt="The localStorage key-value pairs for the https://www.youtube.com domain"/>
       <figcaption>
         <b>Figure 3</b>. The <code>localStorage</code> key-value pairs for the
         <b>https://www.youtube.com</b> domain
       </figcaption>
     </figure>

1. Click a row of the table to view the value in the viewer below the table.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/localstorageviewer.png"
            alt="Viewing the value of the yt-remote-connected-devices key"/>
       <figcaption>
         <b>Figure 4</b>. Viewing the value of the <code>yt-remote-connected-devices</code> key
       </figcaption>
     </figure>

## Create a new localStorage key-value pair {: #create }

1. [View a domain's `localStorage` key-value pairs](#view).
1. Double-click the empty part of the table. DevTools creates a new row and focuses your
   cursor in the **Key** column.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/localstoragecreate.png"
            alt="The empty part of the table to double-click in order to create a new
                 key-value pair"/>
       <figcaption>
         <b>Figure 5</b>. The empty part of the table to double-click in order to create a new
         key-value pair
       </figcaption>
     </figure>

## Edit localStorage keys or values {: #edit }

1. [View a domain's `localStorage` key-value pairs](#view).
1. Double-click a cell in the **Key** or **Value** column to edit that key or value.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/localstorageedit.png"
            alt="Editing a localStorage key"/>
       <figcaption>
         <b>Figure 6</b>. Editing a <code>localStorage</code> key
       </figcaption>
     </figure>

## Delete localStorage key-value pairs {: #delete }

1. [View a domain's `localStorage` key-value pairs](#view).
1. Click the key-value pair that you want to delete. DevTools highlights it blue to indicate
   that it's selected.

[delete]: /web/tools/chrome-devtools/images/shared/delete.png

1. Press the <kbd>Delete</kbd> key or click **Delete Selected**
   ![Delete Selected][delete]{: .inline-icon }.

## Delete all localStorage key-value pairs for a domain {: #deleteall }

1. [View a domain's `localStorage` key-value pairs](#view).

[clear]: /web/tools/chrome-devtools/images/shared/clear.png

1. Click **Clear All** ![Clear All][clear]{: .inline-icon }.

## Interact with localStorage from the Console {: #console }

Since you can run JavaScript in the **Console**, and since the **Console** has access to the
page's JavaScript contexts, it's possible to interact with `localStorage` from the **Console**.

1. Use the **JavaScript contexts** menu to change the JavaScript context of the **Console** if
   you want to access the `localStorage` key-value pairs of a domain other than the page
   you're on.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/jscontext.png"
            alt="Changing the JavaScript context of the Console"/>
       <figcaption>
         <b>Figure 7</b>. Changing the JavaScript context of the <b>Console</b>
       </figcaption>
     </figure>

1. Run your `localStorage` expressions in the Console, the same as you would in your
   JavaScript.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/localstorageconsole.png"
            alt="Interacting with localStorage from the Console"/>
       <figcaption>
         <b>Figure 8</b>. Interacting with <code>localStorage</code> from the <b>Console</b>
       </figcaption>
     </figure>

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
