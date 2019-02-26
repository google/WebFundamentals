project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_updated_on: 2019-02-26 #}
{# wf_published_on: 2019-02-26 #}
{# wf_blink_components: Platform>DevTools #}

<style>
  .target {
    display: inline-block;
    background-color: black;
    color: white;
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

     **Michelangelo**

     The **Elements** panel of DevTools opens.

     `<strong>Michelangelo</strong>` is highlighted in the **DOM Tree**.

1. Hover over `<p>TODO</p>`. DevTools highlights the node in the viewport. This feature is
   helpful when you're not sure what node you're looking at, or when you want to see how
   a node is positioned on the page.

1. Right-click **Donatello** below and select **Inspect** again.

     **Donatello**

     Now, `<strong>Donatello</strong>` is highlighted in the DOM Tree.

### Navigate the DOM Tree with a keyboard {: #keynav }

1. Right-click **Elvis** and select **Inspect**. `<li>Michelangelo</li>` is selected in
   the DOM Tree.

     <ul>
       <li>Leonardo</li>
       <li>Michelangelo</li>
       <li>Donatello</li>
       <li>Raphael</li>
     </ul>

1. Press the <kbd>Up</kbd> arrow key. `<li>Leonardo</li>` is selected.
1. Press the <kbd>Up</kbd> arrow key again. `<ul>` is selected.
1. Press the <kbd>Left</kbd> arrow key. The `<ul>` list collapses.
1. Press the <kbd>Left</kbd> arrow key again. The parent of the `<ul>` node
   is selected. In this case it's the `<li>` node containing all of these
   instructions.
1. Press the <kbd>Down</kbd> arrow key until you've re-selected the `<ul>`
   list that you just collapsed. It should look like this: `<ul>...</ul>`
1. Press the <kbd>Right</kbd> arrow key. The list expands.

### Scroll into view {: #scroll1 }

Sometimes you're interested in a DOM node that's not in the viewport.

1. Right-click **TODO** below and select **Inspect**.

     <p>TODO</p>

1. Go to the [Appendix: Scroll into view](#scroll2) section at the bottom of this page.
   The instructions continue there.

## Edit the DOM {: #edit }

### Edit content {: #content }

1. Right-click **TODO** below and select **Inspect**.

     <p>TODO</p>

1. Double-click the text between `<p>` and `</p>`. The text is highlighted
   blue to indicate that it is selected.
1. Type `TODO` and then press <kbd>Enter</kbd> to confirm the change.

### Edit attributes {: #attributes }

1. Right-click **TODO** below and select **Inspect**.

     **TODO**

1. Double-click **strong**. The text is highlighted to indicate that the
   node is selected.
1. Type `i` and then press <kbd>Enter</kbd>. The node is changed to

### Reorder DOM nodes {: #reorder }

1. Right-click **Elvis Presley** below and select **Inspect**.

     <ul>
       <li>Stevie Wonder</li>
       <li>Tom Waits</li>
       <li>Chris Thile</li>
       <li>Elvis Presley</li>
     </ul>

1. Drag `<li>Elvis Presley</li>` to the top of the list.

### Hide a node {: #hide }

### Delete a node {: #delete }

Press <kbd>Control</kbd>+<kbd>Z</kbd> or <kbd>Command</kbd>+<kbd>Z</kbd> (Mac) to undo.

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

1. The `<p>TODO</p>` node should still be selected in your DOM Tree. If not, go back to
   [Scroll into view](#scroll1) and start over.
1. Right-click the **TODO** node and select **Scroll into view**. Your viewport scrolls
   back up so that you can see the **TODO** node.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
