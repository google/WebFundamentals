---
rss: false
layout: article
title: "Evaluate Expressions"
seotitle: "Evaluation Expressions from the Command Line"
description: "Expore the state of any item on your page from the DevTools console."
introduction: "Expore the state of any item on your page from the DevTools console using one of its evaluation capabilities."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-12
  order: 1
authors:
  - megginkearney
  - jpmedley
priority: 0
collection: command-line
key-takeaways:
  command-line:
    - Evaluate an expression just by typing it.
    - Select elements using one of the shortcuts.
    - Inspect DOM elements and JavaScript heap objects using inspect().
    - Access recently selected elements and objects.
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.command-line %}

## Evaluate expressions

The DevTools console allows you learn the state of items in your page in an ad-hoc manner.  Evaluate any expression you can type using a combination of your knowlege of JavaScript and several features that support it.

### Evaluating expressions

The console will evaluate any JavaScript expression you provide when pressing <kbd class="kbd">Enter</kbd>. It provides auto-completion and tab-completion. As you type an expression, property name suggestions appear. If there are multiple matches <kbd class="kbd">↑</kbd> and <kbd class="kbd">↓</kbd> will cycle through them. Pressing <kbd class="kbd">→</kbd> will select the current suggestion. If there is a single suggestion <kbd class="kbd">Tab</kbd> will select it.

![Simple expressions in the console.](images/evaluate-expressions.png)

### Selecting Elements

There are a few shortcuts for selecting elements. These save you valuable time when compared to typing out their standard counterparts.

<table>
  <tr>
    <td>`$()`</td>
    <td>Returns the first element that matches the specified CSS selector. It is a shortcut for document.querySelector().</td>
  </tr>
  <tr>
    <td>`$$()`</td>
    <td>Returns an array of all the elements that match the specified CSS selector. This is an alias for document.querySelectorAll().</td>
  </tr>
  <tr>
    <td>`$x()`</td>
    <td>Returns an array of elements that match the specified XPath.</td>
  </tr>
</table>

Examples of target selection:

    $('code') // Returns the first code element in the document.
    $$('figure') // Returns an array of all figure elements in the document.
    $x('html/body/p') // Returns an array of all paragraphs in the document body.

### Inspecting DOM elements and JavaScript heap objects

The `inspect()` function takes a DOM element or JavaScript reference as a parameter. If you provide a DOM element the DevTools will go to the Elements panel and display that element. If you provide a JavaScript reference then it will go to the Profile panel.

When this code executes in your console on this page, it will grab this figure and display it on the Elements panel. This takes advantage of the `$_` property to get the output of the last evaluated expression.

    $('[data-target="inspecting-dom-elements-example"]')
    inspect($_)

### Accessing recently selected elements and objects

The console stores the last five element and object selections. As you select an element in the Elements panel or an object in the Profiles panel, that pushes onto the history stack. $x provides access to the history stack. Remember computers begin counting from 0; this means the latest item is $0 and the oldest item is $4.

{% include modules/remember.liquid title="Remember" list=page.remember.note-tbd %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
