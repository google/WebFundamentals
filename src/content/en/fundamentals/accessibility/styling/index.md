project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Using proper styling to improve accessibility

{# wf_review_required #}
{# wf_updated_on: 2016-02-29 #}
{# wf_published_on: 2016-02-29 #}

# Accessible Styles {: .page-title }

{% include "_shared/contributors/megginkearney.html" %}
{% include "_shared/contributors/dgash.html" %}



We've explored two of the crucial pillars of accessibility, focus and semantics. Now let's tackle the third, styling. It's a broad topic that we can cover in three sections.

 - Ensuring that elements are styled to support our accessibility efforts by adding styles for focus and various ARIA states.
 - Styling our UIs for flexibility so they can be zoomed or scaled to accommodate users who may have trouble with small text.
 - Choosing the right colors and contrast to avoid conveying information with color alone.

Generally, any time we focus an element, we rely on the built-in browser focus ring (the CSS *outline* property) to style the element. The focus ring is handy because, without it, it's impossible for a keyboard user to tell which element has the focus. The <a href="http://webaim.org/standards/wcag/checklist" target="_blank">WebAIM checklist</a> makes a point of this, requiring that "It is visually apparent which page element has the current keyboard focus (i.e., as you tab through the page, you can see where you are)."

![form elements with a focus ring](imgs/focus-ring.png)

However, sometimes the focus ring can look distorted or it may just not fit in with your page design. Some developers remove this style altogether by setting the element's `outline` to `0` or `none`. But without a focus indicator, how is a keyboard user supposed to know which item they're interacting with?

You might be familiar with adding hover states to your controls using the CSS `:hover` *pseudo-class*. For example, you might use `:hover` on a link element to change its color or background when the mouse is over it. Similar to `:hover`, you can use the `:focus` pseudo-class to target an element when it has focus. 

An alternative solution to the problem of removing the focus ring is to give your element the same hover and focus styles, which solves the "where's-the-focus?" problem for keyboard users. As usual, improving the accessibility experience improves everyone's experience.
