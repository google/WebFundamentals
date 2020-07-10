project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Open the Console, create a Live Expression, and set the expression to "document.activeElement".

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2018-12-14 #}
{# wf_blink_components: Platform>DevTools #}

# Track Which Element Has Focus {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Suppose that you're testing the keyboard navigation accessibility of a page. When
navigating the page with the <kbd>Tab</kbd> key, the focus ring sometimes disappears
because the element that has focus is hidden. To track the focused element in DevTools:

[create]: /web/tools/chrome-devtools/images/shared/create-live-expression.png

1. Open the **Console**.
1. Click **Create Live Expression** ![Create Live Expression][create]{: .inline-icon }.

     <figure>
       <img src="/web/tools/chrome-devtools/images/shared/live-expression.png"
            alt="Creating a Live Expression."/>
       <figcaption>
         <b>Figure 1</b>. Creating a <b>Live Expression</b>.
       </figcaption>
     </figure>

1. Type `document.activeElement`.
1. Click outside of the **Live Expression** UI to save.

The value that you see below `document.activeElement` is the result of the expression.
Since that expression always represents the focused element, you now have a way to
always keep track of which element has focus.

* Hover over the result to highlight the focused element in the viewport.
* Right-click the result and select **Reveal in Elements panel** to show the element
  in the **DOM Tree** on the **Elements** panel.
* Right-click the result and select **Store as global variable** to create a variable
  reference to the node that you can use in the **Console**.

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}
