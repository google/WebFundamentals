project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: An overview of accessibility features in Chrome DevTools.

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2018-07-06 #}
{# wf_published_on: 2018-07-03 #}

# Overview of Accessibility Features in Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

## How to think about accessibility 

In general, when determining whether a page is accessible, you need to have 2 questions in mind:

1. Can I navigate the page with a keyboard or [screen reader][reader]?
1. Are the page's elements properly marked up for screen readers?

[reader]: /web/fundamentals/accessibility/semantics-builtin/#screen_readers

In general, DevTools is good at helping you answer question #2, because these errors are
easy to detect in an automated fashion. Question #1 is just as important, but unfortunately DevTools
can't help you there. The only way to answer question #1 is to try using the page
with a keyboard or screen reader yourself. See [How To Do An Accessibility Review][review]
to learn how to navigate pages with a keyboard or screen reader.

[review]: /web/fundamentals/accessibility/how-to-review
