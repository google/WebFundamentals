project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_updated_on: 2019-02-27 #}
{# wf_published_on: 2019-02-26 #}
{# wf_blink_components: Platform>DevTools #}

<style>
  .target {
    font-weight: bold;
  }
</style>

# Get Started With Viewing And Changing The DOM {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Complete these interactive tutorials to learn the basics of viewing and
changing a page's DOM using Chrome DevTools.

Before beginning this tutorial it's very important to understand the difference
between HTML and the DOM. See [Appendix: HTML versus the DOM](#appendix) if
you're unsure about how HTML and the DOM relate to each other.

## View DOM nodes {: #view }

### Inspect a node {: #inspect }

When you're interested in a particular DOM node, **Inspect** is a fast way to open DevTools
and investigate that node.

1. Right-click **Michelangelo** below and select **Inspect**.

     * Michelangelo
     * Raphael

     The **Elements** panel of DevTools opens.

     `<li>Michelangelo</li>` is highlighted in the **DOM Tree**.

1. In the DOM Tree hover `<li>Raphael</li>`. DevTools highlights the node in the viewport.
   This feature is helpful when you're not sure what node you're looking at, or when you
   want to see how a node is positioned on the page.

[inspect]: /web/tools/chrome-devtools/images/shared/inspect.png

1. Click the **Inspect** ![Inspect][inspect]{: .inline-icon } icon in the top-left corner of
   DevTools and then click the **Tokyo** text below.

     * Tokyo
     * Beirut

     Now, `<li>Tokyo</li>` is highlighted in the DOM Tree.

Inspecting a node is also the first step towards viewing and changing a node's styles.
See [Get Started With Viewing And Changing CSS](/web/tools/chrome-devtools/css/).

### Navigate the DOM Tree with a keyboard {: #keynav }

Once you've selected a node in the DOM Tree, you can navigate the DOM Tree with your
keyboard.

1. Right-click **Ringo** below and select **Inspect**. `<li>Ringo</li>` is selected in
   the DOM Tree.

     * George
     * Ringo
     * Paul
     * John

1. Press the <kbd>Up</kbd> arrow key 2 times. `<ul>` is selected.
1. Press the <kbd>Left</kbd> arrow key. The `<ul>` list collapses.
1. Press the <kbd>Left</kbd> arrow key again. The parent of the `<ul>` node
   is selected. In this case it's the `<li>` node containing the instructions for step 1.
1. Press the <kbd>Down</kbd> arrow key 2 times so that you've re-selected the `<ul>`
   list that you just collapsed. It should look like this: `<ul>...</ul>`
1. Press the <kbd>Right</kbd> arrow key. The list expands.

### Scroll into view {: #scroll1 }

When viewing the DOM Tree, sometimes you'll find yourself interested in a DOM node that's
not currently in the viewport. For example, suppose that you scrolled to the bottom of the
page, and you're interested in the `<h1>` node at the top of the page. **Scroll into view**
lets you quickly reposition the viewport so that you can see the node.

1. Right-click **Magritte** below and select **Inspect**.

     * Magritte
     * Soutine

1. Go to the [Appendix: Scroll into view](#scroll2) section at the bottom of this page.
   The instructions continue there.

## Edit the DOM {: #edit }

### Edit content {: #content }

1. Right-click **Leela** below and select **Inspect**.

     * Fry
     * Leela

1. In the DOM Tree, double-click `Leela`. In other words, the text between `<li>` and `</li>`.
   The text is highlighted blue to indicate that it's selected.
1. Delete `Leela`, type `Bender`, then press <kbd>Enter</kbd> to confirm the change. The text
   above changes from **Leela** to **Bender**.

### Edit attributes {: #attributes }

1. Right-click **Howard** below and select **Inspect**.

     * Howard
     * Vince

1. Double-click `<li>`. The text is highlighted to indicate that the
   node is selected.
1. Press the <kbd>Right</kbd> arrow key, add a space, type
   `style="background-color:gold"`, and then press <kbd>Enter</kbd>. The background color
   of the node changes to gold.

### Edit element type {: #type }

1. Right-click **Hank** below and select **Inspect**.

     * Dean
     * Hank
     * Thaddeus
     * Brock

1. Double-click `<li>`. The text `li` is highlighted.
1. Delete `li`, type `button`, then press <kbd>Enter</kbd>. The text node changes to a button
   node.

### Reorder DOM nodes {: #reorder }

1. Right-click **Elvis Presley** below and select **Inspect**.

     <ul>
       <li>Stevie Wonder</li>
       <li>Tom Waits</li>
       <li>Chris Thile</li>
       <li>Elvis Presley</li>
     </ul>

1. In the DOM Tree, drag `<li>Elvis Presley</li>` to the top of the list.

### Hide a node {: #hide }

1. Right-click **Toothpaste** below and select **Inspect**.

     * Pizza
     * Toothpaste
     * Burrito
     * Pasta

1. Press the <kbd>H</kbd> key. The node is hidden.
1. Press the <kbd>H</kbd> key again. The node is shown again.

### Delete a node {: #delete }

1. Right-click **Zucchini** below and select **Inspect**.

     * Figs
     * Kumquats
     * Zucchini
     * Tangerines

1. Press the <kbd>Delete</kbd> key. The node is deleted.
1. Press <kbd>Control</kbd>+<kbd>Z</kbd> or <kbd>Command</kbd>+<kbd>Z</kbd> (Mac).
   The last action is undone and the node reappears.

## Next steps {: #next }

{% include "web/_shared/helpful.html" %}

## Appendix: HTML versus the DOM {: #appendix }

When you use a web browser to request a page like `https://example.com` the server
returns HTML like this:

    <!doctype html>
    <html>
      <head>
        <title>Hello, world!</title>
      </head>
      <body>
        <h1>Hello, world!</h1>
        <p>This is a hypertext document on the World Wide Web.</p>
        <script src="/script.js" async></script>
      </body>
    </html>

The browser parses the HTML and creates a tree of objects like this:

    html
      head
        title
      body
        h1
        p
        script

This tree of objects, or nodes, representing the page's content is called the DOM.
Right now it looks the same as the HTML, but suppose that the script referenced at the
bottom of the HTML runs this code:

    const h1 = document.querySelector('h1');
    h1.parentElement.removeChild(h1);
    const p = document.createElement('p');
    p.textContent = 'Wildcard!';
    document.body.appendChild(p);

That code removes the `h1` node and adds another `p` node to the DOM. The complete DOM now looks
like this:

    html
      head
        title
      body
        p
        script
        p

The page's HTML is now different than its DOM. In other words, HTML represents
initial page content, and the DOM represents current page content. When JavaScript
adds, removes, or edits nodes, the DOM becomes different than the HTML.

[MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction

See [Introduction to the DOM][MDN]{: .external } to learn more.

## Appendix: Scroll into view {: #scroll2 }

This is a continuation of the [Scroll into view](#scroll1) section. Follow the
instructions below to complete the section.

1. The `<li>Magritte</li>` node should still be selected in your DOM Tree. If not, go back to
   [Scroll into view](#scroll1) and start over.
1. Right-click the `<li>Magritte</li>` node and select **Scroll into view**. Your viewport scrolls
   back up so that you can see the **Magritte** node.

