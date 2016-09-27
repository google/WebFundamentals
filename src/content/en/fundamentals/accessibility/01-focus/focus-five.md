project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Modifying the DOM order with tabindex

{# wf_review_required #}
{# wf_updated_on: 2016-02-29 #}
{# wf_published_on: 2016-02-29 #}

# Using tabindex {: .page-title }

{% include "_shared/contributors/megginkearney.html" %}
{% include "_shared/contributors/dgash.html" %}



The default tab order provided by the DOM position of native elements is convenient, but there are times when you'll want to modify the tab order, and physically moving elements in the HTML isn't always an optimal, or even a feasible, solution. For these cases you can use the `tabindex` HTML attribute to explicitly set an element's tab position.

`tabindex` can be applied to any element &mdash; although it is not necessarily useful on every element &mdash; and takes a range of integer values. Using `tabindex`, you can specify an explicit order for focusable page elements, insert an otherwise unfocusable element into the tab order, and remove elements from the tab order. For example:

 - `tabindex="0"`: Inserts an element into the natural tab order, and the element can be focused by calling its `focus()` method
 - `tabindex="-1"`: Removes an element from the natural tab order, but the element can still be focused by calling its `focus()` method
 - `tabindex="5"`: Any tabindex greater than 0 jumps the element to the front of the natural tab order. If there are multiple elements with a tabindex greater than 0, the tab order starts from the lowest value that is greater than zero and works its way up. Using a tabindex greater than 0 is considered an **anti-pattern**.

This is particularly true of non-input elements like headers, images, or article titles. Adding `tabindex` to those kinds of elements is counter-productive. If possible, it's best to arrange your source code so the DOM sequence provides a logical tab order. If you do use `tabindex`, restrict it to interactive controls like buttons, tabs, dropdowns, and text fields; that is, elements the user might expect to provide input to.

Don't worry about screen reader users missing important content because it doesn't have a `tabindex`. Even if the content is very important, like an image, if it's not something the user can interact with, there's no reason to make it focusable. Screen reader users can still understand the content of the image so long as you provide proper `alt` attribute support, which we'll cover shortly.

Here's a scenario where `tabindex` is not only useful, but necessary. You might be building a robust single page with different content sections, not all of which are simultaneously visible. In this kind of page, clicking a navigation link might change the visible content without doing a page refresh.

When this happens, you would probably identify the selected content area, give it a `tabindex` of -1 so that it doesn't appear in the natural tab order, and call its `focus` method. This technique, called *managing focus*, keeps the user's perceived context in sync with the site's visual content.
